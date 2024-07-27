import { z } from 'zod';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Toast } from 'react-native-toast-notifications';
import { useState } from 'react';

const User = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, 'Senha deve conter no minimo 6 caracteres'),
});

const apiAuthentication = axios.create({
  baseURL: `https://identitytoolkit.googleapis.com/v1/`,
});

export default function Index() {
  const initialValues = { email: '', password: '' };

  const { mutate: login, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: (loginValues: z.infer<typeof User>) => {
      return apiAuthentication.post(
        '/accounts:signInWithPassword',
        {
          ...loginValues,
          returnSecureToken: true,
        },
        {
          params: {
            key: process.env.EXPO_PUBLIC_API_KEY,
          },
        },
      );
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (
          error.response?.data.error.message === 'INVALID_LOGIN_CREDENTIALS'
        ) {
          Toast.show('Credenciais Inválidas', { type: 'danger' });
          return;
        }
      }

      Toast.show('Erro ao fazer login', { type: 'danger' });
    },
    onSuccess: () => {
      router.replace('./posts');
    },
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={login}
        validationSchema={toFormikValidationSchema(User)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-sm">
            <Text className="font-semibold tracking-tight text-2xl">Login</Text>
            <Text className="text-sm text-muted-foreground border-b-8">
              Enter your email below to login to your account.
            </Text>

            <Text className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email
            </Text>
            <TextInput
              className="text-3xl border-2 border-black"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="m@example.com"
            />
            {errors.email && <Text>{errors.email}</Text>}

            <Text className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Password
            </Text>

            <TextInput
              className="text-3xl border-2 my-2.5"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && <Text>{errors.password}</Text>}

            <TouchableHighlight
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              onPress={() => handleSubmit()}
              disabled={!!errors.email || !!errors.password}
            >
              {isPending ? (
                <ActivityIndicator></ActivityIndicator>
              ) : (
                <Text>Sign In</Text>
              )}
            </TouchableHighlight>
          </View>
        )}
      </Formik>
    </>
  );
}

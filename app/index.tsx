import { z } from 'zod';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Button, Text, TextInput, View } from 'react-native';

const User = z.object({
  email: z.string().email({message: 'Email inválido'}),
  senha: z.string().min(8, "Senha deve conter no minimo 8 caracteres")
});

export default () => {

  return (
      <Formik
      initialValues={{ email: '', senha: '' }}
      onSubmit={values => console.log(values)}
      validationSchema={toFormikValidationSchema(User)}
      >

            {({ handleChange, handleBlur, handleSubmit, values, errors }) => {

              console.log(errors)
       return (
        <View>
            <Text>Email</Text>
            <TextInput className='text-3xl mt-7 border-2'
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && <Text>{errors.email}</Text>}

            <Text>Senha</Text>
            <TextInput className='text-3xl border-2 my-2.5'
              onChangeText={handleChange('senha')}
              onBlur={handleBlur('senha')}
              value={values.senha}  
            />
            {errors.senha && <Text>{errors.senha}</Text>}
      
            <Button
              onPress={handleSubmit}
              disabled={!!errors.email || !!errors.senha}
              title="Logar"/>
        </View>
       ) 
      }
  }
      </Formik>
  )
}

  
  
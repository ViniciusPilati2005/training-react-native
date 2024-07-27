import { Slot } from 'expo-router';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';

const queryClient = new QueryClient();

export default function HomeLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <SafeAreaView className="flex-1">
          <Slot />
        </SafeAreaView>
      </ToastProvider>
    </QueryClientProvider>
  );
}

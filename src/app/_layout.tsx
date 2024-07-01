import { theme } from '@/themes';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.bg(),
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
      <Stack.Screen name="destinations/[id]" />
      <Stack.Screen
        name="account"
        options={{
          headerShown: true,
          title: 'Minha conta',
        }}
      />
    </Stack>
  );
}

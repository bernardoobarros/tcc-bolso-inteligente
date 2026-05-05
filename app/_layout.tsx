import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ProvedorAplicativo } from '@/contextos/aplicativo-contexto';

export default function RootLayout() {
  return (
    <ProvedorAplicativo>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#f9f9fb' } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="boas-vindas" />
        <Stack.Screen name="entrar" />
        <Stack.Screen name="cadastro" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="extrato" />
        <Stack.Screen name="tempo" />
        <Stack.Screen name="perfil" />
        <Stack.Screen name="nova-renda" />
        <Stack.Screen name="nova-despesa" />
        <Stack.Screen name="nova-reserva" />
        <Stack.Screen name="fontes-renda" />
        <Stack.Screen name="resultado-tempo" />
        <Stack.Screen name="contas-a-pagar" />
        <Stack.Screen name="reservas" />
      </Stack>
      <StatusBar style="dark" />
    </ProvedorAplicativo>
  );
}

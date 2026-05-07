import { Tabs } from 'expo-router';

export default function LayoutAbas() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}>
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="extrato" />
      <Tabs.Screen name="tempo" />
      <Tabs.Screen name="perfil" />
    </Tabs>
  );
}

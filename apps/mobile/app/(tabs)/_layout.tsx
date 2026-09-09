import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen name="index" options={{ title: "Home", tabBarLabel: "Home" }} />
      <Tabs.Screen name="cases" options={{ title: "Cases", tabBarLabel: "Cases" }} />
      <Tabs.Screen name="stuff" options={{ title: "My Stuff", tabBarLabel: "My Stuff" }} />
      <Tabs.Screen name="account" options={{ title: "Account", tabBarLabel: "Account" }} />
    </Tabs>
  );
}

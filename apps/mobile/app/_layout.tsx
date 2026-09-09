import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CaseStoreProvider } from "@/cases/case-store";

export default function RootLayout() {
  return (
    <CaseStoreProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="check" options={{ title: "Check a Quote", presentation: "card" }} />
        <Stack.Screen name="case/[id]" options={{ title: "Case" }} />
      </Stack>
    </CaseStoreProvider>
  );
}

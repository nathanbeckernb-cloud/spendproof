import { ScrollView, Text, View } from "react-native";
import { tokens } from "@/theme/tokens";

export default function CheckScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: tokens.spacing.md, gap: tokens.spacing.md }}>
      <Text selectable style={{ fontSize: 24, fontWeight: "800", color: tokens.color.text }}>Add your quote</Text>
      <Text selectable style={{ fontSize: 16, lineHeight: 22, color: tokens.color.secondaryText }}>
        Camera, photo, and PDF intake will be implemented in the capture PR. No production document leaves the device in this foundation build.
      </Text>
      <View style={{ padding: 18, borderRadius: tokens.radius.card, borderCurve: "continuous", borderWidth: 1, borderColor: tokens.color.border, backgroundColor: tokens.color.surface }}>
        <Text selectable style={{ fontWeight: "700", color: tokens.color.text }}>Architecture gate</Text>
        <Text selectable style={{ marginTop: 6, color: tokens.color.secondaryText }}>
          Uploaded documents are untrusted data. Production AI and provider keys will be server-only.
        </Text>
      </View>
    </ScrollView>
  );
}

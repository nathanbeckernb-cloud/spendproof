import { ScrollView, Text } from "react-native";
import { tokens } from "@/theme/tokens";
export default function AccountScreen() {
  return <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: tokens.spacing.md }}><Text selectable style={{ fontSize: 17, lineHeight: 24, color: tokens.color.secondaryText }}>Privacy, AI-processing consent, data controls, Delete Case, and Delete Account belong here. Production auth is intentionally not connected yet.</Text></ScrollView>;
}

import { ScrollView, Text } from "react-native";
import { tokens } from "@/theme/tokens";
export default function StuffScreen() {
  return <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: tokens.spacing.md }}><Text selectable style={{ fontSize: 17, lineHeight: 24, color: tokens.color.secondaryText }}>Vehicles, HVAC systems, water heaters, roofs, and other assets will live here when asset history is implemented.</Text></ScrollView>;
}

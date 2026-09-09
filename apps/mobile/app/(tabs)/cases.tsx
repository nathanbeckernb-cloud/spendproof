import { ScrollView, Text } from "react-native";
import { tokens } from "@/theme/tokens";
export default function CasesScreen() {
  return <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: tokens.spacing.md }}><Text selectable style={{ fontSize: 17, lineHeight: 24, color: tokens.color.secondaryText }}>Every decision will live here as a Case: original quote, questions, responses, revisions, comparison, decision, and outcome.</Text></ScrollView>;
}

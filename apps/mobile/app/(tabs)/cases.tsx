import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useCaseStore } from "@/cases/case-store";
import { tokens } from "@/theme/tokens";

export default function CasesScreen() {
  const { cases } = useCaseStore();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: tokens.spacing.md, gap: tokens.spacing.md }}>
      {!cases.length ? (
        <View style={{ backgroundColor: tokens.color.surface, borderWidth: 1, borderColor: tokens.color.border, borderRadius: tokens.radius.card, borderCurve: "continuous", padding: 18, gap: 8 }}>
          <Text selectable style={{ fontSize: 18, fontWeight: "700", color: tokens.color.text }}>No cases yet</Text>
          <Text selectable style={{ color: tokens.color.secondaryText, lineHeight: 21 }}>
            Your quote decisions will live here with their documents, questions, revisions, comparisons, and outcomes.
          </Text>
          <Link href="/check" asChild>
            <Pressable accessibilityRole="button" style={{ marginTop: 6, alignSelf: "flex-start", paddingVertical: 10, paddingHorizontal: 14, backgroundColor: tokens.color.text, borderRadius: 12 }}>
              <Text style={{ color: "white", fontWeight: "700" }}>Check a Quote</Text>
            </Pressable>
          </Link>
        </View>
      ) : (
        cases.map((item) => (
          <Link key={item.id} href={{ pathname: "/case/[id]", params: { id: item.id } }} asChild>
            <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1, backgroundColor: tokens.color.surface, borderWidth: 1, borderColor: tokens.color.border, borderRadius: tokens.radius.card, borderCurve: "continuous", padding: 16, gap: 7 })}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
                <Text selectable numberOfLines={1} style={{ flex: 1, fontSize: 17, fontWeight: "700", color: tokens.color.text }}>{item.title}</Text>
                <Text selectable style={{ color: tokens.color.secondaryText }}>{item.documents.length} file{item.documents.length === 1 ? "" : "s"}</Text>
              </View>
              <Text selectable style={{ color: tokens.color.secondaryText }}>{labelStatus(item.status)}</Text>
            </Pressable>
          </Link>
        ))
      )}
    </ScrollView>
  );
}

function labelStatus(status: string) {
  return status === "ready_for_extraction" ? "Ready for extraction" : status.replaceAll("_", " ");
}

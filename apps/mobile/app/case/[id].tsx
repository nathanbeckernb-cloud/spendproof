import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { useCaseStore } from "@/cases/case-store";
import { tokens } from "@/theme/tokens";

export default function CaseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getCase } = useCaseStore();
  const item = id ? getCase(id) : undefined;

  if (!item) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: tokens.spacing.md }}>
        <Text selectable style={{ color: tokens.color.secondaryText }}>This Case isn't available in the current session.</Text>
      </ScrollView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: item.title }} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: tokens.spacing.md, gap: tokens.spacing.lg }}>
        <View style={{ gap: 6 }}>
          <Text selectable style={{ fontSize: 14, fontWeight: "700", color: tokens.color.accent }}>READY FOR EXTRACTION</Text>
          <Text selectable style={{ fontSize: 28, fontWeight: "800", color: tokens.color.text }}>{item.title}</Text>
          <Text selectable style={{ color: tokens.color.secondaryText }}>{item.documents.length} quote file{item.documents.length === 1 ? "" : "s"} captured</Text>
        </View>

        <View style={{ gap: tokens.spacing.sm }}>
          {item.documents.map((document, index) => (
            <View key={document.id} style={{ flexDirection: "row", gap: 12, alignItems: "center", backgroundColor: tokens.color.surface, borderWidth: 1, borderColor: tokens.color.border, borderRadius: tokens.radius.card, borderCurve: "continuous", padding: 12 }}>
              {document.source === "pdf" ? (
                <View style={{ width: 54, height: 70, borderRadius: 10, backgroundColor: "#F3F4F6", alignItems: "center", justifyContent: "center" }}>
                  <Text selectable style={{ fontWeight: "800", color: tokens.color.text }}>PDF</Text>
                </View>
              ) : (
                <Image source={{ uri: document.uri }} style={{ width: 54, height: 70, borderRadius: 10 }} contentFit="cover" />
              )}
              <View style={{ flex: 1, gap: 3 }}>
                <Text selectable numberOfLines={1} style={{ fontWeight: "700", color: tokens.color.text }}>{index + 1}. {document.name}</Text>
                <Text selectable style={{ color: tokens.color.secondaryText }}>{document.mimeType || "Unknown file type"}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ backgroundColor: "#EFF6FF", padding: 16, borderRadius: tokens.radius.card, borderCurve: "continuous", gap: 6 }}>
          <Text selectable style={{ fontWeight: "700", color: tokens.color.text }}>Next: extraction and recognition</Text>
          <Text selectable style={{ color: tokens.color.secondaryText, lineHeight: 20 }}>
            The next intelligence slice will identify the quote type and total, then let you confirm extracted facts before analysis. Nothing is transmitted from this foundation flow.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

import React from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useCaseStore } from "@/cases/case-store";
import type { CaseDocument } from "@/cases/types";
import { chooseQuoteImages, chooseQuotePdfs, takeQuotePhoto } from "@/capture/pickers";
import { tokens } from "@/theme/tokens";

const MAX_DOCUMENTS = 12;

export default function CheckScreen() {
  const { createCase } = useCaseStore();
  const [documents, setDocuments] = React.useState<CaseDocument[]>([]);
  const [busy, setBusy] = React.useState(false);

  const appendDocuments = React.useCallback((incoming: CaseDocument[]) => {
    if (!incoming.length) return;
    setDocuments((current) => {
      const room = Math.max(0, MAX_DOCUMENTS - current.length);
      if (incoming.length > room) Alert.alert("Page limit reached", `SpendProof accepts up to ${MAX_DOCUMENTS} quote files in this draft.`);
      return [...current, ...incoming.slice(0, room)];
    });
  }, []);

  const runPicker = React.useCallback(async (picker: () => Promise<CaseDocument[]>) => {
    try {
      setBusy(true);
      appendDocuments(await picker());
    } catch (error) {
      const message = error instanceof Error && error.message === "CAMERA_PERMISSION_REQUIRED"
        ? "Camera permission is required only when you choose to photograph a quote."
        : "SpendProof couldn't add that file. Nothing was uploaded.";
      Alert.alert("Couldn't add quote", message);
    } finally {
      setBusy(false);
    }
  }, [appendDocuments]);

  const continueToCase = React.useCallback(() => {
    if (!documents.length) return;
    const created = createCase({ documents, title: documents[0]?.name || "New quote" });
    router.replace({ pathname: "/case/[id]", params: { id: created.id } });
  }, [createCase, documents]);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: tokens.spacing.md, gap: tokens.spacing.lg }}>
      <View style={{ gap: tokens.spacing.sm }}>
        <Text selectable style={{ fontSize: 24, fontWeight: "800", color: tokens.color.text }}>Add your quote</Text>
        <Text selectable style={{ fontSize: 16, lineHeight: 22, color: tokens.color.secondaryText }}>
          Photograph the quote, choose images, or add PDFs. Keep every page so SpendProof can evaluate the whole proposal later.
        </Text>
      </View>

      <View style={{ gap: tokens.spacing.sm }}>
        <ActionButton title="Take a photo" disabled={busy || documents.length >= MAX_DOCUMENTS} onPress={() => runPicker(takeQuotePhoto)} />
        <ActionButton title="Choose quote images" disabled={busy || documents.length >= MAX_DOCUMENTS} onPress={() => runPicker(chooseQuoteImages)} />
        <ActionButton title="Choose PDF" disabled={busy || documents.length >= MAX_DOCUMENTS} onPress={() => runPicker(chooseQuotePdfs)} />
      </View>

      {busy ? <ActivityIndicator accessibilityLabel="Adding quote" /> : null}

      {documents.length ? (
        <View style={{ gap: tokens.spacing.sm }}>
          <Text selectable style={{ fontSize: 18, fontWeight: "700", color: tokens.color.text }}>
            Quote files ({documents.length}/{MAX_DOCUMENTS})
          </Text>
          {documents.map((document, index) => (
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
                <Text selectable style={{ color: tokens.color.secondaryText }}>{document.source === "pdf" ? "PDF document" : "Quote image"}</Text>
              </View>
              <Pressable accessibilityRole="button" accessibilityLabel={`Remove ${document.name}`} onPress={() => setDocuments((current) => current.filter((item) => item.id !== document.id))} hitSlop={10}>
                <Text style={{ color: tokens.color.danger, fontWeight: "700" }}>Remove</Text>
              </Pressable>
            </View>
          ))}
        </View>
      ) : null}

      <View style={{ backgroundColor: "#ECFDF5", padding: 16, borderRadius: tokens.radius.card, borderCurve: "continuous", gap: 6 }}>
        <Text selectable style={{ fontWeight: "700", color: tokens.color.text }}>Private by default</Text>
        <Text selectable style={{ color: tokens.color.secondaryText, lineHeight: 20 }}>
          This build keeps the selected files on-device/in the app cache. Nothing is sent to an AI or backend from this screen.
        </Text>
      </View>

      <Pressable accessibilityRole="button" disabled={!documents.length || busy} onPress={continueToCase} style={({ pressed }) => ({ opacity: !documents.length || busy ? 0.45 : pressed ? 0.8 : 1, backgroundColor: tokens.color.text, padding: 18, borderRadius: tokens.radius.button, alignItems: "center" })}>
        <Text style={{ color: "white", fontWeight: "800", fontSize: 17 }}>Create Case</Text>
      </Pressable>
    </ScrollView>
  );
}

function ActionButton({ title, disabled, onPress }: { title: string; disabled: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => ({ opacity: disabled ? 0.45 : pressed ? 0.75 : 1, backgroundColor: tokens.color.surface, borderWidth: 1, borderColor: tokens.color.border, padding: 16, borderRadius: tokens.radius.button, borderCurve: "continuous" })}>
      <Text style={{ color: tokens.color.text, fontWeight: "700", fontSize: 16 }}>{title}</Text>
    </Pressable>
  );
}

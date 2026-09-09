import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { makeDocumentId } from "@/cases/case-store";
import type { CaseDocument, DocumentSource } from "@/cases/types";

function fromImageAsset(asset: ImagePicker.ImagePickerAsset, source: DocumentSource): CaseDocument {
  return {
    id: makeDocumentId(),
    source,
    uri: asset.uri,
    name: asset.fileName || `${source === "camera" ? "quote-photo" : "quote-image"}-${Date.now()}.jpg`,
    mimeType: asset.mimeType ?? "image/jpeg",
    size: asset.fileSize ?? null,
    width: asset.width || null,
    height: asset.height || null,
    createdAt: new Date().toISOString(),
  };
}

export async function takeQuotePhoto(): Promise<CaseDocument[]> {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) throw new Error("CAMERA_PERMISSION_REQUIRED");

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ["images"],
    allowsEditing: false,
    quality: 0.9,
    exif: false,
  });

  if (result.canceled) return [];
  return result.assets.map((asset) => fromImageAsset(asset, "camera"));
}

export async function chooseQuoteImages(): Promise<CaseDocument[]> {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: false,
    allowsMultipleSelection: true,
    selectionLimit: 10,
    orderedSelection: true,
    quality: 0.9,
    exif: false,
  });

  if (result.canceled) return [];
  return result.assets.map((asset) => fromImageAsset(asset, "photo_library"));
}

export async function chooseQuotePdfs(): Promise<CaseDocument[]> {
  const result = await DocumentPicker.getDocumentAsync({
    type: "application/pdf",
    multiple: true,
    copyToCacheDirectory: true,
  });

  if (result.canceled) return [];
  return result.assets.map((asset) => ({
    id: makeDocumentId(),
    source: "pdf" as const,
    uri: asset.uri,
    name: asset.name,
    mimeType: asset.mimeType ?? "application/pdf",
    size: asset.size ?? null,
    width: null,
    height: null,
    createdAt: new Date().toISOString(),
  }));
}

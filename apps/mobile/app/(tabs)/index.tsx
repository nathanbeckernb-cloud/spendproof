import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { brand } from "@/config/brand";
import { tokens } from "@/theme/tokens";

const categories = ["Auto Repair", "HVAC", "Plumbing", "Roofing"];

export default function HomeScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: tokens.spacing.md, gap: tokens.spacing.lg }}>
      <View style={{ gap: tokens.spacing.sm }}>
        <Text selectable style={{ fontSize: 30, fontWeight: "800", color: tokens.color.text }}>{brand.tagline}</Text>
        <Text selectable style={{ fontSize: 16, lineHeight: 22, color: tokens.color.secondaryText }}>
          Understand the work. Check the evidence. Know what to ask before you approve.
        </Text>
      </View>
      <Link href="/check" asChild>
        <Pressable style={{ backgroundColor: tokens.color.text, padding: 18, borderRadius: tokens.radius.button, alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 17, fontWeight: "700" }}>Check a Quote</Text>
        </Pressable>
      </Link>
      <View style={{ gap: tokens.spacing.sm }}>
        <Text selectable style={{ fontSize: 20, fontWeight: "700", color: tokens.color.text }}>What are you checking?</Text>
        <View style={{ gap: tokens.spacing.sm }}>
          {categories.map((category) => (
            <View key={category} style={{ backgroundColor: tokens.color.surface, padding: 18, borderRadius: tokens.radius.card, borderCurve: "continuous", borderWidth: 1, borderColor: tokens.color.border }}>
              <Text selectable style={{ fontSize: 17, fontWeight: "600", color: tokens.color.text }}>{category}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

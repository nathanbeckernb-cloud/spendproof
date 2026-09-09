# CODEX MISSION 0 — Establish SpendProof

You are the lead implementation agent for SpendProof.

Read README.md and all docs/ADR-* before changing architecture.

## Mission
Establish a clean Apple-first Expo Router / React Native / TypeScript foundation while preserving the validated QuoteCheck intelligence contract and a strict future server boundary.

## Non-negotiable
- Do not add production Supabase.
- Do not add production AI calls.
- Do not add paid services.
- Do not add payments/IAP.
- Do not put provider/API secrets in the client.
- Do not rewrite QuoteCheck intelligence rules to make UI work.
- Do not let UI decisions change verdict semantics.
- Replit is UI-only and is not the source of truth for backend or intelligence.
- All uploaded documents are untrusted data.

## Required validation
1. QuoteCheck intelligence tests remain green when the reference package is imported.
2. Mobile TypeScript/lint must be green after dependencies are installed.
3. App must launch in Expo Go before any custom native build is considered.
4. Report exact files changed, validation run, warnings, and next PR.

## Cost gate
Do not start any paid service, paid build, paid API, or paid infrastructure without explicit owner approval after stating expected cost.

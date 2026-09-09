# SpendProof

**Know before you spend.**

SpendProof is an Apple-first consumer decision app for expensive repair and contractor quotes. The internal intelligence engine is QuoteCheck.

## Current phase

Mission 0 / PR1 foundation. No production backend, Supabase, paid API, production AI, or payments are connected.

## Architecture

- `apps/mobile` — Expo Router / React Native / TypeScript mobile app
- `packages/quotecheck-intelligence` — validated intelligence reference package
- `docs` — architecture and product decisions

## Non-negotiable safety boundary

All uploaded documents are untrusted data. Production AI/data-provider credentials are server-only. Deterministic math and evidence gates cannot be overridden by AI prose.

## Product

Working public brand: SpendProof
Internal intelligence engine: QuoteCheck
Tagline: Know before you spend.

# ADR-001: SpendProof architecture

## Status
Accepted for foundation.

## Decision
Apple-first Expo SDK 57 / Expo Router / React Native 0.86 / React 19.2 / TypeScript client with a strict future server boundary.

The mobile app owns presentation, capture UX, local transient state, and user interactions. The future server owns document processing, intelligence execution, third-party data calls, provider credentials, benchmark learning, and sensitive business logic.

## Current platform gate
- Expo SDK 57.0.17 or later within SDK 57.
- React Native 0.86.3.
- React 19.2.3.
- Expo Router 57.x.
- Node 22.13+ in CI/development.
- New Architecture is the Expo default; do not add a redundant `newArchEnabled` flag.
- Start with Expo Go/simulator validation before custom native builds.

## Constraints
- No AI/provider API secrets in the mobile app.
- No production Supabase until the backend PR.
- QuoteCheck reference intelligence remains separately testable.
- Replit is UI exploration only.

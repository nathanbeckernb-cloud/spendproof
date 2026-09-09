# ADR-001: SpendProof architecture

## Status
Accepted for foundation.

## Decision
Apple-first Expo Router / React Native / TypeScript client with a strict future server boundary.

The mobile app owns presentation, capture UX, local transient state, and user interactions. The future server owns document processing, intelligence execution, third-party data calls, provider credentials, benchmark learning, and sensitive business logic.

## Constraints
- No AI/provider API secrets in the mobile app.
- No production Supabase in Mission 0 / PR1.
- QuoteCheck reference intelligence remains separately testable.
- Replit is UI exploration only.

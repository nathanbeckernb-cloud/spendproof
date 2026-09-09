# SDK 57 bootstrap gate

Before feature implementation on a development machine:

1. Install workspace dependencies.
2. Run `npx expo install --fix` in `apps/mobile` to confirm package alignment.
3. Run `npx expo-doctor`.
4. Run TypeScript and lint.
5. Start with Expo Go / iOS simulator before any custom native build.
6. Do not create an iOS native build unless a feature requires it or the app reaches the native/TestFlight gate.

Current foundation target:
- Expo SDK 57.0.17+
- React Native 0.86.3
- React 19.2.3
- Expo Router 57.x
- Node 22.13+

No paid service or production credential is required for this gate.

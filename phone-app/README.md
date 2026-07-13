# HomerunAI Camera (phone app)

Your own branded camera node — a cross-platform (iOS + Android) React Native /
Expo app that turns a phone into a wireless camera for the HomerunAI director.
No third-party apps, no trials. It only captures + streams; **no ML runs on the
phone.**

Streaming is done by **`@api.video/react-native-livestream`**, which wraps the
native **HaishinKit (iOS)** and **StreamPack (Android)** engines — the same
open-source libraries commercial RTMP apps are built on (RTMP + SRT, free).

## Screens
1. **Pair** — scan the QR the director shows (or type the laptop IP + camera #).
2. **Live** — camera preview, flip camera, 720p/1080p, and a **GO LIVE** button;
   publishes to `rtmp://<ip>:1935/live/<camId>`, which the director pulls.

## Requirements
- Node (installed) + `npm i -g eas-cli`
- An [Expo account](https://expo.dev) (free) for cloud builds
- Because this uses native modules, it needs a **dev/standalone build** — it
  will **not** run in the plain Expo Go app.

## Build & run (no Xcode / Android Studio needed — cloud build)
```bash
cd phone-app
npm install
npx expo install --fix        # align native package versions to the SDK
eas login
eas build --profile development --platform android   # or ios
```
Install the resulting build on your phone (Android: download the .apk; iOS:
needs an Apple Developer account for device installs). Then:
```bash
npx expo start --dev-client   # phone opens the app, connects to this Metro server
```

> If you later install Xcode / Android Studio you can skip EAS and run
> `npx expo run:ios` / `npx expo run:android` to build locally.

## Using it
1. On the laptop, start the router + director (see the main project README).
2. Open **HomerunAI Camera** on the phone (same Wi-Fi).
3. Scan the director's pairing QR, or tap **Enter address manually** and type the
   laptop IP (e.g. `10.0.0.248`) and pick a camera (`cam1`…`cam4`).
4. Tap **GO LIVE**. The director's matching tile turns into your phone's feed.

## Notes
- Locked to **landscape** (tripod filming) and keeps the screen awake while live.
- Default **720p @ 4 Mbps**; bump to 1080p @ 8 Mbps in the Live screen. See the
  main project's streaming-quality notes for network tips (dedicated AP, SRT).
- Stream key = the camera id. Point two phones at `cam1` and `cam2` and the AI
  director cuts between them.

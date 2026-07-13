import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  ApiVideoLiveStreamView,
  ApiVideoLiveStreamMethods,
} from "@api.video/react-native-livestream";
import { useKeepAwake } from "expo-keep-awake";

import { Target } from "./target";

type Res = "720p" | "1080p";
const BITRATE: Record<Res, number> = { "720p": 4_000_000, "1080p": 8_000_000 };

type Status = "idle" | "connecting" | "live" | "failed";

export default function LiveScreen({
  target,
  onUnpair,
}: {
  target: Target;
  onUnpair: () => void;
}) {
  useKeepAwake(); // don't let the screen sleep while filming
  const ref = useRef<ApiVideoLiveStreamMethods>(null);
  const [facing, setFacing] = useState<"back" | "front">("back");
  const [res, setRes] = useState<Res>("720p");
  const [status, setStatus] = useState<Status>("idle");
  const live = status === "live" || status === "connecting";

  const toggleStream = async () => {
    if (live) {
      ref.current?.stopStreaming();
      setStatus("idle");
      return;
    }
    setStatus("connecting");
    try {
      // startStreaming(streamKey, rtmpServerUrl) -> rtmpServerUrl/streamKey
      await ref.current?.startStreaming(target.key, target.server);
    } catch {
      setStatus("failed");
    }
  };

  const statusColor = { idle: "#888", connecting: "#e0a324", live: "#24e04a", failed: "#e02424" }[status];
  const statusText = {
    idle: "Ready",
    connecting: "Connecting…",
    live: `● LIVE — ${target.key}`,
    failed: "Connection failed — check Wi-Fi / director",
  }[status];

  return (
    <View style={styles.fill}>
      <ApiVideoLiveStreamView
        style={StyleSheet.absoluteFillObject}
        ref={ref}
        camera={facing}
        enablePinchedZoom
        video={{ fps: 30, resolution: res, bitrate: BITRATE[res], gopDuration: 1 }}
        audio={{ bitrate: 128_000, sampleRate: 44_100, isStereo: true }}
        isMuted={false}
        onConnectionSuccess={() => setStatus("live")}
        onConnectionFailed={() => setStatus("failed")}
        onDisconnect={() => setStatus("idle")}
      />

      {/* top status bar */}
      <View style={styles.topBar}>
        <View style={[styles.dot, { backgroundColor: statusColor }]} />
        <Text style={styles.statusText}>{statusText}</Text>
        <Text style={styles.target}>{target.label}</Text>
      </View>

      {/* controls */}
      <View style={styles.controls}>
        <Pressable
          style={styles.smallBtn}
          disabled={live}
          onPress={() => setFacing((f) => (f === "back" ? "front" : "back"))}
        >
          <Text style={[styles.smallText, live && styles.disabled]}>⟲ Flip</Text>
        </Pressable>

        <Pressable
          style={styles.smallBtn}
          disabled={live}
          onPress={() => setRes((r) => (r === "720p" ? "1080p" : "720p"))}
        >
          <Text style={[styles.smallText, live && styles.disabled]}>{res}</Text>
        </Pressable>

        <Pressable style={[styles.recBtn, live && styles.recBtnOn]} onPress={toggleStream}>
          <Text style={styles.recText}>{live ? "STOP" : "GO LIVE"}</Text>
        </Pressable>

        <Pressable style={styles.smallBtn} disabled={live} onPress={onUnpair}>
          <Text style={[styles.smallText, live && styles.disabled]}>Switch cam</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: "#000" },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  dot: { width: 12, height: 12, borderRadius: 6 },
  statusText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  target: { color: "#aaa", fontSize: 13, marginLeft: "auto" },
  controls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 18,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  smallBtn: { paddingHorizontal: 10, paddingVertical: 8 },
  smallText: { color: "#fff", fontSize: 14, fontWeight: "600" },
  disabled: { color: "#555" },
  recBtn: {
    backgroundColor: "#e02424",
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 12,
  },
  recBtnOn: { backgroundColor: "#444" },
  recText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});

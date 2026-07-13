import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

import { parseTarget, targetFromManual, Target } from "./target";

export default function PairScreen({ onPaired }: { onPaired: (t: Target) => void }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [manual, setManual] = useState(false);
  const [ip, setIp] = useState("");
  const [cam, setCam] = useState(1);
  const [error, setError] = useState<string | null>(null);

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#fff" />
      </View>
    );
  }

  if (!permission.granted && !manual) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Camera access needed</Text>
        <Text style={styles.sub}>to scan the director's pairing code</Text>
        <Pressable style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnText}>Grant camera access</Text>
        </Pressable>
        <Pressable onPress={() => setManual(true)}>
          <Text style={styles.link}>Enter address manually</Text>
        </Pressable>
      </View>
    );
  }

  const handleScan = ({ data }: { data: string }) => {
    const t = parseTarget(data);
    if (t) onPaired(t);
    else setError("That QR code isn't a HomerunAI pairing code");
  };

  const handleManual = () => {
    const t = targetFromManual(ip, cam);
    if (t) onPaired(t);
    else setError("Enter the director's IP address");
  };

  if (manual) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Connect to director</Text>
        <Text style={styles.sub}>IP address shown in the director app</Text>
        <TextInput
          style={styles.input}
          placeholder="10.0.0.248"
          placeholderTextColor="#666"
          keyboardType="numbers-and-punctuation"
          autoCapitalize="none"
          autoCorrect={false}
          value={ip}
          onChangeText={setIp}
        />
        <Text style={styles.sub}>Camera</Text>
        <View style={styles.row}>
          {[1, 2, 3, 4].map((n) => (
            <Pressable
              key={n}
              style={[styles.camChip, cam === n && styles.camChipOn]}
              onPress={() => setCam(n)}
            >
              <Text style={[styles.camChipText, cam === n && styles.camChipTextOn]}>
                cam{n}
              </Text>
            </Pressable>
          ))}
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        <Pressable style={styles.btn} onPress={handleManual}>
          <Text style={styles.btnText}>Connect</Text>
        </Pressable>
        <Pressable onPress={() => setManual(false)}>
          <Text style={styles.link}>Scan QR instead</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.fill}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleScan}
      />
      <View style={styles.overlay}>
        <Text style={styles.scanTitle}>Scan the director's pairing code</Text>
        <View style={styles.reticle} />
        {error && <Text style={styles.error}>{error}</Text>}
        <Pressable style={styles.overlayBtn} onPress={() => setManual(true)}>
          <Text style={styles.link}>Enter address manually</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: "#000" },
  center: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 6 },
  sub: { color: "#999", fontSize: 14, marginBottom: 12, marginTop: 8 },
  input: {
    width: "80%",
    color: "#fff",
    backgroundColor: "#1b1b1b",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 18,
    textAlign: "center",
  },
  row: { flexDirection: "row", gap: 10, marginBottom: 8 },
  camChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#1b1b1b",
    borderWidth: 2,
    borderColor: "#333",
  },
  camChipOn: { borderColor: "#e02424" },
  camChipText: { color: "#aaa", fontWeight: "600" },
  camChipTextOn: { color: "#fff" },
  btn: {
    backgroundColor: "#e02424",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 18,
  },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  link: { color: "#6ab7ff", marginTop: 18, fontSize: 14 },
  error: { color: "#ff6b6b", marginTop: 12, textAlign: "center" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  scanTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    position: "absolute",
    top: 60,
  },
  reticle: {
    width: 220,
    height: 220,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#fff",
    opacity: 0.8,
  },
  overlayBtn: { position: "absolute", bottom: 50 },
});

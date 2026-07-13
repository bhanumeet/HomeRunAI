import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";

import PairScreen from "./src/PairScreen";
import LiveScreen from "./src/LiveScreen";
import { Target } from "./src/target";

export default function App() {
  const [target, setTarget] = useState<Target | null>(null);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="light" />
      {target ? (
        <LiveScreen target={target} onUnpair={() => setTarget(null)} />
      ) : (
        <PairScreen onPaired={setTarget} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0d0d0d" },
});

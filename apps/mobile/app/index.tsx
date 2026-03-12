import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>EtherOS Mobile Shell</Text>
        <Text style={styles.subtitle}>Scaffold ready for portfolio views, alerts, and agent control.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#09090f",
    padding: 16
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderWidth: 1,
    borderColor: "#27272a",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#111827"
  },
  title: {
    color: "#f4f4f5",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8
  },
  subtitle: {
    color: "#d4d4d8",
    fontSize: 16,
    lineHeight: 22
  }
});

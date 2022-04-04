import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "react-native-elements";
import { Surface } from "react-native-paper";
import Button from "./Button";

export default function AppHeader({ ret, header, handleShareLocation }: {}) {
  return (
    <View style={styles.container}>
      <View style={styles.safe}>
        <Button disabled={false} title={"Back"} onPress={ret} />
        <Text style={styles.title}>{header}</Text>
        <Button
          title={"Share Location"}
          onPress={handleShareLocation}
          disabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "white",
    flexDirection: "row",
    borderBottomColor: "grey",
    alignItems: "center",
  },
  safe: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

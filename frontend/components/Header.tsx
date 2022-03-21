import { View, Text, StyleSheet, SafeAreaView, Platform } from "react-native";
import { Header } from "react-native-elements";
import { Surface } from "react-native-paper";
import Button from "./Button";

export default function AppHeader({ ret, header }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Button onPress={ret} />
        <Text style={styles.title}>{header}</Text>
      </View>
    </SafeAreaView>
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
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

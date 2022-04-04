import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "react-native-elements";
import { Surface } from "react-native-paper";
import Button from "./Button";

export default function AppHeader({ ret, header }) {
  // <SafeAreaProvider>
  //   <SafeAreaView style={styles.safe}>
  //     <View style={styles.container}>
  //       <Button title={"Back"} onPress={ret} />
  //       <Text style={styles.title}>{header}</Text>
  //     </View>
  //   </SafeAreaView>
  // </SafeAreaProvider>
  return (
    <View style={styles.container}>
      <Button title={"Back"} onPress={ret} />
      <Text style={styles.title}>{header}</Text>
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
    // backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

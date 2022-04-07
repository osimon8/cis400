import { View, Text, StyleSheet, GestureResponderEvent } from "react-native";
import { GestureEvent } from "react-native-gesture-handler";
import Button from "./Button";

export interface IAppHeader {
  ret: (event: GestureResponderEvent) => void,
  handleShareLocation: (event: GestureResponderEvent) => void
  header: string
}

export default function AppHeader({ ret, header, handleShareLocation }: IAppHeader) {
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

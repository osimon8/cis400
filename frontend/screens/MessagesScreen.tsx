import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MessagesScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "green" }}>
      <View style={{ flex: 1, backgroundColor: "red" }}></View>
    </SafeAreaView>
  );
}

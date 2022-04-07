import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
export default function MessagesScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}></View>
      <AntDesign name="forward" size={24} color="black" />
    </SafeAreaView>
  );
}

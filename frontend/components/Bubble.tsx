import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function Bubble({ text, border }) {
  return (
    <View style={border ? styles.containerBorder : styles.container}>
      <Text
        style={{
          color: "white",
          padding: 0,
        }}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#337df4",
    padding: 10,
    margin: 5,
    alignItems: "center",
    borderRadius: 15,
  },
  containerBorder: {
    backgroundColor: "#98C455",
    padding: 10,
    margin: 5,
    alignSelf: "center",
    borderRadius: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "#005DF4",
  },
});

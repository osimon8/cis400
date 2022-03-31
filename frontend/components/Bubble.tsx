import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function Bubble({ text, border }) {
  return (
    <View style={border ? styles.containerBorder : styles.container}>
      <Text
        style={{
          color: "white",
          padding: 0,
          backgroundColor: "red",
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
    borderRadius: 15,
  },
  containerBorder: {
    borderColor: "#337df4",
    borderWidth: 0.5,
    padding: 10,
    margin: 5,
    borderRadius: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "#005DF4",
  },
});

import React from "react";
import { Text, StyleSheet, Pressable, GestureResponderEvent } from "react-native";

export interface IButton {
  onPress: (event: GestureResponderEvent) => void
  title: string
  disabled: boolean
}

export default function Button({ onPress, title, disabled }: IButton) {
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 5,
      paddingHorizontal: 5,
      borderRadius: 4,
      elevation: 3,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      letterSpacing: 0.25,
      color: disabled ? "grey" : "#005DF4",
    },
  });
  return (
    <Pressable disabled={disabled} style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "#005DF4",
  },
});

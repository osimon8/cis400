import * as React from "react";
import { View, StyleSheet, Button, TextInput } from "react-native";

export default function RegistrationScreen({
  navigation,
}: {
  navigation: any;
}) {
  const [firstName, setFirstName] = React.useState("");
  const [secondName, setSecondName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSignup = () => {
    navigation.navigate("Login", { name: "Daniel" });
    //hashing the password
    console.log("hellow this is it");
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="First name"
        style={styles.input}
        onChangeText={(val) => {
          setFirstName(val);
          console.log(firstName);
        }}
      />
      <TextInput
        placeholder="Second name"
        style={styles.input}
        onChangeText={(val) => {
          setSecondName(val);
          console.log(secondName);
        }}
      />
      <TextInput
        placeholder="Username"
        style={styles.input}
        onChangeText={(val) => {
          setUsername(val);
          console.log(username);
        }}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        onChangeText={(val) => {
          setPassword(val);
          console.log(password);
        }}
      />
      <Button title="Sign up" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "90%",
    marginVertical: 5,
    borderWidth: 0,
    borderBottomWidth: 1,
    padding: 10,
  },
});
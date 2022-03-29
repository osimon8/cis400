import * as React from "react";
import { View, StyleSheet, Button, TextInput } from "react-native";
import { register } from "../api";

export default function RegistrationScreen({
  navigation,
}: {
  navigation: any;
}) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const handleSignup = () => {
    register(email, password, firstName, lastName)
      .then(function (response) {
        console.log(response.status);
      })
      .catch(function (error) {
        console.log("failed");
      });
    navigation.navigate("Login", { name: "Daniel", message: "hehahha" });
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="First name"
        style={styles.input}
        onChangeText={(val) => {
          setFirstName(val);
        }}
      />
      <TextInput
        placeholder="Second name"
        style={styles.input}
        onChangeText={(val) => {
          setLastName(val);
        }}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={(val) => {
          setEmail(val);
        }}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        onChangeText={(val) => {
          setPassword(val);
        }}
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        onChangeText={(val) => {
          setPasswordConfirmation(val);
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

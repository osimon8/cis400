import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { register } from "../api";
import { inputValidation, passwordCheck } from "./Action";
import Button from "../components/Button";

export interface IRegistrationScreen {
  navigation: any
}

export default function RegistrationScreen(props : IRegistrationScreen) {
  const { navigation } = props
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [signUpDisable, setSignUpDisable] = useState(true);
  const [passwordConfirmationEditable, setPasswordConfirmationEditable] = useState(false);

  const handleSignup = () => {
    register(email, password, firstName, lastName)
      .then(() => navigation.navigate("Login", { name: `${firstName} ${lastName}`, message: "" }))
      .catch(function (error) {
        setErrorMessage("Internal error. Try again :(");
        console.error(error);
      });
  };

  useEffect(() => {
    switch (passwordCheck(password, passwordConfirmation)) {
      case "Valid Password":
        setPasswordConfirmationEditable(true);
        setErrorMessage("Valid Password");
        setSignUpDisable(false);
        break;
      case "Invalid Password":
        setPasswordConfirmationEditable(false);
        setErrorMessage("Invalid Password");
        setSignUpDisable(true);
        break;
      case "Passwords match":
        if (inputValidation(firstName, lastName, email)) {
          setPasswordConfirmationEditable(true);
          setErrorMessage("");
          setSignUpDisable(false);
        } else {
          setErrorMessage("Missing fields");
          setSignUpDisable(true);
        }
        break;
      default:
        setPasswordConfirmationEditable(true);
        setErrorMessage("Passwords don't match");
        setSignUpDisable(true);
        break;
    }
  }, [password])

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.inner}>
          <TextInput
            placeholder="First Name"
            style={styles.input}
            onChangeText={setFirstName}
          />
          <TextInput
            placeholder="Last Name"
            style={styles.input}
            onChangeText={setLastName}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={setEmail}
          />
          <TextInput
            secureTextEntry={true}
            textContentType="password"
            placeholder="Password"
            style={styles.input}
            onChangeText={setPassword}
          />
          <TextInput
            secureTextEntry={true}
            textContentType="password"
            placeholder="Confirm Password"
            style={styles.input}
            onChangeText={setPasswordConfirmation}
            editable={passwordConfirmationEditable}
          />
          <Text style={styles.error}>
            {errorMessage}
          </Text>
          <Button
            disabled={signUpDisable}
            title="Sign up"
            onPress={handleSignup}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    width: "90%",
    marginVertical: 5,
    borderWidth: 0,
    borderBottomWidth: 1,
    padding: 10,
    alignSelf: "center",
  },
  inner: {
    marginLeft: 10,
    marginRight: 10,
  },
  error: {
    color: "red",
    textAlign: "center"
  }
});

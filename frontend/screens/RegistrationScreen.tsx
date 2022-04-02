import * as React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { register } from "../api";
import { inputValidation, passwordCheck } from "./Action";
import Button from "../components/Button";

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
  const [errorMessage, setErrorMessage] = React.useState("");
  const [signupDisable, setDisable] = React.useState(true);
  const [editable, setEditable] = React.useState(false);

  const handleSignup = () => {
    register(email, password, firstName, lastName)
      .then(function (response) {
        navigation.navigate("Login", { name: "Daniel", message: "hehahha" });
      })
      .catch(function (error) {
        setErrorMessage("Internal error. Try again :(");
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.inner}>
          <TextInput
            placeholder="First name"
            style={styles.input}
            onChangeText={(val) => {
              if (inputValidation(val, lastName, email)) {
                switch (passwordCheck(password, passwordConfirmation)) {
                  case "Passwords match":
                    setErrorMessage("You can register :)");
                    setDisable(false);
                    break;
                  default:
                    setDisable(true);
                }
              } else {
                setDisable(true);
              }
              setFirstName(val);
            }}
          />
          <TextInput
            placeholder="Last name"
            style={styles.input}
            onChangeText={(val) => {
              if (inputValidation(firstName, val, email)) {
                switch (passwordCheck(password, passwordConfirmation)) {
                  case "Passwords match":
                    setErrorMessage("You can register :)");
                    setDisable(false);
                    break;
                  default:
                    setDisable(true);
                }
              } else {
                setDisable(true);
              }
              setLastName(val);
            }}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={(val) => {
              if (inputValidation(firstName, lastName, val)) {
                switch (passwordCheck(password, passwordConfirmation)) {
                  case "Passwords match":
                    setErrorMessage("You can now register :)");
                    setDisable(false);
                    break;
                  default:
                    setDisable(true);
                }
              } else {
                setDisable(true);
              }
              setEmail(val);
            }}
          />
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            style={styles.input}
            onChangeText={(val) => {
              console.log("passwords", [
                val,
                passwordConfirmation,
                val === passwordConfirmation,
              ]);
              setPassword(val);
              switch (passwordCheck(val, passwordConfirmation)) {
                case "Valid Password":
                  setEditable(true);
                  setErrorMessage("Valid Password");
                  break;
                case "Invalid Password":
                  setEditable(false);
                  setErrorMessage("Invalid Password");
                  break;
                case "Passwords match":
                  if (inputValidation(firstName, lastName, email)) {
                    setEditable(true);
                    setDisable(false);
                    setErrorMessage("Passwords match");
                  } else {
                    setErrorMessage("Missing inputs :)");
                  }
                  break;
                default:
                  setEditable(true);
                  setDisable(true);
                  setErrorMessage("Passwords don't match");
                  break;
              }
            }}
          />
          <TextInput
            secureTextEntry={true}
            textContentType="password"
            placeholder="Confirm Password"
            style={styles.input}
            onChangeText={(val) => {
              setPasswordConfirmation(val);
              switch (passwordCheck(password, val)) {
                case "Passwords match":
                  if (inputValidation(firstName, lastName, email)) {
                    setDisable(true);
                  } else {
                    setErrorMessage("Missing inputs :)");
                  }
                  break;
                default:
                  console.log("passwords", { password, val });
                  setDisable(true);
                  setErrorMessage("Password don't match");
                  break;
              }
            }}
            editable={editable}
          />
          <Text style={{ color: "red", textAlign: "center" }}>
            {errorMessage}
          </Text>
          <Button
            disabled={signupDisable}
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
});

import * as React from "react";
import AppContext from "../AppContext";

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";

export default function LoginScreen({
  navigation,
  handleLoginCallBack,
}: {
  navigation: any;
  handleLoginCallBack: (
    email: String,
    password: String,
    callBack: (error: string) => void
  ) => void;
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSetError = (error: string) => {
    setErrorMessage(error);
  };
  const handleLogin = () => {
    if (email === "" || password === "") {
      setErrorMessage("Email and Password can't be empty");
    } else {
      let trimmedEmail = email.trim();
      let trimmedPassword = email.trim();
      handleLoginCallBack(trimmedEmail, trimmedPassword, handleSetError);
    }
  };
  const handleRegistration = () => {
    navigation.navigate("Registration");
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Password"
        style={styles.input}
        onChangeText={setPassword}
      />
      <Text style={{ color: "red" }}>{errorMessage}</Text>
      <Text style={styles.text}>
        Don't have an account?{" "}
        <Text style={styles.hyperlink} onPress={handleRegistration}>
          Sign up here.
        </Text>
      </Text>
      <Button title="Login" onPress={handleLogin} />
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

  text: {
    fontWeight: "bold",
    paddingBottom: 5,
  },

  hyperlink: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";
// import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import HomeScreen from "./screens/MapScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabScreen from "./screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppContext from "./AppContext";
import { useState } from "react";
import { login } from "./action";

const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  const Stack = createStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = (email: String, password: String) => {
    login(email, password)
      .then((response) => {
        console.log("hehahahhahahha");
        setIsLoggedIn(true);
        // navigation.navigate("Home", { name: "Daniel" });
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            console.log("Invalid password");
            break;
          case 404:
            console.log("User not found");
            break;
        }
      });
  };
  const handleRegistration = () => {
    navigation.navigate("Registration", { name: "Arnaud" });
  };

  function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={setPassword}
        />
        <Text style={styles.text}>
          Don't have an account?{" "}
          <Text style={styles.hyperlink} onPress={handleRegistration}>
            Sign up here.
          </Text>
        </Text>
        <Button
          title="Login"
          onPress={() => {
            handleLogin(email, password);
          }}
        />
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

  return (
    <NavigationContainer>
      <StatusBar hidden={false} backgroundColor="#00BCD4" translucent={true} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={TabScreen}
              options={{ title: "" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Login" }}
            />
            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ title: "Registration" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

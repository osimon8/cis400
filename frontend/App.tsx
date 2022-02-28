import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import HomeScreen from "./screens/MapScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabScreen from "./screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppContext from "./AppContext";
import { useEffect, useState } from "react";
import { login } from "./action";
import * as SecureStore from "expo-secure-store";

const Tab = createBottomTabNavigator();

//Function for storing the token
async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}
//Function for retrieve user login token
async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
    return result;
  } else {
    return null;
  }
}

export default function App({ navigation }) {
  const Stack = createStackNavigator();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setToken] = useState("");
  const handleLogin = (email: String, password: String) => {
    console.log("test", { email, password });
    login(email, password)
      .then((response) => {
        console.log("here is the pass");
        setIsLoggedIn(true);
        save("authToken", response.data);
      })
      .catch((error) => {
        console.log("error", error);
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

  // useEffect(() => {
  //   SecureStore.getItemAsync("authToken").then((response) => {
  //     setToken(authToken);
  //   });
  // });

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
            <Stack.Screen name="Login" options={{ title: "Login" }}>
              {(props) => (
                <LoginScreen {...props} handleLoginCallBack={handleLogin} />
              )}
            </Stack.Screen>

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
  containerLogin: {
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

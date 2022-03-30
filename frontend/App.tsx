import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabScreen from "./screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import MessageScreen from "./screens/MessageScreen";
import { login } from "./api";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { UserContext } from "./Context";

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
    login(email, password)
      .then((response) => {
        console.log("here is the pass");
        setIsLoggedIn(true);
        save("authToken", response.data);
        setToken(response.data);
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
  const handleLogout = () => {
    setIsLoggedIn(false);
    SecureStore.deleteItemAsync("authToken")
      .then((res) => {
        console.log("successfull", res);
      })
      .catch((error) => {
        console.log("failed", error);
      });
  };
  const handleRegistration = () => {
    navigation.navigate("Registration", { name: "Arnaud" });
  };
  useEffect(() => {
    SecureStore.getItemAsync("authToken").then((response) => {
      setToken(authToken);
    });
  }, []);

  return (
    <UserContext.Provider value={authToken}>
      <NavigationContainer>
        <StatusBar
          hidden={false}
          backgroundColor="#00BCD4"
          translucent={true}
        />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn && authToken !== "" ? (
            <>
              <Stack.Screen name="Home" options={{ title: "" }}>
                {(props) => (
                  <TabScreen {...props} handleLogoutCallBack={handleLogout} />
                )}
              </Stack.Screen>
              <Stack.Screen name="message" component={MessageScreen} />
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
    </UserContext.Provider>
  );
}

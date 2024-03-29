import React from "react";
import { useState } from "react";

import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context"

import { login } from "./api";
import { UserContext } from "./Context";

import TabScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import MessageScreen from "./screens/MessageScreen";

export default function App() {
  const Stack = createStackNavigator();
  const [authToken, setToken] = useState("");

  const handleLogin = (
    email: String,
    password: String,
    callBack: (error: string) => void
  ) => {
    login(email, password)
      .then((response) => {
        setToken(response.data);
        callBack("");
      })
      .catch((error) => {
        switch (error?.response?.status) {
          case 401:
            callBack("Invalid password");
            break;
          case 404:
            callBack("User not found");
            break;
          default:
            console.error(error)
            callBack("Not connected to the internet.");
            break;
        }
      });
  };

  const handleLogout = () => {
    setToken("")
    SecureStore.deleteItemAsync("authToken")
      .catch(console.error);
  };


  return (
    <SafeAreaProvider>
    <UserContext.Provider value={authToken}>
      <NavigationContainer>
        <StatusBar
          hidden={false}
          backgroundColor="#00BCD4"
          translucent={true}
        />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {authToken ? (
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
    </SafeAreaProvider>
  );
}

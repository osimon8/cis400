import React from "react";
import { useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context"

import { login } from "./api";
import { UserContext } from "./Context";

import TabScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import MessageScreen from "./screens/MessageScreen";
import ProfileScreen from "./screens/ProfileScreen";

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

export default function App({ navigation }: { navigation: any }) {
  const Stack = createStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setToken] = useState("");

  const handleLogin = (
    email: String,
    password: String,
    callBack: (error: string) => void
  ) => {
    login(email, password)
      .then((response) => {
        setIsLoggedIn(true);
        save("authToken", response.data);
        setToken(response.data);
        console.log("userINfor", response.data);
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
    navigation.navigate("Registration");
  };
  useEffect(() => {
    SecureStore.getItemAsync("authToken").then((response) => {
      setToken(authToken);
    });
  }, []);

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
          {isLoggedIn && authToken !== "" ? (
            <>
              <Stack.Screen name="Home" options={{ title: "" }}>
                {(props) => (
                  <TabScreen {...props} handleLogoutCallBack={handleLogout} />
                )}
              </Stack.Screen>
              <Stack.Screen name="message" component={MessageScreen} />
              <Stack.Screen name="profile" options={{ title: "friendProfile" }}>
                {(props) => (
                  <ProfileScreen {...props} id_here={0} currentUser={false} />
                )}
              </Stack.Screen>
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

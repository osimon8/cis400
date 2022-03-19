import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SearchBar } from "react-native-elements";
import App from "./MapScreen";
import FriendScreen from "./FriendsScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import MessagesScreen from "./MessagesScreen";
import * as SecureStore from "expo-secure-store";
import { getFriends } from "../action";

const Tab = createBottomTabNavigator();

export default function TabScreen({ handleLogoutCallBack }) {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    SecureStore.getItemAsync("authToken").then((res) => {
      getFriends(res).then((response) => {
        setFriends(response.data);
      });
    });
  }, []);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Map"
        options={{
          tabBarIcon: () => <FontAwesome name="map" size={24} color="black" />,
        }}
      >
        {(props) => (
          <App {...props} handleLogoutCallback={handleLogoutCallBack} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Friends"
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="user-friends" size={24} color="black" />
          ),
        }}
      >
        {(props) => <FriendScreen {...props} friends={friends} />}
      </Tab.Screen>
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: () => <Entypo name="message" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}

import React, { useState } from "react";
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

const Tab = createBottomTabNavigator();

export default function TabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Map"
        component={App}
        options={{
          tabBarIcon: () => <FontAwesome name="map" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="user-friends" size={24} color="black" />
          ),
        }}
      />
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

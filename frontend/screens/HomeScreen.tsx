import React, { useState, useEffect, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import App from "./MapScreen";
import LocationScreen from "./LocationScreen";
import FriendScreen from "./FriendsScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import MessagesScreen from "./MessagesScreen";
import * as SecureStore from "expo-secure-store";
import { getFriends } from "../api";
import { UserContext } from "../Context";

const Tab = createBottomTabNavigator();

export default function TabScreen({ handleLogoutCallBack }) {
  //retrieve the authToken from the context
  const authToken = useContext(UserContext);
  console.log("authToken", authToken);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    getFriends(authToken)
      .then((response) => {
        setFriends(response.data);
      })
      .catch((error) => {
        console.log(error);
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
          <LocationScreen
            {...props}
            handleLogoutCallback={handleLogoutCallBack}
          />
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

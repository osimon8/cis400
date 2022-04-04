import React, { useState, useEffect, useContext } from "react";
import { FontAwesome5, FontAwesome, Entypo } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { getFriends } from "../api";
import { UserContext } from "../Context";
import FriendScreen from "./FriendsScreen";
import MessagesScreen from "./MessagesScreen";
import MyBuddies from "./MyBuddies";

const Tab = createBottomTabNavigator();

export default function TabScreen({ handleLogoutCallBack }) {
  //retrieve the authToken from the context
  const authToken = useContext(UserContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    getFriends(authToken)
      .then((response) => {
        console.log(response.data);
        setFriends(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Map"
        options={{
          tabBarIcon: () => <FontAwesome name="map" size={24} color="black" />,
        }}
      >
        {(props) => <MyBuddies handleLogoutCallback={handleLogoutCallBack} />}
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

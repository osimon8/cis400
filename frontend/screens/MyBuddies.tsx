import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import {
  getNearbyFriends,
  sendMessage,
  setOnlineStatus,
  setUserLocation,
} from "../api";
import { UserContext } from "../Context";
import { FriendItemList } from "../components/FriendItemList";
import LocationScreen from "./LocationScreen";
import MapScreen from "./MapScreen";

export default function MyBuddies({
  navigation,
  handleLogoutCallback,
}: {
  navigation: any;
  handleLogoutCallBack: (
    email: String,
    pass: String,
    cl: (err: string) => void
  ) => void;
}) {
  const authToken = useContext(UserContext);
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(1.9441);
  const [friends, setFriends] = useState(null);
  const [clickedFriend, setClickedFriend] = useState("");
  const [clickedFriendId, setClickedFriendId] = useState("");
  const [longitude, setLongitude] = useState(30.0619);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isEnabledAvailability, setIsEnabledAvailability] = useState(true);
  const [isEnabledViews, setIsEnabledViews] = useState(false);
  const [message, setMessage] = useState("");
  const toggleSwitchAvailability = () => {
    setOnlineStatus(authToken, !isEnabledAvailability)
      .then(() => {
        console.log("success setting status");
        setIsEnabledAvailability((previousState) => !previousState);
      })
      .catch((error) => {
        console.log("failed to set status", error);
      });
  };
  const toggleSwitchViews = () =>
    setIsEnabledViews((previousState) => !previousState);
  //retrieves the users location

  const handleOpen = (id: string, firstName: string, lastName: string) => {
    setClickedFriend(`${firstName} ${lastName}`);
    setClickedFriendId(id);
    setModalVisible(true);
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("hahah", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      //retrieving the user token
      getNearbyFriends(authToken)
        .then((resp) => {
          setFriends(resp.data);
        })
        .catch((error) => {
          console.log("error near friends", error.message);
        });
      //Getting the user location
      Location.getCurrentPositionAsync({})
        .then((resp) => {
          var coords = resp["coords"];
          setLatitude(coords["latitude"]);
          setLongitude(coords["longitude"]);
          //setting the user location in the backend
          setUserLocation(authToken, coords["longitude"], coords["latitude"])
            .then((results) => {
              console.log("location saved", results.status);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Text style={{ padding: 2 }}>{"Views"}</Text>
          <Switch
            trackColor={{ false: "#ffffff", true: "#ffffff" }}
            thumbColor={isEnabledViews ? "#157106" : "#FF0000"}
            ios_backgroundColor="#fffff"
            onValueChange={toggleSwitchViews}
            value={isEnabledViews}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Text style={{ padding: 2 }}>{"Availability"}</Text>
          <Switch
            trackColor={{ false: "#ffffff", true: "#ffffff" }}
            thumbColor={isEnabledAvailability ? "#157106" : "#FF0000"}
            ios_backgroundColor="#fffff"
            onValueChange={toggleSwitchAvailability}
            value={isEnabledAvailability}
          />
        </View>
      </View>
      {isEnabledViews ? (
        <MapScreen
          userLongitude={longitude}
          userLatitude={latitude}
          retrievedFriends={friends}
        />
      ) : (
        <LocationScreen navigation={navigation} retrievedFriends={friends} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
});

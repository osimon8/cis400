import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import {
  getNearbyFriends,
  setOnlineStatus,
  setUserLocation,
} from "../api";
import { UserContext } from "../Context";
import LocationScreen from "./LocationScreen";
import MapScreen from "./MapScreen";

export default function MyBuddies({ navigation }: { navigation: any }) {
  const authToken = useContext(UserContext);
  const [latitude, setLatitude] = useState<null | number>();
  const [longitude, setLongitude] = useState<null | number>();
  const [friends, setFriends] = useState(null);
  const [isEnabledAvailability, setIsEnabledAvailability] = useState(true);
  const [isMapView, setIsMapView] = useState(false);

  const toggleSwitchAvailability = () => {
    setOnlineStatus(authToken, !isEnabledAvailability)
    setIsEnabledAvailability((previousState) => !previousState);
  };
  const toggleSwitchViews = () => setIsMapView((previousState) => !previousState);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }
        const { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;
        setLatitude(latitude);
        setLongitude(longitude);
        await setUserLocation(authToken, String(latitude), String(longitude));
        const { data: friends } = await getNearbyFriends(authToken);
        setFriends(friends);
      } catch (error) {
        console.error(error)
      } 
    })()
  }, [])

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
            thumbColor={isMapView ? "#157106" : "#FF0000"}
            ios_backgroundColor="#fffff"
            onValueChange={toggleSwitchViews}
            value={isMapView}
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
          <Text style={{ padding: 2 }}>Availability</Text>
          <Switch
            trackColor={{ false: "#ffffff", true: "#ffffff" }}
            thumbColor={isEnabledAvailability ? "#157106" : "#FF0000"}
            ios_backgroundColor="#fffff"
            onValueChange={toggleSwitchAvailability}
            value={isEnabledAvailability}
          />
        </View>
      </View>
      {isMapView
        ? (
          <MapScreen
            navigation={navigation}
            longitude={longitude}
            latitude={latitude}
            retrievedFriends={friends}
          />
        )
        : (
          <LocationScreen
            navigation={navigation}
            retrievedFriends={friends}
          />
        )
      }
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

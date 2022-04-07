// TODO: Refactor this to split logic related to MapScreen and FriendsScreen into separate components

import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import {
  setOnlineStatus,
  setUserLocation,
} from "../api";
import { UserContext } from "../Context";
import LocationScreen from "../screens/NearbyScreen";
import MapScreen from "../screens/MapScreen";

export default function NearbyScreen({ navigation, isMapView }: { navigation: any, isMapView: boolean }) {
  const authToken = useContext(UserContext);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [isEnabledAvailability, setIsEnabledAvailability] = useState(false);

  const toggleSwitchAvailability = () => {
    setIsEnabledAvailability((previousState) => !previousState);
  };

  useEffect(() => {
    setOnlineStatus(authToken, isEnabledAvailability)
  }, [authToken, isEnabledAvailability])

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
        setUserLocation(authToken, String(longitude), String(latitude));
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
        </View>
        <View
          style={{
            flexDirection: "row",
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
          />
        )
        : (
          <LocationScreen
            navigation={navigation}
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

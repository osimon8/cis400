// import * as React from 'react';
import MapView, { Marker, Callout } from "react-native-maps";
import React, { useState, useEffect } from "react";
import CloseCircleFilled from "@ant-design/icons";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Switch,
  Pressable,
  Alert,
  Modal,
  TouchableHighlight,
  Image,
} from "react-native";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(1.9441);
  const [longitude, setLongitude] = useState(30.0619);
  const [latitudeDelta, setLatitudeDelta] = useState(0);
  const [longitudeDelta, setLongitudeDelta] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  //retrieves the users location
  const coordinates = { latitude: latitude, longitude: longitude };
  const coordinatesF = { latitude: 39.96241611314298, longitude: longitude };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      var coords = location["coords"];
      setLatitude(coords["latitude"]);
      setLongitude(coords["longitude"]);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    console.log("hehehe");
  }

  const handlePrint = () => {
    console.log(latitude);
    console.log(longitude);
  };
  return (
    <View style={styles.container}>
      <View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.233,
            longitudeDelta: 0.8838,
          }}
        >
          <Marker coordinate={coordinates} />

          <Marker coordinate={coordinatesF}>
            <Callout tooltip>
              <TouchableHighlight onPress={() => setModalVisible(true)}>
                <View>
                  <Text>thhaah</Text>
                </View>
              </TouchableHighlight>
            </Callout>
          </Marker>
          <Modal
            style={styles.modalView}
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {/* <CloseCircleFilled /> */}
                <Image
                  source={{
                    uri: "https://image.api.playstation.com/vulcan/img/cfn/11307AuFZKrw6DorTNAC3WdWnAKpEx70fOdGFLJgROeERlzQLhhUi7N1ttK_O6tq-_Kp-D9FEbVIJ0btI5-gfeGPN9Ib8vhy.png",
                  }}
                  style={{ width: 180, height: 180, borderRadius: 90 }}
                />
                <Text style={styles.modalText}>Hello World!</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </MapView>
      </View>
      <Switch
        style={{ position: "absolute", top: "20%" }}
        trackColor={{ false: "#767577", true: "#ffffff" }}
        thumbColor={isEnabled ? "#157106" : "#f4f3f4"}
        ios_backgroundColor="#fffff"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

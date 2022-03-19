// import * as React from 'react';
import MapView, { Marker, Callout, Circle } from "react-native-maps";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Switch,
  Alert,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
} from "react-native";
import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";
import { setUserLocation } from "../action";

export default function App({ handleLogoutCallback }) {
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
  const handleOpen = () => {
    console.log("helloo");
    setModalVisible(true);
  };
  useEffect(() => {
    (async () => {
      console.log("hshhshhshshsh");
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("hahah", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      //retrieving the user token
      SecureStore.getItemAsync("authToken").then((auth) => {
        //Getting the user location
        Location.getCurrentPositionAsync({}).then((resp) => {
          var coords = resp["coords"];
          setLatitude(coords["latitude"]);
          setLongitude(coords["longitude"]);
          //setting the user location in the backend
          setUserLocation(auth, coords["longitude"], coords["latitude"])
            .then((results) => {
              console.log("location saved", results.status);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    console.log("hehehe");
  }
  return (
    <View style={styles.container}>
      <View
        style={{ backgroundColor: "white", height: 40, flexDirection: "row" }}
      >
        <Button title="Logout" onPress={() => handleLogoutCallback()} />
        <Switch
          style={{ position: "absolute", top: 0, right: 0, margin: 5 }}
          trackColor={{ false: "#ffffff", true: "#ffffff" }}
          thumbColor={isEnabled ? "#157106" : "#FF0000"}
          ios_backgroundColor="#fffff"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={() => handleOpen}
          // provider={"google"}
        >
          <Marker coordinate={coordinates} pinColor="#157106" />

          <Marker coordinate={coordinatesF} onPress={handleOpen}>
            <Callout tooltip>
              <TouchableHighlight underlayColor="#dddddd">
                <View>
                  <Text></Text>
                </View>
              </TouchableHighlight>
            </Callout>
          </Marker>
          <Circle
            onPress={() => console.log("pressed")}
            center={coordinates}
            radius={2000}
            strokeWidth={1}
            strokeColor={"#C86F6F"}
            fillColor={"rgba(230,238,255,0.5)"}
          />
          <Circle
            onPress={() => console.log("pressed")}
            center={coordinates}
            radius={1000}
            strokeWidth={1}
            strokeColor={"#1a66ff"}
            fillColor={"rgba(230,238,255,0.5)"}
          />
        </MapView>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: "100%",
                backgroundColor: "blue",
                marginBottom: 30,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  right: 0,
                }}
              >
                <Button
                  title="Close"
                  onPress={() => setModalVisible(!modalVisible)}
                ></Button>
              </View>
            </View>

            <Image
              style={styles.imageModal}
              source={{
                uri: "https://images-na.ssl-images-amazon.com/images/I/81nKBuQzyjL.jpg",
              }}
            />
            <Text style={{ fontSize: 28 }}>Arnaud Mutabazi</Text>
            <Text>Quick Texts</Text>
            <View style={{ width: "80%", marginTop: 10 }}></View>
            <TouchableOpacity>
              <View style={styles.button}>
                <Text>Wanna get some lunch?</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.button}>
                <Text>What are you up to?</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.button}>
                <Text>Wanna grab a drink?</Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#DDDDDD",
                borderRadius: 40,
                paddingLeft: 15,
                paddingRight: 15,
                width: "80%",
              }}
            >
              <View style={{ flex: 2.25 }}>
                <TextInput
                  style={styles.input}
                  placeholder="useless placeholder"
                />
              </View>

              <View style={{ flex: 0.75 }}>
                <Button
                  title="send"
                  onPress={() => setModalVisible(!modalVisible)}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
  imageModal: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "60%",
    width: "80%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#DDDDDD",
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 30,
    margin: 12,
    width: "80%",
    padding: 10,
  },
});

// import * as React from 'react';
import MapView, { Marker, Callout, Circle } from "react-native-maps";
import React, { useState, useEffect, useContext } from "react";
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
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendMessage } from "../api";
import { UserContext } from "../Context";

export default function MapScreen({
  userLongitude,
  userLatitude,
  retrievedFriends,
}) {
  const authToken = useContext(UserContext);
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(userLatitude);
  const [friends, setFriends] = useState(retrievedFriends);
  const [longitude, setLongitude] = useState(userLongitude);
  const [clickedFriend, setClickedFriend] = useState("");
  const [clickedFriendId, setClickedFriendId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [message, setMessage] = useState("");
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  //retrieves the users location
  const coordinates = { latitude: latitude, longitude: longitude };
  const coordinatesF = { latitude: 39.96241611314298, longitude: longitude };
  const handleOpen = (id: string, firstName: string, lastName: string) => {
    setClickedFriend(`${firstName} ${lastName}`);
    setClickedFriendId(id);
    setModalVisible(true);
  };
  useEffect(() => {}, []);

  const mapMarkers = () => {
    if (friends) {
      const oneMile = friends["1"].map((item: Object) => {
        let lat = latitude;
        let long = longitude;
        let nd = (1600 * Math.cos(-90)) / 111111;
        let ed = (600 * Math.sin(-90)) / Math.cos(lat) / 111111;
        console.log(item);
        return (
          <Marker
            // key={report.id}
            coordinate={{ latitude: lat + nd, longitude: long + ed }}
            // title={report.location}
            // description={report.comments}
            pinColor="blue"
            onPress={() => handleOpen(item.id, item.firstName, item.lastName)}
          />
        );
      });
      return oneMile;
    }
  };
  const handleSendingMessage = () => {
    if (message.match(/(?!^ +$)^.+$/)) {
      let trimmedMessage = message.trim();
      sendMessage(authToken, clickedFriendId, trimmedMessage)
        .then((response) => {
          console.log("testing chating", response);
        })
        .catch((err) => {
          console.log(err);
        });
      setModalVisible(!modalVisible);
      setMessage("");
      navigation.navigate("message", {
        friendId: clickedFriendId,
        firstName: clickedFriend.split(" ")[0],
        lastName: clickedFriend.split(" ")[1],
      });
    }
  };
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    console.log("hehehe");
  }
  return (
    <SafeAreaView>
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
        >
          <Marker coordinate={coordinates} pinColor="#157106" />
          {mapMarkers()}
          <Circle
            onPress={() => console.log("pressed")}
            center={coordinates}
            radius={3200}
            strokeWidth={1}
            strokeColor={"#C86F6F"}
            fillColor={"rgba(230,238,255,0.2)"}
          />

          <Circle
            onPress={() => console.log("pressed")}
            center={coordinates}
            radius={1609}
            strokeWidth={1}
            strokeColor={"#1a66ff"}
            fillColor={"rgba(230,238,255, 0.5)"}
            zIndex={3}
          />
          <Circle
            onPress={() => console.log("pressed")}
            center={coordinates}
            radius={4800}
            strokeWidth={1}
            strokeColor={"#1a66ff"}
            fillColor={"rgba(230,238,255,0.1)"}
            zIndex={1}
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
                  onPress={() => {
                    //clear the message in the modal
                    setMessage("");
                    setModalVisible(!modalVisible);
                  }}
                ></Button>
              </View>
            </View>

            <Image
              style={styles.imageModal}
              source={{
                uri: "https://images-na.ssl-images-amazon.com/images/I/81nKBuQzyjL.jpg",
              }}
            />
            <Text style={{ fontSize: 28 }}>{clickedFriend}</Text>
            <Text>Quick Texts</Text>
            <View style={{ width: "80%", marginTop: 10 }}>
              <TouchableOpacity
                style={{ flexDirection: "column" }}
                onPress={() => {
                  setMessage("Wanna get some lunch?");
                }}
              >
                <View style={styles.button}>
                  <Text>Wanna get some lunch?</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setMessage("What are you up to?");
                }}
              >
                <View style={styles.button}>
                  <Text>What are you up to?</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setMessage("Wanna grab a drink?");
                }}
              >
                <View style={styles.button}>
                  <Text>Wanna grab a drink?</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#DDDDDD",
                borderRadius: 40,
                paddingLeft: 15,
                paddingRight: 15,
                width: "80%",
              }}
            >
              <View style={{ flex: 2.25 }}>
                <TextInput
                  value={message}
                  style={styles.input}
                  placeholder="useless placeholder"
                  onChangeText={(e) => {
                    setMessage(e);
                  }}
                />
              </View>

              <View style={{ flex: 0.75 }}>
                <Button title="send" onPress={handleSendingMessage} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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

    width: "80%",
    padding: 10,
  },
});

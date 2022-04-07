import MapView, { Marker, Circle } from "react-native-maps";
import React, { useState, useContext, useMemo, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendMessage, getNearbyFriends, BASE_URL } from "../api";
import { UserContext } from "../Context";

export interface IMapScreen {
  navigation: any
  longitude: any
  latitude: any
  friends: any
}

export default function MapScreen({
  navigation,
  longitude,
  latitude,
}: IMapScreen) {
  const authToken = useContext(UserContext);
  const [loading, setLoading] = useState(true); 
  const [friends, setFriends] = useState({});
  const [clickedFriend, setClickedFriend] = useState("");
  const [clickedFriendId, setClickedFriendId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const coordinates = { latitude, longitude };

  useEffect(() => {
    const fetchFriends = () => getNearbyFriends(authToken)
      .then((response) => {
        console.log(response.data)
        setFriends(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setInterval(fetchFriends, 5000);
  }, []);

  const mapRef = useRef();

  
  const handleOpen = (id: string, firstName: string, lastName: string) => {
    setClickedFriend(`${firstName} ${lastName}`);
    setClickedFriendId(id);
    setModalVisible(true);
  };

  const mapMarkers = useMemo(() => {
    const markers = []
    const {
      "1": first = [],
      shared = []
    } = friends
    const seen = {}

    first.forEach((friend: any) => {
      seen[friend?.id] = friend
    })
    
    first
    .filter((friend: any) => shared.every((s: any) => s?.id != friend?.id))
    .forEach((friend: any) => {
      const nd = (1600 * Math.cos(-90)) / 111111;
      const ed = (600 * Math.sin(-90)) / Math.cos(latitude) / 111111;
      console.log(                `${BASE_URL}users/getPFP/${friend?.id}`,
      )
      markers.push(
        <Marker 
          key={friend?.id}
          coordinate={{ latitude: latitude + nd, longitude: longitude + ed }}
          pinColor="#FF0000"
          onPress={() => handleOpen(friend?.id, friend?.firstName, friend?.lastName)}
        >
          <View>
            <Image
              style={styles.imagePin}
              source={{
                uri: `${BASE_URL}users/getPFP/${friend?.id}`,
              }}
            />
          </View>
        </Marker>
      )
    })
    shared.forEach(({ id, latitude, longitude }: any) => {
      const info = seen[id]
      markers.push(
        <Marker
          key={id + "shared"}
          coordinate={{ latitude, longitude }}
          pinColor="blue"
          onPress={() => handleOpen(info?.id, info?.firstName, info?.lastName)}
        >
          <View>
            <Image
              style={styles.imagePin}
              source={{
                uri: `${BASE_URL}users/getPFP/${id}`
              }}
            />
          </View>
        </Marker>
      )
    })
    return markers
  }, [friends])

  useEffect(() => {
    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  }, [latitude, longitude])

  const handleSendingMessage = () => {
    if (message.match(/(?!^ +$)^.+$/)) {
      const trimmedMessage = message.trim();
      sendMessage(authToken, clickedFriendId, trimmedMessage)
        .catch((err) => {
          console.error(err);
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

const map =         <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={() => handleOpen}
        >
          <Marker coordinate={coordinates} pinColor="#157106" />
          {mapMarkers}

          <Circle
            center={coordinates}
            radius={3200}
            strokeWidth={1}
            strokeColor={"#C86F6F"}
            fillColor={"rgba(230,238,255,0.2)"}
          />
          <Circle
            center={coordinates}
            radius={1609}
            strokeWidth={1}
            strokeColor={"#1a66ff"}
            fillColor={"rgba(230,238,255, 0.5)"}
            zIndex={3}
          />
          <Circle
            center={coordinates}
            radius={4800}
            strokeWidth={1}
            strokeColor={"#1a66ff"}
            fillColor={"rgba(230,238,255,0.1)"}
            zIndex={1}
          />
        </MapView>;

  return (
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={() => setModalVisible}
      >
      <View>
        {map}
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
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
              </View>
            </View>

            <Image
              style={styles.imageModal}
              source={{
                uri: `${BASE_URL}users/getPFP/${clickedFriendId}`
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
                  onChangeText={setMessage}
                />
              </View>

              <View style={{ flex: 0.75 }}>
                <Button title="Send" onPress={handleSendingMessage} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      </TouchableOpacity>
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
  imagePin: {
    width: 40,
    height: 40,
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

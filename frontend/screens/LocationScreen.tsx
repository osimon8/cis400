import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Switch,
  Alert,
  Modal,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
  Pressable,
  FlatList,
  SectionList,
} from "react-native";
import * as Location from "expo-location";
import { getNearbyFriends, sendMessage, setUserLocation } from "../api";
import { UserContext } from "../Context";
import { FriendItemList } from "../components/FriendItemList";

export default function LocationScreen({
  navigation,
  retrievedFriends,
}: {
  navigation: any;
}) {
  const authToken = useContext(UserContext);
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(1.9441);
  const [friends, setFriends] = useState(retrievedFriends);
  const [clickedFriend, setClickedFriend] = useState("");
  const [clickedFriendId, setClickedFriendId] = useState("");
  const [longitude, setLongitude] = useState(30.0619);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [message, setMessage] = useState("");
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  //retrieves the users location

  const handleOpen = (id: string, firstName: string, lastName: string) => {
    setClickedFriend(`${firstName} ${lastName}`);
    setClickedFriendId(id);
    setModalVisible(true);
  };
  console.log("retreived", { friends, retrievedFriends });
  useEffect(() => {}, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
  }
  const FlatListBasics = (distance: Number) => {
    return (
      <View>
        <FlatList
          data={friends ? friends[`${distance}`] : []}
          renderItem={({ item }) => (
            <FriendItemList data={item} handleOpen={handleOpen} />
          )}
        />
      </View>
    );
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
  return (
    <View style={styles.container}>
      {/* <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-between",
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
          <Text style={{ padding: 2 }}>{"Availability"}</Text>
          <Switch
            // style={{ position: "absolute", top: 0, right: 0, margin: 5 }}
            trackColor={{ false: "#ffffff", true: "#ffffff" }}
            thumbColor={isEnabled ? "#157106" : "#FF0000"}
            ios_backgroundColor="#fffff"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ padding: 2 }}>{"Availability"}</Text>
          <Switch
            // style={{ position: "absolute", top: 0, right: 0, margin: 5 }}
            trackColor={{ false: "#ffffff", true: "#ffffff" }}
            thumbColor={isEnabled ? "#157106" : "#FF0000"}
            ios_backgroundColor="#fffff"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View> */}

      {friends && friends["1"].length > 0 ? (
        <View>
          <Text style={styles.title}>1 mile away</Text>
          {FlatListBasics(1)}
        </View>
      ) : (
        <View />
      )}
      {friends && friends["2"].length > 0 ? (
        <View>
          <Text style={styles.title}>2 mile away</Text>
          {FlatListBasics(2)}
        </View>
      ) : (
        <View />
      )}
      {friends && friends["3"].length > 0 ? (
        <View>
          <Text style={styles.title}>3 mile away</Text>
          {FlatListBasics(3)}
        </View>
      ) : (
        <View />
      )}

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
    width: "80%",
    padding: 10,
  },
  title: {
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    padding: 5,
  },
});

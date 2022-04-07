import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import { sendMessage } from "../api";
import { UserContext } from "../Context";
import { FriendItemList } from "../components/FriendItemList";

export interface LocationScreenI {
  navigation: any
  retrievedFriends: Array<any>
}

export default function LocationScreen({
  navigation,
  retrievedFriends,
}: LocationScreenI) {
  const authToken = useContext(UserContext);
  const [friends, setFriends] = useState(retrievedFriends);
  const [clickedFriend, setClickedFriend] = useState("");
  const [clickedFriendId, setClickedFriendId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpen = (id: string, firstName: string, lastName: string) => {
    setClickedFriend(`${firstName} ${lastName}`);
    setClickedFriendId(id);
    setModalVisible(true);
  };
  useEffect(() => {
    setFriends(retrievedFriends);
  }, []);

  const WrappedFriendItemList = (friends: Array<any>) => (
    <View>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <FriendItemList item={item} handleOpen={handleOpen} />
        )}
      />
    </View>
  );

  const handleSendingMessage = () => {
    if (!message.match(/(?!^ +$)^.+$/)) return;
    sendMessage(authToken, clickedFriendId, message.trim())
      .catch(console.error);
    setModalVisible(!modalVisible);
    setMessage("");
    const [firstName, lastName] = clickedFriend.split(" ")
    navigation.navigate("message", {
      friendId: clickedFriendId,
      firstName,
      lastName
    });
  };

  const { "1": first = [], "2": second = [], "3": third = [] } = friends ?? {};
  return (
    <View style={styles.container}>
      {first.length > 0 ? (
        <View>
          <Text style={styles.title}>1 mile away</Text>
          {WrappedFriendItemList(first)}
        </View>
      ) : (
        <View />
      )}
      {second.length > 0 ? (
        <View>
          <Text style={styles.title}>2 miles away</Text>
          {WrappedFriendItemList(second)}
        </View>
      ) : (
        <View />
      )}
      {third.length > 0 ? (
        <View>
          <Text style={styles.title}>3 miles away</Text>
          {WrappedFriendItemList(third)}
        </View>
      ) : (
        <View />
      )}

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
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

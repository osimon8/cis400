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

export default function FriendModal() {
  return (
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

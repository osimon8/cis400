import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StatusBar,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import AppHeader from "../components/Header";
import { useRoute } from "@react-navigation/native";
import { UserContext } from "../Context";
import { getChatMessages, sendMessage } from "../api";
import Bubble from "../components/Bubble";

export default function MessageScreen({ navigation }) {
  const authToken = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const route = useRoute();

  const goBack = () => {
    navigation.goBack();
  };

  const FlatListBasics = () => {
    return (
      <View>
        <FlatList
          data={messages}
          style={{}}
          renderItem={({ item }) => (
            <View
              style={{
                width: "75%",
                alignSelf:
                  item.userId === route.params.friendId
                    ? "flex-start"
                    : "flex-end",
              }}
            >
              <Bubble
                text={item.text}
                border={item.userId === route.params.friendId}
              />
            </View>
          )}
        />
      </View>
    );
  };

  useEffect(() => {
    getChatMessages(authToken, route.params.friendId)
      .then((result) => {
        setMessages(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSendingMessage = () => {
    if (message.match(/(?!^ +$)^.+$/)) {
      let trimmedMessage = message.trim();
      sendMessage(authToken, route.params.friendId, trimmedMessage)
        .then((response) => {
          console.log("testing chating", response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <AppHeader
        ret={goBack}
        header={`${route.params.firstName} ${route.params.lastName}`}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View>{FlatListBasics()}</View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#DDDDDD",
              borderRadius: 40,
              paddingLeft: 15,
              paddingRight: 15,
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    marginBottom: "10%",
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    justifyContent: "flex-end",
  },
  input: {
    height: 30,
    width: "80%",
    padding: 10,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});

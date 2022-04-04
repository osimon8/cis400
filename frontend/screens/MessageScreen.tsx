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

export default function MessageScreen({ navigation }: { navigation: any }) {
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
          scrollEnabled
          data={messages}
          renderItem={({ item }) => (
            <View
              style={{
                marginRight: 5,
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
    getChatMessages(authToken, route.params.friendId, 0)
      .then((result) => {
        setMessages(result.data.reverse());
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
          setMessages(() => {
            const newList = [
              ...messages,
              {
                friendId: route.params.friendId,
                text: message,
                timestamp: "",
                userId: "",
              },
            ];
            return newList;
          });

          setMessage("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        ret={goBack}
        header={`${route.params.firstName} ${route.params.lastName}`}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View
          style={{
            marginBottom: 10,
            flex: 1,
          }}
        >
          <View style={styles.inner}>
            <View
              style={{
                flex: 1,
              }}
            >
              {FlatListBasics()}
            </View>
            <View
              style={{
                marginTop: 10,
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
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
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

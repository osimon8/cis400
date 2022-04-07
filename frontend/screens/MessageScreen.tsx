// TODO: Refactor this ENTIRE file.

import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/Header";
import { useRoute } from "@react-navigation/native";
import { UserContext } from "../Context";
import { getChatMessages, sendMessage, shareLocation } from "../api";
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
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <FlatList
          style={{}}
          data={messages}
          renderItem={({ item }) => {
            // TODO: this is cringe and should be changed
            if (item.text === "HYPERSECRETSAUCE") {
              return (
                <View style={{ alignSelf: "center" }}>
                  {item.userId === route.params.friendId ? (
                    <Text>{`${route.params.firstName} ${route.params.lastName} shared their location`}</Text>
                  ) : (
                    <Text style={{ color: "#337df4" }}>
                      You shared your most recent location
                    </Text>
                  )}
                </View>
              );
            } else
              return (
                <View
                  style={{
                    marginRight: 5,
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
              );
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    getChatMessages(authToken, route.params.friendId, 0)
      .then((result) => {
        setMessages(result.data.reverse());
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const sendingMessage = (messageToSend: string) => {
    sendMessage(authToken, route.params.friendId, messageToSend)
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
        console.error(err);
      });
  };
  const handleSendingMessage = () => {
    if (message.match(/(?!^ +$)^.+$/)) {
      let trimmedMessage = message.trim();
      sendingMessage(trimmedMessage);
    }
  };
  // call back function with
  const handleShareLocation = () => {
    shareLocation(authToken, route.params.friendId)
      .then((res) => {
        sendingMessage("HYPERSECRETSAUCE");
      })
      .catch((error) => {
        console.error(error, "failed to share loc");
      });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        ret={goBack}
        header={`${route.params.firstName} ${route.params.lastName}`}
        handleShareLocation={handleShareLocation}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.inner}>
          {FlatListBasics()}
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

import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context"

import { searchUser, addFriend, getFriends } from "../api";


export default function FriendScreen({ navigation, friends }) {
  const [search, setSearch] = useState("");
  const [friendsList, setFriendsList] = useState(friends);
  const [searches, setSearches] = useState(friends);
  // Map for id and friend. Used for removing and adding new friends
  const map = new Map();

  friends.forEach((element) => {
    map.set(element.id, element);
  });
  //adding a new friend
  const handleAddFriend = (data: object) => {
    addFriend(data.id);

    setFriendsList((friendsList, data) => {
      let newList = [...friendsList, data];
      return newList;
    });
    // Add the new friend in the map
    map.set(data.id, data);
  };

  const handleOpenMessage = (
    id: string,
    firstName: string,
    lastName: string
  ) => {
    console.log("testing", id);
    navigation.navigate("message", {
      friendId: id,
      firstName: firstName,
      lastName: lastName,
    });
  };

  const friendDetail = (
    id: string,
    firstName: string,
    lastName: string
  ) => {
    console.log("testing", id);
    navigation.navigate("profile", {
      id: id,
      firstName: firstName,
      lastName: lastName,
    });
  };


  const updateSearch = (input: string) => {
    console.log("input", input === "");
    setSearch(input);
    if (input !== "") {
      searchUser(input)
        .then((response) => {
          setSearches(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      setSearches(friends);
    }
  };
  useEffect(() => {}, [friendsList]);
  const it = (data: Object) => {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() =>
          handleOpenMessage(data.id, data.firstName, data.lastName)
        }
        onLongPress={() => friendDetail(data.id)}
      >
        <View style={styles.container}>
          <View style={styles.flexContainer}>
            <View>
              <Text
                style={styles.mainText}
              >{`${data.firstName} ${data.lastName}`}</Text>
              <Text>{data.email}</Text>
            </View>
            <View>
              {map.has(data.id) ? (
                <View />
              ) : (
                <Button
                  title="Add"
                  onPress={() => {
                    handleAddFriend(data);
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  const FlatListBasics = () => {
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={search === "" ? friendsList : searches}
          renderItem={({ item }) => it(item)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <SearchBar
        placeholder="Search your friends"
        platform="ios"
        lightTheme
        round
        onChangeText={updateSearch}
        value={search}
      />
      <View style={styles.listContainer}>{FlatListBasics()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderBottomWidth: 1,
    borderColor: "#FAF9F9",
  },

  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },

  mainText: {
    fontSize: 18,
  },
  secondaryText: {
    fontWeight: "400",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

import React, { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet, FlatList } from "react-native";
import { searchUser, addFriend, getFriends } from "../action";

import { SearchBar } from "react-native-elements";
import * as SecureStore from "expo-secure-store";

export default function FriendScreen() {
  const [search, setSearch] = useState("");
  const [searches, setSearches] = useState([]);
  const [friends, setFriends] = useState([]);
  const handleAddFriend = (id: string) => {
    addFriend(id);
  };
  const updateSearch = (input: string) => {
    setSearch(input);
    searchUser(input)
      .then((response) => {
        console.log("data", response.data);
        setSearches(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    SecureStore.getItemAsync("authToken").then((res) => {
      getFriends(res).then((response) => {
        setFriends(response.data);
      });
    });
  }, []);
  const it = (data: Object) => {
    return (
      <View style={styles.container}>
        <View style={styles.flexContainer}>
          <View>
            <Text
              style={styles.mainText}
            >{`${data.firstName} ${data.lastName}`}</Text>
            <Text>{data.email}</Text>
          </View>
          <View>
            <Button
              title="Add"
              onPress={() => {
                handleAddFriend(data.id);
              }}
            />
          </View>
        </View>
      </View>
    );
  };
  const FlatListBasics = () => {
    return (
      <View style={styles.listContainer}>
        <FlatList data={friends} renderItem={({ item }) => it(item)} />
      </View>
    );
  };

  return (
    <View>
      <SearchBar
        placeholder="Type Here..."
        platform="ios"
        lightTheme
        round
        onChangeText={updateSearch}
        value={search}
      />
      <View style={styles.listContainer}>{FlatListBasics()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderBottomWidth: 1,
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  listContainer: {},
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

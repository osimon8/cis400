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

type user = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
}

type searchResult = user & {
  status: number
}

export interface FriendScreenI {
  navigation: any,
  friends: user[]
}

export default function FriendScreen(props: FriendScreenI) {
  const { navigation, friends: initialFriends} = props
  const [search, setSearch] = useState<string>("");
  const [friends, setFriends] = useState<user[]>(initialFriends);
  const [searches, setSearches] = useState<user[]>(initialFriends);
  /**
   * 0 - Not Friends
   * 1 - Friends
   * 2 - User sent request
   * 3 - User recieved request
   */
  const [friendStatuses, setFriendStatuses] = useState<Map<string, number>>(() => {
    const map = new Map<string, number>()
    initialFriends.forEach((element : user) => {
      map.set(element.id, 0);
    })
    return map
  })

  const handleAddFriend = (data: user) => {
    addFriend(data?.id);
    setFriends([...friends, data]);
    friendStatuses.set(data.id, data);
    setFriendStatuses(friendStatuses)
  };

  const handleOpenMessage = (
    id: string,
    firstName: string,
    lastName: string
  ) => {
    navigation.navigate("message", {
      friendId: id,
      firstName,
      lastName,
    });
  };

  const updateSearch = async (input: string) => {
    setSearch(input);
    if (input.trim() === "") {
      setSearches(friends)
      return;
    }
    const { data: users } = await searchUser(input)
    console.log(users)
    setSearches(users)
    users.forEach((user: searchResult) => friendStatuses.set(user.id, user.status));
    setFriendStatuses(friendStatuses)
  };

  const it = (friend: user) => {
    const { id, firstName, lastName, email } = friend;
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => handleOpenMessage(id, firstName, lastName)}>
        <View style={styles.container}>
          <View style={styles.flexContainer}>
            <View>
              <Text
                style={styles.mainText}

              >{`${firstName} ${lastName}`}</Text>
              <Text>{email}</Text>


            </View>
            <View>
              {
                friendStatuses.get(id) === 1 && (
                  <Button
                    title="Add"
                    onPress={() => handleAddFriend(friend)}
                  />
                )
              }
              {friendStatuses.get(id) === 2 && "Request Sent"}
              {
                friendStatuses.get(id) === 3 && (
                  <Button
                    title="Accept"
                    onPress={() => handleAddFriend(friend)}
                  />
                )
              }
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView>
      <SearchBar
        placeholder="Search/Add Contacts"
        platform="ios"
        lightTheme
        round
        onChangeText={updateSearch}
        value={search}
      />
      <View>
        <FlatList
          data={search === "" ? friends : searches}
          renderItem={({ item }) => it(item)}
        />
      </View>
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

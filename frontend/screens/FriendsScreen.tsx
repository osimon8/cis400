import React, { useState } from "react";
import { Button, Text, View, StyleSheet, FlatList } from "react-native";

import { SearchBar } from "react-native-elements";

export default function FriendScreen() {
  const [search, setSearch] = useState("");

  const updateSearch = (input: String) => {
    setSearch(input);
  };
  const hardCoded = [
    { key: "Devin canada" },
    { key: "Dan Usa" },
    { key: "Dominic Djibouti" },
    { key: "Jackson Rwanda" },
    { key: "James Tanzania" },
    { key: "Joel Embid" },
    { key: "John Mexico" },
    { key: "Jillian Egypt" },
    { key: "Jimmy fallon" },
    { key: "Julie Fox" },
  ];

  const it = (name: String) => {
    return (
      <View style={styles.container}>
        <View style={styles.flexContainer}>
          <View>
            <Text style={styles.mainText}>{name}</Text>
            <Text>Online</Text>
          </View>
          <View>
            <Button title="Add" />
          </View>
        </View>
      </View>
    );
  };
  const FlatListBasics = () => {
    return (
      <View style={styles.listContainer}>
        <FlatList data={hardCoded} renderItem={({ item }) => it(item.key)} />
      </View>
    );
  };

  return (
    <View>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        lightTheme
        round
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

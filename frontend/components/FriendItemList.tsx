import {
  Button,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from "react-native";

export function FriendItemList({ item: data, handleOpen }) {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => handleOpen(data.id, data.firstName, data.lastName)}
    >
      <View style={styles.container}>
        <View style={styles.flexContainer}>
          <View>
            <Text
              style={styles.mainText}
            >{`${data.firstName} ${data.lastName}`}</Text>
            <Text>{data.email}</Text>
          </View>
        </View>
        
      </View>
    </TouchableHighlight>
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

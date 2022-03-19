import { Text, View, StatusBar } from "react-native";
import AppHeader from "../components/Header";
import { useRoute } from "@react-navigation/native";

export default function MessageScreen({ navigation }) {
  const route = useRoute();

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View>
      <AppHeader
        ret={goBack}
        header={`${route.params.firstName} ${route.params.lastName}`}
      />
    </View>
  );
}

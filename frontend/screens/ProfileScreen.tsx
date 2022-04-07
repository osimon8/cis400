import * as React from "react";
import AppContext from "../AppContext";

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  Image, Platform
} from "react-native";
import { useEffect } from "react";
import { getProfile, getPFP, setPFP } from "../api";
import { TouchableOpacity } from "react-native-gesture-handler";


//import ImagePicker from "react-native-image-crop-picker";
//import ImagePicker from "react-native-image-picker";
//import ImagePicker from "react-native-customized-image-picker";
//import {launchCamera} from "react-native-customized-image-picker";
import * as ImagePicker from 'expo-image-picker';


export default function ProfileScreen({ navigation, id, currentUser}) {

//const data = getProfile(id);

const random_image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC';

const [image, setImage] = React.useState(random_image);
const [imageChanged, setImageChanged] = React.useState(false);
const [firstName, setFirstName] = React.useState("");
const [lastName, setLastName] = React.useState("");
const [email, setEmail] = React.useState("");

useEffect(() => {
  (async () => {
    getPFP(id)
      .then((response) => {
        setImage(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

      getProfile(id)
      .then((response) => {
        setImage(response.data.email);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
      })
      .catch((error) => {
        console.log(error);
      });




    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  })();
}, []);

const pickImage = async () => {
  //setImage(getPFP(id));
  //console.log(id);
  let response = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (response.uri) {
    setImage(response.uri);
    
    setImageChanged(true);
  }
}




function handleChoosePhoto() {

/*  ImagePicker.openPicker({}).then(image => {
    console.log(image);
  });

 /* ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => {
    console.log(image);
  });

/*  console.log("here")
  const options = {
    //noData: true,
  };
  ImagePicker.launchCamera({
    mediaType: 'photo',
    maxHeight: 600,
    maxWidth: 800
}, (response) => {
    if (response.uri) {
      setImage(response);
      setImageChanged(true);
    }
  });*/
}; 

function save() {
  setPFP(image);
}

function CurrentImage(props) {
  
  //if (imageChanged) {
    return <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />;
  //}
  //return <Text>"Click Here"</Text>;
  //return <Image source={{`${image}`}} />;
  //<Image source={image} style={{ width: 300, height: 300 }}/>
}

function TextOrEditable(props) {
  if (currentUser) {
  return (          
  <View style={styles.container}>
    <CurrentImage/>

    </View>
    );

return (
  <View style={styles.container}>
    <CurrentImage/>
    <Text>${firstName}</Text>
    <Text>${lastName}</Text>
    <Text>${email}</Text>
  </View>
);


  }
}
  
//imageData stored in String64

//data.image;

  return (
    <View style={styles.container}>



<CurrentImage/>


<Button title="Select New Photo" onPress={pickImage}></Button>


<TextInput
placeholder={firstName}
style={styles.input}
onChangeText={(val) => {setFirstName(val)}} />


<TextInput
placeholder={lastName}
style={styles.input}
onChangeText={(val) => {setLastName(val)}} /> 

<TextInput
placeholder={email}
style={styles.input}
onChangeText={(val) => {setEmail(val)}} />

<Button title="Save" onPress={save}></Button>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    width: "90%",
    marginVertical: 5,
    borderWidth: 0,
    borderBottomWidth: 1,
    padding: 10,
    alignSelf: "center",
  },
  inner: {
    marginLeft: 10,
    marginRight: 10,
  },
});

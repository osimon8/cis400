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
import { useRoute } from "@react-navigation/native";



export default function ProfileScreen({ route, navigation, id_here, currentUser}) {

//const data = getProfile(id);

const default_img = "data:image/jpeg;base64,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";

const [image, setImage] = React.useState(default_img);
const [imageChanged, setImageChanged] = React.useState(false);
const [firstName, setFirstName] = React.useState("");
const [lastName, setLastName] = React.useState("");
const [email, setEmail] = React.useState("");
const [id, setID] = React.useState(id_here);
//const route = useRoute();


useEffect(() => {
  (async () => {

    if (!currentUser ) {
      setID(route.params.id);
      setFirstName(route.params.firstName);
      setLastName(route.params.lastName);  
    }
    
    setImage(getPFP(id));



    




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
    return <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />;
  //}
  //return <Text>"Click Here"</Text>;
  //return <Image source={{`${image}`}} />;
  //<Image source={image} style={{ width: 300, height: 300 }}/>
}

function Button1(props) {
  if (currentUser) {
  return (          
<Button title="Select New Photo" onPress={pickImage}></Button>);
  }
return null;

}
 
function Button2(props) {
  if (currentUser) {
  return (          
<Button title="Save" onPress={save}></Button>);
  }
return <Button title="Back" onPress={()=>navigation.goBack()}/>;

}

//imageData stored in String64

//data.image;

  return (
    <View style={styles.container}>



<CurrentImage/>

<Button1/>


<TextInput
placeholder={firstName}
style={styles.input}
editable={currentUser}
onChangeText={(val) => {setFirstName(val)}} />


<TextInput
placeholder={lastName}
style={styles.input}
editable={currentUser}
onChangeText={(val) => {setLastName(val)}} /> 



<Button2/>

      
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

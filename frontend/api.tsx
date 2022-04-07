import axios from "axios";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    // alert("🔐 Here's your value 🔐 \n" + result);
    return result;
  } else {
    return null;
  }
}

function DataURIToBlob(dataURI: string) {
  const splitDataURI = dataURI.split(',')
  const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i)

  return new Blob([ia], { type: mimeString })
}

var baseUrl = "http://10.103.70.223:3000/";
baseUrl = "http://192.168.0.2:3000/" //TODELETE

//Login
export const login = (email: String, password: String) => {
  return axios.post(`${baseUrl}users/login`, {
    email: email,
    password: password,
  });
};

export const register = (
  email: String,
  password: String,
  firstName: String,
  lastName: String
) => {
  return axios.post(`${baseUrl}users/create`, {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });
};

export const searchUser = (input: String) => {
  return axios.get(`${baseUrl}users/search?input=${input}`);
};

//Handles the friend addition.
export const addFriend = (id: string) => {
  getValueFor("authToken").then((res) => {
    console.log("response", res);
    axios({
      url: `${baseUrl}users/addFriend`,
      method: "POST",
      headers: { Authorization: `${res}` },
      data: {
        friendId: id,
      },
    })
      .then((response) => {
        console.log(response.status);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const getFriends = (token: string) => {
  return axios({
    url: `${baseUrl}users/getFriends`,
    method: "GET",
    headers: { Authorization: `${token}` },
  });
};

export const setUserLocation = (
  token: string,
  longitude: string,
  latitude: string
) => {
  return axios({
    url: `${baseUrl}location/set`,
    method: "POST",
    data: { longitude: longitude, latitude: latitude },
    headers: { Authorization: `${token}` },
  });
};

export const getNearbyFriends = (token: string) => {
  return axios({
    url: `${baseUrl}location/getFriendsNearby/`,
    method: "GET",
    headers: { Authorization: `${token}` },
  });
};

export const sendMessage = (
  token: string,
  friendId: string,
  message: string
) => {
  return axios({
    url: `${baseUrl}chat/sendMsg`,
    method: "POST",
    headers: { Authorization: `${token}` },
    data: {
      friendId: friendId,
      msg: message,
    },
  });
};

export const getChatMessages = (
  token: string,
  friendId: string,
  limit: Number
) => {
  return axios({
    url: `${baseUrl}chat/getChat?limit=${limit}`,
    method: "GET",
    headers: { Authorization: `${token}`, friendId: friendId },
  });
};

export const setOnlineStatus = (token: string, status: Boolean) => {
  return axios({
    url: `${baseUrl}users/setOnline`,
    method: "POST",
    headers: { Authorization: `${token}` },
    data: { online: status },
  });
};

export const getProfile = (id) => {
  
  return axios.get(`${baseUrl}users/getProfile/${id}`);
};

const createFormData = (photo, body) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : 
  photo.uri.replace('file://', ''),
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

export const setPFP = (token, img) => {
  var imgBase64 = 'data:image/png;base64,'+img;

  const file = DataURIToBlob(imgBase64)
  const formData = new FormData();
  formData.append('file', file, 'image.jpg')

  return axios({
    url: `${baseUrl}users/uploadPFP`,
    method: "POST",
    headers: { Authorization: `${token}`, 'Content-Type': 'multipart/form-data' },
    
    data: formData,
  });
};

function getBase64(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return reader.result;
}

export const getPFP = (id: string) => {
  var imageURL = "";
  console.log("KK");
  return '${baseUrl}users/getPFP/${id}';
  
  axios({
    url: `${baseUrl}users/getPFP`,
    method: "GET",
    data: {userId: id},
  })
  .then(res => {
    //var file = new File(res.data, { type: 'image/png' });
    //imageURL = URL.createObjectURL(file);
    console.log("LOK");
    console.log(res.data);
    imageURL = getBase64(res.data);
    console.log(imageURL);
  return imageURL;
});};

export const getID = () => {
  return axios.get(`${baseUrl}users/toDelete`); //TODELETE
};




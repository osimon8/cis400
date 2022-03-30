import axios from "axios";
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

const baseUrl = "http://10.102.197.97:3000/";
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
  console.log("input", [email, password, firstName, lastName]);
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
      headers: { Auth: `${res}` },
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
    headers: { Auth: `${token}` },
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
    headers: { Auth: `${token}` },
  });
};

export const getNearbyFriends = (token: string) => {
  return axios({
    url: `${baseUrl}location/getFriendsNearby/`,
    method: "GET",
    headers: { Auth: `${token}` },
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
    headers: { Auth: `${token}` },
    data: {
      friendId: friendId,
      msg: message,
    },
  });
};

export const getChatMessages = (token: string, friendId: string) => {
  return axios({
    url: `${baseUrl}chat/getChat`,
    method: "GET",
    headers: { Auth: `${token}`, friendId: friendId },
  });
};

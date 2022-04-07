import axios from "axios";
import * as SecureStore from "expo-secure-store";

async function getValueFor(key: string) {
  return await SecureStore.getItemAsync(key);
}

export const BASE_URL = "http://ec2-18-215-172-111.compute-1.amazonaws.com/";
//Login
export const login = (email: String, password: String) => {
  return axios.post(`${BASE_URL}users/login`, {
    email: email,
    password: password,
  });
};

export const register = (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  return axios.post(`${BASE_URL}users/create`, {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });
};

export const searchUser = async (authToken: string, input: String) => {
  return axios.get(`${BASE_URL}users/search?input=${input}`, {
    headers: { Authorization: `${authToken}` },
  });
};

//Handles the friend addition.
export const addFriend = (id: string) => {
  getValueFor("authToken").then((res) => {
    axios({
      url: `${BASE_URL}users/addFriend`,
      method: "POST",
      headers: { Authorization: `${res}` },
      data: {
        friendId: id,
      },
    })
      .catch((err) => {
        console.error(err);
      });
  });
};

export const getFriends = (token: string) => {
  return axios({
    url: `${BASE_URL}users/getFriends`,
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
    url: `${BASE_URL}location/set`,
    method: "POST",
    data: { longitude: longitude, latitude: latitude },
    headers: { Authorization: `${token}` },
  });
};

export const getNearbyFriends = (token: string) => {
  return axios({
    url: `${BASE_URL}location/getFriendsNearby/`,
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
    url: `${BASE_URL}chat/sendMsg`,
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
    url: `${BASE_URL}chat/getChat?limit=${limit}`,
    method: "GET",
    headers: { Authorization: `${token}`, friendId: friendId },
  });
};

export const setOnlineStatus = (token: string, status: Boolean) => {
  return axios({
    url: `${BASE_URL}users/setOnline`,
    method: "POST",
    headers: { Authorization: `${token}` },
    data: { online: status },
  });
};

export const shareLocation = (token: string, friendId: string) => {
  return axios({
    url: `${BASE_URL}location/share`,
    method: "POST",
    headers: { Authorization: `${token}` },
    data: { friendId: friendId },
  });
};

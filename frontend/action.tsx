import axios from "axios";

const baseUrl = "http://10.102.227.194:3000/";
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
  secondName: String
) => {
  return axios.post(`${baseUrl}users/create`, {
    email: email,
    password: password,
  });
};

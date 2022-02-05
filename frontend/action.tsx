import axios from "axios";

export const login = (username: String, password: String) => {};
export const register = (
  email: String,
  password: String,
  firstName: String,
  secondName: String
) => {
  axios
    .get("localhost:3000/users/")
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

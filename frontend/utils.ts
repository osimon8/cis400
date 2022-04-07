
export const passwordCheck = (password: string, passwordConf: string) => {
  passwordConf = passwordConf.trim();
  if (password.trim() === "") {
    return "Invalid Password";
  }
  if (password.length < 8) {
    return "Invalid Password";
  }
  if (passwordConf === "") {
    return "Valid Password";
  }
  if (passwordConf === password.trim()) {
    return "Passwords match";
  } 
  return "Passwords don't match";
};

export const inputValidation = (
  firstName: string,
  secondName: string,
  email: string
) => {
  return (
    firstName.trim() !== "" && secondName.trim() !== "" && email.trim() !== ""
  );
};

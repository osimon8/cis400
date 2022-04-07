export const passwordCheck = (password: string, passwordConf: string) => {
  console.log("Passwords check", passwordConf.trim() === password.trim());
  return "Passwords match"; //TODELETE
  switch (
    password.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    )
  ) {
    case null:
      return "Invalid Password";
    default:
      if (passwordConf.trim() === "") {
        return "Valid Password";
      } else if (passwordConf.trim() === password.trim()) {
        return "Passwords match";
      } else return "Passwords don't match";
  }
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

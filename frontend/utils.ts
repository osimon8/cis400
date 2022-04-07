
export const passwordCheck = (password: string, passwordConf: string) => {
  passwordConf = passwordConf.trim();
  switch (
    password.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    )
  ) {
    case null:
      return "Invalid Password";
    default:
      if (passwordConf === "") {
        return "Valid Password";
      } else if (passwordConf === password.trim()) {
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

import jwt from "jsonwebtoken";

export const getCustomizedDisplayName = (sentence) => {
  const [firstName, ...otherWords] = sentence.split(" ");
  const otherFirstLetters = otherWords.map((word) => word.charAt(0)).join(".");
  return firstName + " " + otherFirstLetters;
};

export const getFirstLetter = (sentence) => {
  const [firstName] = sentence.split(" ");
  return firstName.charAt(0).toUpperCase();
};

export const getExpiryDate = (token) => {
  const { exp } = jwt.decode(token);
  console.log(`new Date(exp)`, new Date(exp * 1000));
  return new Date(exp * 1000);
};

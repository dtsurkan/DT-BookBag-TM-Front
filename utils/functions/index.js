import jwt from 'jsonwebtoken';

export const getCustomizedDisplayName = (sentence) => {
  if (!sentence) return null;
  const [firstName, ...otherWords] = sentence.split(' ');
  const otherFirstLetters = otherWords.map((word) => word.charAt(0)).join('.');
  return firstName + ' ' + otherFirstLetters;
};

export const getFirstLetter = (sentence) => {
  if (!sentence) return null;
  const [firstName] = sentence.split(' ');
  return firstName.charAt(0).toUpperCase();
};

export const getExpiryDate = (token) => {
  if (!token) return null;
  const { exp } = jwt.decode(token);
  console.log(`new Date(exp)`, new Date(exp * 1000));
  return new Date(exp * 1000);
};

export const scrollToBottom = (ref, isSmoothly = true) => {
  if (isSmoothly) {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
    });
  } else {
    ref.current?.scrollIntoView(false);
  }
};

export const getLastElementInArray = (value) => {
  const array = value.split('-');
  return array[array.length - 1];
};

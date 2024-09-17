import AsyncStorage from "@react-native-async-storage/async-storage";

export const savePhoneNumber = async (phoneNumber) => {
  await AsyncStorage.setItem("phoneNumber", phoneNumber);
};

export const saveSurname = async (surname) => {
  await AsyncStorage.setItem("surname", surname);
};

export const saveFirstname = async (saveFirstname) => {
  await AsyncStorage.setItem("firstname", saveFirstname);
};

export const getPhoneNumber = async () => {
  const phoneNumber = await AsyncStorage.getItem("phoneNumber");
  return phoneNumber;
};

export const getSurname = async () => {
  const surname = await AsyncStorage.getItem("surname");
  return surname;
};

export const getFirstname = async () => {
  const firstname = await AsyncStorage.getItem("firstname");
  return firstname;
};

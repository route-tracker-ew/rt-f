import * as SecureStore from "expo-secure-store";

export const savePhomeNumberToStorage = async (phoneNumber) => {
  await SecureStore.setItemAsync("phoneNumber", phoneNumber);
};

export const getPhomeNumberFromStorage = async () => {
  const phomeNumber = await SecureStore.getItemAsync("phoneNumber");
  return phomeNumber;
};

export const saveFirstNameToStorage = async (firstName) => {
  await SecureStore.setItemAsync("firstName", firstName);
};

export const saveLastNameToStorage = async (lastName) => {
  await SecureStore.setItemAsync("lastName", lastName);
};

export const getFullNameFromStorage = async () => {
  const fullName = await SecureStore.getItemAsync("firstName");
  return fullName;
};

export const deleteUserInfoFromStorage = async () => {
  await SecureStore.deleteItemAsync("phoneNumber");
  await SecureStore.deleteItemAsync("firstName");
  await SecureStore.deleteItemAsync("lastName");
};

export const getTokenFromStorage = async () => {
  const token = await SecureStore.getItemAsync("token");
  return token;
};

export const saveTokenToStorage = async (token) => {
  await SecureStore.setItemAsync("token", token);
};

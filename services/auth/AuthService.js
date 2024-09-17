import axios from "axios";
import * as SecureStore from "expo-secure-store";
import config from "../../config";
import {
  deleteUserInfoFromStorage,
  getTokenFromStorage,
} from "../StorageService";
import { saveTokenToStorage } from "../StorageService";

const API_URL = config.API_URL;

export const login = async (login, password) => {
  try {
    const response = await axios.post(`${API_URL}/route-tracker/auth`, {
      login,
      password,
    });
    const token = response.data;
    await saveTokenToStorage(token);
    return token;
  } catch (error) {
    throw error;
  }
};

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
    });

    const { token } = response.data;

    await SecureStore.setItemAsync("token", token);

    return token;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  await SecureStore.deleteItemAsync("token");
  await deleteUserInfoFromStorage();
};

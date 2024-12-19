import axios from "axios";
import config from "../../config";
import * as Location from "expo-location";

const API_URL = config.API_URL;

const getLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    setErrorMsg("Permission to access location was denied");
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
};

export const getUserInfoByPhoneNumber = async (number) => {
  getLocation();
  try {
    // const token = await SecureStore.getItemAsync("token");

    // if (!token) {
    //   throw new Error("Token not found");
    // }
    const response = await axios.get(
      `${API_URL}/route-tracker/accounts/${number}`
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerCustomer = async (
  firstName,
  lastName,
  phoneNumber,
  password,
  cfmPass
) => {
  try {
    const response = await fetch(`${API_URL}/route-tracker/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        phoneNumber,
        password,
        cfmPass,
      }),
      timeout: 1000,
    });

    if (response.status === 422) {
      throw new Error(
        "Користувач із номером " + phoneNumber + "уже був створений"
      );
    }

    if (response.status != 200) {
      throw new Error("Щось пішло не так... Спробуйте пізніше");
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerGps = async (
  carNumber,
  phoneNumber,
  password,
  cfmPass
) => {
  try {
    const response = await fetch(`${API_URL}/route-tracker/accounts/gps`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carNumber,
        phoneNumber,
        password,
        cfmPass,
      }),
      timeout: 1000,
    });

    if (response.status === 422) {
      throw new Error("Gps із номером " + phoneNumber + "уже був створений");
    }

    if (response.status != 200) {
      throw new Error("Щось пішло не так... Спробуйте пізніше");
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

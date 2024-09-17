import axios from "axios";
import config from "../../config";
import { getPhomeNumberFromStorage } from "../StorageService";

const API_URL = config.API_URL;

export const getQrCode = async (width, height) => {
  try {
    const phoneNumber = await getPhomeNumberFromStorage();
    const response = await axios.get(
      `${API_URL}/delivery/qr-code?phoneNumber=${phoneNumber}&width=${width}&height=${height}`,
      {
        timeout: 10000, // 10 seconds
        responseType: "blob",
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

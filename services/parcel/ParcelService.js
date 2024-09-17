import axios from "axios";
import config from "../../config";
import { getTokenFromStorage } from "../StorageService";

const API_URL = config.API_URL;
export const createNewParcel = async (
  sourceCity,
  sourceCountry,
  sourceStreet,
  sourceHouseNumber,
  sourceFlatNumber,
  senderPhoneNumber,
  senderFirstName,
  senderLastName,
  destinationCountry,
  destinationCity,
  destinationStreet,
  destinationHouseNumber,
  destinationFlatNumber,
  deliveryService,
  destinationPostNumber,
  receiverPhoneNumber,
  receiverFirstName,
  receiverLastName,
  estimatedPicKUpDate,
  routeId,
  amount,
  price,
  weight
) => {
  try {
    const response = await axios.post(
      `${API_URL}/route-tracker/parcels`,
      {
        sourceCity,
        sourceCountry,
        sourceStreet,
        sourceHouseNumber,
        sourceFlatNumber,
        senderPhoneNumber,
        senderFirstName,
        senderLastName,
        destinationCountry,
        destinationCity,
        destinationStreet,
        destinationHouseNumber,
        destinationFlatNumber,
        deliveryService,
        destinationPostNumber,
        receiverPhoneNumber,
        receiverFirstName,
        receiverLastName,
        estimatedPicKUpDate,
        routeId,
        amount,
        price,
        weight,
      },
      {
        timeout: 10000, // 10 seconds
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecifiedParcels = async (routeId, estimatedPickUp) => {
  try {
    const token = await getTokenFromStorage();

    console.log(token);
    const response = await axios.get(`${API_URL}/route-tracker/parcels/`, {
      params: {
        routeId,
        estimatedPickUp,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 10000, // 10 секунд
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

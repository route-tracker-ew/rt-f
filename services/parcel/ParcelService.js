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

export const updateParcel = async (
  id,
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
    const response = await axios.put(
      `${API_URL}/route-tracker/parcels/update`,
      {
        id,
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

export const acceptParcel = async (
  id,
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
    const response = await axios.put(
      `${API_URL}/route-tracker/parcels/accept`,
      {
        id,
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

export const rejectParcel= async (parcelId) => {
  try {
    const token = await getTokenFromStorage();
    const response = await axios.put(`${API_URL}/route-tracker/parcels/reject?parcelId=${parcelId}`, {
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

export const getParcelsRequest = async () => {
  try {
    const token = await getTokenFromStorage();
    const response = await axios.get(`${API_URL}/route-tracker/parcels/all/requested`, {
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

export const getParcelById = async (routeId) => {
  try {
    const token = await getTokenFromStorage();
    const response = await axios.get(`${API_URL}/route-tracker/parcels/${routeId}`, {
      params: {
        routeId
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
}

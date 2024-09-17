import axios from "axios";
import config from "../../config";
import { getPhomeNumberFromStorage } from "../../services/StorageService";

const API_URL = config.API_URL;
export const registerNewRoute = async (
  source,
  dayOfDepartureFromSource,
  destination,
  dayOfDepartureFromDestination
) => {
  try {
    const ownerPhoneNumber = await getPhomeNumberFromStorage();
    const response = await axios.post(
      `${API_URL}/route-tracker/routs`,
      {
        source,
        dayOfDepartureFromSource,
        destination,
        dayOfDepartureFromDestination,
        ownerPhoneNumber,
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

const dayMap = {
  1: "Понеділок",
  2: "Вівторок",
  3: "Середа",
  4: "Четвер",
  5: "П’ятниця",
  6: "Субота",
  7: "Неділя",
};

const convertDaysToWords = (route) => {
  let dayWord = dayMap[route.dayOfDepartureFromSource];
  if (dayWord) {
    route.dayNumberOfDepartureFromSource = route.dayOfDepartureFromSource;
    route.dayOfDepartureFromSource = dayWord;
  }
  dayWord = dayMap[route.dayOfDepartureFromDistinction];
  if (dayWord) {
    route.dayNumberOfDepartureFromDistinction =
      route.dayOfDepartureFromDistinction;
    route.dayOfDepartureFromDistinction = dayWord;
  }
};

export const getAllOwnersRoutes = async () => {
  try {
    const userPhone = await getPhomeNumberFromStorage();
    const response = await axios.get(
      `${API_URL}/route-tracker/routs/owners/${userPhone}`,
      {
        timeout: 10000, // 10 seconds
      }
    );

    response.data.forEach(convertDaysToWords);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllWorkersRoutes = async () => {
  try {
    const userPhone = await getPhomeNumberFromStorage();
    const response = await axios.get(
      `${API_URL}/route-tracker/routs/workers/${userPhone}`,
      {
        timeout: 10000, // 10 seconds
      }
    );

    response.data.forEach(convertDaysToWords);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRouteById = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/route-tracker/routes/${id}`,
      {
        timeout: 10000, // 10 seconds
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const hireWorkerOnRoute = async (workerPhoneNumber, id) => {
  try {
    const response = await axios.put(
      `${API_URL}/route-tracker/routes/${id}/hire/worker?workerPhoneNumber=${workerPhoneNumber}`,
      {
        timeout: 10000, // 10 seconds
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const hireCarOnRoute = async (carNumber, id) => {
  try {
    const response = await axios.put(
      `${API_URL}/route-tracker/routes/${id}/hire/car?carNumber=${carNumber}`,
      {
        timeout: 10000, // 10 seconds
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const leaveWorkerOnRoute = async (workerPhoneNumber, id) => {
  try {
    const response = await axios.put(
      `${API_URL}/route-tracker/routes/${id}/leave/worker?workerPhoneNumber=${workerPhoneNumber}`,
      {
        timeout: 10000, // 10 seconds
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const leaveCarOnRoute = async (carNumber, id) => {
  try {
    const response = await axios.put(
      `${API_URL}/route-tracker/routes/${id}/leave/car?carNumber=${carNumber}`,
      {
        timeout: 10000, // 10 seconds
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

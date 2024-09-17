import axios from "axios";
import config from "../../config";

const API_URL = config.API_URL;
export const createNewCar = async (
  brand,
  model,
  color,
  number,
  engineCapacity,
  fuel
) => {
  try {
    const response = await axios.post(
      `${API_URL}/route-tracker/cars`,
      {
        brand,
        model,
        color,
        number,
        engineCapacity,
        fuel,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 seconds
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

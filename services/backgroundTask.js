// backgroundTask.js
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import axios from "axios";

const LOCATION_TASK_NAME = "BACKGROUND_LOCATION_TASK";

// Реєстрація завдання для фонового отримання геолокації
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error("Помилка в фоновому завданні", error);
    return;
  }
  if (data) {
    const { locations } = data;
    const { latitude, longitude } = locations[0].coords;
    console.log(`Фонова локація: ${latitude}, ${longitude}`);

    try {
      const response = await axios.post(
        "https://your-backend-server.com/api/location",
        { latitude, longitude }
      );
      console.log("Геолокація успішно надіслана", response.data);
    } catch (error) {
      console.error("Помилка при відправці геолокації", error);
    }
  }
});

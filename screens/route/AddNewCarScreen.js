import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Dropdown from "../../components/Dropdown";
import { createNewCar } from "../../services/car/CarService";
import { hireCarOnRoute } from "../../services/route/RouteService";
import LoadingModal from "../../components/LoadingModal";
import { globalStyles } from "../../style/globalStyles ";

const AddNewCarScreen = ({ route, navigation }) => {
  const { routeId } = route.params;
  const [loading, setLoading] = useState(false);

  const [car, setRoute] = useState({
    brand: "",
    model: "",
    color: "",
    number: "",
    capacity: "",
    fuel: "",
  });

  //handle pickup Request function
  const handleCreateNewCarRequest = async () => {
    try {
      if (!car.brand || !car.model || !car.number) {
        Alert.alert(
          "Будь ласка, переконайтеся, що поля бренд, модел та номер заповнені!"
        );
        return;
      }
      setLoading(true);
      await createNewCar(
        car.brand,
        car.model,
        car.color,
        car.number,
        car.capacity,
        car.fuel
      );
      await hireCarOnRoute(car.number, routeId);
      navigation.navigate("Home");
      Alert.alert(
        "Вітаємо!",
        "Автомобіль з номером " + car.number + " був успішно стоврений"
      );
    } catch (error) {
      alert(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView>
          <View style={globalStyles.createNewContainer}>
            <View>
              <Text style={{ fontWeight: "500" }}>Марка</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Mercedes"
                value={car.brand}
                onChangeText={(text) =>
                  setRoute((prevCar) => ({ ...prevCar, brand: text }))
                }
              />
            </View>

            <View>
              <Text style={{ fontWeight: "500" }}>Модель</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Sprinter"
                value={car.model}
                onChangeText={(text) =>
                  setRoute((prevCar) => ({ ...prevCar, model: text }))
                }
              />
            </View>

            <View>
              <Text style={{ fontWeight: "500" }}>Колір</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Чорний"
                value={car.color}
                onChangeText={(text) =>
                  setRoute((prevCar) => ({ ...prevCar, color: text }))
                }
              />
            </View>

            <View>
              <Text style={{ fontWeight: "500" }}>Номер</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="АВ4041НР"
                value={car.number}
                onChangeText={(text) =>
                  setRoute((prevCar) => ({ ...prevCar, number: text }))
                }
              />
            </View>

            <View>
              <Text style={{ fontWeight: "500" }}>об'єм двигуна</Text>
              <TextInput
                keyboardType="numeric"
                style={globalStyles.input}
                placeholder="3л"
                value={car.capacity}
                onChangeText={(text) =>
                  setRoute((prevCar) => ({ ...prevCar, capacity: text }))
                }
              />
            </View>
            <View style={{ width: "100%" }}>
              <Text style={{ fontWeight: "500" }}>Паливо</Text>
              <Dropdown
                placeholderText={"Виберіть паливо"}
                selectedValue={car.fuel}
                onValueChange={(value) =>
                  setRoute((prevCar) => ({
                    ...prevCar,
                    fuel: value,
                  }))
                }
                options={[
                  { label: "Дизель", value: "DIESEL" },
                  { label: "Бензин", value: "Gasoline" },
                  { label: "Електро", value: "Electric" },
                  { label: "Гібрид", value: "HYBRID" },
                ]}
              />
            </View>
            <View>
              <TouchableOpacity
                style={globalStyles.createButton}
                onPress={handleCreateNewCarRequest}
              >
                <Text style={globalStyles.createButtonTxt}>Створити</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
      <LoadingModal visible={loading} />
    </View>
  );
};

export default AddNewCarScreen;

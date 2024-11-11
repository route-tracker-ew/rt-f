import React, { useState } from "react";
import {
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
import { registerNewRoute } from "../../services/route/RouteService";
import LoadingModal from "../../components/LoadingModal";
import { globalStyles } from "../../style/globalStyles ";

const CreateNewRouteScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [route, setRoute] = useState({
    sourceCountry: "",
    sourceCity: "",
    dayOfDepartureFromSource: { label: "", value: 0 },
    destinationCountry: "",
    destinationCity: "",
    dayOfDepartureFromDestination: { label: "", value: 0 },
  });

  const handleCreateNewRouteRequest = async () => {
    try {
      if (
        !route.sourceCountry ||
        !route.sourceCity ||
        !route.dayOfDepartureFromSource.value ||
        !route.destinationCountry ||
        !route.destinationCity ||
        !route.dayOfDepartureFromDestination.value
      ) {
        Alert.alert("Будь ласка, переконайтеся, що ваші поля заповнені!");
        return;
      }
      setLoading(true);
      await registerNewRoute(
        route.sourceCountry,
        route.sourceCity,
        route.dayOfDepartureFromSource.value,
        route.destinationCountry,
        route.destinationCity,
        route.dayOfDepartureFromDestination.value
      );
      navigation.navigate("Home");
      Alert.alert(
        "Вітаємо!",
        "Маршрут " +
          route.sourceCountry +
          " - " +
          route.destinationCountry +
          " був успішно створений"
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
              <Text style={{ fontWeight: "500" }}>Країна відправлення</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Україна"
                value={route.sourceCountry}
                onChangeText={(text) =>
                  setRoute((prevRoute) => ({ ...prevRoute, sourceCountry: text }))
                }
              />
            </View>

            <View>
              <Text style={{ fontWeight: "500" }}>Місто відправлення</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Вінниця"
                value={route.sourceCity}
                onChangeText={(text) =>
                  setRoute((prevRoute) => ({ ...prevRoute, sourceCity: text }))
                }
              />
            </View>

            <View style={globalStyles.dropdownContainer}>
              <Text style={{ fontWeight: "500" }}>День відправлення</Text>
              <Dropdown
                placeholderText={"Виберіть день"}
                selectedValue={route.dayOfDepartureFromSource.label}
                onValueChange={(label, value) => {
                  setRoute((prevRoute) => ({
                    ...prevRoute,
                    dayOfDepartureFromSource: { label, value },
                  }));
                }}
              />
            </View>

            <View>
              <Text style={{ fontWeight: "500" }}>Країна призначення</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Німеччина"
                value={route.destinationCountry}
                onChangeText={(text) =>
                  setRoute((prevRoute) => ({ ...prevRoute, destinationCountry: text }))
                }
              />
            </View>

            <View> 
              <Text style={{ fontWeight: "500" }}>Місто призначення</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Крефельд"
                value={route.destinationCity}
                onChangeText={(text) =>
                  setRoute((prevRoute) => ({ ...prevRoute, destinationCity: text }))
                }
              />
            </View>

            <View style={globalStyles.dropdownContainer}>
              <Text style={{ fontWeight: "500" }}>День відправлення</Text>
              <Dropdown
                placeholderText={"Виберіть день"}
                selectedValue={route.dayOfDepartureFromDestination.label}
                onValueChange={(label, value) => {
                  setRoute((prevRoute) => ({
                    ...prevRoute,
                    dayOfDepartureFromDestination: { label, value },
                  }));
                }}
              />
            </View>
            <View>
              <TouchableOpacity
                style={globalStyles.createButton}
                onPress={handleCreateNewRouteRequest}
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

export default CreateNewRouteScreen;

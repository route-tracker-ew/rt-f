import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserInfoByPhoneNumber } from "../../services/user/UserService";
import { hireWorkerOnRoute } from "../../services/route/RouteService";
import { globalStyles } from "../../style/globalStyles ";

const AddNewWorkerScreen = ({ route, navigation }) => {
  const { routeId } = route.params;
  const [loading, setLoading] = useState(false);
  const [showFullNameInput, setShowFullNameInput] = useState(false);
  const [worker, setWorker] = useState({
    firstName: "",
    lastName: "",
    number: "",
  });

  // Function to handle creating a new route request
  const handleCreateNewRouteRequest = async () => {
    try {
      if (!worker.number) {
        Alert.alert("Будь ласка, введіть номер телефону!");
        return;
      }
      setLoading(true);
      const info = await getUserInfoByPhoneNumber(worker.number);
      worker.firstName = info.firstName;
      worker.lastName = info.lastName;
      setShowFullNameInput(true);
    } catch (error) {
      alert(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle confirming the worker details
  const handleConfirmWorker = async () => {
    try {
      setLoading(true);
      await hireWorkerOnRoute(worker.number, routeId);
      navigation.navigate("Home");
      Alert.alert(
        "Вітаємо!",
        "Робітник " +
          worker.firstName +
          " " +
          worker.lastName +
          " був успішно найнятий"
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
              <Text style={{ fontWeight: "500" }}>Номер телефону</Text>
              <TextInput
                keyboardType="numeric"
                editable={!showFullNameInput}
                style={globalStyles.input}
                placeholder="063-153-65-33"
                value={worker.number}
                onChangeText={(text) =>
                  setWorker((prevWorker) => ({ ...prevWorker, number: text }))
                }
              />
            </View>

            {showFullNameInput && (
              <View>
                <Text style={{ fontWeight: "500" }}>Ім'я</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Артем"
                  value={worker.firstName}
                  editable={false}
                />

                <Text style={{ fontWeight: "500" }}>Фамілія</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Лічереп"
                  value={worker.lastName}
                  editable={false}
                />
              </View>
            )}

            <View>
              <TouchableOpacity
                style={globalStyles.createButton}
                onPress={() => {
                  if (!showFullNameInput) {
                    handleCreateNewRouteRequest();
                  } else {
                    handleConfirmWorker();
                  }
                  disabled = { loading };
                }}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={globalStyles.createButtonTxt}>
                    {!showFullNameInput ? "Далі" : "Найняти"}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AddNewWorkerScreen;

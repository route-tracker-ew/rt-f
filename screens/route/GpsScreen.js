import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import LoadingModal from "../../components/LoadingModal";
import { globalStyles } from "../../style/globalStyles ";
import { registerGps } from "../../services/user/UserService";
import GpsInfo from "../../components/route/GpsInfo";
import { hireWorkerOnRoute } from "../../services/route/RouteService";

const GpsScreen = ({ route, navigation }) => {
  const carNumber = route.params.carNumber;
  const gps = route.params.gps;
  const routeId = route.params.routeId;

  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState({
    phoneNumber: "",
    password: "",
    cfmPass: "",
    isChecked: false,
  });
  const [isChecked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showcfmPass, setShowcfmPass] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleshowcfmPassVisibility = () => {
    setShowcfmPass(!showcfmPass);
  };

  const handleGpsRegistration = async () => {
    try {
      if (!account.phoneNumber || !account.password || !account.cfmPass) {
        Alert.alert("Будь ласка, переконайтеся, що ваші поля заповнені!");
        return;
      }
      if (account.password !== account.cfmPass) {
        Alert.alert("Будь ласка, переконайтеся, що ваші паролі співпадають!");
        return;
      }
      if (!isChecked) {
        Alert.alert("Будь ласка, прийміть умови та положення!");
        return;
      }
      setLoading(true);
      await registerGps(
        carNumber,
        account.phoneNumber,
        account.password,
        account.cfmPass
      );
      await hireWorkerOnRoute(account.phoneNumber, routeId);
      navigation.navigate("Профіль");
      Alert.alert(`Gps tracker створено для ${carNumber}`);
    } catch (error) {
      Alert.alert(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {!gps ? (
            <>
              <View style={styles.titleContainer}>
                <Text style={styles.subTitle}>
                  Створіть Gps трекер для авто із номером {carNumber}
                </Text>
              </View>

              <View>
                <Text>Номер телефону</Text>
                <TextInput
                  keyboardType="numeric"
                  style={globalStyles.input}
                  placeholder="+8801XXXXXXXXX"
                  value={account.phoneNumber}
                  onChangeText={(text) =>
                    setAccount((prevAccount) => ({
                      ...prevAccount,
                      phoneNumber: text,
                    }))
                  }
                />
              </View>

              <View style={styles.passwordContainer}>
                <Text>Пароль</Text>
                <TextInput
                  style={[globalStyles.input, styles.passwordInput]}
                  placeholder="*************"
                  secureTextEntry={!showPassword}
                  value={account.password}
                  onChangeText={(text) =>
                    setAccount((prevAccount) => ({
                      ...prevAccount,
                      password: text,
                    }))
                  }
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  style={styles.passwordToggle}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.passwordContainer}>
                <Text>Підтвердити пароль</Text>
                <TextInput
                  style={[globalStyles.input, styles.passwordInput]}
                  placeholder="*************"
                  secureTextEntry={!showcfmPass}
                  value={account.cfmPass}
                  onChangeText={(text) =>
                    setAccount((prevAccount) => ({
                      ...prevAccount,
                      cfmPass: text,
                    }))
                  }
                />
                <TouchableOpacity
                  onPress={toggleshowcfmPassVisibility}
                  style={styles.passwordToggle}
                >
                  <MaterialIcons
                    name={showcfmPass ? "visibility" : "visibility-off"}
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.checkboxContainer}>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? "#000000" : undefined}
                />
                <Text style={styles.paragraph}>
                  Прийняти умови та положення
                </Text>
              </View>

              <TouchableOpacity
                style={globalStyles.createButton}
                onPress={handleGpsRegistration}
              >
                <Text style={globalStyles.createButtonTxt}>Створити</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.gpsInfoContainer}>
              <GpsInfo
                phoneNumber={gps.phoneNumber}
                model={"s"}
                carNumber={carNumber}
                routeId={1}
                title={"s"}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <LoadingModal visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 12,
    marginBottom: 5,
    color: "#8C8C8C",
  },
  passwordContainer: {
    position: "relative",
    marginTop: 10,
  },
  passwordInput: {
    paddingRight: 40,
  },
  passwordToggle: {
    position: "absolute",
    top: 32,
    right: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    marginTop: 10,
    width: "100%",
    marginLeft: 25,
  },
  paragraph: {
    fontWeight: "600",
  },
  gpsInfoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  gpsInfoText: {
    fontSize: 16,
    fontWeight: "600",
    color: "green",
  },
});

export default GpsScreen;

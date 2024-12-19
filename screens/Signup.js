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
import { registerCustomer } from "../services/user/UserService";
import LoadingModal from "../components/LoadingModal";
import { globalStyles } from "../style/globalStyles ";

const Signup = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [account, setAccount] = useState({
    firstName: "",
    lastName: "",
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

  const joinNow = () => {
    navigation.navigate("Signin");
  };

  const handleSignup = async () => {
    try {
      if (
        !account.firstName ||
        !account.lastName ||
        !account.phoneNumber ||
        !account.password ||
        !account.cfmPass
      ) {
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
      await registerCustomer(
        account.firstName,
        account.lastName,
        account.phoneNumber,
        account.password,
        account.cfmPass
      );
      navigation.navigate("Signin");
      alert(`Обліковий запис створено для ${account.firstName}`);
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
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Зареєструватися</Text>
            <Text style={styles.subTitle}>
              Введіть свої дані нижче, щоб приєднатися до нас
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text>Ім'я</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="John"
              value={account.firstName}
              onChangeText={(text) =>
                setAccount((prevAccount) => ({
                  ...prevAccount,
                  firstName: text,
                }))
              }
            />
          </View>

          <View style={styles.infoContainer}>
            <Text>Фамілія</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="William"
              value={account.lastName}
              onChangeText={(text) =>
                setAccount((prevAccount) => ({
                  ...prevAccount,
                  lastName: text,
                }))
              }
            />
          </View>

          <View style={styles.infoContainer}>
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
            <Text style={styles.paragraph}>Прийняти умови та положення</Text>
          </View>

          <TouchableOpacity
            style={globalStyles.createButton}
            onPress={handleSignup}
          >
            <Text style={globalStyles.createButtonTxt}>Зареєструватися</Text>
          </TouchableOpacity>
          <View style={styles.join}>
            <Text>Вже маєте обліковий запис?</Text>
            <TouchableOpacity onPress={joinNow}>
              <Text style={styles.a}>Увійдіть до системи</Text>
            </TouchableOpacity>
          </View>
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
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 1,
  },
  subTitle: {
    fontSize: 12,
    marginBottom: 20,
    color: "#CACACA",
  },
  infoContainer: {
    marginTop: 10,
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
  join: {
    flexDirection: "row",
    marginTop: 25,
  },
  a: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginLeft: 2,
  },
});

export default Signup;

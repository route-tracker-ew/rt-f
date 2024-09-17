import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import { getUserInfoByPhoneNumber } from "../services/user/UserService";
import LoadingModal from "../components/LoadingModal";
import { saveFirstNameToStorage } from "../services/StorageService";
import { savePhomeNumberToStorage } from "../services/StorageService";
import { login } from "../services/auth/AuthService";

// Ім'я фонової задачі
const BACKGROUND_TASK_NAME = "background-task";

// Реалізація фонової задачі
TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  try {
    // Виконання функції login з фіксованим номером телефону
   const token = await login("0631536533", "11111");
    console.log("Login successful");
    console.log(token)
    return BackgroundFetch;
  } catch (err) {
    console.error("Error during background task:", err);
    return BackgroundFetch.Result.Failed;
  }
});

const Signin = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const joinNow = () => {
    navigation.navigate("Signup");
  };

  const handleSignin = async () => {
    setLoading(true);
    try {
      await login(phoneNumber, "11111");
      const response = await getUserInfoByPhoneNumber(phoneNumber);
      if (response.phoneNumber != null) {
        if (response.firstName != null) {
          await saveFirstNameToStorage(response.firstName);
        }
        await savePhomeNumberToStorage(response.phoneNumber);
        alert("Successfully logged in");
        navigation.replace("Home");
      } else {
        throw new Error("Failed to log in");
      }
    } catch ({ message }) {
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // Реєстрація фонової задачі при завантаженні компонента
  useEffect(() => {
    const registerBackgroundTask = async () => {
      await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
        minimumInterval: 1, // Інтервал 1 секунда
        stopOnTerminate: false, // Продовжувати після закриття додатка
        startOnBoot: true, // Запускати при завантаженні пристрою
      });
    };

    registerBackgroundTask();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Увійти</Text>
            <Text style={styles.subTitle}>
              Ласкаво просимо назад, ми за вами скучили
            </Text>
          </View>

          <View style={styles.emailContainer}>
            <Text>Номер телефону</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              placeholder="063-153-65-31"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
          </View>

          <View style={styles.passwordContainer}>
            <Text>Пароль</Text>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="*************"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => setPassword(text)}
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
          <TouchableOpacity style={styles.button} onPress={handleSignin}>
            <Text style={styles.btnTxt}>Увійти до системи</Text>
          </TouchableOpacity>

          <View style={styles.join}>
            <Text>Не маєте облікового запису?</Text>
            <TouchableOpacity onPress={joinNow}>
              <Text style={styles.a}>Зареєструватися</Text>
            </TouchableOpacity>
          </View>
        </>
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
  input: {
    width: 350,
    height: 40,
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    marginTop: 4,
  },
  button: {
    width: 350,
    height: 40,
    backgroundColor: "black",
    marginTop: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  btnTxt: {
    color: "white",
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
    top: 30,
    right: 10,
  },
  join: {
    flexDirection: "row",
    marginTop: 50,
  },
  a: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginLeft: 2,
  },
});

export default Signin;

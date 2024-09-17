import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Option from "../components/Option";
import { getFullNameFromStorage } from "../services/StorageService";
import { getPhomeNumberFromStorage } from "../services/StorageService";
import { logout } from "../services/auth/AuthService";
import { getAllOwnersRoutes } from "../services/route/RouteService";
import LoadingModal from "../components/LoadingModal";

const Search = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("Abbas Uddin");
  const [phoneNumber, setPhoneNumber] = useState("+8800 17-XXX-XXXXX");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const fullName = await getFullNameFromStorage();
        const phoneNumber = await getPhomeNumberFromStorage();
        if (fullName && phoneNumber) {
          setFullName(fullName);
          setPhoneNumber(phoneNumber);
        }
      } catch (error) {
        console.error("Error retrieving full name:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigation.navigate("Authentication");
    } catch ({ message }) {
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoteScreen = async () => {
    setLoading(true);
    try {
      const allRoutes = await getAllOwnersRoutes();
      navigation.navigate("RouteScreen", { routes: allRoutes });
    } catch ({ message }) {
      alert(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.blackContainer}>
        <View
          style={{
            alignItems: "center",
            top: 50,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "500" }}>
            Мій профіль
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 20,
            alignItems: "center",
            top: 40,
          }}
        >
          <Ionicons name="person-circle-outline" size={60} color="white" />
          <View>
            <Text
              style={{
                color: "#fff",
                fontWeight: "600",
                fontSize: 25,
              }}
            >
              {fullName}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontWeight: "400",
                fontSize: 12,
                color: "grey",
              }}
            >
              {phoneNumber}
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <ScrollView>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              left: 30,
              paddingTop: 15,
              paddingBottom: 15,
            }}
          >
            Основне
          </Text>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 15,
            }}
          >
            <Option icon={"lock-closed-outline"} txt={"Змінити пароль"} />
            <Option icon={"at-circle"} txt={"Пошта"} />
            <Option icon={"location-sharp"} txt={"Адреса"} />
            <Option icon={"notifications"} txt={"Сповіщення"} />
            <TouchableOpacity onPress={handleLogout}>
              <Option icon={"log-out-outline"} txt={"Вийти"} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              left: 30,
              paddingTop: 15,
              paddingBottom: 15,
            }}
          >
            Інше
          </Text>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 15,
            }}
          >
            <Option icon={"list-outline"} txt={"Історія операцій"} />
            <TouchableOpacity onPress={handleRoteScreen}>
              <Option icon={"compass-outline"} txt={"Перглянути маршрути"} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <LoadingModal visible={loading} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDED",
  },
  blackContainer: {
    width: "100%",
    backgroundColor: "black",
    height: "25%",
  },
});

export default Search;

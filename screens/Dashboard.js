import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import SecondTab from "../components/SecondTab";
import RequestOrder from "../components/RequestOrder";
import { getParcelsRequest } from "../services/parcel/ParcelService";

const Dashboard = ({ navigation }) => {
  const user = true;
  if (!user) {
    console.log("No user login");
    navigation.navigate("Login");
  }
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]); // Стан для збереження посилок

  // Функція для отримання списку посилок (можна замінити на реальний API)
  const fetchOrders = async () => {
    // Імітація отримання даних
    var fetchedOrders = await getParcelsRequest();
    setOrders(fetchedOrders); // Збереження отриманих посилок у стан
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setOrders([]);  // Очищаємо стан перед отриманням нових даних
      fetchOrders();   // Отримуємо нові дані
    });

    // Очистка слухача, коли екран більше не активний
    return unsubscribe;
  }, [navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.blackContainer}>
          <View style={styles.location}>
            <Ionicons name="location-sharp" size={25} color="black" />
            <Text>Euro ways</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Давайте відстежимо вашу посилку</Text>
            <Text style={styles.subtitle}>
              Будь ласка, введіть номер телефону для відстеження
            </Text>
          </View>
          <View style={styles.search}>
            <TextInput
              style={styles.input}
              placeholder="#XXXXXXXXXX"
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
            <TouchableOpacity style={styles.searchicon}>
              <Image
                source={require("../assets/icons/search.png")}
                style={styles.ipic}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.tab}>
            <SecondTab navigation={navigation} />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginTop: 50,
            paddingLeft: 40,
            marginRight: 40,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
            }}
          >
            Очікують на підтвердження
          </Text>
        </View>
        <ScrollView
            contentContainerStyle={styles.ordersContainer}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              {orders.map((order, index) => (
                <RequestOrder
                  id={order.id}
                  key={index}
                  phoneNumber={order.receiver.phoneNumber}
                  amount={order.amount}
                  price={"?"}
                  status={order.status}
                  date={order.date}
                  fromCountry={order.sourceCountry}
                  toCountry={order.destinationCountry}
                  from={order.sourceCity}
                  to={order.destinationCity}
                  navigation={navigation}
                />
              ))}
            </View>
          </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDED",
  },
  input: {
    height: 40,
    borderColor: "white",
    borderRadius: 15,
    backgroundColor: "white",
    width: "90%",
    marginVertical: 8,
    paddingHorizontal: 15,
    marginLeft: 10,
    marginRight: 10,
    position: "relative",
  },
  searchicon: {
    borderColor: "white",
    position: "absolute",
    top: 18,
    right: 40,
  },
  blackContainer: {
    width: "100%",
    backgroundColor: "black",
    height: 280,
    position: "relative",
  },
  tab: {
    position: "absolute",
    top: 260,
    left: 40,
  },
  ipic: {
    width: 20,
    height: 20,
  },
  titleContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    color: "#ffffff",
    width: "100%",
  },
  subtitle: {
    fontSize: 14,
    color: "#CACACA",
  },
  search: {
    alignItems: "center",
    marginTop: 20,
  },
  location: {
    backgroundColor: "#CACACA",
    height: 35,
    width: "40%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginLeft: 20,
    marginTop: 50,
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});

export default Dashboard;

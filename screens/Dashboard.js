import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import SecondTab from "../components/SecondTab";
import Order from "../components/Order";
const Dashboard = ({ navigation }) => {
  const user = true;
  if (!user) {
    console.log("No user login");
    navigation.navigate("Login");
  }
  const [search, setSearch] = useState("");
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
            Поточні відвантаження
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 12,
                color: "grey",
                marginTop: 3,
              }}
            >
              переглянути всі
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Order
            orderid={"#MRF007RSR"}
            status={"on the way"}
            date={"13 September 2023"}
            from={"mrBata"}
            to={"beingRafie"}
          />
        </View>
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

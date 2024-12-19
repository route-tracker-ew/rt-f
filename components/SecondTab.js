import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import { getAllWorkersRoutes } from "../services/route/RouteService";
import { TouchableOpacity } from "react-native";

const SecondTab = ({ navigation }) => {
  const handlePickup = async () => {
    try {
      const allRoutes = await getAllWorkersRoutes();
      navigation.navigate("SelectRouteForParcel", { routes: allRoutes });
    } catch ({ message }) {
      alert(message);
    }
  };

  const handleParcelList = async () => {
    try {
      const allRoutes = await getAllWorkersRoutes();
      navigation.navigate("SelectRouteForParcels", { routes: allRoutes });
    } catch ({ message }) {
      alert(message);
    }
  };

  const hanelQrCode = () => {
    navigation.navigate("QrCodeScreen", {navigation: navigation});
  };

  const handleBestRoute = async () => {
    const allRoutes = await getAllWorkersRoutes();
    navigation.navigate("SelectOptimalRouteForParcels", { routes: allRoutes });
  };
  return (
    <View style={styles.nav}>
      {/* ---------------------1 */}
      <TouchableOpacity style={styles.icon} onPress={handlePickup}>
        <Image source={require("../assets/icons/1.png")} style={styles.ipic} />
        <Text style={styles.itxt}>Нова посилка</Text>
      </TouchableOpacity>

      {/* ---------------------2 */}
      <TouchableOpacity style={styles.icon} onPress={handleParcelList}>
        <Image source={require("../assets/icons/2.png")} style={styles.ipic} />
        <Text style={styles.itxt}>посилки</Text>
      </TouchableOpacity>

      {/* ---------------------3 */}
      <TouchableOpacity style={styles.icon} onPress={hanelQrCode}>
        <Image source={require("../assets/icons/5.png")} style={styles.ipic} />
        <Text style={styles.itxt}>Qr-code</Text>
      </TouchableOpacity>
      {/* ---------------------4 */}
      <TouchableOpacity style={styles.icon} onPress={handleBestRoute}>
        <Image source={require("../assets/icons/18.png")} style={styles.ipic} />
        <Text style={styles.itxt}>маршрут</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SecondTab;

const styles = StyleSheet.create({
  nav: {
    width: "90%",
    height: 60,
    backgroundColor: "white",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icon: {
    flexDirection: "column",
    justifyContent: "center",
    width: "25%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  ipic: {
    width: 30,
    height: 30,
  },
  itxt: {
    fontSize: 12,
  },
});

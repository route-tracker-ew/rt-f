import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { deleteRouteById } from "../../services/route/RouteService";
import { globalStyles } from "../../style/globalStyles ";

const RouteOrder = ({
  routeTitle,
  dateToCountry,
  dateFromCountry,
  drivers,
  cars,
  id,
  navigation,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDriverScreen = () => {
    navigation.navigate("DriverScreen", {
      title: routeTitle,
      driver: drivers,
      routeId: id,
    });
  };

  const handleСarScreen = () => {
    navigation.navigate("CarScreen", {
      title: routeTitle,
      car: cars,
      routeId: id,
      worker: drivers,
    });
  };

  const handleDeleteRouteById = async () => {
    try {
      setLoading(true);
      await deleteRouteById(id);
      navigation.navigate("Home");
    } catch (message) {
      console.error("Error deleting route:", message);
    } finally {
      setLoading(false);
    }
  };

  const renderRightActions = () => (
    <TouchableOpacity
      style={globalStyles.deleteButton}
      onPress={handleDeleteRouteById}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={globalStyles.deleteText}>Видалити</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      containerStyle={globalStyles.swipeableContainer}
      friction={2}
      tension={40}
    >
      <View style={globalStyles.infoContainer}>
        <View style={globalStyles.infoHead}>
          <View style={{ marginLeft: 5, marginTop: 5 }}>
            <Image
              source={require("../../assets/icons/9.png")}
              style={globalStyles.ipic}
            />
          </View>

          <View style={globalStyles.infoTitle}>
            <Text style={globalStyles.infoID}>{routeTitle}</Text>
            <Text>
              {dateToCountry} | {dateFromCountry}
            </Text>
          </View>
        </View>

        <View style={styles.nav}>
          <TouchableOpacity style={styles.icon} onPress={handleDriverScreen}>
            <Image
              source={require("../../assets/icons/6.png")}
              style={globalStyles.ipic}
            />
            <Text style={globalStyles.itxt}>Водії: {drivers.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon} onPress={handleСarScreen}>
            <Image
              source={require("../../assets/icons/8.png")}
              style={globalStyles.ipic}
            />
            <Text style={globalStyles.itxt}>Автомобілі: {cars.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon}>
            <Image
              source={require("../../assets/icons/3.png")}
              style={globalStyles.ipic}
            />
            <Text style={globalStyles.itxt}>Тарифи</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon}>
            <Image
              source={require("../../assets/icons/7.png")}
              style={globalStyles.ipic}
            />
            <Text style={globalStyles.itxt}>Дні виїзду</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
};

export default RouteOrder;

const styles = StyleSheet.create({
  nav: {
    marginTop: 10,
    width: "100%",
    height: 60,
    backgroundColor: "white",
    flexDirection: "row",
    paddingVertical: 10,
  },
  icon: {
    flexDirection: "column",
    justifyContent: "center",
    width: "25%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

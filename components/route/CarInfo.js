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
import { globalStyles } from "../../style/globalStyles ";
import { leaveCarOnRoute } from "../../services/route/RouteService";

const CarInfo = ({
  brand,
  model,
  color,
  number,
  engineCapacity,
  fuel,
  routeId,
  title,
  id,
  navigation,
  gpsTracker,
}) => {
  const [loading, setLoading] = useState(false);
  const handleUnbindCarFromRouteById = async () => {
    try {
      setLoading(true);
      await leaveCarOnRoute(number, routeId);
      navigation.navigate("Home");
      alert("Автомобіль з номером " + number + " був успішно видалений");
    } catch (message) {
      console.error("Error deleting car:", message);
    } finally {
      setLoading(false);
    }
  };

  const handleGPS = () => {
    navigation.navigate("GpsScreen", {
      carNumber: number,
      gps: gpsTracker,
      routeId: routeId,
    });
  };

  const renderRightActions = () => (
    <TouchableOpacity
      style={globalStyles.deleteButton}
      onPress={handleUnbindCarFromRouteById}
      disabled={loading}
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
              source={require("../../assets/icons/8.png")}
              style={globalStyles.ipic}
            />
          </View>

          <View style={globalStyles.infoTitle}>
            <Text style={globalStyles.infoID}>{number}</Text>
            <Text>
              {brand} | {model}
            </Text>
            <Text>{title}</Text>
          </View>
        </View>

        <View style={styles.nav}>
          <TouchableOpacity style={styles.icon}>
            <Image
              source={require("../../assets/icons/11.png")}
              style={globalStyles.ipic}
            />
            <Text style={globalStyles.itxt}>{color}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon}>
            <Image
              source={require("../../assets/icons/12.png")}
              style={globalStyles.ipic}
            />
            <Text style={globalStyles.itxt}>{engineCapacity}л</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon}>
            <Image
              source={require("../../assets/icons/13.png")}
              style={globalStyles.ipic}
            />
            <Text style={globalStyles.itxt}>{fuel}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon} onPress={handleGPS}>
            <Image
              source={require("../../assets/icons/16.png")}
              style={globalStyles.ipic}
            />
            <Text style={globalStyles.itxt}>GPS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
};

export default CarInfo;

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

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

const GpsInfo = ({ model, phoneNumber, carNumber, routeId, title }) => {
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
            <Text style={globalStyles.infoID}>{phoneNumber}</Text>
            <Text>
              {carNumber} | {model}
            </Text>
            <Text>{title}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default GpsInfo;

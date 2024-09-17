import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { globalStyles } from "../../style/globalStyles ";
import { leaveWorkerOnRoute } from "../../services/route/RouteService";

const DriverInfo = ({
  firstName,
  lastName,
  number,
  routeId,
  routeTitle,
  navigation,
}) => {
  const handleDeleteDriverById = async () => {
    try {
      await leaveWorkerOnRoute(number, routeId);
      navigation.navigate("Home");
      alert(
        "Робітник " + firstName + " " + lastName + " був успішно видалений"
      );
    } catch (message) {
      console.error("Error deleting account:", message);
    }
  };

  const renderRightActions = () => (
    <TouchableOpacity
      style={globalStyles.deleteButton}
      onPress={handleDeleteDriverById}
    >
      <Text style={globalStyles.deleteText}>Видалити</Text>
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
              source={require("../../assets/icons/10.png")}
              style={globalStyles.ipic}
            />
          </View>
          <View style={globalStyles.infoTitle}>
            <Text style={globalStyles.infoID}>
              {firstName} {lastName}
            </Text>
            <Text>{routeTitle}</Text>
          </View>
        </View>

        <View style={styles.nav}>
          <View style={styles.icon}>
            <Image
              source={require("../../assets/icons/15.png")}
              style={[globalStyles.ipic, { marginRight: 5 }]}
            />
            <Text style={globalStyles.itxt} selectable={true}>
              {number}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default DriverInfo;

const styles = StyleSheet.create({
  nav: {
    backgroundColor: "white",

    paddingVertical: 10,
  },
  icon: {
    flexDirection: "row",
    justifyContent: "center",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

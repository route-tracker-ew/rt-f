import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles } from "../../style/globalStyles ";

const ParcelRouteInfo = ({
  routeTitle,
  routeTitle3,
  dateToCountry,
  dateFromCountry,
  id,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.infoContainer}>
        <View style={globalStyles.infoHead}>
          <View style={{ marginLeft: 5, marginTop: 5 }}>
            <Image
              source={require("../../assets/icons/9.png")}
              style={globalStyles.ipic}
            />
          </View>

          <View style={globalStyles.infoTitle}>
            <Text style={globalStyles.infoID}>{routeTitle}</Text>
            <Text>{routeTitle3}</Text>
            <Text>
              {dateToCountry} | {dateFromCountry}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ParcelRouteInfo;

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 70,
    width: 350,
    borderRadius: 10,
    backgroundColor: "white",
  },
});

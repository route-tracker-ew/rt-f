import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";

import ParcelRouteInfo from "../../components/route/ParcelRouteInfo";
import { getSpecifiedParcels } from "../../services/parcel/ParcelService";
import { globalStyles } from "../../style/globalStyles ";
import { Calendar } from "react-native-calendars";
import LoadingModal from "../../components/LoadingModal";

const TrackerRouteForParcels = ({ route, navigation }) => {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const routes = route.params.routes || [];
  console.log(routes)
  if (routes.length === 0) {
    return (
      <SafeAreaView style={globalStyles.centerConatiner}>
        <Text>У вас немає маршрутів.</Text>
      </SafeAreaView>
    );
  }

  const handleParcelRouteInfoPress = async (routeInfo) => { 
      navigation.navigate("TrackerCarScreen", {
        title: routeInfo.sourceCountry + " - " + routeInfo.destinationCountry,
        car: routeInfo.cars,
        routeId: routeInfo.id,
      });
    
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={globalStyles.centerConatiner}>
          {routes.map((routeInfo) => (
            <View style={globalStyles.intoMapConatiner} key={routeInfo.id}>
              <ParcelRouteInfo
                routeTitle={`${routeInfo.sourceCountry} - ${routeInfo.destinationCountry}`}
                routeTitle3={`${routeInfo.sourceCity} - ${routeInfo.destinationCity}`}
                dateToCountry={routeInfo.dayOfDepartureFromSource}
                dateFromCountry={routeInfo.dayOfDepartureFromDestination}
                drivers={0}
                cars={0}
                id={routeInfo.id}
                navigation={navigation}
                onPress={() => handleParcelRouteInfoPress(routeInfo)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  calendarContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default TrackerRouteForParcels;

import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";

import RouteInfo from "../../components/route/RouteInfo";
import { globalStyles } from "../../style/globalStyles ";

const RouteScreen = ({ route, navigation }) => {
  const routes = route.params.routes || [];
  if (routes.length === 0) {
    return (
      <SafeAreaView style={globalStyles.centerConatiner}>
        <Text>У вас немає маршрутів.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={globalStyles.centerConatiner}>
          {routes.map((routeInfo) => (
            <View style={globalStyles.intoMapConatiner} key={routeInfo.id}>
              <RouteInfo
                routeTitle={`${routeInfo.sourceCountry} - ${routeInfo.destinationCountry}`}
                sourceCity = {routeInfo.sourceCity}
                destinationCity ={routeInfo.destinationCity}
                dateToCountry={routeInfo.dayOfDepartureFromSource}
                dateFromCountry={routeInfo.dayOfDepartureFromDestination}
                drivers={routeInfo.workers}
                cars={routeInfo.cars}
                id={routeInfo.id}
                navigation={navigation}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RouteScreen;

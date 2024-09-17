import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import CarInfo from "../../components/route/CarInfo";
import { globalStyles } from "../../style/globalStyles ";

const CarScreen = ({ route, navigation }) => {
  const cars = route.params.car || [];
  const routeId = route.params.routeId;
  const routeTitle = route.params.title;

  const navigateToAddNewCar = () => {
    navigation.navigate("AddNewCarScreen", { routeId: routeId });
  };

  if (cars.length === 0) {
    return (
      <SafeAreaView style={globalStyles.centerConatiner}>
        <Text>Немає прив'язаних автомобілів.</Text>
        <View>
          <TouchableOpacity
            style={globalStyles.createButton}
            onPress={navigateToAddNewCar}
          >
            <Text style={globalStyles.createButtonTxt}>Додати</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View style={globalStyles.centerConatiner}>
        <ScrollView style={styles.scrollViewContainer}>
          {cars.map((car) => (
            <View style={globalStyles.intoMapConatiner} key={car.id}>
              <CarInfo
                brand={car.brand}
                model={car.model}
                color={car.color}
                number={car.number}
                engineCapacity={car.engineCapacity}
                fuel={car.fuelName}
                routeId={routeId}
                title={routeTitle}
                id={car.id}
                navigation={navigation}
                gpsTracker={car.gpsTracker}
              />
            </View>
          ))}
        </ScrollView>
        <View>
          <TouchableOpacity
            style={globalStyles.createButton}
            onPress={navigateToAddNewCar}
          >
            <Text style={globalStyles.createButtonTxt}>Додати</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    height: "94%",
  },
});

export default CarScreen;

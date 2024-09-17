import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import DriverInfo from "../../components/route/DriverInfo";
import { globalStyles } from "../../style/globalStyles ";

const DriverScreen = ({ route, navigation }) => {
  const drivers = route.params.driver || [];
  const routeId = route.params.routeId;
  const routeTitle = route.params.title;

  const navigateToAddNewDriver = () => {
    navigation.navigate("AddNewWorkerScreen", { routeId: routeId });
  };

  if (drivers.length === 0) {
    return (
      <SafeAreaView style={globalStyles.centerConatiner}>
        <Text>Немає робітників.</Text>
        <TouchableOpacity
          style={globalStyles.createButton}
          onPress={navigation.navigate("AddNewWorkerScreen", {
            routeId: routeId,
          })}
        >
          <Text style={globalStyles.createButtonTxt}>Додати</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View style={globalStyles.centerConatiner}>
        <ScrollView>
          <View style={globalStyles.centerConatiner}>
            {drivers.map((driver) => (
              <View style={globalStyles.intoMapConatiner} key={driver.id}>
                <DriverInfo
                  firstName={driver.firstName}
                  lastName={driver.lastName}
                  routeTitle={routeTitle}
                  routeId={routeId}
                  number={driver.phoneNumber}
                  id={driver.id}
                  navigation={navigation}
                />
              </View>
            ))}
          </View>
        </ScrollView>
        <View>
          <TouchableOpacity
            style={globalStyles.createButton}
            onPress={navigateToAddNewDriver}
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

export default DriverScreen;

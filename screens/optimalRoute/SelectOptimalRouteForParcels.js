import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  Modal,
  Button,
} from "react-native";

import ParcelRouteInfo from "../../components/route/ParcelRouteInfo";
import { getSpecifiedParcels } from "../../services/parcel/ParcelService";
import { globalStyles } from "../../style/globalStyles ";
import { Calendar } from "react-native-calendars";
import LoadingModal from "../../components/LoadingModal";

const SelectOptimalRouteForParcels = ({ route, navigation }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [loading, setLoading] = useState(false);

  const routes = route.params.routes || [];
  if (routes.length === 0) {
    return (
      <SafeAreaView style={globalStyles.centerConatiner}>
        <Text>У вас немає маршрутів.</Text>
      </SafeAreaView>
    );
  }

  const handleParcelRouteInfoPress = async (routeInfo) => {
   await setSelectedRoute(routeInfo);
   await setShowCalendar(true);
  };

  const handleSelectedDay = async (selectedDay) => {
    try {
      setShowCalendar(false);
      var parcels = await getSpecifiedParcels(selectedRoute.id, selectedDay.dateString);
      navigation.navigate("OptimalRoutes");
      setLoading(false);
    } catch ({ message }) {
      alert(message);
    }finally{
      // setLoading(false);
    }
  };

  // const getDatesForEveryMonth = (
  //   dayNumberOfDepartureFromSource,
  //   dayNumberOfDepartureFromDestination
  // ) => {
  //   const dates = {};
  //   const today = new Date();
  //   const currentYear = today.getFullYear();

  //   let dateOfDepartureFromSource = new Date(
  //     currentYear,
  //     today.getMonth(),
  //     today.getDate()
  //   );

  //   for (
  //     let month = dateOfDepartureFromSource.getMonth();
  //     month < 12;
  //     month++
  //   ) {
  //     dateOfDepartureFromSource.setMonth(month);
  //     dateOfDepartureFromSource.setDate(1);

  //     while (
  //       dateOfDepartureFromSource.getDay() !== dayNumberOfDepartureFromSource
  //     ) {
  //       dateOfDepartureFromSource.setDate(
  //         dateOfDepartureFromSource.getDate() + 1
  //       );
  //     }
  //     while (dateOfDepartureFromSource.getMonth() === month) {
  //       if (dateOfDepartureFromSource >= today) {
  //         let copyOfdateOfDepartureFromSource = new Date(
  //           dateOfDepartureFromSource
  //         );

  //         for (
  //           let i = dayNumberOfDepartureFromSource;
  //           i <= dayNumberOfDepartureFromDestination;
  //           i++
  //         ) {
  //           dates[copyOfdateOfDepartureFromSource.toISOString().split("T")[0]] =
  //             {
  //               selected: true,
  //               selectedColor: "black",
  //               selectedTextColor: "white",
  //             };
  //           copyOfdateOfDepartureFromSource.setDate(
  //             copyOfdateOfDepartureFromSource.getDate() + 1
  //           );
  //         }
  //       }
  //       dateOfDepartureFromSource.setDate(
  //         dateOfDepartureFromSource.getDate() + 7
  //       );
  //     }
  //   }
  //   return dates;
  // };

  // const getAllDatesForCurrentMonth = () => {
  //   const dates = {};
  //   const now = new Date();
  //   const year = now.getFullYear();
  //   for (let month = now.getMonth(); month < 12; month++) {
  //     const daysInMonth = new Date(year, month + 1, 0).getDate();
  //     for (let day = 1; day <= daysInMonth; day++) {
  //       const date = new Date(year, month, day).toISOString().split("T")[0];
  //       if (new Date(date) >= now) {
  //         dates[date] = { disabled: true, disableTouchEvent: true };
  //       }
  //     }
  //   }
  //   return dates;
  // };

  // const markedDates = selectedRoute
  //   ? {
  //       ...getAllDatesForCurrentMonth(),
  //       ...getDatesForEveryMonth(
  //         selectedRoute.dayNumberOfDepartureFromSource + 1,
  //         selectedRoute.dayNumberOfDepartureFromDestination + 1
  //       ),
  //     }
  //   : {};

  return (
    <SafeAreaView>
      <ScrollView>
        {showCalendar && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showCalendar}
            onRequestClose={() => setShowCalendar(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.calendarContainer}>
                <Calendar
                  // markedDates={markedDates}
                  onDayPress={(day) => {
                    handleSelectedDay(day);
                  }}
                  minDate={new Date().toISOString().split("T")[0]}
                />
                <Button
                  title="Закрити"
                  onPress={() => setShowCalendar(false)}
                />
              </View>
            </View>
          </Modal>
        )}

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
      <LoadingModal visible={loading} />
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

export default SelectOptimalRouteForParcels;

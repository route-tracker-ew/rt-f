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
import { globalStyles } from "../../style/globalStyles ";
import { Calendar } from "react-native-calendars";
import { getSpecifiedParcels } from "../../services/parcel/ParcelService";

const SelectRouteForParcels = ({ route, navigation }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const routes = route.params.routes || [];
  if (routes.length === 0) {
    return (
      <SafeAreaView style={globalStyles.centerConatiner}>
        <Text>У вас немає маршрутів.</Text>
      </SafeAreaView>
    );
  }

  const handleParcelRouteInfoPress = (routeInfo) => {
    setSelectedRoute(routeInfo);
    setShowCalendar(true);
  };

  const handleSelectedDay = async (selectedDay) => {
    try {
      if (
        !markedDates[selectedDay.dateString] ||
        markedDates[selectedDay.dateString].disabled
      ) {
        alert("Ви можете вибрати тільки зазначені дати.");
        return;
      }
      setShowCalendar(false);
      const allParcels = await getSpecifiedParcels(
        selectedRoute.id,
        selectedDay.dateString
      );

      navigation.navigate("ParcelList", { parcels: allParcels });
    } catch ({ message }) {
      alert(message);
    } finally {
    }
  };

  const getDatesForEveryMonth = (
    dayNumberOfDepartureFromSource,
    dayNumberOfDepartureFromDistinction
  ) => {
    const dates = {};
    const today = new Date();
    const currentYear = today.getFullYear();

    let dateOfDepartureFromSource = new Date(
      currentYear,
      today.getMonth(),
      today.getDate()
    );

    for (
      let month = dateOfDepartureFromSource.getMonth();
      month < 12;
      month++
    ) {
      dateOfDepartureFromSource.setMonth(month);
      dateOfDepartureFromSource.setDate(1);

      while (
        dateOfDepartureFromSource.getDay() !== dayNumberOfDepartureFromSource
      ) {
        dateOfDepartureFromSource.setDate(
          dateOfDepartureFromSource.getDate() + 1
        );
      }
      while (dateOfDepartureFromSource.getMonth() === month) {
        if (dateOfDepartureFromSource >= today) {
          let copyOfdateOfDepartureFromSource = new Date(
            dateOfDepartureFromSource
          );

          for (
            let i = dayNumberOfDepartureFromSource;
            i <= dayNumberOfDepartureFromDistinction;
            i++
          ) {
            dates[copyOfdateOfDepartureFromSource.toISOString().split("T")[0]] =
              {
                selected: true,
                selectedColor: "black",
                selectedTextColor: "white",
              };
            copyOfdateOfDepartureFromSource.setDate(
              copyOfdateOfDepartureFromSource.getDate() + 1
            );
          }
        }
        dateOfDepartureFromSource.setDate(
          dateOfDepartureFromSource.getDate() + 7
        );
      }
    }
    return dates;
  };

  const getAllDatesForCurrentMonth = () => {
    const dates = {};
    const now = new Date();
    const year = now.getFullYear();
    for (let month = now.getMonth(); month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day).toISOString().split("T")[0];
        if (new Date(date) >= now) {
          dates[date] = { disabled: true, disableTouchEvent: true };
        }
      }
    }
    return dates;
  };

  const markedDates = selectedRoute
    ? {
        ...getAllDatesForCurrentMonth(),
        ...getDatesForEveryMonth(
          selectedRoute.dayNumberOfDepartureFromSource + 1,
          selectedRoute.dayNumberOfDepartureFromDistinction + 1
        ),
      }
    : {};

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
                  markedDates={markedDates}
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
                routeTitle={`${routeInfo.source} - ${routeInfo.distinction}`}
                dateToCountry={routeInfo.dayOfDepartureFromSource}
                dateFromCountry={routeInfo.dayOfDepartureFromDistinction}
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

export default SelectRouteForParcels;

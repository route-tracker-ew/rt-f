import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Modal,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../../style/globalStyles ";
import * as Animatable from "react-native-animatable";
import { updateParcel } from "../../../services/parcel/ParcelService";
import { rejectParcel } from "../../../services/parcel/ParcelService";
import { acceptParcel } from "../../../services/parcel/ParcelService";

import { Calendar } from "react-native-calendars";

const RequestParcelScreen = ({ navigation, route }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const [day, setDay] = useState(null);
  const [routeId, setRouteId] = useState(null);
  const [parcel, setParcel] = useState({ id:0, price: 0, weight: 0, amount: 0 });
  const [sender, setSender] = useState({
    sourceCity: "",
    sourceCountry: "",
    sourceStreet: "",
    sourceHouseNumber: "",
    sourceFlatNumber: "",
    senderPhoneNumber: "",
    senderFirstName: "",
    senderLastName: "",
  });

  const [receiver, setReceiver] = useState({
    destinationCountry: "",
    destinationCity: "",
    destinationStreet: "",
    destinationHouseNumber: "",
    destinationFlat: "",
    deliveryService: "",
    destinationPostNumber: "",
    receiverPhoneNumber: "",
    receiverFirstName: "",
    receiverLastName: "",
  });

  useEffect(() => {
    if (route.params) {
      const {
        id,
        sourceCity,
        sourceCountry,
        sourceStreet,
        sourceHouseNumber,
        sourceFlatNumber,
        senderPhoneNumber,
        senderFirstName,
        senderLastName,
        destinationCountry,
        destinationCity,
        destinationStreet,
        destinationHouseNumber,
        destinationFlat,
        deliveryService,
        destinationPostNumber,
        receiverPhoneNumber,
        receiverFirstName,
        receiverLastName,
        price,
        amount,
        weight,
        day,
        routeId,
      } = route.params;
      setSender({
        ...sender,
        sourceCity: sourceCity,
        sourceCountry: sourceCountry,
        sourceStreet: sourceStreet,
        sourceHouseNumber: sourceHouseNumber,
        sourceFlatNumber: sourceFlatNumber,
        senderPhoneNumber: senderPhoneNumber,
        senderFirstName: senderFirstName,
        senderLastName: senderLastName,
      });

      setReceiver({
        ...receiver,
        destinationCountry: destinationCountry,
        destinationCity: destinationCity,
        destinationStreet: destinationStreet,
        destinationHouseNumber: destinationHouseNumber,
        destinationFlat: destinationFlat,
        deliveryService: deliveryService,
        destinationPostNumber: destinationPostNumber,
        receiverPhoneNumber: receiverPhoneNumber,
        receiverFirstName: receiverFirstName,
        receiverLastName: receiverLastName,
      });

      setParcel({
        ...parcel,
        id:id,
        price: price,
        amount: amount,
        weight: weight,
      });

      setDay(day);
      setRouteId(routeId);
    }
  }, [route.params]);

  const handleAcceptPress = async () => {
    setShowCalendar(true);
    // if (parcel.amount > 0) {
    //  await updateParcel(
    //     parcel.id,
    //     sender.sourceCity,
    //     sender.sourceCountry,
    //     sender.sourceStreet,
    //     sender.sourceHouseNumber,
    //     sender.sourceFlatNumber,
    //     sender.senderPhoneNumber,
    //     sender.senderFirstName,
    //     sender.senderLastName,
    //     receiver.destinationCountry,
    //     receiver.destinationCity,
    //     receiver.destinationStreet,
    //     receiver.destinationHouseNumber,
    //     receiver.destinationFlat,
    //     receiver.deliveryService,
    //     receiver.destinationPostNumber,
    //     receiver.receiverPhoneNumber,
    //     receiver.receiverFirstName,
    //     receiver.receiverLastName,
    //     day,
    //     routeId,
    //     parcel.amount,
    //     parcel.price,
    //     parcel.weight
    //   );
    //   navigation.navigate("Home");
    //   Alert.alert("Вітаємо!", "Посилку було успішно прийнято");
    // } else {
    //   setShakeAnimation(true);
    //   setTimeout(() => {
    //     setShakeAnimation(false);
    //   }, animationDelay);
    // }
  };

  const handleSelectedDay =  async(selectedDay) => {
    try {
     if (parcel.amount > 0) {
     await acceptParcel(
        parcel.id,
        sender.sourceCity,
        sender.sourceCountry,
        sender.sourceStreet,
        sender.sourceHouseNumber,
        sender.sourceFlatNumber,
        sender.senderPhoneNumber,
        sender.senderFirstName,
        sender.senderLastName,
        receiver.destinationCountry,
        receiver.destinationCity,
        receiver.destinationStreet,
        receiver.destinationHouseNumber,
        receiver.destinationFlat,
        receiver.deliveryService,
        receiver.destinationPostNumber,
        receiver.receiverPhoneNumber,
        receiver.receiverFirstName,
        receiver.receiverLastName,
        selectedDay.timestamp,
        routeId,
        parcel.amount,
        parcel.price,
        parcel.weight
      );
      navigation.navigate("Home");
      Alert.alert("Вітаємо!", "Посилку було успішно прийнято");
    } else {
      setShakeAnimation(true);
      setTimeout(() => {
        setShakeAnimation(false);
      }, animationDelay);
    }
      console.log(selectedDay)
      setShowCalendar(false);
    } catch ({ message }) {
      alert(message);
    }
  };

  const handleRejectPress = async () => {
    if (parcel.amount > 0) {
      await rejectParcel(parcel.id);
      navigation.navigate("Home");
      Alert.alert("Вітаємо!", "Посилку було успішно ідхилино");
    } else {
      setShakeAnimation(true);
      setTimeout(() => {
        setShakeAnimation(false);
      }, animationDelay);
    }
  };

  const animationDelay = 1000;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView>
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
        <Animatable.View
          animation={shakeAnimation ? "shake" : null}
          delay={animationDelay}
        >
          <View style={styles.container}>
            <Text style={styles.headerText}>Інформація про посилку</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Кількість</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                placeholder="Обов'язково"
                value={String(parcel.amount)}
                onChangeText={(text) =>
                  setParcel((prevParcel) => ({
                    ...prevParcel,
                    amount: parseFloat(text) || 0,
                  }))
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Вага</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                placeholder="Не Обов'язково"
                value={String(parcel.weight)}
                onChangeText={(text) =>
                  setParcel((prevParcel) => ({
                    ...prevParcel,
                    weight: parseFloat(text) || 0,
                  }))
                }
              />
            </View>

            <View style={styles.inputContainer}>
  <Text style={styles.label}>Ціна</Text>
  <TextInput
    keyboardType="numeric"
    style={styles.input}
    placeholder="Не обов'язково"
    value={parcel.price !== null ? String(parcel.price) : ""} // Показуємо порожній рядок, якщо значення null
    onChangeText={(text) =>
      setParcel((prevParcel) => ({
        ...prevParcel,
        price: text === "" ? null : parseFloat(text) || 0, // Перетворюємо на null, якщо поле порожнє
      }))
    }
  />
</View>
          </View>
        </Animatable.View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
  <TouchableOpacity
    style={[globalStyles.createButton, { marginRight: 10 }]} // Додаємо відступ між кнопками
    onPress={handleAcceptPress} // Обробник для кнопки "Прийняти"
  >
    <Text style={globalStyles.createButtonTxt}>Прийняти</Text>
  </TouchableOpacity>
  
</View>
 <View style={{ flexDirection: "row", justifyContent: "center" }}>
 <TouchableOpacity
    style={[globalStyles.createButton, { backgroundColor: "red" }]} // Можна змінити колір для "Відмовити"
    onPress={handleRejectPress} // Обробник для кнопки "Відмовити"
  >
    <Text style={globalStyles.createButtonTxt}>Відмовити</Text>
  </TouchableOpacity>
  
</View>

      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "white",
    width: "90%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 18,
  },
  createButton: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  btnTxt: {
    color: "red",
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "500",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    marginTop: 4,
  },
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

export default RequestParcelScreen;

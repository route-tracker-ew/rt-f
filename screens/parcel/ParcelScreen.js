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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../style/globalStyles ";
import { createNewParcel } from "../../services/parcel/ParcelService";
import * as Animatable from "react-native-animatable";
const ParcelScreen = ({ navigation, route }) => {
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const [day, setDay] = useState(null);
  const [routeId, setRouteId] = useState(null);
  const [parcel, setParcel] = useState({ price: 0, weight: 0, amount: 0 });
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

      setDay(day);
      setRouteId(routeId);
    }
  }, [route.params]);

  const handleCreateButtonPress = () => {
    if (parcel.amount > 0) {
      createNewParcel(
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
        day,
        routeId,
        parcel.amount,
        parcel.price,
        parcel.weight
      );
      navigation.navigate("Home");
      Alert.alert("Вітаємо!", "Посилку було успішно створено");
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
                value={parcel.amount}
                onChangeText={(text) =>
                  setParcel((prevParcel) => ({
                    ...prevParcel,
                    amount: text,
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
                value={parcel.weight}
                onChangeText={(text) =>
                  setParcel((prevParcel) => ({
                    ...prevParcel,
                    weight: text,
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
                value={parcel.price}
                onChangeText={(text) =>
                  setParcel((prevParcel) => ({
                    ...prevParcel,
                    price: text,
                  }))
                }
              />
            </View>
          </View>
        </Animatable.View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={globalStyles.createButton}
            onPress={handleCreateButtonPress}
          >
            <Text style={globalStyles.createButtonTxt}>Створити</Text>
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
});

export default ParcelScreen;

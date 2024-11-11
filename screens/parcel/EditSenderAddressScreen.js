import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditSenderAddressScreen = ({ route, navigation }) => {
  const [day, setDay] = useState(null);
  const [id, setId] = useState(null);
  const [routeId, setRouteId] = useState(null);
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

  const [parcelInfo, setParcelInfo] = useState({
    price: "",
    amount: "",
    weight: "",
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
        sourceCity,
        sourceCountry,
        senderPhoneNumber,
        senderFirstName,
        senderLastName,
        sourceStreet,
        sourceHouseNumber,
        sourceFlatNumber,
      });

      setReceiver({
        ...receiver,
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
      });

      setParcelInfo({
        ...parcelInfo,
        price: price,
        amount: amount,
        weight: weight,
      });

      setId(id)
      setDay(day);
      setRouteId(routeId);
    }
  }, [route.params]);

  const handleAddSenderAddress = async () => {
    try {
      // Передаем параметры при навигации обратно на экран PickupScreen
      navigation.navigate("EditPickupScreen", {
        id:id,
        sourceCity: sender.sourceCity,
        sourceCountry: sender.sourceCountry,
        sourceStreet: sender.sourceStreet,
        sourceHouseNumber: sender.sourceHouseNumber,
        sourceFlatNumber: sender.sourceFlatNumber,
        senderPhoneNumber: sender.senderPhoneNumber,
        senderFirstName: sender.senderFirstName,
        senderLastName: sender.senderLastName,
        destinationCountry: receiver.destinationCountry,
        destinationCity: receiver.destinationCity,
        destinationStreet: receiver.destinationStreet,
        destinationHouseNumber: receiver.destinationHouseNumber,
        destinationFlat: receiver.destinationFlat,
        deliveryService: receiver.deliveryService,
        destinationPostNumber: receiver.destinationPostNumber,
        receiverPhoneNumber: receiver.receiverPhoneNumber,
        receiverFirstName: receiver.receiverFirstName,
        receiverLastName: receiver.receiverLastName,
        price: parcelInfo.price,
        amount: parcelInfo.amount,
        weight: parcelInfo.weight,
        day: day,
        routeId: routeId,
      });
    } catch (error) {
      console.error("Error occured while saving data:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleAddSenderAddress}
          >
            <Text style={styles.btnTxt}>Готово</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Адреса відправника</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Країна</Text>
            <TextInput
              style={styles.input}
              placeholder="Обов'язково"
              value={sender.sourceCountry}
              onChangeText={(text) =>
                setSender((prevSender) => ({
                  ...prevSender,
                  sourceCountry: text,
                }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Населений пункт</Text>
            <TextInput
              style={styles.input}
              placeholder="Обов'язково"
              value={sender.sourceCity}
              onChangeText={(text) =>
                setSender((prevSender) => ({
                  ...prevSender,
                  sourceCity: text,
                }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Вулиця</Text>
            <TextInput
              style={styles.input}
              placeholder="Не обов'язково"
              value={sender.sourceStreet}
              onChangeText={(text) =>
                setSender((prevSender) => ({
                  ...prevSender,
                  sourceStreet: text,
                }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Будинок</Text>
            <TextInput
              style={styles.input}
              placeholder="Обов'язково"
              value={sender.sourceHouseNumber}
              onChangeText={(text) =>
                setSender((prevSender) => ({
                  ...prevSender,
                  sourceHouseNumber: text,
                }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Квартира</Text>
            <TextInput
              style={styles.input}
              placeholder="Не обов'язково"
              value={sender.sourceFlatNumber}
              onChangeText={(text) =>
                setSender((prevSender) => ({
                  ...prevSender,
                  sourceFlatNumber: text,
                }))
              }
            />
          </View>
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

export default EditSenderAddressScreen;

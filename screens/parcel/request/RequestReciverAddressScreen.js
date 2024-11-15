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
import Dropdown from "../../../components/Dropdown";

const RequestReceiverAddressScreen = ({ navigation, route }) => {
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

  const handleAddReceiverAddress = async () => {
    try {
      navigation.navigate("RequestPickupScreen", {
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
        price:parcelInfo.price,
        amount:parcelInfo.amount,
        weight:parcelInfo.weight,
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
            onPress={handleAddReceiverAddress}
          >
            <Text style={styles.btnTxt}>Готово</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Адреса отримувача</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Країна</Text>
            <TextInput
              style={styles.input}
              placeholder="Обов'язково"
              value={receiver.destinationCountry}
              onChangeText={(text) =>
                setReceiver((prevReceiver) => ({
                  ...prevReceiver,
                  destinationCountry: text,
                }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Населений пункт</Text>
            <TextInput
              style={styles.input}
              placeholder="Обов'язково"
              value={receiver.destinationCity}
              onChangeText={(text) =>
                setReceiver((prevReceiver) => ({
                  ...prevReceiver,
                  destinationCity: text,
                }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Вулиця</Text>
            <TextInput
              style={styles.input}
              placeholder="Не обов'язково"
              value={receiver.destinationStreet}
              onChangeText={(text) =>
                setReceiver((prevReceiver) => ({
                  ...prevReceiver,
                  destinationStreet: text,
                }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Будинок</Text>
            <TextInput
              style={styles.input}
              placeholder="Обов'язково"
              value={receiver.destinationHouseNumber}
              onChangeText={(text) =>
                setReceiver((prevReceiver) => ({
                  ...prevReceiver,
                  destinationHouseNumber: text,
                }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Квартира</Text>
            <TextInput
              style={styles.input}
              placeholder="Не обов'язково"
              value={receiver.destinationFlat}
              onChangeText={(text) =>
                setReceiver((prevReceiver) => ({
                  ...prevReceiver,
                  destinationFlat: text,
                }))
              }
            />
          </View>
          <View>
            <Text style={{ fontWeight: "500" }}>Пошта</Text>
            <Dropdown
              placeholderText={"Не обов'язково"}
              options={[
                { label: "Укр пошта", value: "Укр пошта" },
                { label: "Нова пошта", value: "Нова пошта" },
              ]}
              selectedValue={receiver.deliveryService}
              onValueChange={(text) =>
                setReceiver((prevReceiver) => ({
                  ...prevReceiver,
                  deliveryService: text,
                }))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Номер відділення</Text>
            <TextInput
              style={styles.input}
              placeholder="Не обов'язково"
              value={receiver.destinationPostNumber}
              onChangeText={(text) =>
                setReceiver((prevReceiver) => ({
                  ...prevReceiver,
                  destinationPostNumber: text,
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

export default RequestReceiverAddressScreen;

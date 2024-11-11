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

const EditSenderScreen = ({ route, navigation }) => {
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

      setSender((prevSender) => ({
        ...prevSender,
        sourceCity: sourceCity,
        sourceCountry: sourceCountry,
        sourceStreet: sourceStreet,
        sourceHouseNumber: sourceHouseNumber,
        sourceFlatNumber: sourceFlatNumber,
        senderPhoneNumber: senderPhoneNumber,
        senderFirstName: senderFirstName,
        senderLastName: senderLastName,
      }));

      setReceiver((prevReceiver) => ({
        ...prevReceiver,
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
      }));

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

  const handleAddSender = async () => {
    try {
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
            onPress={handleAddSender}
          >
            <Text style={styles.btnTxt}>Готово</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Відправник</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Номер телефону</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              placeholder="+380"
              value={sender.senderPhoneNumber}
              onChangeText={(text) =>
                setSender((prevSender) => ({
                  ...prevSender,
                  senderPhoneNumber: text,
                }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Прізвище</Text>
            <TextInput
              style={styles.input}
              value={sender.senderLastName}
              onChangeText={(text) =>
                setSender((prevSender) => ({
                  ...prevSender,
                  senderLastName: text,
                }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Ім'я</Text>
            <TextInput
              style={styles.input}
              value={sender.senderFirstName}
              onChangeText={(text) =>
                setSender((prevSender) => ({
                  ...prevSender,
                  senderFirstName: text,
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

export default EditSenderScreen;

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import React from "react";
import DeliveryStepper from "./DeliveryStepper";
import { getParcelById } from "../services/parcel/ParcelService";

const Order = ({id ,phoneNumber, amount, price, from, to, currentStep, navigation }) => {
  const handlePressOrder = async () => {
    // setLoading(true)
    try {
      var parcelInfo = await getParcelById(id)
      var sender = parcelInfo.sender
      var receiver = parcelInfo.receiver
      navigation.navigate("EditPickupScreen", {
        id:id,
        sourceCity: parcelInfo.sourceCity,
        sourceCountry: parcelInfo.sourceCountry,
        sourceStreet: parcelInfo.sourceStreet,
        sourceHouseNumber: parcelInfo.sourceHouseNumber,
        sourceFlatNumber: parcelInfo.sourceFlatNumber,

        senderPhoneNumber: sender.phoneNumber,
        senderFirstName: sender.firstName,
        senderLastName: sender.lastName,

        destinationCountry: parcelInfo.destinationCountry,
        destinationCity: parcelInfo.destinationCity,
        destinationStreet: parcelInfo.destinationStreet,
        destinationHouseNumber: parcelInfo.destinationHouseNumber,
        destinationFlat: parcelInfo.destinationFlat,
        deliveryService: parcelInfo.deliveryService,
        destinationPostNumber: parcelInfo.destinationPostNumber,

        receiverPhoneNumber: receiver.phoneNumber,
        receiverFirstName: receiver.firstName,
        receiverLastName: receiver.lastName,

        price: parcelInfo.price,
        amount: parcelInfo.amount,
        weight:3
  
      });
    } catch ({ message }) {
      alert(message);
    }finally{
      // setLoading(false);
    }
  };

  return (
    <TouchableOpacity onPress={handlePressOrder}>
      <View style={styles.container}>
        <View style={styles.dlvryHead}>
          <View style={{ marginLeft: 5, marginTop: 5 }}>
            <Image
              source={require("../assets/icons/2.png")}
              style={styles.ipic}
            />
          </View>

          <View style={styles.orderTitle}>
            <Text style={styles.phoneNumber}>
              {" "}
              <Text style={{ fontWeight: "bold" }}>Номер отримувача:</Text>{" "}
              {phoneNumber}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Кількість місць:</Text>{" "}
              {amount} | <Text style={{ fontWeight: "bold" }}>Ціна:</Text>{" "}
              {price}€
            </Text>
          </View>
        </View>
        <View style={styles.prgsbar}>
          <DeliveryStepper currentStep={currentStep} />
        </View>
        <View>
          <View style={styles.u}>
            <Text style={styles.t}>{from}</Text>
            <Text style={styles.t}>{to}</Text>
          </View>
        </View>

        <View style={styles.orderTitle}>
          <View style={styles.checkboxContainer}>
            <Checkbox style={styles.checkbox} />
            <Text style={styles.checkboxLabel}>Доставлено</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    height: 190,
    width: 350,
    paddingTop: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
  },
  dlvryHead: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    marginTop: 5,
    paddingHorizontal: 8,
  },
  ipic: {
    width: 25,
    height: 25,
  },
  orderTitle: {
    marginLeft: 20,
  },
  orderID: {
    fontSize: 20,
    fontWeight: "600",
  },
  prgsbar: {
    marginTop: 10,
  },
  u: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  checkboxContainer: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center", // Вирівнювання по вертикалі
  },
  checkboxLabel: {
    marginLeft: 8, // Відступ між чекбоксом і текстом
  },
});

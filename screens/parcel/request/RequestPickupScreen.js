import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { globalStyles } from "../../../style/globalStyles ";
import * as Animatable from "react-native-animatable";

export default RequestPickupScreen = ({ route, navigation }) => {
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const [id, setId] = useState(null);
  const [day, setDay] = useState(null);
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

  const handleAddSenderScreen = () => {
    try {
      navigation.navigate("RequestSenderScreen", {
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
      console.error("Error going to the Add Sender Address screen:", error);
    }
  };

  const handleAddSenderAddressScreen = () => {
    try {
      navigation.navigate("RequestSenderAddressScreen", {
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
      console.error("Error going to the Add Sender Address screen:", error);
    }
  };

  const handleAddReceiverAddressScreen = () => {
    try {
      navigation.navigate("RequestReceiverAddressScreen", {
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
      console.error("Error going to the Add Recipient Address screen:", error);
    }
  };

  const handleAddReceiverScreen = () => {
    try {
      navigation.navigate("RequestReceiverScreen", {
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
      console.error("Error switching to the recipient's screen:", error);
    }
  };

  const isReceiverDataComplete = () => {
    return (
      receiver.destinationCountry &&
      receiver.destinationCity &&
      receiver.receiverPhoneNumber &&
      receiver.receiverFirstName
    );
  };

  const handleContinueButtonPress = () => {
    try {
      if (isReceiverDataComplete()) {
        navigation.navigate("RequestParcelScreen", {
          id: id,
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
          weight:3,
          day: day,
          routeId: routeId,
        });
      } else {
        setShakeAnimation(true);
        setTimeout(() => {
          setShakeAnimation(false);
        }, animationDelay);
      }
    } catch (error) {
      console.error("Error switching to the parcel screen's screen:", error);
    }
  };
  const animationDelay = 1000;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.header}>
            <Text style={styles.headerText}>Відправник:</Text>
          </View>

          <View style={styles.senderContainer}>
            <TouchableOpacity
              style={[
                styles.senderButton,
                {
                  borderBottomColor: "#E1DEDE",
                  borderBottomWidth: 0.2,
                },
              ]}
              onPress={handleAddSenderAddressScreen}
            >
              <Text style={styles.boldText}>Адреса:</Text>
              <Icon
                name="chevron-right"
                size={20}
                color="black"
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={styles.infoContainer}>
              {sender.sourceCountry && (
                <Text style={[styles.infoText]}>
                  <Text style={{ fontWeight: "bold" }}>Країна: </Text>{" "}
                  {sender.sourceCountry}
                </Text>
              )}
              {sender.sourceCity && (
                <Text style={[styles.infoText]}>
                  <Text style={{ fontWeight: "bold" }}>Місто/село: </Text>{" "}
                  {sender.sourceCity}
                </Text>
              )}

              {sender.sourceStreet && (
                <Text style={[styles.infoText]}>
                  <Text style={{ fontWeight: "bold" }}>Вулиця: </Text>{" "}
                  {sender.sourceStreet}
                </Text>
              )}
              {sender.sourceHouseNumber && (
                <Text style={styles.infoText}>
                  <Text style={{ fontWeight: "bold" }}>Номер будинку: </Text>{" "}
                  {sender.sourceHouseNumber}
                </Text>
              )}
              {sender.sourceFlatNumber && (
                <Text style={styles.infoText}>
                  <Text style={{ fontWeight: "bold" }}>Номер Квартири: </Text>{" "}
                  {sender.sourceFlatNumber}
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={[
                styles.senderButton,
                {
                  borderTopColor: "#E1DEDE",
                  borderTopWidth: 0.2,
                },
              ]}
              onPress={handleAddSenderScreen}
            >
              <Text style={styles.boldText}>Відправник: </Text>
              <Icon
                name="chevron-right"
                size={20}
                color="black"
                style={styles.icon}
              />
            </TouchableOpacity>

            <View style={styles.infoContainer}>
              {sender.senderLastName && sender.senderFirstName && (
                <Text>
                  {sender.senderLastName} {sender.senderFirstName}
                </Text>
              )}
              {sender.senderPhoneNumber && (
                <Text style={styles.infoText}>{sender.senderPhoneNumber}</Text>
              )}
            </View>
          </View>
          <View style={[styles.header, { marginTop: 15 }]}>
            <Text style={styles.headerText}>Отримувач:</Text>
          </View>

          <Animatable.View
            animation={shakeAnimation ? "shake" : null}
            delay={animationDelay}
          >
            <View style={styles.senderContainer}>
              <TouchableOpacity
                style={[
                  styles.senderButton,
                  {
                    borderBottomColor: "#E1DEDE",
                    borderBottomWidth: 0.2,
                  },
                ]}
                onPress={handleAddReceiverAddressScreen}
              >
                <Text style={styles.boldText}>Адреса: </Text>
                <Icon
                  name="chevron-right"
                  size={20}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <View style={styles.infoContainer}>
                {receiver.destinationCountry && (
                  <Text style={[styles.infoText]}>
                    <Text style={{ fontWeight: "bold" }}>Країна: </Text>{" "}
                    {receiver.destinationCountry}
                  </Text>
                )}

                {receiver.destinationCity && (
                  <Text style={styles.infoText}>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                      Місто/село:
                    </Text>{" "}
                    {receiver.destinationCity}
                  </Text>
                )}

                {receiver.destinationStreet && (
                  <Text style={[styles.infoText]}>
                    <Text style={{ fontWeight: "bold" }}>Вулиця: </Text>{" "}
                    {receiver.destinationStreet}
                  </Text>
                )}
                {receiver.destinationHouseNumber && (
                  <Text style={styles.infoText}>
                    <Text style={{ fontWeight: "bold" }}>Номер будинку: </Text>{" "}
                    {receiver.destinationHouseNumber}
                  </Text>
                )}
                {receiver.destinationFlat && (
                  <Text style={styles.infoText}>
                    <Text style={{ fontWeight: "bold" }}>Номер Квартири: </Text>{" "}
                    {receiver.destinationFlat}
                  </Text>
                )}
                {receiver.deliveryService && (
                  <Text style={styles.infoText}>
                    <Text style={{ fontWeight: "bold" }}>Пошта: </Text>{" "}
                    {receiver.deliveryService}
                  </Text>
                )}
                {receiver.destinationPostNumber && (
                  <Text style={styles.infoText}>
                    <Text style={{ fontWeight: "bold" }}>
                      Номер відділення:{" "}
                    </Text>{" "}
                    {receiver.destinationPostNumber}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={[
                  styles.senderButton,
                  {
                    borderTopColor: "#E1DEDE",
                    borderTopWidth: 0.2,
                  },
                ]}
                onPress={handleAddReceiverScreen}
              >
                <Text style={styles.boldText}>Отримувач:</Text>
                <Icon
                  name="chevron-right"
                  size={20}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <View style={styles.infoContainer}>
                {receiver.receiverLastName && receiver.receiverFirstName && (
                  <Text>
                    {receiver.receiverLastName} {receiver.receiverFirstName}
                  </Text>
                )}
                {receiver.receiverPhoneNumber && (
                  <Text style={styles.infoText}>
                    {receiver.receiverPhoneNumber}
                  </Text>
                )}
              </View>
            </View>
          </Animatable.View>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={globalStyles.createButton}
            onPress={handleContinueButtonPress}
          >
            <Text style={globalStyles.createButtonTxt}>Продовжити</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    padding: 10,
    justifyContent: "space-between",
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  senderContainer: {
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "white",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
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
  button: {
    width: 350,
    height: 40,
    backgroundColor: "black",
    marginTop: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  input: {
    width: 350,
    height: 40,
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    marginTop: 4,
  },
  header: {
    paddingBottom: 5,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  senderButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

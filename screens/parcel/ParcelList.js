import React from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import Order from "../../components/Order";
import { globalStyles } from "../../style/globalStyles ";

const getParcelStatusOrder = (status) => {
  switch (status) {
    case "CHECKING":
      return 1;
    case "PICK_UP":
      return 2;
    case "ON_THE_WAY":
      return 3;
    case "DELIVERED":
      return 4;
    case "CANCELED":
      return 5;
    case "REFUSED":
      return 6;
    default:
      return null;
  }
};

const ParcelList = ({ route, navigation }) => {
  const parcels  = route.params.parcels || [];

  if (parcels.length === 0) {
    return (
      <SafeAreaView style={globalStyles.centerConatiner}>
        <Text>Немає посилок .</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {parcels.map((parcel) => (
        <Order
          id={parcel.id}
          phoneNumber={parcel.receiver.phoneNumber}
          amount={parcel.amount}
          price={parcel.price}
          from={parcel.sourceCity}
          to={parcel.destinationCity}
          currentStep={getParcelStatusOrder(parcel.parcelStatus)}
          navigation={navigation}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignSelf: "center",
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

export default ParcelList;

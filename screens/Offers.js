import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

// Offers component
const Offers = () => {
  return (
    <View style={styles.container}>
      <Text>Offers</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Offers;

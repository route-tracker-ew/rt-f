import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import SpinnerOverlay from "react-native-loading-spinner-overlay";

const LoadingModal = ({ visible }) => {
  return (
    <SpinnerOverlay visible={visible} animation="fade">
      <View style={styles.container}>
        {/* Спінер */}
        <ActivityIndicator size="large" color="#FFFFFF" />

        {/* Текст */}
        <Text style={styles.text}>Завантаження...</Text>
      </View>
    </SpinnerOverlay>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark background color
  },
  text: {
    marginTop: 10,
    color: "#FFFFFF", // White text color
  },
});

export default LoadingModal;

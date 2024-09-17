import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
const LogoScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      // Navigate to the authentication screen after a delay
      navigation.navigate("Authentication");
    }, 3500); // Adjust the delay as needed
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logoImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 500,
    height: 400,
  },
});

export default LogoScreen;

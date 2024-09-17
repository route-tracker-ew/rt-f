// AuthScreen.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles } from "../style/globalStyles ";

const AuthScreen = ({ navigation }) => {
  const navigateToSignin = () => {
    navigation.navigate("Signin");
  };
  const navigateToSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingcontainer}>
        <Text style={styles.heading}>Давайте почнемо</Text>
      </View>
      <Image source={require("../assets/bg.png")} style={styles.bgImg} />

      <TouchableOpacity
        style={globalStyles.createButton}
        onPress={navigateToSignup}
      >
        <Text style={globalStyles.createButtonTxt}>Зареєструватися</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.createButton}
        onPress={navigateToSignin}
      >
        <Text style={globalStyles.createButtonTxt}>Увійти до системи</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headingcontainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
  },
  heading: {
    fontSize: 50,
    marginLeft: 35,
  },
  bgImg: {
    width: 400,
    height: 400,
  },
});

export default AuthScreen;

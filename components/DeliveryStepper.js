import React from "react";
import { View, Text, StyleSheet } from "react-native";

const steps = ["Перевірка", "Забираю", "В дорозі", "Доставлено"];

const DeliveryStepper = ({ currentStep }) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={step} style={styles.stepItem}>
          <View
            style={[
              styles.stepBullet,
              index < currentStep ? styles.completedStep : {},
            ]}
          />
          {index < steps.length - 1 && (
            <View
              style={[
                styles.line,
                index < currentStep ? styles.completedLine : {},
              ]}
            />
          )}
          <Text
            style={[
              styles.stepText,
              index <= currentStep ? styles.completedText : {},
            ]}
          >
            {step}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  stepItem: {
    alignItems: "center",
    padding: 10,
  },
  stepBullet: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "lightgray",
    marginBottom: 5,
    position: "relative",
  },
  completedStep: {
    backgroundColor: "black", // Change to your desired color
    position: "relative",
  },
  line: {
    width: 80, // Adjust the width as needed
    height: 2,
    backgroundColor: "lightgray",
    position: "absolute",
    top: 20,
    left: 40,
  },
  completedLine: {
    backgroundColor: "black", // Change to your desired color
    position: "absolute",
  },
  stepText: {
    fontSize: 12,
    color: "gray",
  },
  completedText: {
    color: "black", // Change to your desired color
  },
});

export default DeliveryStepper;

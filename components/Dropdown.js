import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Dropdown = ({
  placeholderText,
  options,
  selectedValue,
  onValueChange,
}) => {
  const placeholder = {
    label: placeholderText || "Select an option...",
    value: null,
  };

  const dropdownOptions = options
    ? options.map((option, index) => {
        return {
          label: option.label,
          value: option.value,
          key: index,
        };
      })
    : [
        { label: "Понеділок", value: "Понеділок", key: 1 },
        { label: "Вівторок", value: "Вівторок", key: 2 },
        { label: "Середа", value: "Середа", key: 3 },
        { label: "Четверг", value: "Четверг", key: 4 },
        { label: "П'ятниця", value: "ятниця", key: 5 },
        { label: "Субота", value: "Субота", key: 6 },
        { label: "Неділя", value: "Неділя", key: 7 },
      ];

  return (
    <View style={styles.container}>
      <RNPickerSelect
        placeholder={placeholder}
        items={dropdownOptions}
        onValueChange={onValueChange}
        value={selectedValue}
        style={{
          inputIOS: styles.input,
          inputAndroid: styles.input,
        }}
        Icon={() => {
          return (
            <View style={styles.iconContainer}>
              <Ionicons name="chevron-down" size={24} color="gray" />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
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
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 10,
  },
});

export default Dropdown;

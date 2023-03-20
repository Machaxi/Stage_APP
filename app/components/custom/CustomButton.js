import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ name, available, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        backgroundColor: available ? "#44B0F2" : "#47474A",
        opacity: available ? 1 : 0.5,
        padding: 10,
        marginEnd: 10,
        borderRadius: 28,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
      }}
      disabled={!available}
      onPress={onPress}
    >
      <Text style={styles.insideText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  insideText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#F1E8FF",
    fontFamily: "Nunito-Regular",
  },
});

export default CustomButton;

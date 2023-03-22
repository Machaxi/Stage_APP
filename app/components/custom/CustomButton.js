import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const CustomButton = ({ name, available, onPress, height }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        width: "100%",
        height: height || 55,
        opacity: available ? 1 : 0.5,
        alignItems: "center",
        justifyContent: "center",
      }}
      disabled={!available}
      onPress={onPress}
    >
      <LinearGradient
        colors={available ? ["#44B0F2", "#4058DA"] : ["#47474A", "#47474A"]}
        // locations={[0, 1]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          width: "100%",
          opacity: available ? 1 : 0.5,
          marginEnd: 10,
          borderRadius: 28,
          height: height || 55,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.insideText}>{name}</Text>
      </LinearGradient>
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

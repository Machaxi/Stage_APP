import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const CustomButton = ({ name, available, onPress, height, image }) => {
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
          borderRadius: 28,
          height: height || 55,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Text style={styles.insideText}>{name}</Text>
        <Image source={image} style={{ width: 14, height: 13 }} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  insideText: {
    fontSize: 16,
    color: "#F1E8FF",
    fontFamily: "Nunito-800",
  },
});

export default CustomButton;

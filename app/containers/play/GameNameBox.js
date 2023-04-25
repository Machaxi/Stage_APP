import React, {  useState } from "react";
import {
  StyleSheet,
    Text,
    TouchableOpacity
  } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { white } from "../util/colors";

  
export const GameNameBox = ({isSelected, item,paddingHorizontal, paddingVertical, height,borderRadius,fontSize,marginTop,onPress}) => {

  return (
    <LinearGradient
      colors={
        isSelected
          ? ["rgba(255, 180, 1, 0.06))", "rgba(255, 212, 89, 0.03)"]
          : ["rgba(255, 255, 255, 0.3)", "rgba(118, 87, 136, 0)"]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.rounded_button,
        {
          borderColor: isSelected
            ? "rgba(138, 112, 84, 1)"
            : "rgba(70, 56, 85, 1)",
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={[
          {
            marginTop: marginTop ? marginTop : 6,
            paddingHorizontal: paddingHorizontal ? paddingHorizontal : 20,
            paddingVertical: paddingVertical ? paddingVertical : 6,
            height: height ? height : null,
            borderRadius: borderRadius ? borderRadius : 20,
          },
        ]}
        onPress={() => onPress()}
      >
        <Text
          style={{
            color: isSelected ? "#F2AE4D" : white,
            fontSize: fontSize ? fontSize : 14,
            textAlign: "center",
            fontFamily: "Nunito-Regular",
            fontWeight: "400",
          }}
        >
          {item?.name}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );}

  const styles = StyleSheet.create( {
    rounded_button: {
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 0.5,
        height: 42,
        borderRadius: 20,
    },
  })
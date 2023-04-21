import React from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export const GradientLine = ({
  height,
  marginTop,
  marginBottom,
  marginLeft,
  colors
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        marginLeft: marginLeft ?? 0,
        marginTop: marginTop ?? 0,
        marginnBottom: marginBottom ?? 0,
      }}
    >
      <View style={{ width: "100%", height: height ?? 1.5 }} />
    </LinearGradient>
  );
};

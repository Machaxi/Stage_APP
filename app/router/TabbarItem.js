import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { white } from "../containers/util/colors";
import LinearGradient from "react-native-linear-gradient";

export default (TabbarItem = ({
  focused,
  label,
  indicatorHeight,
  activeLabelColor,
  activeIndicatorColor,
  inactiveLabelColor,
  inactiveIndicatorColor,
  activeIcon,
  gradientColors,
  focusedIcon,
  bottomBarColor,
}) => {
  const config = {
    activeIndicatorColor: "#667DDB",
    inactiveIndicatorColor: "transparent",
    activeLabelColor: white,
    inactiveLabelColor: white,
    // activeLabelColor: "#696969",
    // inactiveLabelColor: "#696969", //inactiveLabelColor || '#CCCCCC',
    activeIcon: "../images/Home.png",
    focusedIcon: "../images/Home.png",
  };

  const indicatorColor = focused
    ? activeIndicatorColor ?? config.activeIndicatorColor
    : inactiveIndicatorColor ?? config.inactiveIndicatorColor;
  const labelColor = focused
    ? config.activeLabelColor
    : config.inactiveLabelColor;
  //const activeIcon1 = require(config.activeIcon)

  const deviceWidth = Dimensions.get("window").width;

  const styles = StyleSheet.create({
    labelContainer: {
      flex: 0,
      width: deviceWidth * 0.25,
      height: 60,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(25, 15, 47, 1)",
    },
    labelText: {
      flex: 0,
      width: "100%",
      textAlign: "center",
      marginBottom: 0,
      justifyContent: "center",
      fontFamily: "Quicksand-Medium",
      fontSize: 10,
      color: labelColor,
    },
    labelIndicator: {
      flex: 0,
      width: 55,
      marginBottom: 1,
      height: 4,
      justifyContent: "flex-end",
      backgroundColor: bottomBarColor ?? indicatorColor,
    },
  });
  const maybeRenderLabel = label && (
    <Text style={styles.labelText}>{label}</Text>
  );

  return (
    <View>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={[{ height: 0.8, width: "100%" }]}
      />
      <View style={styles.labelContainer}>
        <Image
          resizeMode="contain"
          style={{
            width: 22,
            height: 22,
            resizeMode: "contain",
            marginBottom: 0,
          }}
          source={focusedIcon ?? activeIcon}
          size={22}
        />
        {maybeRenderLabel}

        <View style={styles.labelIndicator} />
      </View>
    </View>
  );
});

import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { borderGrey, borderWhite, greenVariant, greyVariant2, lightGreenBg, yellowVariant } from "../containers/util/colors";
import { deviceWidth } from "../containers/util/dimens";
import LinearGradient from "react-native-linear-gradient";

const MyRequestTabItem = ({ onTabPress, name, colors, isSelected, isLeft}) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0.75 }}
      end={{ x: 1, y: 0.25 }}
      colors={colors}
      style={[
        isLeft
          ? { borderBottomLeftRadius: 9 }
          : { borderBottomRightRadius: 9 },
        styles.tabView
      ]}
    >
      <TouchableOpacity
        onPress={() => onTabPress("")}
        style={styles.touchable}
      >
        <View
          style={{
            width: 50,
            height: 7,
          }}
        />
        <Text
          style={styles.tabText}
        >
          {name}
        </Text>
        <View
          style={[styles.colouredView, {
            backgroundColor: isSelected ? yellowVariant : "transparent",
          }]}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  touchable: {
    height: 47,
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  tabView: {
    height: 47,
    width: "50%",
    borderColor: borderWhite,
    borderWidth: 0.7,
    alignItems: "center",
    justifyContent: "center",
  },
  colouredView: {
    width: 50,
    height: 7,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: greyVariant2,
    textAlign: "center",
  },
});

export default MyRequestTabItem;

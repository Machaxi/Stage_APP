import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { whiteGreyBorder } from "../../containers/util/colors";
import LinearGradient from "react-native-linear-gradient";

const SelectSession = (props) => {
  handlepress = () => {
    props.onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      key={props.index}
      style={[styles.subview]}
      onPress={handlepress}
    >
      <LinearGradient
        colors={
          props.index === props.currentLevel
            ? [
                "rgba(255, 180, 1, 0.25))",
                "rgba(255, 212, 89, 0.2)",
                "rgba(255, 212, 89, 0.06)",
              ]
            : ["rgba(255, 255, 255, 0.15)", "rgba(118, 87, 136, 0)"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.levelView,
          props.index === props.currentLevel && {
            borderColor: "rgba(255, 180, 1, 0.4))",
          },
        ]}
      >
        <View style={styles.imaged}>
          <Text
            style={[
              styles.mainText,
              props.index === props.currentLevel && { color: "#F2AE4D" },
            ]}
          >
            {props.days} Days
          </Text>
          <Text
            style={[
              styles.sportText,
              props.index === props.currentLevel && { color: "#F2AE4D" },
            ]}
          >
            Per week
          </Text>
          <Text style={[styles.sportText, { marginTop: 8 }]}>
            {props.dayList}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  subview: {
    width: 98,
    height: 100,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  levelView: {
    width: 98,
    height: 92,
    borderColor: whiteGreyBorder,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imaged: {
    marginTop: 5,
    width: 100,
    height: 93,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    fontSize: 20,
    marginTop: 8,
    fontFamily: "Nunito-400",
    color: "#CACACA",
  },
  sportText: {
    fontSize: 12,
    fontFamily: "Nunito-400",
    color: "#CACACA",
  },
  imageitem: {
    width: 52,
    height: 71,
    zIndex: 2,
  },
});
export default SelectSession;

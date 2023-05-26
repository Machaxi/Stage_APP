import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { whiteGreyBorder } from "../../containers/util/colors";
import LinearGradient from "react-native-linear-gradient";
import { Nunito_Medium } from "../../containers/util/fonts";

const SelectLevel = (props) => {
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
          {props.url ? (
            <Image
              source={{ uri: props.image }}
              style={[styles.imageitem]}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={props.image}
              style={[styles.imageitem]}
              resizeMode="contain"
            />
          )}
        </View>
      </LinearGradient>
      <Text
        style={[
          styles.sportText,
          props.index === props.currentLevel && {
            color: "#F2AE4D",
          },
        ]}
      >
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  subview: {
    width: 98,
    height: 120,
    marginVertical: 15,
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
  sportText: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: Nunito_Medium,
    color: "#BBBBBB",
    textAlign: "center",
  },
  imageitem: {
    width: 52,
    height: 71,
    zIndex: 2,
  },
});
export default SelectLevel;

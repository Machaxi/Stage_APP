import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Nunito_Medium } from "../../containers/util/fonts";

const CustomRadioButton = (props) => {
  handlepress = () => {
    props.onPress();
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlepress}>
      <View style={{ flexDirection: "row", width: props.width }}>
        <View
          style={[
            styles.outerView,
            props.index === props.currentLevel && { borderColor: "#FF9C33" },
          ]}
        >
          {props.index === props.currentLevel ? (
            <View style={styles.innerView} />
          ) : null}
        </View>
        <Text
          style={[
            styles.text,
            props.index === props.currentLevel && { color: "#FF9C33" },
          ]}
        >
          {props.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerView: {
    height: 12,
    width: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#7E7E7E",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  innerView: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: "#FF9C33",
  },
  text: {
    fontSize: 14,
    marginLeft: 8,
    fontFamily: Nunito_Medium,
    color: "#7E7E7E",
  },
});

export default CustomRadioButton;

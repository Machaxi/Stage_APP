import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";

const GetBack = (props) => {
  handlePress = () => {
    props.onPress();
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <View style={styles.row}>
        <Image
          source={require("../../images/playing/back.png")}
          style={{ width: 15, height: 13 }}
        />
        <Text style={styles.headerText}> {props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontFamily: "Nunito-600",
    fontWeight: "600",
    color: "#FFCB6A",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default GetBack;

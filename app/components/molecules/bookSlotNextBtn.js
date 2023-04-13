import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  greyColorVariant,
} from "../../containers/util/colors";

const BookSlotNextBtn = ({ onNextPress }) => {
  return (
    <TouchableOpacity
      onPress={()=> onNextPress()}
      style={styles.btnContainer}
    >
      <Text style={[styles.nextBtn, { color: greyColorVariant }]}>
        {"Next "}
      </Text>
      <Image
        style={{ height: 24, width: 24 }}
        source={require("../../images/grey_right_arrow.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nextBtn: {
    fontSize: 16,
    color: greyColorVariant,
    fontFamily: "Nunito-800",
  },
  btnContainer: {
    flexDirection: "row",
    backgroundColor: "#47471899",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 15,
    marginVertical: 10,
  },
});

export default BookSlotNextBtn;

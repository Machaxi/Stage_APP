import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  greyColorVariant,
} from "../../containers/util/colors";
import { Nunito_ExtraBold } from "../../containers/util/fonts";

const BookSlotNextBtn = ({ onNextPress, label, isActive }) => {
  return (
    <TouchableOpacity
      onPress={()=> onNextPress()}
      style={styles.btnContainer}
    >
      <Text style={[styles.nextBtn, { color: greyColorVariant }]}>
        {label ?? "Next "}
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
    fontFamily: Nunito_ExtraBold,
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

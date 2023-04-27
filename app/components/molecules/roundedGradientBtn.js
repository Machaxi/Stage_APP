import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  lightBlueColor,
} from "../../containers/util/colors";
import LinearGradient from "react-native-linear-gradient";
import { Nunito_ExtraBold } from "../../containers/util/fonts";

const RoundedGradientBtn = ({ colors, text, onBtnPress, width }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0.75 }}
      end={{ x: 1, y: 0.25 }}
      colors={colors ?? ["#48acf1", "#3e53d9"]}
      style={[{
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        alignSelf:'center'
      }, 
      width ? {width: width} : null
        
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          onBtnPress();
        }}
        style={{ paddingHorizontal: 14, paddingVertical: 12 }}
      >
        <Text style={[styles.btnTxt]}>{text}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: {
    color: lightBlueColor,
    fontSize: 16,
    fontFamily: Nunito_ExtraBold,
    textAlign: "center",
  },
});

export default RoundedGradientBtn;

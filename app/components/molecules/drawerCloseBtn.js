import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import { greyVariant12 } from "../../containers/util/colors";
import { Nunito_Regular } from "../../containers/util/fonts";

export const DrawerCloseBtn = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={{ position: "absolute", right: 18, top: 20, zIndex: 2000 }}
      onPress={() => {
        onPress()
      }}
    >
      <Image
        resizeMode="contain"
        style={{
          width: 30,
          height: 30,
        }}
        source={require("../../images/cancel.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  
});

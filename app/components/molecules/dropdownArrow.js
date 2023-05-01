import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";


const DropdownArrow = ({
 
}) => {
  return (
    <Image
      style={[
        {
          height: 13,
          width: 6,
          resizeMode: "contain",
          //marginTop: 19,
          marginRight: 5,
          // marginLeft: deviceWidth * 0.1,
        },
        {
          transform: [{ rotate: "90deg" }],
        },
      ]}
      source={require("../../images/ic_drawer_arrow.png")}
    />
  );
};

const styles = StyleSheet.create({
 
});

export default DropdownArrow;

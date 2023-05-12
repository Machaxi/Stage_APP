import React from "react";
import { Image, TouchableOpacity } from "react-native";

const RequestHeaderBack = ({ navigationProps }) => {
  return (
    <TouchableOpacity
      style={{ marginRight: 8, padding: 7 }}
      onPress={() => {
        navigationProps.goBack();
      }}
      activeOpacity={0.8}
    >
      <Image
        resizeMode="contain"
        source={require("../images/go_back_arrow.png")}
        style={{ width: 20, height: 16, marginLeft: 12, tintColor: "white" }}
      />
    </TouchableOpacity>
  );
};

export default RequestHeaderBack;

import React from "react";
import { View, StyleSheet } from "react-native";

const RequestHeaderBg = ({ name }) => {
  return (
    // <ImageBackground
    //   style={{
    //     width: "100%",
    //     height: "100%",
    //   }}
    //   source={require("../images/toolbar_bg.png")}
    // />
    <View style={styles.container} />
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#141a2e",
  },
});

export default RequestHeaderBg;

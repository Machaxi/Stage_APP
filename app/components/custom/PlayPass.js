import React, { Component } from "react";
import { Text, StyleSheet, ImageBackground, Image } from "react-native";

class PlayPass extends Component {
  render() {
    let imageval;
    if (this.props.image == "2") {
      imageval = require("../../images/playing/leaf.png");
    } else if (this.props.image == "3") {
      imageval = require("../../images/playing/wind.png");
    } else {
      imageval = require("../../images/playing/star.png");
    }

    return (
      <ImageBackground
        source={require("../../images/playing/buypass.png")}
        style={{ width: 110, height: 240, marginHorizontal: 7, paddingTop: 10 }}
      >
        <Image source={imageval} style={styles.image} />
        <Text style={styles.insideText}>{this.props.name}</Text>
        <Text style={styles.priceText}>₹ {this.props.price}</Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  insideText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#F3F2F5",
    fontFamily: "Nunito-Regular",
    paddingHorizontal: 10,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F2AE4D",
    fontFamily: "Nunito-Regular",
    paddingHorizontal: 10,
  },
  image: {
    marginTop: 10,
    marginBottom: 10,
    width: 50,
    height: 50,
  },
});

export default PlayPass;

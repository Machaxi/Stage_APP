import React, { Component } from "react";
import { Text, StyleSheet, ImageBackground, Image, View } from "react-native";
import { Nunito_Bold, Nunito_SemiBold } from "../../containers/util/fonts";

class PlayPass extends Component {
  render() {
    return (
      <ImageBackground
        source={require("../../images/playing/playmembership.png")}
        style={{
          width: 210,
          height: 200,
          marginHorizontal: -20,
          marginTop: -10,
        }}
      >
        <Image source={{ uri: this.props.image }} style={styles.image} />
        <Text style={styles.insideText}>{this.props.name}</Text>
        <Text style={styles.priceText}>₹ {this.props.price}</Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  insideText: {
    fontSize: 12,
    color: "#F3F2F5",
    fontFamily: Nunito_SemiBold,
    marginLeft: 35,
  },
  priceText: {
    fontSize: 20,
    color: "#F2AE4D",
    fontFamily: Nunito_Bold,
    marginLeft: 35,
  },
  image: {
    marginLeft: 35,
    marginTop: 30,
    marginBottom: 10,
    width: 35,
    height: 30,
  },
});

export default PlayPass;

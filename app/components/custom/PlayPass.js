import React, { Component } from "react";
import { Text, StyleSheet, ImageBackground, Image } from "react-native";

class PlayPass extends Component {
  render() {
    return (
      <ImageBackground
        source={require("../../images/playing/playmembership.png")}
        style={{ width: 180, height: 160, marginRight: 5, paddingTop: 10, marginBottom: 10 }}
      >
        <Image
          source={{ uri: this.props.image}}
          style={styles.image}
        />
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
    fontFamily: "Nunito-600",
    marginLeft: 30,
  },
  priceText: {
    fontSize: 20,
    color: "#F2AE4D",
    fontFamily: "Nunito-700",
    marginLeft: 30,
  },
  image: {
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
    width: 38,
    height: 30,
  },
});

export default PlayPass;

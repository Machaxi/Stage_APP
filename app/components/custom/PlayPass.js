import React, { Component } from "react";
import { Text, StyleSheet, ImageBackground, Image, View } from "react-native";

class PlayPass extends Component {
  render() {
    return (
      <ImageBackground
        source={require("../../images/playing/playmembership.png")}
        style={{
          width: 195,
          height: 160,
          paddingTop: 10,
          marginBottom: 10,
          marginRight: -15,
        }}
      >
        <View style={styles.imagebackground}>
          <Image source={{ uri: this.props.image }} style={styles.image} />
        </View>
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
    marginLeft: 15,
    width: 35,
    height: 30,
  },
  imagebackground: {
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#A8957875",
  },
});

export default PlayPass;

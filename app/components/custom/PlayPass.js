import React, { Component } from "react";
import { Text, StyleSheet, ImageBackground, Image, View } from "react-native";
import { Nunito_Bold, Nunito_SemiBold } from "../../containers/util/fonts";

class PlayPass extends Component {
  render() {
    return (
      <ImageBackground
        source={require("../../images/playing/playmembership.png")}
        resizeMode="center"
        style={{
          width: 210,
          height: 200,
          marginHorizontal: -15,
          marginTop: -10,
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
    marginLeft: 13,
    width: 35,
    height: 30,
  },
  imagebackground: {
    marginLeft: 35,
    marginTop: 30,
    marginBottom: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#A8957875",
  },
});

export default PlayPass;

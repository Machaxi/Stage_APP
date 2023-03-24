import React, { Component } from "react";
import { Text, StyleSheet, ImageBackground, Image } from "react-native";

class PlayPass extends Component {
  render() {
    let imageval;
    if (this.props.image == "1") {
      imageval = require("../../images/playing/star.png");
    } else if (this.props.image == "2") {
      imageval = require("../../images/playing/leaf.png");
    } else if (this.props.image == "3") {
      imageval = require("../../images/playing/wind.png");
    } else {
      imageval = require("../../images/playing/annually.png");
    }

    return (
      <ImageBackground
        source={require("../../images/playing/playmembership.png")}
        style={{ width: 180, height: 160, marginRight: 7, paddingTop: 10 }}
      >
        <Image
          source={imageval}
          style={[
            styles.image,
            this.props.image == "1" && { width: 31 },
            this.props.image == "3" && { width: 45 },
          ]}
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

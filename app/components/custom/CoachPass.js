import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

class CoachPass extends Component {
  render() {
    const { title, subtitle, description, image } = this.props;
    let imageval;
    if (image == "2") {
      imageval = require("../../images/playing/hand.png");
    } else if (image == "3") {
      imageval = require("../../images/playing/arrow.png");
    } else {
      imageval = require("../../images/playing/rocket.png");
    }

    return (
      <LinearGradient
        colors={[
          "rgba(255, 255, 255, 0.15)",
          "rgba(118, 87, 136, 0)",
          "rgba(118, 87, 136, 0)",
          "rgba(118, 87, 136, 0.10)",
        ]}
        locations={[0, 0.3, 0.6, 1]}
        style={styles.container}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            ₹ {subtitle}
            <Text style={[styles.subtitle, { fontSize: 12 }]}>
              (Starting Price)
            </Text>
          </Text>
          <Text style={styles.description}>{description}</Text>
          <Image
            source={require("../../images/playing/next.png")}
            style={styles.next}
          />
        </View>
        <Image
          source={imageval}
          style={[
            styles.image,
            image !== "1" && { width: 85, height: 75, marginRight: 10 },
          ]}
        />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "Nunito-Regular",
  },
  next: {
    width: 70,
    height: 70,
    marginVertical: -12,
    marginHorizontal: -24,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#F2AE4D",
    fontFamily: "Nunito-Regular",
  },
  description: {
    fontSize: 10,
    width: 190,
    fontWeight: "600",
    color: "#DDDDDD",
    fontFamily: "Nunito-Regular",
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default CoachPass;

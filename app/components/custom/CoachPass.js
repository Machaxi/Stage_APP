import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Nunito_Bold, Nunito_SemiBold } from "../../containers/util/fonts";

class CoachPass extends Component {
  render() {
    const { title, subtitle, description, image, sidevalue } = this.props;
    return (
      <LinearGradient
        // colors={[
        //   "rgba(255, 255, 255, 0.15)",
        //   "rgba(118, 87, 136, 0)",
        //   "rgba(118, 87, 136, 0)",
        //   "rgba(118, 87, 136, 0.10)",
        // ]}
        // locations={[0, 0.3, 0.6, 1]}
        colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.06)"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.container}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            {subtitle}
            <Text style={[styles.subtitle, { fontSize: 12 }]}>
              ({sidevalue})
            </Text>
          </Text>
          <Text style={styles.description}>{description}</Text>
          <Image
            source={require("../../images/playing/next.png")}
            style={styles.next}
          />
        </View>
        <Image
          source={{ uri: image }}
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
    color: "#FFFFFF",
    fontFamily: Nunito_SemiBold,
  },
  next: {
    width: 70,
    height: 70,
    marginVertical: -12,
    marginHorizontal: -24,
  },
  subtitle: {
    fontSize: 24,
    color: "#F2AE4D",
    fontFamily: Nunito_Bold,
  },
  description: {
    fontSize: 10,
    width: 190,
    color: "#DDDDDD",
    fontFamily: Nunito_SemiBold,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default CoachPass;

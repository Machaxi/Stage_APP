import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  Nunito_Bold,
  Nunito_Regular,
  Nunito_SemiBold,
} from "../../containers/util/fonts";

const PlayPlanDetails = (props) => {
  const HighlightedText = ({ text }) => {
    const highlights = text.match(/<highlight>(.*?)<\/highlight>/g);
    if (!highlights) {
      return <Text style={styles.descriptionbenift}>{text}</Text>;
    }
    const parts = text.split(/(<highlight>.*?<\/highlight>)/g);
    const renderedText = parts.map((part, i) => {
      if (part.startsWith("<highlight>")) {
        const highlightText = part.replace(/<\/?highlight>/g, "");
        return (
          <Text
            key={i}
            style={[styles.descriptionbenift, { color: "#FF9C33" }]}
          >
            {highlightText}
          </Text>
        );
      } else {
        return (
          <Text key={i} style={styles.descriptionbenift}>
            {part}
          </Text>
        );
      }
    });
    return <Text>{renderedText}</Text>;
  };

  handlepress = () => {
    props.onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      key={props.index}
      style={styles.subview}
      onPress={handlepress}
    >
      <LinearGradient
        colors={
          props.index === props.currentLevel
            ? [
                "rgba(255, 180, 1, 0.25))",
                "rgba(255, 212, 89, 0.2)",
                "rgba(255, 212, 89, 0.06)",
              ]
            : ["rgba(255, 255, 255, 0.15)", "rgba(118, 87, 136, 0)"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.container,
          props.index === props.currentLevel && {
            borderColor: "rgba(255, 180, 1, 0.4))",
          },
        ]}
      >
        <View style={styles.planView}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.subtitle}>
              ₹ {props.subtitle}{" "}
              <Text style={[styles.subtitle, { fontSize: 12 }]}>
                (GST Inclusive)
              </Text>
            </Text>
            <Text style={styles.description}>{props.description}</Text>
          </View>
          <Image
            source={{ uri: props.image }}
            style={[styles.image]}
            resizeMode="contain"
          />
        </View>
        <View style={styles.line} />
        <Text style={styles.benefits}>Benefits</Text>
        {props.index === props.currentLevel ? (
          <View style={styles.textContainer}>
            {props.benefits.map((item) => (
              <View style={{ flexDirection: "row", marginRight: 10 }}>
                <Image
                  source={require("../../images/playing/checklist.png")}
                  style={styles.next}
                />
                <HighlightedText text={item} />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.textContainer}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../../images/playing/checklist.png")}
                style={styles.next}
              />
              <HighlightedText text={props.benefits[0]} />
            </View>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  subview: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
    width: "97%",
  },
  subtext: {
    fontSize: 13,
    fontFamily: "Nunito-SemiBold",
    color: "#E8AC43",
  },
  timetext: {
    fontSize: 14,
    fontFamily: Nunito_Regular,
    color: "#D9D9D9",
    marginRight: -90,
    marginTop: 7,
  },
  inputview: {
    flex: 1,
    marginTop: -9,
    borderColor: "#FCB550",
    borderRadius: 26,
    borderWidth: 1,
    height: 50,
    marginBottom: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  line: {
    height: 1,
    backgroundColor: "#3F3750",
    marginBottom: 10,
    marginTop: 5,
    marginHorizontal: 10,
  },
  planView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  benefits: {
    fontSize: 12,
    color: "#F2AE4D",
    fontFamily: Nunito_SemiBold,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  textContainer: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 12,
    color: "#F3F2F5",
    fontFamily: Nunito_SemiBold,
  },
  next: {
    width: 15,
    height: 15,
    marginRight: 7,
    marginTop: 2,
  },
  subtitle: {
    fontSize: 20,
    color: "#F2AE4D",
    fontFamily: Nunito_Bold,
  },
  description: {
    fontSize: 11,
    width: 200,
    color: "#E6E6E6",
    fontFamily: Nunito_SemiBold,
  },
  descriptionbenift: {
    fontSize: 12,
    color: "#E6E6E6",
    fontFamily: Nunito_SemiBold,
  },
  image: {
    width: 70,
    height: 68,
    marginVertical: 5,
    marginRight: 10,
  },
  calanderimage: {
    width: 20,
    height: 20,
  },
});

export default PlayPlanDetails;

import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const SelectPlan = (props) => {
  handlepress = () => {
    props.onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.subview]}
      onPress={handlepress}
    >
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.06)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.planView}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.subtitle}>
              {props.subtitle}
              <Text style={[styles.subtitle, { fontSize: 12 }]}>
                (GST Inclusive)
              </Text>
            </Text>
            <Text style={styles.description}>{props.description}</Text>
          </View>
          <Image source={{ uri: props.image }} style={styles.image} />
        </View>
        {props.benefits.length > 1 && (
          <View>
            <View style={styles.line} />
            <View>
              <Text style={styles.benefits}>Extra benefits</Text>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../images/playing/next.png")}
                  style={styles.next}
                />
                <Text>{props.benefits}</Text>
              </View>
            </View>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
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
  line: {
    height: 1,
    backgroundColor: "#3F3750",
    marginVertical: 10,
  },
  planView: {
    flexDirection: "row",
    alignItems: "center",
  },
  benefits: {
    fontSize: 12,
    color: "#F2AE4D",
    fontFamily: "Nunito-600",
  },
  subview: {
    width: 98,
    height: 100,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 12,
    color: "#F3F2F5",
    fontFamily: "Nunito-600",
  },
  next: {
    width: 15,
    height: 15,
  },
  subtitle: {
    fontSize: 24,
    color: "#F2AE4D",
    fontFamily: "Nunito-700",
  },
  description: {
    fontSize: 10,
    width: 190,
    color: "#E6E6E6",
    fontFamily: "Nunito-600",
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default SelectPlan;

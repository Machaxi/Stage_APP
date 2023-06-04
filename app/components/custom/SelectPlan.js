import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Nunito_Bold, Nunito_SemiBold } from "../../containers/util/fonts";

const SelectPlan = (props) => {
  handlepress = () => {
    props.onPress();
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlepress}>
      <LinearGradient
        colors={
          props.index === props.currentLevel
            ? [
                "rgba(255, 180, 1, 0.25))",
                "rgba(255, 212, 89, 0.2)",
                "rgba(255, 212, 89, 0.06)",
              ]
            : ["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.06)"]
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
              {props.subtitle}
              <Text style={[styles.subtitle, { fontSize: 12 }]}>
                {" "}
                (GST Inclusive)
              </Text>
            </Text>
            <Text style={styles.description}>{props.description}</Text>
          </View>
          <Image
            source={props.image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        {props.benefits.length > 1 && (
          <View style={styles.textContainer}>
            <View style={styles.line} />
            <View>
              <Text style={styles.benefits}>Extra benefits</Text>
              {props.benefits.map((plan, index) => (
                <View key={index} style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../../images/playing/checklist.png")}
                    style={styles.next}
                  />
                  <Text style={styles.descriptionbenift}>{plan}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
  },
  line: {
    height: 1,
    backgroundColor: "#3F3750",
    marginBottom: 10,
    marginTop: 5,
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
    marginRight: 10,
  },
  subtitle: {
    fontSize: 24,
    color: "#F2AE4D",
    fontFamily: Nunito_Bold,
  },
  description: {
    fontSize: 10,
    width: 190,
    color: "#E6E6E6",
    fontFamily: Nunito_SemiBold,
  },
  descriptionbenift: {
    fontSize: 12,
    color: "#E6E6E6",
    fontFamily: Nunito_SemiBold,
  },
  image: {
    width: 90,
    height: 100,
  },
});

export default SelectPlan;

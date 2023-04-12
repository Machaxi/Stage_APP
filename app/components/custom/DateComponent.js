import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { whiteGreyBorder } from "../../containers/util/colors";

const DateComponent = ({ currentDate, day, date, myDate }) => {
  return (
    <LinearGradient
      colors={
        currentDate == myDate
          ? ["rgba(255, 180, 1, 0.1))", "rgba(255, 212, 89, 0.1)"]
          : ["rgba(255, 255, 255, 0.3)", "rgba(118, 87, 136, 0)"]
      }
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={[
        styles.sportsview,
        currentDate == myDate && { borderColor: "rgba(255, 180, 1, 0.3))" },
      ]}
    >
      <View style={styles.imaged}>
        <Text
          style={[
            styles.dayText,
            currentDate == myDate && { color: "#F2AE4D" },
          ]}
        >
          {day}
        </Text>
        <Text
          style={[
            styles.dateText,
            currentDate == myDate && { color: "#F2AE4D" },
          ]}
        >
          {date}
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  sportsview: {
    width: 100,
    height: 93,
    borderColor: whiteGreyBorder,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  dateText: {
    fontSize: 18,
    fontFamily: "Nunito-400",
    color: "#CDCDCD",
  },
  dayText: {
    fontSize: 13,
    marginBottom: 3,
    fontFamily: "Nunito-400",
    color: "#CDCDCD",
  },
  imaged: {
    marginTop: 5,
    width: 100,
    height: 93,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DateComponent;

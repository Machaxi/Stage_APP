import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const DateComponent = ({ currentDate, day, date, myDate }) => {
  return (
    <LinearGradient
      colors={
        currentDate == myDate
          ? ["rgba(243, 178, 118, 0.71)", "rgba(243, 223, 118, 0)"]
          : [
              "rgba(255, 255, 255, 0.15)",
              "rgba(118, 87, 136, 0)",
              "rgba(118, 87, 136, 0)",
              "rgba(118, 87, 136, 0.44)",
            ]
      }
      locations={currentDate == myDate ? [0, 1] : [0, 0.3, 0.6, 1]}
      style={styles.sportsview}
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
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontSize: 18,
    fontFamily: "Nunito-Regular",
    fontWeight: "400",
    color: "#CDCDCD",
  },
  dayText: {
    fontSize: 13,
    marginBottom: 3,
    fontFamily: "Nunito-Regular",
    fontWeight: "400",
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

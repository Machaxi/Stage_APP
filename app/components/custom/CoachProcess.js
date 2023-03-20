import React from "react";
import { Image, Text, StyleSheet, View } from "react-native";

const CoachProcess = ({ number }) => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../images/playing/sports_selected.png")}
          style={styles.image}
        />
        <Text style={[styles.insideText, { color: "#FF9C33" }]}>Sport</Text>
      </View>
      <View
        style={[styles.viewline, number > 1 && { backgroundColor: "#00D78F" }]}
      />
      <View style={{ alignItems: "center" }}>
        <Image
          source={
            number > 1
              ? require("../../images/playing/center_selected.png")
              : require("../../images/playing/center_selected_black.png")
          }
          style={styles.image}
        />
        <Text style={styles.insideText}>Centre</Text>
      </View>
      <View
        style={[styles.viewline, number > 2 && { backgroundColor: "#00D78F" }]}
      />
      <View style={{ alignItems: "center" }}>
        <Image
          source={
            number > 2
              ? require("../../images/playing/date_selected.png")
              : require("../../images/playing/date_selected_black.png")
          }
          style={styles.image}
        />
        <Text style={styles.insideText}>Batch</Text>
      </View>
      <View
        style={[styles.viewline, number > 3 && { backgroundColor: "#00D78F" }]}
      />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={
            number > 3
              ? require("../../images/playing/confirm_selected.png")
              : require("../../images/playing/confirm_selected_black.png")
          }
          style={styles.image}
        />
        <Text style={styles.insideText}>Confirm</Text>
      </View>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    zIndex: 2,
    marginTop: 20,
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  insideText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#C2C2C2",
    fontFamily: "Nunito-Regular",
  },
  viewline: {
    width: 87,
    height: 3,
    backgroundColor: "#474747",
    marginHorizontal: -12,
    zIndex: 1,
  },
});

export default CoachProcess;

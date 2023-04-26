import React, { Component } from "react";
import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";

class BuyPlanProcess extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ alignItems: "center", zIndex: 1 }}
          onPress={() => {
            const { onPress, number } = this.props;
            onPress(1, number);
          }}
        >
          <Image
            source={require("../../images/playing/sports_selected.png")}
            style={styles.image}
          />
          <Text style={[styles.insideText, { color: "#FF9C33" }]}>Sport</Text>
        </TouchableOpacity>
        <View
          style={[
            styles.viewline,
            this.props.number > 1 && { backgroundColor: "#00D78F" },
          ]}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ alignItems: "center", zIndex: 1 }}
          onPress={() => {
            const { onPress, number } = this.props;
            onPress(2, number);
          }}
        >
          <Image
            source={
              this.props.number > 1
                ? require("../../images/playing/center_selected.png")
                : require("../../images/playing/center_selected_black.png")
            }
            style={styles.image}
          />
          <Text
            style={[
              styles.insideText,
              this.props.number > 1 && { color: "#FF9C33" },
            ]}
          >
            Centre
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.viewline,
            this.props.number > 2 && { backgroundColor: "#00D78F" },
          ]}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ alignItems: "center", zIndex: 1 }}
          onPress={() => {
            const { onPress, number } = this.props;
            onPress(3, number);
          }}
        >
          <Image
            source={
              this.props.number > 2
                ? require("../../images/playing/date_selected.png")
                : require("../../images/playing/date_selected_black.png")
            }
            style={styles.image}
          />
          <Text
            style={[
              styles.insideText,
              this.props.number > 2 && { color: "#FF9C33" },
            ]}
          >
            Batch
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.viewline,
            this.props.number > 3 && { backgroundColor: "#00D78F" },
          ]}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ alignItems: "center", zIndex: 1 }}
          onPress={() => {
            const { onPress, number } = this.props;
            onPress(4, number);
          }}
        >
          <Image
            source={
              this.props.number > 3
                ? require("../../images/playing/plan.png")
                : require("../../images/playing/planblack.png")
            }
            style={styles.image}
          />
          <Text
            style={[
              styles.insideText,
              this.props.number > 3 && { color: "#FF9C33" },
            ]}
          >
            Plan
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.viewline,
            this.props.number > 4 && { backgroundColor: "#00D78F" },
          ]}
        />
        <View style={{ alignItems: "center", zIndex: 1 }}>
          <Image
            source={
              this.props.number > 4
                ? require("../../images/playing/pay.png")
                : require("../../images/playing/pay_black.png")
            }
            style={styles.image}
          />
          <Text
            style={[
              styles.insideText,
              this.props.number > 4 && { color: "#FF9C33" },
            ]}
          >
            Pay
          </Text>
        </View>
        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginTop: 20,
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  insideText: {
    fontSize: 12,
    color: "#C2C2C2",
    fontFamily: "Nunito-700",
  },
  viewline: {
    width: 60,
    height: 3,
    backgroundColor: "#474747",
    marginHorizontal: -12,
  },
});

export default BuyPlanProcess;

{
  /* <View style={styles.container}>
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
  <View style={{ alignItems: "center" }}>
    <Image
      source={
        number > 3
          ? require("../../images/playing/plan.png")
          : require("../../images/playing/planblack.png")
      }
      style={styles.image}
    />
    <Text style={styles.insideText}>Plan</Text>
  </View>
  <View
    style={[styles.viewline, number > 4 && { backgroundColor: "#00D78F" }]}
  />
  <View style={{ alignItems: "center", justifyContent: "center" }}>
    <Image
      source={
        number > 4
          ? require("../../images/playing/confirm_selected.png")
          : require("../../images/playing/confirm_selected_black.png")
      }
      style={styles.image}
    />
    <Text style={styles.insideText}>Confirm</Text>
  </View>
  <View />
</View>; */
}

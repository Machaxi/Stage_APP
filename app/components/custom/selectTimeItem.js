import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { whiteGreyBorder } from "../../containers/util/colors";
import { Nunito_Medium } from "../../containers/util/fonts";
import moment from "moment";
import { deviceWidth } from "../../containers/util/dimens";

class SelectTimeItem extends Component {
  handlepress(val) {
    this.props.onPress(val);
  }

  checkIfSlotActive(val) {
    // var randomStartDateTime =
    //   `${moment().format("YYYY-MM-DD")}T` + this.props.startTime;

    // const selectDate = new Date(this.props.preferredDate);
    // const time1 = new Date();
    // const time2 = new Date(randomStartDateTime);
    // const diffInMillisec = time2.getTime() - time1.getTime();

    // // convert milliseconds to hours, minutes
    // const diffInHours = diffInMillisec / (1000 * 60 * 60);

    // if (diffInHours > 0 || selectDate > time1) {
    //   return true;
    // } else {
    //   return false;
    // }
    const courtData = this.props.bookings.find(
      (item) =>
        item.courtId === this.props.item.courtId &&
        item.startTime == this.props.item.startTime
    );
    var guestvalue = 0;
    var showData = true;
    if (courtData) {
      guestvalue = courtData.maxPlayersAllowed - courtData.totalPlayers;
      console.log(guestvalue);
      if (this.props.entirecourt && guestvalue > 0) {
        showData = false;
      }
      if (this.props.guestCount >= guestvalue) {
        showData = false;
      }
    }
    const targetTime = moment(this.props.startTime, "HH:mm:ss");
    const currentTime = moment();
    const preferredDate = moment(this.props.preferredDate);
    if (preferredDate > currentTime) {
      return showData;
    } else {
      return (
        showData &&
        currentTime.isSameOrBefore(targetTime.subtract(15, "minutes"))
      );
    }
  }

  render() {
    const { image, isSelected, id, name, width, startTime } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          { marginRight: 10, marginBottom: 9, height: 30 },
          this.props.width ? { width: width } : {},
        ]}
        onPress={() => {
          this.handlepress(id);
        }}
        disabled={!this.checkIfSlotActive(id)}
      >
        <View>
          <LinearGradient
            colors={
              isSelected
                ? ["rgba(255, 180, 1, 0.06))", "rgba(255, 212, 89, 0.03)"]
                : !this.checkIfSlotActive()
                ? ["rgba(79, 0, 25, 0.2)", "rgba(79, 0, 25, 0.2)"]
                : ["rgba(255, 255, 255, 0.15)", "rgba(118, 87, 136, 0)"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.clockView,
              isSelected && {
                borderColor: "rgba(167, 134, 95, 0.6)",
              },
              !this.checkIfSlotActive() && { borderColor: "#FF5B79" },
            ]}
          >
            <Text>{"    "}</Text>
            {isSelected && <Image style={styles.clockimage} source={image} />}
            <Text
              style={[
                styles.sportText,
                { marginTop: -3, fontSize: 13 },
                isSelected && {
                  color: "#F2AE4D",
                },
                !this.checkIfSlotActive() && { color: "#FF5775" },
              ]}
            >
              {name}
              {"    "}
            </Text>
          </LinearGradient>
          {/* {!this.checkIfSlotActive() && (
            <Image
              style={[
                {
                  height: "95%",
                  width: "90%",
                  marginTop: -30,
                  tintColor: "#F2AE4D",
                  marginLeft: 8,
                },
                // width ? { width: width * 0.9 } : {width: deviceWidth * 0.28 },
              ]}
              resizeMode="stretch"
              source={require("../../images/playing/cross.png")}
            />
          )} */}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  clockView: {
    flexDirection: "row",
    height: 30,
    borderColor: whiteGreyBorder,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  clockimage: {
    width: 16,
    height: 14,
    marginRight: 7,
  },
  sportText: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: Nunito_Medium,
    color: "#BBBBBB",
  },
});

export default SelectTimeItem;

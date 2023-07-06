import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { darkGrey, whiteGreyBorder } from "../../containers/util/colors";
import TimingsTab from "../molecules/timingsTab";
import SelectPlayingTime from "../molecules/selectPlayingTime";
import { Nunito_Medium, Nunito_Regular } from "../../containers/util/fonts";

class CenterDetails extends Component {
  render() {
    const {
      item,
      currentIndex,
      distance,
      selectedTime,
      setTime,
      selectedTimeVal,
      timingsData,
      selectedMorningTime,
      selectedEveningTime,
      setSelectedMorningTimeVal,
      setSelectedEveningTimeVal,
      morningTimeData,
      eveningTimeData,
      selectedTimePeriod,
    } = this.props;

    handlepress = () => {
      this.props.onPress(item.id);
    };

    var isExpanded = item.id == currentIndex;

    return (
      <TouchableOpacity onPress={handlepress} activeOpacity={0.8}>
        <LinearGradient
          colors={
            item.id === currentIndex
              ? [
                  "rgba(255, 180, 1, 0.25)",
                  "rgba(255, 180, 1, 0.1)",
                  "rgba(255, 180, 1, 0.06)",
                ]
              : ["rgba(255, 255, 255, 0.15)", "rgba(118, 87, 136, 0)"]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.outerContainer}
        >
          <View style={styles.item}>
            <View style={{ flex: 0.3 }}>
              <Image source={{ uri: item.cover_pic }} style={styles.image} />
              {this.props.isDistance && this.props.distance && (
                <Text style={styles.distance}>{distance + " away"}</Text>
              )}
            </View>
            <View style={styles.textContainer}>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.title,
                    item.id === currentIndex && {
                      color: "#DFA35D",
                    },
                  ]}
                >
                  {item.name}
                </Text>
                <Text style={styles.address}>{item.address}</Text>
              </View>
            </View>
          </View>
          {isExpanded && this.props.isExpanded ? (
            <View style={styles.subcontai}>
              <Text style={styles.setTime}>{"Select Time Slot"}</Text>
              <View style={{ flexDirection: "row" }}>
                <TimingsTab
                  image={require("../../images/morning.png")}
                  name={"Morning"}
                  onPress={(val) => setTime(val)}
                  isSelected={selectedTime == "Morning"}
                />
                <TimingsTab
                  image={require("../../images/evening.png")}
                  name={"Evening"}
                  onPress={(val) => setTime(val)}
                  isSelected={selectedTime == "Evening"}
                />
              </View>
              {selectedTime == "Morning" &&
              morningTimeData &&
              morningTimeData.length > 0 ? (
                <SelectPlayingTime
                  selectedTime={selectedMorningTime}
                  preferredDate={this.props.preferredDate}
                  bookings={this.props.bookings}
                  guestCount={this.props.guestCount}
                  entirecourt={this.props.entirecourt}
                  selectedTimePeriod={(val) => {
                    console.log({ val });
                    selectedTimePeriod(val);
                  }}
                  setSelectedTime={(val) => setSelectedMorningTimeVal(val)}
                  timeData={morningTimeData}
                />
              ) : null}
              {selectedTime != "Morning" &&
              eveningTimeData &&
              eveningTimeData.length > 0 ? (
                <SelectPlayingTime
                  selectedTime={selectedEveningTime}
                  preferredDate={this.props.preferredDate}
                  bookings={this.props.bookings}
                  guestCount={this.props.guestCount}
                  entirecourt={this.props.entirecourt}
                  selectedTimePeriod={(val) => {
                    console.log({ val });
                    selectedTimePeriod(val);
                  }}
                  setSelectedTime={(val) => setSelectedEveningTimeVal(val)}
                  timeData={eveningTimeData}
                />
              ) : null}
            </View>
          ) : null}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  outerContainer: {
    borderColor: whiteGreyBorder,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  subcontai: {
    marginTop: 30,
    marginBottom: 15,
    marginHorizontal: 7,
  },
  image: {
    width: 100,
    height: 90,
    marginRight: 10,
    marginVertical: 5,
    borderRadius: 6,
  },
  setTime: {
    fontSize: 11,
    fontFamily: Nunito_Regular,
    color: darkGrey,
  },

  distance: {
    width: "88%",
    fontSize: 10,
    marginTop: -19,
    marginBottom: 5,
    fontFamily: Nunito_Medium,
    color: "#FFFFFF",
    backgroundColor: "rgba(35, 35, 35, 0.66)",
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 5,
  },
  textContainer: {
    flex: 0.7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 15,
  },
  title: {
    flex: 0.5,
    fontSize: 14,
    marginTop: 8,
    fontFamily: Nunito_Medium,
    color: "#F0F0F0",
  },
  address: {
    flex: 0.5,
    marginVertical: 5,
    fontSize: 11,
    fontFamily: Nunito_Regular,
    color: "#DDDDDD",
  },
});

export default CenterDetails;

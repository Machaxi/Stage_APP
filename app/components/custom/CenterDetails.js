import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { darkGrey, whiteGreyBorder, yellowVariant4, yellowVariant7 } from "../../containers/util/colors";
import TimingsTab from "../molecules/timingsTab";
import SelectPlayingTime from "../molecules/selectPlayingTime";

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
      eveningTimeData
    } = this.props;

    handlepress = () => {
      this.props.onPress(item.id);
    };

    var morningData = morningTimeData.filter((val) => {
      return val.timeOfDay == "Morning"
    });
    var eveningData = eveningTimeData.filter((val) => {
      return val.timeOfDay == "Evening";
    });

    var isExpanded = item.id == currentIndex;

    return (
      <TouchableOpacity onPress={handlepress}>
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
              <Image
                source={{ uri: item.cover_pic }}
                style={styles.image}
              />
              <Text style={styles.distance}>{distance}</Text>
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
          {isExpanded ? (
            <View style={{ marginTop: 30, marginBottom: 15, marginHorizontal: 7 }}>
              <Text style={styles.setTime}>
                {"Select Preferred Time Slot"}
              </Text>
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
              {selectedTime == "Morning" && morningData.length > 0 ? (
                <SelectPlayingTime
                  selectedTime={selectedMorningTime}
                  setSelectedTime={(val) => setSelectedMorningTimeVal(val)}
                  timeData={morningData}
                />
              ) : null}
              {selectedTime != "Morning" && eveningData.length > 0 ? (
                <SelectPlayingTime
                  selectedTime={selectedEveningTime}
                  setSelectedTime={(val) => setSelectedEveningTimeVal(val)}
                  timeData={eveningData}
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
  image: {
    width: 100,
    height: 90,
    marginRight: 10,
    marginVertical: 5,
    borderRadius: 6,
  },
  setTime: {
    fontSize: 11,
    fontFamily: "Nunito-400",
    color: darkGrey,
  },

  distance: {
    width: "88%",
    fontSize: 10,
    marginTop: -20,
    marginBottom: 5,
    fontFamily: "Nunito-500",
    color: "#FFFFFF",
    backgroundColor: "rgba(35, 35, 35, 0.66)",
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 5,
  },
  textContainer: {
    flex: 0.7,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  title: {
    flex: 0.5,
    fontSize: 14,
    marginTop: 8,
    fontFamily: "Nunito-500",
    color: "#F0F0F0",
  },
  address: {
    flex: 0.5,
    marginVertical: 5,
    fontSize: 11,
    fontFamily: "Nunito-400",
    color: "#DDDDDD",
  },
});

export default CenterDetails;

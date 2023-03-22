import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../../components/custom/CustomButton";
import DateComponent from "../../../components/custom/DateComponent";

const data = [
  {
    id: 1,
    image: require("../../../images/playing/beginner.png"),
    name: "Beginner",
  },
  {
    id: 2,
    image: require("../../../images/playing/intermediate.png"),
    name: "Intermediate",
  },
  {
    id: 3,
    image: require("../../../images/playing/advance.png"),
    name: "Advance",
  },
  {
    id: 4,
    image: require("../../../images/playing/professional.png"),
    name: "Professional",
  },
];

const timedataMorning = [
  { id: 1, name: "4 - 5 AM", slot: true },
  { id: 2, name: "6 - 7 AM", slot: true },
  { id: 3, name: "7 - 8 AM", slot: true },
  { id: 4, name: "8 - 9 AM", slot: true },
  { id: 5, name: "9 - 10 AM", slot: false },
];

const timedataEvening = [
  { id: 6, name: "4 - 5 PM", slot: false },
  { id: 7, name: "6 - 7 PM", slot: true },
  { id: 8, name: "7 - 8 PM", slot: true },
  { id: 9, name: "8 - 9 PM", slot: true },
  { id: 10, name: "9 - 10 PM", slot: true },
];

class SelectBatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLevel: 10,
      currentDate: 3,
      selectDate: 20,
      proseedLevel: false,
      proseedDate: false,
      proseedTime: false,
      hideMorning: false,
      hideEvening: false,
    };
  }

  render() {
    handlepress = () => {
      const levelString = JSON.stringify(data[this.state.currentIndex - 1]);
      var timeString = JSON.stringify(
        timedataMorning[this.state.currentIndex - 1]
      );
      if (selectDate > 5) {
        timeString = JSON.stringify(
          timedataEvening[this.state.currentIndex - 6]
        );
      }
      AsyncStorage.setItem("select_level", levelString);
      AsyncStorage.setItem("select_date", levelString);
      AsyncStorage.setItem("select_time", timeString);
      this.props.onPress();
    };

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    const date = today.getDate() + " " + months[today.getMonth()];
    const day = weekdays[today.getDay()];

    const oneDay = 24 * 60 * 60 * 1000;
    let nextDate = new Date(today.getTime() + oneDay);
    while (nextDate.getDay() === 0) {
      nextDate = new Date(nextDate.getTime() + oneDay);
    }
    const nextdate = nextDate.getDate() + " " + months[nextDate.getMonth()];
    const nextday = weekdays[nextDate.getDay()];

    assigndate = (item) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          key={item.id}
          style={[
            styles.subviewclock,
            { marginRight: 20, marginVertical: 10 },
            item.id === this.state.selectDate && { width: 100 },
          ]}
          onPress={() =>
            {item.slot &&this.setState({ selectDate: item.id, proseedTime: true })}
          }
        >
          <View>
          <LinearGradient
            colors={
              item.id === this.state.selectDate
                ? ["rgba(255, 255, 255, 0.15)", "rgba(118, 87, 136, 0)"]
                : [
                    "rgba(255, 255, 255, 0.15)",
                    "rgba(118, 87, 136, 0)",
                    "rgba(118, 87, 136, 0)",
                    "rgba(118, 87, 136, 0.44)",
                  ]
            }
            locations={
              item.id === this.state.selectDate ? [0, 1] : [0, 0.3, 0.6, 1]
            }
            style={[
              styles.sportsview,
              { flexDirection: "row", height: 30 },
              item.id === this.state.selectDate && { width: 110 },
            ]}
          >
            {item.id === this.state.selectDate && (
              <Image
                style={styles.clockimage}
                source={require("../../../images/playing/clock.png")}
              />
            )}
            <Text
              style={[
                styles.sportText,
                { marginTop: -3 },
                item.id === this.state.selectDate && { color: "#F2AE4D" },
                item.slot == false && { color: "#858585" },
              ]}
            >
              {item.name}
            </Text>
            </LinearGradient>
            {item.slot == false &&
            <Image
                style={{width: 80, height: 28, marginTop: -28, marginLeft: 7}}
                source={require("../../../images/playing/cross.png")}
              />}
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <ScrollView>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            marginVertical: 20,
          }}
        >
          <Text style={styles.mainText}>Select preferred Batch</Text>
          <Text style={styles.select}>Select player Level</Text>
          <View style={styles.contained}>
            {data.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                style={[styles.subview]}
                onPress={() =>
                  this.setState({ currentLevel: index, proseedLevel: true })
                }
              >
                <LinearGradient
                  colors={
                    index === this.state.currentLevel
                      ? ["rgba(243, 178, 118, 0.71)", "rgba(243, 223, 118, 0)"]
                      : [
                          "rgba(255, 255, 255, 0.15)",
                          "rgba(118, 87, 136, 0)",
                          "rgba(118, 87, 136, 0)",
                          "rgba(118, 87, 136, 0.44)",
                        ]
                  }
                  locations={
                    index === this.state.currentLevel
                      ? [0, 1]
                      : [0, 0.3, 0.6, 1]
                  }
                  style={styles.sportsview}
                >
                  <View style={styles.imaged}>
                    <Image
                      source={item.image}
                      style={[
                        styles.imageitem,
                        item.id == "4" && { width: 45 },
                      ]}
                    />
                  </View>
                </LinearGradient>
                <Text style={styles.sportText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.select}>Select Date</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.subview]}
              onPress={() =>
                this.setState({ currentDate: 1, proseedDate: true })
              }
            >
              <DateComponent
                currentDate={this.state.currentDate}
                day={day}
                date={date}
                myDate={1}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.subview, { marginLeft: 20 }]}
              onPress={() =>
                this.setState({ currentDate: 2, proseedDate: true })
              }
            >
              <DateComponent
                currentDate={this.state.currentDate}
                day={nextday}
                date={nextdate}
                myDate={2}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.select}>Select Preferred time</Text>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.06)"]}
            locations={[0, 1]}
            style={styles.selecttime}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.timeView, { marginBottom: 10 }]}
              onPress={() =>
                this.setState({ hideMorning: !this.state.hideMorning })
              }
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../../../images/playing/cloudy.png")}
                />
                <Text style={styles.timetext}>Morning</Text>
              </View>
              <Image
                style={{ width: 8, height: 12 }}
                source={
                  this.state.hideMorning
                    ? require("../../../images/playing/arrow_back.png")
                    : require("../../../images/playing/arrow_up.png")
                }
              />
            </TouchableOpacity>
            <View
              style={[
                styles.timecontained,
                { marginLeft: 5 },
                this.state.hideMorning && { height: 0, opacity: 0 },
              ]}
            >
              {timedataMorning.map((item) => assigndate(item))}
            </View>

            <View style={{ height: 2, backgroundColor: "gray", margin: 10 }} />

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.timeView}
              onPress={() =>
                this.setState({ hideEvening: !this.state.hideEvening })
              }
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../../../images/playing/fullmoon.png")}
                />
                <Text style={styles.timetext}>Evening</Text>
              </View>
              <Image
                style={{ width: 8, height: 12 }}
                source={
                  this.state.hideEvening
                    ? require("../../../images/playing/arrow_back.png")
                    : require("../../../images/playing/arrow_up.png")
                }
              />
            </TouchableOpacity>
            <View
              style={[
                styles.timecontained,
                { marginLeft: 10 },
                this.state.hideEvening && { height: 0, opacity: 0 },
              ]}
            >
              {timedataEvening.map((item) => assigndate(item))}
            </View>
          </LinearGradient>
          <CustomButton
            name="Next"
            available={
              this.state.proseedTime &&
              this.state.proseedDate &&
              this.state.proseedLevel
            }
            onPress={this.props.onPress}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contained: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  timecontained: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  timetext: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "Nunito-SemiBold",
    fontWeight: "600",
    color: "#A7A7A7",
  },
  clockimage: {
    width: 16,
    height: 14,
    marginRight: 7,
  },
  subview: {
    width: 98,
    height: 100,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  subviewclock: {
    width: 90,
    height: 30,
  },

  sportsview: {
    width: 98,
    height: 92,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  timeView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  selecttime: {
    borderRadius: 24,
    marginVertical: 15,
    padding: 10,
  },
  select: {
    fontSize: 14,
    marginVertical: 10,
    fontFamily: "Nunito-Regular",
    fontWeight: "600",
    color: "#CACACA",
  },
  imageitem: {
    width: 52,
    height: 71,
    zIndex: 2,
  },
  sportText: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: "Nunito-Regular",
    fontWeight: "500",
    color: "#BBBBBB",
  },
  mainText: {
    fontSize: 16,
    marginVertical: 8,
    fontFamily: "Nunito-Regular",
    fontWeight: "600",
    color: "#D1D1D1",
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

export default SelectBatch;

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
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { getBaseUrl } from "../../../containers/BaseComponent";
import { whiteGreyBorder } from "../../util/colors";
import SelectSports from "../../../components/custom/SelectSports";
import { Nunito_Medium, Nunito_SemiBold } from "../../util/fonts";
import LoadingIndicator from "../../../components/molecules/loadingIndicator";
import moment from "moment";

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
const nextdate = nextDate.getDate() + " " + months[nextDate.getMonth()];
const nextday = weekdays[nextDate.getDay()];

class SelectBatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLevel: 10,
      currentDate: 3,
      selectTime: 20,
      proseedLevel: false,
      proseedDate: false,
      proseedTime: false,
      hideMorning: false,
      hideEvening: false,
      batchData: null,
      morningData: null,
      eveningData: null,
      levelData: [],
    };
  }

  componentDidMount() {
    const sport_id = this.props.selectSport.id;
    const academy_id = this.props.selectCenter.id;
    const now = new Date();
    const currentHour = now.getHours();
    if (currentHour < 12) {
      this.setState({ hideMorning: false, hideEvening: true });
    } else {
      this.setState({ hideMorning: true, hideEvening: false });
    }
    axios
      .get(
        getBaseUrl() +
          "/global/coaching/slots?sport_id=" +
          sport_id +
          "&academy_id=" +
          academy_id
      )
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        let batchData = userResponce["data"]["data"]["batch_details"];
        let levelData = userResponce["data"]["data"]["playerLevel"];
        this.setState({ batchData: batchData, levelData: levelData });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getTimeData = (level, dateSelect) => {
    const greaterThan12 = [];
    const lessThan12 = [];
    var dates = null;
    if (dateSelect == 2) {
      dates = nextDate;
    } else if (dateSelect == 1) {
      dates = today;
    }
    for (let i = 0; i < this.state.batchData.length; i++) {
      if (
        level < 5 &&
        this.state.levelData[level].name.toLowerCase() ==
          this.state.batchData[i].proficiency.toLowerCase() &&
        dates &&
        dates.getDay() in this.state.batchData[i].weekDetails
      ) {
        const startHour = parseInt(
          this.state.batchData[i].startTime.split(":")[0]
        );
        if (startHour >= 12) {
          greaterThan12.push(this.state.batchData[i]);
        } else {
          lessThan12.push(this.state.batchData[i]);
        }
      }
      const greaterThan = this.removeDublicateValue(greaterThan12);
      const lessThan = this.removeDublicateValue(lessThan12);
      this.setState({ eveningData: greaterThan, morningData: lessThan });
      // this.setState({ eveningData: greaterThan12, morningData: lessThan12 });
    }
  };

  removeDublicateValue = (data) => {
    const uniqueData = [];
    for (let i = 0; i < data.length; i++) {
      const currentObject = data[i];
      let isDuplicate = false;

      for (let j = 0; j < uniqueData.length; j++) {
        if (uniqueData[j].displayTime === currentObject.displayTime) {
          if (currentObject.is_allowed) {
            uniqueData[j] = currentObject;
          }
          isDuplicate = true;
          break;
        }
      }
      if (!isDuplicate) {
        uniqueData.push(currentObject);
      }
    }
    return uniqueData;
  };

  render() {
    assigndate = (item) => {
      const targetTime = moment(item.startTime, "HH:mm:ss");
      const currentTime = moment();
      const noTouch =
        item.is_allowed == false ||
        (this.state.currentDate == 1 &&
          !currentTime.isSameOrBefore(targetTime.subtract(15, "minutes")));
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          key={item.batch_id}
          style={{ marginRight: 10, marginVertical: 10, height: 30 }}
          onPress={() => {
            this.setState({ selectTime: item.batch_id, proseedTime: true });
          }}
          disabled={noTouch}
        >
          <View>
            <LinearGradient
              colors={
                item.batch_id === this.state.selectTime
                  ? ["rgba(255, 180, 1, 0.06))", "rgba(255, 212, 89, 0.03)"]
                  : noTouch
                  ? ["rgba(79, 0, 25, 0.2)", "rgba(79, 0, 25, 0.2)"]
                  : ["rgba(255, 255, 255, 0.15)", "rgba(118, 87, 136, 0)"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.clockView,
                item.batch_id === this.state.selectTime && {
                  borderColor: "rgba(167, 134, 95, 0.6)",
                },
                noTouch && { borderColor: "#FF5B79" },
              ]}
            >
              <Text>{"    "}</Text>
              {item.batch_id === this.state.selectTime && (
                <Image
                  style={styles.clockimage}
                  source={require("../../../images/playing/clock.png")}
                />
              )}
              <Text
                style={[
                  styles.sportText,
                  { marginTop: -3, fontSize: 13 },
                  item.batch_id === this.state.selectTime && {
                    color: "#F2AE4D",
                  },
                  item.slot == false && { color: "#858585" },
                  noTouch && { color: "#FF5775" },
                ]}
              >
                {item.displayTime}
                {"    "}
              </Text>
            </LinearGradient>
            {/* {noTouch && (
              // item.startTime.split(":")[0] <= today.getHours())) && (
              <Image
                style={{
                  width: "80%",
                  height: "100%",
                  marginTop: -30,
                  marginLeft: 10,
                  tintColor: "#F2AE4D",
                }}
                resizeMode="stretch"
                source={require("../../../images/playing/cross.png")}
              />
            )} */}
          </View>
        </TouchableOpacity>
      );
    };

    handlepress = () => {
      var selectDate = today;
      if (this.state.currentDate > 1) {
        selectDate = nextDate;
      }
      let selectLevel = this.state.levelData[this.state.currentLevel];
      let selectBatch = this.state.batchData.find(
        (item) => item.batch_id == this.state.selectTime
      );
      this.props.onPress(selectDate, selectLevel, selectBatch);
    };

    if (this.state.batchData == null) {
      return <LoadingIndicator />;
    }

    return (
      <View style={styles.contain}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 0.93 }}>
          <Text style={styles.mainText}>Select preferred Batch</Text>
          <Text style={styles.select}>Select player Level</Text>
          <View style={styles.contained}>
            {this.state.levelData.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                style={[styles.subview]}
                onPress={() => {
                  this.setState({ currentLevel: index, proseedLevel: true });
                  this.getTimeData(index, this.state.currentDate);
                }}
              >
                <LinearGradient
                  colors={
                    index === this.state.currentLevel
                      ? [
                          "rgba(255, 180, 1, 0.25))",
                          "rgba(255, 212, 89, 0.2)",
                          "rgba(255, 212, 89, 0.06)",
                        ]
                      : ["rgba(255, 255, 255, 0.15)", "rgba(118, 87, 136, 0)"]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[
                    styles.sportsview,
                    index === this.state.currentLevel && {
                      borderColor: "rgba(255, 180, 1, 0.4))",
                    },
                  ]}
                >
                  <View style={styles.imaged}>
                    <Image
                      source={{ uri: item.url }}
                      style={styles.imageitem}
                      resizeMode="contain"
                    />
                  </View>
                </LinearGradient>
                <Text style={styles.sportText}>{item.displayText}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {this.state.proseedLevel && (
            <View>
              <Text style={styles.select}>Select Date</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.subview]}
                  onPress={() => {
                    this.setState({ currentDate: 1, proseedDate: true });
                    this.getTimeData(this.state.currentLevel, 1);
                  }}
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
                  onPress={() => {
                    this.setState({ currentDate: 2, proseedDate: true });
                    this.getTimeData(this.state.currentLevel, 2);
                  }}
                >
                  <DateComponent
                    currentDate={this.state.currentDate}
                    day={nextday}
                    date={nextdate}
                    myDate={2}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {this.state.proseedDate && (
            <View>
              <Text style={styles.select}>Select Preferred time</Text>
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.2)",
                  "rgba(255, 255, 255, 0.06)",
                ]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
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
                    style={{ width: 14, height: 8 }}
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
                  {this.state.morningData &&
                  this.state.morningData.length > 0 ? (
                    this.state.morningData.map((item) => assigndate(item))
                  ) : (
                    <View style={{ alignItems: "center", width: "100%" }}>
                      <Text style={styles.sportText}>No slots available</Text>
                    </View>
                  )}
                </View>

                <View
                  style={{ height: 1, backgroundColor: "gray", margin: 10 }}
                />

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
                    style={{ width: 14, height: 8 }}
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
                    { marginLeft: 5 },
                    this.state.hideEvening && { height: 0, opacity: 0 },
                  ]}
                >
                  {this.state.eveningData &&
                  this.state.eveningData.length > 0 ? (
                    this.state.eveningData.map((item) => assigndate(item))
                  ) : (
                    <View style={{ alignItems: "center", width: "100%" }}>
                      <Text style={styles.sportText}>No slots available</Text>
                    </View>
                  )}
                </View>
              </LinearGradient>
            </View>
          )}
        </ScrollView>
        <View style={{ flex: 0.07, paddingTop: 20 }}>
          <CustomButton
            image={require("../../../images/playing/arrow_go.png")}
            name="Next "
            available={
              this.state.proseedTime &&
              this.state.proseedDate &&
              this.state.proseedLevel
            }
            onPress={handlepress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 20,
  },
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
    fontFamily: Nunito_SemiBold,
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
  sportsview: {
    width: 98,
    height: 92,
    borderColor: whiteGreyBorder,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  clockView: {
    flexDirection: "row",
    height: 30,
    borderColor: whiteGreyBorder,
    borderWidth: 1,
    borderRadius: 15,
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
    fontFamily: Nunito_SemiBold,
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
    fontFamily: Nunito_Medium,
    color: "#BBBBBB",
  },
  mainText: {
    fontSize: 16,
    marginVertical: 8,
    fontFamily: Nunito_SemiBold,
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

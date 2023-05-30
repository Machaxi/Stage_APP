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
import axios from "axios";
import { getBaseUrl } from "../../../containers/BaseComponent";
import { whiteGreyBorder } from "../../util/colors";
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

let secondDate = new Date(nextDate.getTime() + oneDay);
const seconddate = secondDate.getDate() + " " + months[secondDate.getMonth()];
const secondday = weekdays[secondDate.getDay()];

class SelectLearnBatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLevel: 10,
      currentDate: 4,
      selectTime: 20,
      proseedLevel: false,
      proseedDate: false,
      proseedTime: false,
      hideMorning: false,
      hideEvening: false,
      batchData: null,
      playerLevel: null,
      courtUnavailability: null,
      courtBookings: null,
      morningData: null,
      eveningData: null,
      filterData: null,
      currentLevelName: "",
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
          "global/play/slots?academyId=" +
          academy_id +
          "&sportId=" +
          sport_id
      )
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        let batchData = userResponce["data"]["data"]["courtAvailability"];
        let playerLevel = userResponce["data"]["data"]["playerLevel"];
        let courtUnavailability =
          userResponce["data"]["data"]["courtUnavailability"];
        let courtBookings = userResponce["data"]["data"]["courtBookings"];
        this.setState({
          batchData: batchData,
          playerLevel: playerLevel,
          courtUnavailability: courtUnavailability,
          courtBookings: courtBookings,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getLevelData = (level, date) => {
    if (this.state.proseedDate && this.state.proseedLevel) {
      this.getLevelDatas(level, date);
    }
  };

  getLevelDatas = (level, date) => {
    var selectDate = today;
    if (date == 2) {
      selectDate = nextDate;
    } else if (date == 3) {
      selectDate = secondDate;
    }
    let unavailableCourt = this.state.courtUnavailability.filter((item) => {
      let endDate = new Date(item.endDate);
      let startDate = new Date(item.startDate);
      if (selectDate <= endDate && selectDate >= startDate) {
        return item;
      }
    });

    let filterByCourtIdData = this.filterByCourtId(
      this.state.batchData,
      unavailableCourt
    );

    const excludeData = [];
    this.state.courtBookings.forEach((booking) => {
      if (!booking.proficiency.includes(level)) {
        excludeData.push(booking);
      } else {
        if (booking.maxPlayersAllowed - booking.totalPlayers <= 0) {
          excludeData.push(booking);
        }
      }
    });
    const filteredAppointments = [];
    filterByCourtIdData.forEach((courtAvailability) => {
      const foundAppointment = excludeData.find(
        (courtBookings) =>
          courtAvailability.courtId === courtBookings.courtId &&
          courtAvailability.startTime === courtBookings.startTime &&
          courtAvailability.endTime === courtBookings.endTime &&
          new Date(courtBookings.date).getDate() == selectDate.getDate() &&
          new Date(courtBookings.date).getMonth() == selectDate.getMonth()
      );
      if (!foundAppointment) {
        filteredAppointments.push(courtAvailability);
      }
    });
    const uniqueCourtAvailability = filteredAppointments.filter(
      (availability, index, self) =>
        index ===
        self.findIndex((a) => a.displayTime === availability.displayTime)
    );
    this.setState({ filterData: uniqueCourtAvailability });
    this.getTimeData(uniqueCourtAvailability);
    console.log(uniqueCourtAvailability);
  };

  filterByCourtId = (arr1, arr2) => {
    let res = [];
    res = arr1.filter((el) => {
      return !arr2.find((element) => {
        return element.courtId === el.courtId;
      });
    });
    return res;
  };

  getTimeData = (filterData) => {
    const greaterThan12 = [];
    const lessThan12 = [];
    for (let i = 0; i < filterData.length; i++) {
      const startHour = parseInt(filterData[i].startTime.split(":")[0]);
      if (startHour >= 12) {
        greaterThan12.push(filterData[i]);
      } else {
        lessThan12.push(filterData[i]);
      }
    }
    this.setState({ eveningData: greaterThan12, morningData: lessThan12 });
  };

  render() {
    assigntime = (item) => {
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
          style={[styles.subviewclock, { marginRight: 10, marginVertical: 10 }]}
          onPress={() => {
            this.setState({
              selectTime: item.courtTimingId,
              proseedTime: true,
            });
          }}
          disabled={noTouch}
        >
          <View>
            <LinearGradient
              colors={
                item.courtTimingId == this.state.selectTime
                  ? ["rgba(255, 180, 1, 0.06))", "rgba(255, 212, 89, 0.03)"]
                  : noTouch
                  ? ["rgba(79, 0, 25, 0.2)", "rgba(79, 0, 25, 0.2)"]
                  : ["rgba(255, 255, 255, 0.15)", "rgba(118, 87, 136, 0)"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.clockView,
                item.courtTimingId === this.state.selectTime && {
                  borderColor: "rgba(167, 134, 95, 0.6)",
                },
                noTouch && { borderColor: "#FF5B79" },
              ]}
            >
              <Text>{"   "}</Text>
              {item.courtTimingId === this.state.selectTime && (
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
                {"   "}
              </Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      );
    };

    handlepress = () => {
      var selectDate = today;
      if (this.state.currentDate == 2) {
        selectDate = nextDate;
      } else if (this.state.currentDate > 2) {
        selectDate = secondDate;
      }
      let selectLevel = this.state.playerLevel[this.state.currentLevel];
      let selectBatch = this.state.batchData.find(
        (item) => item.courtTimingId == this.state.selectTime
      );
      console.log(selectLevel);
      this.props.onPress(selectDate, selectLevel, selectBatch);
    };

    assignLevel = (item, index) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.subview]}
          onPress={() => {
            this.setState(
              {
                currentLevel: index,
                proseedLevel: true,
                currentLevelName: item.name,
              },
              () => {
                this.getLevelData(item.name, this.state.currentDate);
              }
            );
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
              <Image source={{ uri: item.url }} style={styles.imageitem} />
            </View>
          </LinearGradient>
          <Text style={styles.sportText}>{item.displayText}</Text>
        </TouchableOpacity>
      );
    };

    if (this.state.batchData == null) {
      return <LoadingIndicator />;
    }

    return (
      <View style={styles.contain}>
        <ScrollView style={{ flex: 0.93 }}>
          <Text style={styles.mainText}>Select preferred Batch</Text>
          <Text style={styles.select}>Select player Level</Text>
          <View style={styles.contained}>
            {this.state.playerLevel &&
              this.state.playerLevel.map((item, index) =>
                assignLevel(item, index)
              )}
          </View>
          {this.state.proseedLevel && (
            <View>
              <Text style={styles.select}>Select Date</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.subview]}
                  onPress={() => {
                    this.setState({ currentDate: 1, proseedDate: true }, () => {
                      this.getLevelData(this.state.currentLevelName, 1);
                    });
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
                    this.setState({ currentDate: 2, proseedDate: true }, () => {
                      this.getLevelData(this.state.currentLevelName, 2);
                    });
                  }}
                >
                  <DateComponent
                    currentDate={this.state.currentDate}
                    day={nextday}
                    date={nextdate}
                    myDate={2}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.subview, { marginLeft: 20 }]}
                  onPress={() => {
                    this.setState({ currentDate: 3, proseedDate: true }, () => {
                      this.getLevelData(this.state.currentLevelName, 3);
                    });
                  }}
                >
                  <DateComponent
                    currentDate={this.state.currentDate}
                    day={secondday}
                    date={seconddate}
                    myDate={3}
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
                  "rgba(255, 255, 255, 0.4)",
                  "rgba(255, 255, 255, 0.06)",
                ]}
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
                    this.state.morningData.map((item) => assigntime(item))
                  ) : (
                    <View style={{ alignItems: "center", width: "100%" }}>
                      <Text style={styles.sportText}>No slots available</Text>
                    </View>
                  )}
                </View>

                <View
                  style={{ height: 2, backgroundColor: "gray", margin: 10 }}
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
                    { marginLeft: 10 },
                    this.state.hideEvening && { height: 0, opacity: 0 },
                  ]}
                >
                  {this.state.eveningData &&
                  this.state.eveningData.length > 0 ? (
                    this.state.eveningData.map((item) => assigntime(item))
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
    width: 100,
    height: 100,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  subviewclock: {
    height: 30,
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

export default SelectLearnBatch;

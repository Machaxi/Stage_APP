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
import axios from "axios";
import { getBaseUrl } from "../../../containers/BaseComponent";
import { whiteGreyBorder } from "../../util/colors";
import SelectLevel from "../../../components/custom/SelectLevel";
import { Nunito_Medium, Nunito_SemiBold } from "../../util/fonts";
import LoadingIndicator from "../../../components/molecules/loadingIndicator";

class SelectCoachBatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLevel: 10,
      selectTime: 20,
      proseedLevel: false,
      proseedTime: false,
      hideMorning: false,
      hideEvening: false,
      batchData: null,
      morningData: null,
      eveningData: null,
      playerLevel: null,
      batchType: "ADULTS",
    };
  }

  componentDidMount() {
    const sport_id = this.props.selectSport.id;
    const academy_id = this.props.selectCenter.id;
    const now = new Date();
    const currentHour = now.getHours();
    var batchType = "ADULTS";
    if (this.props.parent != "Parent") {
      batchType = "KIDS";
    }
    if (currentHour < 12) {
      this.setState({
        hideMorning: false,
        hideEvening: true,
        batchType: batchType,
      });
    } else {
      this.setState({
        hideMorning: true,
        hideEvening: false,
        batchType: batchType,
      });
    }
    axios
      .get(
        getBaseUrl() +
          "global/coaching/slots?sport_id=" +
          sport_id +
          "&academy_id=" +
          academy_id
      )
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        let batchData = userResponce["data"]["data"]["batch_details"];
        let playerLevel = userResponce["data"]["data"]["playerLevel"];
        console.log(response);
        this.setState({ batchData: batchData, playerLevel: playerLevel });
        if (this.props.selectLevel) {
          const indexs = playerLevel.findIndex(
            (item) => item.displayText === this.props.selectLevel.displayText
          );
          if (indexs != null) {
            this.setState({ currentLevel: indexs, proseedLevel: true }, () => {
              this.getTimeData(indexs);
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  getTimeData = (level) => {
    const greaterThan12 = [];
    const lessThan12 = [];
    console.log(this.state.batchData);
    for (let i = 0; i < this.state.batchData.length; i++) {
      if (
        this.state.playerLevel[level].name ==
          this.state.batchData[i].proficiency &&
        this.state.batchType == this.state.batchData[i].batchType
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
    }
  };

  handlepress = () => {
    let selectLevel = this.state.playerLevel[this.state.currentLevel];
    let selectTime = this.state.batchData.find(
      (item) => item.batch_id == this.state.selectTime
    );
    const selectBatch = [];
    this.state.batchData.forEach((PlanAvailability) => {
      if (
        PlanAvailability.displayTime == selectTime.displayTime &&
        selectLevel.name == PlanAvailability.proficiency &&
        PlanAvailability.is_allowed &&
        this.state.batchType == PlanAvailability.batchType
      ) {
        selectBatch.push(PlanAvailability);
      }
    });
    this.props.onPress(selectLevel, selectBatch);
  };

  assignTime = (item) => {
    var noTouch = !item.is_allowed;
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
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    if (this.state.batchData == null) {
      return <LoadingIndicator />;
    }

    return (
      <View style={styles.contain}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 0.93 }}>
          <Text style={styles.select}>Select player Level</Text>
          <View style={styles.contained}>
            {this.state.playerLevel.map((item, index) => (
              <SelectLevel
                index={index}
                currentLevel={this.state.currentLevel}
                image={item.url}
                id={item.id}
                url={true}
                name={item.displayText}
                onPress={() => {
                  this.setState({ currentLevel: index, proseedLevel: true });
                  this.getTimeData(index);
                }}
              />
            ))}
          </View>
          {this.state.proseedLevel && (
            <View>
              <Text style={styles.select}>Select Preferred Time</Text>
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
                    this.state.hideMorning && { height: 0, opacity: 0 },
                  ]}
                >
                  {this.state.morningData &&
                  this.state.morningData.length > 0 ? (
                    this.state.morningData.map((item) => this.assignTime(item))
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
                    this.state.hideEvening && { height: 0, opacity: 0 },
                  ]}
                >
                  {this.state.eveningData &&
                  this.state.eveningData.length > 0 ? (
                    this.state.eveningData.map((item) => this.assignTime(item))
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
            available={this.state.proseedTime && this.state.proseedLevel}
            onPress={this.handlepress}
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
    marginLeft: 5,
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
});

export default SelectCoachBatch;

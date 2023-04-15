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
import SelectSession from "../../../components/custom/SelectSession";

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

class SelectCoachPlan extends Component {
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
    };
  }

  componentDidMount() {
    this.setState({ batchData: this.props.batchData });
    console.log(this.props.batchData);
  }

  render() {
    handlepress = () => {
      let selectLevel = data[this.state.currentLevel];
      let selectBatch = this.state.batchData.find(
        (item) => item.batch_id == this.state.selectTime
      );
      this.props.onPress(selectLevel, selectBatch);
    };

    return (
      <View style={styles.contain}>
        <ScrollView style={{ flex: 0.93 }}>
          <Text style={styles.select}>Select sessions Per week </Text>
          <View style={styles.contained}>
            {this.state.selectBatch &&
              this.state.selectBatch.map((item, index) => (
                <SelectSession
                  index={index}
                  currentLevel={this.state.currentLevel}
                  days={item.weekDetails.length}
                  dayList={item.id}
                  onPress={() => {
                    this.setState({ currentLevel: index, proseedLevel: true });
                    //   this.getTimeData(index);
                  }}
                />
              ))}
          </View>
          <Text style={styles.select}>Select Payment plan</Text>
        </ScrollView>
        <View style={{ flex: 0.07, paddingTop: 20 }}>
          <CustomButton
            image={require("../../../images/playing/arrow_go.png")}
            name="Next "
            available={this.state.proseedTime && this.state.proseedLevel}
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
    marginLeft: 5,
  },
  timetext: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "Nunito-600",
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
    fontFamily: "Nunito-600",
    color: "#CACACA",
  },
  sportText: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: "Nunito-500",
    color: "#BBBBBB",
  },
  mainText: {
    fontSize: 16,
    marginVertical: 8,
    fontFamily: "Nunito-600",
    color: "#D1D1D1",
  },
});

export default SelectCoachPlan;

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
import { Nunito_Medium, Nunito_SemiBold } from "../../util/fonts";
import SelectPlan from "../../../components/custom/SelectPlan";

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
      currentSession: 0,
      currentPlan: 10,
      selectTime: 20,
      proseedNext: false,
      batchData: null,
      planData: null,
      planList: null,
    };
  }

  componentDidMount() {
    this.setState({
      batchData: this.props.selectBatch,
      planData: this.props.selectBatch[0].batchPlansDto.plans[0].payable_amount,
      planList: this.props.planList,
    });
  }

  render() {
    handlepress = () => {
      const selectPlan = this.props.selectBatch[this.state.currentSession]
        .batchPlansDto.plans[0].payable_amount[this.state.currentPlan];
      const selectBatch = this.props.selectBatch[this.state.currentSession];
      this.props.onPress(selectPlan, selectBatch);
    };

    return (
      <View style={styles.contain}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 0.93 }}>
          <Text style={styles.select}>Select sessions Per week </Text>
          <View style={styles.contained}>
            {this.state.batchData &&
              this.state.batchData.map((item, index) => (
                <View
                  key={index}
                  style={[
                    index < this.state.batchData.length - 1 && {
                      marginRight: 25,
                    },
                  ]}
                >
                  <SelectSession
                    index={index}
                    currentLevel={this.state.currentSession}
                    days={Object.keys(item.weekDetails).length}
                    dayList={Object.keys(item.weekDetails)}
                    onPress={() => {
                      this.setState({
                        currentSession: index,
                        planData: this.props.selectBatch[index].batchPlansDto
                          .plans[0].payable_amount,
                      });
                    }}
                  />
                </View>
              ))}
          </View>
          <Text style={styles.select}>Select Payment plan</Text>
          {this.state.planData &&
            this.state.planData.map((plan, index) => {
              console.log(plan);
              const title =
                plan.term_id === 1
                  ? "Monthly"
                  : plan.term_id === 2
                  ? "Quarterly"
                  : "Yearly";
              const indexed = this.state.planList.find(
                (plan) => plan.name === title
              );
              return (
                plan.term_id != 3 && (
                  <SelectPlan
                    index={index}
                    currentLevel={this.state.currentPlan}
                    title={
                      plan.term_id === 1
                        ? "Monthly"
                        : plan.term_id === 2
                        ? "Quarterly"
                        : "Yearly"
                    }
                    subtitle={"Rs. " + plan.planFees}
                    description={indexed?.description}
                    benefits={indexed?.extraBenifits}
                    image={
                      plan.term_id === 1
                        ? require("../../../images/playing/rocket.png")
                        : plan.term_id === 2
                        ? require("../../../images/playing/hand.png")
                        : require("../../../images/playing/arrow.png")
                    }
                    onPress={() => {
                      this.setState({ currentPlan: index, proseedNext: true });
                    }}
                  />
                )
              );
            })}
        </ScrollView>
        <View style={{ flex: 0.07, paddingTop: 20 }}>
          <CustomButton
            image={require("../../../images/playing/arrow_go.png")}
            name="Next "
            available={this.state.proseedNext}
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

export default SelectCoachPlan;

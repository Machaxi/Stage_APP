import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ConfirmBooking from "../FirstTimeUser/TrialBook/ConfirmBooking";
import SelectBatch from "../FirstTimeUser/TrialBook/SelectBatch";
import SelectCenter from "../FirstTimeUser/TrialBook/SelectCenter";
import SelectSports from "../FirstTimeUser/TrialBook/SelectSports";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { getBaseUrl } from "../BaseComponent";
import CongratulationScreen from "../FirstTimeUser/TrialBook/CongratulationScreen";
import SorryScreen from "../FirstTimeUser/TrialBook/SorryScreen";
import GetBack from "../../components/custom/GetBack";
import BuyPlanProcess from "../../components/custom/BuyPlanProcess";
import { darkBlueVariant } from "../util/colors";
import SelectCoachBatch from "./components/SelectCoachBatch";
import SelectCoachPlan from "./components/SelectCoachPlan";
import { Nunito_SemiBold } from "../util/fonts";
import PlayerDetails from "./components/PlayerDetails";
import SelectPay from "./components/SelectPay";

class CoachingPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      title: "Coaching Plan",
      sportsList: null,
      academiesList: null,
      selectSport: null,
      selectCenter: null,
      selectBatch: null,
      selectDate: null,
      selectLevel: null,
      selectTime: null,
      congratulationScreen: false,
      distance: 0,
      alreadyBook: false,
      errorMessage: "We could not book your free trial, please try again.",
      firstPage: true,
      selectPlan: null,
      selectSlot: null,
      username: "",
      usergender: "",
      parent: "",
    };
  }

  componentDidMount() {
    axios
      .get(getBaseUrl() + "/global/academy/all")
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        let academiesData = userResponce["data"]["data"];
        this.setState({
          sportsList: academiesData["Sports"],
          academiesList: academiesData["academies"],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onPress = (value, number) => {
    if (value < number) {
      this.setState({ currentPage: value });
    }
  };

  onPressSports = (selectSport) => {
    this.setState({ currentPage: 2 });
    this.setState({ selectSport: selectSport });
  };

  onPressCenter = (selectCenter, distance) => {
    this.setState({ currentPage: 3 });
    this.setState({ selectCenter: selectCenter, distance: distance });
  };

  onPressBatch = (selectLevel, selectBatchPlan) => {
    this.setState({ currentPage: 4 });
    this.setState({
      selectLevel: selectLevel,
      selectTime: selectBatchPlan,
    });
  };

  onPressPlan = (selectPlan, selectSlot) => {
    console.log(selectPlan);
    console.log(selectSlot);
    this.setState({ currentPage: 5 });
    this.setState({ selectPlan: selectPlan, selectSlot: selectSlot });
  };

  onPressConfirm = (alreadyBook, errorMessage) => {
    this.setState({
      congratulationScreen: true,
      alreadyBook: alreadyBook,
      errorMessage: errorMessage,
    });
  };

  onPressRetry = () => {
    this.setState({ congratulationScreen: false, currentPage: 1 });
  };

  hadleBackPress = () => {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    } else {
      this.props.navigation.goBack();
    }
  };

  selectScreen = () => {
    return (
      <View>
        <GetBack title={this.state.title} onPress={this.hadleBackPress} />
        <View style={{ height: 70, marginHorizontal: 20, marginVertical: 10 }}>
          <BuyPlanProcess
            number={this.state.currentPage}
            onPress={this.onPress}
          />
        </View>
        <View style={{ height: 1, backgroundColor: "gray", marginTop: 15 }} />
      </View>
    );
  };

  onPressDetails = (username, usergender, parent) => {
    console.log(parent);
    console.log(username);
    console.log(usergender);
    this.setState({
      firstPage: false,
      currentPage: 1,
      username: username,
      usergender: usergender,
      parent: parent,
    });
  };
  render() {
    return (
      <LinearGradient
        colors={[darkBlueVariant, darkBlueVariant]}
        locations={[0, 1]}
        style={styles.container}
      >
        {this.state.firstPage && (
          <PlayerDetails onPress={this.onPressDetails} />
        )}
        {this.state.congratulationScreen && this.state.alreadyBook && (
          <CongratulationScreen
            title="Coaching Plan"
            selectCenter={this.state.selectCenter}
            selectSport={this.state.selectSport}
            selectDate={this.state.selectDate}
            selectLevel={this.state.selectLevel}
            selectBatch={this.state.selectTime}
            distance={this.state.distance}
          />
        )}
        {this.state.congratulationScreen && !this.state.alreadyBook && (
          <SorryScreen
            onPress={this.onPressRetry}
            errorMessage={this.state.errorMessage}
          />
        )}
        {!this.state.firstPage && !this.state.congratulationScreen && (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 0.17 }}>{true && this.selectScreen()}</View>
            <View style={{ flex: 0.83 }}>
              {this.state.sportsList != null &&
                this.state.currentPage === 1 && (
                  <SelectSports
                    onPress={this.onPressSports}
                    sportList={this.state.sportsList}
                  />
                )}
              {this.state.currentPage === 2 && (
                <SelectCenter
                  onPress={this.onPressCenter}
                  academiesList={this.state.academiesList}
                  selectSport={this.state.selectSport}
                />
              )}
              {this.state.currentPage === 3 && (
                <SelectCoachBatch
                  onPress={this.onPressBatch}
                  selectCenter={this.state.selectCenter}
                  selectSport={this.state.selectSport}
                />
              )}
              {this.state.currentPage === 4 && (
                <SelectCoachPlan
                  onPress={this.onPressPlan}
                  selectBatch={this.state.selectTime}
                />
              )}
              {this.state.currentPage === 5 && (
                <SelectPay
                  title="Coaching"
                  selectCenter={this.state.selectCenter}
                  selectSport={this.state.selectSport}
                  selectDate={this.state.selectDate}
                  selectLevel={this.state.selectLevel}
                  selectBatch={this.state.selectSlot}
                  selectPlan={this.state.selectPlan}
                  distance={this.state.distance}
                  username={this.state.username}
                  usergender={this.state.usergender}
                  parent={this.state.parent}
                  onPress={this.onPressConfirm}
                />
              )}
            </View>
          </View>
        )}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  select: {
    fontSize: 16,
    marginTop: 25,
    fontFamily: Nunito_SemiBold,
    color: "#D1D1D1",
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: "gray",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CoachingPlan;

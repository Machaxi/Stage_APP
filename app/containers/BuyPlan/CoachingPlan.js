import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import SelectCenter from "../FirstTimeUser/TrialBook/SelectCenter";
import SelectSports from "../FirstTimeUser/TrialBook/SelectSports";
import axios from "axios";
import { getBaseUrl } from "../BaseComponent";
import GetBack from "../../components/custom/GetBack";
import BuyPlanProcess from "../../components/custom/BuyPlanProcess";
import { darkBlueVariant } from "../util/colors";
import SelectCoachBatch from "./components/SelectCoachBatch";
import SelectCoachPlan from "./components/SelectCoachPlan";
import { Nunito_SemiBold } from "../util/fonts";
import PlayerDetails from "./components/PlayerDetails";
import SelectPay from "./components/SelectPay";
import CongratsScreen from "./components/CongratsScreen";
import SorryPage from "./components/SorryPage";
import ApplyCouponCode from "./components/ApplyCouponCode";
import AppliedCouponCode from "../../components/custom/AppliedCouponCode";

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
      couponCode: false,
      username: "",
      usergender: "",
      parent: "",
      amount: 0,
      orderId: "",
      applycoupon: false,
      isLoading: false,
      childDetails: null,
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
    this.setState({ currentPage: 5 });
    this.setState({ selectPlan: selectPlan, selectSlot: selectSlot });
  };

  onPressConfirm = (alreadyBook, orderId, amount) => {
    this.setState({
      congratulationScreen: true,
      alreadyBook: alreadyBook,
      amount: amount,
      orderId: orderId,
    });
  };

  onPressRetry = () => {
    this.setState({ congratulationScreen: false, currentPage: 1 });
  };

  hadleBackPress = () => {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    } else {
      this.setState({ firstPage: true });
    }
  };

  hadleBackCouponCode = () => {
    this.setState({ couponCode: false });
  };

  hadleCouponCode = () => {
    this.setState({ couponCode: true });
  };

  hadleCouponApply = () => {
    this.setState({ couponCode: false, applycoupon: true, isLoading: true });
  };

  hadleBack = () => {
    this.props.navigation.goBack();
  };

  onAppliedBack = () => {
    this.setState({ isLoading: false });
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

  onPressDetails = (username, usergender, parent, childDetails) => {
    this.setState({
      firstPage: false,
      currentPage: 1,
      username: username,
      usergender: usergender,
      parent: parent,
      childDetails: childDetails,
    });
  };

  onPressSuccess = () => {
    this.props.navigation.navigate("LearnHomePage");
  };

  render() {
    return (
      <LinearGradient
        colors={[darkBlueVariant, darkBlueVariant]}
        locations={[0, 1]}
        style={styles.container}
      >
        {this.state.firstPage && (
          <View style={{ flex: 1 }}>
            <GetBack title={this.state.title} onPress={this.hadleBack} />
            <PlayerDetails onPress={this.onPressDetails} />
          </View>
        )}
        {this.state.couponCode && (
          <View style={{ flex: 1 }}>
            <GetBack title="Apply Coupon" onPress={this.hadleBackCouponCode} />
            <ApplyCouponCode onPress={this.hadleCouponApply} />
          </View>
        )}
        {this.state.congratulationScreen && this.state.alreadyBook && (
          <CongratsScreen
            onPress={this.onPressSuccess}
            buttonName="Home "
            description="To get Batch information and progress tracking, kindly go to home
          page."
          />
        )}
        {this.state.congratulationScreen && !this.state.alreadyBook && (
          <SorryPage
            onPressBack={this.hadleBack}
            orderId={this.state.orderId}
            amount={this.state.amount}
            title="Coaching"
            onPress={this.onPressConfirm}
          />
        )}
        <AppliedCouponCode
          visible={this.state.isLoading}
          price="₹ 200"
          onPressBack={this.onAppliedBack}
        />

        {!this.state.firstPage &&
          !this.state.congratulationScreen &&
          !this.state.couponCode && (
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
                    applycoupon={this.state.applycoupon}
                    childDetails={this.state.childDetails}
                    onPress={this.onPressConfirm}
                    onPresscoupon={this.hadleCouponCode}
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

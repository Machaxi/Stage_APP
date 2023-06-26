import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
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
import { StackActions } from "react-navigation";
import { KeyboardAvoidingView } from "react-native";
import events from "../../router/events";
import { getData, storeData } from "../../components/auth";
import { BackHandler } from "react-native";

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
      errorMessage: "",
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
      childDetails: null,
      coupon: null,
      joinBool: false,
      joinTime: null,
      couponminamount: 0,
      planList: null,
      header: null,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    this.getData();
    axios
      .get(getBaseUrl() + "global/academy/all")
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

  handleBackButtonClick = () => {
    this.hadleBackPress();
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  getData = async () => {
    console.log("okkka");
    console.log(getBaseUrl());
    const header = await AsyncStorage.getItem("header");
    this.setState({ header: header }, () => {
      this.apiCall();
    });
  };

  apiCall = () => {
    axios
      .get(getBaseUrl() + "user/learn-play", {
        headers: {
          "x-authorization": this.state.header,
        },
      })
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        let batchData = userResponce["data"]["data"];
        this.setState({ planList: batchData["learn"]["plans"] });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    this.setState({
      selectPlan: selectPlan,
      selectSlot: selectSlot,
      applycoupon: false,
      coupon: null,
      joinBool: false,
      joinTime: null,
    });
  };

  onPressConfirm = (alreadyBook, orderId, amount, errorMessage) => {
    this.setState({
      congratulationScreen: true,
      alreadyBook: alreadyBook,
      amount: amount,
      orderId: orderId,
      errorMessage: errorMessage,
    });
  };

  onPressRetry = () => {
    this.setState({ congratulationScreen: false, currentPage: 1 });
  };

  hadleBackPress = () => {
    if (this.state.couponCode) {
      this.setState({ couponCode: false });
    } else {
      if (this.state.currentPage > 1) {
        this.setState({ currentPage: this.state.currentPage - 1 });
      } else {
        if (this.state.firstPage) {
          this.hadleBack();
        } else {
          this.setState({ firstPage: true });
        }
      }
    }
  };

  hadleBackCouponCode = () => {
    this.setState({ couponCode: false });
  };

  hadleCouponCode = (joinBool, joinTime, amount) => {
    this.setState({
      couponCode: true,
      joinBool: joinBool,
      joinTime: joinTime,
      couponminamount: amount,
      applycoupon: false,
      coupon: null,
    });
  };

  hadleCouponApply = (coupon) => {
    this.setState({ couponCode: false, applycoupon: true, coupon: coupon });
  };

  hadleBack = () => {
    this.props.navigation.goBack();
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

  onPressSuccess = (playData, learnData) => {
    if (playData && learnData) {
      this.props.navigation.navigate("LearnHomePage");
    } else {
      if (!learnData) {
        events.publish("REFRESH_DASHBOARD_PURSCHASE");
      } else {
        events.publish("REFRESH_DASHBOARD_NEW");
      }
      const popAction = StackActions.popToTop();
      this.props.navigation.dispatch(popAction);
    }
  };

  confirm = () => {
    this.setState({ congratulationScreen: false });
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
            <PlayerDetails
              title="Coaching Plan"
              onPress={this.onPressDetails}
              username={this.state.username}
              usergender={this.state.usergender}
              parent={this.state.parent}
              childDetails={this.state.childDetails}
            />
          </View>
        )}
        {this.state.couponCode && (
          <View style={{ flex: 1 }}>
            <GetBack title="Apply Coupon" onPress={this.hadleBackCouponCode} />
            <ApplyCouponCode
              subscriptionType="COACHING_SUBSCRIPTION"
              selectCenter={this.state.selectCenter}
              onPress={this.hadleCouponApply}
              amount={this.state.couponminamount}
            />
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
            error_message={this.state.errorMessage}
            onPress={this.confirm}
          />
        )}
        {!this.state.firstPage &&
          !this.state.congratulationScreen &&
          !this.state.couponCode && (
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={{ flex: 0.17 }}>{true && this.selectScreen()}</View>
              <View style={{ flex: 0.83 }}>
                {this.state.sportsList != null &&
                  this.state.currentPage === 1 && (
                    <SelectSports
                      selectSport={this.state.selectSport}
                      onPress={this.onPressSports}
                      sportList={this.state.sportsList}
                    />
                  )}
                {this.state.currentPage === 2 && (
                  <SelectCenter
                    onPress={this.onPressCenter}
                    academiesList={this.state.academiesList}
                    selectSport={this.state.selectSport}
                    selectCenter={this.state.selectCenter}
                  />
                )}
                {this.state.currentPage === 3 && (
                  <SelectCoachBatch
                    onPress={this.onPressBatch}
                    parent={this.state.parent}
                    selectCenter={this.state.selectCenter}
                    selectSport={this.state.selectSport}
                    selectLevel={this.state.selectLevel}
                  />
                )}
                {this.state.currentPage === 4 && (
                  <SelectCoachPlan
                    onPress={this.onPressPlan}
                    selectBatch={this.state.selectTime}
                    planList={this.state.planList}
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
                    coupon={this.state.coupon}
                    childDetails={this.state.childDetails}
                    joinTime={this.state.joinTime}
                    joinBool={this.state.joinBool}
                    onPress={this.onPressConfirm}
                    onPresscoupon={this.hadleCouponCode}
                  />
                )}
              </View>
            </KeyboardAvoidingView>
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

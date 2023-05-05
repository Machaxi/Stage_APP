import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import { getBaseUrl } from "../BaseComponent";
import GetBack from "../../components/custom/GetBack";
import { darkBlueVariant } from "../util/colors";
import { Nunito_SemiBold } from "../util/fonts";
import CongratsScreen from "./components/CongratsScreen";
import SorryPage from "./components/SorryPage";
import BuyPlayProcess from "../../components/custom/BuyPlayProcess";
import SelectPlayPlan from "./components/SelectPlayPlan";
import SelectPlayCenter from "./components/SelectPlayCenter";
import SelectPlayPay from "./components/SelectPlayPay";
import MoreDetails from "./components/MoreDetails";
import AsyncStorage from "@react-native-community/async-storage";
import ApplyCouponCode from "./components/ApplyCouponCode";
import RequestHeaderTitle from "../../atoms/requestHeaderTitle";
import RequestHeaderBg from "../../atoms/requestHeaderBg";
import RequestHeaderLeft from "../../atoms/requestHeaderLeft";
import RequestHeaderRight from "../../atoms/requestHeaderRight";
import { StackActions } from "react-navigation";
import { KeyboardAvoidingView } from "react-native";
import LoadingIndicator from "../../components/molecules/loadingIndicator";

class PlayingPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      title: "Coaching Plan",
      planList: null,
      sportsList: null,
      academiesList: null,
      selectPlan: null,
      selectCenter: null,
      selectBatch: null,
      selectDate: null,
      selectLevel: null,
      selectTime: null,
      congratulationScreen: false,
      distance: 0,
      alreadyBook: false,
      errorMessage: "We could not book your free trial, please try again.",
      selectSlot: null,
      username: "",
      usergender: "",
      parent: "",
      moreScreen: false,
      userDetails: null,
      PlanNumber: 100,
      couponCode: false,
      applycoupon: false,
      coupon: null,
      orderId: "",
      amount: 0,
      subscriptionId: 0,
      joinBool: false,
      joinTime: null,
      header: null,
    };
  }

  componentDidMount() {
    this.getData();
    this.setState({
      PlanNumber: this.props.navigation.state.params.selectPlan,
    });
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

  apiCall = () => {
    axios
      .get(getBaseUrl() + "/user/learn-play", {
        headers: {
          "x-authorization": this.state.header,
        },
      })
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        let batchData = userResponce["data"]["data"];
        this.setState({ planList: batchData["play"]["plans"] });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getData = async () => {
    const userDetailsJson = await AsyncStorage.getItem("user_details");
    const header = await AsyncStorage.getItem("header");
    const userDetails = JSON.parse(userDetailsJson);
    this.setState({ userDetails: userDetails, header: header }, () => {
      this.apiCall();
    });
  };

  onPress = (value, number) => {
    if (value < number) {
      this.setState({ currentPage: value });
    }
  };

  hadleBackCouponCode = () => {
    this.setState({ couponCode: false });
  };

  hadleCouponCode = (joinBool, joinTime) => {
    this.setState({ couponCode: true, joinBool: joinBool, joinTime: joinTime });
  };

  hadleCouponApply = (coupon) => {
    this.setState({ couponCode: false, applycoupon: true, coupon: coupon });
  };

  onPressPlan = (selectPlan) => {
    this.setState({ currentPage: 2 });
    this.setState({ selectPlan: selectPlan });
  };

  onPressCenter = (selectCenter, distance) => {
    this.setState({ currentPage: 3 });
    this.setState({
      selectCenter: selectCenter,
      distance: distance,
      applycoupon: false,
      coupon: null,
      joinBool: false,
      joinTime: null,
      playData: true,
      learnData: true,
    });
  };

  onPressConfirm = (alreadyBook, orderId, amount, subscriptionId) => {
    this.setState({
      congratulationScreen: true,
      alreadyBook: alreadyBook,
      amount: amount,
      orderId: orderId,
      subscriptionId: subscriptionId,
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

  hadleBack = () => {
    this.props.navigation.goBack();
  };

  onComplete = () => {
    if (this.state.playData && this.state.learnData) {
      this.props.navigation.navigate("LearnHomePage");
    } else {
      const popAction = StackActions.popToTop();
      this.props.navigation.dispatch(popAction);
    }
  };

  onPressSuccess = (playData, learnData) => {
    this.setState({
      congratulationScreen: false,
      moreScreen: true,
      playData: playData,
      learnData: learnData,
    });
  };

  confirm = () => {
    this.setState({ congratulationScreen: false });
  };

  selectScreen = () => {
    return (
      <View>
        <GetBack title="Playing Plan" onPress={this.hadleBackPress} />
        <View style={{ height: 70, marginHorizontal: 20, marginVertical: 10 }}>
          <BuyPlayProcess
            number={this.state.currentPage}
            onPress={this.onPress}
          />
        </View>
        <View style={{ height: 1, backgroundColor: "gray", marginTop: 15 }} />
      </View>
    );
  };

  render() {
    if (this.state.planList == null) {
      return <LoadingIndicator />;
    }
    return (
      <LinearGradient
        colors={[darkBlueVariant, darkBlueVariant]}
        locations={[0, 1]}
        style={styles.container}
      >
        {this.state.congratulationScreen && this.state.alreadyBook && (
          <CongratsScreen
            onPress={this.onPressSuccess}
            buttonName="Next "
            description="To book playing slots, Kindly tell us your preferred sport and playing level."
          />
        )}
        {this.state.congratulationScreen && !this.state.alreadyBook && (
          <SorryPage
            onPressBack={this.hadleBack}
            onPress={this.confirm}
            orderId={this.state.orderId}
            amount={this.state.amount}
            error_message={this.state.subscriptionId}
            title="Playing"
            buttonName={"Pay"}
          />
        )}
        {this.state.sportsList != null && this.state.moreScreen && (
          <MoreDetails
            sportList={this.state.sportsList}
            subscriptionId={this.state.subscriptionId}
            onPress={this.onComplete}
          />
        )}
        {this.state.couponCode && (
          <View style={{ flex: 1 }}>
            <GetBack title="Apply Coupon" onPress={this.hadleBackCouponCode} />
            <ApplyCouponCode
              subscriptionType="PLAYING_SUBSCRIPTION"
              selectCenter={this.state.selectCenter}
              onPress={this.hadleCouponApply}
            />
          </View>
        )}
        {!this.state.congratulationScreen &&
          !this.state.moreScreen &&
          !this.state.couponCode && (
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={{ flex: 0.17 }}>{true && this.selectScreen()}</View>
              <View style={{ flex: 0.83 }}>
                {this.state.planList && this.state.currentPage === 1 && (
                  <SelectPlayPlan
                    onPress={this.onPressPlan}
                    planList={this.state.planList}
                    PlanNumber={this.state.PlanNumber}
                  />
                )}
                {this.state.currentPage === 2 && (
                  <SelectPlayCenter
                    onPress={this.onPressCenter}
                    academiesList={this.state.academiesList}
                  />
                )}
                {this.state.currentPage === 3 && (
                  <SelectPlayPay
                    title="Coaching"
                    userDetails={this.state.userDetails}
                    selectCenter={this.state.selectCenter}
                    selectPlan={this.state.selectPlan}
                    distance={this.state.distance}
                    applycoupon={this.state.applycoupon}
                    coupon={this.state.coupon}
                    joinTime={this.state.joinTime}
                    joinBool={this.state.joinBool}
                    explore={false}
                    onPresscoupon={this.hadleCouponCode}
                    onPress={this.onPressConfirm}
                  />
                )}
              </View>
            </KeyboardAvoidingView>
          )}
      </LinearGradient>
    );
  }
}

PlayingPlan.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: <RequestHeaderTitle title={"Play"} />,
    headerTitleStyle: {
      color: "white",
    },

    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerBackground: <RequestHeaderBg />,
    headerLeft: <RequestHeaderLeft navigation={navigation} />,
    headerRight: <RequestHeaderRight navigation={navigation} />,
  };
};

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

export default PlayingPlan;

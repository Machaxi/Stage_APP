import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CongratsScreen from "../BuyPlan/components/CongratsScreen";
import SorryPage from "../BuyPlan/components/SorryPage";
import ApplyCouponCode from "../BuyPlan/components/ApplyCouponCode";
import GetBack from "../../components/custom/GetBack";
import AppliedCouponCode from "../../components/custom/AppliedCouponCode";
import { Nunito_SemiBold } from "../util/fonts";
import { darkBlueVariant } from "../util/colors";
import { getBaseUrl } from "../BaseComponent";
import axios from "axios";
import LoadingIndicator from "../../components/molecules/loadingIndicator";
import SelectPlayPay from "../BuyPlan/components/SelectPlayPay";
import AsyncStorage from "@react-native-community/async-storage";

class RenewPlayPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Coaching Plan",
      academiesList: null,
      selectPlan: null,
      selectCenter: null,
      congratulationScreen: false,
      distance: 0,
      alreadyBook: false,
      errorMessage: "We could not book your free trial, please try again.",
      userDetails: null,
      couponCode: false,
      applycoupon: false,
      coupon: null,
      orderId: "",
      amount: 0,
      header: null,
      playPlanData: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  apiCall = () => {
    console.log("olla");
    axios
      .get(getBaseUrl() + "/user/playing-profile", {
        headers: {
          "x-authorization": this.state.header,
        },
      })
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        let batchData = userResponce["data"]["data"];
        const planId = batchData["plan"].planId;
        const preferredAcademyId = batchData["plan"].preferredAcademyId;
        console.log(userResponce);
        this.apicalling(planId, preferredAcademyId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  planValue = () => {
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
        this.setState({
          playPlanData: batchData["play"]["plans"],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  apicalling = (planId, preferredAcademyId) => {
    axios
      .get(
        getBaseUrl() +
          "/global/play/plan-info?planId=" +
          planId +
          "&preferredAcademyId=" +
          preferredAcademyId,
        {
          headers: {
            "x-authorization": this.state.header,
          },
        }
      )
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        let batchData = userResponce["data"]["data"];
        const planId = batchData["plan"];
        const preferredAcademyId = batchData["academy"];
        console.log("hhhhh");
        console.log(preferredAcademyId);
        console.log(planId);
        this.setState({
          selectPlan: planId,
          selectCenter: preferredAcademyId,
        });
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
      this.planValue();
    });
  };

  hadleBackCouponCode = () => {
    this.setState({ couponCode: false });
  };

  hadleCouponCode = () => {
    this.setState({ couponCode: true });
  };

  hadleCouponApply = (coupon) => {
    this.setState({
      couponCode: false,
      applycoupon: true,
      coupon: coupon,
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

  confirm = () => {
    this.setState({ congratulationScreen: false });
  };

  hadleBack = () => {
    this.setState({ congratulationScreen: false });
  };

  onPressSuccess = () => {
    this.props.navigation.navigate("Play");
  };

  handlepress = () => {
    this.props.navigation.goBack();
  };

  onPressExplore = () => {
    const selectPlan = 100;
    const data = this.state.playPlanData;
    this.props.navigation.navigate("PlayingPlan", { data, selectPlan });
  };

  render() {
    if (this.state.selectCenter == null) {
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
        {!this.state.congratulationScreen && !this.state.couponCode && (
          <View style={{ flex: 1 }}>
            <GetBack title="Playing Plan" onPress={this.handlepress} />
            <SelectPlayPay
              title="Coaching"
              userDetails={this.state.userDetails}
              selectCenter={this.state.selectCenter}
              selectPlan={this.state.selectPlan}
              distance={this.state.distance}
              applycoupon={this.state.applycoupon}
              coupon={this.state.coupon}
              explore={true}
              onPresscoupon={this.hadleCouponCode}
              onPress={this.onPressConfirm}
              onPressExplore={this.onPressExplore}
            />
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

export default RenewPlayPlan;

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import CustomButton from "../../../components/custom/CustomButton";
import { Nunito_Bold, Nunito_SemiBold } from "../../util/fonts";
import { getPaymentKey, getRazorPayEmail } from "../../BaseComponent";
import { paymentConfirmation } from "../../../redux/reducers/PaymentReducer";
import { connect } from "react-redux";
import RazorpayCheckout from "react-native-razorpay";
import Loader from "../../../components/custom/Loader";

class SorryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: null,
      header: null,
      phonenumber: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  handleOnStartPayment = (orderId, amount) => {
    this.setState({ isLoading: true });
    // this.RBSheet.close()
    var options = {
      description: "Payment for Subscription",
      currency: "INR",
      key: getPaymentKey(),
      amount: amount * 100,
      name: "Machaxi",
      prefill: {
        email: getRazorPayEmail(),
        contact: this.state.phonenumber,
        name: this.state.userDetails.userName,
      },
      theme: { color: "#67BAF5" },
    };
    console.log(options);
    RazorpayCheckout.open(options)
      .then((data) => {
        let payment_details = {
          razorpay_payment_id: data.razorpay_payment_id,
        };
        this.submitPaymentConfirmation(orderId, amount, payment_details);
      })
      .catch((error) => {
        console.log("Razor Rspo ", error);
        alert("Payment could not succeed. Please try again.");
        this.setState({ isLoading: false });
      });
  };

  submitPaymentConfirmation = (orderId, amount, paymentDetails) => {
    if ((this.props.title = "Playing")) {
      this.paymentProcess(
        orderId,
        amount,
        paymentDetails,
        `court/buy-subscription`
      );
    } else {
      this.paymentProcess(
        orderId,
        amount,
        paymentDetails,
        `payment/due-subscription-plan-payment/v1`
      );
    }
  };

  paymentProcess = (orderId, amount, paymentDetails, url) => {
    let postData = {
      data: {
        due_order_id: orderId,
        amount,
        payment_details: paymentDetails,
      },
    };
    this.props
      .paymentConfirmation(this.state.header, postData, url)
      .then((result) => {
        result = result.payload.data;
        if (result.success) {
          this.props.onPress(true);
        } else {
          this.setState({ isLoading: false });
          alert(result.error_message);
        }
      });
  };

  getData = async () => {
    const header = await AsyncStorage.getItem("header");
    const userDetailsJson = await AsyncStorage.getItem("user_details");
    const phonenumber = await AsyncStorage.getItem("phone_number");
    const userDetails = JSON.parse(userDetailsJson);
    this.setState({
      userDetails: userDetails,
      header: header,
      phonenumber: phonenumber,
    });
  };

  render() {
    handleCrosspress = () => {
      this.props.onPressBack();
    };

    handlePaypress = () => {
      if (this.props.amount == 0) {
        this.props.onPressBack();
      } else {
        this.props.onPress();
      }
    };

    return (
      <View style={styles.container}>
        <Loader visible={this.state.isLoading} />
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.25)", "rgba(255, 255, 255, 0.06)"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.subcontainer]}
        >
          <View style={{ flexDirection: "row-reverse", width: "100%" }}>
            <TouchableOpacity activeOpacity={0.8} onPress={handleCrosspress}>
              <Image
                source={require("../../../images/cancel.png")}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Payment Failed !</Text>
          <Text style={styles.subtext}>{this.props.error_message}</Text>
          <CustomButton
            name={
              this.props.amount == 0
                ? "Try Again"
                : "Pay ₹ " + this.props.amount
            }
            hideImage={true}
            available={true}
            onPress={handlePaypress}
          />
        </LinearGradient>
        <Image
          source={require("../../../images/playing/sorry.png")}
          style={{
            width: 170,
            height: 230,
            marginBottom: -130,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
    alignItems: "center",
  },
  subcontainer: {
    width: "100%",
    height: 400,
    marginBottom: 40,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
  },
  title: {
    fontSize: 22,
    fontFamily: Nunito_Bold,
    color: "#FF6C6C",
    marginBottom: 20,
    marginTop: 120,
  },
  subtext: {
    fontSize: 15,
    fontFamily: Nunito_SemiBold,
    color: "#CFCFCF",
    marginBottom: 30,
    textAlign: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    paymentData: state.PaymentReducer,
  };
};

const mapDispatchToProps = { paymentConfirmation };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SorryPage);

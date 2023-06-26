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
      isLoading: false,
      failed: "Payment Failed !",
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    if (this.props.title == "Playing") {
      this.setState({ failed: this.props.failed });
    }
  };

  render() {
    handleCrosspress = () => {
      this.props.onPress();
    };

    handlePaypress = () => {
      this.props.onPress();
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
          <Text style={styles.title}>{this.state.failed}</Text>
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

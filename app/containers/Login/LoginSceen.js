import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../components/custom/CustomButton";
import CodeInput from "react-native-confirmation-code-input";
import auth from "@react-native-firebase/auth";
import Loader from "../../components/custom/Loader";
import SvgUri from "react-native-svg-uri";

class LoginSceen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      confirm: null,
      prosedenext: false,
      timeRemaining: 10,
      code: "",
      isLoading: false,
    };
    this.intervalIdRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.timeRemaining < 1 && this.state.confirm != null) {
      clearInterval(this.intervalIdRef.current);
    }
  }

  componentDidMount() {
    const intervalId = setInterval(() => {
      this.setState((prevState) => ({
        timeRemaining: prevState.timeRemaining - 1,
      }));
    }, 1000);
    this.setState({ intervalIdRef: intervalId });
  }

  signInWithPhoneNumber = () => {
    this.setState({ isLoading: true });
    auth()
      .signInWithPhoneNumber("+91" + this.state.phoneNumber)
      .then((confirmResult) => {
        this.setState({
          confirm: confirmResult,
          timeRemaining: 10,
          isLoading: false,
        });
        ToastAndroid.show("Code has been sent!", ToastAndroid.SHORT);
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.log(error);
      });
  };

  handleResendOTP = async () => {
    try {
      await auth().verifyPhoneNumber("+91" + phoneNumber);
      console.log("OTP resent successfully");
      ToastAndroid.show("Code has been sent!", ToastAndroid.SHORT);
      setTimeRemaining(15);
      startTimer();
    } catch (error) {
      console.log(error);
    }
  };

  confirmCode = () => {
    this.state.confirm
      .confirm(this.state.code)
      .then(() => {
        console.log("Invalid.");
        this.props.navigation.navigate("HomeScreen");
      })
      .catch(() => {
        console.log("Invalid code.");
      });
  };

  PhoneScreen = () => {
    return (
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.06)"]}
        locations={[0, 1]}
        style={styles.subcontainer}
      >
        <Loader visible={this.state.isLoading} />
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.title}>Welcome To Machaxi</Text>
          </View>
          <Image
            source={require("../../images/login_user.png")}
            style={{
              width: 300,
              height: 260,
              marginLeft: -110,
              marginTop: -70,
            }}
          />
          {/* <SvgUri
            width="200"
            height="200"
            source={require("../../images/svg/gift.svg")}
          /> */}
        </View>
        <View>
          <View
            style={{
              marginLeft: 30,
              width: 100,
              backgroundColor: "transparent",
              zIndex: 1,
            }}
          >
            <Text style={styles.subtext}>Mobile Number</Text>
          </View>
          <View style={styles.inputview}>
            <TextInput
              style={styles.input}
              value={this.state.phoneNumber}
              keyboardType="number-pad"
              placeholder="Enter the Mobile Number"
              placeholderTextColor="#BFBFBF"
              maxLength={10}
              onChangeText={(value) => {
                this.setState({ phoneNumber: value });
              }}
            />
          </View>
        </View>
        <CustomButton
          name={"Continue "}
          height={50}
          available={this.state.phoneNumber.length === 10}
          onPress={this.signInWithPhoneNumber}
        />
      </LinearGradient>
    );
  };

  OTPScreen = () => {
    const minutes = Math.floor(this.state.timeRemaining / 60);
    const seconds = this.state.timeRemaining % 60;

    return (
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.06)"]}
        locations={[0, 1]}
        style={[styles.subcontainer, { height: 500, paddingVertical: 10 }]}
      >
        <View style={{ flexDirection: "row" }}>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.setState({ confirm: null });
              }}
            >
              <Image
                source={require("../../images/playing/back.png")}
                style={{
                  width: 15,
                  height: 13,
                  color: "#A3A3A3",
                  marginVertical: 10,
                }}
              />
            </TouchableOpacity>

            <Text style={styles.otptitle}>Enter OTP</Text>
            <Text style={styles.otpsubtext}>
              Please enter the code we just sent to {this.state.phoneNumber} to
              proceed
            </Text>
          </View>
          <Image
            source={require("../../images/otp_user.png")}
            style={{
              width: 300,
              height: 280,
              marginLeft: -130,
              marginTop: -110,
            }}
          />
        </View>
        <View style={{ marginTop: -40, marginHorizontal: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.subtext}>Enter OTP in </Text>
            <Text style={[styles.subtext, { color: "#F2AE4D" }]}>
              {`${minutes
                .toString()
                .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
            </Text>
          </View>
          <CodeInput
            className="border-box"
            keyboardType="numeric"
            activeColor="#E8AC43"
            inactiveColor="blue"
            inputPosition="left"
            cellBorderWidth={1}
            space={10}
            secureTextEntry={true}
            autoFocus={true}
            codeLength={6}
            size={40}
            onFulfill={(cod) => this.setState({ code: cod })}
            containerStyle={{
              height: 60,
              flex: 0,
            }}
            codeInputStyle={{ color: "#C09345", fontSize: 18 }}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.subtext}>Didn’t receive OTP </Text>
            <TouchableOpacity>
              <Text style={[styles.subtext, { color: "#426DEE" }]}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginBottom: -20 }}>
          <CustomButton
            name={"Confirm"}
            height={50}
            available={true}
            onPress={this.confirmCode}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.subtext}>Unable to Sign up | </Text>
          <TouchableOpacity>
            <Text style={[styles.subtext, { color: "#426DEE" }]}>
              {"  "}Contact us
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.confirm == null && this.PhoneScreen()}
        {this.state.confirm && this.OTPScreen()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
    alignItems: "center",
    backgroundColor: "rgba(16, 16, 16, 0.7)",
  },
  subcontainer: {
    width: "90%",
    height: 460,
    marginBottom: 40,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 15,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
  },
  input: {
    paddingHorizontal: 20,
    fontFamily: "Nunito-Regular",
    fontWeight: "400",
    color: "#BFBFBF",
  },
  inputview: {
    marginTop: -9,
    borderColor: "#FCB550",
    borderRadius: 26,
    borderWidth: 1,
    height: 50,
  },
  title: {
    width: 200,
    textAlign: "center",
    fontSize: 34,
    fontFamily: "Nunito-Bold",
    fontWeight: "800",
    color: "#E8AC43",
    marginVertical: 30,
  },
  subtext: {
    fontSize: 13,
    fontFamily: "Nunito-Regular",
    fontWeight: "700",
    color: "#D9D9D9",
  },
  otptitle: {
    fontSize: 26,
    fontFamily: "Nunito-Bold",
    fontWeight: "800",
    color: "#E8AC43",
  },
  otpsubtext: {
    fontSize: 14,
    width: 200,
    fontFamily: "Nunito-Regular",
    fontWeight: "400",
    color: "#E2E2E2",
  },
});

export default LoginSceen;

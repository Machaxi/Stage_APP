import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Picker,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../components/custom/CustomButton";
import CodeInput from "react-native-confirmation-code-input";
import auth from "@react-native-firebase/auth";
import Loader from "../../components/custom/Loader";
import SvgUri from "react-native-svg-uri";
import AsyncStorage from "@react-native-community/async-storage";
import { getFirebaseCheck, PUSH_TOKEN, ONE_SIGNAL_USERID } from '../BaseComponent';
import { doLogin, createUser } from '../../redux/reducers/loginReducer';
import { connect } from 'react-redux';

class LoginSceen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      name: "",
      userid: "",
      gender: "Select Gender",
      confirm: null,
      prosedenext: false,
      timeRemaining: 120,
      code: "",
      isLoading: false,
      loginsuccess: false,
      showscreen: false,
      firebase_token: "",
      ONE_SIGNAL_USERID: "",
      userDetails: "",
      header: "",
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
    this.signcheck();
  }

  componentWillUnmount() {
    clearInterval(this.intervalIdRef.current);
  }

  signcheck = async () => {
    const userlogin = await AsyncStorage.getItem("user_name");
    let ONE_SIGNAL = await AsyncStorage.getItem(ONE_SIGNAL_USERID);
    let fcm_token = await AsyncStorage.getItem(PUSH_TOKEN);
    this.setState({ ONE_SIGNAL_USERID: ONE_SIGNAL, firebase_token: fcm_token });
    if (userlogin != null && userlogin.length > 3) {
      this.props.navigation.navigate("tabBarMainScreen");
    } else {
      this.setState({ showscreen: true });
    }
  };

  signInWithPhoneNumber = () => {
    this.setState({ isLoading: true });
    auth()
      .signInWithPhoneNumber("+91" + this.state.phoneNumber)
      .then((confirmResult) => {
        this.setState({
          confirm: confirmResult,
          timeRemaining: 120,
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
        auth().currentUser.getIdToken(true).then((token) => {
          console.log("token   ", token)
          this.signIn(token)
        })
      })
      .catch(() => {
        ToastAndroid.show("Invalid Code", ToastAndroid.SHORT);
        console.log("Invalid code.");
      });
  };

  confirmLogin = () => {
    var dataDic = {};
    var dict = {};
    dict['id'] = this.state.userDetails["user"].id;
    dict['name'] = this.state.name;
    dict['genderType'] = this.state.gender;

    dataDic['data'] = dict;
    console.log(dataDic);

    this.props.createUser(dataDic, this.state.header).then(() => {
      console.log(' user response payload ' + JSON.stringify(this.props.data));
      console.log(' user response payload ' + JSON.stringify(this.props.data.createUser));
      let user = JSON.stringify(this.props.data.createUser);
      console.log('doLogin-payload ' + JSON.stringify(user));
      let userResponce = JSON.parse(user)
      if (userResponce.success == true) {
        AsyncStorage.setItem("user_name", this.state.name);
        AsyncStorage.setItem("user_gender", this.state.gender);
        // this.props.navigation.navigate("HomeScreen");
      }
    }).catch((response) => {
      console.log(response);
    })
  }

  signIn = (token) => {
    let os = "IOS"
    if (Platform.OS === 'android') {
      os = "android";
    }
    let fcm_token = this.state.firebase_token
    let ONE_SIGNAL_USERID = this.state.ONE_SIGNAL_USERID
    var dataDic = {};
    var dict = {};
    dict['phone_number'] = "+91" + this.state.phoneNumber;//"+919550042123"//
    dict['login_type'] = "MOBILE";
    dict['firebase_token'] = token;
    dict['device_type'] = os;
    dict['app_version'] = '1.1.0';
    dict['fcm_token'] = fcm_token;
    dict['ONE_SIGNAL_USERID'] = ONE_SIGNAL_USERID;
    dict['one_signal_device_id'] = ONE_SIGNAL_USERID;
    dict['has_firebase_check'] = getFirebaseCheck();

    dataDic['data'] = dict;
    console.log(dict);

    this.props.doLogin(dataDic).then(() => {
      console.log(' user response payload ' + JSON.stringify(this.props.data));
      console.log(' user response payload ' + JSON.stringify(this.props.data.user));
      let user = JSON.stringify(this.props.data.user);
      console.log('doLogin-payload ' + JSON.stringify(user));
      let userResponce = JSON.parse(user)

      if (userResponce.success == true) {
        var userData = userResponce['data'];
        this.setState({ userDetails: userData });
        this.getHeader();
        if (userData.is_existing_user == false) {
        this.setState({ loginsuccess: true });
        } else if (userData["user"].name == "NA") {
          this.setState({ loginsuccess: true });
        }else {
          AsyncStorage.setItem("user_name", userData["user"].name);
          console.log(userData["user"].name);
          this.props.navigation.navigate("tabBarMainScreen");
        }
      }
    }).catch((response) => {
      console.log(response);
    })
  }

  getHeader = async () => {
    const header = await AsyncStorage.getItem("header");
    this.setState({ header: header });
    console.log(header);
  }

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
            <Text style={styles.otpsubtext}>Premium Sports Centres</Text>
          </View>
          <Image
            source={require("../../images/login_user.png")}
            style={{
              width: 300,
              height: 260,
              marginLeft: -120,
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
          <LinearGradient
            colors={["rgba(94, 94, 94, 0.6)", "rgba(94, 94, 94, 1)", "rgba(94, 94, 94, 0.6)"]}
            locations={[0, 0.5, 1]}
            style={{
              marginLeft: 30,
              width: 120,
              zIndex: 1,
            }}
          >
            <Text style={styles.subtext}>  Mobile Number</Text>
          </LinearGradient>
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
          image={require("../../images/playing/arrow_go.png")}
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
            <Text style={[styles.otpsubtext, { width: 200 }]}>
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
            {this.state.timeRemaining > 0 ? (
              <Text style={[styles.subtext, { color: "#F2AE4D" }]}>
                {`${minutes
                  .toString()
                  .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
              </Text>
            ) : (
              <Text>00:00</Text>
            )}
          </View>
          <CodeInput
            className="border-box"
            keyboardType="numeric"
            activeColor="#E8AC43"
            inactiveColor="#7C7C7C"
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
            <Text style={[styles.otpsubtext, { width: 200 }]}>Didn’t receive OTP </Text>
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
          <Text style={styles.otpsubtext}>Unable to Sign up | </Text>
          <TouchableOpacity>
            <Text style={[styles.subtext, { color: "#426DEE" }]}>
              {"  "}Contact us
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };

  NameScreen = () => {
    return (
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.06)"]}
        locations={[0, 1]}
        style={styles.subcontainer}
      >
        <Loader visible={this.state.isLoading} />
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.title}>Hello NewBee!</Text>
            <Text style={styles.otpsubtext}>Welcome to Machaxi</Text>
          </View>
          <Image
            source={require("../../images/otp_user.png")}
            style={{
              width: 300,
              height: 280,
              marginTop: -110,
              marginLeft: -130,
            }}
          />
        </View>
        <View>
        <LinearGradient
            colors={["rgba(94, 94, 94, 0.6)", "rgba(94, 94, 94, 1)", "rgba(94, 94, 94, 0.6)"]}
            locations={[0, 0.5, 1]}
            style={{
              marginLeft: 30,
              width: 100,
              zIndex: 1,
            }}
          >
            <Text style={styles.subtext}>Player Name</Text>
          </LinearGradient>
          <View style={styles.inputview}>
            <TextInput
              style={styles.input}
              value={this.state.name}
              placeholder="Enter the Player Name"
              placeholderTextColor="#BFBFBF"
              maxLength={10}
              onChangeText={(value) => {
                this.setState({ name: value });
              }}
            />
          </View>
          <LinearGradient
            colors={["rgba(94, 94, 94, 0.6)", "rgba(94, 94, 94, 1)", "rgba(94, 94, 94, 0.6)"]}
            locations={[0, 0.5, 1]}
            style={{
              marginLeft: 30,
              width: 100,
              zIndex: 1,
            }}
          >
            <Text style={styles.subtext}>Player Gender</Text>
          </LinearGradient>
          <View style={styles.inputview}>
            {/* <TextInput
              style={styles.input}
              value={this.state.gender}
              placeholder="Enter the Player Gender"
              placeholderTextColor="#BFBFBF"
              maxLength={10}
              onChangeText={(value) => {
                this.setState({ gender: value });
              }}
            /> */}
            <Picker
              selectedValue={this.state.gender}
              style={styles.dropdown}
              onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}
            >
              <Picker.Item style={styles.dropdownitem} label="   Select Gender" value="Select Gender" />
              <Picker.Item style={styles.dropdownitem} label="   Male" value="MALE" />
              <Picker.Item style={styles.dropdownitem} label="   Female" value="FEMALE" />
            </Picker>
          </View>
        </View>
        <CustomButton
          name={"Submit"}
          height={50}
          available={this.state.name.length > 4 && this.state.gender != "Select Gender"}
          onPress={this.confirmLogin}
        />
      </LinearGradient>
    );
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          this.state.showscreen && {
            backgroundColor: "rgba(16, 16, 16, 0.9)",
          },
        ]}
      >
        {this.state.showscreen &&
          this.state.confirm == null &&
          this.PhoneScreen()}
        {this.state.confirm && !this.state.loginsuccess && this.OTPScreen()}
        {this.state.loginsuccess && this.NameScreen()}
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
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  input: {
    paddingHorizontal: 20,
    fontFamily: "Nunito-400",
    color: "#BFBFBF",
  },
  dropdown: {
    height: 50,
    width: '100%',
    paddingHorizontal: 30,
    fontFamily: "Nunito-400",
    color: "#BFBFBF",
  },
  dropdownitem: {
    fontSize: 16,
    fontFamily: "Nunito-400",
    color: "#BFBFBF",
  },
  inputview: {
    marginTop: -9,
    borderColor: "#FCB550",
    borderRadius: 26,
    borderWidth: 1,
    height: 50,
    marginBottom: 20,
  },
  title: {
    width: 220,
    fontSize: 34,
    fontFamily: "Nunito-800",
    color: "#E8AC43",
    marginTop: 30,
  },
  subtext: {
    fontSize: 13,
    fontFamily: "Nunito-700",
    color: "#D9D9D9",
  },
  otptitle: {
    fontSize: 26,
    fontFamily: "Nunito-800",
    color: "#E8AC43",
  },
  otpsubtext: {
    fontSize: 14,
    fontFamily: "Nunito-400",
    color: "#E2E2E2",
  },
});

const mapStateToProps = state => {
  return {
    data: state.LoginReducer,
  };
};
const mapDispatchToProps = {
  doLogin, createUser
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginSceen);

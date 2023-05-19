import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../components/custom/CustomButton";
import auth from "@react-native-firebase/auth";
import Loader from "../../components/custom/Loader";
import AsyncStorage from "@react-native-community/async-storage";
import ModalDropdown from "react-native-modal-dropdown";
import {
  getFirebaseCheck,
  PUSH_TOKEN,
  ONE_SIGNAL_USERID,
  getShowLoginByName,
} from "../BaseComponent";
import {
  doLogin,
  createUser,
  doLoginTest,
} from "../../redux/reducers/loginReducer";
import { connect } from "react-redux";
import { Nunito_ExtraBold } from "../util/fonts";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import { storeData, getData, onSignIn } from "../../components/auth";
import { COACH, PLAYER } from "../../components/Constants";

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
      timeRemaining: 30,
      code: "",
      isLoading: false,
      loginsuccess: false,
      showscreen: true,
      firebase_token: "",
      ONE_SIGNAL_USERID: "",
      userDetails: "",
      header: "",
      displayImage: "",
      displayTop: -220,
      token: null,
      isKeyboardOpen: false,
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
    this.setState({
      intervalIdRef: intervalId,
      displayImage: require("../../images/login_user.png"),
    });
    this.signcheck();
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
  }

  keyboardDidShow = () => {
    this.setState({ isKeyboardOpen: true });
  };

  keyboardDidHide = () => {
    this.setState({ isKeyboardOpen: false });
  };
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    clearInterval(this.intervalIdRef.current);
  }

  signcheck = async () => {
    let ONE_SIGNAL = await AsyncStorage.getItem(ONE_SIGNAL_USERID);
    let fcm_token = await AsyncStorage.getItem(PUSH_TOKEN);
    this.setState({ ONE_SIGNAL_USERID: ONE_SIGNAL, firebase_token: fcm_token });
  };

  signInWithPhoneNumber = () => {
    this.setState({ isLoading: true });
    auth()
      .signInWithPhoneNumber("+91" + this.state.phoneNumber)
      .then((confirmResult) => {
        console.log("OTP ");
        console.log(confirmResult);
        this.setState({
          confirm: confirmResult,
          timeRemaining: 30,
          isLoading: false,
          displayImage: require("../../images/otp_user.png"),
          displayTop: -200,
        });
        ToastAndroid.show("Code has been sent!", ToastAndroid.SHORT);
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.log(error);
        ToastAndroid.show("Invalid Phone Number", ToastAndroid.SHORT);
      });
  };

  handleResendOTP = async () => {
    let verificationId;
    auth()
      .verifyPhoneNumber("+91" + this.state.phoneNumber, true)
      .then((id) => {
        verificationId = id;
        return auth().signInWithPhoneNumber(verificationId);
      })
      .then((confirmResult) => {
        this.setState({ confirm: confirmResult, timeRemaining: 30 });
        console.log(confirmResult);
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ timeRemaining: 30 });
    // auth()
    //   .verifyPhoneNumber("+91" + this.state.phoneNumber, true)
    //   .then((confirmResult) => {
    //     console.log("OTP resent successfully");
    //     console.log(confirmResult);
    //     ToastAndroid.show("Code has been sent!", ToastAndroid.SHORT);
    //     this.setState({ timeRemaining: 30 });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  confirmCode = () => {
    this.setState({ isLoading: true });
    this.state.confirm
      .confirm(this.state.code)
      .then(() => {
        auth()
          .currentUser.getIdToken(true)
          .then((token) => {
            this.signIn(token);
            this.setState({ token: token });
          });
      })
      .catch(() => {
        this.setState({ isLoading: false });
        ToastAndroid.show("Invalid OTP", ToastAndroid.SHORT);
        console.log("Invalid code.");
      });
  };

  confirmLogin = () => {
    var dataDic = {};
    var dict = {};
    dict["id"] = this.state.userDetails["user"].id;
    dict["name"] = this.state.name;
    dict["genderType"] = this.state.gender;
    dataDic["data"] = dict;

    this.props
      .createUser(dataDic, this.state.header)
      .then(() => {
        console.log(
          " user response payload " + JSON.stringify(this.props.data)
        );
        console.log(
          " user response payload " + JSON.stringify(this.props.data.createUser)
        );
        let user = JSON.stringify(this.props.data.createUser);
        console.log("doLogin-payload " + JSON.stringify(user));
        let userResponce = JSON.parse(user);
        if (userResponce.success == true) {
          const userDetail = {
            userName: this.state.name,
            gender: this.state.gender,
            id: this.state.userDetails["user"].id,
          };
          AsyncStorage.setItem("user_details", JSON.stringify(userDetail));
          AsyncStorage.setItem("phone_number", this.state.phoneNumber);
          this.signIn(this.state.token);
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };

  signInByName = () => {
    let os = "IOS";
    if (Platform.OS === "android") {
      os = "android";
    }

    let fcm_token = this.state.firebase_token;
    let ONE_SIGNAL_USERID = this.state.ONE_SIGNAL_USERID;

    var dataDic = {};
    var dict = {};
    dict["phone_number"] = this.state.phoneNumber; //user1.phoneNumber;//"+919214088636"//
    dict["name"] = this.state.phoneNumber;
    dict["firebase_token"] = "token";
    dict["device_type"] = os;
    dict["app_version"] = "1.1.0";
    dict["fcm_token"] = fcm_token;
    dict["ONE_SIGNAL_USERID"] = ONE_SIGNAL_USERID;
    dict["one_signal_device_id"] = ONE_SIGNAL_USERID;
    dict["has_firebase_check"] = false;

    dataDic["data"] = dict;
    this.props
      .doLoginTest(dataDic)
      .then(async () => {
        let user = JSON.stringify(this.props.data.user);
        let user1 = JSON.parse(user);
        var userData = user1["data"];
        var userInfoData = userData["user"];
        await onSignIn();
        storeData("userInfo", JSON.stringify(userData));
        if (userInfoData.user_type == COACH) {
          storeData("multiple", userData.has_multiple_acadmies);
          if (
            userData.has_multiple_acadmies == false &&
            userData.academy_id != null
          ) {
            if (userData.can_book_court) {
              this.props.navigation.navigate("CoachBookHome");
            } else {
              this.props.navigation.navigate("CoachHome");
            }
          } else {
            this.props.navigation.navigate("SwitchPlayer", {
              userType: COACH,
            });
          }
        } else {
          const userDetails = {
            userName: userData["user"].name,
            gender: userData["user"].genderType,
            id: userData["user"].id,
          };
          console.log(userData["user"]);
          AsyncStorage.setItem("user_details", JSON.stringify(userDetails));
          const inputString = userData["user"].mobile_number;
          const outputString = inputString.replace("+91", "");
          AsyncStorage.setItem("phone_number", outputString);
          if (!userData.is_learn_enabled) {
            this.props.navigation.navigate("LearnHomePage");
          } else if (!userData.is_play_enabled) {
            this.props.navigation.navigate("LearnHomePage");
          } else {
            this.props.navigation.navigate("HomeDrawer");
          }
        }
      })
      .catch((response) => {
        console.log(response);
        this.progress(false);
      });
  };

  signIn = (token) => {
    let os = "IOS";
    if (Platform.OS === "android") {
      os = "android";
    }
    let fcm_token = this.state.firebase_token;
    let ONE_SIGNAL_USERID = this.state.ONE_SIGNAL_USERID;
    var dataDic = {};
    var dict = {};
    dict["phone_number"] = "+91" + this.state.phoneNumber; //"+919550042123"//
    dict["login_type"] = "MOBILE";
    dict["firebase_token"] = token;
    dict["device_type"] = os;
    dict["app_version"] = "1.1.0";
    dict["fcm_token"] = fcm_token;
    dict["ONE_SIGNAL_USERID"] = ONE_SIGNAL_USERID;
    dict["one_signal_device_id"] = ONE_SIGNAL_USERID;
    dict["has_firebase_check"] = getFirebaseCheck();

    dataDic["data"] = dict;
    console.log(dict);

    this.props
      .doLogin(dataDic)
      .then(async () => {
        let user = JSON.stringify(this.props.data.user);
        console.log("doLogin-payload" + JSON.stringify(user));
        let userResponce = JSON.parse(user);
        this.setState({ isLoading: false });
        if (userResponce.success == true) {
          var userData = userResponce["data"];
          var userInfoData = userData["user"];
          await onSignIn();
          storeData("userInfo", JSON.stringify(userData));
          this.setState({ userDetails: userData });
          this.getHeader();
          if (userData.is_existing_user == false) {
            this.setState({ loginsuccess: true });
          } else if (userData["user"].name == null) {
            this.setState({ loginsuccess: true });
          } else {
            const userDetails = {
              userName: userData["user"].name,
              gender: userData["user"].genderType,
              id: userData["user"].id,
            };
            AsyncStorage.setItem("user_details", JSON.stringify(userDetails));
            AsyncStorage.setItem("phone_number", this.state.phoneNumber);
            if (userInfoData.user_type == COACH) {
              storeData("multiple", userData.has_multiple_acadmies);
              if (
                userData.has_multiple_acadmies == false &&
                userData.academy_id != null
              ) {
                if (userData.can_book_court) {
                  this.props.navigation.navigate("CoachBookHome");
                } else {
                  this.props.navigation.navigate("CoachHome");
                }
              } else {
                this.props.navigation.navigate("SwitchPlayer", {
                  userType: COACH,
                });
              }
            } else {
              if (!userData.is_learn_enabled) {
                this.props.navigation.navigate("LearnHomePage");
              } else if (!userData.is_play_enabled) {
                this.props.navigation.navigate("LearnHomePage");
              } else {
                this.props.navigation.navigate("HomeDrawer");
              }
            }
          }
        }
      })
      .catch((response) => {
        this.setState({ isLoading: false });
      });
  };

  getHeader = async () => {
    const header = await AsyncStorage.getItem("header");
    this.setState({ header: header });
    console.log(header);
  };

  PhoneScreen = () => {
    return (
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.06)"]}
        locations={[0, 1]}
        style={[styles.subcontainer]}
      >
        <Loader visible={this.state.isLoading} />
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.title}>Welcome To Machaxi</Text>
            <Text style={styles.otpsubtext}>Premium Sports Centres</Text>
          </View>
          {Platform.OS !== "ios" && (
            <Image
              source={require("../../images/login_user.png")}
              style={{
                width: 300,
                height: 290,
                marginLeft: -130,
                marginTop: -85,
              }}
            />
          )}
        </View>
        <View>
          <Text style={styles.subtext}> Mobile Number</Text>
          <View style={styles.inputview}>
            <TextInput
              style={styles.input}
              value={this.state.phoneNumber}
              keyboardType={getShowLoginByName() ? "default" : "phone-pad"}
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
        {getShowLoginByName() ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this.signInByName();
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "Quicksand-Medium",
              }}
            >
              Login by name
            </Text>
          </TouchableOpacity>
        ) : null}
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
        <Loader visible={this.state.isLoading} />
        <View style={{ flexDirection: "row" }}>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.setState({
                  confirm: null,
                  displayImage: require("../../images/login_user.png"),
                  displayTop: -220,
                });
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
          {Platform.OS !== "ios" && (
            <Image
              source={require("../../images/otp_user.png")}
              style={{
                width: 300,
                height: 290,
                marginLeft: -130,
                marginTop: -85,
              }}
            />
          )}
        </View>
        <View style={{ marginTop: -20 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.subtext, { color: "#E2E2E2" }]}>
              Enter OTP in{" "}
            </Text>
            {this.state.timeRemaining > 0 ? (
              <Text style={[styles.subtext, { color: "#F2AE4D" }]}>
                {`${minutes
                  .toString()
                  .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
              </Text>
            ) : (
              <Text style={[styles.subtext, { color: "#F2AE4D" }]}>00:00</Text>
            )}
          </View>
          <CodeField
            value={this.state.code}
            onChangeText={(cod) => this.setState({ code: cod })}
            cellCount={6}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            secureTextEntry={true}
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={[styles.otpsubtext, { width: 200 }]}> </Text>
            <TouchableOpacity
              disabled={this.state.timeRemaining > 0}
              onPress={this.handleResendOTP}
            >
              <Text
                style={[
                  styles.subtext,
                  { color: "#BFBFBF" },
                  this.state.timeRemaining < 1 && { color: "#426DEE" },
                ]}
              >
                Resend OTP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginBottom: -20 }}>
          <CustomButton
            name={"Confirm"}
            height={50}
            available={this.state.code.length > 5}
            onPress={this.confirmCode}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.otpsubtext}>Unable to Sign up | </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL("mailto:hello@machaxi.com")}
          >
            <Text style={[styles.subtext, { color: "#426DEE" }]}>
              {"  "}Contact us
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };

  handleDropdownPress = () => {
    Keyboard.dismiss();
  };

  NameScreen = () => {
    data = [
      { label: "Male", value: "MALE" },
      { label: "Female", value: "FEMALE" },
    ];

    return (
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.06)"]}
        locations={[0, 1]}
        style={[styles.subcontainer, { height: 500 }]}
      >
        <Loader visible={this.state.isLoading} />
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.title}>Hello NewBee!</Text>
            <Text style={styles.otpsubtext}>Welcome to Machaxi</Text>
          </View>
          {Platform.OS !== "ios" && (
            <Image
              source={require("../../images/otp_user.png")}
              style={{
                width: 300,
                height: 290,
                marginLeft: -130,
                marginTop: -95,
              }}
            />
          )}
        </View>
        <View>
          <Text style={styles.subtext}> Player Name</Text>
          <View style={styles.inputview}>
            <TextInput
              style={styles.input}
              value={this.state.name}
              placeholder="Enter the Player Name"
              placeholderTextColor="#BFBFBF"
              maxLength={30}
              onChangeText={(value) => {
                this.setState({ name: value });
              }}
            />
          </View>
          <Text style={styles.subtext}> Player Gender</Text>
          <View style={[styles.inputview, { flexDirection: "row" }]}>
            <View
              style={{ flex: 1, flexDirection: "row" }}
              onTouchStart={this.handleDropdownPress}
            >
              <ModalDropdown
                options={["Male", "Female"]}
                defaultValue="Select an option"
                disabled={this.state.isKeyboardOpen}
                style={{
                  justifyContent: "center",
                  flex: 1,
                  marginHorizontal: 10,
                }}
                textStyle={{ padding: 10, fontSize: 16, color: "white" }}
                dropdownStyle={{
                  width: "75%",
                  height: 90,
                  borderRadius: 10,
                  borderColor: "#FCB550",
                  backgroundColor: "rgba(94, 94, 94, 1)",
                }}
                dropdownTextStyle={{
                  padding: 10,
                  fontSize: 16,
                  color: "white",
                  borderRadius: 10,
                  backgroundColor: "rgba(94, 94, 94, 1)",
                }}
                onSelect={(value) =>
                  this.setState({ gender: data[value].value })
                }
              />
              <View style={{ flex: 0.1, justifyContent: "center" }}>
                <Image
                  source={require("../../images/playing/arrow_down.png")}
                  style={{
                    width: 9,
                    height: 6,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <CustomButton
          name={"Submit"}
          height={50}
          available={
            this.state.name.length > 4 && this.state.gender != "Select Gender"
          }
          onPress={this.confirmLogin}
        />
      </LinearGradient>
    );
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {this.state.showscreen && (
          <LinearGradient
            colors={["#141C32", "#141A2E"]}
            // locations={[0, 1]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.headertab}
          >
            <Image
              source={require("../../images/Machaxi_logo.png")}
              style={{ width: 170, height: 28 }}
            />
          </LinearGradient>
        )}
        <View
          style={[
            styles.container,
            this.state.showscreen && {
              backgroundColor: "rgba(16, 16, 16, 0.95)",
            },
          ]}
        >
          {this.state.showscreen &&
            this.state.confirm == null &&
            this.PhoneScreen()}
          {this.state.confirm && !this.state.loginsuccess && this.OTPScreen()}
          {this.state.loginsuccess && this.NameScreen()}
          {Platform.OS === "ios" && (
            <Image
              source={this.state.displayImage}
              style={{
                width: 300,
                height: 290,
                marginBottom: this.state.displayTop,
                marginLeft: 150,
              }}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.94,
    flexDirection: "column-reverse",
    alignItems: "center",
  },
  headertab: {
    flex: 0.06,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    paddingTop: 7,
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
    fontFamily: "Nunito-Regular",
    color: "white",
  },
  dropdown: {
    height: 50,
    width: "90%",
    paddingHorizontal: 30,
    fontFamily: "Nunito-Regular",
    color: "#BFBFBF",
    marginLeft: 20,
  },
  dropdownitem: {
    fontSize: 16,
    fontFamily: "Nunito-Regular",
    color: "#BFBFBF",
  },
  inputview: {
    marginTop: 7,
    borderColor: "#FCB550",
    borderRadius: 26,
    borderWidth: 1,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
  },
  title: {
    width: 220,
    fontSize: 34,
    fontFamily: Nunito_ExtraBold,
    color: "#E8AC43",
    marginTop: 30,
  },
  heading: {
    fontSize: 22,
    fontFamily: "Nunito-Regular",
    color: "#FFFFFF",
  },
  subtext: {
    fontSize: 13,
    fontFamily: "Nunito-Bold",
    color: "#E8AC43",
  },
  otptitle: {
    fontSize: 26,
    fontFamily: Nunito_ExtraBold,
    color: "#E8AC43",
  },
  otpsubtext: {
    fontSize: 14,
    fontFamily: "Nunito-Regular",
    color: "#E2E2E2",
  },
  codeFieldRoot: {
    marginVertical: 10,
  },
  cell: {
    height: 40,
    width: 30,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#7C7C7C",
    fontSize: 14,
    textAlign: "center",
    color: "#C09345",
    marginHorizontal: 10,
    lineHeight: 38,
  },
  focusCell: {
    borderColor: "#E8AC43",
  },
});

const mapStateToProps = (state) => {
  return {
    data: state.LoginReducer,
  };
};
const mapDispatchToProps = {
  doLogin,
  createUser,
  doLoginTest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginSceen);

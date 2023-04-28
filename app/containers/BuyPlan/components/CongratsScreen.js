import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../../components/custom/CustomButton";
import { Nunito_Bold, Nunito_SemiBold } from "../../util/fonts";
import { doLoginTest } from "../../../redux/reducers/loginReducer";
import { PUSH_TOKEN, ONE_SIGNAL_USERID } from "../../BaseComponent";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import { storeData } from "../../../components/auth";

class CongratsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ONE_SIGNAL_USERID: "",
      firebase_token: "",
      userData: null,
    };
  }

  componentDidMount() {
    this.signcheck();
  }

  signcheck = async () => {
    let ONE_SIGNAL = await AsyncStorage.getItem(ONE_SIGNAL_USERID);
    let fcm_token = await AsyncStorage.getItem(PUSH_TOKEN);
    const userDetailsJson = await AsyncStorage.getItem("user_details");
    const userDetails = JSON.parse(userDetailsJson);
    this.setState({
      ONE_SIGNAL_USERID: ONE_SIGNAL,
      firebase_token: fcm_token,
      userData: userDetails,
    });
  };

  signInByName = () => {
    let os = "IOS";
    if (Platform.OS === "android") {
      os = "android";
    }
    var dataDic = {};
    var dict = {};
    dict["phone_number"] = this.state.userData.userName;
    dict["name"] = this.state.userData.userName;
    dict["firebase_token"] = "token";
    dict["device_type"] = os;
    dict["app_version"] = "1.1.0";
    dict["fcm_token"] = this.state.firebase_token;
    dict["ONE_SIGNAL_USERID"] = this.state.ONE_SIGNAL_USERID;
    dict["one_signal_device_id"] = this.state.ONE_SIGNAL_USERID;
    dict["has_firebase_check"] = false;

    dataDic["data"] = dict;
    this.props
      .doLoginTest(dataDic)
      .then(async () => {
        let user = JSON.stringify(this.props.data.user);
        let user1 = JSON.parse(user);
        var userData = user1["data"];
        storeData("userInfo", JSON.stringify(userData));
        this.props.onPress();
      })
      .catch((response) => {
        console.log(response);
      });
  };

  render() {
    handlepress = () => {
      this.signInByName();
    };

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.06)"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.subcontainer]}
        >
          <Text style={styles.title}>Payment Done!</Text>
          <Text style={styles.subtext}>{this.props.description}</Text>
          <CustomButton
            name={this.props.buttonName}
            image={require("../../../images/playing/arrow_go.png")}
            available={true}
            onPress={handlepress}
          />
        </LinearGradient>
        <Image
          source={require("../../../images/playing/Congratulations.png")}
          style={{
            width: 220,
            height: 360,
            marginBottom: -180,
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
    height: 420,
    marginBottom: 40,
    alignItems: "center",
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
  title: {
    fontSize: 22,
    fontFamily: Nunito_Bold,
    color: "#E8AC43",
    marginBottom: 20,
    marginTop: 150,
  },
  subtext: {
    fontSize: 16,
    fontFamily: Nunito_SemiBold,
    color: "#CFCFCF",
    marginBottom: 30,
    textAlign: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    data: state.LoginReducer,
  };
};
const mapDispatchToProps = {
  doLoginTest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CongratsScreen);

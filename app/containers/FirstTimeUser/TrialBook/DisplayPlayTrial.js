import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Nunito_Regular, Nunito_SemiBold } from "../../util/fonts";
import { darkBlueVariant } from "../../util/colors";
import axios from "axios";
import { getBaseUrl } from "../../../containers/BaseComponent";
import CongratulationScreen from "./CongratulationScreen";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";

class DisplayPlayTrial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectSport: null,
      selectCenter: null,
      selectBatch: null,
      selectDate: null,
      selectTime: null,
      distance: 0,
      courtName: "",
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const header = await AsyncStorage.getItem("header");
    this.setState({ header: header }, () => {
      this.apiCall();
    });
  };

  apiCall = () => {
    axios
      .get(getBaseUrl() + "/court/trials", {
        headers: {
          "x-authorization": this.state.header,
        },
      })
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        let academiesData = userResponce["data"]["data"]["trials"][0];
        console.log(academiesData);
        const selectSports = {
          name: academiesData["booking"].sportName,
          image: academiesData["booking"].sportImage,
        };
        const courtName =
          academiesData["booking"].playingAreaName +
          " : " +
          academiesData["booking"].courtName;
        const dateObject = new Date(academiesData["booking"].date);
        this.setState({
          selectBatch: academiesData["booking"],
          selectCenter: academiesData["academy"],
          selectDate: dateObject,
          courtName: courtName,
          selectSport: selectSports,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  dateCheck = () => {
    const currentDate = new Date();
    const targetTime = moment(this.state.selectBatch.endTime, "HH:mm:ss");
    const currentTime = moment();
    console.log("olla");

    if (this.state.selectDate.getDate() > currentDate.getDate()) {
      return true;
    } else {
      const noTouch = currentTime.isSameOrBefore(targetTime);
      return noTouch;
    }
  };

  hadleBackPress = () => {
    this.props.navigation.goBack();
  };

  render() {
    if (this.state.selectBatch == null) {
      return (
        <LinearGradient
          colors={[darkBlueVariant, darkBlueVariant]}
          locations={[0, 1]}
          style={styles.container}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.insideText}>No booking available</Text>
          </View>
        </LinearGradient>
      );
    }

    const datevalue = this.dateCheck();
    return (
      <LinearGradient
        colors={[darkBlueVariant, darkBlueVariant]}
        locations={[0, 1]}
        style={styles.container}
      >
        {datevalue ? (
          <CongratulationScreen
            title="Playing Trial"
            selectCenter={this.state.selectCenter}
            selectSport={this.state.selectSport}
            selectDate={this.state.selectDate}
            selectBatch={this.state.selectBatch}
            distance={this.state.distance}
            courtName={this.state.courtName}
            onPressBack={this.hadleBackPress}
          />
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.insideText}>No booking available</Text>
          </View>
        )}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 27,
  },
  shopItem: {
    flexDirection: "row",
    borderRadius: 8,
    alignItems: "center",
    height: 150,
    marginVertical: 10,
  },
  shop: {
    color: "transparent",
    fontSize: 94,
    fontFamily: Nunito_Regular,
  },
  image: {
    marginLeft: 10,
    width: 111,
    height: 111,
    marginVertical: 7,
  },
  shadowimage: {
    width: 85,
    height: 4,
    marginLeft: 3,
  },
  insideText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 17,
    color: "#F3F2F5",
    fontFamily: Nunito_SemiBold,
  },
});
export default DisplayPlayTrial;

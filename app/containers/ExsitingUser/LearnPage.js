import React, { Component } from "react";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { getBaseUrl } from "../BaseComponent";
import CoachScreen from "../FirstTimeUser/CoachScreen";
import PlayScreen from "../play/PlayScreen";

class LearnPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      header: "",
      learnData: null,
      learn_enabled: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const header = await AsyncStorage.getItem("header");
    const learn_enabled = await AsyncStorage.getItem("learn_enabled");
    this.setState({ header: header, learn_enabled: learn_enabled });
    this.apiCall();
  };

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
        this.setState({
          learnData: batchData["learn"],
          playData: batchData["play"],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <LinearGradient
        colors={["#332B70", "#24262A"]}
        locations={[0, 1]}
        style={{ flex: 1 }}
      >
        {this.state.learnData && (
          <CoachScreen
            onPressPlan={() => {
              this.props.navigation.navigate("CoachingPlan");
            }}
            learnData={this.state.learnData}
            onPressTrail={() => {
              this.props.navigation.navigate("BookTrail");
            }}
          />
        )}
      </LinearGradient>
    );
  }
}

export default LearnPage;

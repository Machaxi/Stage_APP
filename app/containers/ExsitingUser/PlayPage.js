import React, { Component } from "react";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { getBaseUrl } from "../BaseComponent";
import PlayerScreen from "../FirstTimeUser/PlayerScreen";
import PlayScreen from "../play/PlayScreen";

class PlayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "",
      playData: null,
      play_enabled: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const header = await AsyncStorage.getItem("header");
    const play_enabled = await AsyncStorage.getItem("play_enabled");
    console.log(play_enabled);
    this.setState({ header: header, play_enabled: play_enabled });
    this.apiCall();
  };

  apiCall = () => {
    console.log(this.state.header);
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
        {this.state.playData &&
          this.state.play_enabled &&
          this.state.play_enabled != "play_enabled" && (
            <PlayerScreen
              onPress={() => {
                AsyncStorage.setItem("select_trial", "Playing Trial");
                this.props.navigation.navigate("BookPlayTrail");
              }}
              playData={this.state.playData}
            />
          )}
        {this.state.playData &&
          this.state.play_enabled &&
          this.state.play_enabled == "play_enabled" && <PlayScreen />}
      </LinearGradient>
    );
  }
}

export default PlayPage;

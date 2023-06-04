import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../components/custom/CustomButton";
import HeaderContentComponent from "../../components/custom/HeaderContentComponent";
import PlayPass from "../../components/custom/PlayPass";
import AsyncStorage from "@react-native-community/async-storage";
import { Nunito_SemiBold } from "../util/fonts";
import LoadingIndicator from "../../components/molecules/loadingIndicator";
import axios from "axios";
import { getBaseUrl } from "../BaseComponent";

class PlayerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingSuccess: "",
      playData: null,
      playPlanData: null,
      header: "",
    };
  }

  componentDidMount() {
    this.getValue();
    if (this.props.navigation != null) {
      this.didFocusListener = this.props.navigation.addListener(
        "didFocus",
        this.onScreenFocus
      );
    }
  }

  onScreenFocus = () => {
    console.log("working");
    this.apiCall();
  };

  componentWillUnmount() {
    if (this.props.navigation != null) {
      this.didFocusListener.remove();
    }
  }

  getValue = async () => {
    const header = await AsyncStorage.getItem("header");
    this.setState({ header: header });
    this.apiCall();
  };

  apiCall = () => {
    axios
      .get(getBaseUrl() + "user/learn-play", {
        headers: {
          "x-authorization": this.state.header,
        },
      })
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        let batchData = userResponce["data"]["data"];
        this.setState({
          playData: batchData["play"],
          playPlanData: batchData["play"]["plans"],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onPressPlan = () => {
    this.props.onPressPlan(100, this.state.playPlanData);
  };

  onPlan = (index) => {
    this.props.onPressPlan(index, this.state.playPlanData);
  };

  render() {
    if (this.state.playData == null) {
      return <LoadingIndicator />;
    }

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 0.83, paddingHorizontal: 20 }}
        >
          <Image
            source={require("../../images/playing/playt.png")}
            style={{ marginBottom: 5, height: 140, width: 220 }}
          />
          <Image
            source={require("../../images/playing/play_sports.png")}
            style={{ width: "75%", height: 330, marginLeft: 50 }}
            resizeMode="cover"
          />
          <Text style={styles.header}>{this.state.playData.header}</Text>
          <View style={styles.plancontained}>
            {this.state.playData["plans"].map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.onPlan(item.id)}
              >
                <PlayPass
                  name={item.name}
                  price={item.originalPrice}
                  image={item.planIconUrl}
                />
              </TouchableOpacity>
            ))}
          </View>
          <HeaderContentComponent
            header={""}
            contents={this.state.playData["benefits"]}
            colors={"#ED6F53"}
          />
        </ScrollView>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.25)", "rgba(255, 255, 255, 0.06)"]}
          // locations={[0, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.bottomcontainer}
        >
          {this.state.playData.isTrialDisplayRequired ? (
            <View
              style={{ width: "100%", alignItems: "center", paddingTop: 8 }}
            >
              <CustomButton
                name="Book Free Trial"
                available={true}
                onPress={this.props.onPress}
              />
              <TouchableOpacity activeOpacity={0.8} onPress={this.onPressPlan}>
                <Text style={styles.insideText}>Or Buy Playing plan</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ width: "100%" }}>
              <CustomButton
                name="Buy Playing Plan"
                available={true}
                onPress={this.onPressPlan}
              />
            </View>
          )}
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  plancontained: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: -60,
  },

  insideText: {
    marginTop: 7,
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: Nunito_SemiBold,
  },
  bottomcontainer: {
    flex: 0.17,
    paddingTop: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
    color: "#ED6F53",
  },
});

export default PlayerScreen;

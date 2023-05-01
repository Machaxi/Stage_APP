import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CoachScreen from "./CoachScreen";
import PlayerScreen from "./PlayerScreen";
import ShopScreen from "./ShopScreen";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { getBaseUrl } from "../BaseComponent";
import NavigationDrawerWhite from "../../router/NavigationDrawerWhite";
import RightMenuToolbar from "../../router/RightMenuToolbar";
import { Nunito_Bold, Nunito_SemiBold } from "../util/fonts";
import RequestHeaderLeft from "../../atoms/requestHeaderLeft";

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    // title: navigation.getParam("title"),
    title: "Machaxi",
    headerTitleStyle: styles.titlestyle,
    headerStyle: {
      backgroundColor: "#21202F",
    },
    headerLeft: <RequestHeaderLeft navigation={navigation} />,
    headerRight: (
      <RightMenuToolbar
        darkThemFlow={true}
        navigationProps={navigation}
        showNotification={true}
      />
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      header: "",
      learnData: null,
      playData: null,
      playPlanData: null,
    };
  }

  componentDidMount() {
    this.getData();
    // this.props.navigation.setParams({ title: "Learn" });
    this.props.navigation.addListener("didFocus", this.onScreenFocus);
  }

  componentWillUnmount() {
    if (this.props.navigation.removeListener) {
      this.props.navigation.removeListener("didFocus", this.onScreenFocus);
    }
  }

  onScreenFocus = () => {
    this.apiCall();
  };

  getData = async () => {
    const header = await AsyncStorage.getItem("header");
    console.log(header);
    this.setState({ header: header });
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
          playPlanData: batchData["play"]["plans"],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onPressPlan = (selectPlan) => {
    const data = this.state.playPlanData;
    this.props.navigation.navigate("PlayingPlan", { data, selectPlan });
  };

  render() {
    return (
      <LinearGradient
        colors={["#051732", "#051732"]}
        // locations={[0, 1]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.container}
      >
        <View style={styles.topcontainer}>
          <View style={styles.topinside}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.setState({ currentPage: 1 });
              }}
            >
              <LinearGradient
                colors={
                  this.state.currentPage === 1
                    ? ["rgba(229, 196, 135, 0.62)", "rgba(147, 132, 105, 0.24)"]
                    : ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0)"]
                }
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[
                  styles.button,
                  { borderTopLeftRadius: 9, borderBottomLeftRadius: 9 },
                  this.state.currentPage === 1 && {
                    borderColor: "rgba(223, 193, 136, 0.42)",
                    borderRadius: 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.toptext,
                    this.state.currentPage === 1 && { color: "#FFCB6A" },
                  ]}
                >
                  Learn
                </Text>
                {this.state.currentPage === 1 && (
                  <View style={styles.onscreen} />
                )}
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.setState({ currentPage: 2 });
              }}
            >
              <LinearGradient
                colors={
                  this.state.currentPage === 2
                    ? ["rgba(229, 196, 135, 0.62)", "rgba(147, 132, 105, 0.24)"]
                    : ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0)"]
                }
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[
                  styles.button,
                  this.state.currentPage === 2 && {
                    borderColor: "rgba(223, 193, 136, 0.42)",
                    borderRadius: 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.toptext,
                    this.state.currentPage === 2 && { color: "#FFCB6A" },
                  ]}
                >
                  Play
                </Text>
                {this.state.currentPage === 2 && (
                  <View style={styles.onscreen} />
                )}
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.setState({ currentPage: 3 });
              }}
            >
              <LinearGradient
                colors={
                  this.state.currentPage === 3
                    ? ["rgba(229, 196, 135, 0.62)", "rgba(147, 132, 105, 0.34)"]
                    : ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0)"]
                }
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[
                  styles.button,
                  { borderTopRightRadius: 9, borderBottomRightRadius: 9 },
                  this.state.currentPage === 3 && {
                    borderColor: "rgba(223, 193, 136, 0.42)",
                    borderRadius: 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.toptext,
                    this.state.currentPage === 3 && { color: "#FFCB6A" },
                  ]}
                >
                  Shop
                </Text>
                {this.state.currentPage === 3 && (
                  <View style={styles.onscreen} />
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 0.92 }}>
          {this.state.learnData && this.state.currentPage === 1 && (
            <CoachScreen
              onPressPlan={() => {
                this.props.navigation.navigate("CoachingPlan");
              }}
              navigation = {this.props.navigation}
              onPressTrail={() => {
                AsyncStorage.setItem("select_trial", "Coaching Trial");
                this.props.navigation.navigate("BookTrail");
              }}
            />
          )}
          {this.state.currentPage === 2 && (
            <PlayerScreen
              onPressPlan={this.onPressPlan}
              navigation = {this.props.navigation}
              onPress={() => {
                this.props.navigation.navigate("LearnBookTrial");
              }}
              playData={this.state.playData}
            />
          )}
          {this.state.currentPage === 3 && <ShopScreen />}
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    height: 38,
    width: 98,
    alignItems: "center",
  },
  topcontainer: {
    flex: 0.08,
    paddingTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
    backgroundColor: "rgba(223, 193, 136, 0.4)",
  },
  topinside: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 9,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "rgba(156, 156, 156, 0.33)",
  },
  toptext: {
    paddingTop: 7,
    fontSize: 14,
    color: "#ECECEC",
    fontFamily: Nunito_SemiBold,
  },
  onscreen: {
    width: 38,
    height: 3,
    backgroundColor: "#FFCB6A",
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    marginTop: 7,
  },
  headerStyle: {
    color: "#191919",
    fontFamily: "Quicksand-Medium",
    fontWeight: "400",
    textAlign: "center",
    fontSize: 16,
    flexGrow: 1,
    alignSelf: "center",
  },
  titlestyle: {
    color: "#F2F2F2",
    fontFamily: Nunito_Bold,
    textAlign: "center",
    fontSize: 20,
    flexGrow: 1,
    alignSelf: "center",
  },
});

export default HomeScreen;

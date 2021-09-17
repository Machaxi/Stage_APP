import React from "react";
import RNPickerSelect from "react-native-picker-select";
import * as Progress from "react-native-progress";

import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { CustomeCard } from "../../components/Home/Card";
import { Card } from "react-native-paper";
import { getData, storeData } from "../../components/auth";
import {
  getCoachSWitcher,
  getPlayerSWitcher,
} from "../../redux/reducers/switchReducer";
import {
  getOtherPlayerDashboard,
  getOtherPlayerWithoutAcademy,
} from "../../redux/reducers/dashboardReducer";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import PlayerHeader from "../../components/custom/PlayerHeader";
import BaseComponent, { defaultStyle } from "../BaseComponent";
import CustomAnimationProgress from "../../components/custom/CustomAnimationProgress";
import { PLAYER, PARENT } from "../../components/Constants";
import CustomProgres from "../../components/custom/CustomProgress";
import MyStats from "../../components/custom/MyStats";
var deviceWidth = Dimensions.get("window").width - 20;

class OtherPlayerDetails extends BaseComponent {
  constructor(props) {
    super(props);
    this.inputRefs = {
      acedemic: null,
    };
    this.state = {
      userData: null,
      country: undefined,
      player_profile: null,
      strenthList: null,
      showChallenge: false,
      sportsOptionsVisible: false,
      currentSportName: "",
      isStatsLoading: false,
    };
  }

  componentDidMount() {
    getData("header", (value) => {
      console.log("header", value);
    });
    let academy_id = this.props.navigation.getParam("academy_id", "");
    let player_id = this.props.navigation.getParam("player_id", "");
    let is_fixture = this.props.navigation.getParam("fixture", false);

    if (is_fixture) {
      this.fetchWithoutAcademy(player_id);
    } else {
      //alert('academy ' + academy_id)
      if (academy_id == "") {
        console.log("academy_id", academy_id);
        getData("userInfo", (value) => {
          console.log("userInfo");
          let userData = JSON.parse(value);
          let user_academy_id = userData["academy_id"];
          let id = userData["player_id"];

          if (
            (id != player_id && userData.user["user_type"] == PLAYER) ||
            userData.user["user_type"] == PARENT
          ) {
            if (user_academy_id == academy_id) {
              this.setState({
                showChallenge: true,
              });
            }
          }

          this.fetch(user_academy_id, player_id);
        });
      } else {
        getData("userInfo", (value) => {
          let userData = JSON.parse(value);
          console.log("userData=>", JSON.stringify(userData));
          let user_academy_id = userData["academy_id"];
          let id = userData["player_id"];

          if (
            (id != player_id && userData.user["user_type"] == PLAYER) ||
            userData.user["user_type"] == PARENT
          ) {
            if (user_academy_id == academy_id) {
              this.setState({
                showChallenge: true,
              });
            }
          }
        });
        this.fetch(academy_id, player_id);
      }

      // if (academy_id == '' || player_id == '') {
      //     alert('player id is missing')
      // } else {

      // }

      // console.log("PlayerDashboard academy_id=" + academy_id + " player_id" + player_id);
    }
  }

  fetch(academy_id, player_id) {
    console.log(
      "PlayerDashboard academy_id=" + academy_id + " player_id" + player_id
    );
    this.state.academy_id = academy_id;
    global.SELECTED_PLAYER_ID = player_id;
    this.getPlayerDashboardData(
      academy_id,
      player_id,
      this.state.currentSportId
    );
  }

  fetchWithoutAcademy(user_id) {
    console.log("fetchWithoutAcademy " + user_id);
    getData("header", (value) => {
      console.log("header", value);
      this.props
        .getOtherPlayerWithoutAcademy(value, user_id)
        .then(() => {
          // console.log(' user response payload ' + JSON.stringify(this.props.data));
          // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
          let user = JSON.stringify(this.props.data.dashboardData);
          console.log(" user getOtherPlayerDashboard " + user);
          let user1 = JSON.parse(user);

          if (user1.success == true) {
            this.setState({
              player_profile: user1.data["player_profile"],
              strenthList: user1.data.player_profile["stats"],
            });
          }
        })
        .catch((response) => {
          //handle form errors
          console.log(response);
        });
    });
  }

  getUserDashboard(player_id) {
    this.props
      .getOtherPlayerDashboard(academy_id, player_id)
      .then(() => {
        // console.log(' user response payload ' + JSON.stringify(this.props.data));
        // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
        let user = JSON.stringify(this.props.data.dashboardData);
        console.log(" user getOtherPlayerDashboard " + user);
        let user1 = JSON.parse(user);

        if (user1.success == true) {
          this.setState({
            player_profile: user1.data["player_profile"],
            strenthList: user1.data.player_profile["stats"],
          });
        }
      })
      .catch((response) => {
        //handle form errors
        console.log(response);
      });
  }

  getPlayerDashboardData(academy_id, player_id, sport_id) {
    getData("header", (value) => {
      this.props
        .getOtherPlayerDashboard(academy_id, player_id, value, sport_id)
        .then(() => {
          // console.log(' user response payload ' + JSON.stringify(this.props.data));
          // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
          let user = JSON.stringify(this.props.data.dashboardData);
          console.log(" user getOtherPlayerDashboard " + user);
          let user1 = JSON.parse(user);

          //Getting Sports Data
          let sportsList, currentSportId, currentSportName;

          if (user1.data["sports"] != null) {
            sportsList = user1.data["sports"].map((item) => {
              return {
                label: item.name,
                value: item.id,
              };
            });
            this.setState({ sportsList });
          }
          //Getting current Sport Id
          if (user1.data["player_profile"] != null) {
            currentSportId = user1.data["player_profile"].sport_id;

            currentSportName = sportsList.find((item) => {
              return item.value == currentSportId;
            }).label;

            this.setState({
              currentSportId,
            });
          }

          if (user1.success == true) {
            this.setState({
              player_profile: user1.data["player_profile"],
              strenthList: user1.data.player_profile["stats"],
            });
          }
          this.setState({
            isStatsLoading: false,
          });
        })
        .catch((response) => {
          //handle form errors
          this.setState({ isStatsLoading: false });
          console.log(response);
        });
    });
  }

  onSportItemSelected = (item) => {
    console.log("ON SPORTS", item);
    this.setState({ isStatsLoading: true });
    const currentSportId = item.value;
    this.getPlayerDashboardData(
      this.state.academy_id,
      global.SELECTED_PLAYER_ID,
      currentSportId
    );
    this.setState({
      currentSportId,
      sportsOptionsVisible: false,
    });
  };
  onStatItemClicked = (item) => {};

  render() {
    console.log("other player detail component");
    this.state.showChallenge = false;
    if (this.props.data.loading && !this.state.player_profile) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#67BAF5" />
        </View>
      );
    }
    if (this.state.player_profile) {
      const {
        name,
        academy_name,
        badge,
        rank,
        score,
        player_level,
        reward_point,
        player_category,
        operations,
      } = this.state.player_profile;

      return (
        <View style={{ flex: 1, marginTop: 0, backgroundColor: "#F7F7F7" }}>
          <ScrollView
            style={{ flex: 1, marginTop: 0, backgroundColor: "#F7F7F7" }}
          >
            <PlayerHeader player_profile={this.state.player_profile} />

            {/* <View style={{ margin: 10 }}>
                        <CustomeCard>
                            <Text style={{ fontSize: 14, margin: 10 }}>My Stats </Text>
                            <FlatList
                                data={this.state.strenthList}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => item.id}
                            />
                        </CustomeCard>
                    </View> */}

            {this.state.showChallenge && (
              <View style={styles.confirmBtnOuter}>
                <Text
                  style={[styles.rounded_button]}
                  onPress={() => {
                    global.opponentPlayerDetails = this.state.player_profile;
                    this.props.navigation.navigate("OpponentList");
                  }}
                >
                  Challenge
                </Text>
              </View>
            )}

            {!this.state.player_profile.is_stats_hidden ? (
              <MyStats
                data={this.state.sportsList}
                currentSportId={this.state.currentSportId}
                isStatsLoading={this.state.isStatsLoading}
                strenthList={this.state.strenthList}
                onSportItemSelected={this.onSportItemSelected}
                onStatItemClicked={this.onStatItemClicked}
              />
            ) : null}
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        />
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.DashboardReducer,
  };
};
const mapDispatchToProps = {
  getOtherPlayerDashboard,
  getOtherPlayerWithoutAcademy,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtherPlayerDetails);

const styles = StyleSheet.create({
  navBar: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: 'blue',
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    // backgroundColor: 'green'
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: 'red',
  },
  rightIcon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    marginRight: 20,
    //backgroundColor: 'white',
  },

  scoreBox: {
    color: "white",
    marginRight: 20,
    marginBottom: 20,
    textAlign: "right",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttomButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,

    backgroundColor: "white",
    marginTop: 10,
    marginBottom: -5,
    marginLeft: -5,
    marginRight: -5,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 1 },
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  confirmBtnOuter: {
    marginHorizontal: 16,
    //marginTop: 20,
    marginBottom: 15,
  },
  rounded_button: {
    padding: 10,
    borderRadius: 20,
    //borderWidth: 1,
    marginLeft: 4,
    marginRight: 4,
    borderColor: "#67BAF5",
    backgroundColor: "#67BAF5",
    color: "white",
    textAlign: "center",
    alignItems: "center",
    fontFamily: "Quicksand-Medium",
    marginTop: 16,
    width: "100%",
  },
});

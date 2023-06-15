import React, { Component } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CoachProcess from "../../components/custom/CoachProcess";
import ConfirmBooking from "./TrialBook/ConfirmBooking";
import SelectBatch from "./TrialBook/SelectBatch";
import SelectCenter from "./TrialBook/SelectCenter";
import SelectSports from "./TrialBook/SelectSports";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { getBaseUrl } from "../../containers/BaseComponent";
import { darkBlueVariant } from "../util/colors";
import CongratulationScreen from "./TrialBook/CongratulationScreen";
import SorryScreen from "./TrialBook/SorryScreen";
import GetBack from "../../components/custom/GetBack";
import { getPlayerSWitcher } from "../../redux/reducers/dashboardReducer";
import { connect } from "react-redux";
import { getData } from "../../components/auth";
import PlayerDetails from "../BuyPlan/components/PlayerDetails";
import { BackHandler } from "react-native";
import events from "../../router/events";

class TrialBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      title: "Coaching Trial",
      sportsList: null,
      academiesList: null,
      selectSport: null,
      selectCenter: null,
      selectBatch: null,
      selectDate: null,
      selectLevel: null,
      selectTime: null,
      congratulationScreen: false,
      distance: 0,
      alreadyBook: false,
      finishSport: null,
      firstPage: true,
      errorMessage: "We could not book your free trial, please try again.",
      username: "",
      usergender: "",
      parent: "",
      childDetails: null,
      playerDetails: null,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    getValue = async () => {
      const select_trial = await AsyncStorage.getItem("select_trial");
      this.setState({ title: select_trial });
    };
    getValue();
    this.getusermainInfo();
    this.getUserplayData();
    axios
      .get(getBaseUrl() + "global/academy/all")
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        let academiesData = userResponce["data"]["data"];
        this.setState({
          sportsList: academiesData["Sports"],
          academiesList: academiesData["academies"],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleBackButtonClick = () => {
    this.hadleBackPress();
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  getUserplayData = () => {
    getData("header", (value) => {
      console.log("header", value);
      this.props.getPlayerSWitcher(value).then(() => {
        let user = JSON.stringify(this.props.switcherData.switherlist);
        let user1 = JSON.parse(user);
        console.log("Test" + user);
        if (user1.success == true) {
          this.setState({
            playerDetails: user1.data.players,
          });
        }
      });
    });
  };

  getusermainInfo = () => {
    getData("userInfo", (value) => {
      userData = JSON.parse(value);
      this.setState({
        finishSport: userData.sport_trial_details,
      });
    });
  };

  hadleBack = () => {
    events.publish("REFRESH_LEARN_TRAIL"); 
    this.props.navigation.goBack();
  };

  onPress = (value, number) => {
    if (value < number) {
      this.setState({ currentPage: value });
    }
  };

  onPressSports = (selectSport) => {
    this.setState({ currentPage: 2 });
    this.setState({ selectSport: selectSport });
  };

  onPressCenter = (selectCenter, distance) => {
    this.setState({ currentPage: 3 });
    this.setState({ selectCenter: selectCenter, distance: distance });
  };

  onPressBatch = (selectDate, selectLevel, selectBatch) => {
    this.setState({ currentPage: 4 });
    this.setState({
      selectDate: selectDate,
      selectLevel: selectLevel,
      selectTime: selectBatch,
    });
  };

  onPressConfirm = (alreadyBook, errorMessage) => {
    this.setState({
      congratulationScreen: true,
      alreadyBook: alreadyBook,
      errorMessage: errorMessage,
    });
  };

  onPressRetry = () => {
    this.setState({ congratulationScreen: false, currentPage: 1 });
  };

  hadleBackPress = () => {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    } else {
      if (this.state.firstPage) {
        this.hadleBack();
      } else {
        this.setState({ firstPage: true });
      }
    }
  };

  onPressDetails = (username, usergender, parent, childDetails) => {
    var playerInfo = this.state.finishSport;
    if (childDetails != null) {
      const playerdetails = this.state.playerDetails.find(
        (item) => item.name === childDetails.name
      );
      playerInfo = playerdetails.sport_trial_details;
    }
    this.setState({
      firstPage: false,
      currentPage: 1,
      username: username,
      usergender: usergender,
      parent: parent,
      childDetails: childDetails,
      finishSport: playerInfo,
    });
  };

  selectScreen = () => {
    return (
      <View>
        <GetBack title="Coaching Trial" onPress={this.hadleBackPress} />
        <View style={{ height: 70, marginHorizontal: 20, marginVertical: 10 }}>
          <CoachProcess
            number={this.state.currentPage}
            onPress={this.onPress}
            title="Coaching Trial"
          />
        </View>
        <View style={{ height: 1, backgroundColor: "gray", marginTop: 15 }} />
      </View>
    );
  };

  render() {
    return (
      <LinearGradient
        colors={[darkBlueVariant, darkBlueVariant]}
        locations={[0, 1]}
        style={styles.container}
      >
        {this.state.firstPage && (
          <View style={{ flex: 1 }}>
            <GetBack title="Coaching Trial" onPress={this.hadleBack} />
            <PlayerDetails
              title="Coaching Trial"
              onPress={this.onPressDetails}
            />
          </View>
        )}
        {this.state.congratulationScreen && this.state.alreadyBook && (
          <CongratulationScreen
            title="Coaching Trial"
            username={this.state.username}
            selectCenter={this.state.selectCenter}
            selectSport={this.state.selectSport}
            selectDate={this.state.selectDate}
            selectLevel={this.state.selectLevel}
            selectBatch={this.state.selectTime}
            distance={this.state.distance}
            onPressBack={this.hadleBack}
          />
        )}
        {this.state.congratulationScreen && !this.state.alreadyBook && (
          <SorryScreen
            onPress={this.onPressRetry}
            errorMessage={this.state.errorMessage}
          />
        )}
        {!this.state.congratulationScreen && !this.state.firstPage && (
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={{ flex: 0.17 }}>{true && this.selectScreen()}</View>
            <View style={{ flex: 0.83 }}>
              {this.state.sportsList != null &&
                this.state.finishSport != null &&
                this.state.currentPage === 1 && (
                  <SelectSports
                    onPress={this.onPressSports}
                    sportList={this.state.sportsList}
                    parent={this.state.parent}
                    childDetails={this.state.childDetails}
                    finishSport={this.state.finishSport}
                    title="Coaching Trial"
                  />
                )}
              {this.state.currentPage === 2 && (
                <SelectCenter
                  onPress={this.onPressCenter}
                  academiesList={this.state.academiesList}
                  selectSport={this.state.selectSport}
                />
              )}
              {this.state.currentPage === 3 && (
                <SelectBatch
                  onPress={this.onPressBatch}
                  parent={this.state.parent}
                  selectCenter={this.state.selectCenter}
                  selectSport={this.state.selectSport}
                />
              )}
              {this.state.currentPage === 4 && (
                <ConfirmBooking
                  title="Coaching"
                  selectCenter={this.state.selectCenter}
                  selectSport={this.state.selectSport}
                  selectDate={this.state.selectDate}
                  selectLevel={this.state.selectLevel}
                  selectBatch={this.state.selectTime}
                  distance={this.state.distance}
                  username={this.state.username}
                  usergender={this.state.usergender}
                  parent={this.state.parent}
                  childDetails={this.state.childDetails}
                  onPress={this.onPressConfirm}
                />
              )}
            </View>
          </KeyboardAvoidingView>
        )}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    switcherData: state.SwitchReducer,
  };
};

const mapDispatchToProps = { getPlayerSWitcher };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrialBook);

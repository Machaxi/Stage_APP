import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import { getBaseUrl } from "../BaseComponent";
import GetBack from "../../components/custom/GetBack";
import { darkBlueVariant } from "../util/colors";
import { Nunito_SemiBold } from "../util/fonts";
import CongratsScreen from "./components/CongratsScreen";
import SorryPage from "./components/SorryPage";
import BuyPlayProcess from "../../components/custom/BuyPlayProcess";
import SelectPlayPlan from "./components/SelectPlayPlan";
import SelectPlayCenter from "./components/SelectPlayCenter";
import SelectPlayPay from "./components/SelectPlayPay";
import MoreDetails from "./components/MoreDetails";
import AsyncStorage from "@react-native-community/async-storage";

class PlayingPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      title: "Coaching Plan",
      planList: null,
      sportsList: null,
      academiesList: null,
      selectPlan: null,
      selectCenter: null,
      selectBatch: null,
      selectDate: null,
      selectLevel: null,
      selectTime: null,
      congratulationScreen: false,
      distance: 0,
      alreadyBook: false,
      errorMessage: "We could not book your free trial, please try again.",
      selectSlot: null,
      username: "",
      usergender: "",
      parent: "",
      moreScreen: false,
      userDetails: null,
    };
  }

  componentDidMount() {
    this.getData();
    this.setState({ planList: this.props.navigation.state.params.data });
    axios
      .get(getBaseUrl() + "/global/academy/all")
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

  getData = async () => {
    const userDetailsJson = await AsyncStorage.getItem("user_details");
    const userDetails = JSON.parse(userDetailsJson);
    this.setState({ userDetails: userDetails });
    console.log(userDetails);
  };

  onPress = (value, number) => {
    if (value < number) {
      this.setState({ currentPage: value });
    }
  };

  onPressPlan = (selectPlan) => {
    this.setState({ currentPage: 2 });
    this.setState({ selectPlan: selectPlan });
  };

  onPressCenter = (selectCenter, distance) => {
    this.setState({ currentPage: 3 });
    this.setState({ selectCenter: selectCenter, distance: distance });
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
      this.props.navigation.goBack();
    }
  };

  hadleBack = () => {
    this.props.navigation.goBack();
  };

  onComplete = () => {};
  onPressSuccess = () => {};

  selectScreen = () => {
    return (
      <View>
        <GetBack title={this.state.title} onPress={this.hadleBackPress} />
        <View style={{ height: 70, marginHorizontal: 20, marginVertical: 10 }}>
          <BuyPlayProcess
            number={this.state.currentPage}
            onPress={this.onPress}
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
        {this.state.congratulationScreen && this.state.alreadyBook && (
          <CongratsScreen
            onPress={this.onPressSuccess}
            errorMessage={this.state.errorMessage}
          />
        )}
        {this.state.congratulationScreen && !this.state.alreadyBook && (
          <SorryPage
            onPressBack={this.hadleBack}
            errorMessage={this.state.errorMessage}
            buttonName={"Pay"}
          />
        )}
        {this.state.sportsList != null && this.state.moreScreen && (
          <MoreDetails
            sportList={this.state.sportsList}
            onPress={this.onComplete}
          />
        )}
        {!this.state.congratulationScreen && !this.state.moreScreen && (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 0.17 }}>{true && this.selectScreen()}</View>
            <View style={{ flex: 0.83 }}>
              {this.state.planList && this.state.currentPage === 1 && (
                <SelectPlayPlan
                  onPress={this.onPressPlan}
                  planList={this.state.planList}
                />
              )}
              {this.state.currentPage === 2 && (
                <SelectPlayCenter
                  onPress={this.onPressCenter}
                  academiesList={this.state.academiesList}
                />
              )}
              {this.state.currentPage === 3 && (
                <SelectPlayPay
                  title="Coaching"
                  userDetails={this.state.userDetails}
                  selectCenter={this.state.selectCenter}
                  selectPlan={this.state.selectPlan}
                  distance={this.state.distance}
                  username={this.state.username}
                  usergender={this.state.usergender}
                  onPress={this.onPressConfirm}
                />
              )}
            </View>
          </View>
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
  select: {
    fontSize: 16,
    marginTop: 25,
    fontFamily: Nunito_SemiBold,
    color: "#D1D1D1",
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: "gray",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlayingPlan;

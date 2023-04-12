import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CoachProcess from "../../components/custom/CoachProcess";
import ConfirmBooking from "./TrialBook/ConfirmBooking";
import SelectCenter from "./TrialBook/SelectCenter";
import SelectSports from "./TrialBook/SelectSports";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { getBaseUrl } from "../../containers/BaseComponent";
import SelectLearnBatch from "./TrialBook/SelectLearnBatch";

class LearnBookTrial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      title: "Playing Trial",
      sportsList: null,
      academiesList: null,
      selectSport: null,
      selectCenter: null,
      selectBatch: null,
      selectDate: null,
      selectLevel: null,
      selectTime: null,
      distance: 0,
    };
  }

  componentDidMount() {
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

  onPress = (value, number) => {
    if (value < number) {
      this.setState({ currentPage: value });
    }
  };

  onPressSports = (selectSport) => {
    this.setState({ currentPage: 2 });
    this.setState({ selectSport: selectSport });
  };

  onPressCenter = (selectCenter) => {
    this.setState({ currentPage: 3 });
    this.setState({ selectCenter: selectCenter });
  };

  onPressBatch = (selectDate, selectLevel, selectTime) => {
    this.setState({ currentPage: 4 });
    this.setState({
      selectDate: selectDate,
      selectLevel: selectLevel,
      selectTime: selectTime,
    });
  };

  render() {
    return (
      <LinearGradient
        colors={["#332B70", "#24262A"]}
        locations={[0, 1]}
        style={styles.container}
      >
        <View style={{ flex: 0.2 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (this.state.currentPage > 1) {
                this.setState({ currentPage: this.state.currentPage - 1 });
              } else {
                this.props.navigation.goBack();
              }
            }}
          >
            <View style={styles.row}>
              <Image
                source={require("../../images/playing/back.png")}
                style={{ width: 15, height: 13 }}
              />
              <Text style={styles.headerText}> {this.state.title}</Text>
            </View>
          </TouchableOpacity>
          <View style={{ height: 70, margin: 20 }}>
            <CoachProcess
              number={this.state.currentPage}
              onPress={this.onPress}
            />
          </View>
          <View style={{ height: 2, backgroundColor: "gray", marginTop: 10 }} />
        </View>
        <View style={{ flex: 0.8 }}>
          {this.state.sportsList != null && this.state.currentPage === 1 && (
            <SelectSports
              onPress={this.onPressSports}
              sportList={this.state.sportsList}
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
            <SelectLearnBatch
              onPress={this.onPressBatch}
              selectCenter={this.state.selectCenter}
              selectSport={this.state.selectSport}
            />
          )}
          {this.state.currentPage === 4 && (
            <ConfirmBooking
              title="Playing"
              selectCenter={this.state.selectCenter}
              selectSport={this.state.selectSport}
              selectDate={this.state.selectDate}
              selectLevel={this.state.selectLevel}
              selectBatch={this.state.selectTime}
              distance={this.state.distance}
              onPress={() => {
                this.props.navigation.navigate("CongratulationScreen");
              }}
            />
          )}
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  select: {
    fontSize: 16,
    marginTop: 25,
    fontFamily: "Nunito-600",
    color: "#D1D1D1",
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Nunito-600",
    fontWeight: "600",
    color: "#FFCB6A",
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

export default LearnBookTrial;

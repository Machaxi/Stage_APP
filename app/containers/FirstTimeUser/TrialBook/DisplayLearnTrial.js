import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Nunito_Regular, Nunito_SemiBold } from "../../util/fonts";
import { darkBlueVariant } from "../../util/colors";
import CongratulationScreen from "./CongratulationScreen";
import moment from "moment";

class DisplayLearnTrial extends Component {
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
      username: "",
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    let academiesData = this.props.navigation.state.params.item;
    const dateObject = new Date(academiesData.trial_date);
    this.setState({
      selectBatch: academiesData,
      selectCenter: academiesData["academyDto"],
      selectDate: dateObject,
      selectSport: academiesData["sportDto"],
      username: academiesData["user"].name,
    });
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

    return (
      <LinearGradient
        colors={[darkBlueVariant, darkBlueVariant]}
        locations={[0, 1]}
        style={styles.container}
      >
        <CongratulationScreen
          title="Coaching Trial"
          username={this.state.username}
          selectCenter={this.state.selectCenter}
          selectSport={this.state.selectSport}
          selectDate={this.state.selectDate}
          selectBatch={this.state.selectBatch}
          distance={this.state.distance}
          courtName={this.state.courtName}
          onPressBack={this.hadleBackPress}
        />
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
export default DisplayLearnTrial;

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../../components/custom/CustomButton";
import AsyncStorage from "@react-native-community/async-storage";
import { whiteGreyBorder } from "../../util/colors";
import {
  Nunito_Medium,
  Nunito_Regular,
  Nunito_SemiBold,
} from "../../util/fonts";
import SelectLevel from "../../../components/custom/SelectLevel";
import CustomRadioButton from "../../../components/custom/CustomRadioButton";

class PlayerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 100,
      proseednext: false,
      name: "",
      currentGender: 0,
      currentChild: 1,
      gender: "",
    };
  }

  render() {
    handlepress = () => {
      var parent = "Parent";
      if (this.state.currentIndex == 2) {
        parent = "Child";
      }
      this.props.onPress(this.state.name, this.state.gender, parent);
    };

    return (
      <View style={styles.contain}>
        <ScrollView style={{ flex: 0.93 }}>
          <Text style={styles.mainText}>is this for yourself or child?</Text>
          <View style={styles.contained}>
            <SelectLevel
              index={1}
              currentLevel={this.state.currentIndex}
              image={require("../../../images/playing/yourself.png")}
              id={1}
              name="Yourself"
              onPress={() => {
                this.setState({ currentIndex: 1, proseedLevel: true });
              }}
            />
            <View style={{ marginHorizontal: 20 }} />
            <SelectLevel
              index={2}
              currentLevel={this.state.currentIndex}
              image={require("../../../images/playing/child.png")}
              id={2}
              name="Child"
              onPress={() => {
                this.setState({ currentIndex: 2, proseedLevel: true });
              }}
            />
          </View>
          <Text style={styles.mainText}>Player Details</Text>
          {this.state.currentIndex == 2 && false && (
            <View>
              <Text style={styles.subText}>Select Player</Text>
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <CustomRadioButton
                  index={0}
                  currentLevel={this.state.currentChild}
                  name="Male"
                  onPress={() => {
                    this.setState({ currentChild: 0 });
                  }}
                />
                <View style={{ marginHorizontal: 20 }} />
                <CustomRadioButton
                  index={1}
                  currentLevel={this.state.currentChild}
                  name="Add New Player"
                  onPress={() => {
                    this.setState({ currentChild: 1 });
                  }}
                />
              </View>
            </View>
          )}
          <Text style={styles.subText}>Player Name</Text>
          <View style={styles.inputview}>
            <TextInput
              style={styles.input}
              value={this.state.name}
              placeholder="Enter Player Name"
              placeholderTextColor="#7E7E7E"
              maxLength={30}
              onChangeText={(value) => {
                this.setState({ name: value });
              }}
            />
            {this.state.name.length > 0 && (
              <TouchableOpacity
                style={{ flex: 0.1 }}
                activeOpacity={0.8}
                onPress={() => {
                  this.setState({ name: "" });
                }}
              >
                <Image
                  source={require("../../../images/cancel.png")}
                  style={{ width: 25, height: 25 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.subText}>Player Gender</Text>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <CustomRadioButton
              index={0}
              currentLevel={this.state.currentGender}
              name="Male"
              onPress={() => {
                this.setState({
                  currentGender: 0,
                  proseedLevel: true,
                  gender: "MALE",
                });
              }}
            />
            <View style={{ marginHorizontal: 20 }} />
            <CustomRadioButton
              index={1}
              currentLevel={this.state.currentGender}
              name="Female"
              onPress={() => {
                this.setState({
                  currentGender: 1,
                  proseedLevel: true,
                  gender: "FEMALE",
                });
              }}
            />
            <View style={{ marginHorizontal: 20 }} />
            <CustomRadioButton
              index={2}
              currentLevel={this.state.currentGender}
              name="Other"
              onPress={() => {
                this.setState({
                  currentGender: 2,
                  proseedLevel: true,
                  gender: "OTHER",
                });
              }}
            />
          </View>
        </ScrollView>
        <View style={{ flex: 0.07, paddingTop: 20 }}>
          <CustomButton
            name="Next "
            image={require("../../../images/playing/arrow_go.png")}
            available={this.state.name.length > 4}
            onPress={handlepress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contained: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    margin: 10,
  },
  contain: {
    flex: 1,
    marginVertical: 20,
  },
  inputview: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#484848",
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 0.7,
    marginRight: 10,
    fontFamily: "Nunito-Regular",
    color: "#DEDEDE",
  },
  subview: {
    width: 100,
    height: 120,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  sportsview: {
    width: 100,
    height: 93,
    justifyContent: "center",
    alignItems: "center",
    borderColor: whiteGreyBorder,
    borderWidth: 1,
    borderRadius: 10,
  },
  imageitem: {
    width: 64,
    height: 64,
    zIndex: 2,
  },
  sportText: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: Nunito_Medium,
    color: "#BBBBBB",
  },
  mainText: {
    fontSize: 16,
    marginVertical: 8,
    fontFamily: Nunito_SemiBold,
    color: "#D1D1D1",
  },
  subText: {
    fontSize: 12,
    marginVertical: 8,
    fontFamily: Nunito_Regular,
    color: "#B4B4B4",
  },
  imaged: {
    marginTop: 5,
    width: 100,
    height: 93,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlayerDetails;
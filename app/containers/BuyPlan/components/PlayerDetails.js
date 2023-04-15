import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../../components/custom/CustomButton";
import AsyncStorage from "@react-native-community/async-storage";
import { whiteGreyBorder } from "../../util/colors";
import { RadioButton } from "react-native-paper";

class PlayerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 100,
      proseednext: false,
    };
  }

  render() {
    handlepress = () => {
      this.props.onPress(
        this.props.sportList.find((item) => item.id === this.state.currentIndex)
      );
    };

    return (
      <View style={styles.contain}>
        <ScrollView style={{ flex: 0.93 }}>
          <Text style={styles.mainText}>is this for yourself or child?</Text>
          <View style={styles.contained}>
            <SelectLevel
              index={1}
              currentLevel={this.state.currentLevel}
              image={item.image}
              id={1}
              name="Yourself"
              onPress={() => {
                this.setState({ currentLevel: index, proseedLevel: true });
                this.getTimeData(index);
              }}
            />
            <SelectLevel
              index={2}
              currentLevel={this.state.currentLevel}
              image={item.image}
              id={2}
              name="Child"
              onPress={() => {
                this.setState({ currentLevel: index, proseedLevel: true });
                this.getTimeData(index);
              }}
            />
          </View>
          <Text style={styles.mainText}>Player Details</Text>
          <Text style={styles.subText}>Player Name</Text>
          <Text style={styles.subText}>Player Gender</Text>
          <RadioButton.Group onValueChange={handleValueChange} value={value}>
            <View>
              <Text>Male</Text>
              <RadioButton value="option1" />
            </View>
            <View>
              <RadioButton value="option3" />
              <Text>Female</Text>
              <RadioButton value="option2" />
            </View>
            <View>
              <RadioButton value="option3" />
              <Text>Others</Text>
            </View>
          </RadioButton.Group>
        </ScrollView>
        <View style={{ flex: 0.07, paddingTop: 20 }}>
          <CustomButton
            name="Next "
            image={require("../../../images/playing/arrow_go.png")}
            available={this.state.proseednext}
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
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  contain: {
    flex: 1,
    marginVertical: 20,
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
    fontFamily: "Nunito-500",
    color: "#BBBBBB",
  },
  mainText: {
    fontSize: 16,
    marginVertical: 8,
    fontFamily: "Nunito-600",
    color: "#D1D1D1",
  },
  subText: {
    fontSize: 12,
    marginVertical: 8,
    fontFamily: "Nunito-400",
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

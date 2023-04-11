import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CoachProcess from "../../components/custom/CoachProcess";
import ConfirmBooking from "./TrialBook/ConfirmBooking";
import SelectBatch from "./TrialBook/SelectBatch";
import SelectCenter from "./TrialBook/SelectCenter";
import SelectSports from "./TrialBook/SelectSports";
import AsyncStorage from "@react-native-community/async-storage";
import BookProcess from "../../components/custom/BookProcess";

class PlanBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      title: "Coaching Plan",
    };
  }

  componentDidMount() {
    getValue = async () => {
      const select_plan = await AsyncStorage.getItem("select_plan");
      this.setState({ title: select_plan });
    };
    getValue();
  }

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
                this.props.navigation.navigate("HomeScreen");
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
            <BookProcess number={this.state.currentPage} />
          </View>
          <View style={{ height: 2, backgroundColor: "gray", marginTop: 10 }} />
        </View>
        <View style={{ flex: 0.8 }}>
          {this.state.currentPage === 1 && (
            <SelectSports
              onPress={() => {
                this.setState({ currentPage: 2 });
              }}
            />
          )}
          {this.state.currentPage === 2 && (
            <SelectCenter
              onPress={() => {
                this.setState({ currentPage: 3 });
              }}
            />
          )}
          {this.state.currentPage === 3 && (
            <SelectBatch
              onPress={() => {
                this.setState({ currentPage: 4 });
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

export default PlanBook;
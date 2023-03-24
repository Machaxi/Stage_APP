import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CoachScreen from "./CoachScreen";
import PlayScreen from "./PlayScreen";
import ShopScreen from "./ShopScreen";
import AsyncStorage from "@react-native-community/async-storage";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
  }

  render() {
    return (
      <LinearGradient
        colors={["#332B70", "#24262A"]}
        locations={[0, 1]}
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
              <View
                style={[
                  styles.button,
                  { borderTopLeftRadius: 9, borderBottomLeftRadius: 9 },
                  this.state.currentPage === 1 && styles.activeButton,
                ]}
              >
                <Text style={styles.toptext}>Learn</Text>
                {this.state.currentPage === 1 && (
                  <View style={styles.onscreen} />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.setState({ currentPage: 2 });
              }}
            >
              <View
                style={[
                  styles.button,
                  this.state.currentPage === 2 && styles.activeButton,
                ]}
              >
                <Text style={styles.toptext}>Play</Text>
                {this.state.currentPage === 2 && (
                  <View style={styles.onscreen} />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.setState({ currentPage: 3 });
              }}
            >
              <View
                style={[
                  styles.button,
                  { borderTopRightRadius: 9, borderBottomRightRadius: 9 },
                  this.state.currentPage === 3 && styles.activeButton,
                ]}
              >
                <Text style={styles.toptext}>Shop</Text>
                {this.state.currentPage === 3 && (
                  <View style={styles.onscreen} />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 0.92 }}>
          {this.state.currentPage === 1 && (
            <CoachScreen
              onPressPlan={() => {
                AsyncStorage.setItem("select_plan", "Coaching Plan");
                this.props.navigation.navigate("PlanBook");
              }}
              onPressTrail={() => {
                AsyncStorage.setItem("select_trial", "Coaching Trial");
                this.props.navigation.navigate("TrialBook");
              }}
            />
          )}
          {this.state.currentPage === 2 && (
            <PlayScreen
              onPress={() => {
                AsyncStorage.setItem("select_trial", "Playing Trial");
                this.props.navigation.navigate("TrialBook");
              }}
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
    fontFamily: "Nunito-600",
  },
  onscreen: {
    width: 38,
    height: 3,
    backgroundColor: "#FFCB6A",
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    marginTop: 7,
  },
});
export default HomeScreen;

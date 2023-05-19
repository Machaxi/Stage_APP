import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Nunito_Bold, Nunito_Regular, Nunito_SemiBold } from "../../util/fonts";
import {
  darkBlueVariant,
  greyVariant1,
  white,
  yellowVariant7,
} from "../../util/colors";
import axios from "axios";
import { getBaseUrl } from "../../../containers/BaseComponent";
import AsyncStorage from "@react-native-community/async-storage";
import { GradientLine } from "../../../components/molecules/gradientLine";
import CustomButton from "../../../components/custom/CustomButton";

class LearnTrialList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trailList: null,
      displayNoText: true,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const header = await AsyncStorage.getItem("header");
    this.setState({ header: header }, () => {
      this.apiCall();
    });
  };

  apiCall = () => {
    axios
      .get(getBaseUrl() + "/batch/trial-details", {
        headers: {
          "x-authorization": this.state.header,
        },
      })
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        let selfBooking =
          userResponce["data"]["data"]["details"]["selfBooking"];
        let childBooking =
          userResponce["data"]["data"]["details"]["childBooking"];
        var combinedBookings = [...selfBooking];
        if (childBooking != null) {
          combinedBookings = [...selfBooking, ...childBooking];
        }
        combinedBookings.sort((a, b) => {
          const dateA = new Date(a.trial_date + "T" + a.startTime);
          const dateB = new Date(b.trial_date + "T" + b.startTime);
          return dateA - dateB;
        });
        this.setState({ trailList: combinedBookings });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  hadleBackPress = () => {
    this.props.navigation.goBack();
  };

  nextSessionCard = ({ item }) => {
    const currentDate = new Date();
    const dateObject = new Date(item.trial_date);
    const isToday = dateObject.getDate() == currentDate.getDate();
    const combinedString =
      item.trial_date.slice(0, 10) + "T" + item.endTime + ".000Z";
    const dateA = new Date(combinedString);
    if (dateA < currentDate) {
      return null;
    }
    this.setState({ displayNoText: false });
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          this.props.navigation.navigate("DisplayLearnTrial", { item });
        }}
      >
        <View style={[styles.contained]}>
          <LinearGradient
            colors={[
              "(126.53deg, rgba(97, 74, 57, 0.432)",
              "rgba(91, 77, 67, 0.102)",
            ]}
            style={styles.containerInnerview}
          >
            <View style={styles.sportsDetail}>
              <Text style={styles.heading}>
                {"Next Session - " + (isToday ? "Today" : "Tomorrow")}
              </Text>
              <Text style={styles.sports}>{item?.user?.name}</Text>
            </View>
            <GradientLine
              marginBottom={14}
              marginTop={16}
              marginLeft={0}
              colors={["#6b6a76", "#2a273a"]}
            />
            <View style={[styles.sportsDetail, { marginTop: 10 }]}>
              <Text style={styles.sports}>{item?.sportDto?.name}</Text>
              <Text style={styles.sports}>{item?.displayTime}</Text>
            </View>
            <View style={{ marginTop: 12 }}>
              <Text style={styles.centerName}>{item?.academyDto?.name}</Text>
              <Text style={styles.centerAddress}>
                {item?.academyDto?.address}
              </Text>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  };

  onPressExplore = () => {
    this.props.navigation.navigate("BookLearnTrail");
  };

  render() {
    if (this.state.trailList == null || this.state.trailList.length == 0) {
      return (
        <LinearGradient
          colors={[darkBlueVariant, darkBlueVariant]}
          locations={[0, 1]}
          style={styles.container}
        >
          <View
            style={{
              flex: 0.85,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.insideText}>No booking available</Text>
          </View>
          <View style={{ flex: 0.15, justifyContent: "center" }}>
            <CustomButton
              name="Book Trial "
              available={true}
              onPress={this.onPressExplore}
            />
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
        <View style={{ flex: 0.9 }}>
          <FlatList
            data={this.state.trailList}
            renderItem={this.nextSessionCard}
            keyExtractor={(item) => item.id}
          />
          {this.state.displayNoText && (
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.insideText}>No booking available</Text>
            </View>
          )}
        </View>
        <View style={{ flex: 0.1, justifyContent: "center" }}>
          <CustomButton
            name="Book Trial "
            available={true}
            onPress={this.onPressExplore}
          />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 17,
    paddingTop: 15,
  },
  insideText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 17,
    color: "#F3F2F5",
    fontFamily: Nunito_SemiBold,
  },
  contained: {
    borderColor: yellowVariant7,
    borderWidth: 0.5,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    marginHorizontal: 12,
    borderRadius: 20,
    marginTop: 32,
  },
  containerInnerview: {
    borderRadius: 20,
    paddingVertical: 15,
    paddingLeft: 12,
    paddingRight: 20,
  },
  sportsDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gameContainer: {
    width: "30%",
    justifyContent: "flex-start",
    marginTop: 6,
  },
  heading: {
    color: yellowVariant7,
    fontSize: 14,
    fontFamily: Nunito_Regular,
    fontWeight: "600",
  },
  sports: {
    color: white,
    fontSize: 14,
    fontFamily: Nunito_Regular,
    fontWeight: "600",
  },
  centerName: {
    color: white,
    fontSize: 12,
    fontFamily: Nunito_Regular,
    fontWeight: "400",
  },
  centerAddress: {
    color: greyVariant1,
    fontSize: 10,
    fontFamily: Nunito_Regular,
    marginTop: 4,
    fontWeight: "400",
  },
  insideText: {
    fontSize: 12,
    fontFamily: Nunito_Bold,
    color: "#F1E8FF",
  },
});

export default LearnTrialList;

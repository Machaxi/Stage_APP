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

class PlayTrialList extends Component {
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
      .get(getBaseUrl() + "/court/trials", {
        headers: {
          "x-authorization": this.state.header,
        },
      })
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        let academiesData = userResponce["data"]["data"]["trials"][0];
        console.log(academiesData);
        if (academiesData) {
          this.setState({ trailList: [academiesData] });
        }
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
    const dateObject = new Date(item.date);
    console.log(item);
    const isToday = dateObject.getDate() == currentDate.getDate();
    const combinedString =
      item?.booking?.date.slice(0, 10) + "T" + item.endTime + ".000Z";
    const dateA = new Date(combinedString);
    if (dateA < currentDate) {
      return null;
    }
    this.setState({ displayNoText: false });
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          this.props.navigation.navigate("DisplayPlayTrial", { item });
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
            </View>
            <GradientLine
              marginBottom={14}
              marginTop={16}
              marginLeft={0}
              colors={["#6b6a76", "#2a273a"]}
            />
            <View style={[styles.sportsDetail, { marginTop: 10 }]}>
              <Text style={styles.sports}>{item?.booking?.sportName}</Text>
              <Text style={styles.sports}>{item?.booking?.displayTime}</Text>
            </View>
            <View style={{ marginTop: 12 }}>
              <Text style={styles.centerName}>{item?.academy?.name}</Text>
              <Text style={styles.centerAddress}>{item?.academy?.address}</Text>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
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
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.insideText}>No bookings available</Text>
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
        <FlatList
          data={this.state.trailList}
          renderItem={this.nextSessionCard}
          keyExtractor={(item) => item.id}
        />
        {this.state.displayNoText && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.insideText}>
              Maximum number of trials reached
            </Text>
          </View>
        )}
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

export default PlayTrialList;

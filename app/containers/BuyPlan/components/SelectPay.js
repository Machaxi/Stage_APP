import React, { Component } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../../components/custom/CustomButton";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
import Loader from "../../../components/custom/Loader";
import {
  Nunito_Medium,
  Nunito_Regular,
  Nunito_SemiBold,
} from "../../util/fonts";

class SelectPay extends Component {
  months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  constructor(props) {
    super(props);
    this.state = {
      centerName: "",
      centerAddress: "",
      centerImage: "",
      centerDistance: "",
      sportName: "",
      sportImage: "",
      time: "",
      levelImage: "",
      levelName: "",
      header: "",
      selectBatch: "",
      username: "",
      gender: "",
      parent: "",
      selectLevel: null,
      date: new Date(),
      isLoading: false,
    };
  }

  componentDidMount() {
    this.handleopen();
    this.getData();
  }

  handleopen = () => {
    const selectCenter = this.props.selectCenter;
    const selectSport = this.props.selectSport;
    const selectLevel = this.props.selectLevel;
    const selectBatch = this.props.selectBatch;
    const distance = this.props.distance;
    const selectTime = selectBatch.displayTime;
    var levelimage = selectLevel.image;
    var levelname = selectLevel.name;
    const username = this.props.selectCenter;
    const gender = this.props.gender;
    const parent = this.props.parent;

    if (this.props.title == "Playing") {
      levelname = selectLevel.displayText;
      levelimage = selectLevel.url;
    }

    this.setState({
      centerName: selectCenter.name,
      centerImage: selectCenter.cover_pic,
      centerAddress: selectCenter.address,
      centerDistance: distance,
      sportName: selectSport.name,
      sportImage: selectSport.image,
      time: selectTime,
      selectBatch: selectBatch,
      levelImage: levelimage,
      levelName: levelname,
      selectLevel: selectLevel,
      username: username,
      gender: gender,
      parent: parent,
    });
  };

  getData = async () => {
    const header = await AsyncStorage.getItem("header");
    this.setState({ header: header });
  };

  render() {
    listimage = (image, name, url) => {
      return (
        <View style={{ alignItems: "center" }}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.06)"]}
            locations={[0, 1]}
            style={styles.sportsview}
          >
            {url ? (
              <Image
                style={styles.imaged}
                source={{ uri: image }}
                resizeMode="cover"
              />
            ) : (
              <Image
                style={styles.imaged}
                source={image}
                resizeMode="contain"
              />
            )}
          </LinearGradient>
          <Text style={[styles.sportText]}>{name}</Text>
        </View>
      );
    };

    listText = (title, subtitle, heading) => {
      return (
        <View style={{ alignItems: "center" }}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.06)"]}
            locations={[0, 1]}
            style={[styles.sportsview]}
          >
            <Text style={[styles.datetitle, { fontSize: 25 }]}>{title}</Text>
            <Text style={[styles.datetitle]}>{subtitle}</Text>
          </LinearGradient>
          <Text style={[styles.sportText]}>{heading}</Text>
        </View>
      );
    };

    return (
      <View style={{ marginVertical: 20, flex: 1 }}>
        <Loader visible={this.state.isLoading} />
        <ScrollView style={{ flex: 0.94 }}>
          <Text style={styles.mainText}>Review before Payment</Text>
          <LinearGradient
            colors={[
              "rgba(255, 255, 255, 0.15)",
              "rgba(118, 87, 136, 0)",
              "rgba(118, 87, 136, 0)",
              "rgba(118, 87, 136, 0.44)",
            ]}
            locations={[0, 0.3, 0.6, 1]}
            style={styles.mainview}
          >
            <Text style={styles.subtitle}>Player Detail</Text>
            <Text style={[styles.subtitle, { color: "#D1CECE" }]}>
              Player Name
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.name}>{this.state.username} · </Text>
              <Text
                style={[styles.subtitle, { color: "#FFC498", marginLeft: 2 }]}
              >
                Parent · {this.state.gender}
              </Text>
            </View>
            <View style={styles.line} />
            <Text style={styles.subtitle}>Centre Detail</Text>
            <View style={styles.item}>
              <View style={{ flex: 0.35 }}>
                <Image
                  source={{ uri: this.state.centerImage }}
                  style={styles.image}
                />
                <Text style={styles.distance}>{this.state.centerDistance}</Text>
              </View>
              <View style={styles.textContainer}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{this.state.centerName}</Text>
                  <Text style={styles.address}>{this.state.centerAddress}</Text>
                </View>
              </View>
            </View>
            <View style={styles.line} />
            <Text style={styles.subtitle}>Batch Details</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              {listimage(this.state.sportImage, this.state.sportName, true)}
              {listText(
                this.state.session_per_Week == "WORKING_DAYS" ? "5" : "3",
                "Days/Week",
                this.state.session_per_Week == "WORKING_DAYS"
                  ? "Mon to Fri"
                  : this.state.session_per_Week == "WEEK_MWF"
                  ? "Mon,Wed,Fri"
                  : "Tue,Thu,Sat"
              )}
              {listimage(
                this.state.levelImage,
                this.state.levelName,
                this.props.title == "Playing"
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: 15,
              }}
            >
              {listText(
                this.state.date.getDate(),
                this.months[this.state.date.getMonth()],
                "DOJ"
              )}
              {listimage(
                require("../../../images/playing/clock.png"),
                this.state.time,
                false
              )}
              <View style={styles.sportsview} />
            </View>
          </LinearGradient>
        </ScrollView>
        <View style={{ flex: 0.06, paddingTop: 15 }}>
          <CustomButton name="Pay" available={true} onPress={this.booktrail} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contained: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 10,
    marginLeft: 10,
    marginVertical: 5,
    fontFamily: Nunito_Medium,
    color: "#FF9C33",
  },
  name: {
    marginLeft: 10,
    marginBottom: 10,
    marginTop: -1,
    fontFamily: Nunito_Medium,
    color: "#F0F0F0",
    fontSize: 16,
  },
  textContainer: {
    flex: 0.65,
    padding: 10,
  },
  sportsview: {
    width: 80,
    height: 70,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  mainview: {
    marginVertical: 20,
    marginHorizontal: 10,
    paddingHorizontal: 5,
    width: "95%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 15,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
  },
  sportText: {
    fontSize: 12,
    marginTop: 8,
    fontFamily: Nunito_Medium,
    color: "#D7D7D7",
  },
  mainText: {
    fontSize: 16,
    marginVertical: 8,
    fontFamily: Nunito_SemiBold,
    color: "#D1D1D1",
  },
  distance: {
    width: "85%",
    fontSize: 10,
    marginTop: -15,
    fontFamily: Nunito_Medium,
    color: "#FFFFFF",
    backgroundColor: "rgba(35, 35, 35, 0.66)",
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 5,
  },
  image: {
    width: 100,
    height: 90,
    marginRight: 20,
    borderRadius: 6,
  },
  imaged: {
    width: 35,
    height: 45,
  },
  title: {
    fontSize: 14,
    flex: 0.5,
    fontFamily: Nunito_Medium,
    color: "#F0F0F0",
  },
  address: {
    flex: 0.5,
    fontSize: 11,
    fontFamily: Nunito_Regular,
    color: "#ADADAD",
  },
  line: {
    height: 1,
    backgroundColor: "gray",
    marginHorizontal: 15,
    marginBottom: 5,
  },
  datetitle: {
    fontSize: 12,
    fontFamily: Nunito_Medium,
    color: "#F2AE4D",
  },
});

export default SelectPay;

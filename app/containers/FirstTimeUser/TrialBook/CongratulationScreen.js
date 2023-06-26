import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
import {
  Nunito_Bold,
  Nunito_ExtraBold,
  Nunito_Medium,
  Nunito_Regular,
  Nunito_SemiBold,
} from "../../util/fonts";

class CongratulationScreen extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      centerName: "",
      centerAddress: "",
      centerImage: "",
      centerDistance: 0,
      sportName: "",
      sportImage: "",
      date: new Date(),
      timeString: "",
      selectTrial: "",
      latitude: 0.0,
      longitude: 0.0,
      todayDate: new Date(),
    };
  }

  componentDidMount() {
    this.handleopen();
  }

  handleopen = async () => {
    const userDetailsJson = await AsyncStorage.getItem("userInfo");
    const userDetailed = JSON.parse(userDetailsJson);
    const userDetails = userDetailed.user;
    var username = userDetails.name;
    console.log(this.props.selectBatch);
    if (this.props.title == "Coaching Trial") {
      username = this.props.username;
    }
    const selectCenter = this.props.selectCenter;
    const selectSport = this.props.selectSport;
    const selectDate = this.props.selectDate;
    const selectBatch = this.props.selectBatch;
    const distance = this.props.distance;
    const selectTime = selectBatch.startTime;
    const title = this.props.title;
    const formattedTime = moment(selectTime, "HH:mm:ss").format("hh:mm A");
    const longitude = selectCenter.longitude;
    const latitude = selectCenter.latitude;

    this.setState({
      userName: username,
      centerName: selectCenter.name,
      centerImage: selectCenter.cover_pic,
      centerAddress: selectCenter.address,
      centerDistance: distance,
      sportName: selectSport.name,
      sportImage: selectSport.image,
      date: selectDate,
      selectTrial: title,
      timeString: formattedTime,
      latitude: latitude,
      longitude: longitude,
    });
  };

  openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${
      this.state.latitude
    },${this.state.longitude}`;
    Linking.openURL(url);
  };

  handleCrosspress = () => {
    this.props.onPressBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.06)"]}
          locations={[0, 1]}
          style={[styles.subcontainer]}
        >
          <View style={{ flexDirection: "row-reverse", width: "100%" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={this.handleCrosspress}
            >
              <Image
                source={require("../../../images/cancel.png")}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>
            Congratulations {this.state.userName}!
          </Text>
          {this.props.title == "Playing Trial" ? (
            <Text style={styles.subtext}>You slot has been booked </Text>
          ) : (
            <Text style={styles.subtext}>Your trial session is confirmed.</Text>
          )}
          <View style={styles.line} />
          <View style={styles.item}>
            <View style={{ flex: 0.25 }}>
              <ImageBackground
                source={require("../../../images/playing/sportsbackground.png")}
                style={[styles.sportsview]}
              >
                <Image
                  source={{ uri: this.state.sportImage }}
                  style={styles.image}
                />
              </ImageBackground>
            </View>
            <View style={styles.textContainer}>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.subtitle]}>{this.state.sportName}</Text>
                <Text style={[styles.subtext]}>
                  {" "}
                  · {this.state.selectTrial}
                </Text>
              </View>
              {this.props.title == "Playing Trial" && (
                <Text style={styles.court}>{this.props.courtName}</Text>
              )}
              <Text style={[styles.schedule]}>
                {/* {this.state.date.getDate() == this.state.todayDate.getDate()
                  ? "Today, "
                  : "Tomorrow, "} */}
                {moment(this.state.date).format("Do MMMM YYYY")} at{" "}
                {this.state.timeString}
              </Text>
              <Text style={styles.center}>{this.state.centerName}</Text>
              <Text style={styles.address}>{this.state.centerAddress}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={this.openGoogleMaps}>
            <Text style={[styles.schedule, { color: "#97B1FC" }]}>
              Directions
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <Image
          source={require("../../../images/playing/Congratulations.png")}
          style={{
            width: 200,
            height: 300,
            marginBottom: -160,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
  },

  subcontainer: {
    width: "100%",
    height: 510,
    marginBottom: 30,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
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
  title: {
    fontSize: 22,
    fontFamily: Nunito_ExtraBold,
    color: "#E8AC43",
    marginBottom: 5,
    marginTop: 120,
    textAlign: "center",
  },
  subtext: {
    fontSize: 16,
    fontFamily: Nunito_SemiBold,
    color: "#CFCFCF",
  },
  schedule: {
    fontSize: 14,
    fontFamily: Nunito_Regular,
    color: "#FFC498",
  },
  court: {
    marginVertical: 5,
    fontSize: 12,
    fontFamily: Nunito_Medium,
    color: "#F3F2F5",
  },
  line: {
    height: 0,
    borderColor: "#443A59",
    borderWidth: 0.7,
    width: "100%",
    marginVertical: 15,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: Nunito_Bold,
    color: "#FF9C33",
  },
  address: {
    fontSize: 12,
    fontFamily: Nunito_Regular,
    color: "#ABABAB",
  },
  center: {
    fontSize: 12,
    fontFamily: Nunito_Regular,
    color: "#DDDDDD",
  },
  image: {
    width: 60,
    height: 60,
    marginLeft: 25,
  },
  textContainer: {
    flex: 0.85,
    paddingLeft: 30,
  },
  subtext: {
    fontSize: 12,
    marginTop: 6,
    fontFamily: Nunito_Regular,
    color: "#CACACA",
  },
  sportsview: {
    width: 60,
    height: 106,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,
    paddingHorizontal: 30,
    borderColor: "#97B1FC",
    borderWidth: 1,
    borderRadius: 22,
  },
});

export default CongratulationScreen;

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
import { ScrollView } from "react-navigation";

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
      currentIndex: 10,
      proseednext: false,
      userName: "",
      centerName: "",
      centerAddress: "",
      centerImage: "",
      centerDistance: "",
      sportName: "",
      sportImage: "",
      time: "",
      levelImage: "",
      levelName: "",
      date: new Date(),
      timeString: "",
      selectTrial: "",
    };
  }

  componentDidMount() {
    this.handleopen();
  }

  handleopen = async () => {
    const username = await AsyncStorage.getItem("user_name");

    const myArray = await AsyncStorage.getItem("center");
    const data = JSON.parse(myArray);

    const sportArray = await AsyncStorage.getItem("sports");
    const sportData = JSON.parse(sportArray);

    const levelArray = await AsyncStorage.getItem("select_level");
    const levelData = JSON.parse(levelArray);

    const selecttrial = await AsyncStorage.getItem("select_trial");

    const timeArray = await AsyncStorage.getItem("select_times");

    const dateString = await AsyncStorage.getItem("select_date");
    const date = new Date(dateString);
    const startTime = timeArray.split(" ")[0];
    const startTimeString =
      startTime.split("-")[0] + ":00 " + timeArray.split(" ")[3];
    this.setState({
      userName: username,
      centerName: data.title,
      centerImage: data.image,
      centerAddress: data.address,
      centerDistance: data.distance,
      sportName: sportData.name,
      sportImage: sportData.image,
      time: timeArray,
      levelImage: levelData.image,
      levelName: levelData.name,
      date: date,
      timeString: startTimeString,
      selectTrial: selecttrial,
    });
  };

  openGoogleMaps = () => {
    const latitude = 26.9124;
    const longitude = 75.7873;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.06)"]}
          locations={[0, 1]}
          style={[styles.subcontainer]}
        >
          <Image
            source={require("../../../images/playing/Congratulations.png")}
            style={{
              width: 200,
              height: 300,
              marginTop: -160,
            }}
          />

          <Text style={styles.title}>
            Congratulations {this.state.userName}!
          </Text>
          <Text style={styles.subtext}>Your trial session is confirmed.</Text>
          <View style={styles.line} />
          <View style={styles.item}>
            <View style={{ flex: 0.25 }}>
              <ImageBackground
                source={require("../../../images/playing/sportsbackground.png")}
                style={[styles.sportsview]}
              >
                <Image source={this.state.sportImage} style={styles.image} />
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
              {this.state.selectTrial === "Playing Trial" && (
                <Text style={styles.court}>
                  Court : {this.state.sportName} court 2
                </Text>
              )}
              <Text style={[styles.schedule]}>
                {this.state.date == new Date() ? "Today, " : "Tomorrow, "}
                {this.state.date.getDate()}{" "}
                {this.months[this.state.date.getMonth()]}{" "}
                {this.state.date.getFullYear()} at {this.state.timeString}
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
    height: 500,
    marginBottom: 40,
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
    fontFamily: "Nunito-800",
    color: "#E8AC43",
    marginVertical: 10,
  },
  subtext: {
    fontSize: 16,
    fontFamily: "Nunito-400",
    color: "#CFCFCF",
  },
  schedule: {
    fontSize: 14,
    fontFamily: "Nunito-400",
    color: "#FFC498",
  },
  court: {
    fontSize: 12,
    fontFamily: "Nunito-500",
    color: "#F3F2F5",
  },
  line: {
    height: 0,
    borderColor: "#443A59",
    borderWidth: 0.7,
    width: "100%",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Nunito-700",
    color: "#FF9C33",
  },
  address: {
    fontSize: 12,
    fontFamily: "Nunito-400",
    color: "#ABABAB",
  },
  center: {
    fontSize: 12,
    fontFamily: "Nunito-400",
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
    fontFamily: "Nunito-400",
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

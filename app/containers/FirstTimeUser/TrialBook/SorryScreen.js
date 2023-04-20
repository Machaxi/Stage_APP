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
import CustomButton from "../../../components/custom/CustomButton";

class SorryScreen extends Component {
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
    const selectCenter = this.props.selectCenter;
    const selectSport = this.props.selectSport;
    const selectDate = this.props.selectDate;
    const selectLevel = this.props.selectLevel;
    const selectBatch = this.props.selectBatch;
    const distance = this.props.distance;
    const selectTime = selectBatch.startTime;
    const title = this.props.title;

    this.setState({
      userName: username,
      centerName: selectCenter.name,
      centerImage: selectCenter.cover_pic,
      centerAddress: selectCenter.address,
      centerDistance: distance,
      sportName: selectSport.name,
      sportImage: selectSport.image,
      levelImage: selectLevel.image,
      levelName: selectLevel.name,
      date: selectDate,
      selectTrial: title,
      timeString: selectTime,
    });
  };

  openGoogleMaps = () => {
    const latitude = 26.9124;
    const longitude = 75.7873;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  render() {
    handlepress = () => {
      this.props.onPress();
    };

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.06)"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.subcontainer]}
        >
          <Image
            source={require("../../../images/playing/sorry.png")}
            style={{
              width: 170,
              height: 230,
              marginTop: -130,
            }}
          />

          <Text style={styles.title}>Sorry !</Text>
          <Text style={styles.subtext}>
            We could not book your free trial, please try again.
          </Text>
          <CustomButton
            name="Try Again "
            available={true}
            height={48}
            onPress={handlepress}
          />
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
  subcontainer: {
    width: "100%",
    height: 380,
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
    fontFamily: "Nunito-700",
    color: "#FF6C6C",
    marginVertical: 30,
  },
  subtext: {
    fontSize: 16,
    fontFamily: "Nunito-600",
    color: "#CFCFCF",
    marginBottom: 30,
    textAlign: "center",
  },
});

export default SorryScreen;

import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../components/custom/CustomButton";
import HeaderContentComponent from "../../components/custom/HeaderContentComponent";
import PlayPass from "../../components/custom/PlayPass";
import AsyncStorage from "@react-native-community/async-storage";

class PlayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingSuccess: "",
    };
  }

  componentDidMount() {
    this.handleopen();
  }

  handleopen = async () => {
    const bookingsuccess = await AsyncStorage.getItem("book_trial_playing");
    this.setState({ bookingSuccess: bookingsuccess });
  };

  render() {
    const contents = [
      "Multi sport access with a single membership",
      "Guaranteed same level playing partner matched using algorithms",
      "Access to all Machaxi centres with a single membership",
      "Exclusive Tournaments for Machaxi playing members",
      "Modern infra, parking, Sports Shop and Cafe",
    ];
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 0.85, paddingHorizontal: 20 }}>
          <Image
            source={require("../../images/playing/playt.png")}
            style={{ marginBottom: 5, height: 140, width: 220 }}
          />
          <Image
            source={require("../../images/playing/play_sports.png")}
            style={{ width: "85%", height: 540, marginLeft: 25 }}
          />
          <HeaderContentComponent
            header="Playing Membership"
            contents={contents}
            colors={"#ED6F53"}
          />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity activeOpacity={0.8}>
              <PlayPass name="Gold Membership" price="2,000" image="1" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <PlayPass name="Monthly" price="4,000" image="2" />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity activeOpacity={0.8}>
              <PlayPass name="Quarterly" price="7,200" image="3" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <PlayPass name="Annually" price="13,000" image="4" />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.06)"]}
          locations={[0, 1]}
          style={styles.bottomcontainer}
        >
          {this.state.bookingSuccess === "Playing" ? (
            <View style={{ width: "90%" }}>
              <CustomButton name="Buy Coaching Plan" available={true} />
            </View>
          ) : (
            <View style={{ width: "90%", alignItems: "center" }}>
              <CustomButton
                name="Book Free Trial"
                available={true}
                onPress={this.props.onPress}
              />
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.insideText}>Or Buy Playing plan</Text>
              </TouchableOpacity>
            </View>
          )}
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  insideText: {
    marginTop: 10,
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: "Nunito-600",
  },
  bottomcontainer: {
    flex: 0.15,
    paddingTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PlayScreen;

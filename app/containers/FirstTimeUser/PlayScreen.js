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

class PlayScreen extends Component {
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
            style={{ marginBottom: 5, height: 160, width: 240 }}
          />
          <Image
            source={require("../../images/playing/play_sports.png")}
            style={{ width: "96%", height: 610 }}
          />
          <HeaderContentComponent
            header="Playing Membership"
            contents={contents}
            colors={"#ED6F53"}
          />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity activeOpacity={0.8}>
              <PlayPass name="Monthly" price="4,000" image="1" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <PlayPass name="Quarterly" price="7,200" image="2" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <PlayPass name="Annually" price="13,000" image="3" />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0.15)",
            "rgba(118, 87, 136, 0)",
            "rgba(118, 87, 136, 0)",
            "rgba(118, 87, 136, 0.44)",
          ]}
          locations={[0, 30, 60, 1]}
          style={styles.bottomcontainer}
        >
          <View style={{ width: "90%" }}>
            <CustomButton name="Book Free Trial" available={true} />
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.insideText}>Or Buy Playing plan</Text>
          </TouchableOpacity>
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
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "Nunito-Regular",
  },
  bottomcontainer: {
    flex: 0.15,
    paddingTop: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
});

export default PlayScreen;

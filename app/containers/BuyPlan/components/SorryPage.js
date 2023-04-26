import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import CustomButton from "../../../components/custom/CustomButton";
import { Nunito_Bold, Nunito_SemiBold } from "../../util/fonts";

class SorryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
    };
  }

  render() {
    handlepress = () => {
      this.props.onPressBack();
    };

    handlePaypress = () => {
      this.props.onPressBack();
    };

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.25)", "rgba(255, 255, 255, 0.06)"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.subcontainer]}
        >
          <View style={{ flexDirection: "row-reverse", width: "100%" }}>
            <TouchableOpacity activeOpacity={0.8} onPress={handleCrosspress}>
              <Image
                source={require("../../../images/cancel.png")}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Payment Failed !</Text>
          <Text style={styles.subtext}>{this.props.errorMessage}</Text>
          <CustomButton
            name={this.props.buttonName}
            hideImage={true}
            available={true}
            onPress={handlePaypress}
          />
        </LinearGradient>
        <Image
          source={require("../../../images/playing/sorry.png")}
          style={{
            width: 170,
            height: 230,
            marginBottom: -130,
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
  subcontainer: {
    width: "100%",
    height: 380,
    marginBottom: 40,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
  },
  title: {
    fontSize: 22,
    fontFamily: Nunito_Bold,
    color: "#FF6C6C",
    marginBottom: 20,
    marginTop: 120,
  },
  subtext: {
    fontSize: 16,
    fontFamily: Nunito_SemiBold,
    color: "#CFCFCF",
    marginBottom: 30,
    textAlign: "center",
  },
});

export default SorryPage;

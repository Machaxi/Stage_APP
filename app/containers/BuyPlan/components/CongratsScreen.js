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
import { Nunito_Bold, Nunito_SemiBold } from "../../util/fonts";

class CongratsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
    };
  }

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
          <Text style={styles.title}>Payment Done!</Text>
          <Text style={styles.subtext}>{this.props.errorMessage}</Text>
          <CustomButton
            name="Home "
            image={require("../../../images/playing/arrow_go.png")}
            available={true}
            onPress={handlepress}
          />
        </LinearGradient>
        <Image
          source={require("../../../images/playing/Congratulations.png")}
          style={{
            width: 220,
            height: 360,
            marginBottom: -180,
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
    height: 420,
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
    fontFamily: Nunito_Bold,
    color: "#E8AC43",
    marginBottom: 20,
    marginTop: 150,
  },
  subtext: {
    fontSize: 16,
    fontFamily: Nunito_SemiBold,
    color: "#CFCFCF",
    marginBottom: 30,
    textAlign: "center",
  },
});

export default CongratsScreen;

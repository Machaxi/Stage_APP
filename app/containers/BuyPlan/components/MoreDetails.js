import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../../components/custom/CustomButton";
import { whiteGreyBorder } from "../../util/colors";
import { Nunito_Medium, Nunito_SemiBold } from "../../util/fonts";
import SelectLevel from "../../../components/custom/SelectLevel";

const data = [
  {
    id: 1,
    image: require("../../../images/playing/beginner.png"),
    name: "Beginner",
  },
  {
    id: 2,
    image: require("../../../images/playing/intermediate.png"),
    name: "Intermediate",
  },
  {
    id: 3,
    image: require("../../../images/playing/advance.png"),
    name: "Advance",
  },
  {
    id: 4,
    image: require("../../../images/playing/professional.png"),
    name: "Professional",
  },
];

class MoreDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 100,
      currentLevel: 10,
      proseednext: false,
    };
  }

  render() {
    handlepress = () => {
      this.props.onPress(
        this.props.sportList.find((item) => item.id === this.state.currentIndex)
      );
    };

    return (
      <View style={styles.contain}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 0.93 }}>
          <Text style={styles.heading}>More details</Text>
          <Text style={styles.mainText}>
            Select preferred sport{" "}
            <Text style={[styles.mainText, { fontSize: 11 }]}>
              (To personalize your experience)
            </Text>
          </Text>
          <View style={styles.contained}>
            {this.props.sportList.map((item) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={item.id}
                style={[styles.subview]}
                onPress={() =>
                  this.setState({ currentIndex: item.id, proseednext: true })
                }
              >
                <LinearGradient
                  colors={["rgba(255, 255, 255, 0.1)", "rgba(118, 87, 136, 0)"]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.sportsview}
                >
                  <ImageBackground
                    source={
                      item.id === this.state.currentIndex
                        ? require("../../../images/playing/select_sports.png")
                        : null
                    }
                    style={styles.imaged}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={styles.imageitem}
                      resizeMode="center"
                    />
                  </ImageBackground>
                </LinearGradient>
                <Text style={styles.sportText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.mainText}>Select player Level</Text>
          <View style={styles.contained}>
            {data.map((item, index) => (
              <SelectLevel
                index={index}
                currentLevel={this.state.currentLevel}
                image={item.image}
                id={item.id}
                name={item.name}
                onPress={() => {
                  this.setState({ currentLevel: index, proseedLevel: true });
                }}
              />
            ))}
          </View>
        </ScrollView>
        <View style={{ flex: 0.07, paddingTop: 20 }}>
          <CustomButton
            name="Submit"
            available={this.state.proseednext && this.state.proseedLevel}
            onPress={handlepress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contained: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  contain: {
    flex: 1,
    marginVertical: 20,
  },
  heading: {
    fontSize: 20,
    marginTop: 8,
    fontFamily: Nunito_SemiBold,
    color: "#FFCB6A",
  },
  subview: {
    width: 100,
    height: 120,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  sportsview: {
    width: 100,
    height: 93,
    justifyContent: "center",
    alignItems: "center",
    borderColor: whiteGreyBorder,
    borderWidth: 1,
    borderRadius: 10,
  },
  imageitem: {
    width: 64,
    height: 64,
    zIndex: 2,
  },
  sportText: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: Nunito_Medium,
    color: "#BBBBBB",
  },
  mainText: {
    fontSize: 16,
    marginVertical: 8,
    fontFamily: Nunito_SemiBold,
    color: "#D1D1D1",
  },
  imaged: {
    marginTop: 5,
    width: 100,
    height: 93,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MoreDetails;

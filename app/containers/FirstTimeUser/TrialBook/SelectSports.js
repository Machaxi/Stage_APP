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
import AsyncStorage from "@react-native-community/async-storage";

// const data = [
//   {
//     id: 1,
//     image: require("../../../images/playing/badminton.png"),
//     name: "Badminton",
//   },
//   {
//     id: 2,
//     image: require("../../../images/playing/swimming.png"),
//     name: "Swimming",
//   },
//   {
//     id: 3,
//     image: require("../../../images/playing/table_tennis.png"),
//     name: "Table Tennis",
//   },
//   {
//     id: 4,
//     image: require("../../../images/playing/football.png"),
//     name: "Football",
//   },
//   {
//     id: 5,
//     image: require("../../../images/playing/cricket.png"),
//     name: "Cricket",
//   },
//   { id: 6, image: require("../../../images/playing/zumba.png"), name: "Zumba" },
// ];

class SelectSports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 100,
      proseednext: false,
    };
  }

  render() {
    handlepress = () => {
      // const myArrayString = JSON.stringify(this.props.sportList.find(item => item.id === this.state.currentIndex));
      // AsyncStorage.setItem("sports", myArrayString);
      this.props.onPress(this.props.sportList.find(item => item.id === this.state.currentIndex));
    };

    return (
      <ScrollView>
        <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          marginVertical: 20,
        }}
      >
        <Text style={styles.mainText}>Select preferred sport</Text>
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
                colors={[
                  "rgba(255, 255, 255, 0.15)",
                  "rgba(118, 87, 136, 0)",
                  "rgba(118, 87, 136, 0)",
                  "rgba(118, 87, 136, 0.44)",
                ]}
                locations={[0, 0.3, 0.6, 1]}
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
                  <Image source={{ uri: item.image}} style={styles.imageitem} />
                </ImageBackground>
              </LinearGradient>
              <Text style={styles.sportText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ marginTop: 10 }}>
          <CustomButton
            name="Next "
            image={require("../../../images/playing/arrow_go.png")}
            available={this.state.proseednext}
            onPress={handlepress}
          />
        </View>
        </View>
      </ScrollView>
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
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imageitem: {
    width: 64,
    height: 64,
    zIndex: 2,
  },
  sportText: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: "Nunito-500",
    color: "#BBBBBB",
  },
  mainText: {
    fontSize: 16,
    marginVertical: 8,
    fontFamily: "Nunito-600",
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

export default SelectSports;

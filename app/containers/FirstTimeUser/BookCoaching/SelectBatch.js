import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../../components/custom/CustomButton";

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
    image: require("../../../images/playing/intermediate.png"),
    name: "Intermediate",
  },
  {
    id: 4,
    image: require("../../../images/playing/professional.png"),
    name: "Professional",
  },
];

class SelectBatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLevel: 10,
      proseednext: false,
    };
  }

  render() {
    return (
      <ScrollView>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            marginVertical: 20,
          }}
        >
          <Text style={styles.mainText}>Select preferred Batch</Text>
          <Text style={styles.select}>Select player Level</Text>
          <View style={styles.contained}>
            {data.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                style={[styles.subview]}
                onPress={() =>
                  this.setState({ currentLevel: index, proseednext: true })
                }
              >
                <LinearGradient
                  colors={
                    index === this.state.currentLevel
                      ? ["rgba(243, 178, 118, 0.71)", "rgba(243, 223, 118, 0)"]
                      : [
                          "rgba(255, 255, 255, 0.15)",
                          "rgba(118, 87, 136, 0)",
                          "rgba(118, 87, 136, 0)",
                          "rgba(118, 87, 136, 0.44)",
                        ]
                  }
                  locations={
                    index === this.state.currentLevel
                      ? [0, 1]
                      : [0, 0.3, 0.6, 1]
                  }
                  style={styles.sportsview}
                >
                  <View style={styles.imaged}>
                    <Image source={item.image} style={styles.imageitem} />
                  </View>
                </LinearGradient>
                <Text style={styles.sportText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ marginTop: 180 }}>
            <CustomButton name="Next" available={this.state.proseednext} />
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
  select: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: "Nunito-Regular",
    fontWeight: "600",
    color: "#CACACA",
  },
  imageitem: {
    width: 64,
    height: 64,
    zIndex: 2,
  },
  sportText: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: "Nunito-Regular",
    fontWeight: "500",
    color: "#BBBBBB",
  },
  mainText: {
    fontSize: 16,
    marginVertical: 8,
    fontFamily: "Nunito-Regular",
    fontWeight: "600",
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

export default SelectBatch;

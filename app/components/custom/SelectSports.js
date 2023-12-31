import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { whiteGreyBorder } from "../../containers/util/colors";
import { Nunito_Medium } from "../../containers/util/fonts";

class SelectSports extends Component {

  handlepress (id){
    this.props.onPress(id);
  };

  render() {
    const { id, image, selectItem, name } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ marginRight: 10, marginBottom: 9, height: 30 }}
        onPress={()=> this.handlepress(id)}
      >
        <View>
          <LinearGradient
            colors={
              id == selectItem
                ? ["rgba(255, 180, 1, 0.06))", "rgba(255, 212, 89, 0.03)"]
                : ["rgba(255, 255, 255, 0.15)", "rgba(118, 87, 136, 0)"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.clockView,
              id == selectItem && {
                borderColor: "rgba(167, 134, 95, 0.6)",
              },
            ]}
          >
            <Text>{"    "}</Text>
            {id == selectItem && (
              <Image style={styles.clockimage} source={{uri : image}} />
            )}
            <Text
              style={[
                styles.sportText,
                { marginTop: -3, fontSize: 13 },
                id == selectItem && {
                  color: "#F2AE4D",
                },
              ]}
            >
              {name}
              {"    "}
            </Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  clockView: {
    flexDirection: "row",
    height: 30,
    borderColor: whiteGreyBorder,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  clockimage: {
    width: 16,
    height: 14,
    marginRight: 7,
  },
  sportText: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: Nunito_Medium,
    color: "#BBBBBB",
  },
});

export default SelectSports;

import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { whiteGreyBorder } from "../../containers/util/colors";
import { Nunito_Medium } from "../../containers/util/fonts";
import moment from "moment";

class SelectTimeItem extends Component {
  handlepress(val) {
    this.props.onPress(val);
  }

  checkIfSlotActive () {
     var randomStartDateTime = `${moment().format('YYYY-MM-DD')}T` + this.props.startTime;

     const time1 = new Date();
     const time2 = new Date(randomStartDateTime);
     const diffInMillisec = time2.getTime() - time1.getTime();

     // convert milliseconds to hours, minutes
     const diffInHours = diffInMillisec / (1000 * 60 * 60);

     if(diffInHours > 0){
      return true
     }
     else {
      return false;
     }
  }

  render() {
    const {  image, isSelected , id,  name, width, startTime } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          { marginRight: 10, marginBottom: 9, height: 30 },
          this.props.width ? { width: width } : {},
        ]}
        onPress={() => this.handlepress(id)}
      >
        <View>
          <LinearGradient
            colors={
              isSelected
                ? ["rgba(255, 180, 1, 0.06))", "rgba(255, 212, 89, 0.03)"]
                : ["rgba(255, 255, 255, 0.15)", "rgba(118, 87, 136, 0)"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.clockView,
              isSelected && {
                borderColor: "rgba(167, 134, 95, 0.6)",
              },
            ]}
          >
            <Text>{"    "}</Text>
            {isSelected && (
              <Image style={styles.clockimage} source={image} />
            )}
            <Text
              style={[
                styles.sportText,
                { marginTop: -3, fontSize: 13 },
                isSelected && {
                  color: "#F2AE4D",
                },
              ]}
            >
              {name}
              {"    "}
            </Text>
          </LinearGradient>
          {
            !this.checkIfSlotActive() &&
              <Image
                style={[
                  {
                    width: this.props.width,
                    height: "100%",
                    marginTop: -30,
                    tintColor: "#F2AE4D",
                  },
                  this.props.width ? { width: width } : {},
                ]}
                resizeMode="stretch"
                source={require("../../images/playing/cross.png")}
              />
          }
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

export default SelectTimeItem;

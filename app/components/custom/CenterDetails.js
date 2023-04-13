import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { whiteGreyBorder } from "../../containers/util/colors";

class CenterDetails extends Component {
  render() {
    const { item, currentIndex, distance } = this.props;

    handlepress = () => {
      this.props.onPress(item.id);
    };

    return (
      <TouchableOpacity onPress={handlepress}>
        <LinearGradient
          colors={
            item.id === currentIndex
              ? [
                  "rgba(255, 180, 1, 0.25)",
                  "rgba(255, 180, 1, 0.1)",
                  "rgba(255, 180, 1, 0.06)",
                ]
              : ["rgba(255, 255, 255, 0.15)", "rgba(118, 87, 136, 0)"]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.item}
        >
          <View style={{ flex: 0.3 }}>
            <Image source={{ uri: item.cover_pic }} style={styles.image} />
            <Text style={styles.distance}>{distance}</Text>
          </View>
          <View style={styles.textContainer}>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.title,
                  item.id === currentIndex && {
                    color: "#DFA35D",
                  },
                ]}
              >
                {item.name}
              </Text>
              <Text style={styles.address}>{item.address}</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 5,
    borderColor: whiteGreyBorder,
    borderWidth: 1,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 90,
    marginRight: 10,
    marginVertical: 5,
    borderRadius: 6,
  },
  distance: {
    width: "88%",
    fontSize: 10,
    marginTop: -20,
    marginBottom: 5,
    fontFamily: "Nunito-500",
    color: "#FFFFFF",
    backgroundColor: "rgba(35, 35, 35, 0.66)",
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 5,
  },
  textContainer: {
    flex: 0.7,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  title: {
    flex: 0.5,
    fontSize: 14,
    marginTop: 8,
    fontFamily: "Nunito-500",
    color: "#F0F0F0",
  },
  address: {
    flex: 0.5,
    marginVertical: 5,
    fontSize: 11,
    fontFamily: "Nunito-400",
    color: "#DDDDDD",
  },
});

export default CenterDetails;

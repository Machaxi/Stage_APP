import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";

export const ColourfulDrawerItem = ({ title, onPress, image, isExpanded }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress()}>
      <View style={styles.drawercell}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={[styles.topimage, isExpanded && { tintColor: "#FF9C33" }]}
            source={image}
          />
          <Text
            style={[styles.menuHeading, isExpanded && { color: "#FF9C33" }]}
          >
            {title}
          </Text>
        </View>
        <Image
          style={[
            styles.orange_arrow_img,
            isExpanded && {
              transform: [{ rotate: "180deg" }],
              tintColor: "#FF9C33",
            },
          ]}
          source={require("../../images/orange_arrow_down.png")}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuHeading: {
    color: "#AFAFAF",
    fontSize: 16,
    fontFamily: "Quicksand-Medium",
    marginTop: 2,
    textAlign: "center",
  },
  orange_arrow_img: {
    height: 5,
    width: 12,
    resizeMode: "contain",
    tintColor: "#AFAFAF",
  },
  topimage: {
    width: 28,
    height: 28,
    marginRight: 8,
    tintColor: "#AFAFAF",
  },
  drawercell: {
    // backgroundColor:'green',
    //padding: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  seperateFunction: {
    color: "#AFAFAF",
    fontSize: 16,
    fontFamily: "Quicksand-Medium",
    marginTop: 2,
    textAlign: "center",
  },
  arrow_img: {
    height: 12,
    width: 5,
    resizeMode: "contain",
  },
});

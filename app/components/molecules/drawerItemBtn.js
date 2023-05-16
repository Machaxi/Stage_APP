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

export const DrawerItemBtn = ({ onPress, itemImage, title }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        onPress()
      }}
    >
      <View style={styles.drawercell}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{
              width: 28,
              height: 28,
              resizeMode: "contain",
              marginRight: 4,
              marginTop: 2
            }}
            source={itemImage}
          />
          <Text style={styles.seperateFunction}>{title}</Text>
        </View>

        <Image
          style={styles.arrow_img}
          source={require("../../images/ic_drawer_arrow.png")}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    textAlign: "center",
  },
  arrow_img: {
    height: 12,
    width: 5,
    resizeMode: "contain",
  },
});

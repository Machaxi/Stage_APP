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

export const PlayerDetailsAndEdit = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        onPress();
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 15 }}
      >
        <Image
          resizeMode="contain"
          style={{
            width: 9,
            height: 9,
            borderRadius: 8,
          }}
          source={require("../../images/edit_profile.png")}
        />

        <Text
          style={{
            color: "#667DDB",
            fontFamily: "Quicksand-Medium",
            fontSize: 10,
            marginLeft: 4,
          }}
        >
          Edit
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  
});

import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { deviceWidth } from "../../containers/util/dimens";
import { blueVariant, greyVariant1, white } from "../../containers/util/colors";
import { Nunito_Regular } from "../../containers/util/fonts";

const RatingTabarHeader = ({ name, isSelected, onPressed }) => {
  return (
    <TouchableOpacity style={{marginRight: 24}} onPress={()=> onPressed(name)}>
      <Text
        style={[
          styles.tabTitle,
          { color: isSelected ? white : greyVariant1 },
        ]}
      >
        {name}
      </Text>
      <View
        style={{
          backgroundColor: isSelected ? blueVariant : "transparent",
          height: 3,
          marginTop: 7,
          width: deviceWidth * 0.11,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabTitle: {
    fontSize: 13,
    fontFamily: Nunito_Regular,
    marginTop: 2,
    fontWeight: "600",
  },
});

export default RatingTabarHeader;

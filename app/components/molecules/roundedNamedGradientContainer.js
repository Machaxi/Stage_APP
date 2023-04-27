import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { deviceWidth } from "../../containers/util/dimens";
import { greenVariant, white } from "../../containers/util/colors";
import { Nunito_Regular } from "../../containers/util/fonts";

const NamedRoundedGradientContainer = ({ name, colors, txtColor, width, isImg, image }) => {
  return (
    <LinearGradient
      colors={colors}
      style={[
        styles.requestContainer,
        {
          width: width ?? deviceWidth * 0.35,
          borderColor: txtColor ?? greenVariant,
        },
        isImg ? styles.imageContainer : null
      ]}
    >
        {isImg && <Image style={{height: 13, width: 13, marginRight: 8}} source={image} />}
        <Text
            style={[isImg ? styles.requestTypeImg : styles.requestType, { color: txtColor ?? greenVariant }]}
        >
            {name}
        </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  requestContainer: {
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  imageContainer: {flexDirection:'row', alignItems:'center', justifyContent: 'center', paddingVertical: 8},
  requestType: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
    fontFamily: Nunito_Regular,
  },
  requestTypeImg: {
    fontSize: 14,
    fontWeight: "500",
    color: white,
    textAlign: "center",
    fontFamily: Nunito_Regular,
  },
});

export default NamedRoundedGradientContainer;

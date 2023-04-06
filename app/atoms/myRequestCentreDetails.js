import React from "react";
import { Text, StyleSheet, View, ImageBackground } from "react-native";
import { deviceWidth } from "../containers/util/dimens";
import { blackVariant, darkGrey, white } from "../containers/util/colors";

const MyRequestCentreDetails = ({ details }) => {
  return (
    <View style={styles.centerRow}>
      <View style={styles.centerImgView}>
        <ImageBackground
          //resizeMode="cover"
          source={{
            uri: details?.image,
          }}
          style={[styles.centerImgView, styles.centerImg]}
        >
          <View style={styles.playCenterView}>
            <View style={styles.playCenterInner}>
              <Text style={styles.distance}>{details?.distance} away</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={{ flexDirection: "column", marginLeft: 12 }}>
        <Text style={[styles.centerName, { marginBottom: 4 }]}>
          {/* Machaxi Play9 Sports Centre, Whitefield */}
          {details.name}
        </Text>
        <Text style={styles.centerAddr}>
          {/* 68/1, 1, near Parijatha Farm, Whitefield, Siddapura. */}
          {details?.address}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerRow: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 14,
  },
  centerAddr: {
    fontSize: 11,
    fontWeight: "400",
    width: deviceWidth * 0.6,
    color: darkGrey,
  },
  centerName: {
    fontSize: 14,
    fontWeight: "700",
    width: deviceWidth * 0.6,
    color: white,
  },
  distance: {
    fontSize: 10,
    fontWeight: "400",
    color: white,
    textAlign: "center",
  },
  centerImg: {
    alignItems: "baseline",
    overflow: "hidden",
  },
  centerImgView: {
    width: 96,
    height: 96,
    borderRadius: 8,
    borderColor: darkGrey,
    borderWidth: 0.5,
  },
  playCenterView: {
    height: 96,
    width: 76,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  playCenterInner: {
    backgroundColor: blackVariant,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 4,
  },
});

export default MyRequestCentreDetails;

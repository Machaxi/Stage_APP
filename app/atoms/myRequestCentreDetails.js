import React from "react";
import { Text, StyleSheet, View, ImageBackground } from "react-native";
import { deviceWidth } from "../containers/util/dimens";
import {
  blackVariant,
  borderGrey,
  darkGrey,
  goldenYellow,
  white,
} from "../containers/util/colors";
import {
  Nunito_Bold,
  Nunito_Medium,
  Nunito_Regular,
} from "../containers/util/fonts";

const MyRequestCentreDetails = ({ details }) => {
  return (
    <View>
      <View style={styles.centerRow}>
        <View style={styles.centerImgView}>
          <ImageBackground
            //resizeMode="cover"
            source={{
              uri: details?.cover_pic,
            }}
            style={[styles.centerImgView, styles.centerImg]}
          >
            {details?.cover_pic == null && (
              <View style={styles.centerContent}>
                <Text style={{ color: "white" }}>Basic</Text>
              </View>
            )}
            {/* <View style={styles.playCenterView}>
              <View style={styles.playCenterInner}>
                <Text style={styles.distance}>{details?.distance} away</Text>
              </View>
            </View> */}
          </ImageBackground>
        </View>
        <View style={styles.centerview}>
          <Text style={[styles.centerName, { marginBottom: 4 }]}>
            {details?.name}
          </Text>
          <Text style={styles.centerAddr}>
            {details?.address}
          </Text>
        </View>
      </View>
      <View style={styles.line} />
      <Text style={[styles.bookingDetails, { marginVertical: 14 }]}>
        Booking Details
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bookingDetails: {
    color: goldenYellow,
    fontFamily: Nunito_Medium,
    fontWeight: "500",
    fontSize: 14,
  },
  centerview: { 
    flexDirection: "column", 
    marginLeft: 12, 
    marginTop: 13 
  },
  line: { 
    color: borderGrey, 
    width: "100%", 
    height: 1 
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerName: {
    fontSize: 14,
    color: white,
  },
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
    fontFamily: Nunito_Regular,
  },
  centerName: {
    fontSize: 14,
    fontWeight: "700",
    width: deviceWidth * 0.6,
    color: white,
    fontFamily: Nunito_Bold,
  },
  distance: {
    fontSize: 10,
    fontWeight: "400",
    color: white,
    textAlign: "center",
    fontFamily: Nunito_Regular,
  },
  centerImg: {
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

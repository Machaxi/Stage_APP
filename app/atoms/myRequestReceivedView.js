import React from "react";
import { Text, StyleSheet, Image, View, TouchableOpacity } from "react-native";
import {
  borderGrey,
  borderWhite,
  darkBlue,
  goldenYellow,
  greyVariant1,
  lightBlue,
  lightBlueColor,
  lightPurpleColor,
  redVariant,
  redVariant1,
  white,
  whiteGreyBorder,
} from "../containers/util/colors";
import NamedRoundedContainer from "./namedRoundedContainer";
import MyRequestPlayersList from "./myRequestPlayersList";
import MainBookingDetails from "./mainBookingDetails";
import MyRequestCentreDetails from "./myRequestCentreDetails";
import { deviceWidth } from "../containers/util/dimens";
import LinearGradient from "react-native-linear-gradient";

const MyRequestReceivedView = ({ val, acceptRequest, declineRequest, showBookingDetails, areDetailsShown }) => {
  return (
    <View activeOpacity={0.8} style={styles.requestOuterView}>
      {/* <View style={styles.detailsTopRow}> */}
      <Text style={[styles.centerName, { marginBottom: 22 }]}>
        Machaxi Play9 Sports Centre, Whitefield, San Fransisco, USA
      </Text>
      <Text style={[styles.bookingDetails, { marginBottom: 13 }]}>
        Player details
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Text style={[styles.detailsTxt, { marginRight: 18 }]}>UserName</Text>
        <Text style={[styles.level]}>Beginner | 22 Y</Text>
      </View>
      <Text style={[styles.detailsTxt]}>+1 Guest</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 19,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={()=> declineRequest()}>
          <Text style={[styles.declineReq, { marginRight: 18 }]}>
            Decline request
          </Text>
        </TouchableOpacity>

        <LinearGradient
          start={{ x: 0, y: 0.75 }}
          end={{ x: 1, y: 0.25 }}
          colors={["#0000ff80", "#0000ffb3"]}
          style={{
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => acceptRequest("")}
            style={styles.declineBtn}
          >
            <Text
              style={[
                { color: lightBlueColor, fontSize: 16, fontWeight: "800" },
              ]}
            >
              Accept Request
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View
        style={{
          backgroundColor: borderWhite,
          width: '100%',
          height: 0.5,
          marginVertical: 12,
        }}
      />
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => showBookingDetails()}
      >
        <Text style={[styles.viewBookingDetails, { marginRight: 6 }]}>
          Booking Details
        </Text>
        <Image
          style={[
            styles.arrow_img,
            {
              transform: [{ rotate: areDetailsShown ? "270deg" : "90deg" }],
            },
          ]}
          source={require("../images/ic_drawer_arrow.png")}
        />
      </TouchableOpacity>
      {areDetailsShown ? (
        <View>
          <MyRequestCentreDetails details={val} />
          <View style={{ color: borderGrey, width: "100%", height: 1 }} />
          <Text style={[styles.bookingDetails, { marginVertical: 14 }]}>
            Booking Details
          </Text>
          <View style={styles.rowSpaceBtw}>
            {[
              { name: "Sport", value: val?.sport_name },
              { name: "Slot", value: val?.slot },
              { name: "Pool", value: val?.pool },
            ].map((value) => (
              <MainBookingDetails details={value} />
            ))}
          </View>
          <Text
            style={[styles.detailsTitle, { marginTop: 15, marginBottom: 5 }]}
          >
            Registered Players
          </Text>
          {val?.player_details.map((value) => (
            <MyRequestPlayersList item={value} />
          ))}
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  detailsTxt: {
    fontWeight: "400",
    fontSize: 14,
    color: white,
  },
  arrow_img: {
    height: 12,
    width: 5,
    resizeMode: "contain",
    marginLeft: 5
  },
  declineBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  viewBookingDetails: {
    fontWeight: "400",
    fontSize: 12,
    color: lightPurpleColor,
  },
  declineReq: {
    fontWeight: "400",
    fontSize: 14,
    color: redVariant1,
  },
  detailsTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centerName: {
    fontSize: 14,
    fontWeight: "700",
    //width: deviceWidth * 0.7,
    color: white,
  },
  rowSpaceBtw: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsTitle: {
    fontWeight: "400",
    fontSize: 10,
    color: greyVariant1,
  },

  bookingDetails: {
    color: goldenYellow,
    fontWeight: "500",
    fontSize: 14,
  },
  level: {
    color: greyVariant1,
    fontWeight: "400",
    fontSize: 14,
  },
  requestOuterView: {
    //width: "100%",
    marginTop: 20,
    backgroundColor: lightBlue,
    borderColor: whiteGreyBorder,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 13,
    paddingHorizontal: 12,
    paddingVertical: 17,
  },

  cancelBooking: {
    fontSize: 14,
    fontWeight: "400",
    color: redVariant,
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    // backgroundColor: 'green'
  },

  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: 'red',
  },
  rightIcon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    marginRight: 20,
    //backgroundColor: 'white',
  },

  scoreBox: {
    color: "white",
    marginRight: 20,
    textAlign: "right",
    fontSize: 24,
    fontFamily: "Quicksand-Bold",
    color: "#F4F4F4",
  },
  buttomButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,

    backgroundColor: "white",
    marginTop: 10,
    marginBottom: -5,
    marginLeft: -5,
    marginRight: -5,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 1 },
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default MyRequestReceivedView;

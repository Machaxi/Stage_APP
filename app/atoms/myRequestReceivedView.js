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
  redVariant2,
  white,
  whiteGreyBorder,
} from "../containers/util/colors";
import NamedRoundedContainer from "./namedRoundedContainer";
import MyRequestPlayersList from "./myRequestPlayersList";
import MainBookingDetails from "./mainBookingDetails";
import MyRequestCentreDetails from "./myRequestCentreDetails";
import { deviceWidth } from "../containers/util/dimens";
import LinearGradient from "react-native-linear-gradient";
import {
  Nunito_Bold,
  Nunito_ExtraBold,
  Nunito_Medium,
  Nunito_Regular,
} from "../containers/util/fonts";
import NamedRoundedGradientContainer from "../components/molecules/roundedNamedGradientContainer";
import {
  getProficiencyName,
  requestStatus,
  requestStatusBg,
  requestStatusName,
  requestStatusTxtColor,
} from "../containers/util/utilFunctions";

const MyRequestReceivedView = ({
  val,
  acceptRequest,
  declineRequest,
  showBookingDetails,
  areDetailsShown,
}) => {
  const proficiency = getProficiencyName(val?.user?.proficiency ? val?.user?.proficiency.toLowerCase() : "basic")
  return (
    <LinearGradient
      colors={["#ffffff11", "#ffffff03"]}
      style={styles.requestOuterView}
    >
      {/* <View style={styles.detailsTopRow}> */}
      {val?.status != "" && typeof val?.status != undefined ? (
        <NamedRoundedContainer
          name={requestStatusName(val?.status)}
          bgColor={requestStatusBg(val?.status)}
          txtColor={requestStatusTxtColor(val?.status)}
        />
      ) : null}
      <Text
        style={[styles.bookingDetails, { marginBottom: 13, marginTop: 10 }]}
      >
        Player details
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Text style={[styles.detailsTxt, { marginRight: 18 }]}>
          {val?.user?.name}
        </Text>
        <Text style={[styles.level]}>
          {proficiency} | {val?.user?.age} Y
        </Text>
      </View>
      <Text style={[styles.detailsTxt]}>
        {typeof val?.guestCount != undefined ? `+${val?.guestCount} Guest` : ""}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 19,
          justifyContent: "space-between",
        }}
      >
        {/* {val?.status != "DECLINED" && val?.status != "CANCELLED" ? ( */}
        {val?.status == "PENDING" ? (
          <TouchableOpacity onPress={() => declineRequest()}>
            <Text style={[styles.declineReq, { marginRight: 18 }]}>
              Decline request
            </Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
        {val?.status != "ACCEPTED" &&
        val?.status != "CANCELLED" &&
        val?.status != "DECLINED" ? (
          <LinearGradient
            start={{ x: 0, y: 0.75 }}
            end={{ x: 1, y: 0.25 }}
            colors={["#0000ff80", "#0000d7e6"]}
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
              <Text style={[styles.reqTxt]}>Accept Request</Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : null}
      </View>
      <View
        style={{
          backgroundColor: borderWhite,
          width: "100%",
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
          <MyRequestCentreDetails details={val?.academy} />

          <View style={styles.rowSpaceBtw}>
            {[
              { name: "Sport", value: val?.sport?.name },
              {
                name: "Slot",
                value: `${val?.displayTime}`,
                // `${val?.startTime} - ${val?.endTime}`
              },
              { name: val?.sport?.playingAreaName, value: val?.courtName },
            ].map((value) => (
              <MainBookingDetails details={value} />
            ))}
          </View>
          <Text
            style={[styles.detailsTitle, { marginTop: 15, marginBottom: 5 }]}
          >
            Registered Players
          </Text>
          {val?.players.map((value) => <MyRequestPlayersList item={value} />)}
        </View>
      ) : (
        <View />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  detailsTxt: {
    fontWeight: "400",
    fontSize: 14,
    color: white,
    fontFamily: Nunito_Regular,
  },
  reqTxt: {
    color: lightBlueColor,
    fontSize: 16,
    fontWeight: "800",
    fontFamily: Nunito_ExtraBold,
  },
  arrow_img: {
    height: 12,
    width: 5,
    resizeMode: "contain",
    marginLeft: 5,
  },
  declineBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  viewBookingDetails: {
    fontWeight: "400",
    fontSize: 12,
    color: lightPurpleColor,
    fontFamily: Nunito_Regular,
  },
  declineReq: {
    fontWeight: "400",
    fontSize: 14,
    color: redVariant1,
    fontFamily: Nunito_Regular,
  },
  detailsTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centerName: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: Nunito_Bold,

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
    fontFamily: Nunito_Regular,
  },

  bookingDetails: {
    color: goldenYellow,
    fontWeight: "500",
    fontSize: 14,
    fontFamily: Nunito_Medium,
  },
  level: {
    color: greyVariant1,
    fontWeight: "400",
    fontSize: 14,
    fontFamily: Nunito_Regular,
  },
  requestOuterView: {
    //width: "100%",
    marginTop: 20,
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

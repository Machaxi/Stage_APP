import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { borderGrey, darkBlue, goldenYellow, greyVariant1, lightBlue, redVariant, white, whiteGreyBorder } from "../containers/util/colors";
import NamedRoundedContainer from "./namedRoundedContainer";
import MyRequestPlayersList from "./myRequestPlayersList";
import MainBookingDetails from "./mainBookingDetails";
import MyRequestCentreDetails from "./myRequestCentreDetails";

const MyRequestSentView = ({ val, cancelBooking }) => {
  return (
    <View activeOpacity={0.8} style={styles.requestOuterView}>
    <View style={styles.detailsTopRow}>
        <NamedRoundedContainer name={"Request accepted"} />
        <TouchableOpacity onPress={() => cancelBooking()}>
          <Text style={styles.cancelBooking}>Cancel Booking</Text>
        </TouchableOpacity>
    </View>
    <MyRequestCentreDetails details={val} />
    <View style={{ color: borderGrey, width: "100%", height: 1 }} />
    <Text style={[styles.bookingDetails, { marginVertical: 14 }]}>
        Booking Details
    </Text>
    <View style={styles.rowSpaceBtw}>
        {[
        { name: "Sport", value: val?.sport_name },
        { name: "Slot", value: val?.slot },
        ,
        { name: "Pool", value: val?.pool },
        ].map((value) => (
        <MainBookingDetails details={value} />
        ))}
    </View>
    <Text style={[styles.detailsTitle, { marginTop: 15, marginBottom: 5 }]}>
        Registered Players
    </Text>
    {val?.player_details.map((value) => <MyRequestPlayersList item={value} />)}
    </View>
  );
  
};

const styles = StyleSheet.create({
  detailsTxt: {
    fontWeight: "400",
    fontSize: 14,
    color: white,
  },
  detailsTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

export default MyRequestSentView;


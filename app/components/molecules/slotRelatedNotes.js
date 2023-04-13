import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { commonStyles } from "../../containers/util/commonStyles";
import {
  goldenYellow,
  greyVariant7,
  white,
  borderGrey,
  greyVariant2,
  goldenBgColor,
  yellowVariant2,
  offWhiteVariant,
  greyColorVariant,
} from "../../containers/util/colors";
import { deviceWidth } from "../../containers/util/dimens";

const SlotRelatedNotes = ({ count, setCount }) => {
  return (
    <View
      style={[
        {
          backgroundColor: goldenBgColor,
          borderRadius: 10,
          paddingVertical: 12,
          paddingHorizontal: 10,
        },
      ]}
    >
      <View style={[commonStyles.flexRowAlignStart, { marginBottom: 10 }]}>
        <Image
          source={require("../../images/info_icon.png")}
          style={{ height: 18, width: 18, marginRight: 4 }}
        />
        <Text style={styles.note}>{"Note"}</Text>
      </View>
      <View
        style={[
          commonStyles.flexRowAlignStart,
          { marginBottom: 6, paddingRight: 6 },
        ]}
      >
        <Image
          source={require("../../images/tickIcon.png")}
          style={{ height: 18, width: 18, marginRight: 4 }}
        />

        <Text style={[styles.noteTxt, { color: offWhiteVariant }]}>
          {"Adding "}
          <Text style={[styles.noteTxt, { color: yellowVariant2 }]}>
            {"1 guest "}
          </Text>
          {"reduces "}
          <Text style={[styles.noteTxt, { color: yellowVariant2 }]}>
            {"1 hour "}
          </Text>
          {" from your total playing limit."}
        </Text>
      </View>
      <View
        style={[
          commonStyles.flexRowAlignStart,
          { marginBottom: 6, paddingRight: 6 },
        ]}
      >
        <Image
          source={require("../../images/tickIcon.png")}
          style={{ height: 18, width: 18, marginRight: 4, paddingRight: 6 }}
        />

        <Text style={[styles.noteTxt, { color: offWhiteVariant }]}>
          {"Maximum "}
          <Text style={[styles.noteTxt, { color: yellowVariant2 }]}>
            {"3 guests "}
          </Text>
          {"are allowed per booking."}
        </Text>
      </View>
      <View
        style={[
          commonStyles.flexRowAlignStart,
          { marginBottom: 6, paddingRight: 6 },
        ]}
      >
        <Image
          source={require("../../images/tickIcon.png")}
          style={{ height: 18, width: 18, marginRight: 4 }}
        />
        <Text style={[styles.noteTxt, { color: offWhiteVariant }]}>
          {"Booking entire court reduces "}
          <Text style={[styles.noteTxt, { color: yellowVariant2 }]}>
            {"4 hours "}
          </Text>
          {"from your total playing limit."}
        </Text>
      </View>
      <View
        style={[
          commonStyles.flexRowAlignStart,
          { marginBottom: 6, paddingRight: 6 },
        ]}
      >
        <Image
          source={require("../../images/tickIcon.png")}
          style={{ height: 18, width: 18, marginRight: 4 }}
        />

        <Text style={[styles.noteTxt, { color: offWhiteVariant }]}>
          {"Maximum "}
          <Text style={[styles.noteTxt, { color: yellowVariant2 }]}>
            {"4 persons "}
          </Text>
          {" including yourself are allowed for entire "}
          <Text style={[styles.noteTxt, { color: yellowVariant2 }]}>
            {"court "}
          </Text>
          {"booking."}
        </Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  note: {
    fontSize: 12,
    color: offWhiteVariant,
    fontFamily: "Nunito-600",
  },
  noteTxt: {
    fontSize: 12,
    color: yellowVariant2,
    fontFamily: "Nunito-600",
  },
  
  userCount: {
    fontSize: 14,
    color: goldenYellow,
    fontFamily: "Nunito-400",
  },
  addUsr: {
    fontSize: 14,
    color: white,
    fontFamily: "Nunito-600",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: greyVariant2,
    fontFamily: "Nunito-600",
    textAlign: "center",
  },
});

export default SlotRelatedNotes;

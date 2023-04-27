import React from "react";
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import {
  borderGrey,
  goldenYellowVariant,
  borderWhite,
  greyVariant2,
  greyVariant6,
  greyVariant7,
  yellowVariant4,
} from "../../containers/util/colors";
import { commonStyles } from "../../containers/util/commonStyles";
import { Nunito_Regular, Nunito_SemiBold } from "../../containers/util/fonts";

const CouponListItem = ({ coupon_code, discount, couponApplied }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0.75 }}
      end={{ x: 1, y: 0.25 }}
      colors={
        couponApplied
          ? ["#614a396e", "#5b4d431a"]
          : ["#ffffff3d", "#ffffff09"]
      }
      style={[
        styles.couponListItem,
        {
          borderColor: couponApplied ? goldenYellowVariant : borderGrey,
          borderWidth: 1,
          marginHorizontal: 12,
          marginBottom: 10,
        },
      ]}
    >
      {/* <TouchableOpacity
        // onPress={() => onTabPress("")}
        style={[styles.touchable, commonStyles.flexRowAlignStart]}
      > */}
        <Image
          source={require("../../images/coupon_icon.png")}
          style={styles.couponIcon}
        />
        <View style={styles.couponDetails}>
          <View style={[commonStyles.flexRowSpaceBtw, { marginBottom: 4 }]}>
            <View style={commonStyles.flexRowNormal}>
              <Text
                style={[
                  styles.couponCode,
                  { color: couponApplied ? yellowVariant4 : greyVariant6 },
                ]}
              >
                {coupon_code}
              </Text>
            </View>
            <Text style={styles.applyCoupon}>
              {couponApplied ? "Applied" : "Apply"}
            </Text>
          </View>
          <Text style={styles.applyCoupon}>
            {"Use this code & get "}
            <Text style={styles.discount}>{discount}</Text>
            {" off on you current playing plan."}
          </Text>
        </View>
      {/* </TouchableOpacity> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  couponListItem: {
    padding: 10,
    borderRadius: 6
  },
  couponCode: {
    fontFamily: Nunito_SemiBold,
    fontSize: 20,
  },
  discount: {
    color: yellowVariant4,
    fontSize: 12,
    fontFamily: Nunito_Regular,
  },
  desc: {
    color: greyVariant7,
    fontSize: 12,
    fontFamily: Nunito_Regular,
  },
  applyCoupon: {
    color: goldenYellowVariant,
    fontSize: 12,
    fontFamily: Nunito_Regular,
  },
  couponDetails: {flex: 1, alignSelf:'stretch'},
  couponIcon: {
    height: 26,
    width: 26,
    marginRight: 4,
  },
  touchable: {},
  tabView: {
    borderColor: borderWhite,
    borderWidth: 0.7,
  },
  colouredView: {
    width: 50,
    height: 7,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: greyVariant2,
    fontFamily: Nunito_SemiBold,
    textAlign: "center",
  },
});

export default CouponListItem;

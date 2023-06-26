import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  Nunito_Bold,
  Nunito_ExtraBold,
  Nunito_Medium,
  Nunito_Regular,
  Nunito_SemiBold,
} from "../../containers/util/fonts";

const CouponView = (props) => {
  return (
    <LinearGradient
      colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.06)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container]}
    >
      {props.appliedCoupon ? (
        <View style={styles.row}>
          <View style={{ flex: 0.12, alignItems: "center" }}>
            <Image
              style={{ width: 47, height: 47 }}
              source={require("../../images/playing/coupon.png")}
              resizeMode="contain"
            />
          </View>
          <View style={{ flex: 0.88, marginLeft: 10 }}>
            <View style={styles.couponview}>
              <Text style={[styles.titled, { color: "#01E3D6" }]}>
                Coupon Applied
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ alignItems: "center", zIndex: 1 }}
                onPress={() => {
                  props.onPressCancel();
                }}
              >
                <Image
                  style={{ width: 14, height: 14 }}
                  source={require("../../images/delete.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            {props.coupon != null && (
              <Text style={styles.subtitle}>{props.coupon.couponCode}</Text>
            )}
            <Text style={[styles.subtitle, { color: "#A3A5AE" }]}>
              You saved
              <Text style={[styles.subtitle, { color: "#FF9C33" }]}>
                {" "}
                ₹ {props.amount}{" "}
              </Text>
              with this offer on this plan.
            </Text>
          </View>
        </View>
      ) : (
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 47, height: 47 }}
              source={require("../../images/playing/coupon.png")}
              resizeMode="contain"
            />
            <Text style={[styles.titled, { marginLeft: 10 }]}>
              Apply Coupon
            </Text>
          </View>
          <Image
            style={{ width: 11, height: 11 }}
            source={require("../../images/playing/arrow_right.png")}
            resizeMode="contain"
          />
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
    marginHorizontal: 10,
    marginBottom: 15,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  couponview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titled: {
    fontSize: 14,
    fontFamily: Nunito_Medium,
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 12,
    fontFamily: Nunito_Regular,
    color: "#DDDDDD",
  },
  planView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  benefits: {
    fontSize: 12,
    color: "#F2AE4D",
    fontFamily: Nunito_SemiBold,
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: Nunito_Medium,
  },
  pricetitle: {
    fontSize: 16,
    color: "#F2AE4D",
    fontFamily: Nunito_ExtraBold,
  },
  next: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  subtext: {
    fontSize: 12,
    color: "#CACACA",
    fontFamily: Nunito_Regular,
  },
  description: {
    fontSize: 11,
    width: 190,
    color: "#E6E6E6",
    fontFamily: Nunito_SemiBold,
  },
  descriptionbenift: {
    fontSize: 12,
    color: "#E6E6E6",
    fontFamily: Nunito_SemiBold,
  },
  image: {
    width: 13,
    height: 13,
    marginTop: 5,
  },
});

export default CouponView;

{
  /* <TouchableOpacity>
<LinearGradient
  colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.06)"]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={{ flexDirection: "row", justifyContent: "space-between" }}
>
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Image
      style={{ width: 47, height: 47 }}
      source={require("../../../images/playing/coupon.png")}
      resizeMode="contain"
    />
    <Text>Apply Coupon</Text>
  </View>
  <Image
    style={{ width: 24, height: 24 }}
    source={require("../../../images/playing/coupon.png")}
    resizeMode="contain"
  />
</LinearGradient>
</TouchableOpacity> */
}

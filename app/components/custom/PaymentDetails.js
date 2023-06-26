import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  Nunito_Bold,
  Nunito_ExtraBold,
  Nunito_Medium,
  Nunito_Regular,
  Nunito_SemiBold,
} from "../../containers/util/fonts";

const PaymentDetails = (props) => {
  return (
    <LinearGradient
      colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.06)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container]}
    >
      <Text style={styles.titled}>Payment Detail</Text>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.title}> ₹ {props.price}</Text>
      </View>
      <Text style={styles.subtext}>Taxes + Machaxi Fee inclusive</Text>
      <View style={styles.line} />
      {props.appliedCoupon && (
        <View>
          <View style={styles.textContainer}>
            <Text style={[styles.title]}>Grand Total : </Text>
            <Text style={styles.title}> ₹ {props.price}</Text>
          </View>
          <View style={styles.textContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[styles.title, { color: "rgba(1, 227, 214, 0.77)" }]}
              >
                Coupon Applied{"  "}
              </Text>
            </View>
            <Text style={[styles.title, { color: "rgba(1, 227, 214, 0.77)" }]}>
              - ₹ {props.coupounPrice}
            </Text>
          </View>
          <View style={styles.line} />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={[styles.title, { fontSize: 16 }]}>Payable Amount : </Text>
        <Text style={styles.pricetitle}> ₹ {props.finalprice}</Text>
      </View>
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
  titled: {
    fontSize: 10,
    marginVertical: 5,
    fontFamily: Nunito_Medium,
    color: "#FF9C33",
  },
  line: {
    height: 1,
    backgroundColor: "#3F3750",
    marginBottom: 10,
    marginTop: 15,
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
    fontSize: 13,
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

export default PaymentDetails;

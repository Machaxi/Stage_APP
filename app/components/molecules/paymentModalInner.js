import React from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  lightBlueColor,
  lightGreyVariant,
  redColorVariant,
  yellowVariant6,
} from "../../containers/util/colors";
import { commonStyles } from "../../containers/util/commonStyles";
import { deviceWidth } from "../../containers/util/dimens";
import LinearGradient from "react-native-linear-gradient";

const PaymentModalInnerView = ({ isSuccess, onBtnPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
    >
      {/* <ImageBackground
            resizeMode="cover"
            source={require("../../images/blur_bg.png")}
            style={styles.modalBg}
          > */}
      <LinearGradient
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        colors={["#575f61ed", "#2b293aed"]}
        style={styles.modalBg}
      >
        <View
          style={styles.container}
        >
          <Text
            style={[
              styles.paymentStatus,
              {
                textAlign: "center",
                color: isSuccess ? yellowVariant6 : redColorVariant,
              },
            ]}
          >
            {isSuccess ? "Payment Done!" : "Payment Failed!"}
          </Text>
          <Text style={styles.desc}>
            {isSuccess
              ? "To book playing slots, Kindly tell us your preferred sport and playing level."
              : "You can retry your pay for the Coaching Plan if it appears that your payment was failed."}
          </Text>
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
            <TouchableOpacity onPress={() => {onBtnPress()}} style={styles.modalBtn}>
                {isSuccess ?
                <View style={commonStyles.flexRowNormal}>
                  <Text style={[styles.reqTxt, { marginRight: 4 }]}>
                    Next
                  </Text>
                  <Image
                    style={styles.rightArrow}
                    source={require("../../images/right_pink_arrow.png")}
                  />
                </View>
                :
              <Text style={[styles.reqTxt, { marginRight: 4 }]}>
                {"Pay ₹ 7700"}
              </Text>
                }
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </LinearGradient>
      {/* </ImageBackground> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rightArrow: { height: 25, width: 25 },
  container: {
    paddingHorizontal: 12,
    alignItems: "center",
    marginTop: 150,
  },
  modalBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    width: deviceWidth * 0.6,
  },
  paymentStatus: {
    marginTop: 28,
    fontSize: 22,
    fontWeight: "700",
    fontFamily: "Nunito-700",
    marginBottom: 18,
  },
  reqTxt: {
    color: lightBlueColor,
    fontSize: 16,
    fontWeight: "800",
    fontFamily: "Nunito-800",
  },
  modalBg: {
    overflow: "hidden",
    width: deviceWidth - 36,
    paddingBottom: 30,
    borderRadius: 15,
    alignItems: "center",
  },
  desc: {
    color: lightGreyVariant,
    fontSize: 16,
    fontFamily: "Nunito-600",
    textAlign: "center",
    marginBottom: 53,
  },
  modalView: {},
});

export default PaymentModalInnerView;

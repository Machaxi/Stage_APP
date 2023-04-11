import React from "react";
import {
  Text,
  View,
  Modal,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import {
  goldenYellowVariant,
  white,
  yellowVariant,
  yellowVariant4,
  yellowVariant6,
} from "../../containers/util/colors";
import { commonStyles } from "../../containers/util/commonStyles";
import { deviceWidth } from "../../containers/util/dimens";
import LinearGradient from "react-native-linear-gradient";

const CouponAppliedModal = ({ modalVisible, setModalVisibility }) => {
  return (
    <TouchableOpacity activeOpacity={1}>
      <LinearGradient
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        colors={["#575f61ed", "#2b293aed"]}
        style={[styles.modalBg,  styles.modalView ]}
      >
        {/* <ImageBackground
            resizeMode="cover"
            source={require("../../images/blur_bg.png")}
            style={styles.modalBg}
          > */}
        <View
          style={[
            commonStyles.flexRowNormal,
            { justifyContent: "flex-end", width: "100%" },
          ]}
        >
          <TouchableOpacity
            style={styles.crossBtn}
            onPress={() => {
              setModalVisibility();
            }}
          >
            <Image
              style={styles.cross}
              source={require("../../images/cross_icon.png")}
            />
          </TouchableOpacity>
        </View>
        <Image
          style={styles.congratsImage}
          source={require("../../images/congrats_emoji.png")}
        />
        <View style={{ paddingHorizontal: 12 }}>
          <Text style={styles.couponApply}>{"Coupon Applied"}</Text>
          <Text style={styles.applyCoupon}>
            {"Congratulation on saving "}
            <Text style={styles.discount}>{"10%"}</Text>
            {" with your plan."}
          </Text>
        </View>
      </LinearGradient>
      {/* </ImageBackground> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  crossBtn: {
    padding: 12,
  },
  modalBg: {
    overflow: "hidden",
    width: deviceWidth - 36,
    paddingBottom: 30,
  },
  discount: {
    color: yellowVariant4,
    fontSize: 16,
    fontFamily: "Nunito-700",
  },
  applyCoupon: {
    color: white,
    fontSize: 16,
    fontFamily: "Nunito-400",
    textAlign: "center",
  },
  couponApply: {
    fontSize: 22,
    color: yellowVariant6,
    fontFamily: "Nunito-700",
    marginTop: 16,
    marginBottom: 25,
    textAlign: "center",
  },
  congratsImage: {
    width: 170,
    height: 163,
    alignSelf: "center",
  },
  cross: {
    height: 25,
    width: 25,
  },
  modalView: {
    borderRadius: 15,
    overflow: "hidden",
    width: deviceWidth - 36,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default CouponAppliedModal;

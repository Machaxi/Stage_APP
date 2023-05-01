import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  Nunito_Bold,
  Nunito_Regular,
  Nunito_SemiBold,
} from "../../containers/util/fonts";

const AppliedCouponCode = (props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.onPressBack();
    }, 3000);
    return () => clearTimeout(timer);
  }, [props]);

  handleCrosspress = () => {
    props.onPressBack();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View style={styles.centeredView}>
        <ImageBackground
          resizeMode="contain"
          source={require("../../images/playing/couponBackgroung.png")}
          style={styles.centerImgView}
        >
          <View style={styles.subcontainer}>
            <View style={{ flexDirection: "row-reverse", width: "100%" }}>
              <TouchableOpacity activeOpacity={0.8} onPress={handleCrosspress}>
                <Image
                  source={require("../../images/cancel.png")}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            </View>
            <Image
              source={require("../../images/playing/couponApplied.png")}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.maintext}>Coupon Applied</Text>
            <Text style={styles.subtext}>
              Congratulation on saving
              <Text style={styles.sublinetext}> {props.price} </Text>
              with your plan.
            </Text>
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 20,
  },
  subcontainer: {
    margin: 35,
    marginHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  subtext: {
    fontSize: 16,
    fontFamily: Nunito_SemiBold,
    color: "#FFFFFF",
    textAlign: "center",
  },
  sublinetext: {
    fontSize: 16,
    fontFamily: Nunito_Regular,
    color: "#FF9C33",
  },
  maintext: {
    fontSize: 22,
    fontFamily: Nunito_Bold,
    color: "#E8AC43",
    marginBottom: 10,
  },
  centerImgView: {
    width: 400,
    height: 400,
  },
  image: {
    width: 170,
    height: 163,
    marginLeft: -20,
    marginBottom: 10,
  },
});

export default AppliedCouponCode;

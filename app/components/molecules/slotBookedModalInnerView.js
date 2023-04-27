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
  borderGrey,
  goldenYellow,
  goldenYellowVariant,
  lightGreyVariant2,
  offWhite,
  white,
  yellowVariant,
  yellowVariant4,
  yellowVariant6,
} from "../../containers/util/colors";
import { commonStyles } from "../../containers/util/commonStyles";
import { deviceWidth } from "../../containers/util/dimens";
import LinearGradient from "react-native-linear-gradient";
import MainBookingDetails from "../../atoms/mainBookingDetails";
import RoundedGradientBtn from "./roundedGradientBtn";
import { Nunito_Bold, Nunito_Medium, Nunito_Regular } from "../../containers/util/fonts";

const SlotBookedModalInnerView = ({
  modalVisible,
  setModalVisibility,
  onBtnPress,
  slotInfo,
}) => {
  return (
    <TouchableOpacity activeOpacity={1}>
      <LinearGradient
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        colors={["#575f61ed", "#2b293aed"]}
        style={[styles.modalBg, styles.modalView]}
      >
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
        <View style={{ paddingHorizontal: 30 }}>
          <Text style={styles.slotBooked}>{"Slot Booked"}</Text>
          <Text style={styles.slotBookedMsg}>
            {"Thank you ! Your session is booked"}
          </Text>
          <LinearGradient
            start={{ x: 0, y: 0.75 }}
            end={{ x: 1, y: 0.25 }}
            colors={["#605674", "#443a5900"]}
            style={{
              height: 1,
              width: deviceWidth - 80,
              backgroundColor: lightGreyVariant2,
            }}
          />
          <Text style={styles.centreName}>
            {`${slotInfo?.academy?.name} \n ${slotInfo?.academy?.address}`}
          </Text>
          <View style={[commonStyles.flexRowSpaceBtw]}>
            {[
              { name: "Sport", value: slotInfo?.booking?.sportName },
              {
                name: "Slot",
                // value: `${slotInfo?.booking?.startTime} - ${
                //   slotInfo?.booking?.endTime
                // }`,
                value: `${slotInfo?.booking?.displayTime}`,
              },
              ,
              { name: "Pool", value: "NA" },
            ].map((value) => (
              <MainBookingDetails width={deviceWidth * 0.25} details={value} />
            ))}
          </View>
          <View style={{ width: 1, height: 20 }} />
          <MainBookingDetails
            width={deviceWidth * 0.4}
            details={{
              name: "Player",
              value:
                slotInfo?.user?.name +
                `${
                  slotInfo?.booking?.guestCount > 0
                    ? "+" + slotInfo?.booking?.guestCount
                    : ""
                }`,
            }}
          />
          <View style={{ width: 1, height: 34 }} />
          <RoundedGradientBtn
            colors={["#48acf1", "#3e53d9"]}
            text={"Play"}
            onBtnPress={() => onBtnPress()}
            width={190}
          />
        </View>
      </LinearGradient>
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
  centreName: {
    color: white,
    fontSize: 16,
    fontFamily: Nunito_Medium,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 28,
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
    fontFamily: Nunito_Bold,
  },
  applyCoupon: {
    color: white,
    fontSize: 16,
    fontFamily: Nunito_Regular,
    textAlign: "center",
  },
  slotBookedMsg: {
    color: white,
    fontSize: 14,
    fontFamily: Nunito_Regular,
    textAlign: "center",
    marginBottom: 30,
  },
  slotBooked: {
    fontSize: 26,
    color: goldenYellow,
    fontFamily: Nunito_Bold,
    marginTop: 16,
    marginBottom: 7,
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

export default SlotBookedModalInnerView;

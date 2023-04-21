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
  yellowVariant8,
} from "../../../containers/util/colors";
import { commonStyles } from "../../../containers/util/commonStyles";
import { deviceWidth } from "../../../containers/util/dimens";
import LinearGradient from "react-native-linear-gradient";
import { Nunito_Regular } from "../../../containers/util/fonts";
import RoundedGradientBtn from "../roundedGradientBtn";

const CancelSessionModalInnerView = ({
  modalVisible,
  setModalVisibility,
  onCancel,
  confirmType,
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
              source={require("../../../images/cross_icon.png")}
            />
          </TouchableOpacity>
        </View>
        <Image
          style={styles.cancelImg}
          //TODO: replace this congrats img with cancel emoji
          source={require("../../../images/congrats_emoji.png")}
        />
        <View style={{ paddingHorizontal: 22, marginBottom: 30 }}>
          <Text style={styles.cancelTxt}>{"Cancel Session!"}</Text>
          <Text style={styles.cancelDesc}>
            {
              "Are you sure you want to cancel the swimming session scheduled for 4 to 5 PM?"
            }
          </Text>
        </View>
        {confirmType ? (
          <View
            style={[
              commonStyles.flexRowSpaceBtw,
              {
                marginHorizontal: 19,
                width: deviceWidth * 0.7,
                marginBottom: 30,
              },
            ]}
          >
            <RoundedGradientBtn
              text={"No"}
              colors={["#575f61ed", "#2b293aed"]}
              onBtnPress={() => setModalVisibility(false)}
              width={140}
            />
            <RoundedGradientBtn
              text={"Cancel"}
              colors={["#48acf1", "#3e53d9"]}
              onBtnPress={() => onCancel(false)}
              width={140}
            />
          </View>
        ) : null}
      </LinearGradient>
      {/* </ImageBackground> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  crossBtn: {
    padding: 12,
  },
  modalBg: {
    overflow: "hidden",
    width: deviceWidth - 36,
    paddingBottom: 30,
  },
  cancelDesc: {
    color: white,
    fontSize: 14,
    fontFamily: Nunito_Regular,
    textAlign: "center",
    fontWeight: '500'
  },
  cancelTxt: {
    fontSize: 22,
    color: yellowVariant8,
    fontFamily: Nunito_Regular,
    marginTop: 16,
    fontWeight: "700",
    marginBottom: 6,
    textAlign: "center",
  },
  cancelImg: {
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

export default CancelSessionModalInnerView;

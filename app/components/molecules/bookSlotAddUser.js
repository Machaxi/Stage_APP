import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, ToastAndroid } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { commonStyles } from "../../containers/util/commonStyles";
import {
  goldenYellow,
  greyVariant7,
  white,
  borderGrey,
  greyVariant2,
} from "../../containers/util/colors";
import { deviceWidth } from "../../containers/util/dimens";
import { Nunito_Regular, Nunito_SemiBold } from "../../containers/util/fonts";

const BookSlotAddUser = ({ count, setCount }) => {
  return (
    <View style={[commonStyles.flexRowSpaceBtwAlignStart, {marginTop: 25, marginBottom: 29}]}>
      <View style={{ width: deviceWidth * 0.36 }}>
        <Text style={styles.addUsr}>{"Add Guest Player"}</Text>
        <Text style={styles.enjoyGame}>
          {"Enjoy your game with friends and family."}
        </Text>
      </View>
      <LinearGradient
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        colors={["#ffffff11", "#ffffff03"]}
        style={[
          {
            borderColor: borderGrey,
            borderWidth: 1,
            borderRadius: 20,
            width: deviceWidth * 0.35,
            paddingVertical: 8,
            paddingHorizontal: 10,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            if (count != 0) {
              setCount(count - 1);
            }
          }}
        >
          <Image
            style={{ height: 18, width: 18 }}
            source={require("../../images/minus_grey.png")}
          />
        </TouchableOpacity>
        <Text style={styles.userCount}>{count == 0 ? 'Add User' : count}</Text>
        <TouchableOpacity
          onPress={() => {
              if(count < 4){
                setCount(count + 1);
              }
              else {
                ToastAndroid.show(
                 'Maximum 3 guests are allowed per booking.',
                  ToastAndroid.SHORT
                );
              }
          }}
        >
          <Image
            style={{ height: 18, width: 18 }}
            source={require("../../images/plus_grey.png")}
          />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  enjoyGame: {
    fontSize: 14,
    color: greyVariant7,
    fontFamily: Nunito_SemiBold,
  },
  userCount: {
    fontSize: 14,
    color: goldenYellow,
    fontFamily: Nunito_Regular,
  },
  addUsr: {
    fontSize: 14,
    color: white,
    fontFamily: Nunito_SemiBold,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: greyVariant2,
    fontFamily: Nunito_SemiBold,
    textAlign: "center",
  },
});

export default BookSlotAddUser;

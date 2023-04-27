import React from "react";
import { Text, View, Image, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { greyVariant8, yellowVariant, yellowVariant2 } from "../../containers/util/colors";
import { commonStyles } from "../../containers/util/commonStyles";
import { deviceWidth } from "../../containers/util/dimens";
import { Nunito_Medium, Nunito_Regular } from "../../containers/util/fonts";

const EnterCouponCode = ({ title, handleChange, value, handleKeyDown, applyCouponPressed }) => {
  return (
    <View
      style={[
        commonStyles.flexRowSpaceBtw,
        { marginTop: 20, marginBottom: 4, marginHorizontal: 12 },
      ]}
    >
      <TextInput
        onChangeText={(text) => handleChange(text)}
        returnKeyType="search"
        //onKeyPress={this.handleKeyDown}
        onSubmitEditing={() => handleKeyDown()}
        value={value}
        placeholderTextColor={greyVariant8}
        style={{
          width: deviceWidth * 0.4,
          fontSize: 14,
          color: greyVariant8,
          fontFamily: Nunito_Medium,
          height: 45,
        }}
        placeholder="Enter Coupon Code"
      />
      <TouchableOpacity onPress={()=> applyCouponPressed()}>
        <Text style={styles.couponApply}>{"Apply Coupon"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
 couponApply: {
    fontSize: 14,
    color: yellowVariant2,
    fontFamily: Nunito_Regular
 }
});

export default EnterCouponCode;

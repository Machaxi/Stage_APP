import React from "react";
import { Text, View, Image, TextInput, StyleSheet } from "react-native";
import { greyVariant8, yellowVariant, yellowVariant2 } from "../../containers/util/colors";
import { commonStyles } from "../../containers/util/commonStyles";
import { deviceWidth } from "../../containers/util/dimens";

const EnterCouponCode = ({ title, handleChange, value, handleKeyDown }) => {
  return (
    <View style={[commonStyles.flexRowSpaceBtw, {marginTop: 20, marginBottom: 4, marginHorizontal: 12}]}>
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
          fontFamily: "Nunito-500",
          height: 45,
        }}
        placeholder="Enter Coupon Code"
      />
      <Text style={styles.couponApply}>
        {'Apply Coupon'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
 couponApply: {
    fontSize: 14,
    color: yellowVariant2,
    fontFamily: 'Nunito-400'
 }
});

export default EnterCouponCode;

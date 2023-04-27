import React, { Component } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { darkGreyVariant } from "../../util/colors";
import EnterCouponCode from "../../../components/molecules/enterCouponCode";
import CouponListItem from "../../../components/molecules/couponListItem";
import { couponListData } from "../../util/dummyData/couponListData";

class ApplyCouponCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      modalVisible: false,
    };
  }

  render() {
    handlepress = () => {
      console.log("ollla");
      this.props.onPress();
    };

    const handleChange = (text) => {
      this.setState({ code: text });
    };

    const handleKeyDown = () => {};

    const setModalVisibilityCb = (val) => {
      setModalVisibility(val);
    };

    return (
      <View style={styles.contain}>
        <EnterCouponCode
          handleChange={(val) => handleChange(val)}
          value={this.state.code}
          handleKeyDown={() => handleKeyDown()}
          applyCouponPressed={() => setModalVisibilityCb(true)}
        />
        <View style={styles.bar} />
        <FlatList
          data={couponListData}
          extraData={this.state.code}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity activeOpacity={0.8} onPress={handlepress}>
                <CouponListItem
                  coupon_code={item.coupon_code}
                  discount={item.discount}
                  couponApplied={this.state.code == item.coupon_code}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    marginVertical: 20,
  },
  bar: {
    backgroundColor: darkGreyVariant,
    width: "100%",
    marginBottom: 35,
  },
});

export default ApplyCouponCode;

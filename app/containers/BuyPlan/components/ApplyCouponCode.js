import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../../components/custom/CustomButton";
import AsyncStorage from "@react-native-community/async-storage";
import { whiteGreyBorder } from "../../util/colors";
import { Nunito_Medium, Nunito_SemiBold } from "../../util/fonts";
import EnterCouponCode from "../../../components/molecules/enterCouponCode";
import CouponListItem from "../../../components/molecules/couponListItem";

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
      this.props.onPress(
        this.props.sportList.find((item) => item.id === this.state.currentIndex)
      );
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
          value={code}
          handleKeyDown={() => handleKeyDown()}
          applyCouponPressed={() => setModalVisibilityCb(true)}
        />
        <View style={styles.bar} />
        <FlatList
          data={couponListData}
          extraData={code}
          renderItem={({ item, index }) => {
            return (
              <CouponListItem
                coupon_code={item.coupon_code}
                discount={item.discount}
                couponApplied={code == item.coupon_code}
              />
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
});

export default ApplyCouponCode;

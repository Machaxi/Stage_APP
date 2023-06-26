import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  ActionSheetIOS,
} from "react-native";
import { darkGreyVariant } from "../../util/colors";
import EnterCouponCode from "../../../components/molecules/enterCouponCode";
import CouponListItem from "../../../components/molecules/couponListItem";
import axios from "axios";
import { getBaseUrl } from "../../BaseComponent";
import AsyncStorage from "@react-native-community/async-storage";
import LoadingIndicator from "../../../components/molecules/loadingIndicator";
import moment from "moment";

class ApplyCouponCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      modalVisible: false,
      couponData: null,
      filterData: null,
      filteredData: null,
      header: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const header = await AsyncStorage.getItem("header");
    this.setState({ header: header });
    this.apiCall();
  };

  apiCall = () => {
    const subscriptionType = this.props.subscriptionType;
    const academy_id = this.props.selectCenter.id;
    axios
      .get(
        getBaseUrl() +
          "coupons/list?academyId=" +
          academy_id +
          "&scope=" +
          subscriptionType,
        {
          headers: {
            "x-authorization": this.state.header,
          },
        }
      )
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        let academiesData = userResponce["data"]["data"];
        if (academiesData) {
          console.log(academiesData["coupons"]);
          const couponData = academiesData["coupons"];
          const filteredData = couponData.filter((item) => {
            if (
              moment() <= moment(item.endTime) &&
              moment() >= moment(item.startTime)
            ) {
              return item.couponCode
                .toLowerCase()
                .includes(this.state.code.toLowerCase());
            }
          });
          console.log(filteredData);
          this.setState({
            couponData: academiesData["coupons"],
            filterData: academiesData["coupons"],
            filteredData: filteredData,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    handlepress = (item) => {
      console.log(this.props.amount);
      if (item.minOrderAmount < this.props.amount) {
        this.props.onPress(item);
      } else {
        ToastAndroid.show(
          "Minimum Order Amount should be ₹ " + item.minOrderAmount,
          ToastAndroid.SHORT
        );
        {
          Platform.OS === "ios" &&
            showToast(
              "Minimum Order Amount should be ₹ " + item.minOrderAmount
            );
        }
      }
    };

    showToast = (message) => {
      const options = ["Cancel"];
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: message,
          options: options,
          cancelButtonIndex: options.length - 1,
        },
        (buttonIndex) => {}
      );
    };

    const handleChange = (text) => {
      this.setState({ code: text });
    };

    const handleKeyDown = () => {};

    const setModalVisibilityCb = (val) => {
      console.log(this.state.code);
      const isCoachingNewAvailable = this.state.filteredData.find(
        (item) => item.couponCode == this.state.code
      );
      console.log(isCoachingNewAvailable);
      if (isCoachingNewAvailable) {
        handlepress(isCoachingNewAvailable);
      } else {
        ToastAndroid.show(
          "Please enter valid coupon code ",
          ToastAndroid.SHORT
        );
        {
          Platform.OS === "ios" && showToast("Please enter valid coupon code ");
        }
      }
    };

    if (this.state.filterData == null) {
      return <LoadingIndicator />;
    }

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
          data={this.state.filteredData}
          keyExtractor={(item) => item.id}
          extraData={this.state.filteredData}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handlepress(item)}
              >
                <CouponListItem
                  coupon_code={item.title}
                  discount={item.maxDiscountAmount}
                  percentage={item.percentage}
                  couponApplied={this.state.code == item.coupon_code}
                />
              </TouchableOpacity>
            );
          }}
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

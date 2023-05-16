import React, { Component } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { darkGreyVariant } from "../../util/colors";
import EnterCouponCode from "../../../components/molecules/enterCouponCode";
import CouponListItem from "../../../components/molecules/couponListItem";
import axios from "axios";
import { getBaseUrl } from "../../BaseComponent";
import AsyncStorage from "@react-native-community/async-storage";
import LoadingIndicator from "../../../components/molecules/loadingIndicator";

class ApplyCouponCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      modalVisible: false,
      couponData: null,
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
          "/coupons/list?academyId=" +
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
        this.setState({
          couponData: academiesData["coupons"],
        });
        console.log(academiesData["coupons"]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    handlepress = (item) => {
      this.props.onPress(item);
    };

    const handleChange = (text) => {
      this.setState({ code: text });
    };

    const handleKeyDown = () => {};

    const setModalVisibilityCb = (val) => {
      this.setState({ modalVisible: val });
    };

    if (this.state.couponData == null) {
      return <LoadingIndicator />;
    }

    const filteredData = this.state.couponData.filter((item) => {
      let endDate = new Date(item.endTime);
      let startDate = new Date(item.startTime);
      if (new Date() <= endDate && new Date() >= startDate) {
        return item.couponCode
          .toLowerCase()
          .includes(this.state.code.toLowerCase());
      }
    });

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
          data={filteredData}
          keyExtractor={(item) => item.id}
          extraData={filteredData}
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

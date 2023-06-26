import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  ActionSheetIOS,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../../components/custom/CustomButton";
import AsyncStorage from "@react-native-community/async-storage";
import Loader from "../../../components/custom/Loader";
import { getBaseUrl } from "../../BaseComponent";
import RazorpayCheckout from "react-native-razorpay";
import {
  Nunito_Medium,
  Nunito_Regular,
  Nunito_SemiBold,
} from "../../util/fonts";
import { selectPlanDate } from "../../../redux/reducers/PlayerReducer";
import { connect } from "react-redux";
import PlanDetails from "../../../components/custom/PlanDetails";
import PaymentDetails from "../../../components/custom/PaymentDetails";
import CouponView from "../../../components/custom/CouponView";
import axios from "axios";
import { getPaymentKey, getRazorPayEmail } from "../../BaseComponent";
import { paymentConfirmation } from "../../../redux/reducers/PaymentReducer";
import AppliedCouponCode from "../../../components/custom/AppliedCouponCode";
import LoadingIndicator from "../../../components/molecules/loadingIndicator";

class SelectPay extends Component {
  months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  days = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  constructor(props) {
    super(props);
    this.state = {
      centerName: "",
      centerAddress: "",
      centerImage: "",
      centerDistance: "",
      sportName: "",
      sportImage: "",
      time: "",
      levelImage: "",
      levelName: "",
      header: "",
      selectBatch: "",
      username: "",
      gender: "",
      parent: "",
      selectLevel: null,
      date: new Date(),
      isLoading: false,
      appliedCoupon: false,
      displayStartDate: "",
      displayEndDate: "",
      userDetails: null,
      amount: "",
      joinDate: "",
      phonenumber: "",
      childDetails: null,
      discountAmount: 0,
      couponAmount: 0,
      coupon: null,
      isApplied: false,
      displayBottomStart: "",
    };
  }

  componentDidMount() {
    this.handleopen();
    this.getData();
  }

  handleopen = () => {
    const selectCenter = this.props.selectCenter;
    const selectSport = this.props.selectSport;
    const selectLevel = this.props.selectLevel;
    const selectBatch = this.props.selectBatch;
    const distance = this.props.distance;
    const selectTime = selectBatch.displayTime;
    const username = this.props.username;
    const gender = this.props.usergender;
    const parent = this.props.parent;
    const levelname = selectLevel.displayText;
    const levelimage = selectLevel.url;
    const joinDate = this.convertToDate(this.props.selectPlan.start_date);
    const stDate = new Date(joinDate);
    const start_d_date = this.formatesmallDateYear(stDate);
    this.setState(
      {
        centerName: selectCenter.name,
        centerImage: selectCenter.cover_pic,
        centerAddress: selectCenter.address,
        centerDistance: distance,
        sportName: selectSport.name,
        sportImage: selectSport.image,
        time: selectTime,
        selectBatch: selectBatch,
        levelImage: levelimage,
        levelName: levelname,
        username: username,
        gender: gender,
        parent: parent,
        displayStartDate: this.props.selectPlan.start_date,
        displayEndDate: this.props.selectPlan.end_date,
        displayBottomStart: start_d_date,
        amount: this.props.selectPlan.paybleAmount,
        joinDate: joinDate,
        date: stDate,
        appliedCoupon: this.props.applycoupon,
        userData: userData,
        childDetails: this.props.childDetails,
        discountAmount: this.props.selectPlan.paybleAmount,
        coupon: this.props.coupon,
      },
      () => {
        if (this.props.joinBool) {
          console.log("workings");
          this.DataChange(this.props.joinTime);
        } else {
          this.setState({ selectLevel: selectLevel });
        }
      }
    );
  };

  getdetails(displayapply) {
    if (this.props.applycoupon) {
      var dataDic = {};
      var dict = {};
      dict["plan_id"] = "" + this.props.selectPlan.id;
      dict["join_date"] = this.state.joinDate;
      dict["user_id"] = this.state.userDetails.id;
      if (this.props.parent == "Parent") {
        // if (userData.user["user_type"] == "GUEST") {
        //   dict["parent_name"] = this.state.userDetails.name;
        //   dict["player_name"] = this.state.userDetails.name;
        //   dict["gender"] = this.state.gender.toUpperCase();
        // }
      } else {
        if (this.state.childDetails != null) {
          dict["player_user_id"] = this.state.childDetails.user_id;
        } else {
          dict["parent_name"] = this.state.userDetails.name;
          dict["player_name"] = this.state.username;
          dict["gender"] = this.state.gender.toUpperCase();
        }
      }
      dict["coupon_code"] = this.props.coupon.couponCode;
      dataDic["data"] = dict;
      this.props
        .selectPlanDate(dataDic, this.state.header)
        .then(() => {
          let jsondata = JSON.stringify(this.props.data.planData.data);
          let responcedata = JSON.parse(jsondata);
          console.log(this.state.amount, responcedata.amount);
          const couponamt = this.state.amount - responcedata.amount;
          console.log(couponamt);
          console.log("ollla");
          if (displayapply) {
            this.setState({ isApplied: true });
          }
          this.setState({
            discountAmount: responcedata.amount,
            couponAmount: parseFloat(couponamt.toFixed(2)),
          });
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }

  convertToDate = (dateString) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const [day, month] = dateString.split(" ");
    const date = `${currentYear}-${this.getMonthNumber(month)}-${day}`;
    return date;
  };

  formatesmallDateYear = (date) => {
    var data = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    const ye = " '" + year.toString().slice(-2);
    datastring = data + " " + this.months[month] + ye;
    return datastring;
  };

  getMonthNumber = (monthName) => {
    // Map month names to their corresponding month numbers
    const monthMap = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    return monthMap[monthName];
  };

  handleOnStartPayment = (orderId, amount) => {
    plantitle =
      this.props.selectPlan.term_id === 1
        ? "Monthly"
        : this.props.selectPlan.term_id === 2
        ? "Quarterly"
        : this.props.selectPlan.term_id === 3
        ? "Half Yearly"
        : "Yearly";
    var description =
      "Coaching Plan for " +
      this.state.userDetails.name +
      ", Ph no: " +
      this.state.phonenumber +
      ", Display Time: " +
      this.state.time +
      ", Batch Name: " +
      this.props.selectBatch.batch_name +
      ", Plan Type: " +
      plantitle;
    if (description.length < 240) {
      description = description + ", Order Id: " + orderId;
    }
    console.log(description);
    var options = {
      description: description,
      currency: "INR",
      key: getPaymentKey(),
      amount: amount * 100,
      name: "Machaxi",
      prefill: {
        email: getRazorPayEmail(),
        contact: this.state.phonenumber,
        name: this.state.userDetails.name,
      },
      theme: { color: "#67BAF5" },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        let payment_details = {
          razorpay_payment_id: data.razorpay_payment_id,
        };
        this.submitPaymentConfirmation(orderId, amount, payment_details);
        console.log(payment_details);
      })
      .catch((error) => {
        console.log("Razor Rspo ", error);
        this.props.onPress(
          false,
          orderId,
          amount,
          "You can retry your pay for the Coaching Plan if it appears that your payment was failed."
        );
      });
  };

  submitPaymentConfirmation = (orderId, amount, paymentDetails) => {
    let postData = {
      data: {
        due_order_id: orderId,
        amount,
        payment_details: paymentDetails,
      },
    };
    this.props
      .paymentConfirmation(
        this.state.header,
        postData,
        `payment/due-subscription-plan-payment/v1`
      )
      .then((result) => {
        this.setState({ isLoading: false });
        result = result.payload;
        if (result.data) {
          if (result.data.success) {
            this.props.onPress(true);
          } else {
            this.props.onPress(
              false,
              orderId,
              amount,
              "Do to some technical issue. we are unable to book the plan. your amount will be reverted back within 2-3 days. Need help please contact us"
            );
          }
        } else {
          this.setState({ isLoading: false });
          this.props.onPress(
            false,
            orderId,
            amount,
            result.response.data.error_message
          );
        }
      });
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

  getData = async () => {
    const header = await AsyncStorage.getItem("header");
    const phonenumber = await AsyncStorage.getItem("phone_number");
    const userDatas = await AsyncStorage.getItem("userInfo");
    const userData = JSON.parse(userDatas);
    const userDetails = userData.user;
    this.setState(
      {
        userDetails: userDetails,
        header: header,
        phonenumber: phonenumber,
        userData: userData,
      },
      () => {
        this.getdetails(true);
      }
    );
  };

  DataChange = (join_date) => {
    const stDate = new Date(join_date);
    const start_d_date = this.formatesmallDateYear(stDate);
    this.setState({
      joinDate: join_date,
      displayBottomStart: start_d_date,
      date: stDate,
    });
    const batch_id = this.state.selectBatch.batch_id;
    axios
      .get(
        getBaseUrl() + "global/batch/" + batch_id + "/?join_date=" + join_date
      )
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        let planData = userResponce["data"]["plans"][0]["payable_amount"];
        console.log(response);
        const term = this.props.selectPlan.term_id - 1;
        console.log(planData[term]);
        this.setState({
          displayEndDate: planData[term].end_date,
          displayStartDate: planData[term].start_date,
          amount: planData[term].paybleAmount,
          discountAmount: planData[term].paybleAmount,
          selectLevel: this.props.selectLevel,
        });
        this.getdetails(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  startPayment = () => {
    var dataDic = {};
    var dict = {};
    dict["plan_id"] = "" + this.props.selectPlan.id;
    dict["join_date"] = this.state.joinDate;
    dict["user_id"] = this.state.userDetails.id;
    if (this.props.parent == "Parent") {
      // if (userData.user["user_type"] == "GUEST") {
      // dict["parent_name"] = this.state.userDetails.name;
      // dict["player_name"] = this.state.userDetails.name;
      // dict["gender"] = this.state.gender.toUpperCase();
      // }
    } else {
      if (this.state.childDetails != null) {
        dict["player_user_id"] = this.state.childDetails.user_id;
      } else {
        dict["parent_name"] = this.state.userDetails.name;
        dict["player_name"] = this.state.username;
        dict["gender"] = this.state.gender.toUpperCase();
      }
    }

    if (this.props.coupon) {
      dict["coupon_code"] = this.props.coupon.couponCode;
    }
    dataDic["data"] = dict;

    this.props
      .selectPlanDate(dataDic, this.state.header)
      .then((result) => {
        result = result.payload;
        if (result.data) {
          let jsondata = JSON.stringify(this.props.data.planData.data);
          let responcedata = JSON.parse(jsondata);
          this.handleOnStartPayment(responcedata.order_id, responcedata.amount);
        } else {
          this.props.onPress(false, 0, 0, result.response.data.error_message);
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };

  onAppliedBack = () => {
    this.setState({ isApplied: false });
  };

  onCouponPress = () => {
    this.props.onPresscoupon(true, this.state.joinDate, this.state.amount);
  };

  onPressCancel = () => {
    this.setState({
      appliedCoupon: !this.state.appliedCoupon,
      discountAmount: this.state.amount,
    });
  };

  render() {
    listimage = (image, name, url) => {
      return (
        <View style={{ alignItems: "center" }}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.06)"]}
            locations={[0, 1]}
            style={styles.sportsview}
          >
            {url ? (
              <Image
                style={styles.imaged}
                source={{ uri: image }}
                resizeMode="contain"
              />
            ) : (
              <Image
                style={styles.imaged}
                source={image}
                resizeMode="contain"
              />
            )}
          </LinearGradient>
          <Text style={[styles.sportText]}>{name}</Text>
        </View>
      );
    };

    listText = (title, subtitle, heading) => {
      return (
        <View style={{ alignItems: "center" }}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.06)"]}
            locations={[0, 1]}
            style={[styles.sportsview]}
          >
            <Text style={[styles.datetitle, { fontSize: 25 }]}>{title}</Text>
            <Text style={[styles.datetitle]}>{subtitle}</Text>
          </LinearGradient>
          <Text style={[styles.sportText]}>{heading}</Text>
        </View>
      );
    };

    const dayss = Object.keys(this.props.selectBatch.weekDetails).map(
      (item, index) => (
        <Text style={[styles.sportText, { marginTop: 8 }]}>
          {this.days[item]}
          {index <
            Object.keys(this.props.selectBatch.weekDetails).length - 1 && (
            <Text>, </Text>
          )}
        </Text>
      )
    );

    if (this.state.selectLevel == null) {
      return <LoadingIndicator />;
    }

    return (
      <View style={{ marginVertical: 20, flex: 1 }}>
        <Loader visible={this.state.isLoading} />
        <AppliedCouponCode
          visible={this.state.isApplied}
          price={"₹ " + this.state.couponAmount}
          onPressBack={this.onAppliedBack}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 0.94 }}>
          <Text style={styles.mainText}>Review before Payment</Text>
          <PlanDetails
            title={
              this.props.selectPlan.term_id === 1
                ? "Monthly"
                : this.props.selectPlan.term_id === 2
                ? "Quarterly"
                : "Yearly"
            }
            subtitle={"Rs. " + this.props.selectPlan.planFees}
            startDate={this.state.displayStartDate}
            endDate={this.state.displayEndDate}
            image={
              this.props.selectPlan.term_id === 1
                ? require("../../../images/playing/rocket.png")
                : this.props.selectPlan.term_id === 2
                ? require("../../../images/playing/hand.png")
                : require("../../../images/playing/arrow.png")
            }
            onPress={this.DataChange}
          />
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.06)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.mainview}
          >
            <Text style={styles.subtitle}>Player Detail</Text>
            <Text style={[styles.subtitle, { color: "#D1CECE" }]}>
              Player Name
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.name}>{this.state.username} · </Text>
              <Text
                style={[styles.subtitle, { color: "#FFC498", marginLeft: 2 }]}
              >
                {this.state.parent} · {this.state.gender}
              </Text>
            </View>
            <View style={styles.line} />
            <Text style={styles.subtitle}>Centre Detail</Text>
            <View style={styles.item}>
              <View style={{ flex: 0.35 }}>
                <Image
                  source={{ uri: this.state.centerImage }}
                  style={styles.image}
                />
                {this.state.centerDistance != "0 Km away" && (
                  <Text style={styles.distance}>
                    {this.state.centerDistance}
                  </Text>
                )}
              </View>
              <View style={styles.textContainer}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{this.state.centerName}</Text>
                  <Text style={styles.address}>{this.state.centerAddress}</Text>
                </View>
              </View>
            </View>
            <View style={styles.line} />
            <Text style={styles.subtitle}>Batch Details</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              {listimage(this.state.sportImage, this.state.sportName, true)}
              {listText(
                Object.keys(this.props.selectBatch.weekDetails).length,
                "Days/Week",
                Object.keys(this.props.selectBatch.weekDetails).length == 5
                  ? "Mon to Fri"
                  : dayss
              )}
              {listimage(this.state.levelImage, this.state.levelName, true)}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: 15,
              }}
            >
              {listText(
                this.state.date.getDate(),
                this.months[this.state.date.getMonth()],
                "DOJ"
              )}
              {listimage(
                require("../../../images/playing/clock.png"),
                this.state.time,
                false
              )}
              <View style={styles.sportsview} />
            </View>
          </LinearGradient>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (!this.state.appliedCoupon) {
                this.onCouponPress();
              }
            }}
          >
            <CouponView
              appliedCoupon={this.state.appliedCoupon}
              coupon={this.state.coupon}
              amount={this.state.couponAmount}
              onPressCancel={this.onPressCancel}
            />
          </TouchableOpacity>
          <PaymentDetails
            title={
              "Payment for " +
              this.state.displayBottomStart +
              " to " +
              this.state.displayEndDate
            }
            appliedCoupon={this.state.appliedCoupon}
            coupounPrice={this.state.couponAmount}
            price={this.state.amount}
            finalprice={this.state.discountAmount}
          />
        </ScrollView>
        <View style={{ flex: 0.06, paddingTop: 15 }}>
          <CustomButton
            name={"Pay ₹ " + this.state.discountAmount}
            available={true}
            onPress={this.startPayment}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contained: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 10,
    marginLeft: 10,
    marginVertical: 5,
    fontFamily: Nunito_Medium,
    color: "#FF9C33",
  },
  name: {
    marginLeft: 10,
    marginBottom: 10,
    marginTop: -1,
    fontFamily: Nunito_Medium,
    color: "#F0F0F0",
    fontSize: 16,
  },
  textContainer: {
    flex: 0.65,
    padding: 10,
  },
  sportsview: {
    width: 80,
    height: 70,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  mainview: {
    marginVertical: 20,
    marginBottom: 15,
    marginHorizontal: 10,
    paddingHorizontal: 5,
    width: "95%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 15,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
  },
  sportText: {
    fontSize: 12,
    marginTop: 8,
    fontFamily: Nunito_Medium,
    color: "#D7D7D7",
  },
  mainText: {
    fontSize: 16,
    marginVertical: 8,
    fontFamily: Nunito_SemiBold,
    color: "#D1D1D1",
  },
  distance: {
    width: "85%",
    fontSize: 10,
    marginTop: -14,
    fontFamily: Nunito_Medium,
    color: "#FFFFFF",
    backgroundColor: "rgba(35, 35, 35, 0.66)",
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 5,
  },
  image: {
    width: 100,
    height: 90,
    marginRight: 20,
    borderRadius: 6,
  },
  imaged: {
    width: 35,
    height: 45,
  },
  title: {
    fontSize: 14,
    flex: 0.5,
    fontFamily: Nunito_Medium,
    color: "#F0F0F0",
  },
  address: {
    flex: 0.5,
    fontSize: 11,
    fontFamily: Nunito_Regular,
    color: "#ADADAD",
  },
  line: {
    height: 1,
    backgroundColor: "gray",
    marginHorizontal: 15,
    marginBottom: 5,
  },
  datetitle: {
    fontSize: 12,
    fontFamily: Nunito_Medium,
    color: "#F2AE4D",
  },
});

const mapStateToProps = (state) => {
  return {
    data: state.PlayerReducer,
    paymentData: state.PaymentReducer,
  };
};

const mapDispatchToProps = { selectPlanDate, paymentConfirmation };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPay);

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../../components/custom/CustomButton";
import AsyncStorage from "@react-native-community/async-storage";
import Loader from "../../../components/custom/Loader";
import RazorpayCheckout from "react-native-razorpay";
import {
  Nunito_Bold,
  Nunito_Medium,
  Nunito_Regular,
  Nunito_SemiBold,
} from "../../util/fonts";
import { selectPlayPlanDate } from "../../../redux/reducers/PlayerReducer";
import { connect } from "react-redux";
import PlanDetails from "../../../components/custom/PlanDetails";
import PaymentDetails from "../../../components/custom/PaymentDetails";
import CouponView from "../../../components/custom/CouponView";
import { getPaymentKey, getRazorPayEmail } from "../../BaseComponent";
import { paymentConfirmation } from "../../../redux/reducers/PaymentReducer";
import AppliedCouponCode from "../../../components/custom/AppliedCouponCode";
import LoadingIndicator from "../../../components/molecules/loadingIndicator";
import moment from "moment";

class SelectPlayPay extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      centerName: "",
      centerAddress: "",
      centerImage: "",
      centerDistance: "",
      header: "",
      isLoading: false,
      appliedCoupon: false,
      displayStartDate: null,
      displayEndDate: "",
      lastdatedisplay: "",
      userDetails: null,
      amount: "",
      phonenumber: "",
      startdate: new Date(),
      confirmstartDate: new Date(),
      enddate: new Date(),
      selectType: 30,
      discountAmount: 0,
      couponAmount: 0,
      coupon: null,
      isApplied: false,
      selectCenter: null,
      displayBottomStart: "",
      displayBottomEnd: "",
    };
  }

  componentDidMount() {
    this.handleopen();
    this.getData();
  }

  handleopen = () => {
    const selectCenter = this.props.selectCenter;
    const distance = this.props.distance;
    const selectPlan = this.props.selectPlan;
    const selectType = this.props.selectPlan.type;
    const today = moment();
    var presentdate;
    if (selectType == "QUARTERLY") {
      presentdate = today.add(3, "months").subtract(1, "days");
    } else if (selectType == "HALF_YEARLY") {
      presentdate = today.add(6, "months").subtract(1, "days");
    } else if (selectType == "YEARLY") {
      presentdate = today.add(1, "years").subtract(1, "days");
    } else {
      presentdate = today.add(1, "months").subtract(1, "days");
    }
    var startDate = new Date();
    var lastdate = moment()
      .add(1, "months")
      .subtract(1, "days");
    console.log(lastdate);
    if (this.props.expiryDate) {
      startDate = this.props.expiryDate;
      lastdate = moment(this.props.expiryDate)
        .add(1, "months")
        .subtract(1, "days");
    }
    const endDate = new Date(presentdate);
    var userDetails = this.props.userDetails;
    const lastd = new Date(lastdate);
    const lastdatedisplay = this.formatesmallDate(lastd);
    const firstdatedisplay = this.formatesmallDate(startDate);
    const start_date = this.formatesmallDate(startDate);
    const end_date = this.formatesmallDate(endDate);
    const start_d_date = this.formatesmallDateYear(startDate);
    const end_d_date = this.formatesmallDateYear(endDate);

    this.setState(
      {
        centerName: selectCenter.name,
        centerImage: selectCenter.cover_pic,
        centerAddress: selectCenter.address,
        centerDistance: distance,
        displayStartDate: start_date,
        displayEndDate: end_date,
        lastdatedisplay: lastdatedisplay,
        displayBottomEnd: end_d_date,
        displayBottomStart: start_d_date,
        amount: selectPlan.price,
        appliedCoupon: this.props.applycoupon,
        startdate: startDate,
        confirmstartDate: firstdatedisplay,
        enddate: endDate,
        userDetails: userDetails,
        selectType: selectType,
        discountAmount: selectPlan.price,
        coupon: this.props.coupon,
      },
      () => {
        if (this.props.joinBool) {
          this.DataChange(this.props.joinTime);
        } else {
          this.setState({ selectCenter: this.props.selectCenter });
        }
      }
    );
  };

  getdetails() {
    if (this.props.applycoupon) {
      var dataDic = {};
      var dict = {};
      const joinDate = this.convertToDate(this.state.displayStartDate);
      dict["planId"] = "" + this.props.selectPlan.id;
      dict["preferredAcademyId"] = this.props.selectCenter.id;
      dict["dateOfJoining"] = joinDate;
      dict["couponCode"] = this.props.coupon.couponCode;
      dataDic["data"] = dict;

      this.props
        .selectPlayPlanDate(dataDic, this.state.header)
        .then(() => {
          let jsondata = JSON.stringify(this.props.data.playPlanData);
          let responcedata = JSON.parse(jsondata);
          const couponamt = this.state.amount - responcedata.data.amount;
          this.setState({
            discountAmount: responcedata.data.amount,
            couponAmount: couponamt,
            isApplied: true,
          });
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }

  formatesmallDate = (date) => {
    var data = date.getDate();
    var month = date.getMonth();
    datastring = data + " " + this.months[month];
    return datastring;
  };

  formatesmallDateYear = (date) => {
    var data = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    const ye = " '" + year.toString().slice(-2);
    datastring = data + " " + this.months[month] + ye;
    return datastring;
  };

  formateDate = (date) => {
    var month = date.getMonth();
    const year = date
      .getFullYear()
      .toString()
      .substr(-2);
    datastring = this.months[month] + " " + year;
    return datastring;
  };

  formatDateToCustomDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const monthIndex = this.months.findIndex((m) => m === month) + 1;
    const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : monthIndex;
    const formattedDate = `${year}-${formattedMonth}-${day}`;
    return formattedDate;
  };

  getMonthNumber = (monthName) => {
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

  startPayment = () => {
    var dataDic = {};
    var dict = {};

    const joinDate = this.convertToDate(this.state.displayStartDate);
    dict["planId"] = "" + this.props.selectPlan.id;
    dict["preferredAcademyId"] = this.props.selectCenter.id;
    dict["dateOfJoining"] = joinDate;
    dataDic["data"] = dict;
    if (this.props.coupon) {
      dict["couponCode"] = this.props.coupon.couponCode;
    }

    console.log(dataDic);
    this.props
      .selectPlayPlanDate(dataDic, this.state.header)
      .then((result) => {
        result = result.payload;
        if (result.data) {
          let jsondata = JSON.stringify(this.props.data.playPlanData);
          let responcedata = JSON.parse(jsondata);
          this.handleOnStartPayment(
            responcedata.data.orderId,
            responcedata.data.amount
          );
        } else {
          const failed = "Membership limit reached !";
          this.props.onPress(
            false,
            0,
            0,
            result.response.data.error_message,
            failed
          );
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };

  handleOnStartPayment = (orderId, amount) => {
    const description =
      "Playing Plan for " +
      this.state.userDetails.name +
      ", Ph no: " +
      this.state.phonenumber +
      ", Center Name: " +
      this.state.centerName +
      ", Plan Name: " +
      this.props.selectPlan.name +
      ", Order Id: " +
      orderId;
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
      })
      .catch((error) => {
        console.log("Razor Rspo ", error);
        this.props.onPress(
          false,
          orderId,
          amount,
          "You can retry your pay for the Playing Plan if it appears that your payment was failed.",
          "Payment Failed !"
        );
      });
  };

  submitPaymentConfirmation = (orderId, amount, paymentDetails) => {
    let postData = {
      data: {
        orderId: orderId,
        amount,
        payment_details: paymentDetails,
      },
    };
    this.props
      .paymentConfirmation(
        this.state.header,
        postData,
        "court/buy-subscription"
      )
      .then((result) => {
        result = result.payload;
        if (result.data) {
          this.props.onPress(true, "", "", result.data.data.subscriptionId, "");
        } else {
          var failed = "Payment Failed !";
          if (result.response.data.error_code == "1000") {
            failed = "Membership limit reached !";
          }
          this.props.onPress(
            false,
            orderId,
            amount,
            result.response.data.error_message,
            failed
          );
        }
      });
  };

  getData = async () => {
    const header = await AsyncStorage.getItem("header");
    const phonenumber = await AsyncStorage.getItem("phone_number");
    this.setState({ header: header, phonenumber: phonenumber }, () => {
      this.getdetails();
    });
  };

  DataChange = (join_date) => {
    const joinDate = new Date(join_date);
    const today = moment(join_date, "YYYY-MM-DD");
    var presentdate;
    if (this.state.selectType == "QUARTERLY") {
      presentdate = today.add(3, "months").subtract(1, "days");
    } else if (this.state.selectType == "HALF_YEARLY") {
      presentdate = today.add(6, "months").subtract(1, "days");
    } else if (this.state.selectType == "YEARLY") {
      presentdate = today.add(1, "years").subtract(1, "days");
    } else {
      presentdate = today.add(1, "months").subtract(1, "days");
    }
    const endJoin = new Date(presentdate);
    const start_date = this.formatesmallDate(joinDate);
    const end_date = this.formatesmallDate(endJoin);
    const start_d_date = this.formatesmallDateYear(joinDate);
    const end_d_date = this.formatesmallDateYear(endJoin);
    this.setState({
      startdate: joinDate,
      enddate: endJoin,
      displayStartDate: start_date,
      displayEndDate: end_date,
      displayBottomEnd: end_d_date,
      displayBottomStart: start_d_date,
      selectCenter: this.props.selectCenter,
    });
  };

  convertToDate = (dateString) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    var [day, month] = dateString.split(" ");
    if (parseInt(day) < 10) {
      day = "0" + day;
    }
    const date = `${currentYear}-${this.getMonthNumber(month)}-${day}`;
    return date;
  };

  onPressExplore = () => {
    this.props.onPressExplore();
  };

  onAppliedBack = () => {
    this.setState({ isApplied: false });
  };

  onCouponPress = () => {
    const joinDate = this.convertToDate(this.state.displayStartDate);
    this.props.onPresscoupon(true, joinDate, this.state.amount);
  };

  deletecoupon = () => {
    this.setState({
      appliedCoupon: !this.state.appliedCoupon,
      discountAmount: this.state.amount,
    });
  };

  render() {
    listText = (title, subtitle, heading) => {
      return (
        <View style={{ alignItems: "center" }}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.06)"]}
            locations={[0, 1]}
            style={[styles.sportsview]}
          >
            <Text style={[styles.datetitle, { fontSize: 20 }]}>{title}</Text>
            <Text style={[styles.datetitle]}>{subtitle}</Text>
          </LinearGradient>
          <Text style={[styles.sportText]}>{heading}</Text>
        </View>
      );
    };

    if (this.state.selectCenter == null) {
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
          <View style={styles.smallView}>
            <Text style={styles.mainText}>Review before Payment</Text>
            {this.props.explore && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.onPressExplore}
                style={styles.smallButton}
              >
                <Text style={styles.insideText}>Explore Plans</Text>
              </TouchableOpacity>
            )}
          </View>
          {this.state.displayStartDate && (
            <PlanDetails
              title={this.props.selectPlan.name}
              subtitle={"₹ " + this.props.selectPlan.price}
              startDate={this.state.displayStartDate}
              confirmstartDate={this.state.confirmstartDate}
              endDate={this.state.lastdatedisplay}
              image={this.props.selectPlan.planIconUrl}
              url={true}
              onPress={this.DataChange}
            />
          )}
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
              {this.state.userDetails && (
                <Text style={styles.name}>
                  {this.state.userDetails.name} ·{" "}
                </Text>
              )}
              {this.state.userDetails && (
                <Text
                  style={[styles.subtitle, { color: "#FFC498", marginLeft: 2 }]}
                >
                  {this.state.userDetails.genderType}
                </Text>
              )}
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
            <Text style={styles.subtitle}>Membership Details</Text>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 10,
                marginLeft: 15,
              }}
            >
              {listText(
                this.state.startdate.getDate(),
                this.formateDate(this.state.startdate),
                "Date of Purchase"
              )}
              <View style={{ marginHorizontal: 20 }} />
              {listText(
                this.state.enddate.getDate(),
                this.formateDate(this.state.enddate),
                "Date of Membership Expiry"
              )}
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
              onPressCancel={this.deletecoupon}
            />
          </TouchableOpacity>
          <PaymentDetails
            title={
              "Payment for " +
              this.state.displayBottomStart +
              " to " +
              this.state.displayBottomEnd
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
  insideText: {
    fontSize: 12,
    fontFamily: Nunito_Bold,
    color: "#F1E8FF",
  },
  smallButton: {
    width: 150,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#47474A",
    marginVertical: 15,
    marginLeft: 10,
    borderRadius: 19,
  },
  smallView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
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

const mapDispatchToProps = { selectPlayPlanDate, paymentConfirmation };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPlayPay);

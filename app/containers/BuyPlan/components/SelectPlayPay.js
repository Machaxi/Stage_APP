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
  Nunito_Medium,
  Nunito_Regular,
  Nunito_SemiBold,
} from "../../util/fonts";
import { selectPlanDate } from "../../../redux/reducers/PlayerReducer";
import { connect } from "react-redux";
import PlanDetails from "../../../components/custom/PlanDetails";
import PaymentDetails from "../../../components/custom/PaymentDetails";
import CouponView from "../../../components/custom/CouponView";
import { getPaymentKey, getRazorPayEmail } from "../../BaseComponent";
import { paymentConfirmation } from "../../../redux/reducers/PaymentReducer";

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

  monthoption = {
    month: "short",
    year: "2-digit",
  };

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
      displayStartDate: "",
      displayEndDate: "",
      userDetails: null,
      amount: "",
      joinDate: "",
      phonenumber: "",
      startdate: new Date(),
      enddate: new Date(),
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

    const startDate = new Date();
    const endDate = new Date(startDate);
    if (startDate.getMonth() === 11) {
      endDate.setMonth(0);
      endDate.setFullYear(startDate.getFullYear() + 1);
    } else {
      endDate.setMonth(startDate.getMonth() + 1);
    }
    const options = {
      day: "2-digit",
      month: "short",
    };

    const start_date = startDate.toLocaleString("en-GB", options);
    const end_date = endDate.toLocaleString("en-GB", options);

    this.setState({
      centerName: selectCenter.name,
      centerImage: selectCenter.cover_pic,
      centerAddress: selectCenter.address,
      centerDistance: distance,
      displayStartDate: start_date,
      displayEndDate: end_date,
      amount: selectPlan.price,
      appliedCoupon: this.props.applycoupon,
      startdate: startDate,
      enddate: endDate,
    });
  };

  formatDateToCustomDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const monthIndex = this.months.findIndex((m) => m === month) + 1;
    const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : monthIndex;
    const formattedDate = `${year}-${formattedMonth}-${day}`;
    return formattedDate;
  };

  convertToDate = (dateString) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const [day, month] = dateString.split(" ");
    const date = new Date(
      `${currentYear}-${this.getMonthNumber(month)}-${day}`
    );
    return date;
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

  handleOnStartPayment = (orderId, amount) => {
    var options = {
      description: "Payment for Subscription",
      currency: "INR",
      key: getPaymentKey(),
      amount: amount * 100,
      name: "Machaxi",
      prefill: {
        email: getRazorPayEmail(),
        contact: this.state.phonenumber,
        name: this.state.userDetails.userName,
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
        this.props.onPress(false, orderId, amount);
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
      .paymentConfirmation(this.state.header, postData)
      .then((result) => {
        result = result.payload.data;
        if (result.success) {
          this.props.onPress(true);
        } else {
          alert(result.error_message);
        }
      });
  };

  getData = async () => {
    const header = await AsyncStorage.getItem("header");
    const userDetailsJson = await AsyncStorage.getItem("user_details");
    const phonenumber = await AsyncStorage.getItem("phone_number");
    const userDetails = JSON.parse(userDetailsJson);
    this.setState({
      userDetails: userDetails,
      header: header,
      phonenumber: phonenumber,
    });
  };

  DataChange = (join_date) => {
    const endDate = new Date(startDate);
    if (startDate.getMonth() === 11) {
      endDate.setMonth(0);
      endDate.setFullYear(startDate.getFullYear() + 1);
    } else {
      endDate.setMonth(startDate.getMonth() + 1);
    }
    this.setState({ startdate: join_date, enddate: endDate });
  };

  startPayment = () => {
    var dataDic = {};
    var dict = {};

    dict["plan_id"] = "" + this.props.selectPlan.id;
    dict["join_date"] = this.state.joinDate;
    dict["user_id"] = this.state.userDetails.id;
    dict["parentName"] = this.state.userDetails.userName;
    dict["player_name"] = this.state.username;
    dict["gender"] = this.state.gender.toUpperCase();
    dataDic["data"] = dict;

    this.props
      .selectPlanDate(dataDic, this.state.header)
      .then(() => {
        let jsondata = JSON.stringify(this.props.data.planData.data);
        let responcedata = JSON.parse(jsondata);
        this.handleOnStartPayment(responcedata.order_id, responcedata.amount);
      })
      .catch((response) => {
        console.log(response);
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

    return (
      <View style={{ marginVertical: 20, flex: 1 }}>
        <Loader visible={this.state.isLoading} />
        <ScrollView style={{ flex: 0.94 }}>
          <Text style={styles.mainText}>Review before Payment</Text>
          <PlanDetails
            title={this.props.selectPlan.name}
            subtitle={this.props.selectPlan.price}
            startDate={this.state.displayStartDate}
            endDate={this.state.displayEndDate}
            image={this.props.selectPlan.planIconUrl}
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
              <Text style={styles.name}>
                {this.state.userDetails.userName} ·{" "}
              </Text>
              <Text
                style={[styles.subtitle, { color: "#FFC498", marginLeft: 2 }]}
              >
                {this.state.userDetails.gender}
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
                <Text style={styles.distance}>{this.state.centerDistance}</Text>
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
              style={{
                flexDirection: "row",
                marginVertical: 10,
                marginLeft: 15,
              }}
            >
              {listText(
                this.state.startdate.getDate(),
                this.state.startdate.toLocaleString("en-GB", this.monthoption),
                "Date of Purchase"
              )}
              <View style={{ marginHorizontal: 20 }} />
              {listText(
                this.state.enddate.getDate(),
                this.state.enddate.toLocaleString("en-GB", this.monthoption),
                "Date of Membership Expiry"
              )}
            </View>
          </LinearGradient>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (this.state.appliedCoupon) {
                this.setState({ appliedCoupon: !this.state.appliedCoupon });
              } else {
                this.props.onPresscoupon();
              }
            }}
          >
            <CouponView appliedCoupon={this.state.appliedCoupon} />
          </TouchableOpacity>
          <PaymentDetails
            title={
              "Payment for " +
              this.state.displayStartDate +
              " to " +
              this.state.displayEndDate
            }
            appliedCoupon={this.state.appliedCoupon}
            coupounPrice={100}
            price={this.state.amount}
            finalprice={this.state.amount}
          />
        </ScrollView>
        <View style={{ flex: 0.06, paddingTop: 15 }}>
          <CustomButton
            name={"Pay " + this.state.amount}
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
    marginTop: -15,
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
)(SelectPlayPay);

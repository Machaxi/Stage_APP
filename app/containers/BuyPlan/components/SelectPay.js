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
    var levelimage = selectLevel.image;
    var levelname = selectLevel.name;
    const username = this.props.username;
    const gender = this.props.gender;
    const parent = this.props.parent;
    const joinDate = this.convertToDate(this.props.selectPlan.start_date);
    if (this.props.title == "Playing") {
      levelname = selectLevel.displayText;
      levelimage = selectLevel.url;
    }

    this.setState({
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
      selectLevel: selectLevel,
      username: username,
      gender: gender,
      parent: parent,
      displayStartDate: this.props.selectPlan.start_date,
      displayEndDate: this.props.selectPlan.end_date,
      amount: this.props.selectPlan.amount,
      joinDate: joinDate,
    });
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
    // this.RBSheet.close()
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
        submitPaymentConfirmation(orderId, amount, payment_details);
        console.log(payment_details);
      })
      .catch((error) => {
        console.log("Razor Rspo ", JSON.stringify(error));
        alert("Payment could not succeed. Please try again.");
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
    props.paymentConfirmation(this.state.header, postData).then((result) => {
      result = result.payload.data;
      if (result.success) {
        Events.publish("PROFILE_REFRESH");
        alert(result.success_message);
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
    this.setState({ joinDate: join_date });
    const batch_id = this.state.selectBatch.batch_id;
    axios
      .get(
        getBaseUrl() + "/global/batch/" + batch_id + "/?join_date=" + join_date
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
          amount: planData[term].amount,
        });
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
    dict["parentName"] = this.state.userDetails.userName;
    dict["player_name"] = this.state.userDetails.userName;
    dict["gender"] = this.state.userDetails.gender;
    dataDic["data"] = dict;

    this.props
      .selectPlanDate(dataDic, this.state.header)
      .then(() => {
        let jsondata = JSON.stringify(this.props.data.planData.data);
        let responcedata = JSON.parse(jsondata);
        console.log(responcedata.amount);
        console.log(this.props.data.planData);
        console.log(responcedata);
        this.handleOnStartPayment(responcedata.order_id, responcedata.amount);
      })
      .catch((response) => {
        console.log(response);
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
                resizeMode="cover"
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

    return (
      <View style={{ marginVertical: 20, flex: 1 }}>
        <Loader visible={this.state.isLoading} />
        <ScrollView style={{ flex: 0.94 }}>
          <Text style={styles.mainText}>Review before Payment</Text>
          <PlanDetails
            title={
              this.props.selectPlan.term_id === 1
                ? "Monthly"
                : this.props.selectPlan.term_id === 2
                ? "Quaterly"
                : "Yearly"
            }
            subtitle={this.props.selectPlan.amount}
            startDate={this.props.selectPlan.start_date}
            endDate={this.props.selectPlan.end_date}
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
                Parent · {this.state.gender}
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
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              {listimage(this.state.sportImage, this.state.sportName, true)}
              {listText(
                this.state.session_per_Week == "WORKING_DAYS" ? "5" : "3",
                "Days/Week",
                this.state.session_per_Week == "WORKING_DAYS"
                  ? "Mon to Fri"
                  : this.state.session_per_Week == "WEEK_MWF"
                  ? "Mon,Wed,Fri"
                  : "Tue,Thu,Sat"
              )}
              {listimage(
                this.state.levelImage,
                this.state.levelName,
                this.props.title == "Playing"
              )}
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
              this.setState({ appliedCoupon: !this.state.appliedCoupon });
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
  };
};

const mapDispatchToProps = { selectPlanDate, paymentConfirmation };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPay);

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../../components/custom/CustomButton";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-navigation";
import moment from "moment";
import { getBaseUrl } from "../../../containers/BaseComponent";
import axios from "axios";
import {
  confirmCoachTrail,
  confirmPlayingTrail,
} from "../../../redux/reducers/PlayerReducer";
import { connect } from "react-redux";
import Loader from "../../../components/custom/Loader";
import {
  Nunito_Medium,
  Nunito_Regular,
  Nunito_SemiBold,
} from "../../util/fonts";
import { storeData } from "../../../components/auth";

class ConfirmBooking extends Component {
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
      childDetails: null,
      selectLevel: null,
      date: new Date(),
      isLoading: false,
      userDetails: null,
    };
  }

  componentDidMount() {
    this.handleopen();
    this.getData();
  }

  handleopen = () => {
    const selectCenter = this.props.selectCenter;
    const selectSport = this.props.selectSport;
    const selectDate = this.props.selectDate;
    const selectLevel = this.props.selectLevel;
    const selectBatch = this.props.selectBatch;
    const distance = this.props.distance;
    const selectTime = selectBatch.displayTime;
    const levelname = selectLevel.displayText;
    const levelimage = selectLevel.url;

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
      date: selectDate,
      selectLevel: selectLevel,
      username: this.props.username,
      gender: this.props.usergender,
      parent: this.props.parent,
      childDetails: this.props.childDetails,
    });
  };

  getData = async () => {
    const header = await AsyncStorage.getItem("header");
    const userDetailsJson = await AsyncStorage.getItem("user_details");
    const userDetails = JSON.parse(userDetailsJson);
    this.setState({ header: header, userDetails: userDetails });
  };

  booktrail = () => {
    this.setState({ isLoading: true });
    if (this.props.title == "Playing") {
      this.confirmPlaying();
    } else {
      this.confirmCoaching();
    }
  };

  confirmCoaching = () => {
    var dataDic = {};
    var dict = {};

    var url = "batch/book-coaching-trial";
    const formattedDate = moment(this.state.date).format("YYYY-MM-DD");
    dict["batch_id"] = "" + this.state.selectBatch.batch_id;
    dict["trial_date"] = formattedDate;
    dict["startTime"] = this.state.selectBatch.startTime;
    dict["endTime"] = this.state.selectBatch.endTime;
    if (this.props.parent == "Parent") {
      dict["user"] = "" + this.state.userDetails.id;
    } else {
      if (this.state.childDetails != null) {
        dict["user"] = this.state.childDetails.id;
      } else {
        dict["player_name"] = this.state.username;
        dict["gender"] = this.state.gender.toUpperCase();
        dict["user"] = "" + this.state.userDetails.id;
      }
    }
    dataDic["data"] = dict;
    this.props
      .confirmCoachTrail(dataDic, this.state.header, url)
      .then(() => {
        this.setState({ isLoading: false });
        if (this.props.data.booktrail == null) {
          let userFail = JSON.stringify(this.props.data.bookFail.data);
          let userFailResponce = JSON.parse(userFail);
          this.props.onPress(false, userFailResponce.error_message);
        } else {
          this.updataData();
        }
      })
      .catch((response) => {
        this.setState({ isLoading: false });
        console.log(response);
      });
  };

  updataData = () => {
    axios
      .get(getBaseUrl() + "/login-refreshed", {
        headers: {
          "x-authorization": this.state.header,
        },
      })
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        let batchData = userResponce["data"]["data"];
        storeData("userInfo", JSON.stringify(batchData));
        this.props.onPress(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  confirmPlaying = () => {
    var dataDic = {};
    var dict = {};
    var url = "court/bookTrial";
    const formattedDate = moment(this.state.date).format("YYYY-MM-DD");
    dict["date"] = formattedDate;
    dict["courtTimingId"] = this.state.selectBatch.courtTimingId;
    dict["proficiency"] = this.state.selectLevel.name;
    dataDic["data"] = dict;
    this.props
      .confirmPlayingTrail(dataDic, this.state.header, url)
      .then(() => {
        this.setState({ isLoading: false });
        if (this.props.data.playdata == null) {
          let userFail = JSON.stringify(this.props.data.bookFail.data);
          let userFailResponce = JSON.parse(userFail);
          this.props.onPress(false, userFailResponce.error_message);
        } else {
          let usersuccess = JSON.stringify(this.props.data.playdata.data);
          let userSuccessResponce = JSON.parse(usersuccess);
          console.log("okk");
          console.log(userSuccessResponce);
          console.log(usersuccess);
          this.props.onPress(
            true,
            userSuccessResponce.booking.playingAreaName +
              " : " +
              userSuccessResponce.booking.courtName
          );
        }
      })
      .catch((response) => {
        this.setState({ isLoading: false });
        console.log(response);
      });
  };

  render() {
    listdata = (image, name, url) => {
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

    return (
      <View style={{ marginVertical: 20, flex: 1 }}>
        <Loader visible={this.state.isLoading} />
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 0.94 }}>
          <Text style={styles.mainText}>Confirm Book free Trial</Text>
          <LinearGradient
            colors={[
              "rgba(255, 255, 255, 0.15)",
              "rgba(118, 87, 136, 0)",
              "rgba(118, 87, 136, 0)",
              "rgba(118, 87, 136, 0.44)",
            ]}
            locations={[0, 0.3, 0.6, 1]}
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
                {this.state.gender}
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
            <Text style={styles.subtitle}>
              {this.props.title == "Playing" ? "Slot Details" : "Batch Details"}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              {this.props.title === "Coaching"
                ? listdata(
                    require("../../../images/playing/coach.png"),
                    "Coaching",
                    false
                  )
                : listdata(
                    require("../../../images/playing/play.png"),
                    "Playing",
                    false
                  )}
              {listdata(this.state.sportImage, this.state.sportName, true)}
              {listdata(this.state.levelImage, this.state.levelName, true)}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: 15,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.4)",
                    "rgba(255, 255, 255, 0.06)",
                  ]}
                  locations={[0, 1]}
                  style={[styles.sportsview]}
                >
                  <Text style={[styles.datetitle, { fontSize: 25 }]}>
                    {this.state.date.getDate()}
                  </Text>
                  <Text style={[styles.datetitle]}>
                    {this.months[this.state.date.getMonth()]}
                  </Text>
                </LinearGradient>
                <Text style={[styles.sportText]}>
                  {this.weekdays[this.state.date.getDay()]}
                </Text>
              </View>
              {listdata(
                require("../../../images/playing/clock.png"),
                this.state.time,
                false
              )}

              <View style={styles.sportsview} />
            </View>
          </LinearGradient>
        </ScrollView>
        <View style={{ flex: 0.06, paddingTop: 15 }}>
          <CustomButton
            name="Book Free Trial"
            available={true}
            onPress={this.booktrail}
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
    width: 32,
    height: 50,
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
const mapDispatchToProps = {
  confirmCoachTrail,
  confirmPlayingTrail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmBooking);

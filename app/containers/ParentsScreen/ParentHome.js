import React from "react";
import RNPickerSelect from "react-native-picker-select";
import * as Progress from "react-native-progress";

import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  RefreshControl,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  Linking,
} from "react-native";
import { CustomeCard } from "../../components/Home/Card";
import {
  SwitchButton,
  CustomeButtonB,
} from "../../components/Home/SwitchButton";
import { Card } from "react-native-paper";
import { getData, storeData } from "../../components/auth";
import {
  getPlayerDashboard,
  getPlayerSWitcher,
} from "../../redux/reducers/dashboardReducer";
import { connect } from "react-redux";
import moment from "moment";
import LinearGradient from "react-native-linear-gradient";
import { Rating } from "react-native-ratings";
import PlayerHeader from "../../components/custom/PlayerHeader";
import { DueView } from "../../components/Home/DueView";
import { RateViewFill } from "../../components/Home/RateViewFill";
import { RateViewBorder } from "../../components/Home/RateViewBorder";
import BaseComponent, {
  getFormattedLevel,
  defaultStyle,
  SESSION_DATE_FORMAT,
  getUtcDateFromTime,
  RATING_UPDATE,
  EVENT_EDIT_PROFILE,
  getFormatTimeDate,
  EVENT_UPDATE_DIALOG,
} from "../BaseComponent";
import Events from "../../router/events";
import CustomProgress from "../../components/custom/CustomProgress";
import * as Analytics from "../../Analytics";
import StarRating from "react-native-star-rating";
import CustomAnimationProgress from "../../components/custom/CustomAnimationProgress";
import CustomProgres from "../../components/custom/CustomProgress";
import UpdateAppDialog from "../../components/custom/UpdateAppDialog";
import ViewShot from "react-native-view-shot";
import ImgToBase64 from "react-native-image-base64";
import Share from "react-native-share";
import branch, { BranchEvent } from "react-native-branch";
import MyStats from "../../components/custom/MyStats";
import RequestHeaderLeft from "../../atoms/requestHeaderLeft";
import RequestHeaderRight from "../../atoms/requestHeaderRight";
import CoachScreen from "../FirstTimeUser/CoachScreen";
import RequestHeaderTitle from "../../atoms/requestHeaderTitle";
import RequestHeaderBg from "../../atoms/requestHeaderBg";

var deviceWidth = Dimensions.get("window").width - 20;

var is_show_badge = false;
var notification_count = 0;

class ParentHome extends BaseComponent {
  acedemy_name = "";

  static navigationOptions = ({ navigation }) => {
    // return {
    //   headerTitle: "Learn",
    // (
    //   <TouchableOpacity
    //     style={{
    //       alignItems: "center",
    //       justifyContent: "center",
    //       alignSelf: "center",
    //       flex: 1,
    //     }}
    //     onPress={() => {
    //       navigation.getParam("switchPlayer")();
    //     }}
    //     activeOpacity={0.8}
    //   >
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         //alignItems: 'center'
    //       }}
    //     >
    //       <Text
    //         style={{
    //           fontFamily: "Quicksand-Medium",
    //           fontSize: 14,
    //           color: "white",
    //         }}
    //       >
    //         {navigation.getParam("Title", "") == ""
    //           ? "Learn"
    //           : navigation.getParam("Title", "")}
    //       </Text>

    //       {navigation.getParam("Title", "") == "" ? null : (
    //         <Image
    //           source={require("../../images/white_drop_down.png")}
    //           resizeMode="contain"
    //           style={{
    //             width: 8,
    //             marginLeft: 6,
    //             height: 6,
    //             justifyContent: "center",
    //             alignSelf: "center",
    //             marginTop: 3,
    //             alignItems: "center",
    //             justifyContent: "center",
    //           }}
    //         />
    //       )}
    //     </View>
    //   </TouchableOpacity>
    // ),
    // headerTitleStyle: {
    //   color: "white",
    // },
    // headerStyle: {
    //   elevation: 0,
    //   shadowOpacity: 0,
    //   borderBottomWidth: 0,
    // },
    //  header: <CustomHeader title="Navdeep's Academy ▼ " showBackArrow={true}
    // navigation={navigation} />,
    // headerBackground: (
    //   // <LinearGradient
    //   //     colors={['#24262A', '#332B70']}
    //   //     style={{ flex: 1 }}
    //   //     start={{ x: 1, y: 0 }}
    //   //     end={{ x: 0.5, y: 1 }}
    //   //     locations={[0.0, 0.15, 0.90]}
    //   // />
    //   <ImageBackground
    //     style={{
    //       width: "100%",
    //       height: "100%",
    //     }}
    //     source={require("../../images/toolbar_bg.png")}
    //   />
    // ),
    //   headerTitleStyle: styles.headerStyle,
    //   headerStyle: {
    //     backgroundColor: "#21202F",
    //   },
    //   headerLeft: <RequestHeaderLeft navigation={navigation} />,
    //   headerRight: <RequestHeaderRight navigation={navigation} />,
    // };
    return {
      headerTitle: <RequestHeaderTitle title={"Learn"} />,
      headerTitleStyle: {
        color: "white",
      },
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerBackground: <RequestHeaderBg />,
      headerLeft: <RequestHeaderLeft navigation={navigation} />,
      headerRight: <RequestHeaderRight navigation={navigation} />,
    };
  };

  constructor(props) {
    super(props);
    this.inputRefs = {
      acedemic: null,
    };
    this.setNavigation(this.props.navigation);
    this.state = {
      refreshing: false,
      userData: null,
      country: undefined,
      player_profile: null,
      strenthList: null,
      acedemy_name: "",
      academy_feedback_data: null,
      coach_feedback_data: null,
      academy_id: "",
      academy_user_id: "",
      show_must_update_alert: false,
      sportsOptionsVisible: false,
      currentSportName: "",
      isStatsLoading: false,
      loading: false,
      userDetails: null,
      itemList: [],
    };
    const { navigation } = this.props.navigation.setParams({
      shareProfile: this.shareProfile,
    });
    this.props.navigation.setParams({ switchPlayer: this.switchPlayer });
  }

  updaterefresh() {
    console.log("in am worling");
    getData("userInfo", (value) => {
      console.log("userInfo asyncVal", value);
      var userData = JSON.parse(value);
      this.setState({ userDetails: userData, loading: false });
      if (userData.user) {
        var userid = userData.user["id"];
        var username = userData.user["name"];
        Analytics.logEvent("ParentHome", {
          userid: userid,
          username: username,
        });
        this.getPlayerSwitchingData();
      }
    });
  }

  updateUserData() {
    console.log("in am worling");
    getData("userInfo", (value) => {
      console.log("userInfo asyncVal", value);
      var userData = JSON.parse(value);
      this.setState({ userDetails: userData, loading: false });
      if (userData.user) {
        var userid = userData.user["id"];
        var username = userData.user["name"];
        Analytics.logEvent("ParentHome", {
          userid: userid,
          username: username,
        });
      }
    });
  }

  onScreenFocus = () => {
    console.log("in am ");
    this.updateUserData();
  };

  //TODO: handle it
  getPlayerSwitchingData() {
    console.log("hererererre");

    getData("header", (value) => {
      console.log("header", value);
      this.props
        .getPlayerSWitcher(value)
        .then(() => {
          var respns = this.props.switcherData;
          console.log("jdbcdjc");
          console.log({ respns });
          // console.log(' user response payload ' + JSON.stringify(this.props.data));
          // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
          let user = JSON.stringify(this.props.switcherData.switherlist);
          let usered = JSON.parse(user);
          console.log("workings");
          console.log(usered);
          let user1 = usered.data["players"].filter(
            (item) => item.isCoaching === true
          );
          if (usered.success == true) {
            storeData("childrenData", JSON.stringify(user1));
            //TODO: verify this flow
            //set first player as selected
            if (user1?.length > 0) {
              var tempuserData = this.state.userDetails;
              tempuserData["academy_id"] = user1[0].academy_id;
              tempuserData["player_id"] = user1[0].id;
              tempuserData["academy_name"] = user1[0].academy_name;
              tempuserData["academy_rating"] = user1[0].academy_rating;

              console.log("tempuserData userInfo", tempuserData);
              console.log({ tempuserData });
              storeData("userInfo", JSON.stringify(tempuserData));

              storeData("academy_name", user1[0].academy_name);
              storeData("academy_id", user1[0].academy_id);
              storeData("academy_rating", user1[0].academy_rating);
              storeData("player_id", user1[0].id);
              //after setting initial value to first user set current user data
              this.updateUserData();
              this.fetchPlayerDashboardData();
              //TODO: verify this flow
            }

            this.setState({
              itemList: user1,
            });
          }
        })
        .catch((response) => {
          //handle form errors
          console.log(response);
        });
    });
  }

  componentDidMount() {
    global.NEW_PLAYER_FLOW = true;

    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      this.onScreenFocus
    );

    this.setState({ loading: true });
    //this.updateUserData();
    // firebase.analytics().logEvent("ParentHome", {})
    //get list of all the players
    this.selfComponentDidMount(true);

    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.getNotifications();
      }
    );

    this.refreshEvent = Events.subscribe("NOTIFICATION_CALL", (msg) => {
      this.getNotifications();
    });

    this.refreshEvent = Events.subscribe("FROM_REGISTRATION", (deep_data) => {
      let type = null;
      console.log("deep data", deep_data);
      if (deep_data != null) {
        storeData("deep_data", JSON.stringify(deep_data));
        let player_id = deep_data.player_id;
        let academy_id = deep_data.academy_id;
        type = deep_data.type;
        if (type !== null && type === "profile") {
          this.props.navigation.navigate("OtherPlayerDeatils", {
            player_id: player_id,
            academy_id: academy_id,
          });
        }
      }
      if (type == null) {
        setTimeout(() => {
          this.props.navigation.navigate("Tournament");
        }, 100);
      }
    });

    this.refreshEvent = Events.subscribe("REFRESH_DASHBOARD", () => {
      this.selfComponentDidMount(false);
    });

    this.refreshEvent = Events.subscribe("REFRESH_DASHBOARD_1", () => {
      this.selfComponentDidMount(false);
    });

    this.getNotifications();

    this.checkNotification();

    this.refreshEvent = Events.subscribe("NOTIFICATION_CLICKED", (msg) => {
      this.checkNotification();
    });

    this.refreshEvent = Events.subscribe(EVENT_UPDATE_DIALOG, (must_update) => {
      // must_update = true
      this.setState({
        show_must_update_alert: must_update,
      });
    });

    this.refreshEvent = Events.subscribe("REFRESH_DASHBOARD_PURSCHASE", () => {
      if (this.state.academy_id) {
        console.log("ollla");
        this.getPlayerSwitchingData();
      }
    });

    this.refreshEvent = Events.subscribe("REFRESH_DASHBOARD_NEW", () => {
      console.log("ollladd");
      this.updaterefresh();
    });
    setTimeout(() => {
      console.log("component did mount");
      if (this.viewShot) {
        this.viewShot
          .capture()
          .then((uri) => {
            this.onCapture(uri);
          })
          .catch((error) => {
            console.log("error in capture call", error);
          });
      } else {
        console.log("viewshot reference not fount");
      }
    }, 5000);
  }

  componentWillUnmount() {
    this.didFocusListener && this.didFocusListener.remove();
    this.willFocusSubscription.remove();
  }

  // componentWillReceiveProps(nextProps, nextState){
  //     if(nextProps.data !== this.props.data){
  //         console.log('will recieve props', nextProps)
  //         setTimeout(()=>{
  //             this.viewShot.capture().then(uri => {
  //                 this.onCapture(uri)
  //             })
  //         }, 3000)
  //     }
  // }

  checkNotification() {
    if (global.NOTIFICATION_DATA) {
      try {
        let notification_for = global.NOTIFICATION_DATA.notification_for;
        this.notificationOpenScreen(notification_for);
        global.NOTIFICATION_DATA = null;
      } catch (err) {}
    }
  }

  getNotifications() {
    this.getNotificationCount((count) => {
      this.props.navigation.setParams({ notification_count: count });
      notification_count = count;
      this.props.navigation.setParams({
        headerRight: <RequestHeaderRight navigation={this.props.navigation} />,
      });
    });
  }

  //final api call to fetch dashboard data for first selected user
  fetchPlayerDashboardData() {
    var userData;
    getData("userInfo", (value) => {
      console.warn(value);
      userData = JSON.parse(value);
      global.SELECTED_PLAYER_ID = userData["player_id"];
      global.SELECTED_ACADEMY_ID = userData["academy_id"];

      this.state.academy_id = userData["academy_id"];

      let academy_name = userData.academy_name;
      if (academy_name == undefined) academy_name = "";
      //       this.props.navigation.setParams({ Title: academy_name });

      this.setState({
        userData: JSON.parse(value),
      });
      console.log("userData.user", userData.user["user_type"]);
      if (
        userData.user["user_type"] == "PLAYER" ||
        userData.user["user_type"] == "FAMILY"
      ) {
        this.getPlayerDashboardData(
          userData["academy_id"],
          userData["player_id"],
          this.state.currentSportId
        );
      }
    });
  }

  async selfComponentDidMount(isFirstRender) {
    var userData;

    console.log("PARENTDashboard");

    if (isFirstRender) {
      this.getPlayerSwitchingData();
    } else {
      //this.updateUserData();
      this.setState({ loading: true });
      this.fetchPlayerDashboardData();
    }

    getData("multiple", (value) => {
      //console.warn('multiple => ' + value)
      if (value != "" && value == "false") {
        console.warn("multiple1 => " + value);
        this.getSwitchData();
      }
    });
  }
  getSwitchData() {
    getData("header", (value) => {
      console.log("header", value);
      this.props
        .getPlayerSWitcher(value)
        .then(() => {
          let user = JSON.stringify(this.props.data.dashboardData);
          console.log(" getSwitchData payload " + user);
          let usered = JSON.parse(user);
          let user1 = usered.data["players"].filter(
            (item) => item.isCoaching === true
          );
          if (usered.success == true) {
            let data = user1;
            if (data.length > 0) {
              let name = data[0].academy_name;
              //let academy_id = data[0].academy_id
              // console.warn('test => ' + name)

              getData("userInfo", (value1) => {
                console.warn(value1);
                const userData = JSON.parse(value1);
                userData["academy_name"] = name;
                userData["academy_user_id"] =
                  usered.data["player_profile"].academy_user_id;
                storeData("userInfo", JSON.stringify(userData));

                let obj = {
                  academy_name: data[0].academy_name,
                  academy_rating: data[0].academy_rating,
                };
                Events.publish(RATING_UPDATE, obj);
              });

              // this.props.navigation.setParams({ Title: name });
            }
          }
        })
        .catch((response) => {
          //handle form errors
          console.log(response);
        });
    });
  }

  shareProfile = async () => {
    this.setState({ refreshing: true });
    if (this.state.screenShot) {
      this.buo = await branch.createBranchUniversalObject("machaxi-app", {
        locallyIndex: true,
        //canonicalUrl:  'https://google.com',
        title: "Machaxi",
        contentImageUrl: "data:image/png;base64," + this.state.screenShot,
        contentMetadata: {
          customMetadata: {
            type: "profile",
            player_id: global.SELECTED_PLAYER_ID + "",
            academy_id: this.state.academy_id + "",
          },
        },
      });
      this.buo.logEvent(BranchEvent.ViewItem);
      console.log(
        "Created Branch Universal Object and logged standard view item event.",
        BranchEvent.ViewItem
      );
      let linkProperties = {
        feature: "share",
        channel: "whatsapp",
        //userId: "125",
      };

      let controlParams = {
        $desktop_url:
          Platform.OS === "android"
            ? "https://play.google.com/store/apps/details?id=com.machaxi&hl=en"
            : "https://apps.apple.com/in/app/machaxi-sports-technology/id1484093762",
        $ios_url:
          "https://apps.apple.com/in/app/machaxi-sports-technology/id1484093762",
      };

      let { url } = await this.buo.generateShortUrl(
        linkProperties,
        controlParams
      );
      //let {url} = await branchUniversalObject.generateShortUrl(linkProperties)
      console.log("URL ", url);
      const shareOptions = {
        title: "Machaxi App",
        message:
          "Click to see my detailed " +
          this.state.currentSportName +
          " Stats " +
          url,
        url: "data:image/png;base64," + this.state.screenShot,
        subject: "Machaxi",
        //quote:'hello',
        //   social: Share.Social.WHATSAPP
      };
      Share.open(shareOptions);
      this.setState({ refreshing: false });
    } else {
      setTimeout(() => this.shareProfile(), 1000);
    }
  };

  onCapture = (uri) => {
    console.log("uri=>", uri);
    // setTimeout(() => {
    ImgToBase64.getBase64String(`file://${uri}`)
      .then((base64String) => {
        // console.log('base64String', base64String)
        this.setState({ screenShot: base64String });
      })
      .catch((err) => console.log("error in creating url", err));
    // }, 10)
  };

  getPlayerDashboardData(academy_id, player_id, sport_id) {
    getData("header", (value) => {
      console.log("header", value, academy_id, player_id);
      this.props
        .getPlayerDashboard(value, player_id, academy_id, sport_id)
        .then(() => {
          var response_ = this.props.data.dashboardData;
          console.log({ response_ });
          // console.log(' user response payload ' + JSON.stringify(this.props.data));
          // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
          let user = JSON.stringify(this.props.data.dashboardData);
          console.log(" getPlayerDashboard " + user);
          let user1 = JSON.parse(user);

          //Getting Sports Data
          let sportsList, currentSportId, currentSportName;

          if (user1?.data["sports"] != null) {
            sportsList = user1?.data["sports"].map((item) => {
              return { label: item.name, value: item.id };
            });
            this.setState({ sportsList });
          }

          //Getting current Sport Id
          if (user1.data["player_profile"] != null) {
            currentSportId = user1.data["player_profile"].sport_id;

            currentSportName = sportsList.find((item) => {
              return item.value == currentSportId;
            });

            this.setState({
              currentSportId,
              currentSportName,
            });
          }
          if (user1.success == true) {
            let coach_feedback_data = null;
            let academy_feedback_data = null;

            this.state.academy_user_id =
              user1.data["player_profile"].academy_user_id;

            try {
              if (
                user1.data["coach_data"] != null &&
                user1.data["coach_data"]
              ) {
                if (user1.data["coach_data"].coach_feedback != undefined)
                  coach_feedback_data =
                    user1.data["coach_data"].coach_feedback[0];
              }
            } catch (err) {}

            try {
              if (
                user1.data["academy_data"] != null &&
                user1.data["academy_data"].feedback
              ) {
                academy_feedback_data = user1.data["academy_data"].feedback[0];
              }
            } catch (err) {}
            console.log("coach_feedback_data =>", coach_feedback_data);

            global.SELECTED_PLAYER_NAME = user1.data["player_profile"].name;

            this.setState({
              player_profile: user1.data["player_profile"],
              strenthList: user1.data.player_profile["stats"],
              acedemy_name: user1.data["player_profile"].academy_name,
              academy_feedback_data: academy_feedback_data,
              coach_feedback_data: coach_feedback_data,
            });

            let acedemy_name = user1.data["player_profile"].academy_name;
            // this.props.navigation.setParams({ Title: acedemy_name });

            getData("userInfo", (value) => {
              userData = JSON.parse(value);
              userData["academy_name"] = acedemy_name;
              userData["academy_user_id"] =
                user1.data["player_profile"].academy_user_id;
              userData["academy_rating"] =
                user1.data["player_profile"].academy_rating;
              userData["user_id"] = user1.data["player_profile"].user_id;
              storeData("userInfo", JSON.stringify(userData));
              Events.publish(EVENT_EDIT_PROFILE);
              this.refreshPage();
            });
          }
          this.setState({ isStatsLoading: false }, () => {
            this.setState({ loading: false });
          });
        })
        .catch((response) => {
          //handle form errors
          this.setState({ isStatsLoading: false });
          console.log(response);
        });
    });
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.selfComponentDidMount(false);
    // In actual case set refreshing to false when whatever is being refreshed is done!
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 1000);
  };

  refreshPage() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  handleClick() {
    let link = "";
    if (Platform.OS == "ios") {
      link = "itms-apps://itunes.apple.com/us/app/id${1484093762}?mt=8";
    } else {
      link = "market://details?id=com.machaxi";
    }
    Linking.canOpenURL(link).then(
      (supported) => {
        supported && Linking.openURL(link);
      },
      (err) => console.log(err)
    );
  }

  switchPlayer = () => {
    this.setState({ refreshing: true });
    if (this.state.screenShot) {
      this.setState({ refreshing: false });
      this.props.navigation.navigate("SwitchPlayer");
    } else {
      setTimeout(() => {
        this.switchPlayer();
      }, 1000);
    }
  };

  onSportItemSelected = (item) => {
    console.log("ON SPORTS", item);
    this.setState({ isStatsLoading: true });
    const currentSportId = item.value;
    this.getPlayerDashboardData(
      this.state.academy_id,
      global.SELECTED_PLAYER_ID,
      currentSportId
    );
    this.setState({
      currentSportId,
      sportsOptionsVisible: false,
    });
  };

  onStatItemClicked = (item) => {
    this.props.navigation.navigate("ViewPlayerPerformance", {
      performance_data: item,
    });
  };

  render() {
    let academy_feedback_data = this.state.academy_feedback_data;
    let coach_feedback_data = this.state.coach_feedback_data;
    let show_must_update_alert = this.state.show_must_update_alert;
    const rewards_ui_array = [];

    if (
      (this.props.data.loading && !this.state.player_profile) ||
      this.state.loading
    ) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#67BAF5" />
        </View>
      );
    }

    if (
      this.state.userDetails &&
      (this.state.userDetails.is_learn_enabled ||
        this.state.itemList?.length == 0)
    ) {
      return (
        <LinearGradient
          colors={["#332B70", "#24262A"]}
          locations={[0, 1]}
          style={{ flex: 1 }}
        >
          <CoachScreen
            onPressPlan={() => {
              this.props.navigation.navigate("CoachingPlan");
            }}
            navigation={this.props.navigation}
            learnData={this.state.learnData}
            onPressTrail={() => {
              this.props.navigation.navigate("BookLearnTrail");
            }}
          />
        </LinearGradient>
      );
    }

    if (this.state.player_profile) {
      const {
        name,
        academy_name,
        badge,
        rank,
        score,
        player_level,
        reward_point,
        player_category,
        is_reward_point_due,
        is_payment_due,
        reward_detail,
        payment_detail_academy,
        operations,
      } = this.state.player_profile;

      sessionArray = [];
      if (operations != null && operations.next_sessions != null) {
        for (let i = 0; i < operations.next_sessions.length; i++) {
          const {
            routine_name,
            session_date,
            is_canceled,
            end_time,
            start_time,
          } = operations.next_sessions[i];
          console.log("is_canceled", { is_canceled });
          if (is_canceled == true) {
            sessionArray.push(
              <View
                style={{
                  //marginTop: 6,
                  marginBottom: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {/* <Text style={[defaultStyle.bold_text_14, {
                                        textDecorationLine: 'line-through'
                                    }]}
                                    >{routine_name}</Text> */}
                  <View
                    style={{
                      backgroundColor: "#FF7373",
                      margin: 0,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Quicksand-Medium",
                        fontSize: 10,
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 0,
                        marginBottom: 5,
                        color: "white",
                      }}
                    >
                      Canceled
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={[
                      defaultStyle.regular_text_14,
                      {
                        textDecorationLine: "line-through",
                        color: "white",
                      },
                    ]}
                  >
                    {/* {moment.utc(session_date).local().format(SESSION_DATE_FORMAT)} */}
                    {getUtcDateFromTime(session_date, start_time)}
                  </Text>
                  <Text
                    style={[
                      defaultStyle.regular_text_14,
                      {
                        textDecorationLine: "line-through",
                        marginLeft: 10,
                        color: "white",
                      },
                    ]}
                  >
                    {getFormatTimeDate(session_date, start_time) +
                      "  -   " +
                      getFormatTimeDate(session_date, end_time)}
                  </Text>
                </View>
              </View>
            );
          } else {
            sessionArray.push(
              <View
                style={{
                  //marginTop: 6,
                  marginBottom: 16,
                }}
              >
                {/* <Text style={[defaultStyle.bold_text_14, {
                                }]}>{routine_name}</Text> */}

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={[defaultStyle.regular_text_14, { color: "white" }]}
                  >
                    {/* {moment.utc(session_date).local().format(SESSION_DATE_FORMAT)} */}
                    {getUtcDateFromTime(session_date, start_time)}
                  </Text>

                  <Text
                    style={[
                      defaultStyle.regular_text_14,
                      { marginLeft: 10, color: "white" },
                    ]}
                  >
                    {getFormatTimeDate(session_date, start_time) +
                      "  -   " +
                      getFormatTimeDate(session_date, end_time)}
                  </Text>
                </View>
              </View>
            );
          }
        }
      }

      if (is_reward_point_due) {
        console.log("reward_detail => ", JSON.stringify(reward_detail));

        let temp_reward_detail = this.filterRewards(reward_detail);
        console.log("temp_reward_detail->", JSON.stringify(temp_reward_detail));

        for (let i = 0; i < temp_reward_detail.length; i++) {
          let reward = temp_reward_detail[i];
          rewards_ui_array.push(
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "50%", flexDirection: "row" }}>
                <View>
                  <Text
                    style={[defaultStyle.bold_text_10, { color: "#A3A5AE" }]}
                  >
                    Month
                  </Text>
                  <Text style={[defaultStyle.bold_text_14, { marginTop: 10 }]}>
                    {moment(reward.month, "M").format("MMMM")}
                  </Text>
                </View>

                {/* <View style={{ marginLeft: 24 }}>
                                    <Text style={[defaultStyle.bold_text_10, { color: '#A3A5AE' }]}>Available</Text>
                                    <Text style={[defaultStyle.bold_text_14, { marginTop: 10 }]}>{reward_detail.points + 'pts'}</Text>
                                </View> */}
              </View>
              <View style={{ width: "40%" }}>
                <CustomeButtonB
                  onPress={() => {
                    this.props.navigation.navigate("ParentRewards");
                  }}
                >
                  Reward{" "}
                </CustomeButtonB>
              </View>
            </View>
          );
        }
      }
      return (
        <LinearGradient colors={["#051732", "#232031"]} style={{ flex: 1 }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                title="Pull to refresh"
              />
            }
            style={styles.main_container}
          >
            <PlayerHeader
              player_profile={this.state.player_profile}
              is_tooblar={true}
              is_parent={true}
              refreshPage={() => this.refreshPage()}
            />
            {/* <View style={{ margin: 10, marginTop: 20, zIndex: 2 }}>
              <SwitchButton onPress={() => this.switchPlayer()}>
                Switch Child
              </SwitchButton>
            </View> */}

            {sessionArray.length != 0 ? (
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.068)",
                  " rgba(255, 255, 255, 0.0102)",
                ]}
                style={styles.gradient}
              >
                <TouchableOpacity
                  onPress={() => {
                    global.click_batch_id = operations.batch_id;
                    this.props.navigation.navigate("Batch");
                  }}
                >
                  <LinearGradient
                    colors={[
                      "rgba(255, 255, 255, 0.068)",
                      " rgba(255, 255, 255, 0.0102)",
                    ]}
                    style={{
                      flex: 1,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      paddingLeft: 12,
                      paddingRight: 12,
                      justifyContent: "space-between",
                      flexDirection: "row",
                      paddingTop: 8,
                      paddingBottom: 8,
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flex: 0.68 }}>
                      <Text
                        style={[defaultStyle.bold_text_10, { color: "white" }]}
                      >
                        {operations.batch_name}
                      </Text>
                      <Text
                        style={{
                          ...defaultStyle.bold_text_10,
                          marginTop: 18,
                          color: "white",
                        }}
                      >
                        Next Session :{" "}
                        {operations.next_sessions[0].routine_name}
                      </Text>
                    </View>

                    <View style={{ flex: 0.32, flexDirection: "row" }}>
                      {operations.whats_app_url &&
                      operations.whats_app_url != "" ? (
                        <View
                          style={{
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              Linking.openURL(operations.whats_app_url);
                            }}
                          >
                            <Image
                              resizeMode="contain"
                              style={{
                                width: 30,
                                height: 30,
                              }}
                              source={require("../../images/whatsapp_logo.png")}
                            />
                          </TouchableOpacity>
                          <Text
                            style={[
                              defaultStyle.bold_text_10,
                              { color: "white" },
                            ]}
                          >
                            Join Whatsapp Group
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </LinearGradient>
                  <View style={{ marginLeft: 12, marginRight: 12 }}>
                    <View style={[defaultStyle.line_style, { marginTop: 0 }]} />

                    {sessionArray}
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            ) : null}

            {is_payment_due ? (
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.068)",
                  " rgba(255, 255, 255, 0.0102)",
                ]}
                style={styles.gradient}
              >
                <View
                  style={{
                    marginLeft: 12,
                    marginRight: 12,
                    marginTop: 16,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={[defaultStyle.bold_text_10, { color: "white" }]}
                      >
                        Payment
                      </Text>
                      <View style={{ marginLeft: 10 }}>
                        <DueView />
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("PaymentDetail");
                      }}
                    >
                      <Text
                        style={{
                          color: "#667DDB",
                          marginRight: 10,
                          fontFamily: "Quicksand-Regular",
                          fontSize: 10,
                        }}
                      >
                        View Details
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "#DFDFDF",
                      marginTop: 8,
                      marginBottom: 8,
                    }}
                  />

                  <Text
                    style={[
                      defaultStyle.bold_text_14,
                      { marginRight: 16, color: "white" },
                    ]}
                  >
                    {name}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "50%", flexDirection: "row" }}>
                      {/* <View>
                                        <Text style={[defaultStyle.bold_text_10, { color: '#A3A5AE' }]}>Due Date</Text>
                                        <Text style={[defaultStyle.bold_text_14, { marginTop: 10 }]}>
                                            {moment.utc(payment_detail.paymentDues[0].dueDate, 'YYYY-MM-DD').local().format("DD-MMM-YYYY")}
                                        </Text>
                                    </View> */}

                      <View style={{}}>
                        <Text
                          style={[
                            defaultStyle.bold_text_10,
                            { color: "white" },
                          ]}
                        >
                          Amount
                        </Text>
                        <Text
                          style={[
                            defaultStyle.bold_text_14,
                            { marginTop: 10, color: "white" },
                          ]}
                        >
                          {payment_detail_academy.totalAmount}
                        </Text>
                      </View>
                    </View>
                    <View style={{ width: "40%" }}>
                      <CustomeButtonB
                        onPress={() => {
                          this.props.navigation.navigate("PaymentDetail");
                        }}
                      >
                        Pay{" "}
                      </CustomeButtonB>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            ) : null}

            {is_reward_point_due ? (
              <CustomeCard>
                <View
                  style={{
                    marginLeft: 12,
                    marginRight: 12,
                    marginTop: 16,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text style={defaultStyle.bold_text_10}>
                        Reward Points
                      </Text>
                      <View style={{ marginLeft: 10 }}>
                        <DueView />
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("ParentRewards");
                      }}
                    >
                      <Text
                        style={{
                          color: "#667DDB",
                          marginRight: 10,
                          fontFamily: "Quicksand-Regular",
                          fontSize: 10,
                        }}
                      >
                        View Details
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "#DFDFDF",
                      marginTop: 8,
                      marginBottom: 8,
                    }}
                  />

                  <Text
                    style={[defaultStyle.bold_text_14, { marginRight: 16 }]}
                  >
                    {name}
                  </Text>

                  {/******** REWARD******************/}
                  <View>{rewards_ui_array}</View>
                </View>
              </CustomeCard>
            ) : null}

            <MyStats
              data={this.state.sportsList}
              currentSportId={this.state.currentSportId}
              isStatsLoading={this.state.isStatsLoading}
              strenthList={this.state.strenthList}
              onSportItemSelected={this.onSportItemSelected}
              onStatItemClicked={this.onStatItemClicked}
            />

            <View style={{ margin: 5 }}>
              {/* <Card style={{ margin: 5, borderRadius: 10 }}> */}
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.068)",
                  " rgba(255, 255, 255, 0.0102)",
                ]}
                style={[styles.gradient, { marginHorizontal: 5 }]}
              >
                <TouchableOpacity
                  onPress={() => {
                    //console.warn("Touch Press")
                    this.props.navigation.navigate("PlayersListing", {
                      id: this.state.academy_id,
                    });
                  }}
                >
                  <View
                    style={{
                      margin: 10,
                      flexDirection: "row",
                      height: 40,
                    }}
                  >
                    <Image
                      source={require("../../images/view_academy_player.png")}
                      resizeMode="contain"
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 20,
                        marginTop: 5,
                        tintColor: "white",
                      }}
                    />
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          marginTop: 10,
                          flex: 1,
                          marginRight: 15,
                          marginBottom: 5,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={[
                            defaultStyle.bold_text_14,
                            { color: "white" },
                          ]}
                        >
                          View Other Players
                        </Text>

                        <Image
                          source={require("../../images/path.png")}
                          style={{
                            width: 19,
                            height: 13,
                            marginRight: 0,
                            marginTop: 5,
                            tintColor: "white",
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            {/* <View style={{ margin: 5 }}>
              <Card style={{ margin: 5, borderRadius: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    console.warn("Touch Press");
                    // this.props.navigation.navigate("AcademyListing");
                    this.props.navigation.navigate("CoachingPlan");
                  }}
                >
                  <View
                    style={{
                      margin: 10,
                      flexDirection: "row",
                      height: 40,
                    }}
                  >
                    <Image
                      source={require("../../images/browse_academy.png")}
                      resizeMode="contain"
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 20,
                        marginTop: 5,
                      }}
                    />
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          marginTop: 10,
                          flex: 1,
                          marginRight: 15,
                          marginBottom: 5,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={defaultStyle.bold_text_14}>
                          Coaching Plans
                        </Text>

                        <Image
                          source={require("../../images/path.png")}
                          style={{
                            width: 19,
                            height: 13,
                            marginRight: 0,
                            marginTop: 5,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Card>
            </View> */}

            {/* ================================ Society Feedback =================== */}

            {/* {academy_feedback_data != null ? (
              <Card
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 10,
                  borderRadius: 12,
                }}
              >
                <View
                  style={{
                    marginLeft: 12,
                    marginRight: 12,
                    marginTop: 16,
                  }}
                >
                  <Text style={defaultStyle.bold_text_10}>
                    Society Feedback
                  </Text>
                </View>

                <View
                  style={[
                    defaultStyle.line_style,
                    { marginLeft: 12, marginRight: 12 },
                  ]}
                />

                <View style={{ marginLeft: 10, marginRight: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={[defaultStyle.bold_text_14, { color: "#707070" }]}
                    >
                      {academy_feedback_data.target.name}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 4,
                      }}
                    >
                       <Rating
                                            type='custom'
                                            ratingColor='#F4FC9A'
                                            ratingBackgroundColor='#D7D7D7'
                                            ratingCount={5}
                                            imageSize={12}
                                            readonly={true}
                                            startingValue={academy_feedback_data.target.avgFeedbackEntities[0].avgRating}
                                            style={{ width: 80 }}
                                        /> 
                      <StarRating
                        style={{
                          //height: 24,
                          width: 70,
                          marginRight: 6,
                        }}
                        containerStyle={{
                          width: 70,
                          marginRight: 6,
                        }}
                        starSize={14}
                        disabled={true}
                        emptyStar={require("../../images/ic_empty_star.png")}
                        fullStar={require("../../images/ic_star.png")}
                        halfStar={require("../../images/ic_half_star.png")}
                        iconSet={"Ionicons"}
                        maxStars={5}
                        rating={
                          academy_feedback_data.target.avgFeedbackEntities[0]
                            ? academy_feedback_data.target
                                .avgFeedbackEntities[0].avgRating
                            : 0
                        }
                        ratingBackgroundColor={"#ff2200"}
                        fullStarColor={"#F4FC9A"}
                      />

                       <Text style={{
                                            borderColor: '#DFDFDF',
                                            borderWidth: 1,
                                            height: 19, width: 30, textAlign: 'center',
                                            fontSize: 12,
                                            color: '#707070',
                                            paddingTop: 0,
                                            borderRadius: 12,
                                            fontFamily: 'Quicksand-Medium'
                                        }}>{academy_feedback_data.target.avgFeedbackEntities[0].avgRating.toFixed(1)}</Text>
                      <RateViewBorder>
                        {academy_feedback_data.target.avgFeedbackEntities[0]
                          ? academy_feedback_data.target.avgFeedbackEntities[0]
                              .avgRating
                          : 0}
                      </RateViewBorder>
                    </View>
                  </View>
                  <View>
                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={[
                          defaultStyle.bold_text_10,
                          { marginTop: 5, color: "#A3A5AE" },
                        ]}
                      >
                        Top Reviews
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 5,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={[
                            defaultStyle.bold_text_12,
                            { color: "#707070" },
                          ]}
                        >
                          {academy_feedback_data.source.name}
                        </Text>

                        <View
                          style={{
                            alignItems: "center",
                            flexDirection: "row",
                            marginLeft: 6,
                            //marginTop: 4,
                            alignItems: "center",
                          }}
                        >
                           <Rating
                                                    type='custom'
                                                    ratingColor='#F4FC9A'
                                                    ratingBackgroundColor='#D7D7D7'
                                                    ratingCount={5}
                                                    imageSize={12}
                                                    readonly={true}
                                                    startingValue={academy_feedback_data.rating}
                                                    style={{ width: 80 }}
                                                /> 
                          <StarRating
                            style={{
                              //height: 24,
                              width: 70,
                              marginRight: 6,
                            }}
                            containerStyle={{
                              width: 70,
                              marginRight: 6,
                            }}
                            starSize={14}
                            disabled={true}
                            emptyStar={require("../../images/ic_empty_star.png")}
                            fullStar={require("../../images/ic_star.png")}
                            halfStar={require("../../images/ic_half_star.png")}
                            iconSet={"Ionicons"}
                            maxStars={5}
                            rating={academy_feedback_data.rating}
                            ratingBackgroundColor={"#ff2200"}
                            fullStarColor={"#F4FC9A"}
                          />

                          <Text style={{
                                                    backgroundColor: '#D8D8D8',
                                                    height: 19, width: 30, textAlign: 'center',
                                                    fontSize: 12,
                                                    color: '#707070',
                                                    paddingTop: 0,
                                                    borderRadius: 12,
                                                    fontFamily: 'Quicksand-Medium'
                                                }}>{academy_feedback_data.rating.toFixed(1)}</Text>
                          <RateViewFill>
                            {academy_feedback_data.rating}
                          </RateViewFill>
                        </View>
                      </View>

                      <Text
                        style={[
                          defaultStyle.regular_text_12,
                          {
                            marginTop: 5,
                            color: "#707070",
                          },
                        ]}
                      >
                        {academy_feedback_data.review}
                      </Text>
                    </View>
                  </View>
                </View>

                <Card
                  style={{
                    elevation: 4,
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                    marginTop: 12,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("AcademyProfile", {
                        id: academy_feedback_data.academyId,
                      });
                    }}
                  >
                    <Text
                      style={[
                        defaultStyle.bold_text_12,
                        {
                          textAlign: "center",
                          flex: 1,
                          padding: 16,
                          color: "#707070",
                        },
                      ]}
                    >
                      View Academy
                    </Text>
                  </TouchableOpacity>
                </Card>
              </Card>
            ) : null} */}

            {/* ================================ COACH FEEDBACk =================== */}

            {coach_feedback_data != null ? (
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                {/* <Card
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 10,
                    marginBottom: 10,
                    borderRadius: 12,
                  }}
                > */}
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.068)",
                    " rgba(255, 255, 255, 0.0102)",
                  ]}
                  style={[styles.gradient, { margin: 10 }]}
                >
                  <View
                    style={{
                      marginLeft: 12,
                      marginRight: 12,
                      marginTop: 16,
                    }}
                  >
                    <Text
                      style={[defaultStyle.bold_text_10, { color: "white" }]}
                    >
                      Coach Feedback
                    </Text>
                  </View>

                  <View
                    style={[
                      defaultStyle.line_style,
                      { marginLeft: 12, marginRight: 12 },
                    ]}
                  />

                  <View style={{ marginLeft: 10, marginRight: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={[defaultStyle.bold_text_14, { color: "white" }]}
                      >
                        {coach_feedback_data.target.name}
                      </Text>

                      <View
                        style={{
                          alignItems: "center",
                          flexDirection: "row",
                          marginTop: 4,
                        }}
                      >
                        {/* <Rating
                                                type='custom'
                                                ratingColor='#F4FC9A'
                                                ratingBackgroundColor='#D7D7D7'
                                                ratingCount={5}
                                                imageSize={12}
                                                readonly={true}
                                                startingValue={coach_feedback_data.target.avgFeedbackEntities[0].avgRating}
                                                style={{ width: 80 }}
                                            /> */}
                        <StarRating
                          style={{
                            //height: 24,
                            width: 70,
                            marginRight: 6,
                          }}
                          containerStyle={{
                            width: 70,
                            marginRight: 6,
                          }}
                          starSize={14}
                          disabled={true}
                          emptyStar={require("../../images/ic_empty_star.png")}
                          fullStar={require("../../images/ic_star.png")}
                          halfStar={require("../../images/ic_half_star.png")}
                          iconSet={"Ionicons"}
                          maxStars={5}
                          rating={
                            coach_feedback_data.target.avgFeedbackEntities[0]
                              .avgRating
                          }
                          ratingBackgroundColor={"#ff2200"}
                          fullStarColor={"#F4FC9A"}
                        />

                        {/* <Text style={{
                                                borderColor: '#DFDFDF',
                                                borderWidth: 1,
                                                height: 19, width: 30, textAlign: 'center',
                                                fontSize: 12,
                                                color: '#707070',
                                                paddingTop: 0,
                                                borderRadius: 12,
                                                fontFamily: 'Quicksand-Medium'
                                            }}>{coach_feedback_data.target.avgFeedbackEntities[0].avgRating.toFixed(1)}</Text> */}
                        <RateViewBorder>
                          {
                            coach_feedback_data.target.avgFeedbackEntities[0]
                              .avgRating
                          }
                        </RateViewBorder>
                      </View>
                    </View>
                    <View>
                      <View style={{ marginTop: 10 }}>
                        <Text
                          style={[
                            defaultStyle.bold_text_10,
                            { marginTop: 5, color: "white" },
                          ]}
                        >
                          Top Reviews
                        </Text>

                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: 5,
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={[
                              defaultStyle.bold_text_12,
                              { color: "#707070" },
                            ]}
                          >
                            {coach_feedback_data.source.name}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginLeft: 6,
                              //marginTop: 4
                            }}
                          >
                            {/* <Rating
                                                        type='custom'
                                                        ratingColor='#F4FC9A'
                                                        ratingBackgroundColor='#D7D7D7'
                                                        ratingCount={5}
                                                        imageSize={12}
                                                        readonly={true}
                                                        startingValue={coach_feedback_data.rating}
                                                        style={{ width: 80 }}
                                                    /> */}
                            <StarRating
                              style={{
                                //height: 24,
                                width: 70,
                                marginRight: 6,
                              }}
                              containerStyle={{
                                width: 70,
                                marginRight: 6,
                              }}
                              starSize={14}
                              disabled={true}
                              emptyStar={require("../../images/ic_empty_star.png")}
                              fullStar={require("../../images/ic_star.png")}
                              halfStar={require("../../images/ic_half_star.png")}
                              iconSet={"Ionicons"}
                              maxStars={5}
                              rating={coach_feedback_data.rating}
                              ratingBackgroundColor={"#ff2200"}
                              fullStarColor={"#F4FC9A"}
                            />

                            {/* <Text style={{
                                                        backgroundColor: '#D8D8D8',
                                                        height: 19, width: 30, textAlign: 'center',
                                                        fontSize: 12,
                                                        color: '#707070',
                                                        paddingTop: 0,
                                                        borderRadius: 12,
                                                        fontFamily: 'Quicksand-Medium'
                                                    }}>{coach_feedback_data.rating.toFixed(1)}</Text> */}
                            <RateViewFill>
                              {coach_feedback_data.rating}
                            </RateViewFill>
                          </View>
                        </View>

                        <Text
                          style={[
                            defaultStyle.regular_text_12,
                            {
                              marginTop: 5,
                              color: "#707070",
                            },
                          ]}
                        >
                          {coach_feedback_data.review}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* <Card
                    style={{
                      elevation: 4,
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      marginTop: 12,
                    }}
                  > */}
                  <View
                    style={{
                      width: "100%",
                      height: 1,
                      backgroundColor: "#575f61ed",
                    }}
                  />
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("CoachProfileDetail", {
                          academy_id: coach_feedback_data.academyId,
                          coach_id: coach_feedback_data.target.entity_id,
                        });
                      }}
                    >
                      <Text
                        style={[
                          defaultStyle.bold_text_12,
                          {
                            textAlign: "center",
                            flex: 1,
                            padding: 16,
                            color: "white",
                          },
                        ]}
                      >
                        View Coach
                      </Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            ) : null}

            <UpdateAppDialog
              navigation={this.state.navigation}
              exitPressed={() => {
                this.setState({ show_must_update_alert: false });
                BackHandler.exitApp();
                //this.props.navigation.goBack(null)
              }}
              updatePressed={() => {
                this.setState({ show_must_update_alert: false });
                this.handleClick();
              }}
              visible={show_must_update_alert}
            />

            <ViewShot
              ref={(ref) => (this.viewShot = ref)}
              style={{
                opacity: 0,
                position: "absolute",
                width: "100%",
                zIndex: -1,
              }}
            >
              <PlayerHeader
                player_profile={this.state.player_profile}
                is_tooblar={true}
              />
              {/* {this.state.strenthList.length != 0 ?
                                <View style={{ margin: 10 }}>
                                    <Card style={{ borderRadius: 12 }}>
                                        <View>
                                            <Text style={[defaultStyle.bold_text_14, { marginLeft: 10, marginTop: 10 }]}>My Stats </Text>
                                            <View style={{
                                                width: 60,
                                                height: 3, marginLeft: 10,
                                                marginTop: 2, marginBottom: 8, backgroundColor: '#404040'
                                            }}></View>
                                            <FlatList
                                                data={this.state.strenthList}
                                                renderItem={this.renderItem}
                                                keyExtractor={(item, index) => item.id}
                                            />
                                        </View>
                                    </Card>
                                </View> : null
                            } */}
            </ViewShot>
          </ScrollView>
        </LinearGradient>
      );
    } else {
      return (
        <LinearGradient colors={["#051732", "#232031"]} style={{ flex: 1 }} />
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.DashboardReducer,
    switcherData: state.SwitchReducer,
  };
};
const mapDispatchToProps = {
  getPlayerDashboard,
  getPlayerSWitcher,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParentHome);

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    // paddingVertical: 12,
    //paddingHorizontal: 10,
    borderWidth: 0,
    borderColor: "#D3D3D3",
    borderRadius: 4,
    color: "white",
    // paddingLeft: 10,

    // alignItems: 'stretch',
    // // justifyContent: 'right',
    alignSelf: "center",
    height: 40,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#614051",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  navBar: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: 'blue',
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    // backgroundColor: 'green'
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: 'red',
  },
  rightIcon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    marginRight: 20,
    //backgroundColor: 'white',
  },
  headerStyle: {
    color: "#F2F2F2",
    fontFamily: "Quicksand-Medium",
    fontWeight: "400",
    textAlign: "center",
    fontSize: 16,
    flexGrow: 1,
    alignSelf: "center",
  },
  scoreBox: {
    color: "white",
    marginRight: 20,
    textAlign: "right",
    fontSize: 24,
    fontFamily: "Quicksand-Bold",
    color: "#F4F4F4",
  },
  buttomButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,

    backgroundColor: "white",
    marginTop: 10,
    marginBottom: -5,
    marginLeft: -5,
    marginRight: -5,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 1 },
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  main_container: {
    flex: 1,
    marginTop: 0,
  },
  gradient: {
    shadowOpacity: 0.2,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    borderColor: "rgba(0, 0, 0, 0.7)",
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});

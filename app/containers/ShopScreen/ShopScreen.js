import React from "react";

import {
  View,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Linking,
  ToastAndroid,
} from "react-native";
import { getData, storeData } from "../../components/auth";
import {
  getPlayerDashboard,
  getPlayerSWitcher,
} from "../../redux/reducers/dashboardReducer";
import { connect } from "react-redux";
import BaseComponent, {
  EVENT_EDIT_PROFILE,
} from "../BaseComponent";
import Events from "../../router/events";
import { darkBlueVariant } from "../util/colors";
import { myBookingsData } from "../util/dummyData/myBookingsData";
import RequestHeaderTitle from "../../atoms/requestHeaderTitle";
import RequestHeaderBg from "../../atoms/requestHeaderBg";
import RequestHeaderLeft from "../../atoms/requestHeaderLeft";
import RequestHeaderRight from "../../atoms/requestHeaderRight";
import ShopRewardsView from "../../components/molecules/shopRewardsView";
import HowToRedeem from "../../components/molecules/howToRedeem";
import RewardHistory from "../../components/molecules/rewardHistory";
import ShopScreenPicker from "../../components/molecules/shopScreenPickers";
import { deviceWidth } from "../util/dimens";

var is_show_badge = false;
var notification_count = 0;

class ShopHomeScreen extends BaseComponent {
  acedemy_name = "";

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <RequestHeaderTitle title={"Shop"} />,
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
      month: "jan",
      year: 2023,
      player_profile: null,
      strenthList: null,
      acedemy_name: "",
      academy_feedback_data: null,
      coach_feedback_data: null,
      academy_id: "",
      academy_user_id: "",
      currentSportName: "",
      isStatsLoading: false,
      loading: false,
      isUpcoming: true,
    };
    const { navigation } = this.props.navigation.setParams({
      shareProfile: this.shareProfile,
    });
  }

  componentDidMount() {
    this.selfComponentDidMount();
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.getNotifications();
      }
    );

    this.refreshEvent = Events.subscribe("NOTIFICATION_CALL", (msg) => {
      this.getNotifications();
    });

    this.getNotifications();

    this.checkNotification();

    this.refreshEvent = Events.subscribe("NOTIFICATION_CLICKED", (msg) => {
      this.checkNotification();
    });
  }

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
    });
  }

  selfComponentDidMount() {
    var userData;
    getData("header", (value) => {
      console.log("header", value);
    });

    console.log("PARENTDashboard");
    getData("userInfo", (value) => {
      console.warn(value);
      userData = JSON.parse(value);
      global.SELECTED_PLAYER_ID = userData["player_id"];
      global.SELECTED_ACADEMY_ID = userData["academy_id"];

      this.state.academy_id = userData["academy_id"];

      let academy_name = userData.academy_name;
      if (academy_name == undefined) academy_name = "";
      //   this.props.navigation.setParams({ Title: academy_name });

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

  getPlayerDashboardData(academy_id, player_id, sport_id) {
    getData("header", (value) => {
      console.log("header", value, academy_id, player_id);
      this.props
        .getPlayerDashboard(value, player_id, academy_id, sport_id)
        .then(() => {
          let user = JSON.stringify(this.props.data.dashboardData);
          console.log(" getPlayerDashboard " + user);
          let user1 = JSON.parse(user);

          //Getting Sports Data
          let sportsList, currentSportId, currentSportName;

          if (user1.data["sports"] != null) {
            sportsList = user1.data["sports"].map((item) => {
              return { label: item.name, value: item.id };
            });
            this.setState({ sportsList });
          }

          //Getting current Sport Id
          if (user1.data["player_profile"] != null) {
            currentSportId = user1.data["player_profile"].sport_id;

            currentSportName = sportsList.find((item) => {
              return item.value == currentSportId;
            }).label;

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
            });
          }
          this.setState({ isStatsLoading: false });
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
    this.selfComponentDidMount();
    // In actual case set refreshing to false when whatever is being refreshed is done!
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 1000);
  };
 
  onMonthSelect = (value) => {
    this.setState({
      month: value,
    });
  };

  onYearSelect = (value) => {
    this.setState({
      year: value,
    });
  };

  render() {
    const rewards_ui_array = [];

    // if (
    //   (this.props.data.loading && !this.state.player_profile) ||
    //   this.state.loading
    // ) {
    //   return (
    //     <View
    //       style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    //     >
    //       <ActivityIndicator size="large" color="#67BAF5" />
    //     </View>
    //   );
    // }

    if (this.state.player_profile || true) {
      sessionArray = [];

      return (
        <SafeAreaView style={styles.mainContainer}>
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginRight: 16,
              }}
            >
              <ShopScreenPicker
                placeHolder={{ label: "Month", value: null }}
                data={[
                  { label: "January", value: "jan" },
                  { label: "February", value: "feb" },
                  { label: "March", value: "mar" },
                  { label: "April", value: "apr" },
                  { label: "May", value: "may" },
                  { label: "June", value: "jun" },
                  { label: "July", value: "jul" },
                  { label: "August", value: "aug" },
                  { label: "September", value: "sep" },
                  { label: "October", value: "oct" },
                  { label: "November", value: "nov" },
                  { label: "December", value: "dec" },
                ]}
                value={this.state.month}
                onSelect={(val) => this.onMonthSelect(val)}
              />
              <View style={{ width: deviceWidth * 0.05, height: 1 }} />
              <ShopScreenPicker
                placeHolder={{ label: "Year", value: null }}
                data={[
                  { label: "2023", value: "2023" },
                  { label: "2024", value: "2024" },
                ]}
                value={this.state.year}
                onSelect={(val) => this.onYearSelect(val)}
              />
            </View>
            <ShopRewardsView />
            <HowToRedeem />
            <RewardHistory />
            <View style={{ height: 20, width: "100%" }} />
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        />
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.DashboardReducer,
  };
};
const mapDispatchToProps = {
  getPlayerDashboard,
  getPlayerSWitcher,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopHomeScreen);

const styles = StyleSheet.create({
  navBar: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainContainer: { flex: 1, marginTop: 0, backgroundColor: darkBlueVariant },
  main_container: {
    flex: 1,
    marginTop: 0,
  },
});

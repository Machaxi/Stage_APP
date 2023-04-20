import React, {useEffect, useState} from "react";
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
  EVENT_EDIT_PROFILE, getBaseUrl, getSettingData,
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
import { getNotificationCount } from "../util/notificationCount";
import LoadingIndicator from "../../components/molecules/loadingIndicator";
import Axios from "axios";
import moment from "moment";
import { client } from "../../../App";
const ShopScreen = ({ navigation }) => {

  const currentYear = moment(new Date()).year();
  const nextYear = currentYear + 1;
  const currentMonth = moment(new Date()).month();

 const [refreshing, setRefreshing] = useState(false);
 const [loading, setLoading] = useState(true);
 const [rewardsResponse, setRewardsResponse] = useState(null);
 const [month, setMonth] = useState(currentMonth);
 const [year, setYear] = useState(currentYear);

  const getNotifications = () => {
    getNotificationCount((count) => {
      navigation.setParams({ notification_count: count });
      navigation.setParams({
        headerRight: <RequestHeaderRight navigation={navigation} />,
      });
    });
  };

  const checkNotification = () => {
    if (global.NOTIFICATION_DATA) {
      try {
        let notification_for = global.NOTIFICATION_DATA.notification_for;
        notificationOpenScreen(notification_for);
        global.NOTIFICATION_DATA = null;
      } catch (err) {}
    }
  };

  const getRewardsData = async (monthVal, yearVal) => {
    setLoading(true)
    getData("header", (value) => {
      if (value == "") return;
      const headers = {
        "Content-Type": "application/json",
        //"x-authorization": value,
        //TODO:remove this static logic
        "x-authorization":
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NzQiLCJzY29wZXMiOlsiUExBWUVSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJpYXQiOjE2ODEyODAxNzQsImV4cCI6NTIyNTY0MDEyODAxNzR9.EpBzEY99WBY1B72GGru59zE3Y39Pa9ot9ELmANf1pOYpXqJlgrBajCmIiY5o37cXMOecQH49XQwjUhIB7drQsw",
      };
      //client.call
      client
        .get("rewards/shop", {
          headers,
          params: {
            month: monthVal,
            year: yearVal,
          },
        })
        .then(function(response) {
          console.log("rewardhistorydata" + JSON.stringify(response.data));
          let json = response.data;
          let success = json.success;
          console.log('---->'+ success)
          if (success) {
            setRewardsResponse(json["data"]["reward"])
            //checking for app update
            // let must_update = json.data.must_update;
            // if (must_update == true) {
            //   Events.publish(EVENT_UPDATE_DIALOG, true);
            // } else {
            //   Events.publish(EVENT_UPDATE_DIALOG, false);
            // }
            //checking sync data
            // let is_sync = true; //json.data.is_sync
            // if (is_sync == true) {
            //   getSettingData(headers);
            // }
          } else {
            if (json.code == "1020") {
              Events.publish("LOGOUT");
            }
          }
          setLoading(false);
        })
        .catch(function(error) {
          setLoading(false);
          console.log(error);
        });

    })
  };

  useEffect(() => {
    navigation.setParams({
      headerRight: <RequestHeaderRight navigation={navigation} />,
    });
    getNotifications();
    var refreshEventCallNotif = Events.subscribe("NOTIFICATION_CALL", (msg) => {
      getNotifications();
    });

    checkNotification();

    var refreshEvent = Events.subscribe("NOTIFICATION_CLICKED", (msg) => {
      checkNotification();
    });

    
    getRewardsData(month, year);
    return () => {
      refreshEvent.remove();
      refreshEventCallNotif.remove();
      // Anything in here is fired on component unmount.
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true)
    getRewardsData(month, year);
    // In actual case set refreshing to false when whatever is being refreshed is done!
    setTimeout(() => {
      setRefreshing(false)
    }, 1000);
  };
 
  const onMonthSelect = (value) => {
    setMonth(value);
    getRewardsData(value, year)
  };

  const onYearSelect = (value) => {
    setYear(value)
    getRewardsData(month, value);
  };

  if(loading){
    return (
      <LoadingIndicator />
    )
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
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
              { label: "January", value: 1 },
              { label: "February", value: 2 },
              { label: "March", value: 3 },
              { label: "April", value: 4 },
              { label: "May", value: 5 },
              { label: "June", value: 6 },
              { label: "July", value: 7 },
              { label: "August", value: 8 },
              { label: "September", value: 9 },
              { label: "October", value: 10 },
              { label: "November", value: 11 },
              { label: "December", value: 12 },
            ]}
            value={month}
            onSelect={(val) => onMonthSelect(val)}
          />
          <View style={{ width: deviceWidth * 0.05, height: 1 }} />
          <ShopScreenPicker
            placeHolder={{ label: "Year", value: null }}
            data={[
              {
                label: `${currentYear}`,
                value: currentYear,
              },
              {
                label: `${nextYear}`,
                value: nextYear,
              },
            ]}
            value={year}
            onSelect={(val) => onYearSelect(val)}
          />
        </View>
        <ShopRewardsView
          balance={rewardsResponse["reward_balance"] ?? 0}
          rewardPoints={rewardsResponse["credit_balance"] ?? 0}
          rewardRedeemed={rewardsResponse["debit_balance"] ?? 0}
        />
        <HowToRedeem />
        {rewardsResponse["history"].length > 0 ? (
          <RewardHistory selectedMonth={month} selectedYear={year} rewardHistoryData={rewardsResponse["history"]} />
        ) : null}
        <View style={{ height: 20, width: "100%" }} />
      </ScrollView>
    </SafeAreaView>
  );
};

ShopScreen.navigationOptions = ({ navigation }) => {
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

export default ShopScreen;

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

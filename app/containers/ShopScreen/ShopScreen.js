import React, {useEffect, useState} from "react";
import {
  View,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Linking,
  ToastAndroid,
  Platform,
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
import { darkBlueVariant, goldenYellow, greyVariant5 } from "../util/colors";
import RequestHeaderTitle from "../../atoms/requestHeaderTitle";
import RequestHeaderBg from "../../atoms/requestHeaderBg";
import RequestHeaderLeft from "../../atoms/requestHeaderLeft";
import RequestHeaderRight from "../../atoms/requestHeaderRight";
import ShopRewardsView from "../../components/molecules/shopRewardsView";
import HowToRedeem from "../../components/molecules/howToRedeem";
import RewardHistory from "../../components/molecules/rewardHistory";
import ShopScreenPicker from "../../components/molecules/shopScreenPickers";
import { deviceHeight, deviceWidth } from "../util/dimens";
import { getNotificationCount } from "../util/notificationCount";
import LoadingIndicator from "../../components/molecules/loadingIndicator";
import Axios from "axios";
import moment from "moment";
import { client } from "../../../App";
import Loader from "../../components/custom/Loader";
import ModalDropdown from "react-native-modal-dropdown";
import { Image } from "react-native";
import { MonthNames, getNumericMonth } from "../util/utilFunctions";
import { commonStyles, pickerSelectStylesShopScreen } from "../util/commonStyles";
import DropdownArrow from "../../components/molecules/dropdownArrow";
const ShopScreen = ({ navigation }) => {

  const currentYear = moment(new Date()).year();
  const nextYear = currentYear + 1;
  const currentMonth = moment(new Date()).format('MMMM');

 const [refreshing, setRefreshing] = useState(false);
 const [loading, setLoading] = useState(true);
 const [rewardsResponse, setRewardsResponse] = useState(null);
 const [month, setMonth] = useState(currentMonth);
 const [numericMonth, setNumericMonth] = useState(getNumericMonth(currentMonth));
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
        "x-authorization": value,       
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
          console.log({response})
          let json = response.data;
          let success = json.success;
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

    
    getRewardsData(numericMonth, year);
    return () => {
      refreshEvent.remove();
      refreshEventCallNotif.remove();
      // Anything in here is fired on component unmount.
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true)
    getRewardsData(numericMonth, year);
    // In actual case set refreshing to false when whatever is being refreshed is done!
    setTimeout(() => {
      setRefreshing(false)
    }, 1000);
  };
 
  const onMonthSelect = (value) => {
    setNumericMonth(
      value
    );
    getRewardsData(value, year);
  };

  const onYearSelect = (value) => {
    setYear(value)
    getRewardsData(numericMonth, value);
  };

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
        <Loader visible={loading} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: 16,
          }}
        >
          <View style={{ maxWidth: deviceWidth * 0.3 }}>
            <ModalDropdown
              options={MonthNames}
              defaultValue={`${month}`}
              style={{ minWidth: deviceWidth * 0.3 }}
              textStyle={[
                Platform.OS == "android"
                  ? pickerSelectStylesShopScreen.inputAndroid
                  : pickerSelectStylesShopScreen.inputIOS,
                { width: deviceWidth * 0.27, borderRadius: 10 },
              ]}
              dropdownStyle={[
                commonStyles.dropdownTxt,
                {
                  height: deviceHeight * 0.45,
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingVertical: 7,
                },
              ]}
              dropdownTextStyle={commonStyles.dropdownTxtStyle}
              dropdownTextHighlightStyle={[
                commonStyles.dropdownTxtStyle,
                { color: goldenYellow },
              ]}
              renderRightComponent={() => {
                return <DropdownArrow />;
              }}
              onSelect={
                (value) => {
                  setMonth(MonthNames[value]);
                  onMonthSelect(value + 1);
                }
                //this.setState({ gender: data[value].value })
              }
            />
            <View
              style={{
                width: deviceWidth * 0.3,
                backgroundColor: greyVariant5,
                height: 1,
                marginTop: 2,
              }}
            />
          </View>
          <View style={{ width: deviceWidth * 0.05, height: 1 }} />
          <View style={{ maxWidth: deviceWidth * 0.3 }}>
            <ModalDropdown
              options={[`${currentYear}`, `${nextYear}`]}
              defaultValue={`${currentYear}`}
              style={{ minWidth: deviceWidth * 0.3 }}
              showsVerticalScrollIndicator={false}
              dropdownTextHighlightStyle={[
                commonStyles.dropdownTxtStyle,
                { color: goldenYellow },
              ]}
              textStyle={[
                Platform.OS == "android"
                  ? pickerSelectStylesShopScreen.inputAndroid
                  : pickerSelectStylesShopScreen.inputIOS,
                { width: deviceWidth * 0.27 },
              ]}
              dropdownStyle={[
                commonStyles.dropdownTxt,
                {
                  height: deviceHeight * 0.15,
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingVertical: 7,
                },
              ]}
              dropdownTextStyle={commonStyles.dropdownTxtStyle}
              renderRightComponent={() => {
                return <DropdownArrow />;
              }}
              onSelect={
                (value) => {
                  onYearSelect(value == 0 ? currentYear : nextYear);
                }
                //this.setState({ gender: data[value].value })
              }
            />
            <View
              style={{
                width: deviceWidth * 0.3,
                backgroundColor: greyVariant5,
                height: 1,
                marginTop: 2,
              }}
            />
          </View>
        </View>

        {rewardsResponse != null && (
          <ShopRewardsView
            balance={rewardsResponse["reward_balance"] ?? 0}
            rewardPoints={rewardsResponse["credit_balance"] ?? 0}
            rewardRedeemed={rewardsResponse["debit_balance"] ?? 0}
          />
        )}
        <HowToRedeem />
        {/* {rewardsResponse["history"].length > 0 ? ( */}
        <RewardHistory
          selectedMonth={month}
          loading={loading}
          selectedYear={year}
          rewardHistoryData={
            rewardsResponse != null ? rewardsResponse["history"] : null
          }
        />
        {/* ) : null} */}
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

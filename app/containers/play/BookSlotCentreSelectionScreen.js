import React, { useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  ToastAndroid,
  ScrollView,
  RefreshControl,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import GoBackHeader from "../../components/molecules/goBackHeader";
import RequestHeaderRight from "../../atoms/requestHeaderRight";
import {
  getNotificationCount,
  notificationOpenScreen,
} from "../util/notificationCount";
// import TabView from "./TopTabView";
import Events from "../../router/events";
import RequestHeaderTitle from "../../atoms/requestHeaderTitle";
import RequestHeaderBg from "../../atoms/requestHeaderBg";
import RequestHeaderLeft from "../../atoms/requestHeaderLeft";
import SlotBookedModal from "../../components/molecules/slotBookedModal";
import Axios from "axios";
import { getBaseUrl } from "../BaseComponent";
import moment from "moment";
import BookSlotCentreSelection from "../../components/molecules/bookSlotCentreSelection";
import { getData } from "../../components/auth";
import { client } from "../../../App";
import LoadingIndicator from "../../components/molecules/loadingIndicator";

const BookSlotCentreSelectionScreen = ({ navigation }) => {
  var fetchSlotError = null;
  var slotBookApiError = null;
  const [modalVisible, setModalVisibility] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedMorningTime, setSelectedMorningTime] = useState(null);
  const [selectedEveningTime, setSelectedEveningTime] = useState(null);
  const [selectedSportData, setSelectedSportData] = useState(null);

  const [date, setDate] = useState(`${moment(new Date()).format("DD MM")}`);
  const [sportsList, setSportsList] = useState([]);
  const [slotStartTime, setSlotStartTime] = useState(null);
  const [slotEndTime, setSlotEndTime] = useState(null);
  const [user, setUser] = useState("yourself");
  const [selectedTimePeriodVal, setSelectedTimePeriod] = useState(null);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [slotApiRes, setSlotApiResponse] = useState(null);
  const [slotBookedRes, setSlotBookedRes] = useState(null);

  const getNotifications = () => {
    getNotificationCount((count) => {
      console.log("??? " + count);
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

    
    bookSlotFetchApi();
    //getSportsData();
    return () => {
      refreshEvent.remove();
      refreshEventCallNotif.remove();
      // Anything in here is fired on component unmount.
    };
  }, []);

  const onNextPress = () => {
    setModalVisibility(true);
  };

  const setModalVisibilityCb = (val) => {
    setModalVisibility(val);
  };

  const onPressCenter = (val) => {

  }


  const bookSlotFetchApi = async () => {
    console.log('*******')
    const { date, sportId } = navigation?.state?.params;

    console.log('????')
    setLoading(true);
    getData("header", (value) => {
      if (value == "") return;
      const headers = {
        "Content-Type": "application/json",
        //"x-authorization": value,
        //TODO:remove this static logic
        "x-authorization":
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MjciLCJzY29wZXMiOlsiUExBWUVSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJpYXQiOjE2ODA4NjAxNDUsImV4cCI6NTIyNTY0MDA4NjAxNDV9.gVyDUz8uFURw10TuCKMGBcx0WRwGltXS7nDWBzOgoFTq2uyib-6vUbFCeZrhYeno5pIF5dMLupNrczL_G-IhKg",
      };
      //client.call
      client
        .get("global/play/academy/slots", {
          headers,
          params: {
            sportId: sportId,
            // TODO:
            // date: date,
            date: "2023-04-20",
          },
        })
        .then(function(response) {
          console.log({ response });
          fetchSlotError = response;
          console.log("requestData" + JSON.stringify(response.data));
          let json = response.data;
          let success = json.success;
          console.log("---->" + success);
          if (success) {
            setSlotApiResponse(json.data);
          } else {
            if (json.code == "1020") {
              Events.publish("LOGOUT");
            }
          }
          setLoading(false);
        })
        .catch(function(error) {
          setLoading(false);
          ToastAndroid.show(
            `${fetchSlotError?.response?.response?.data?.error_message ??
              ""}`,
            ToastAndroid.SHORT
          );
          console.log(error);
        });
    });
  };

  const bookSlotPressed = async() => {
    console.log("selectedTime" + slotStartTime);
    console.log('endTime'+ slotEndTime)
    console.log({ selectedTimePeriodVal });
    var numericStartTime = 0;
    var numericEndTime = 0;
    if(slotStartTime != null && typeof slotStartTime != undefined){
      var startTime = slotStartTime.slice(0, -3);
       if(startTime.length > 0){
        var hrs = '';
        var mins = '';
        for(var i = 0; i< startTime.length; i++){
          if(startTime[i] == ':'){
            
          }
        }
       }
    }
     if (slotEndTime != null && typeof slotEndTime != undefined) {
       var endTime = slotEndTime.slice(0, -3);
       numericEndTime = parseFloat(endTime);
     }
     console.log()
    //bookChosenSlotApi()
  }

  const bookChosenSlotApi = async () => {
    const { date, proficiency, guestCount } = navigation?.state?.params;
    const data = {
      //TODO:
      //date: date,
      date: '2023-04-23',
      courtTimingId: selectedEveningTime != null ? selectedEveningTime : selectedMorningTime,
      proficiency: proficiency,
      guestCount: guestCount,
    };


    setLoading(true);
    getData("header", (value) => {
      if (value == "") return;
      const headers = {
        "Content-Type": "application/json",
        //"x-authorization": value,
        //TODO:remove this static logic
        "x-authorization":
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MjciLCJzY29wZXMiOlsiUExBWUVSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJpYXQiOjE2ODA4NjAxNDUsImV4cCI6NTIyNTY0MDA4NjAxNDV9.gVyDUz8uFURw10TuCKMGBcx0WRwGltXS7nDWBzOgoFTq2uyib-6vUbFCeZrhYeno5pIF5dMLupNrczL_G-IhKg",
      };
      //client.call
      client
        .post("court/book-court", { data: data }, { headers: headers })
        .then(function(response) {
          slotBookApiError = { response };
          console.log({response})

          try {
            let json = response?.data;
            let success = json?.success;
            if (success) {
              setSlotBookedRes(json)
              setModalVisibilityCb(true)
              // setRewardsResponse(json["data"]["reward"]);
            } else {
              ToastAndroid.show(
                `${slotBookApiError?.response?.response?.data
                  ?.error_message ?? ""}`,
                ToastAndroid.SHORT
              );
              if (json.code == "1020") {
                Events.publish("LOGOUT");
              }
            }
            setLoading(false);
          } catch (e) {
            setLoading(false);
            ToastAndroid.show(
              `${slotBookApiError?.response?.response?.data
                ?.error_message ?? ""}`,
              ToastAndroid.SHORT
            );
          }
        })
        .catch(function(error) {
          setLoading(false);
          ToastAndroid.show(
            `${slotBookApiError?.response?.response?.data
              ?.error_message ?? ""}`,
            ToastAndroid.SHORT
          );
        });
    });
  };

    const onRefresh = () => {
      setRefreshing(true);
      bookSlotFetchApi();
      // In actual case set refreshing to false when whatever is being refreshed is done!
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    };


  if (loading) {
    return <LoadingIndicator />;
  }
  console.log({ slotApiRes });
  console.log({slotBookedRes})
  

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#051732", "#232031"]}
        style={{ flex: 1, paddingHorizontal: 12 }}
      >
        <ScrollView
          style={{ height: "100%" }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
              title="Pull to refresh"
            />
          }
        >
          <GoBackHeader navigation={navigation} title={"Book Slot"} />
          <View style={{ marginHorizontal: 18 }}>
            {slotApiRes?.academyCourts?.length > 0 ? (
              <BookSlotCentreSelection
                selectedTimePeriod={(val) =>{
                  if(val?.startTime){
                    setSlotStartTime(val?.startTime)
                  }
                  if(val?.endTime){
                    setSlotEndTime(val?.endTime)
                  }
                  setSelectedTimePeriod(val)}}
                morningTime={[]}
                eveningTime={[]}
                selectedMorningTime={selectedMorningTime}
                setSelectedMorningTimeVal={(val) =>
                  setSelectedMorningTime(val)
                }
                selectedEveningTime={selectedEveningTime}
                setSelectedEveningTimeVal={(val) =>
                  setSelectedEveningTime(val)
                }
                onPress={(val) => bookSlotPressed()}
                academiesList={slotApiRes?.academyCourts}
                selectSport={selectedSportData}
              />
            ) : null}
          </View>
          {modalVisible ? (
            // ? (
            <SlotBookedModal
              slotInfo={slotBookedRes?.data}
              modalVisible={modalVisible}
              setModalVisibility={(val) => setModalVisibilityCb(val)}
            />
          ) : // ):
          // null}
          // <AddGuestUserModal
          //   onBtnPress={() => {}}
          //   biggerImg={require("../../images/add_guests_img.png")}
          //   modalVisible={modalVisible}
          //   setModalVisibility={(val) => setModalVisibilityCb(val)}
          // />
          null}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

BookSlotCentreSelectionScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: <RequestHeaderTitle title={"Play"} />,
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

export default BookSlotCentreSelectionScreen;

const styles = StyleSheet.create({});

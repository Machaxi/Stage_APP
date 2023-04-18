import React, { useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ToastAndroid,
  Image,
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
import BookSlotAddUser from "../../components/molecules/bookSlotAddUser";
import SlotRelatedNotes from "../../components/molecules/slotRelatedNotes";
import { greyColorVariant, yellowVariant2 } from "../util/colors";
import BookSlotNextBtn from "../../components/molecules/bookSlotNextBtn";
import UserSelectionForSlot from "../../components/molecules/userSelectionForSlot";
import SlotBookedModal from "../../components/molecules/slotBookedModal";
import AddUserModal from "../../components/molecules/addGuestUserModal";
import AddGuestUserModal from "../../components/molecules/addGuestUserModal";
import Axios from "axios";
import { getBaseUrl } from "../BaseComponent";
import SelectSports from "../../components/custom/SelectSports";
import SelectSportsBookSlot from "../../components/molecules/selectSportsBookSlot";
import SelectDateBookSlot from "../../components/molecules/selectDateBookSlot";
import moment from "moment";
import SelectCenter from "../FirstTimeUser/TrialBook/SelectCenter";
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
  const [selectedSportsId, setSelectedSportsId] = useState(null);
  const [academiesList, setAcademiesList] = useState([]);
  const [user, setUser] = useState("yourself");

  const [refreshing, setRefreshing] = useState(false);
  const [isUpcoming, setIsUpcoming] = useState(true);
  const [loading, setLoading] = useState(true);
  const [slotApiRes, setSlotApiResponse] = useState(null);
  const [bookSlotRes, bookSlotResponse] = useState(null);

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

  const getSportsData = async () => {
    Axios.get(getBaseUrl() + "/global/academy/all")
      .then((response) => {
        console.log("sports api call");
        console.log({ response });
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        let academiesData = userResponce["data"]["data"];
        //setSportsList(academiesData["Sports"] ?? []);
        setSelectedSportData(academiesData["Sports"][0] ?? null);
        //setAcademiesList(academiesData["academies"] ?? []);
      })
      .catch((error) => {
        console.log(error);
      });
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
    getSportsData();
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
            sportId: 1,
            date: '2023-04-14'
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
            `${fetchSlotError?.response?.response?.data
              ?.error_message ?? ""}`,
            ToastAndroid.SHORT
          );
          console.log(error);
        });
    });
  };

  const bookChosenSlotApi = async (id, requestType) => {
    const data = {
      date: "2023-03-30",
      courtTimingId: "9",
      proficiency: "BASIC",
      guestCount: 1,
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

          try {
            let json = response?.data;
            let success = json?.success;
            if (success) {
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

   const morningTime = [
    { time: "5 - 6 AM" },
    { time: "6 - 7 AM" },
    { time: "7 - 8 AM" },
    { time: "9 - 10 AM" },
  ];
  const eveningTime = [
    { time: "5 - 6 PM" },
    { time: "6 - 7 PM" },
    { time: "7 - 8 PM" },
    { time: "9 - 10 PM" },
  ];


  if (loading) {
    return <LoadingIndicator />;
  }
  console.log({ slotApiRes });

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
          <GoBackHeader title={"Book Slot"} />
          <View style={{ marginHorizontal: 18 }}>
            {slotApiRes?.academyCourts?.length > 0 ? (
              <BookSlotCentreSelection
                morningTime={morningTime}
                eveningTime={eveningTime}
                selectedMorningTime={selectedMorningTime}
                setSelectedMorningTimeVal={(val) =>
                  setSelectedMorningTime(val)
                }
                selectedEveningTime={selectedEveningTime}
                setSelectedEveningTimeVal={(val) =>
                  setSelectedEveningTime(val)
                }
                onPress={(val) => bookChosenSlotApi(val)}
                academiesList={slotApiRes?.academyCourts}
                selectSport={selectedSportData}
              />
            ) : null}
          </View>
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

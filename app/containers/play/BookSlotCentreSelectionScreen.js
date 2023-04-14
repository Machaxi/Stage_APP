import React, { useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  ScrollView,
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

const BookSlotCentreSelectionScreen = ({ navigation }) => {
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
        setSportsList(academiesData["Sports"] ?? []);
        setSelectedSportData(academiesData["Sports"][0] ?? null);
        setAcademiesList(academiesData["academies"] ?? []);
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

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#051732", "#232031"]}
        style={{ flex: 1, paddingHorizontal: 12 }}
      >
        <ScrollView style={{ height: "100%" }}>
          <GoBackHeader title={"Book Slot"} />
          <View style={{ marginHorizontal: 18 }}>
            {academiesList.length > 0 ? (
              <BookSlotCentreSelection
                morningTime={morningTime}
                eveningTime={eveningTime}
                selectedMorningTime={selectedMorningTime}
                setSelectedMorningTimeVal={(val)=>setSelectedMorningTime(val)}
                selectedEveningTime={selectedEveningTime}
                setSelectedEveningTimeVal={(val) => setSelectedEveningTime(val)}
                onPress={(val) => onPressCenter(val)}
                academiesList={academiesList}
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

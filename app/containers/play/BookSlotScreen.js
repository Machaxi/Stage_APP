import React, { useEffect, useState } from "react";

import { View, StyleSheet, ToastAndroid, FlatList, Text, Image, ScrollView, RefreshControl } from "react-native";
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
import LoadingIndicator from "../../components/molecules/loadingIndicator";
import { getData } from "../../components/auth";
import { client } from "../../../App";
import CustomButton from "../../components/custom/CustomButton";

const BookSlotScreen = ({ navigation }) => {
 var planAndSportsError = null;
 const [modalVisible, setModalVisibility] = useState(false);
 const [count, setCount] = useState(0);
 const [refreshing, setRefreshing] = useState(false);

 const [date, setDate] = useState(
   `${moment(new Date()).format("yyyy-MM-DD")}`
 );

 const [proficiency, setProficiency] = useState(null);
 const [selectedSportsId, setSelectedSportsId] = useState(null);
 const [user, setUser] = useState("yourself");
 const [showProficiencyMenu, setProficiencyVisibility] = useState(false);
const [loading, setLoading] = useState(true);
const [planAndSportsApiRes, setPlanAndSportsApiRes] = useState(null);

 const getUserPlanAndSportsData = async () => {
   setLoading(true);
   getData("header", (value) => {
     if (value == "") return;
     const headers = {
       "Content-Type": "application/json",
       "x-authorization": value,
       //TODO:remove this static logic
      //  "x-authorization":
      //    "Bearer  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MjciLCJzY29wZXMiOlsiUExBWUVSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJpYXQiOjE2ODA4NjAxNDUsImV4cCI6NTIyNTY0MDA4NjAxNDV9.gVyDUz8uFURw10TuCKMGBcx0WRwGltXS7nDWBzOgoFTq2uyib-6vUbFCeZrhYeno5pIF5dMLupNrczL_G-IhKg"
     };
     //client.call
     client
       .get("user/sport-rating", {
         headers,
         params: {},
       })
       .then(function(response) {
         console.log({ response });
         planAndSportsError = response;
         console.log("requestData" + JSON.stringify(response.data));
         let json = response.data;
         let success = json.success;
         console.log("---->" + success);
         if (success) {
           if (json?.data?.plan?.preferredSportId != null){
             setSportsId(json?.data?.plan?.preferredSportId);
           }
           else {
            setProficiencyVisibility(true);
           }
           setPlanAndSportsApiRes(json.data);
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
           `${planAndSportsError?.response?.response?.data
             ?.error_message ?? ""}`,
           ToastAndroid.SHORT
         );
         console.log(error);
       });
   });
 };
 

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


  const onRefresh = () => {
    setRefreshing(true);
    getUserPlanAndSportsData();
    // In actual case set refreshing to false when whatever is being refreshed is done!
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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

    //getSlotDataApi();
    getUserPlanAndSportsData();
    return () => {
      refreshEvent.remove();
      refreshEventCallNotif.remove();
      // Anything in here is fired on component unmount.
    };
  }, []);

  const onNextPress = () => {
    //setModalVisibility(true)
    navigation.navigate("BookSlotCentreSelectionScreen", {
      date: date,
      proficiency: proficiency,
      guestCount: count,
      sportId: selectedSportsId,
      playHoursRemaining: planAndSportsApiRes?.plan?.hoursRemaining ?? 0,
      preferredAcademyId: planAndSportsApiRes?.plan?.preferredAcademyId,
      preferredSportId: planAndSportsApiRes?.plan?.preferredSportId,
      userType: user
    });
  }

   const setModalVisibilityCb = (val) => {
     setModalVisibility(val);
   };

   const setSportsId = (id) => {
      planAndSportsApiRes?.sports.map((val) => {
        if (val.id == id) {
          setProficiencyVisibility(
            val.proficiency == null ? true : false
          );
          setSelectedSportsId(id)
          setProficiency(val.proficiency);
        }
      });
   }


  if (loading) {
    return <LoadingIndicator />;
  }

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
          <View style={{ paddingHorizontal: 18, marginBottom: 20 }}>
            {planAndSportsApiRes?.sports?.length > 0 ? (
              <SelectSportsBookSlot
                selectedSportsId={selectedSportsId}
                sportsList={planAndSportsApiRes?.sports}
                setSelectedSportsIdVal={(id) => setSportsId(id)}
              />
            ) : null}
            {showProficiencyMenu == true && selectedSportsId != null ? (
              <UserSelectionForSlot
                user={proficiency}
                data={[
                  { label: "Basic", value: "BASIC" },
                  { label: "Intermediate", value: "INTERMEDIATE" },
                  { label: "Advanced", value: "ADVANCED" },
                ]}
                label={"Select proficiency"}
                setUserVal={(val) => setProficiency(val)}
              />
            ) : null}
            <SelectDateBookSlot
              date={date}
              setDateVal={(val) => setDate(val)}
            />
            <UserSelectionForSlot
              user={user}
              data={[
                { label: "Yourself", value: "yourself" },
                { label: "Entire Court", value: "entire_court" },
                { label: "Coming with Guest", value: "with_guest" },
              ]}
              label={"Select user"}
              setUserVal={(val) => setUser(val)}
            />
            {user == "with_guest" && (
              <BookSlotAddUser
                count={count}
                setCount={(val) => setCount(val)}
              />
            )}
            <SlotRelatedNotes />
            {modalVisible ? (
              // ? (
              // <SlotBookedModal modalVisible={modalVisible} setModalVisibility={(val)=>setModalVisibilityCb(val)} />
              // ):
              // null}
              <AddGuestUserModal
                onBtnPress={() => {}}
                biggerImg={require("../../images/add_guests_img.png")}
                modalVisible={modalVisible}
                setModalVisibility={(val) => setModalVisibilityCb(val)}
              />
            ) : null}
            <View style={{height: 20, width: '100%'}} />
            <CustomButton
              name="Next "
              image={require("../../images/playing/arrow_go.png")}
              available={selectedSportsId != null && proficiency != null}
              onPress={() => onNextPress()}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

BookSlotScreen.navigationOptions = ({ navigation }) => {
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

export default BookSlotScreen;

const styles = StyleSheet.create({
  
});

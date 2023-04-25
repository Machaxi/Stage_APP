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
import AddGuestUserModal from "../../components/molecules/addGuestUserModal";
import BeginnerWarningModal from "../../components/molecules/beginnerWarningModal";
import { getNumericProficiency } from "../util/utilFunctions";

const BookSlotCentreSelectionScreen = ({ navigation }) => {
  var fetchSlotError = null;
  var slotBookApiError = null;
  const [renewPlanModalVisible, setModalVisibilityRenewPlan] = useState(false);
  const [showSlotBookedModal, setSlotBookedModalVisibility] = useState(false);
  const [showBeginnerWarningModal, setBeginnerWarningModalVisibility] = useState(false);
  const [showAdvancedWarningModal, setAdvancedWarningModalVisibility] = useState(false);
  const [showSlotUnavailableModal, setSlotUnavailableModalVisibility] = useState(false);
  const [selectedAcademyData, setSelectedAcademyData] = useState(null);
  const [count, setCount] = useState(0);
  const [preferredAcademyId, setPreferredAcademyId] = useState(null);
  const [preferredSportId, setPreferredSportId] = useState(null);
  const [selectedMorningTime, setSelectedMorningTime] = useState(null);
  const [selectedEveningTime, setSelectedEveningTime] = useState(null);
  const [selectedSportData, setSelectedSportData] = useState(null);

  const [date, setDate] = useState(`${moment(new Date()).format("DD MM")}`);
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
     const {
      
      preferredSportId,
      preferredAcademyId,
    } = navigation?.state?.params;

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

    setPreferredAcademyId(preferredAcademyId)
    setPreferredSportId(preferredSportId)
    bookSlotFetchApi();
    //getSportsData();
    return () => {
      refreshEvent.remove();
      refreshEventCallNotif.remove();
      // Anything in here is fired on component unmount.
    };
  }, []);

  const bookSlotFetchApi = async () => {
    const {
      date,
      sportId
    } = navigation?.state?.params;

    setLoading(true);
    getData("header", (value) => {
      if (value == "") return;
      const headers = {
        "Content-Type": "application/json",
        //"x-authorization": value,
        //TODO:remove this static logic
        "x-authorization":
          "Bearer  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MjciLCJzY29wZXMiOlsiUExBWUVSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJpYXQiOjE2ODA4NjAxNDUsImV4cCI6NTIyNTY0MDA4NjAxNDV9.gVyDUz8uFURw10TuCKMGBcx0WRwGltXS7nDWBzOgoFTq2uyib-6vUbFCeZrhYeno5pIF5dMLupNrczL_G-IhKg"
      };
      //client.call
      client
        .get("global/play/academy/slots", {
          headers,
          params: {
            sportId: sportId,
            // TODO:
            date: date,
            //date: "2023-04-20",
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
    const { playHoursRemaining, guestCount } = navigation?.state?.params;
    var guestCountVal = guestCount == null || typeof guestCount == undefined ? 0 : guestCount;
    var totalPlayersCount = 1 + guestCount;
    var finalDifference = 0;
    if (slotStartTime != null && slotEndTime != null) {
      var randomStartDateTime = "1970-01-01T" + slotStartTime;
      var randomEndDateTime = "1970-01-01T" + slotEndTime;
      const time1 = new Date(randomStartDateTime);
      const time2 = new Date(randomEndDateTime);
      const diffInMillisec = time1.getTime() - time2.getTime();

      // convert milliseconds to hours, minutes
      const diffInHours = diffInMillisec / (1000 * 60 * 60);
      const diffInMinutes = (diffInHours - Math.floor(diffInHours)) * 60;

      finalDifference =
        Math.floor(diffInHours) + Math.floor(diffInMinutes / 60);
    }
    
    if(playHoursRemaining > finalDifference){
      //after verifying that player has sufficient hours to play proceed to check other contrainsts below
      //bookChosenSlotApi()

      if (selectedAcademyData != null) {
        if (
          selectedAcademyData?.bookings != null &&
          selectedAcademyData?.bookings?.length > 0
        ) {
          //check if any other court is available for booking
          var courtMatchFound = false;
          selectedAcademyData?.courts?.map((val)=> {
            var playerTimePeriod = startTime + endTime;
            var courtTimePeriod = val.startTime + val.endTime;
            if(playerTimePeriod == courtTimePeriod){
              if(selectedTimePeriodVal != val.courtTimingId){
                courtMatchFound = true;
                bookChosenSlotApi(
                  selectedEveningTime != null
                    ? selectedEveningTime
                    : selectedMorningTime
                );
              }
            }

          })

          //court could not be found so now we need to check availability in already booked courts
          if(!courtMatchFound){
            var lowerProfFound = false;
            var lowerProfData = null;
            var playerSpaceAvailable = false;
            selectedAcademyData?.bookings?.map((val)=>{
              //TODO: api se max 0 and total 1 aa raha hai, backend issue for present data
              var availablePlayerCount = val.maxPlayersAllowed - val.totalPlayers;
              if(availablePlayerCount >= totalPlayersCount){
                playerSpaceAvailable = true;
                //there are no other courts available for same time slot in the selected academy
                selectedAcademyData?.bookings?.map((VAL) => {
                  var bookingTimePeriod = VAL.startTime + VAL.endTime;
                  var playerTimePeriod = startTime + endTime;
                  if (bookingTimePeriod == playerTimePeriod) {
                    var bookedPlayerNumericProf = getNumericProficiency(
                      VAL.proficiency[0]
                    );
                    var numericCurrentUserProf = getNumericProficiency(
                      proficiency
                    );
                    if (bookedPlayerNumericProf <= numericCurrentUserProf) {
                      lowerProfData = VAL;
                      lowerProfFound = true;
                    }
                   
                  }
                });
              }
              else {
                //TODO: need to verify whether to show toast only or hit bookslotapi
              }
            })
            
            if(lowerProfFound){
              if (lowerProfData != null) {
                //getValue of courtTimingId from bookings and pass here
                setAdvancedWarningModalVisibility(true)
                if (selectedEveningTime != null) {
                  //TODO:
                  setSelectedEveningTime(lowerProfData?.courtTimingId);
                } else {
                  //TODO:
                  setSelectedMorningTime(lowerProfData?.courtTimingId);
                }
              }
            }
            else {
              if(playerSpaceAvailable){
                setBeginnerWarningModalVisibility(true)
              }
              else {
                //TODO: need to verify whether to show toast only or hit bookslotapi
              }
            }
          }

          //
        } else {
          //here we've not got any bookings so can proceed for book slot
          
          bookChosenSlotApi(selectedEveningTime != null
                    ? selectedEveningTime
                    : selectedMorningTime);
        }
      }
    }
    else {
      setModalVisibilityRenewPlan(true)
    }
    //bookChosenSlotApi()
  }

  const bookSlotCb = () => {
    bookChosenSlotApi(
      selectedEveningTime != null
        ? selectedEveningTime
        : selectedMorningTime
    );
  }

  const bookChosenSlotApi = async (courtTimingID) => {
    const { date, proficiency, guestCount } = navigation?.state?.params;
    const data = {
      //TODO:
      date: date,
      //date: '2023-04-23',
      courtTimingId: courtTimingID,
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
              setSlotBookedModalVisibility(true)
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
            const {proficiency} = navigation?.state?.params;
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

  const onAcademySelection = (value) => {
    console.log('+++++++')
    console.log({value})
    setSelectedAcademyData(value)
  }

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
                onAcademySelection={(value)=>{
                  onAcademySelection(value)
                }}
                selectedTimePeriod={(val) => {
                  if (val?.startTime) {
                    setSlotStartTime(val?.startTime);
                  }
                  if (val?.endTime) {
                    setSlotEndTime(val?.endTime);
                  }
                  setSelectedTimePeriod(val);
                }}
                morningTime={[]}
                eveningTime={[]}
                preferredAcademyId={preferredAcademyId}
                preferredSportId={preferredSportId}
                selectedMorningTime={selectedMorningTime}
                setSelectedMorningTimeVal={(val) =>
                  setSelectedMorningTime(val)
                }
                selectedEveningTime={selectedEveningTime}
                setSelectedEveningTimeVal={(val) =>
                  setSelectedEveningTime(val)
                }
                onPress={(val) => {
                  //TODO: remove it
                  //setAdvancedWarningModalVisibility(true);
                  bookSlotPressed();
                }}
                academiesList={slotApiRes?.academyCourts}
                selectSport={selectedSportData}
              />
            ) : null}
          </View>
          {showSlotBookedModal ? (
            // ? (
            <SlotBookedModal
              slotInfo={slotBookedRes?.data}
              modalVisible={showSlotBookedModal}
              setModalVisibility={(val) => setSlotBookedModalVisibility(val)}
            />
          ) : null}
          {renewPlanModalVisible ? (
            <AddGuestUserModal
              onBtnPress={() => {
                //TODO: add renew plan logic
              }}
              onExplorePlansPressed={() => {}}
              biggerImg={require("../../images/add_guests_img.png")}
              modalVisible={renewPlanModalVisible}
              setModalVisibility={(val) => setModalVisibilityRenewPlan(val)}
            />
          ) : null}
          {showBeginnerWarningModal ? (
            <BeginnerWarningModal
              onBtnPress={() => {
                bookSlotCb();
              }}
              forBeginner={true}
              onRequestBookSlot={() => {}}
              biggerImg={require("../../images/add_guests_img.png")}
              modalVisible={showBeginnerWarningModal}
              setModalVisibility={(val) =>
                setBeginnerWarningModalVisibility(val)
              }
            />
          ) : null}
          {showAdvancedWarningModal ? (
            <BeginnerWarningModal
              onBtnPress={() => {
                bookSlotCb();
              }}
              forBeginner={false}
              onRequestBookSlot={() => {}}
              biggerImg={require("../../images/add_guests_img.png")}
              modalVisible={showAdvancedWarningModal}
              setModalVisibility={(val) =>
                setAdvancedWarningModalVisibility(val)
              }
            />
          ) : null}
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

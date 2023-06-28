import React, { useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  ToastAndroid,
  ScrollView,
  RefreshControl,
  ActionSheetIOS,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import GoBackHeader from "../../components/molecules/goBackHeader";
import RequestHeaderRight from "../../atoms/requestHeaderRight";
import { StackActions, NavigationActions } from "react-navigation";

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
import CustomButton from "../../components/custom/CustomButton";
import { deviceHeight, deviceWidth } from "../util/dimens";
import { commonStyles } from "../util/commonStyles";
import { Text } from "react-native";

const BookSlotCentreSelectionScreen = ({ navigation }) => {
  var fetchSlotError = null;
  var slotBookApiError = null;
  const [renewPlanModalVisible, setModalVisibilityRenewPlan] = useState(false);
  const [showSlotBookedModal, setSlotBookedModalVisibility] = useState(false);
  const [
    showBeginnerWarningModal,
    setBeginnerWarningModalVisibility,
  ] = useState(false);
  const [
    showAdvancedWarningModal,
    setAdvancedWarningModalVisibility,
  ] = useState(false);
  const [
    showSlotUnavailableModal,
    setSlotUnavailableModalVisibility,
  ] = useState(false);
  const [requestAllowed, setRequestAllowed] = useState(true);
  const [selectedAcademyData, setSelectedAcademyData] = useState(null);
  const [count, setCount] = useState(0);
  const [slotRequested, setSlotRequested] = useState(false);
  const [preferredAcademyId, setPreferredAcademyId] = useState(null);
  const [preferredDate, setPreferredDate] = useState(null);
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
      date,
      sportId,
      preferredAcademyId,
      requestAllowed,
    } = navigation?.state?.params;
    setRequestAllowed(requestAllowed);
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

    setPreferredAcademyId(preferredAcademyId);
    setPreferredDate(date);
    setPreferredSportId(sportId);
    bookSlotFetchApi();
    //getSportsData();
    return () => {
      refreshEvent.remove();
      refreshEventCallNotif.remove();
      // Anything in here is fired on component unmount.
    };
  }, []);

  const bookSlotFetchApi = async () => {
    const { date, sportId, preferredAcademyId } = navigation?.state?.params;

    setLoading(true);
    getData("header", (value) => {
      if (value == "") return;
      const headers = {
        "Content-Type": "application/json",
        "x-authorization": value,
        //TODO:remove this static logic
        // "x-authorization":
        //   "Bearer  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MjciLCJzY29wZXMiOlsiUExBWUVSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJpYXQiOjE2ODA4NjAxNDUsImV4cCI6NTIyNTY0MDA4NjAxNDV9.gVyDUz8uFURw10TuCKMGBcx0WRwGltXS7nDWBzOgoFTq2uyib-6vUbFCeZrhYeno5pIF5dMLupNrczL_G-IhKg"
      };
      //client.call
      client
        .get("global/play/academy/slots", {
          headers,
          params: {
            sportId: sportId,
            date: date,
          },
        })
        .then(function(response) {
          console.log({ response });
          fetchSlotError = response;
          console.log("requestData working" + JSON.stringify(response.data));
          let json = response.data;
          let success = json.success;
          if (success) {
            if (json.data?.academyCourts?.length > 0) {
              json.data?.academyCourts?.map((val) => {
                if (val.academy?.id == preferredAcademyId) {
                  onAcademySelection(val);
                }
              });
            }
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
            `${fetchSlotError?.response?.response?.data?.error_message ?? ""}`,
            ToastAndroid.SHORT
          );
          console.log(error);
        });
    });
  };

  const bookSlotPressed = async () => {
    const {
      playHoursRemaining,
      guestCount,
      proficiency,
    } = navigation?.state?.params;
    var guestCountVal =
      guestCount == null || typeof guestCount == undefined ? 0 : guestCount;
    var totalPlayersCount = 1 + guestCountVal;
    var finalDifference = 0;
    console.log("startTime" + slotStartTime);
    console.log("endTime" + slotEndTime);
    if (slotStartTime != null && slotEndTime != null) {
      var randomStartDateTime = "1970-01-01T" + slotStartTime;
      var randomEndDateTime = "1970-01-01T" + slotEndTime;
      const time1 = new Date(randomStartDateTime);
      const time2 = new Date(randomEndDateTime);
      const diffInMillisec = time2.getTime() - time1.getTime();

      // convert milliseconds to hours, minutes
      const diffInHours = diffInMillisec / (1000 * 60 * 60);
      console.log("hrs diff" + diffInHours);

      finalDifference = diffInHours;
      // Math.floor(diffInHours);
    }
    console.log("playHoursRemaining" + playHoursRemaining);
    console.log("finalDifference" + finalDifference);
    if (playHoursRemaining > finalDifference) {
      //after verifying that player has sufficient hours to play proceed to check other contrainsts below
      //bookChosenSlotApi()

      if (selectedAcademyData != null) {
        if (
          selectedAcademyData?.bookings != null &&
          selectedAcademyData?.bookings?.length > 0
        ) {
          console.log({ selectedAcademyData });
          console.log("BOOKINGS PRESENT");
          //check if any other court is available for booking
          var courtMatchFound = false;
          selectedAcademyData?.courts?.map((val) => {
            var playerTimePeriod = slotStartTime + slotEndTime;
            var courtTimePeriod = val.startTime + val.endTime;

            if (playerTimePeriod == courtTimePeriod) {
              console.log("playerTimePeriod" + playerTimePeriod);
              console.log("courtTimePeriod" + courtTimePeriod);

              console.log("val.courtTimingId" + val.courtTimingId);
              var selectedCourtTimingId =
                selectedEveningTime != null
                  ? selectedEveningTime
                  : selectedMorningTime;
              console.log("selectedTimePeriodVal" + selectedCourtTimingId);
              const foundItem = selectedAcademyData?.courts?.find(
                (item) => item.courtTimingId === selectedCourtTimingId
              );
              var doprocess = true;
              if (foundItem) {
                const displayTime = foundItem.displayTime;
                const startTime = foundItem.startTime;
                const endTime = foundItem.endTime;
                const filteredArray = selectedAcademyData?.courts?.filter(
                  (item) => item.displayTime === displayTime
                );
                if (filteredArray && filteredArray.length > 1) {
                  const filteredArr = selectedAcademyData?.bookings.filter(
                    (item) =>
                      item.startTime === startTime && item.endTime === endTime
                  );
                  if (
                    filteredArr &&
                    filteredArr.length == filteredArray.length
                  ) {
                    doprocess = false;
                  }
                }
              }
              console.log(selectedCourtTimingId);
              console.log(val.courtTimingId);
              console.log("okkka");
              if (doprocess && selectedCourtTimingId != val.courtTimingId) {
                courtMatchFound = true;
                console.log("OTHER COURTS AVAILABLE, CALL API");
                bookChosenSlotApi(
                  selectedEveningTime != null
                    ? selectedEveningTime
                    : selectedMorningTime,
                  false
                );
              }
            }
          });

          //court could not be found so now we need to check availability in already booked courts
          if (!courtMatchFound) {
            console.log("CHECK ALREADY BOOKED COURTS");
            var lowerProfFound = false;
            var equalProfFound = false;
            var lowerProfData = null;
            var playerSpaceAvailable = false;
            var sameTimeSlotFoundInBookings = false;
            console.log("olllas");
            console.log(selectedAcademyData?.bookings);
            selectedAcademyData?.bookings?.map((val) => {
              //TODO: api se max 0 and total 1 aa raha hai, backend issue for present data
              console.log("olllag");
              var bookingTimePeriod = val.startTime + val.endTime;
              console.log("olllahg");
              var playerTimePeriod = slotStartTime + slotEndTime;
              console.log("olllahgss");
              console.log(bookingTimePeriod);
              console.log(playerTimePeriod);
              if (bookingTimePeriod == playerTimePeriod) {
                var availablePlayerCount =
                  val.maxPlayersAllowed - val.totalPlayers;
                if (availablePlayerCount >= totalPlayersCount) {
                  sameTimeSlotFoundInBookings = true;
                  console.log("PLAYER SPACE AVAILABLE");
                  playerSpaceAvailable = true;
                  console.log("BOOKED_PLAYER_PROF" + val.proficiency[0]);
                  console.log("CURRENT_PLAYER_PROF" + proficiency);
                  //there are no other courts available for same time slot in the selected academy
                  // selectedAcademyData?.bookings?.map((VAL) => {
                  // var bookingTimePeriod = VAL.startTime + VAL.endTime;
                  // var playerTimePeriod = slotStartTime + slotEndTime;
                  // if (bookingTimePeriod == playerTimePeriod) {
                  var bookedPlayerNumericProf = getNumericProficiency(
                    val.proficiency[0]
                  );
                  var numericCurrentUserProf = getNumericProficiency(
                    proficiency
                  );
                  console.log("BOOKED_PLAYER_PROF" + val.proficiency[0]);
                  console.log("CURRENT_PLAYER_PROF" + proficiency);
                  console.log(val.proficiency);
                  console.log(bookedPlayerNumericProf);
                  console.log(numericCurrentUserProf);
                  if (bookedPlayerNumericProf < numericCurrentUserProf) {
                    lowerProfData = val;
                    lowerProfFound = true;
                  }
                  if (bookedPlayerNumericProf == numericCurrentUserProf) {
                    if (!lowerProfFound) equalProfFound = true;
                  }
                  console.log(lowerProfFound);
                  console.log(equalProfFound);
                  // }
                  // });
                } else {
                  console.log("COUNT NOT AVAILABLE, NEED TO RENEW");
                  ToastAndroid.show(
                    `Selected court is fully occupied.`,
                    ToastAndroid.SHORT
                  );
                  {
                    Platform.OS === "ios" &&
                      this.showToast(`Selected court is fully occupied.`);
                  }
                  //TODO: need to verify whether to show toast only or hit bookslotapi
                }
              }
            });
            if (sameTimeSlotFoundInBookings) {
              if (lowerProfFound && requestAllowed) {
                console.log(
                  "lowerProfFound setAdvancedWarningModalVisibility called" +
                    lowerProfFound
                );
                if (lowerProfData != null) {
                  setAdvancedWarningModalVisibility(true);
                }
              } else if (equalProfFound || !requestAllowed) {
                console.log("EQUAL PROF FOUND, calling API");
                bookChosenSlotApi(
                  selectedEveningTime != null
                    ? selectedEveningTime
                    : selectedMorningTime,
                  false
                );
              } else {
                console.log(
                  "lowerProfFound not found setBeginnerWarningModalVisibility called0" +
                    lowerProfFound
                );

                //if (playerSpaceAvailable) {
                console.log(
                  "playerSpaceAvailable lowerProfFound not found setBeginnerWarningModalVisibility called1" +
                    lowerProfFound
                );
                setBeginnerWarningModalVisibility(true);
                // } else {
                //   console.log(
                //     "space unavailable and lower not found"
                //   );
                //TODO: need to verify whether to show toast only or hit bookslotapi
                //}
              }
            } else {
              console.log("timeslot not matched in bookings array");
              //same timeslot not found in bookings so we can call api to book the slot
              bookChosenSlotApi(
                selectedEveningTime != null
                  ? selectedEveningTime
                  : selectedMorningTime,
                false
              );
            }
          }

          //
        } else {
          console.log("bookings data null || []");
          //here we've not got any bookings so can proceed for book slot
          bookChosenSlotApi(
            selectedEveningTime != null
              ? selectedEveningTime
              : selectedMorningTime,
            false
          );
        }
      } else {
        console.log("academydata null" + selectedAcademyData);
      }
    } else {
      console.log("setModalVisibilityRenewPlan need to renew");
      setModalVisibilityRenewPlan(true);
    }
    //bookChosenSlotApi()
  };

  const bookSlotCb = (isRequestType) => {
    bookChosenSlotApi(
      selectedEveningTime != null ? selectedEveningTime : selectedMorningTime,
      isRequestType
    );
  };

  const showToast = (message) => {
    const options = ["Cancel"];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: message,
        options: options,
        cancelButtonIndex: options.length - 1,
      },
      (buttonIndex) => {}
    );
  };

  const bookChosenSlotApi = async (courtTimingID, isBookingRequestType) => {
    const {
      date,
      proficiency,
      guestCount,
      entirecourt,
    } = navigation?.state?.params;
    const data = {
      date: date,
      courtTimingId: courtTimingID,
      proficiency: proficiency,
      guestCount: guestCount,
      bookEntireCourt: entirecourt,
    };
    console.log(data);
    setLoading(true);
    getData("header", (value) => {
      if (value == "") return;
      const headers = {
        "Content-Type": "application/json",
        "x-authorization": value,
        //TODO:remove this static logic
        // "x-authorization":
        //   "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MjciLCJzY29wZXMiOlsiUExBWUVSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJpYXQiOjE2ODA4NjAxNDUsImV4cCI6NTIyNTY0MDA4NjAxNDV9.gVyDUz8uFURw10TuCKMGBcx0WRwGltXS7nDWBzOgoFTq2uyib-6vUbFCeZrhYeno5pIF5dMLupNrczL_G-IhKg",
      };
      //client.call
      client
        .post(
          isBookingRequestType ? "court/booking-request" : "court/book-court",
          { data: data },
          { headers: headers }
        )
        .then(function(response) {
          slotBookApiError = { response };
          console.log({ response });

          try {
            let json = response?.data;
            let success = json?.success;
            if (success) {
              setSlotBookedRes(json);
              if (isBookingRequestType) {
                setSlotRequested(true);
              }
              setSlotBookedModalVisibility(true);
              bookSlotFetchApi();
              // setRewardsResponse(json["data"]["reward"]);
            } else {
              ToastAndroid.show(
                `${slotBookApiError?.response?.response?.data?.error_message ??
                  ""}`,
                ToastAndroid.SHORT
              );
              if (json.code == "1020") {
                Events.publish("LOGOUT");
              }
            }
            setLoading(false);
          } catch (e) {
            const { proficiency } = navigation?.state?.params;
            setLoading(false);
            ToastAndroid.show(
              `${slotBookApiError?.response?.response?.data?.error_message ??
                ""}`,
              ToastAndroid.SHORT
            );
            {
              Platform.OS === "ios" &&
                showToast(
                  slotBookApiError?.response?.response?.data?.error_message ??
                    ""
                );
            }
          }
        })
        .catch(function(error) {
          setLoading(false);
          ToastAndroid.show(
            `${slotBookApiError?.response?.response?.data?.error_message ??
              ""}`,
            ToastAndroid.SHORT
          );
        });
    });
  };

  const onAcademySelection = (value) => {
    console.log({ value });
    setSelectedAcademyData(value);
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
  console.log({ slotBookedRes });
  const { playHoursRemaining } = navigation?.state?.params;
  const { guestCount, entirecourt } = navigation?.state?.params;

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={["#051732", "#232031"]} style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 12 }}>
          <ScrollView
            keyboardShouldPersistTaps="always"
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
                  onAcademySelection={(value) => {
                    onAcademySelection(value);
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
                  guestCount={guestCount}
                  entirecourt={entirecourt}
                  preferredAcademyId={preferredAcademyId}
                  preferredDate={preferredDate}
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
                  selectSport={preferredSportId}
                />
              ) : (
                !loading && (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      marginTop: deviceHeight * 0.4,
                    }}
                  >
                    <Text style={commonStyles.noData}>
                      {"Centres data not found."}
                    </Text>
                  </View>
                )
              )}
            </View>
            {showSlotBookedModal ? (
              // ? (
              <SlotBookedModal
                slotRequested={slotRequested}
                slotInfo={slotBookedRes?.data}
                entirecourt={navigation?.state?.params?.entirecourt}
                goHomePressed={() => {
                  // const resetAction = StackActions.reset({
                  //   index: 0,
                  //   actions: [
                  //     NavigationActions.navigate({
                  //       routeName: "Play",
                  //     }),
                  //   ],
                  // });
                  // navigation.dispatch(resetAction);
                  const popAction = StackActions.popToTop();
                  navigation.dispatch(popAction);
                }}
                modalVisible={showSlotBookedModal}
                setModalVisibility={(val) => {
                  if (slotRequested) {
                    setSlotRequested(false);
                  }
                  setSlotBookedModalVisibility(val);
                }}
              />
            ) : null}
            {renewPlanModalVisible ? (
              <AddGuestUserModal
                onBtnPress={() => {
                  setModalVisibilityRenewPlan(false);
                  navigation.navigate("RenewPlan");
                  //TODO: add renew plan logic
                }}
                remainingHours={playHoursRemaining}
                onExplorePlansPressed={() => {
                  const selectPlan = 100;
                  setModalVisibilityRenewPlan(false);
                  navigation.navigate("PlayingPlan", {
                    selectPlan,
                  });
                }}
                biggerImg={require("../../images/add_guests_img.png")}
                modalVisible={renewPlanModalVisible}
                setModalVisibility={(val) => setModalVisibilityRenewPlan(val)}
              />
            ) : null}
            {showBeginnerWarningModal ? (
              <BeginnerWarningModal
                onBtnPress={() => {
                  //bookSlotCb();
                }}
                forBeginner={true}
                onRequestBookSlot={() => {
                  setBeginnerWarningModalVisibility(false);
                  bookChosenSlotApi(
                    selectedEveningTime != null
                      ? selectedEveningTime
                      : selectedMorningTime,
                    true
                  );
                }}
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
                  setAdvancedWarningModalVisibility(false);
                  bookChosenSlotApi(
                    selectedEveningTime != null
                      ? selectedEveningTime
                      : selectedMorningTime,
                    false
                  );
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
            <View style={{ height: 100, width: "100%" }} />
          </ScrollView>
        </View>
        <View style={styles.bottomContainer}>
          <CustomButton
            name={
              selectedMorningTime != null || selectedEveningTime != null
                ? "Book Slot "
                : "Book Slot"
            }
            hideImage={true}
            image={require("../../images/playing/arrow_go.png")}
            available={
              selectedMorningTime != null || selectedEveningTime != null
            }
            onPress={() => {
              bookSlotPressed();
            }}
          />
        </View>
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

const styles = StyleSheet.create({
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: deviceWidth,
    height: 85,
    width: "100%",
    padding: 12,
    backgroundColor: "rgba(32, 29, 45, 1)",
  },
});

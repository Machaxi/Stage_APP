import React, { useEffect, useState } from "react";
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
  Alert,
  ToastAndroid,
  ActionSheetIOS,
} from "react-native";
import { PeerRatingCard } from "./PeerRatingCard";
import { SelfRatingCard } from "./SelfRatingCard";
import { SkyFilledButton } from "../../components/Home/SkyFilledButton";
import LinearGradient from "react-native-linear-gradient";
import { GameNameBox } from "./GameNameBox";
import { PrefSport } from "./PrefSport";
import { ProfileSction } from "./ProfileSection";
import { MembershipDetails } from "./MembershipDetails";
import { NextSessionList } from "./NextSectionList";
// import TabView from "./TopTabView";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { deviceWidth } from "../util/dimens";
import { Nunito_Regular } from "../util/fonts";
import {
  blueVariant,
  greyVariant1,
  greyVariant11,
  lightYellowVariant,
  white,
} from "../util/colors";
import RatingTabarHeader from "../../components/molecules/ratingTabbarHeader";
import { RatePeersTabView } from "../../components/molecules/ratePeersTabView";
import CancelSessionModal from "../../components/molecules/play_screen/cancelSessionModal";
import CustomButton from "../../components/custom/CustomButton";
import { getData } from "../../components/auth";
import { client } from "../../../App";
import Events from "../../router/events";
import RequestHeaderRight from "../../atoms/requestHeaderRight";
import {
  getNotificationCount,
  notificationOpenScreen,
} from "../util/notificationCount";
import RequestHeaderTitle from "../../atoms/requestHeaderTitle";
import RequestHeaderBg from "../../atoms/requestHeaderBg";
import RequestHeaderLeft from "../../atoms/requestHeaderLeft";
import LoadingIndicator from "../../components/molecules/loadingIndicator";
import {
  getProficiencyColor,
  getProficiencyGradients,
  getProficiencyName,
  proficiencyStaticData,
} from "../util/utilFunctions";
import moment from "moment";
import PlayerScreen from "../FirstTimeUser/PlayerScreen";
import Loader from "../../components/custom/Loader";
import { EVENT_EDIT_PROFILE } from "../BaseComponent";

export default (PlayScreen = ({ navigation }) => {
  const [playDataVisibility, setPlayDataVisibility] = useState(true);
  const [selfTabEnabled, setSelfTab] = useState(true);
  const [packageRemainingDays, setPackageRemainingDays] = useState(0);
  const [expiringToday, setExpiringToday] = useState(false);

  const [sportsList, setSportsList] = useState([]);
  const [peerSportsList, setPeerSportsList] = useState([]);
  const [nextSession, setNextSessionData] = useState([]);
  const [totalAvailableHours, setTotalAvailableHours] = useState(0);
  const [remainingHrsApiRes, setRemainingHrsApiRes] = useState(0);
  const [creditPlusRemaining, setCreditedPlusRemaining] = useState(0);
  const [cancelBookingId, setCancelBookingId] = useState(null);
  const [cancelPopupDisplayTime, setCancelPopupDisplayTime] = useState("");
  const [cancelPopupSportsName, setCancelPopupSportsName] = useState("");
  const [editSelfRatingActive, setSelfRatingActiveness] = useState(false);
  const [proficiencyData, setProficiencyData] = useState(
    JSON.parse(JSON.stringify(proficiencyStaticData))
  );
  const [selectedSelfRating, setSelectedSelfRating] = useState(null);
  const [preferredDetails, setPreferredDetails] = useState(null);
  const [userProficiency, setUserProficiency] = useState(null);
  const [cancelModalVisible, setCancelModalVisibility] = useState(false);
  const [limitReachedForToday, setLimitReachForToday] = useState(true);
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [playerDetailsResponse, setPlayerDetailsResponse] = useState(null);
  const [plansResponse, setPlansResponse] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [playType, setPlayType] = useState(null);
  const [planData, setPlanData] = useState(null);
  const [academyData, setAcademyData] = useState(null);
  const [currentRating, setCurrentRating] = useState(null);

  var updateRatingError = null;
  var playerDetailsApiError = null;
  var cancelBookingError = null;

  const getNotifications = () => {
    getNotificationCount((count) => {
      console.log("CCCC");
      console.log({ count });
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
    const didFocusListener = navigation.addListener("didFocus", onScreenFocus);
    onScreenFocus();
    return () => {
      didFocusListener.remove();
    };
  }, []);

  const onScreenFocus = () => {
    navigation.setParams({
      headerRight: <RequestHeaderRight navigation={navigation} />,
    });
    getNotifications();
    var refreshEventCallNotif = Events.subscribe("NOTIFICATION_CALL", (msg) => {
      getNotifications();
    });

    getuserdata();
    checkNotification();
    Events.publish(EVENT_EDIT_PROFILE);
    var refreshEvent = Events.subscribe("NOTIFICATION_CLICKED", (msg) => {
      checkNotification();
    });

    //getSlotDataApi();
    getPlayerDetailsApi();
    return () => {
      refreshEvent.remove();
      refreshEventCallNotif.remove();
      // Anything in here is fired on component unmount.
    };
  };

  const getuserdata = () => {
    getData("userInfo", (value) => {
      userData = JSON.parse(value);
      setUserDetails(userData);
    });
  };

  const getPlayerDetailsApi = async () => {
    setLoading(true);
    getData("header", (value) => {
      if (value == "") return;
      const headers = {
        "Content-Type": "application/json",
        "x-authorization": value,
        //TODO:remove this static logic
        // "x-authorization":
        //   "Bearer  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MjciLCJzY29wZXMiOlsiUExBWUVSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJpYXQiOjE2ODA4NjAxNDUsImV4cCI6NTIyNTY0MDA4NjAxNDV9.gVyDUz8uFURw10TuCKMGBcx0WRwGltXS7nDWBzOgoFTq2uyib-6vUbFCeZrhYeno5pIF5dMLupNrczL_G-IhKg",
      };
      //client.call
      client
        .get("user/playing-profile", {
          headers,
          params: {},
        })
        .then(function(response) {
          console.log({ response });
          playerDetailsApiError = response;
          console.log("requestData profile" + JSON.stringify(response.data));
          let json = response.data;
          let success = json.success;
          if (success) {
            var todayLimitReached = false;
            var hoursLeft = json.data?.plan?.hoursRemaining ?? 0;
            var creditedHours = json.data?.plan?.hoursCredited ?? 0;

            var oldRemainingHours = json.data?.plan?.oldPlanRemainingHours ?? 0;
            var totalHoursRemaining = hoursLeft + oldRemainingHours;
            var totalHours = oldRemainingHours + creditedHours;
            setCreditedPlusRemaining(totalHours);
            setRemainingHrsApiRes(hoursLeft);
            setTotalAvailableHours(totalHoursRemaining);
            setPlayType(json.data?.plan?.planTerm);
            setPlanData(json.data?.plan);
            if (json.data?.plan?.expiryDate != null) {
              var startDate = moment(Date());
              var endDate = moment(json.data?.plan?.expiryDate);
              var days = 0;
              // const currentDate = new Date();
              // const targetDate = new Date(json.data?.plan?.expiryDate);
              // const timeDifference =
              //   targetDate.getTime() - currentDate.getTime();
              // days = Math.ceil(timeDifference / (1000 * 3600 * 24));
              const duration = moment.duration(endDate.diff(startDate));
              days = Math.ceil(duration.asDays());
              setPackageRemainingDays(days);
              if (
                startDate.format("yyyy-dd-mm") == endDate.format("yyyy-dd-mm")
              ) {
                setExpiringToday(true);
              }
            }
            todayLimitReached =
              json.data?.plan?.maxSlotBookingPerDay == 0 ||
              json.data?.plan?.maxSlotBookingPerDay == 0.0 ||
              json.data?.plan?.maxSlotBookingPerDay == null
                ? true
                : false;
            setLimitReachForToday(todayLimitReached);
            if (json.data?.rating?.length > 0) {
              var sportsData = json.data?.rating;
              var selectedIndex = null;
              if (
                sportsList?.length > 0 &&
                sportsData.length == sportsList.length
              ) {
                for (var i = 0; i < sportsList.length; i++) {
                  if (sportsList[i].isSelected) {
                    selectedIndex = i;
                  }
                }
              }

              //   for (var i = 0; i < sportsData?.length; i++) {
              //     sportsData[i].isSelected = i == 0 ? true : false;
              // }
              for (var i = 0; i < sportsData?.length; i++) {
                if (selectedIndex != null) {
                  sportsData[i].isSelected = i == selectedIndex ? true : false;
                } else {
                  sportsData[i].isSelected = i == 0 ? true : false;
                }
                //  peerData["isSelected"] = peerData[i]?.peerRating != null &&
                //  peerData[i]?.peerRating != "" ? true : false;
              }
              setSportsList(sportsData);
            }
            var nextSessionVal = json.data?.bookings;
            for (var i = 0; i < json.data?.bookings?.length; i++) {
              nextSessionVal[i].isExpanded = false;
              setNextSessionData(nextSessionVal);
            }
            if (json.data?.peerRating?.length > 0) {
              var peerData = json.data?.peerRating;
              var peerSelectedIndex = null;
              if (
                peerSportsList?.length > 0 &&
                peerData.length == peerSportsList.length
              ) {
                for (var i = 0; i < peerSportsList.length; i++) {
                  if (peerSportsList[i].isSelected) {
                    peerSelectedIndex = i;
                  }
                }
              }
              for (var i = 0; i < peerData?.length; i++) {
                if (peerSelectedIndex != null) {
                  peerData[i].isSelected =
                    i == peerSelectedIndex ? true : false;
                } else {
                  peerData[i].isSelected = i == 0 ? true : false;
                }
                //  peerData["isSelected"] = peerData[i]?.peerRating != null &&
                //  peerData[i]?.peerRating != "" ? true : false;
              }

              setPeerSportsList(peerData);
            }
            console.log("olla");
            console.log(json.data);

            setPlayerDetailsResponse(json.data);
            if (json.data?.plan?.planId != null) {
              getPlansDataApi(
                json.data?.plan?.planId,
                json.data?.plan?.preferredAcademyId
              );
            }
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
            `${playerDetailsApiError?.response?.response?.data?.error_message ??
              ""}`,
            ToastAndroid.SHORT
          );
          console.log(error);
        });
    });
  };

  const getPlansDataApi = async (planId, preferredAcademyId) => {
    setLoading(true);
    getData("header", (value) => {
      if (value == "") return;
      const headers = {
        "Content-Type": "application/json",
        "x-authorization": value,
        //TODO:remove this static logic
        // "x-authorization":
        //   "Bearer  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MjciLCJzY29wZXMiOlsiUExBWUVSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJpYXQiOjE2ODA4NjAxNDUsImV4cCI6NTIyNTY0MDA4NjAxNDV9.gVyDUz8uFURw10TuCKMGBcx0WRwGltXS7nDWBzOgoFTq2uyib-6vUbFCeZrhYeno5pIF5dMLupNrczL_G-IhKg",
      };
      //client.call
      client
        .get("global/play/plan-info", {
          headers,
          params: {
            planId: planId,
            preferredAcademyId: preferredAcademyId,
          },
        })
        .then(function(response) {
          console.log({ response });
          console.log("requestData Plan" + JSON.stringify(response.data));
          let json = response.data;
          let success = json.success;
          if (success) {
            setPlansResponse(json.data);
            setAcademyData(json.data?.academy);
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
    });
  };

  const addCanceledHoursBack = (slotStartTime, slotEndTime) => {
    var finalDifference = 0;

    if (slotStartTime != null && slotEndTime != null) {
      var randomStartDateTime = "1970-01-01T" + slotStartTime;
      var randomEndDateTime = "1970-01-01T" + slotEndTime;
      const time1 = new Date(randomStartDateTime);
      const time2 = new Date(randomEndDateTime);
      const diffInMillisec = time2.getTime() - time1.getTime();

      // convert milliseconds to hours, minutes
      const diffInHours = diffInMillisec / (1000 * 60 * 60);

      finalDifference = diffInHours;
      if (finalDifference > 0) {
        setRemainingHrsApiRes(remainingHrsApiRes + finalDifference);
      }
      // Math.floor(diffInHours);
    }
  };

  const cancelBookingApi = async () => {
    // setModalLoading(true);
    getData("header", (value) => {
      if (value == "") return;
      const headers = {
        "Content-Type": "application/json",
        "x-authorization": value,
        //TODO:remove this static logic
        // "x-authorization":
        //   "Bearer  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MjciLCJzY29wZXMiOlsiUExBWUVSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJpYXQiOjE2ODA4NjAxNDUsImV4cCI6NTIyNTY0MDA4NjAxNDV9.gVyDUz8uFURw10TuCKMGBcx0WRwGltXS7nDWBzOgoFTq2uyib-6vUbFCeZrhYeno5pIF5dMLupNrczL_G-IhKg",
      };
      //client.call
      client
        .get("court/cancel-court-booking/" + cancelBookingId, {
          headers,
          params: {},
        })
        .then(function(response) {
          console.log({ response });
          cancelBookingError = response;
          console.log("requestData Cancel" + JSON.stringify(response.data));
          let json = response.data;
          let success = json.success;
          setModalLoading(false);
          if (success) {
            if (nextSession?.length > 0) {
              var nextSessionVal = JSON.parse(JSON.stringify(nextSession));
              for (var i = 0; i < nextSession?.length; i++) {
                if (nextSession[i]?.id == cancelBookingId) {
                  nextSessionVal[i].isCancelled = true;
                  onRefresh();
                  addCanceledHoursBack(
                    nextSessionVal[i]?.startTime,
                    nextSessionVal[i]?.endTime
                  );
                }
              }
              setNextSessionData(nextSessionVal);
            }
            //addCanceledHoursBack();
            //TODO: verify
            //getPlayerDetailsApi();
            ToastAndroid.show(`Booking cancelled`, ToastAndroid.SHORT);
          } else {
            if (json.code == "1020") {
              Events.publish("LOGOUT");
            }
          }
        })
        .catch(function(error) {
          setModalLoading(false);
          ToastAndroid.show(
            `${cancelBookingError?.response?.data?.error_message ?? ""}`,
            ToastAndroid.SHORT
          );
          {
            Platform.OS === "ios" &&
              this.showToast(
                cancelBookingError?.response?.data?.error_message ?? ""
              );
          }
          console.log(error);
        });
    });
  };

  showToast = (message) => {
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

  useEffect(() => {
    if (playerDetailsResponse?.plan?.preferredSportId != null) {
      if (playerDetailsResponse?.rating?.length > 0) {
        for (var i = 0; i < playerDetailsResponse?.rating?.length; i++) {
          if (
            playerDetailsResponse?.plan?.preferredSportId ==
            playerDetailsResponse?.rating[i]?.sport?.id
          ) {
            setPreferredDetails(playerDetailsResponse?.rating[i]);
            setUserProficiency(playerDetailsResponse?.rating[i]?.self);
            const { self, peers } = playerDetailsResponse?.rating[i];
            const newArray = Object.keys(peers).reduce((acc, key) => {
              acc[key] = key === self ? peers[key] + 1 : peers[key];
              return acc;
            }, {});
            const priorityOrder = [
              "ADVANCED",
              "PROFESSIONAL",
              "INTERMEDIATE",
              "BASIC",
            ];
            let highestKey = priorityOrder[0];
            let highestValue = newArray[highestKey];
            for (let i = 1; i < priorityOrder.length; i++) {
              const key = priorityOrder[i];
              const value = newArray[key];
              if (value > highestValue) {
                highestKey = key;
                highestValue = value;
              }
            }
            setCurrentRating(highestKey);
          }
        }
      }
    } else {
      if (planData && !userDetails.is_play_enabled) {
        var sentdata = planData?.subscriptionId;
        navigation.navigate("EditPreferredSports", { sentdata });
      }
    }
  }, [playerDetailsResponse, userProficiency]);

  const onRefresh = () => {
    setRefreshing(true);
    getPlayerDetailsApi();
    setProficiencyData(JSON.parse(JSON.stringify(proficiencyStaticData)));
    setSelfRatingActiveness(false);
    // In actual case set refreshing to false when whatever is being refreshed is done!
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const onGameSelected = (item) => {
    if (selfTabEnabled) {
      let index = sportsList.findIndex((game) => {
        return game?.sport?.id == item?.sport?.id;
      });
      if (index == -1) return;

      let newData = sportsList.map((game) => {
        return { ...game, isSelected: false };
      });
      newData[index]["isSelected"] = !newData[index]["isSelected"];
      setSportsList([...newData]);
    } else {
      let index1 = peerSportsList.findIndex((game) => {
        return game?.sport?.id == item?.sport?.id;
      });
      if (index1 == -1) return;

      let newData1 = peerSportsList.map((game) => {
        return { ...game, isSelected: false };
      });
      newData1[index1]["isSelected"] = !newData1[index1]["isSelected"];
      setPeerSportsList([...newData1]);
    }
  };

  const renderGameNameBox = ({ item }) => {
    return (
      <GameNameBox
        isSelected={item?.isSelected}
        item={item?.sport}
        onPress={() => onGameSelected(item)}
      />
    );
  };

  const bookSlotPressed = () => {
    const startDate = moment(playerDetailsResponse?.plan?.joiningDate);
    const expiryD = moment(playerDetailsResponse?.plan?.expiryDate);
    const expiryDate = expiryD.add(1, "day");
    const presentDate = moment();
    const prestD = presentDate.add(1, "day");
    console.log("presentDate");
    console.log(startDate);
    console.log(presentDate);
    console.log(expiryDate)
    if (presentDate > startDate && presentDate < expiryDate) {
      navigation.navigate("BookSlotScreen");
    } else {
      ToastAndroid.show(
        `Your current plan doesn't allow you to book a slot.`,
        ToastAndroid.SHORT
      );
    }
  };

  const onPlayingLevelPress = () => {
    null;
  };

  const setCancelModalVisibilityCb = (val) => {
    setCancelModalVisibility(val);
  };

  const expandList = (passedVal) => {
    var sessionData = nextSession;
    sessionData.map((val) => {
      if (val.id == passedVal.id) {
        val.isExpanded = !val.isExpanded;
      }
    });
    setNextSessionData(sessionData);
  };

  const updateRating = (
    playerInfo,
    ratingInfo,
    selectedPeerRating,
    isPeerTypeRequest
  ) => {
    setModalLoading(true);
    const data = isPeerTypeRequest
      ? {
          userId: playerInfo?.id,
          sportId: selectedPeerRating?.sport?.id,
          proficiency: ratingInfo?.proficiency,
          date: `${moment(selectedPeerRating?.date).format("YYYY-MM-DD")}`,
          //date: `${moment(Date()).format('YYYY-MM-DD')}`,
          startTime: selectedPeerRating?.startTime,
          endTime: selectedPeerRating?.endTime,
        }
      : {
          userId: playerDetailsResponse?.user?.id,
          sportId: selectedPeerRating?.sport?.id,
          proficiency: selectedSelfRating?.proficiency,
          date: `${moment(Date()).format("YYYY-MM-DD")}`,
        };

    // setLoading(true);
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
        .post("user/playing-level-rating", { data: data }, { headers: headers })
        .then(function(response) {
          updateRatingError = { response };
          console.log({ response });
          setSelfRatingActiveness(false);
          try {
            let json = response?.data;
            let success = json?.success;
            if (success) {
              if (!isPeerTypeRequest) {
                setUserProficiency(selectedSelfRating?.proficiency);
              }

              if (isPeerTypeRequest) {
                var previousPeerSportsData = [];
                if (peerSportsList?.length > 0) {
                  previousPeerSportsData = JSON.parse(
                    JSON.stringify(peerSportsList)
                  );
                  for (var i = 0; i < peerSportsList.length; i++) {
                    if (
                      peerSportsList[i]?.sport?.id ==
                      selectedPeerRating?.sport?.id
                    ) {
                      var players = peerSportsList[i]?.players ?? [];
                      if (players?.length > 0) {
                        for (var j = 0; j < players.length; j++) {
                          if (players[j]?.id == playerInfo?.id) {
                            previousPeerSportsData[i].players[j].peerRating =
                              ratingInfo?.proficiency;
                          }
                        }
                      }
                    }
                  }
                  setPeerSportsList(previousPeerSportsData);
                }
              }
              if (!isPeerTypeRequest) {
                var sportsDataCopy = [...sportsList];
                for (var i = 0; i < sportsDataCopy?.length; i++) {
                  if (
                    sportsDataCopy[i]?.sport?.id ==
                    selectedPeerRating?.sport?.id
                  ) {
                    sportsDataCopy[i].self = selectedSelfRating?.proficiency;
                  }
                }
                setSportsList(sportsDataCopy);
              }
              if (
                !isPeerTypeRequest &&
                playerDetailsResponse?.plan?.preferredSportId ==
                  selectedPeerRating?.sport?.id
              ) {
                setUserProficiency(selectedSelfRating?.proficiency);
              }
              if (!isPeerTypeRequest) {
                if (proficiencyData?.length > 0) {
                  var previousProfData2 = JSON.parse(
                    JSON.stringify(proficiencyStaticData)
                  );
                  for (var i = 0; i < proficiencyData?.length; i++) {
                    if (
                      proficiencyData[i].proficiency ==
                      selectedSelfRating?.proficiency
                    ) {
                      previousProfData2[i].isSelected = true;
                    }
                  }
                  setProficiencyData(previousProfData2);
                }
              }
              setModalLoading(false);
              setTimeout(() => {
                ToastAndroid.show(`Rating updated.`, ToastAndroid.SHORT);
              }, 500);
              //getPlayerDetailsApi();
              // setRewardsResponse(json["data"]["reward"]);
            } else {
              ToastAndroid.show(
                `${updateRatingError?.response?.response?.data?.error_message ??
                  ""}`,
                ToastAndroid.SHORT
              );
              if (json.code == "1020") {
                Events.publish("LOGOUT");
              }
            }

            // setLoading(false);
          } catch (e) {
            setModalLoading(false);
            //setLoading(false);
            ToastAndroid.show(
              `${updateRatingError?.response?.response?.data?.error_message ??
                ""}`,
              ToastAndroid.SHORT
            );
          }
        })
        .catch(function(error) {
          setModalLoading(false);
          //setLoading(false);
          ToastAndroid.show(
            `${updateRatingError?.response?.response?.data?.error_message ??
              ""}`,
            ToastAndroid.SHORT
          );
        });
    });
  };

  const onRatingSelection = (passedVal) => {
    var previousProfData = proficiencyData;
    for (var i = 0; i < proficiencyData.length; i++) {
      previousProfData[i].isSelected =
        proficiencyData[i].level == passedVal.level ? true : false;
    }

    setSelectedSelfRating(passedVal);
    setProficiencyData(previousProfData);
  };

  const onSavePress = (val) => {
    updateRating(null, null, val, false);
  };

  const onPressPlan = (selectPlan, playPlanData) => {
    console.log(selectPlan);
    navigation.navigate("PlayingPlan", { selectPlan });
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (userDetails.is_play_enabled) {
    return (
      <LinearGradient
        colors={["#332B70", "#24262A"]}
        locations={[0, 1]}
        style={{ flex: 1 }}
      >
        <PlayerScreen
          onPressPlan={onPressPlan}
          navigation={navigation}
          onPress={() => {
            navigation.navigate("BookPlayTrail");
          }}
        />
      </LinearGradient>
    );
  }

  return (
    <View style={[{ flex: 1 }]}>
      <LinearGradient
        colors={["#051732", "#232031"]}
        style={{ flex: 1, paddingBottom: 63 }}
      >
        <Loader visible={modalLoading} />
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
          <ProfileSction
            preferredDetails={preferredDetails}
            name={playerDetailsResponse?.user?.name ?? ""}
            image={{ uri: playerDetailsResponse?.user?.profile_pic ?? "" }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              var sentdata = planData?.subscriptionId;
              navigation.navigate("EditPreferredSports", { sentdata });
            }}
          >
            <PrefSport
              gradientColors={getProficiencyGradients(currentRating)}
              currentRatingColor={getProficiencyColor(currentRating)}
              currentRating={getProficiencyName(
                currentRating ? currentRating.toLowerCase() : ""
              )}
              icon={{ uri: preferredDetails?.sport?.image }}
              sportTitle={preferredDetails?.sport?.name}
              centreImg={{ uri: academyData?.cover_pic }}
              centreTitle={academyData?.name}
            />
          </TouchableOpacity>
          <MembershipDetails
            //TODO:
            packageRemainingDays={packageRemainingDays}
            aboutToExpire={
              (packageRemainingDays < 3 && packageRemainingDays >= 0) ||
              remainingHrsApiRes < 3
                ? true
                : false
            }
            //aboutToExpire={true}
            showOffer={false}
            planExpired={
              (packageRemainingDays < 0 && expiringToday == false) ||
              remainingHrsApiRes < 1
                ? true
                : false
            }
            currentPlanPrice={plansResponse?.plan?.price ?? "N/A"}
            planType={playType ?? ""}
            //planExpired={true}
            totalHrs={creditPlusRemaining}
            // hoursLeft={playerDetailsResponse?.plan?.hoursRemaining}
            hoursLeft={remainingHrsApiRes}
            slotsExhaused={
              !(packageRemainingDays <= 0 && expiringToday == false) &&
              totalAvailableHours == 0
                ? true
                : false
            }
            onMorePlansPress={() => {
              const selectPlan = 100;
              navigation.navigate("PlayingPlan", { selectPlan });
            }}
            onRenewPress={() => {
              navigation.navigate("RenewPlan");
            }}
            expiryDate={moment(playerDetailsResponse?.plan?.expiryDate).format(
              "DD MMMM YYYY"
            )}
            purchasedDate={moment(
              playerDetailsResponse?.plan?.joiningDate
            ).format("DD MMMM YYYY")}
          />
          <NextSessionList
            userId={playerDetailsResponse?.user?.id}
            NextSessionData={nextSession}
            expandList={(val) => expandList(val)}
            onPlayingLevelPress={onPlayingLevelPress}
            cancelDisplayTime={(val, val2) => {
              setCancelPopupDisplayTime(val);
              setCancelPopupSportsName(val2);
            }}
            onCancelPress={(id) => {
              setCancelBookingId(id);
              setCancelModalVisibilityCb(true);
            }}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPlayDataVisibility(!playDataVisibility)}
          >
            <View style={styles.playingLevelContainer}>
              <Text style={styles.menuHeading}>Playing level</Text>
              <Image
                style={[
                  styles.arrow_img,
                  {
                    transform: [
                      { rotate: playDataVisibility ? "180deg" : "0deg" },
                    ],
                  },
                ]}
                source={require("../../images/orange_arrow_down.png")}
              />
            </View>
          </TouchableOpacity>

          {playDataVisibility ? (
            <>
              <View style={{ flexDirection: "row", marginHorizontal: 13 }}>
                <RatingTabarHeader
                  name={"My Rating"}
                  isSelected={selfTabEnabled}
                  onPressed={() => {
                    if (selfTabEnabled == false) {
                      setSelfTab(true);
                      // var profData = (profData = proficiencyStaticData.map(
                      //   (val) => {
                      //     if (
                      //       val.proficiency ==
                      //       playerDetailsResponse?.user?.proficiency
                      //     ) {
                      //       val.isSelected = true;
                      //     }
                      //   }
                      // ));
                      setProficiencyData(
                        JSON.parse(JSON.stringify(proficiencyStaticData))
                      );
                      //
                    }
                  }}
                />
                <RatingTabarHeader
                  name={"Rate Your Peers"}
                  isSelected={!selfTabEnabled}
                  onPressed={() => {
                    if (selfTabEnabled) {
                      setSelfTab(false);

                      setProficiencyData(
                        JSON.parse(JSON.stringify(proficiencyStaticData))
                      );
                    }
                  }}
                />
              </View>
              {selfTabEnabled && (
                <>
                  <View style={{ marginTop: 23, marginHorizontal: 13 }}>
                    <FlatList
                      data={sportsList}
                      horizontal={true}
                      renderItem={renderGameNameBox}
                    />
                  </View>
                  <SelfRatingCard
                    onRatingSelection={(val) => onRatingSelection(val)}
                    proficiencyData={proficiencyData}
                    ratingData={sportsList}
                    editSelfRating={editSelfRatingActive}
                    onEditPress={() => {
                      setSelfRatingActiveness(true);
                    }}
                    onSavePress={(val1) => onSavePress(val1)}
                  />
                </>
              )}
              {!selfTabEnabled && (
                <>
                  <FlatList
                    data={peerSportsList}
                    contentContainerStyle={{
                      marginHorizontal: 12,
                      marginTop: 23,
                    }}
                    horizontal={true}
                    renderItem={renderGameNameBox}
                  />
                  <RatePeersTabView
                    userId={playerDetailsResponse?.user?.id}
                    proficiencyData={proficiencyData}
                    updateRating={(val1, val2, val3) =>
                      updateRating(val1, val2, val3, true)
                    }
                    renderGameNameBox={renderGameNameBox}
                    ratingData={peerSportsList}
                  />
                </>
              )}
            </>
          ) : null}
        </ScrollView>
      </LinearGradient>
      {cancelModalVisible ? (
        <CancelSessionModal
          confirmType={true}
          cancelTime={cancelPopupDisplayTime}
          sportsName={cancelPopupSportsName}
          onCancel={() => {
            cancelBookingApi();
            setCancelModalVisibilityCb(false);
          }}
          cancelModalVisible={cancelModalVisible}
          setModalVisibility={() => {
            setCancelModalVisibilityCb(false);
            setCancelBookingId(null);
          }}
        />
      ) : null}
      {limitReachedForToday ? <View style={styles.emptyView} /> : null}
      {!limitReachedForToday ? (
        <View style={styles.skyFilledButtonView}>
          <CustomButton
            name="Book Slot "
            available={true}
            height={45}
            onPress={() => {
              bookSlotPressed();
            }}
          />
        </View>
      ) : (
        <LinearGradient
          colors={["rgba(87, 85, 98, 1)", "rgba(42, 40, 56, 1)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: "absolute",
            bottom: 0,
            height: 126,
            width: "100%",
            padding: 12,
          }}
        >
          <Text style={styles.expiryDesc}>
            {
              "Sorry! You have reached the maximum limit of booking slots for today."
            }
          </Text>
          <View style={{ zIndex: 4 }}>
            <CustomButton
              name={"Book Slot"}
              textColor={"#939393"}
              inactiveColors={["rgba(71, 71, 74, 1)", "rgba(71, 71, 74, 1)"]}
              hideImage={true}
              available={false}
              onPress={() => {}}
            />
          </View>
        </LinearGradient>
      )}
    </View>
  );
});

PlayScreen.navigationOptions = ({ navigation }) => {
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

const styles = StyleSheet.create({
  arrow_img: {
    height: 5,
    width: 12,
    resizeMode: "contain",
  },
  expiryDesc: {
    fontSize: 12,
    color: lightYellowVariant,
    fontFamily: Nunito_Regular,
    fontWeight: "600",
    marginBottom: 9,
  },
  menuHeading: {
    color: "#FF9C33",
    fontSize: 16,
    fontFamily: Nunito_Regular,
    marginTop: 2,
    textAlign: "center",
  },
  emptyView: { height: 62, width: "100%", backgroundColor: "transparent" },
  skyFilledButtonView: {
    flex: 1,
    position: "absolute",
    width: "100%",
    paddingHorizontal: 20,
    alignSelf: "center",
    justifyContent: "center",
    bottom: 15,
  },

  playingLevelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 13,
    marginRight: 19,
    marginTop: 32,
    marginBottom: 14,
  },
});

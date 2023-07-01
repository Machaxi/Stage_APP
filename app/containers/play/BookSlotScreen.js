import React, { useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  ToastAndroid,
  FlatList,
  Text,
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
import axios from "axios";
import { getBaseUrl } from "../BaseComponent";
import SelectSports from "../../components/custom/SelectSports";
import SelectSportsBookSlot from "../../components/molecules/selectSportsBookSlot";
import SelectDateBookSlot from "../../components/molecules/selectDateBookSlot";
import moment from "moment";
import LoadingIndicator from "../../components/molecules/loadingIndicator";
import { getData } from "../../components/auth";
import { client } from "../../../App";
import CustomButton from "../../components/custom/CustomButton";
import { Nunito_SemiBold } from "../util/fonts";

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
  const [user, setUser] = useState(null);
  const [showProficiencyMenu, setProficiencyVisibility] = useState(false);
  const [loading, setLoading] = useState(true);
  const [planAndSportsApiRes, setPlanAndSportsApiRes] = useState(null);
  const [sportsList, setSportsList] = useState(null);
  const [bookdata, setBookdata] = useState([]);
  const [proficiencydata, setProficiencydata] = useState([]);
  const [courtBookingNotes, setCourtBookingNotes] = useState([]);
  const [showNotes, setNotes] = useState(true);
  const [resetModel, setResetModel] = useState(true);

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
            if (json?.data?.plan?.preferredSportId != null) {
              const filteredData = json?.data?.sports.filter(
                (item) => item.id === json?.data?.plan?.preferredSportId
              );
              const proficiencyCounts = filteredData.reduce((counts, item) => {
                const { proficiency } = item;
                counts[proficiency] = (counts[proficiency] || 0) + 1;
                return counts;
              }, {});
              const allProficiencies = {
                PROFESSIONAL: 0,
                ADVANCE: 0,
                INTERMEDIATE: 0,
                BASIC: 0,
              };
              const mergedProficiencies = {
                ...allProficiencies,
                ...proficiencyCounts,
              };
              const highestProficiency = Object.entries(
                mergedProficiencies
              ).reduce(
                (prev, [key, value]) => {
                  if (value > prev.value) {
                    return { key, value };
                  }
                  return prev;
                },
                { key: null, value: -Infinity }
              );
              json?.data?.sports.map((val) => {
                if (val.id == json?.data?.plan?.preferredSportId) {
                  setProficiencyVisibility(
                    val.proficiency == null ? true : false
                  );
                  setSelectedSportsId(val.id);
                  if (highestProficiency.key) {
                    setProficiency(highestProficiency.key);
                  } else {
                    setProficiency(val.proficiency);
                  }
                  preferredSportsData(val.id);
                }
              });
            } else {
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
            `${planAndSportsError?.response?.response?.data?.error_message ??
              ""}`,
            ToastAndroid.SHORT
          );
          console.log(error);
        });
    });
  };

  useEffect(() => {
    if (sportsList !== null) {
      getUserPlanAndSportsData();
    }
  }, [sportsList]);

  const preferredSportsData = (id) => {
    const sport = sportsList.find((item) => item.id === id);
    const {
      playingAreaName,
      allowEntireCourtBooking,
      courtBookingNotes,
      proficiencies,
    } = sport;

    console.log(allowEntireCourtBooking);
    console.log(playingAreaName);
    if (allowEntireCourtBooking) {
      setBookdata([
        "Yourself",
        "Entire " + playingAreaName,
        "Coming with Guest",
      ]);
    } else {
      setBookdata(["Yourself", "Coming with Guest"]);
    }
    if (courtBookingNotes) {
      setNotes(true);
    } else {
      setNotes(false);
    }
    const sortedData = proficiencies.sort((a, b) => a.order - b.order);
    const transformedData = sortedData.map((item) => item.displayText);
    setProficiencydata(transformedData);
    const lines = courtBookingNotes.split("\r\n");
    const points = lines.map((line) => line.replace(/^#\s*/, ""));
    setCourtBookingNotes(points);
  };

  const getSports = () => {
    axios
      .get(getBaseUrl() + "global/sports")
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        console.log(userResponce);
        let academiesData = userResponce["data"]["data"];
        setSportsList(academiesData["sports"]);
        console.log(academiesData);
      })
      .catch((error) => {
        console.log(error);
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
    getSports();
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
    getSports();
    return () => {
      refreshEvent.remove();
      refreshEventCallNotif.remove();
      // Anything in here is fired on component unmount.
    };
  }, []);

  const onNextPress = () => {
    //setModalVisibility(true)
    var entirecourt = false;
    if (user == "entire_court") {
      entirecourt = true;
    }
    var guestCount = count;
    if (user != "with_guest") {
      guestCount = 0;
    }
    const requestAllowed = getRequestAllowedById(selectedSportsId);
    navigation.navigate("BookSlotCentreSelectionScreen", {
      date: date,
      proficiency: proficiency,
      guestCount: guestCount,
      sportId: selectedSportsId,
      requestAllowed: requestAllowed,
      playHoursRemaining: planAndSportsApiRes?.plan?.hoursRemaining ?? 0,
      preferredAcademyId: planAndSportsApiRes?.plan?.preferredAcademyId,
      preferredSportId: planAndSportsApiRes?.plan?.preferredSportId,
      userType: user,
      entirecourt: entirecourt,
    });
  };

  const getRequestAllowedById = (id) => {
    const sport = sportsList.find((sport) => sport.id === id);
    return sport ? sport.requestAllowed : true;
  };

  const setModalVisibilityCb = (val) => {
    setModalVisibility(val);
  };

  const setSportsId = (id) => {
    const filteredData = planAndSportsApiRes?.sports.filter(
      (item) => item.id === id
    );
    const proficiencyCounts = filteredData.reduce((counts, item) => {
      const { proficiency } = item;
      counts[proficiency] = (counts[proficiency] || 0) + 1;
      return counts;
    }, {});
    const allProficiencies = {
      PROFESSIONAL: 0,
      ADVANCE: 0,
      INTERMEDIATE: 0,
      BASIC: 0,
    };
    const mergedProficiencies = {
      ...allProficiencies,
      ...proficiencyCounts,
    };
    const highestProficiency = Object.entries(mergedProficiencies).reduce(
      (prev, [key, value]) => {
        if (value > prev.value) {
          return { key, value };
        }
        return prev;
      },
      { key: null, value: -Infinity }
    );
    planAndSportsApiRes?.sports.map((val) => {
      if (val.id == id) {
        setProficiencyVisibility(val.proficiency == null ? true : false);
        setSelectedSportsId(id);
        if (highestProficiency.key) {
          setProficiency(highestProficiency.key);
        } else {
          setProficiency(val.proficiency);
        }
      }
    });
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#051732", "#232031"]}
        style={{ flex: 1, paddingHorizontal: 12 }}
      >
        <GoBackHeader
          navigation={navigation}
          title={"Book Slot"}
          style={{ flex: 0.09 }}
        />
        <ScrollView
          style={{ height: "100%", flex: 0.78 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
              title="Pull to refresh"
            />
          }
        >
          <View style={{ paddingHorizontal: 18, marginBottom: 20 }}>
            {sportsList && sportsList.length > 0 ? (
              <SelectSportsBookSlot
                selectedSportsId={selectedSportsId}
                sportsList={sportsList}
                setSelectedSportsIdVal={(id) => {
                  setSportsId(id);
                  const sport = sportsList.find((item) => item.id === id);
                  const {
                    playingAreaName,
                    allowEntireCourtBooking,
                    courtBookingNotes,
                    proficiencies,
                  } = sport;
                  if (allowEntireCourtBooking) {
                    setBookdata([
                      "Yourself",
                      "Entire " + playingAreaName,
                      "Coming with Guest",
                    ]);
                  } else {
                    setBookdata(["Yourself", "Coming with Guest"]);
                    if (user == "entire_court") {
                      setResetModel(false);
                      setUser(null);
                    }
                  }
                  const sortedData = proficiencies.sort(
                    (a, b) => a.order - b.order
                  );
                  const transformedData = sortedData.map(
                    (item) => item.displayText
                  );
                  setProficiencydata(transformedData);
                  if (courtBookingNotes) {
                    setNotes(true);
                  } else {
                    setNotes(false);
                  }
                  const lines = courtBookingNotes.split("\r\n");
                  const points = lines.map((line) => line.replace(/^#\s*/, ""));
                  console.log(points);
                  setCourtBookingNotes(points);
                }}
              />
            ) : null}
            {showProficiencyMenu == true && selectedSportsId != null ? (
              <UserSelectionForSlot
                user={proficiency}
                data={proficiencydata}
                label={"Select proficiency"}
                reset={proficiency != null}
                setUserVal={(val) => {
                  if (val == "Beginner") {
                    setProficiency("BASIC");
                  } else if (val == "Advance") {
                    setProficiency("ADVANCED");
                  } else {
                    setProficiency("INTERMEDIATE");
                  }
                }}
              />
            ) : null}
            <SelectDateBookSlot
              date={date}
              setDateVal={(val) => setDate(val)}
            />
            <Text style={styles.booking}>Booking For</Text>
            <UserSelectionForSlot
              user={user}
              // { label: "Yourself", value: "yourself" },
              // { label: "Entire Court", value: "entire_court" },
              // { label: "Coming with Guest", value: "with_guest" },
              data={bookdata}
              label={"Select user"}
              reset={resetModel}
              setUserVal={(val) => {
                setResetModel(true);
                if (val == "Coming with Guest") {
                  setUser("with_guest");
                } else if (val == "Entire Court") {
                  setUser("entire_court");
                } else {
                  setUser(val);
                }
              }}
            />
            {user == "with_guest" && (
              <BookSlotAddUser
                count={count}
                setCount={(val) => setCount(val)}
              />
            )}
            {showNotes && (
              <SlotRelatedNotes courtBookingNotes={courtBookingNotes} />
            )}
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
            <View style={{ height: 20, width: "100%" }} />
          </View>
        </ScrollView>
        <View style={{ flex: 0.13, paddingTop: 12 }}>
          <CustomButton
            name="Next "
            image={require("../../images/playing/arrow_go.png")}
            available={
              selectedSportsId != null && proficiency != null && user != null
            }
            onPress={() => onNextPress()}
          />
        </View>
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
  booking: {
    fontSize: 14,
    fontFamily: Nunito_SemiBold,
    color: "#CACACA",
  },
});

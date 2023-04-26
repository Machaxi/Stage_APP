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
import { blueVariant, greyVariant1, greyVariant11, lightYellowVariant, white } from "../util/colors";
import RatingTabarHeader from "../../components/molecules/ratingTabbarHeader";
import { RatePeersTabView } from "../../components/molecules/ratePeersTabView";
import CancelSessionModal from "../../components/molecules/play_screen/cancelSessionModal";
import CustomButton from "../../components/custom/CustomButton";
import { getData } from "../../components/auth";
import { client } from "../../../App";
import Events from "../../router/events";
import RequestHeaderRight from "../../atoms/requestHeaderRight";
import { getNotificationCount, notificationOpenScreen } from "../util/notificationCount";
import RequestHeaderTitle from "../../atoms/requestHeaderTitle";
import RequestHeaderBg from "../../atoms/requestHeaderBg";
import RequestHeaderLeft from "../../atoms/requestHeaderLeft";
import LoadingIndicator from "../../components/molecules/loadingIndicator";
import { getProficiencyColor, getProficiencyGradients, getProficiencyName, proficiencyStaticData } from "../util/utilFunctions";
import moment from "moment";

export default PlayScreen =({navigation})=>{


  const gameNameData=[
    {
        title: "Swimming",
        color:'white',
        id:1,
        isSelected:true,
        // bgColor:'yellow'
    },
    {
        title: "Badminton",
        id:2,
        color:'white',
        isSelected:false,
        // bgColor:'yellow'
    },
    {
      title: "tennis",
      id:3,
      color:'white',
      isSelected:false,
      // bgColor:'yellow'
    },
    {
      title: "Swimming",
      id:4,
      // color:'#F2AE4D',
      color:'white',
      isSelected:false,
      // bgColor:'yellow'
    },
];

const NextSessionData = [
  {
    // icon:require("./../../images/beginner.png"),
    title: "Next Session - Today",
    id: 1,
    by: "4",
    titleColor: "#21D096",
    sportsName: "Swimming - Pool",
    sportsTime: "3pm",
    centreName: "Machaxi Play9 Sports Centre, Whitefield",
    centreAddress: "68/1, 1, near Parijatha Farm, Whitefield, Siddapura.",
    numberOfGuests: null,
    gameNameData: {
      title: "Swimming",
      id: 1,
      color: "green",
      // bgColor:'yellow'
    },
    playing_partners: null,
    isExpanded: false,
  },
  {
    // icon:require("./../../images/intermediate.png"),
    title: "Next Session - Today",
    by: "2",
    id: 2,
    titleColor: "#FF9C33",
    sportsName: "Swimming - Pool",
    sportsTime: "2-3pm",
    centreName: "Machaxi Play9 Sports Centre, Whitefield",
    centreAddress: "68/1, 1, near Parijatha Farm, Whitefield, Siddapura.",
    numberOfGuests: 4,
    playing_partners: [
      { name: "User 1", proficiency: "Beginner", guestCount: null },
      { name: "User 1", proficiency: "Beginner", guestCount: null },
      { name: "User 1", proficiency: "Beginner", guestCount: null },
      { name: "User 1", proficiency: "Beginner", guestCount: null },
    ],
    isExpanded: false,
  },
  {
    // icon:require("./../../images/advance.png"),
    title: "Advance",
    by: "8",
    id: 3,
    titleColor: "#FE6E88",
    sportsName: "Swimming - Pool",
    sportsTime: "3pm",
    centreName: "Machaxi Play9 Sports Centre, Whitefield",
    centreAddress: "68/1, 1, near Parijatha Farm, Whitefield, Siddapura.",
    numberOfGuests: 0,
    playing_partners: [],
    isExpanded: false,
  },
  {
    // icon:<Intermediate height={50} width={50} />,
    // icon:'./../../images/intermediate.svg',
    title: "Professional",
    by: "5",
    id: 4,
    titleColor: "#DB64FF",
    sportsName: "Swimming - Pool",
    sportsTime: "3pm",
    centreName: "Machaxi Play9 Sports Centre, Whitefield",
    centreAddress: "68/1, 1, near Parijatha Farm, Whitefield, Siddapura.",
    numberOfGuests: 4,
    playing_partners: [
      { name: "User 1", proficiency: "Beginner", guestCount: null },
      { name: "User 1", proficiency: "Beginner", guestCount: null },
      { name: "User 1", proficiency: "Beginner", guestCount: null },
      { name: "User 1", proficiency: "Beginner", guestCount: null },
    ],
    isExpanded: false,
  },
];

const [playDataVisibility,setPlayDataVisibility] =useState(false);
const [selfTabEnabled, setSelfTab] = useState(true);

const [profilePrecentage,setProfilePrecentage] =useState('0.9');
const [sportsList, setSportsList] = useState([]);
const [peerSportsList,setPeerSportsList]=useState([]);
const [nextSession,setNextSessionData]=useState([]);
const [cancelPressed, setCancelPressed] = useState(false);
const [editSelfRatingActive, setSelfRatingActiveness] = useState(false);
const [proficiencyData, setProficiencyData] = useState(proficiencyStaticData);
const [selectedSelfRating, setSelectedSelfRating] = useState(null)
const [preferredDetails, setPreferredDetails] = useState(null);
const [cancelModalVisible, setCancelModalVisibility] = useState(false);
const [limitReachedForToday, setLimitReachForToday] = useState(true)
const [loading, setLoading] = useState(true);
const [playerDetailsResponse, setPlayerDetailsResponse] = useState(null);
const [refreshing, setRefreshing] = useState(false);

var updateRatingError = null;
var playerDetailsApiError = null;

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
    navigation.setParams({
      headerRight: <RequestHeaderRight navigation={navigation} />,
    });
    getNotifications();
    var refreshEventCallNotif = Events.subscribe(
      "NOTIFICATION_CALL",
      (msg) => {
        getNotifications();
      }
    );

    checkNotification();

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
  }, []);

const getPlayerDetailsApi = async () => {
  setLoading(true);
  getData("header", (value) => {
    if (value == "") return;
    const headers = {
      "Content-Type": "application/json",
      //"x-authorization": value,
      //TODO:remove this static logic
      "x-authorization":
        "Bearer  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MjciLCJzY29wZXMiOlsiUExBWUVSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJpYXQiOjE2ODA4NjAxNDUsImV4cCI6NTIyNTY0MDA4NjAxNDV9.gVyDUz8uFURw10TuCKMGBcx0WRwGltXS7nDWBzOgoFTq2uyib-6vUbFCeZrhYeno5pIF5dMLupNrczL_G-IhKg",
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
        console.log("requestData" + JSON.stringify(response.data));
        let json = response.data;
        let success = json.success;
        if (success) {
          if (json.data?.peerRating?.length > 0) {
            var todayLimitReached = false;
            var nextSessionVal = json.data?.peerRating;
            var peerData = json.data?.peerRating;
            var sportsData = json.data?.rating;
            for(var i=0; i< json.data?.peerRating?.length; i++){
              nextSessionVal[i].isExpanded = false
            }
             for (var i = 0; i < sportsData?.length; i++) {
               sportsData[i].isSelected = i == 0 ? true : false;
             }
             for (var i = 0; i < peerData?.length; i++) {
                peerData[i].isSelected = i == 0 ? true : false
                //  peerData["isSelected"] = peerData[i]?.peerRating != null &&
                //  peerData[i]?.peerRating != "" ? true : false;
             }
          
            todayLimitReached =
              json.data?.plan?.maxPlayingHourPerDay == 0 ||
              json.data?.plan?.maxPlayingHourPerDay == 0.0 ||
              json.data?.plan?.maxPlayingHourPerDay == null
                ? true
                : false;
            setLimitReachForToday(
              todayLimitReached
            );
            
            setPeerSportsList(peerData);
            setNextSessionData(nextSessionVal);
            setSportsList(sportsData);
          }
          setPlayerDetailsResponse(json.data);

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
          `${playerDetailsApiError?.response?.response?.data
            ?.error_message ?? ""}`,
          ToastAndroid.SHORT
        );
        console.log(error);
      });
  });
};

useEffect(() => {
 
  if (playerDetailsResponse?.plan?.preferredSportId != null)
    if (playerDetailsResponse?.rating?.length > 0) {
      for(var i = 0; i < playerDetailsResponse?.rating?.length; i++){
        if(playerDetailsResponse?.plan?.preferredSportId == playerDetailsResponse?.rating[i]?.sport?.id){
          setPreferredDetails(playerDetailsResponse?.rating[i]);
        }
      }
      
    }
}, [playerDetailsResponse]);
 
  const onRefresh = () => {
    setRefreshing(true);
    getPlayerDetailsApi();
    setSelfRatingActiveness(true);
    // In actual case set refreshing to false when whatever is being refreshed is done!
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };


const onGameSelected=(item)=>{
  if(selfTabEnabled){
    let index = sportsList.findIndex((game) => {
      return game?.sport?.id == item?.sport?.id;
    });
    if(index == -1) return;

    let newData = sportsList.map((game) => {
      return {...game, isSelected: false}
    });
    newData[index]["isSelected"] = !newData[index]["isSelected"];
    setSportsList([...newData]);
  }
  else {
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
  
}

const renderGameNameBox = ({ item }) => {

  return (
    <GameNameBox
      isSelected={item?.isSelected}
      item={item?.sport}
      onPress={()=>onGameSelected(item)}
    />
  )
};




const bookSlotPressed=()=>{
  null
};
const onPlayingLevelPress=()=>{
  null
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
  }

const updateRating = (playerInfo, ratingInfo, selectedPeerRating, isPeerTypeRequest) => {
   console.log("********");
   console.log({ playerInfo });
   console.log({ ratingInfo });
   console.log({selectedPeerRating})
      console.log("********");

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
      console.log('?????')
      console.log({ data });

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
      .post(
        "user/playing-level-rating",
        { data: data },
        { headers: headers }
      )
      .then(function(response) {
        updateRatingError = { response };
        console.log({ response });

        try {
          let json = response?.data;
          let success = json?.success;
          if (success) {
            var previousProfData;
            previousProfData = proficiencyData.map((val)=>{
              if(val.level == ratingInfo.level){
                val.isSelected = true;
              }
            })
            getPlayerDetailsApi();
            setProficiencyData(previousProfData)
            if(isPeerTypeRequest){
              setSelfRatingActiveness(false);
            }
            // setRewardsResponse(json["data"]["reward"]);
          } else {
            ToastAndroid.show(
              `${updateRatingError?.response?.response?.data
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
            `${updateRatingError?.response?.response?.data?.error_message ??
              ""}`,
            ToastAndroid.SHORT
          );
        }
      })
      .catch(function(error) {
        setLoading(false);
        ToastAndroid.show(
          `${updateRatingError?.response?.response?.data?.error_message ??
            ""}`,
          ToastAndroid.SHORT
        );
      });
  });
};

const onRatingSelection = (passedVal) => {
 
  var previousProfData = [];
  for(var i=0; i< proficiencyStaticData.length; i++){
    previousProfData[i] = proficiencyStaticData[i]
    previousProfData[i].isSelected = proficiencyStaticData[i].level == passedVal.level ? true : false;
    
  }
  
  setSelectedSelfRating(passedVal)
  setProficiencyData(previousProfData)
}

const onSavePress = (val) => {
  console.log('===')
  console.log({val})
  console.log({ selectedSelfRating });
  console.log({ playerDetailsResponse });
  updateRating(null, null, val, false);
  console.log({val})
}

    if (loading) {
      return <LoadingIndicator />;
    }

  return (
    <View style={[{ flex: 1 }]}>
      <LinearGradient
        colors={["#051732", "#232031"]}
        style={{ flex: 1, paddingBottom: 63 }}
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
          <ProfileSction
            preferredDetails={preferredDetails}
            name={playerDetailsResponse?.user?.name ?? ""}
            image={{ uri: playerDetailsResponse?.user?.profile_pic ?? "" }}
          />
          <PrefSport
            gradientColors={getProficiencyGradients(preferredDetails?.self)}
            currentRatingColor={getProficiencyColor(preferredDetails?.self)}
            currentRating={getProficiencyName(preferredDetails?.self)}
            icon={{ uri: preferredDetails?.sport?.image }}
            sportTitle={preferredDetails?.sport?.name}
          />
          <MembershipDetails
            aboutToExpire={false}
            profilePrecentage={profilePrecentage}
            totalHrs={
              playerDetailsResponse?.plan?.hoursCredited +
              (playerDetailsResponse?.plan?.hoursRemaining != null
                ? playerDetailsResponse?.plan?.oldPlanRemainingHours
                : 0)
            }
            hoursLeft={playerDetailsResponse?.plan?.hoursRemaining}
            slotsExhaused={false}
            onMorePlansPress={() => {}}
            onRenewPress={() => {}}
            membershipExpired={false}
            expiryDate={moment(
              playerDetailsResponse?.plan?.expiryDate
            ).format("Mo MMMM YYYY")}
            purchasedDate={moment(
              playerDetailsResponse?.plan?.purchaseDate
            ).format("Mo MMMM YYYY")}
          />
          <NextSessionList
            userId={playerDetailsResponse?.user?.id}
            NextSessionData={nextSession}
            expandList={(val) => expandList(val)}
            onPlayingLevelPress={onPlayingLevelPress}
            onCancelPress={() => setCancelModalVisibilityCb(true)}
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
                    setSelfTab(true);
                    var profData = 
                    profData = proficiencyStaticData.map(
                      (val) => {
                        if (
                          val.proficiency ==
                          playerDetailsResponse?.user
                            ?.proficiency
                        ) {
                          val.isSelected = true;
                        }
                      }
                    );
                    setProficiencyData(profData);
                  }}
                />
                <RatingTabarHeader
                  name={"Rate Your Peers"}
                  isSelected={!selfTabEnabled}
                  onPressed={() => {
                    setSelfTab(false);
                    setProficiencyData(proficiencyStaticData);
                  }}
                />
              </View>
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
                    proficiencyData={proficiencyData}
                    updateRating={(val1, val2, val3) =>
                      updateRating(val1, val2, val3, true)
                    }
                    renderGameNameBox={renderGameNameBox}
                    ratingData={peerSportsList}
                  />
                </>
              )}
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
                    onEditPress={() => setSelfRatingActiveness(true)}
                    onSavePress={(val1) => onSavePress(val1)}
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
          onCancel={() => {}}
          cancelModalVisible={cancelModalVisible}
          setModalVisibility={() => setCancelModalVisibilityCb()}
        />
      ) : null}
      {limitReachedForToday ? <View style={styles.emptyView} /> : null}
      {!limitReachedForToday ? (
        <View style={styles.skyFilledButtonView}>
          <SkyFilledButton
            onPress={() => {
              navigation.navigate("BookSlotScreen");
              bookSlotPressed;
            }}
          >
            Book Slot
          </SkyFilledButton>
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
}

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
    marginBottom:9
  },
  menuHeading: {
    color: "#FF9C33",
    fontSize: 16,
    fontFamily: Nunito_Regular,
    marginTop: 2,
    textAlign: "center",
  },
  emptyView: {height: 62, width: '100%', backgroundColor:'transparent'},
  skyFilledButtonView: {
    flex:1,
    position: "absolute",
    width: "100%",
    paddingHorizontal: 10,
    alignSelf: "center",
    justifyContent:'center',
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
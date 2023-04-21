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

const PresSectionData={
      currentRatingColor:'#FF9C33',
      currentRating:'Intermediate',
      icon:require("./../../images/badminton_icon.png"),
      sportTitle:'badminton',
}


const [playDataVisibility,setPlayDataVisibility] =useState(false);
const [selfTabEnabled, setSelfTab] = useState(true);
const [expiryDate,setExpiryDate] =useState('2nd march, 2023');
const [purchasedDate,setPurchasedDate] =useState('2nd February 2023');
const [hoursLeft,setHoursLeft] =useState('28/30');
const [profilePrecentage,setProfilePrecentage] =useState('0.9');
const [gameData,setGameData]=useState(gameNameData);
const [nextSession,setNextSessionData]=useState(NextSessionData);
const [userName,setUserName]=useState('vidushi');
const [userPref,setUserPref]=useState(PresSectionData);
const [cancelPressed,setCancelPressed]=useState(false);
const [cancelModalVisible, setCancelModalVisibility] = useState(false);
const [limitReachedForToday, setLimitReachForToday] = useState(true)


const onGameSelected=(item)=>{

  let index = gameData.findIndex((game) => {
    return game["id"] == item["id"];
  });
  if(index == -1) return;

  let newData = gameData.map((game) => {
    return {...game, isSelected: false}
  });
  newData[index]["isSelected"] = !newData[index]["isSelected"];
  setGameData([...newData]);
  
}

const renderGameNameBox = ({ item }) => {
  return (
    <GameNameBox
      item={item} 
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

  return (
    <View style={[{ flex: 1 },]}>
      <LinearGradient
        colors={["#051732", "#232031"]}
        style={{ flex: 1, paddingBottom: 63 }}
      >
        <ScrollView style={{ height: "100%" }}>
          <ProfileSction
            name={userName}
            image={{ uri: "https://picsum.photos/seed/picsum/200/300" }}
          />

          <PrefSport
            currentRatingColor={userPref.currentRatingColor}
            currentRating={userPref.currentRating}
            icon={userPref.icon}
            sportTitle={userPref.sportTitle}
          />
          <MembershipDetails
            aboutToExpire={true}
            profilePrecentage={profilePrecentage}
            hoursLeft={hoursLeft}
            slotsExhaused={false}
            onMorePlansPress={() => {}}
            onRenewPress={() => {}}
            membershipExpired={false}
            expiryDate={expiryDate}
            purchasedDate={purchasedDate}
          />
          <NextSessionList
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
              <Text style={styles.menuHeading}>Playing Level</Text>
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
                  }}
                />
                <RatingTabarHeader
                  name={"Rate Your Peers"}
                  isSelected={!selfTabEnabled}
                  onPressed={() => {
                    setSelfTab(false);
                  }}
                />
              </View>
              {!selfTabEnabled && (
                <>
                  <FlatList
                    data={gameData}
                    contentContainerStyle={{
                      marginHorizontal: 12,
                      marginTop: 23,
                    }}
                    horizontal={true}
                    renderItem={renderGameNameBox}
                  />
                  <RatePeersTabView
                    renderGameNameBox={renderGameNameBox}
                    gameData={gameData}
                  />
                </>
              )}
              {selfTabEnabled && (
                <>
                  <View style={{ marginTop: 23, marginHorizontal: 13 }}>
                    <FlatList
                      data={gameData}
                      horizontal={true}
                      renderItem={renderGameNameBox}
                    />
                  </View>
                  <SelfRatingCard editSelfRating={null} />
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
    position: "absolute",
    width: "80%",
    alignSelf: "center",
    bottom: 12,
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
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

const NextSessionData= [
  {
      // icon:require("./../../images/beginner.png"),
      title: "Next Session - Today",
      id:1,
      by:'4',
      titleColor:'#21D096',
      sportsName:'Swimming - Pool',
      sportsTime:'3pm',
      centreName:'Machaxi Play9 Sports Centre, Whitefield',
      centreAddress:'68/1, 1, near Parijatha Farm, Whitefield, Siddapura.',
      numberOfGuests:'None',
      gameNameData:{
          title: "Swimming",
          id:1,
          color:'green',
          // bgColor:'yellow'
      },
  },
  {
      // icon:require("./../../images/intermediate.png"),
      title: "Next Session - Today",
      by:'2',
      titleColor:'#FF9C33',
      sportsName:'Swimming - Pool',
      sportsTime:'2-3pm',
      centreName:'Machaxi Play9 Sports Centre, Whitefield',
      centreAddress:'68/1, 1, near Parijatha Farm, Whitefield, Siddapura.',
      numberOfGuests:'None'
  },
  {
      // icon:require("./../../images/advance.png"),
      title: "Advance",
      by:'8',
      titleColor:'#FE6E88',
      sportsName:'Swimming - Pool',
      sportsTime:'3pm',
      centreName:'Machaxi Play9 Sports Centre, Whitefield',
      centreAddress:'68/1, 1, near Parijatha Farm, Whitefield, Siddapura.',
      numberOfGuests:'None'
  },
  {
      // icon:<Intermediate height={50} width={50} />,
      // icon:'./../../images/intermediate.svg',
      title: "Professional",
      by:'5',
      titleColor:'#DB64FF',
      sportsName:'Swimming - Pool',
      sportsTime:'3pm',
      centreName:'Machaxi Play9 Sports Centre, Whitefield',
      centreAddress:'68/1, 1, near Parijatha Farm, Whitefield, Siddapura.',
      numberOfGuests:'5',
    },
];

const PresSectionData={
      currentRatingColor:'#FF9C33',
      currentRating:'Intermediate',
      icon:require("./../../images/badminton_icon.png"),
      sportTitle:'badminton',
}


const [playDataVisibility,setPlayDataVisibility] =useState(false);
const [defaultTab, setDefaultTab] = useState("");
const [tabKey, setTabKey] = useState(2);
const [expiryDate,setExpiryDate] =useState('2nd march, 2023');
const [purchasedDate,setPurchasedDate] =useState('2nd February 2023');
const [hoursLeft,setHoursLeft] =useState('28/30');
const [profilePrecentage,setProfilePrecentage] =useState('0.9');
const [gameData,setGameData]=useState(gameNameData);
const [nextSession,setNextSessionData]=useState(NextSessionData);
const [userName,setUserName]=useState('vidushi');
const [profilePic,setProfilePic]=useState(require("./../../images/profile_place_holder.png"));
const [userPref,setUserPref]=useState(PresSectionData);
const [cancelPressed,setCancelPressed]=useState(false);

const [index, setIndex] = React.useState(0);
const [routes] = React.useState([
  { key: 'first', title: 'My Rating' },
  { key: 'second', title: 'Rate Your Peers' },
]);


useEffect(() => {
  console.log("Game updated");
}, [gameData]);

const onGameSelected=(item)=>{
  console.log('vidushi     ' +JSON.stringify(item))

  let index = gameData.findIndex((game) => {
    return game["id"] == item["id"];
  });
console.log('index '+ index)
  if(index == -1) return;

  let newData = gameData.map((game) => {
    return {...game, isSelected: false}
  });
  newData[index]["isSelected"] = !newData[index]["isSelected"];
  console.log('index '+ JSON.stringify(newData))
  setGameData([...newData]);
  
}

const renderGameNameBox = ({ item }) => {
  console.log({hey: item})
  return (<GameNameBox
  item={item} 
  onPress={()=>onGameSelected(item)}
  />)
};

 const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#667DDB' }}
    style={{ width:'auto'  , backgroundColor:''}}
    labelStyle={{color:'#FFFFFF' ,fontSize:13,fontWeight:'600',fontFamily:'Nunito-Regular'}}
  />
);
const FirstRoute = () => (
  <>
            <View style={{marginTop:23}}> 
              <FlatList
                  data={gameData}
                  horizontal={true}
                  renderItem={renderGameNameBox}               
              />
            </View>
            <SelfRatingCard
              editSelfRating={null}
            />
            </>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: 'green' }} >
    <Text style={{color:'white'}}>Rate your peers</Text>
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});


const bookSlotPressed=()=>{
  null
};
const onPlayingLevelPress=()=>{
  null
};

const onCancelBookingPress=(item)=>{
  // navigation.navigate("NotificationList");
  setCancelPressed(!cancelPressed);
    // Alert.alert('on Cancel Clicked'+ "  " + item.title)
  }

console.log(userPref.currentRatingColor)
  return (
      <View   style={{flex:1}}>
          <LinearGradient
            colors={['#051732', '#232031']}
            style={{flex:1,paddingBottom:63}}
          >
          <ScrollView style={{height:'100%'}}>

          <ProfileSction
            name={userName}
            image={profilePic}
          />
         
          <PrefSport
            currentRatingColor={userPref.currentRatingColor}
            currentRating={userPref.currentRating}
            icon={userPref.icon}
            sportTitle={userPref.sportTitle}
          />
          <MembershipDetails
            profilePrecentage={profilePrecentage}
            hoursLeft={hoursLeft}
            expiryDate={expiryDate}
            purchasedDate={purchasedDate}
            />
          <NextSessionList
           NextSessionData={nextSession}
           onPlayingLevelPress={onPlayingLevelPress}
           onCancelPress={onCancelBookingPress}
          
          />
          
          <TouchableOpacity activeOpacity={0.8} onPress={() =>
            setPlayDataVisibility(!playDataVisibility)
            }>
              <View style={styles.playingLevelContainer}>
                <Text style={styles.menuHeading}>
                  Playing Level
                </Text>

                <Image
                  style={[styles.arrow_img,{ transform: [{ rotate: playDataVisibility?"180deg":"0deg" }]}]}
                  source={require('../../images/orange_arrow_down.png')}
                />
              </View>
          </TouchableOpacity>

          {/* <Tab.Navigator
            
            >
              <Tab.Screen
                name="Self"
                options={{ tabBarLabel: 'My Rating' }}
                component={SelfRatingCard}
                listeners={{
                  tabPress: e => {
                  },
                }}
              />
              <Tab.Screen
                name="Peers"
                component={SocialTab}
                options={{ tabBarLabel: 'Rate Your Peers' }}
                listeners={{
                  tabPress: e => {
                  },
                }}
              />
            </Tab.Navigator> */}

            
          {playDataVisibility ? <>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: 500 }}
              renderTabBar={renderTabBar}
            />
          </>
            :null
          }
          {cancelPressed ?
            Alert.alert('on Cancel Clicked'+ "  ")
            
            :null}
            
            </ScrollView>  
          </LinearGradient>
          <View
						style={styles.skyFilledButtonView}
					>
						<SkyFilledButton
							onPress={() => {
                    // navigation.navigate(
                    //   "BookSlotCentreSelectionScreen"
                    // );

                navigation.navigate('BookSlotScreen')
								bookSlotPressed
							}}
              >Book Slot</SkyFilledButton>
					</View>
      </View>
    )
}

const styles = StyleSheet.create({

arrow_img: {
  height: 5,
  width: 12,
  resizeMode: 'contain',
},
menuHeading:{
  color: '#FF9C33',
  fontSize: 16,
  fontFamily: 'Nunito-Regular',
  marginTop:2,
  textAlign:'center',

},
skyFilledButtonView:{
  position:'absolute',
  width:"80%",
  alignSelf:'center',
  bottom:12,
},
playingLevelContainer:{
  flexDirection:'row',
  justifyContent:'space-between' ,
  alignItems:'center',
  marginLeft:13,
  marginRight:19,
  marginTop:32,
  marginBottom:14,
},
})
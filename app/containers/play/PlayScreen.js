import React, { useState } from "react";
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
import PlayingLevelStrip from "./PlayingLevelStrip";
// import { createMaterialTopTabNavigator } from "react-navigation";

export default PlayScreen =()=>{

  // const Tab = createMaterialTopTabNavigator();

  const gameNameData=[
    {
        title: "Swimming",
        color:'white',
        isSelected:'true',
        // bgColor:'yellow'
    },
    {
        title: "Badminton",
        id:1,
        color:'#F2AE4D',
        isSelected:'false',
        // bgColor:'yellow'
    },
    {
      title: "tennis",
      id:1,
      color:'white',
      isSelected:'false',
      // bgColor:'yellow'
    },
    {
      title: "Swimming",
      id:1,
      color:'#F2AE4D',
      isSelected:'false',
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
      sportsName:'erioubyft',
      sportsTime:'3pm',
      centreName:'Machaxi Play9 Sports Centre, Whitefield',
      centreAddress:'68/1, 1, near Parijatha Farm, Whitefield, Siddapura.',
      numberOfGuests:'None',
      gameNameitem:{
          title: "Swimming",
          id:1,
          color:'green',
          // bgColor:'yellow'
      },
  },
  {
      // icon:require("./../../images/intermediate.png"),
      title: "Intermediate",
      by:'2',
      titleColor:'#FF9C33',
      sportsName:'erioubyft',
      sportsTime:'3pm',
      centreName:'Machaxi Play9 Sports Centre, Whitefield',
      centreAddress:'68/1, 1, near Parijatha Farm, Whitefield, Siddapura.',
      numberOfGuests:'None'
  },
  {
      // icon:require("./../../images/advance.png"),
      title: "Advance",
      by:'8',
      titleColor:'#FE6E88',
      sportsName:'erioubyft',
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
      sportsName:'erioubyft',
      sportsTime:'3pm',
      centreName:'Machaxi Play9 Sports Centre, Whitefield',
      centreAddress:'68/1, 1, near Parijatha Farm, Whitefield, Siddapura.',
      numberOfGuests:'5',
    },
];

const [playDataVisibility,setPlayDataVisibility] =useState(false);
const [defaultTab, setDefaultTab] = useState("");
const [tabKey, setTabKey] = useState(2);
const [expiryDate,setExpiryDate] =useState('2nd march, 2023');
const [purchasedDate,setPurchasedDate] =useState('2nd February 2023');
const [hoursLeft,setHoursLeft] =useState('28/30');
const [profilePrecentage,setProfilePrecentage] =useState('0.9');


const renderGameNameBox = ({ item },) => {
  console.log({item})
  return (<GameNameBox
  item={item} />)
};

const bookSlotPressed=()=>{
  null
};
const onPlayingLevelPress=()=>{
  null
};
const onCancelBookingPress=()=>{

}


  return (
      <View   style={{flex:1}}>
          <LinearGradient
            colors={['#051732', '#232031']}
            style={{flex:1,paddingBottom:63}}
          >
          <ScrollView style={{height:'100%'}}>

          <ProfileSction
            name={'vidushi'}
            image={require("./../../images/profile_place_holder.png")}
          />
          
          <PrefSport
            currentRatingColor={'#FF9C33'}
            currentRating={'Intermediate'}
            icon={require("./../../images/badminton_icon.png")}
            sportTitle={'badminton'}
          />
          <MembershipDetails
            profilePrecentage={profilePrecentage}
            hoursLeft={hoursLeft}
            expiryDate={expiryDate}
            purchasedDate={purchasedDate}
            />
          <NextSessionList
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
            <View style={{marginTop:23}}> 
              <FlatList
                  data={gameNameData}
                  horizontal={true}
                  renderItem={renderGameNameBox}
                  
              />
            </View>
            <SelfRatingCard
              editSelfRating={null}
            />
            </>
            :null
          }
            
            </ScrollView>  
          </LinearGradient>
          <View
						style={styles.skyFilledButtonView}
					>
						<SkyFilledButton
							onPress={() => {
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
menu: {
  color: '#AFAFAF',
  alignItems: 'flex-start',
  fontSize: 14,
  fontFamily: 'Nunito-Regular',
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
  marginTop:32
},
})
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
        isSelected:'true',
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
]
const [playDataVisibility,setPlayDataVisibility] =useState(false);
const [defaultTab, setDefaultTab] = useState("");
const [tabKey, setTabKey] = useState(2);
const [expiryDate,setExpiryDate] =useState('2nd march, 2023');
const [purchasedDate,setPpurchasedDate] =useState('2nd February 2023');

const renderGameNameBox = ({ item }) => {
  console.log({item})
  return (<GameNameBox
  // navigation={navigation} 
  item={item} />)
};

  return (<View   style={{flex:1}}>
          <LinearGradient
				  colors={['#051732', '#232031']}
				  style={{flex:1,paddingBottom:63}}
				  // start={{ x: 0, y: 0 }} 
				  // end={{ x: 1, y: 1 }}
				 >
        <ScrollView style={{height:'100%'}}>
         {/* <Text>hiiiiiiiiiiiiiiiii</Text> */}
        <ProfileSction
          name={'vidushi'}
          image={require("./../../images/beginner.png")}
        />
        
        <PrefSport
        currentRatingColor={'#FF9C33'}
        currentRating={'Intermediate'}
        icon={require("./../../images/badminton_icon.png")}
        sportTitle={'badminton'}
        
        />
        <MembershipDetails
          profilePrecentage={0.2}
          expiryDate={expiryDate}
          purchasedDate={purchasedDate}
          />
        <NextSessionList
         
        
        />
         <TouchableOpacity activeOpacity={0.8} onPress={() =>
					setPlayDataVisibility(!playDataVisibility)
					}>
					<View style={styles.drawercell}>
						<View style={{flexDirection:'row',justifyContent:'space-between' ,alignItems:'center',marginLeft:13,marginRight:19,marginTop:32}}>
						<Text style={styles.menuHeading}>
							Playing Level
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../../images/orange_arrow_down.png')}
						/>

					</View></View>
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
         </>:null}
          
          </ScrollView>  
          </LinearGradient>
          <View
						style={{
							// marginTop: 12,
              // marginBottom:12,
              // marginLeft:13,
              // marginRight:19,
              position:'absolute',
              width:"80%",
              alignSelf:'center',
              bottom:12,
              // left:13,

						}}
					>

						<SkyFilledButton
							onPress={() => {
								
							}}
              >Book Slot</SkyFilledButton>
					</View></View>
    )
}

const styles = StyleSheet.create({

orange_arrow_img: {
  height: 5,
  width: 12,
  resizeMode: 'contain'
},
menu: {
  color: '#AFAFAF',
  alignItems: 'flex-start',
  fontSize: 14,
  fontFamily: 'Quicksand-Medium',
},
menuHeading:{
  color: '#FF9C33',
  fontSize: 16,
  fontFamily: 'Quicksand-Medium',
  marginTop:2,
  textAlign:'center',
},
})
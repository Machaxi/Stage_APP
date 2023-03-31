import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
  } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { GameNameBox } from "./GameNameBox";
import { SeperatingLine } from "./SeperatingLine";

  
export const NextSessionCard = ({item},onCancelPress,onPlayingLevelPress) => {
    
    console.log({titel:item.gameNameitem})
    console.log('NEXT SCREEN')

    if(item){
        
    const [showPlayingLevel,setShowPlayingLevel] =useState(false);
  return( 
        <View style={styles.container}>
            <LinearGradient
                colors={['(126.53deg, rgba(97, 74, 57, 0.432)', 'rgba(91, 77, 67, 0.102)']}
                style={{borderRadius:20,padding:15,}}>
                <View style={styles.headerContainer}>
                            
                    <Text style={styles.heading} >
                        {item.title}
                    </Text>
                    <TouchableOpacity activeOpacity={0.8} 
                        onPress={() => {onCancelPress}}>
                        <Text style={styles.cancelText}>
                            Cancel Booking
                        </Text>
                    </TouchableOpacity>
                    
                </View>

                <SeperatingLine height={0.6} marginTop={16} marginBottom={14}/>

                <View style={styles.sportsDetail}>
					<Text style={styles.sports}>
                        {item.sportsName}
                    </Text>
                    
                    <Text style={styles.sports}>
                    {item.sportsTime}
                    </Text>
                </View>
              
                <View style={styles.gameContainer}>
                    <GameNameBox
                        paddingHorizontal={12}
                        paddingVertical={2}
                        fontSize={14}
                        marginTop={6}
                        marginLeft={0}
                        onPress={()=>{null}}
                        item={{
                            title: "Swimming",
                            id:1,
                            color:'#1DE490',
                        }}
                    />
                </View >
                <View style={{marginTop:12}}>
                    <Text style={styles.centerName}>
                    {item.centreName}
                    </Text>
                    <Text style={styles.centerAddress}>
                        {item.centreAddress}
                    </Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.numberOfGUests}>
                        Number of guests -   
                        </Text>
                        <Text style={styles.numberOfGUests}>
                        {" " }{item.numberOfGuests} 
                        </Text>
                        </View>
                </View>

                <SeperatingLine  
                    height={0.6} 
                    marginTop={14} 
                    marginBottom={16} 
                    paddingRight={20} 
                    marginLeft={0}
                />
                <TouchableOpacity activeOpacity={0.8} 
                onPress={()=>{
                    setShowPlayingLevel(!showPlayingLevel);
                    onPlayingLevelPress
                    }}
                    >
					<View style={styles.playingPartnerContainer}>
						<Text style={[styles.playingPartnerHeading, {color:'white'}]}>
                        Meet Playing Partners
						</Text>

						<Image
							style={[styles.arrow_img, { transform: [{ rotate: showPlayingLevel?"90deg":"0deg" }]} ]}
							source={require('../../images/ic_drawer_arrow.png')}
						/>

					</View>
				</TouchableOpacity>  
            
                </LinearGradient>
                </View>)
        }else{
            return(<View><Text style={{fontSize:16,color:'white'}}>sorry</Text></View>)
        } 
}

const styles = StyleSheet.create({
    container:{
        borderColor:'#E38D33',
        borderWidth:0.5,
        shadowColor:'rgba(0, 0, 0, 0.2)' ,
        marginHorizontal:12, 
        borderRadius:20,
        marginTop:32,
    },
    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between' ,
        alignItems:'center'
    },
    sportsDetail:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginRight:19
    },
    gameContainer:{
        width:'30%' ,
        justifyContent:'flex-start',
        marginTop:6,
    },
    playingPartnerContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:19,
        fontFamily:'Nunito-Regular',
    },
    heading:{
        color: '#FF9C33',
        fontSize: 16,
        fontFamily: 'Nunito-Regular',
        marginTop:2,
        fontWeight:600
    },
    playingPartnerHeading:{
        color: 'white',
        fontSize: 12,
        fontFamily: 'Nunito-Regular',
        marginTop:2,
        fontWeight:500
    },
    cancelText:{
        color: '#FF7373',
        fontSize: 16,
        fontFamily: 'Nunito-Regular',
        marginTop:2,
        fontWeight:400
    },
    sports:{
        color: 'white',
        fontSize: 14,
        fontFamily: 'Nunito-Regular',
        alignSelf:"flex-start",
        fontWeight:600
     },
    centerName:{
        color: 'white',
        fontSize: 12,
        fontFamily: 'Nunito-Regular',
        fontWeight:400
        
    },
    centerAddress:{
        color: '#A3A5AE',
        fontSize: 10,
        fontFamily: 'Nunito-Regular',
        marginTop:4,
        fontWeight:400
    },
    numberOfGUests:{
        color: '#DFDFDF',
        fontSize: 12,
        fontFamily: 'Nunito-Regular',
        marginTop:14,
        fontWeight:400
    },
    arrow_img: {
        height:12,
        width: 15,
        marginLeft:6,
        alignSelf:'center',
        resizeMode: 'contain'
  	},
    })
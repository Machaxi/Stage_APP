import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Pressable,
    Image,
    TouchableOpacity,
    FlatList
  } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { PeerRatingCard } from "./PeerRatingCard";
import Intermediate from './../../images/intermediate.svg';
import { GameNameBox } from "./GameNameBox";
import { SelfRatingBox } from "./SelfRatingBox";

  
export const NextSessionCard = ({item},onCancelPress,onPlayingLevelPress) => {

  console.log({titel:item.gameNameitem})
  console.log('NEXT SCREEN')
  if(item){
  return( 
  <View style={{borderColor:'#E38D33',borderWidth:1,shadowColor:'rgba(0, 0, 0, 0.2)' ,marginHorizontal:12, borderRadius:20,marginTop:32,}}>
              <LinearGradient
            colors={['rgba(255, 255, 255, 0.068)', 'rgba(255, 255, 255, 0.0102)']}
            style={{borderRadius:6,padding:15,}}
        >
            <View style={{flexDirection:'row',justifyContent:'space-between' ,alignItems:'center',marginTop:15,}}>
						
            	<Text style={styles.heading}
                >
							{item.title}
						</Text>
                        <TouchableOpacity activeOpacity={0.8} 
                        onPress={() => {onCancelPress}}
                    >
						<Text style={styles.cancelText}>
							Cancel Booking
						</Text>
                        </TouchableOpacity>
                        
            </View>
{/* //bordeer line */}
             <View style={{backgroundColor:'white',height:0.6,marginTop:20,}}></View>  

             <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:13,marginRight:19,marginTop:14}}>
						
                        <Text style={styles.sports}>
                        {item.sportsName}
                        </Text>
                        
                        <Text style={styles.sports}>
                        {item.sportsTime}
                        </Text>
                     </View>
              
            <View style={{width:'50%' ,justifyContent:'flex-start',marginTop:6,}}>
            <GameNameBox
            // item={item.gameNameitem}
             item={{
                title: "Swimming",
                id:1,
                color:'green',
                // bgColor:'yellow'
            }}
             />
            </View >
            <View style={{marginLeft:20}}>
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

            <View style={{height: 0.6, marginTop: 14, marginBottom: 16, backgroundColor:'white',paddingLeft:15 ,marginLeft:20,marginRight:20}}></View>
            
            <TouchableOpacity activeOpacity={0.8} 
            onPress={()=>{onPlayingLevelPress}}
                    >
					<View style={{flexDirection:'row',alignItems:'center',marginLeft:13,marginRight:19}}>
						<Text style={[styles.heading, {color:'white'}]}>
							Playing Level
						</Text>

						<Image
							style={styles.arrow_img}
							source={require('../../images/ic_drawer_arrow.png')}
						/>

					</View>
				</TouchableOpacity>  
            
                </LinearGradient>
                </View>)
// return(<View>
//     <Text style={{fontSize:16,color:'white'}}>{item.title}</Text>
//     <Text style={{fontSize:16,color:'white'}}>dfghjkl</Text>
//     <Text style={{fontSize:16,color:'white'}}>dfghjkl</Text>
//     <Text style={{fontSize:16,color:'white'}}>dfghjkl</Text>
//     <Text style={{fontSize:16,color:'white'}}>dfghjkl</Text> 
// </View>)
        }else{
            return(<View><Text style={{fontSize:16,color:'white'}}>sorry</Text></View>)
        } 
}

const styles = StyleSheet.create({

    
    menu: {
      color: '#AFAFAF',
      alignItems: 'flex-start',
      fontSize: 14,
      fontFamily: 'Quicksand-Medium',
    },
    heading:{
      color: '#FF9C33',
      fontSize: 16,
      fontFamily: 'Quicksand-Medium',
      marginTop:2,
    //   textAlign:'center',
    },
    cancelText:{
        color: '#FF7373',
        fontSize: 16,
        fontFamily: 'Quicksand-Medium',
        marginTop:2,
        // textAlign:'center',
      },
    sports:{
        color: 'white',
        fontSize: 14,
        fontFamily: 'Quicksand-Medium',
        // marginTop:44,
        // textAlign:'center',
        alignSelf:"flex-start"
     },
    centerName:{
        color: 'white',
        fontSize: 12,
        fontFamily: 'Quicksand-Medium',
        marginTop:12,
        // textAlign:'center',
        
    },
    centerAddress:{
        color: 'white',
        fontSize: 10,
        fontFamily: 'Quicksand-Medium',
        marginTop:4,
    },
    numberOfGUests:{
        color: 'white',
        fontSize: 12,
        fontFamily: 'Quicksand-Medium',
        marginTop:12,
    },
    arrow_img: {
        		height: 5,
        		width: 12,
                alignSelf:'center',
        		resizeMode: 'contain'
        	},
    })
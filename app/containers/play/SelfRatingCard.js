import React, { useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet
  } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { PeerRatingCard } from "./PeerRatingCard";
import { SelfRatingBox } from "./SelfRatingBox";
import { SeperatingLine } from "./SeperatingLine";

  
export const SelfRatingCard = ({editSelfRating}) => {

    const data= [
        {
            icon:require("./../../images/beginner.png"),
            title: "Beginner",
            id:1,
            by:'4',
            titleColor:'#21D096'
        },
        {
            icon:require("./../../images/intermediate.png"),
            title: "Intermediate",
            by:'2',
            titleColor:'#FF9C33'
        },
        {
            icon:require("./../../images/advance.png"),
            title: "Advance",
            by:'8',
            titleColor:'#FE6E88'
        },
        {
            // icon:<Intermediate height={50} width={50} />,
            icon:'./../../images/intermediate.svg',
            title: "Professional",
            by:'5',
            titleColor:'#DB64FF'
          }
      ]
      useEffect(() => {       
        
      }, [])

      const renderSocialFeedCard = ({ item }) => {
        console.log({item})
        return (<PeerRatingCard 
        item={item} />)
    };
  
  return(
    <View style={styles.container}>
       <LinearGradient
            colors={['(rgba(255, 255, 255, 0.068)', 'rgba(255, 255, 255, 0.0102)']}
            style={styles.gradient}
        >
        <View style={styles.headerContainer}>
            <Text 
                style={styles.header}
            >Self Rating </Text>
            <TouchableOpacity activeOpacity={.8} onPress={() => {
                    {editSelfRating}
                    }}>

                <View style={{ flexDirection: 'row',marginLeft:16 }}>
                    <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={require('../../images/edit_profile.png')}
                    ></Image>

                    <Text
                        style={styles.edit}
                    >
                        Edit
                    </Text>
                </View>
		    </TouchableOpacity>
        </View>
            <SelfRatingBox
                title={'Beginner'}
                titleColor={'#21D096'}
                imageSize={17}
               icon={require("./../../images/beginner.png")}/>

        <SeperatingLine 
            marginTop={22} 
            marginBottom={0} 
            marginLeft={20} 
            />
        <Text style={styles.peersRating}>Peers rating</Text>
      
        <FlatList
                data={data}
                renderItem={renderSocialFeedCard}
            />

        </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
gradient:{
    borderRadius:10,
    shadowOpacity:0.2 ,
    shadowColor:'rgba(0, 0, 0, 0.2)',
    borderColor:'rgba(0, 0, 0, 0.2)'
},
container:{
    marginHorizontal:12,
    marginTop:20,
    borderColor:'rgba(0, 0, 0, 0.2)',
    borderWidth:0.5
},
headerContainer:{
    flexDirection:'row',
    marginTop:20,
    alignItems:'center',
    marginBottom:13
},
header:{
    color: '#DFDFDF',
    fontFamily: 'Nunito-Regular',
    fontSize: 14, 
    marginLeft: 20,
},
image:{
    width: 9,
    height: 9, 
    borderRadius: 8,
},
edit:{
    color: '#667DDB',
    fontFamily: 'Nunito-Regular',
    fontSize: 10, 
    marginLeft: 4,
},
peersRating:{
    color:'#DFDFDF',
    fontSize: 12, 
    marginTop:21,
    marginLeft:20,
    fontFamily:'Nunito-Regular',
    fontWeight:'500'
},



})
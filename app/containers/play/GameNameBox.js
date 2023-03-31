import React, {  useState } from "react";
import {
  StyleSheet,
    Text,
    TouchableOpacity
  } from "react-native";

  
export const GameNameBox = ({ item,paddingHorizontal, paddingVertical, height,borderRadius,fontSize,marginTop,onPress}) => {
   
  const [isSelected,setIsSelected]=useState(false)
  console.log({item})
  console.log('in game box')
  console.log({isSelected:item['isSelected']})

  // useEffect(() => {
  //   setIsSelected(item['isSelected'])
  // }, [] );

  return(
        <TouchableOpacity activeOpacity={.8}
          style={
            [styles.rounded_button ,
            {
              borderColor:isSelected?'#F2AE4D':item['color'], 
              marginTop:marginTop?marginTop:6,
              paddingHorizontal:paddingHorizontal?paddingHorizontal:20,
              paddingVertical:paddingVertical?paddingVertical:6,
              height:height?height:null,
              borderRadius:borderRadius?borderRadius:20,
            }
            ]
          }
          onPress={()=>{ onPress?onPress:
            setIsSelected(!isSelected)
          }}
          >
          <Text
              style={{
                  color:isSelected?'#F2AE4D':item['color'],
                  fontSize:fontSize?fontSize:14,
                  textAlign: 'center',
                  fontFamily: 'Nunito-Regular',
                  fontWeight:'400',
              }}>
              {item['title']}
          </Text>
        </TouchableOpacity>
  )}

  const styles = StyleSheet.create( {
    rounded_button: {
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1,
        height: 42,
        borderRadius: 20,
    },
  })
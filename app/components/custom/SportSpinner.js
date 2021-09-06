import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const SportSpinner = (props) => {


return (
    
<TouchableOpacity
    onPress={props.onClicked}
    style={{flex:1, backgroundColor:"#FF0000", zIndex:2}}
    activeOpacity={.8}
>
<View style={styles.container}>

<Text
    style={styles.textStyle}
>{props.displayText}</Text>

{
    <Image
        style={styles.dropDownIcon}
        source={require('../../images/white_drop_down.png')}
        resizeMode="contain"
        style={styles.dropDownIcon}
    />}

</View>

</TouchableOpacity>

)
}
const styles = StyleSheet.create({
    container: {
        height:35,
        backgroundColor:"#667DDB",
        paddingLeft: 20,
        flex:1,
        width:"100%",
        flexDirection: 'row',
        alignItems: 'center',
        
        
    },
    textStyle:{
        fontFamily: 'Quicksand-Medium',
        fontSize: 14,
        color: 'white',
        textDecorationLine:'underline'
    },
    dropDownIcon:{
        width: 8,
        marginLeft: 6,
        height: 6,
        marginTop:4
    }
   

});
export default SportSpinner;
import React from 'react'
import { Text, StyleSheet,View,TouchableOpacity,Image } from 'react-native';
import globalStyles from "../../mystyle"
const RadioSelectorItem = (props) => {
    return (
        <View style={{
            flexDirection: 'row',
            marginTop: 10
        }} >
                <Image
                    style={{
                        width: 16,
                        height: 16,
                        marginRight: 8
                    }}
                    source={
                        props.isSelected ? require('../../images/ic_radio_button_checked.png')
                            : require('../../images/ic_radio_button_unchecked.png')
                    } />
                <Text style={globalStyles.LabelRegular}>{props.data.name}</Text>


        </View>
    );
}
const style = StyleSheet.create({
    container: {
        marginTop:5,
        marginBottom:10,
        marginRight:10,
        marginLeft:2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

});
export default RadioSelectorItem;
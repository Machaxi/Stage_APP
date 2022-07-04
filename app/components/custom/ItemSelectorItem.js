import React from 'react'
import { Text, StyleSheet } from 'react-native';

const ItemSelectorItem = (props) => {
    return (
        <Text style={{...style.container, backgroundColor: props.isSelected?'#667DDB':"#FFFFFF", color: props.isSelected?'#FFFFFF':"#404040"}}>{props.data.label}</Text>
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
export default ItemSelectorItem;
import React from 'react'
import { FlatList, TouchableOpacity, View,Text } from 'react-native';
import RadioSelectorItem from './RadioSelectorItem';

const RadioSelector = (props) =>{
    const isItemSelected = (item)=>{
       return item.id == props.selectedItem;
    }
    const renderItem = ({item})=>{
        return (
            <TouchableOpacity onPress={()=>props.onItemSelected(item)}>
                <RadioSelectorItem data={item} isSelected={isItemSelected(item)} />
            </TouchableOpacity>
        );
    }

    return (
       
    <View style={{marginTop:10}}>
        <FlatList data={props.data}
        scrollEnabled={false}
        numColumns="1"
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={props.selectedItem}
        />

    </View>);
}

export default RadioSelector;
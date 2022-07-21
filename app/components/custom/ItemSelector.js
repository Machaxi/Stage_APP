import React from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native';
import ItemSelectorItem from './ItemSelectorItem';

const ItemSelector = (props) =>{
    const isItemSelected = (item)=>{
       return item.value == props.selectedItem;
    }
    const renderItem = ({item})=>{
        return (
        <TouchableOpacity onPress={()=>props.onItemSelected(item)}>
            <ItemSelectorItem data={item} isSelected={isItemSelected(item)} />
        </TouchableOpacity>
        );
    }

    return (
    <View style={{marginTop:10}}>
        <FlatList data={props.data}
        scrollEnabled={false}
        numColumns={props.numColumns}
        renderItem={renderItem}
        keyExtractor={(item) => item.value}
        extraData={props.selectedItem}
        />

    </View>);
}
ItemSelector.defaultProps={
    numColumns: 2
}
export default ItemSelector;
import React from 'react'
import { View, FlatList } from 'react-native'
import LabelValueDisplayItem from './LabelValueDisplayItem';

const LabelValueDisplay = (props) => {

    const renderItem = ({ item }) => {
        return (
            <LabelValueDisplayItem data={item} />
        );
    }

    return (
        <View style={{ marginTop: 10 }}>
            <FlatList data={props.data}
                scrollEnabled={false}
                renderItem={renderItem}
                keyExtractor={(item) => item.value}
            />

        </View>);

}

export default LabelValueDisplay;

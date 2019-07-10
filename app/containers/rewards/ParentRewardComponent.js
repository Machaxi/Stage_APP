import React from 'react'

import { View, ScrollView, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { CustomeCard } from '../../components/Home/Card'

class ParentRewardComponent extends React.Component {

    constructor(props) {
        super(props)
        
    }

    componentDidMount() {

        console.warn('hjhc', this.props.jumpTo)
        this.setState({
            coactList: this.props.jumpTo.coaches
        })
    }



    render() {

        <View>
            <Text>{this.props.title}</Text>
        </View>


    }
}

export default ParentRewardComponent;

const styles = StyleSheet.create({
    labelText: {
        marginBottom: 5,
        color: '#A3A5AE',
        fontSize: 10,

        // backgroundColor: 'blue',
    },
}
);
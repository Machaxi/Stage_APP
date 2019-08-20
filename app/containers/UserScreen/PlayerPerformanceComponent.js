import React from 'react'

import { View, ScrollView, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Image, TextInput } from 'react-native'
import { SwitchButton, CustomeButtonB } from '../../components/Home/SwitchButton'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { getData, storeData } from "../../components/auth";
import { getAcademyListing, getPlayerRewardDue, saveParentRewardData } from "../../redux/reducers/RewardReducer";
import { connect } from 'react-redux';
import moment from 'moment'
import { Card } from 'react-native-paper';

class PlayerPerformanceComponent extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            following_diet: '',
            love_game: '',
            month: '',
            year: '',
            batch_id: '',
            parent_player_id: '',
            response: [],
            data: [],
            player_due: [],
            selected_item: null,
            alert: '',
            success_dialog: false,
            name: '',
            player_history: []
        }

    }

    componentDidMount() {

    }


    render() {

        return (
            <View style={styles.performanceContainer}>
                 <Card style={styles.performanceCard}>
                    <Text>Deepika</Text> 
                 </Card>
                  <Card style={styles.performanceCard}>
                    <Text>Deepika</Text> 
                 </Card>
            </View>
        )

    }
}

const mapStateToProps = state => {
    return {
        data: state.RewardReducer,
    };
};
const mapDispatchToProps = {
    getPlayerRewardDue, saveParentRewardData
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPerformanceComponent);


const styles = StyleSheet.create({
    performanceContainer: {
        flex: 1,
        fontFamily: 'Quicksand-Regular',
        backgroundColor: '#F7F7F7',
    },
    performanceCard: {
        borderRadius: 16,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 14,
        elevation: 2,
        paddingHorizontal: 12,
        paddingVertical: 16
    },
}
);

import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import * as Progress from 'react-native-progress';

import { View, TextInput, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-paper'
import { SwitchButton, CustomeButtonB } from '../../../components/Home/SwitchButton'
import { CustomeCard } from '../../../components/Home/Card'
import { getPerformenceDuePlayer } from "../../../redux/reducers/PerformenceReducer";
import { getData } from "../../../components/auth";
import { connect } from 'react-redux';
import moment from 'moment';
import { COACH, ACADEMY } from '../../../components/Constants';
import BaseComponent, { defaultStyle } from '../../BaseComponent'

class PerformencePlayerList extends BaseComponent {

    constructor(props) {
        super(props)
        this.inputRefs = {

            acedemic: null

        };
        this.state = {

            //  coach_profile:null,
            country: undefined,
            billingchecked: false,
            playerList: null,
            batchDetails: null,
            attendenceDate: '26-JUNE-2019',
            searchtxt: '',
            isSearching: false,
            searchArray: null
        }
    }

    componentDidMount() {
        var userData;
        getData('header', (value) => {
            console.log("header", value);
        });

        console.log("CoachDashboard");
        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            this.setState({
                userData: JSON.parse(value)
            });
            console.log("userData.user", userData.user['user_type'])
            let userType = userData.user['user_type']

            if (userType == COACH || userType == ACADEMY) {

                //const yourDate = Date()

                // const NewDate = moment(this.state.attendenceDate).format('YYYY-MM-DD')
                // console.log("savePlaye",NewDate)
                this.getPerformencePlayerData(this.props.navigation.getParam('batch_id'), this.props.navigation.getParam('month'), this.props.navigation.getParam('year'))

            }


        });
    }

    getPerformencePlayerData(btach_id, month, year) {
        getData('header', (value) => {
            console.log("header", value, btach_id);
            this.props.getPerformenceDuePlayer(value, btach_id, month, year).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.performencedata);
                console.log(' user response payload ' + user);
                let user1 = JSON.parse(user)

                if (user1.success == true) {
                    this.setState({
                        playerList: user1.data['players'],
                        batchDetails: user1.data['batch'],
                        searchArray: user1.data['players']
                    })
                }

            }).catch((response) => {
                //handle form errors
                console.log(response);
            })

        });

    }




    renderItem = ({ item }) => (
        <TouchableOpacity key={item} onPress={() => {

            console.warn("Touch Press")

            this.props.navigation.navigate('UpdatePlayerPerformence', {
                batch_id: this.props.navigation.getParam('batch_id'), player_id: item.id, 
                month: this.props.navigation.getParam('month'), 
                year: this.props.navigation.getParam('year'),
                data:JSON.stringify(item)
            })

        }}>

            <View style={{
                flex: 1,
                margin: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Text style={defaultStyle.regular_text_14}>
                    {item.name}
                </Text>

                <Image source={require('../../../images/forward.png')}
                    resizeMode="contain"
                    style={{
                        width: 5,
                        height: 11
                    }} />

            </View>
        </TouchableOpacity>

    );

    find(query) {
        const { playerList } = this.state;

        if (query === '') {
            return playerList;
        }
        try {
            const regex = new RegExp(`${query.trim()}`, 'i');
            console.log('regex ', regex)

            return playerList.filter(item => item.name.search(regex) >= 0);
        } catch (e) {
            // alert(e);
            return false;
        }

    }




    render() {
        if (this.props.data.loading && !this.state.player_profile) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }
        if (this.state.batchDetails) {
            const { batch_name, batch_category, total_players, remaining_players, batch_id, session } = this.state.batchDetails

           
            return <View style={{ flex: 1, marginTop: 0, backgroundColor: 'white' }}>


                <View style={{ backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', margin: 12, }}>
                        <View style={{ width: 130 }}>
                            <Text style={[defaultStyle.bold_text_10, { marginBottom: 5, color: '#A3A5AE' }]}>Batch name</Text>
                            <Text style={defaultStyle.regular_text_14}>{batch_name} </Text>
                        </View>

                        <View style={{ width: 130 }}>
                            <Text style={[defaultStyle.bold_text_10, { marginBottom: 5, color: '#A3A5AE' }]} >Category</Text>
                            <Text style={defaultStyle.regular_text_14}>{batch_category}</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginLeft: 12, }}>
                        <View style={{ width: 130 }}>
                            <Text style={[defaultStyle.bold_text_10, { marginBottom: 5, color: '#A3A5AE' }]} >Total players</Text>
                            <Text style={defaultStyle.regular_text_14}>{total_players} </Text>
                        </View>

                        <View style={{ width: 130 }}>
                            <Text style={[defaultStyle.bold_text_10, { marginBottom: 5, color: '#A3A5AE' }]} >Update remaining</Text>
                            <Text style={defaultStyle.regular_text_14}>{remaining_players}</Text>
                        </View>
                        <View style={{ width: 130 }}>
                            <Text style={[defaultStyle.bold_text_10, { marginBottom: 5, color: '#A3A5AE' }]} >Month</Text>
                            <Text style={defaultStyle.regular_text_14}>{moment('06-' + this.props.navigation.getParam('month') + '-' + this.props.navigation.getParam('year')).format('MMM YY')}</Text>
                        </View>

                    </View>
                    <View>

                    </View>
                    <TextInput
                        // autoFocus
                        style={{
                            height: 40,
                            marginLeft: 12,
                            marginRight: 12,
                            marginTop: 24,
                            marginBottom: 16,
                            paddingLeft: 10,
                            fontFamily: '',
                            borderWidth: 0.5,
                            fontFamily: 'Quicksand-Regular',
                            fontSize: 14,
                            borderColor: '#CECECE', borderRadius: 15
                        }}
                        onChangeText={value => {

                            const data = this.find(value);
                            // this.state.searchArray = data;
                            this.setState({
                                searchtxt: value,
                                searchArray: data
                            })

                        }}
                        placeholder={'Search Students'}
                        value={this.state.searchtxt}
                    />
                </View>

                <View style={{
                    paddingTop: 16,
                    paddingBottom: 16,
                    paddingRight: 12,
                    paddingLeft: 12,
                    backgroundColor: '#F7F7F7',
                    flexDirection: 'row', justifyContent: 'space-between'
                }}>
                    <Text style={[defaultStyle.bold_text_10, { color: '#A3A5AE' }]}>Name </Text>

                </View>


                <FlatList
                    data={this.state.searchArray}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => item.id}
                />

            </View >;
        } else {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                </View>
            )
        }
    }
}
const mapStateToProps = state => {
    return {
        data: state.PerformenceReducer,
    };
};
const mapDispatchToProps = {
    getPerformenceDuePlayer
};
export default connect(mapStateToProps, mapDispatchToProps)(PerformencePlayerList);


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        // paddingVertical: 12,
        //paddingHorizontal: 10,
        borderWidth: 0,
        borderColor: '#D3D3D3',
        borderRadius: 4,
        color: 'white',
        // paddingLeft: 10,

        // alignItems: 'stretch',
        // // justifyContent: 'right',
        alignSelf: 'center',
        height: 40,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5
        // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#614051',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

const styles = StyleSheet.create({
    navBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // backgroundColor: 'green'
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    rightIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginRight: 20
        //backgroundColor: 'white',
    },

    scoreBox: {
        color: 'white',
        marginRight: 20,
        textAlign: 'right', fontSize: 24, fontWeight: 'bold'
    },
    buttomButton: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,

        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: -5,
        marginLeft: -5,
        marginRight: -5,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 1 }, borderBottomRightRadius: 10, borderBottomLeftRadius: 10

    }


});
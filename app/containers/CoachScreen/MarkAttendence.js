
import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import * as Progress from 'react-native-progress';

import { View, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-paper'
import { SwitchButton, CustomeButtonB } from '../../components/Home/SwitchButton'
import { CustomeCard } from '../../components/Home/Card'
import { getCoachBatchAttendence, saveCoachBatchAttendence } from "../../redux/reducers/BatchReducer";
import { getData } from "../../components/auth";
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements'
import moment from 'moment';
import BaseComponent, { defaultStyle } from '../BaseComponent'
const acedemicList = [
    {
        label: 'India',
        value: 'IN',
    }

];

const placeholder = {
    label: 'Select Option',
    value: null,
    color: '#9EA0A4',
};
var deviceWidth = Dimensions.get('window').width - 20;

class MarkAttendence extends BaseComponent {

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
            if (userData.user['user_type'] == 'COACH') {

                this.getCoachAttendencedData(this.props.navigation.getParam('batch_id'))

            }


        });
    }

    getCoachAttendencedData(btach_id) {
        getData('header', (value) => {
            console.log("header", value, btach_id);
            this.props.getCoachBatchAttendence(value, btach_id).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.batchdata);
                console.log(' user response payload ' + user);
                let user1 = JSON.parse(user)

                if (user1.success == true) {
                    this.setState({
                        playerList: user1.data['players'],
                        batchDetails: user1.data['batch']

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

            // this.props.navigation.navigate('OrderTracking', {
            //     order_id: item.increment_id
            // })

        }}>
            <View style={{ marginLeft: 0, marginRight: 10, flex: 1, flexDirection: 'row', height: 50 }}>

                <View style={{
                    flex: 1,
                    marginLeft: 8,
                    marginRight: 15,
                    marginBottom: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={defaultStyle.regular_text_14}>
                        {item.name}
                    </Text>
                    <View style={{ backgroundColor: 'white', marginTop: -10 }}>
                        <CheckBox style={{ height: 30, width: 30, alignItems: 'center', backgroundColor: 'red' }}
                            // title='a'
                            checked={item.is_present}
                            onPress={() => {
                                console.log("he;eleleo", item.is_present)
                                let playerList = [...this.state.playerList];
                                let index = playerList.findIndex(el => el.id === item.id);
                                playerList[index] = { ...playerList[index], is_present: !item.is_present };
                                this.setState({ playerList });

                                //   item.isPresent = !item.isPresent
                                // this.setState({
                                //     playerList:item
                                // })

                                console.log("he;eleleo", playerList[0].is_present)
                            }


                            }
                        />
                    </View>

                </View>


            </View>
        </TouchableOpacity>

    );

    renderFooterItem = () => (

        <View style={{ flex: 1, marginBottom: 30, marginRight: 20, marginLeft: 20, justifyContent: 'flex-end' }}>

            <CustomeButtonB onPress={() => { this.savePlayerAttendence() }}>
                Update
       </CustomeButtonB>


        </View>
    );



    savePlayerAttendence() {

        getData('header', (value) => {
            console.log("savePlayerAttendence header", value);
            const yourDate = Date()
            console.log("savePlaye", yourDate)
            const NewDate = moment(yourDate).format('YYYY-MM-DD')
            console.log("savePlayerAttendence", NewDate);
            var dataDic = {};
            var dict = {};
            dict['batch_id'] = this.props.navigation.getParam('batch_id')//user.phoneNumber;
            dict['attendance_date'] = NewDate;
            dict['players'] = this.state.playerList



            dataDic['data'] = dict;
            console.log("dicttttc ", dict)

            this.props.saveCoachBatchAttendence(value, this.props.navigation.getParam('batch_id'), dataDic).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.batchdata);
                console.log(' user response payload ' + user);
                let user1 = JSON.parse(user)

                if (user1.success == true) {
                    // this.setState({
                    //     // playerList:user1.data['players'],
                    //     // batchDetails:user1.data['batch']
                    //
                    // })
                }

            }).catch((response) => {
                //handle form errors
                console.log(response);
            })

        });
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
            const { batch_name, batch_category, batch_id, session } = this.state.batchDetails

            // this.attedenceMangement(attandence_batch)
            //
            // this.sessionMangement(operations)
            // this.scoreMangement(tournaments)

            return <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>


                <View style={{ backgroundColor: 'white' }}>
                    <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={defaultStyle.bold_text_14}>Batch 1 : {batch_name} </Text>
                        <Text style={defaultStyle.bold_text_14}>{batch_category} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20, marginTop: -10, }}>
                        <View style={{ marginTop: 5 }}>
                            <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 10, marginBottom: 10 }}>Date </Text>
                            <Text style={defaultStyle.regular_text_14}>{session.session_date} </Text>

                        </View>
                        <View style={{ marginTop: 5 }}>
                            <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 10, marginBottom: 10 }}>Time slot </Text>
                            <Text style={defaultStyle.regular_text_14}>{session.start_time + ' - ' + session.end_time}</Text>
                        </View>
                    </View>
                </View>

                <View style={{
                    marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 10,
                    flexDirection: 'row', justifyContent: 'space-between'
                }}>
                    <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 14, marginBottom: 10 }}>Player </Text>
                    <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 14 }}>Present </Text>
                </View>

                <View style={{ backgroundColor: 'white', marginTop: -10, flex: 1 }}>
                    <CustomeCard>

                        <FlatList
                            data={this.state.playerList}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => item.id}
                            ListFooterComponent={this.renderFooterItem}
                        />
                    </CustomeCard>

                </View>













            </View>;
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
        data: state.BatchReducer,
    };
};
const mapDispatchToProps = {
    getCoachBatchAttendence, saveCoachBatchAttendence
};
export default connect(mapStateToProps, mapDispatchToProps)(MarkAttendence);


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
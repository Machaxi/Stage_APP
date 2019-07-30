
import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import * as Progress from 'react-native-progress';

import { View, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-paper'
import { SwitchButton, CustomeButtonB } from '../../../components/Home/SwitchButton'
import { CustomeCard } from '../../../components/Home/Card'
import { getCoachBatchAttendenceDetails } from "../../../redux/reducers/BatchReducer";
import { getData } from "../../../components/auth";
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements'
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import { defaultStyle } from '../../BaseComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import { ACADEMY, COACH } from '../../../components/Constants';


class CoachAttendenceBook extends React.Component {

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
            attendenceDate: '10-JULY-2019',
            batch_data: null,
            spinner: false
        }
        this.state.batch_data = this.props.navigation.getParam('batch_data', undefined)
        console.warn('batch_data => ', this.state.batch_data)
    }

    progress(status) {
        this.setState({
            spinner: status
        })
    }

    componentDidMount() {
        var userData;
        let batch_id = this.props.navigation.getParam('batch_id')


        console.log("CoachDashboard");
        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            this.setState({
                userData: JSON.parse(value)
            });
            console.log("userData.user", userData.user['user_type'])
            let userType = userData.user['user_type']

            if (userType == COACH || userType == ACADEMY) {

                const yourDate = Date()

                const NewDate = moment(this.state.attendenceDate).format('YYYY-MM-DD')
                console.log("savePlaye", NewDate)
                this.getCoachAttendencedData(batch_id, NewDate)

            }
        });
    }

    getCoachAttendencedData(btach_id, date) {
        this.progress(true)

        getData('header', (value) => {
            console.log("header", value, btach_id);
            this.props.getCoachBatchAttendenceDetails(value, btach_id, date).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                this.progress(false)

                let user = JSON.stringify(this.props.data.batchdata);
                console.log(' getCoachBatchAttendenceDetails response payload ' + user);
                let user1 = JSON.parse(user)

                if (user1.success == true) {
                    this.setState({
                        playerList: user1.data['players'],
                        batchDetails: user1.data['batch']

                    })
                }

            }).catch((response) => {
                //handle form errors
                console.warn(response);
                this.progress(false)
            })

        });

    }


    renderItem = ({ item }) => (

        <View
            style={{
                backgroundColor: 'white',
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
                paddingBottom: 20
            }}>

            <TouchableOpacity key={item} onPress={() => {

                console.warn("Touch Press")

                // this.props.navigation.navigate('OrderTracking', {
                //     order_id: item.increment_id
                // })

            }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>


                    <Text
                        style={[defaultStyle.regular_text_14, {
                            width: "50%"
                        }]}
                    >
                        {item.name}
                    </Text>
                    <Text
                        style={[defaultStyle.regular_text_14, {
                            width: "25%"
                        }]} >
                        {item.attendance + '%'}
                    </Text>
                    <Text
                        style={[defaultStyle.regular_text_14, {
                            width: "25%"
                        }]} > {item.is_present ? 'P' : 'A'}
                    </Text>


                </View>
            </TouchableOpacity>
        </View>

    );






    render() {
        // if (this.props.data.loading && !this.state.player_profile) {
        //     return (
        //         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        //             <ActivityIndicator size="large" color="#67BAF5"/>
        //         </View>
        //     )
        // }
        // const { batch_name, batch_category, batch_id, session } = this.state.batchDetails

        let batch_name = this.state.batch_data.batch_name
        let batch_category = this.state.batch_data.batch_category
        let session = this.state.batch_data.session
        let batch_id = this.state.batch_data.batch_id

        if (this.state.batchDetails) {

            // this.attedenceMangement(attandence_batch)
            //
            // this.sessionMangement(operations)
            // this.scoreMangement(tournaments)

            return <View style={{ flex: 1, marginTop: 0, backgroundColor: '#ffffff' }}>

                <Spinner
                    visible={this.state.spinner}
                    textStyle={defaultStyle.spinnerTextStyle}
                />

                <View style={{ backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
                        <View style={{ justifyContent: 'space-between' }}>
                            <Text style={[defaultStyle.regular_text_10, { color: '#A3A5AE', marginBottom: 5 }]}>Category</Text>
                            <Text style={defaultStyle.regular_text_14}>{batch_category} </Text>
                        </View>

                        <View style={{ justifyContent: 'space-between' }}>
                            <Text style={[defaultStyle.regular_text_10, { color: '#A3A5AE', marginBottom: 5 }]} > Batch name</Text>
                            <Text style={defaultStyle.regular_text_14}>{batch_name} </Text>
                        </View>
                        <View style={{ justifyContent: 'space-between' }}>
                            <Text style={[defaultStyle.regular_text_10, { color: '#A3A5AE', marginBottom: 5 }]} > Showing for</Text>
                            <DatePicker
                                textStyle={defaultStyle.regular_text_14}
                                style={[defaultStyle.regular_text_14, { width: 120, borderWidth: 0 }]}
                                date={this.state.attendenceDate}
                                mode="date"
                                placeholder="select date"
                                format="DD-MMM-YYYY"
                                minDate="01-01-2019"
                                maxDate={Date.now()}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                customStyles={{

                                    dateInput: {
                                        borderWidth: 0,
                                        fontSize: 14,
                                        color: '#404040',
                                        fontFamily: 'Quicksand-Regular',
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#A3A5AE'
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(attendenceDate) => {
                                    this.setState({
                                        batchDetails: []
                                    })
                                    const NewDate = moment(attendenceDate).format('YYYY-MM-DD')
                                    console.log("savePlaye", NewDate)
                                    this.getCoachAttendencedData(this.props.navigation.getParam('batch_id'), NewDate)
                                    this.setState({ attendenceDate: attendenceDate })
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20, marginTop: -10, }}>

                        <View style={{ margin: 5 }}>
                            <Text style={[defaultStyle.regular_text_10, { color: '#A3A5AE', marginBottom: 10 }]}>Time slot </Text>
                            <Text style={[defaultStyle.regular_text_14, { color: '#404040' }]}>
                                {/* {session.start_time + ' - ' + session.end_time} */}
                                {moment.utc("01/01/1970 " + session.start_time).local().format("hh:mm a")
                                    + ' - ' +
                                    moment.utc("01/01/1970 " + session.end_time).local().format("hh:mm a")
                                }
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ backgroundColor: '#F7F7F7', padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[defaultStyle.regular_text_10, { width: "50%", color: '#A3A5AE' }]}>Player </Text>
                    <Text style={[defaultStyle.regular_text_10, { width: "25%", color: '#A3A5AE' }]}>Attendence </Text>
                    <Text style={[defaultStyle.regular_text_10, { width: "25%", color: '#A3A5AE' }]}>Session </Text>
                </View>

                {this.state.batchDetails.length != 0 ?
                    <View style={{
                        backgroundColor: 'white',
                    }}>


                        <FlatList
                            data={this.state.playerList}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => item.id}
                        />

                    </View>
                    :
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 16
                        }}
                    >

                        <Text style={defaultStyle.regular_text_14}>No Data found of selected date</Text>
                    </View>

                }


                <View style={{ flex: 1, marginBottom: 30, marginRight: 20, marginLeft: 20, justifyContent: 'flex-end' }}>

                    {/*<CustomeButtonB onPress={() => {this.savePlayerAttendence()}}>*/}
                    {/*Update*/}
                    {/*</CustomeButtonB>*/}


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
    getCoachBatchAttendenceDetails
};
export default connect(mapStateToProps, mapDispatchToProps)(CoachAttendenceBook);


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
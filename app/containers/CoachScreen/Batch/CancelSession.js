import React from 'react'

import { View, ImageBackground, Text, Image, TextInput } from 'react-native'
import { Button } from 'react-native-paper';
import BaseComponent, { defaultStyle } from '../../BaseComponent';
import firebase from "react-native-firebase";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements';
//import firebase from 'react-native-firebase';
import moment from 'moment'
import { getData } from '../../../components/auth';
import { getBatchOperational, cancelBatch } from "../../../redux/reducers/BatchReducer";
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import DatePicker from 'react-native-datepicker'


const formatted_date = 'DD MMM ’YY'

class CancelSession extends BaseComponent {


    constructor(props) {
        super(props)
        this.state = {
            is_single_day: true,
            data: null,
            selected_start_date: '',
            selected_end_date: '',
            academy_id: '',
            coach_id: '',
            spinner: false,
            reason_text: ''
        }


        this.state.selected_start_date = moment().format('YYYY-MM-DD');
        this.state.selected_end_date = moment().format('YYYY-MM-DD');
        console.warn(this.state.selected_start_date)

        getData('userInfo', (value) => {
            userData = JSON.parse(value)

            this.setState({
                academy_id: userData['academy_id'],
                coach_id: userData['coach_id']
            })

            this.getBatchData()
        });

        console.warn('Date => ' + Date.now())
    }

    progress(status) {
        this.setState({
            spinner: status
        })
    }

    getBatchData() {

        //     {
        //         "data" : {
        //                 "is_range" : false,
        //                 "from_date" : "2019-10-21",
        //                 "to_date" : null,
        //                 "academy_id" : 1,
        //                 "coach_id" : 1

        //         }
        // }

        let {
            selected_start_date,
            selected_end_date,
            academy_id,
            coach_id,
            is_single_day } = this.state

        let subData = {}
        let end_date = is_single_day ? null : moment(selected_end_date).format('YYYY-MM-DD')

        subData['is_range'] = !this.state.is_single_day
        subData['from_date'] = moment(selected_start_date).format('YYYY-MM-DD')
        subData['to_date'] = end_date
        subData['academy_id'] = academy_id
        subData['coach_id'] = coach_id

        let data = {}
        data['data'] = subData
        console.warn(JSON.stringify(data))

        this.progress(true)

        getData('header', (value) => {

            this.props.getBatchOperational(value, data).then(() => {
                this.progress(false)

                let user = JSON.stringify(this.props.data.batchdata);
                console.log(' getBatchOperational payload ' + user);
                let user1 = JSON.parse(user)

                if (user1.success == true) {
                    this.setState({
                        data: user1.data['batch_operational'],
                    })
                }

            }).catch((response) => {
                this.progress(false)
                console.log(response);
            })
        });
    }

    selectAll() {

        let data = { ...this.state.data }
        if (data != null && data.batches) {
            let batches = data.batches

            for (let i = 0; i < batches.length; i++) {
                let obj = batches[i]
                obj.is_canceled = true
            }
        }
        this.setState({
            data
        })

    }

    submit() {

        let reason_text = this.state.reason_text
        let is_selected = false
        let data = this.state.data
        let batches = data.batches
        console.log('batch => ,', data.batches)
        if (data != null && data.batches) {
            let batches = data.batches

            for (let i = 0; i < batches.length; i++) {
                let obj = batches[i]
                if (obj.is_canceled) {
                    is_selected = true
                }
            }
        }

        if (reason_text == '') {
            alert('Reason for cancellation can\'t be empty.')
        } else if (!is_selected) {
            alert('Please select at least one batch to cancel.')
        } else {

            let {
                selected_start_date,
                selected_end_date,
                academy_id,
                coach_id,
                is_single_day, reason_text } = this.state

            let subData = {}
            let end_date = is_single_day ? null : moment(selected_end_date).format('YYYY-MM-DD')

            subData['is_range'] = !this.state.is_single_day
            subData['from_date'] = moment(selected_start_date).format('YYYY-MM-DD')
            subData['to_date'] = 
            subData['academy_id'] = academy_id
            subData['coach_id'] = coach_id
            subData['cancelation_reason'] = reason_text
            subData['batches'] = batches
            let data = {}
            data['data'] = subData

            console.log('SubData=> ', JSON.stringify(data))

            this.progress(true)

            getData('header', (value) => {

                this.props.cancelBatch(value, data).then(() => {
                    this.progress(false)

                    let user = JSON.stringify(this.props.data.batchdata);
                    console.log(' cancelBatch payload ' + user);
                    let user1 = JSON.parse(user)

                    if (user1.success == true) {
                        let msg = user1.success_message
                        alert(msg)
                        this.getBatchData()
                    }

                }).catch((response) => {
                    this.progress(false)
                    console.log(response);
                    alert('Something went wrong.')
                })
            });
        }

    }

    getBatchItem(item, index) {
        return (
            <View style={{
                padding: 16,
                backgroundColor: 'white',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center'
            }}>

                <View style={{
                    //alignItems: 'center',
                    //alignSelf: 'center',
                    flex: 1,
                    width: "50%",
                    //alignContent: 'center',
                }}>

                    <Text
                        style={[defaultStyle.regular_text_14, { color: '#000000' }]}>
                        {item.batch_name}
                    </Text>
                </View>

                {/* <View style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    flex: 1,
                    width: "33%",
                    alignContent: 'center',
                }}>

                    <Text
                        style={[defaultStyle.regular_text_14, { color: '#000000' }]}>
                        {item.batch_category}
                    </Text>
                </View> */}

                <View style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    flex: 1,
                    width: "50%",
                    alignContent: 'center',
                }}>

                    <CheckBox
                        containerStyle={{
                            backgroundColor: 'white',
                            borderWidth: 0,
                            padding: 0,
                            margin: 0,
                            //width: "60%",
                        }}
                        onPress={() => {
                            let data = { ...this.state.data };
                            let batches = data.batches


                            let index = batches.findIndex(el => el.batch_id === item.batch_id);
                            console.log("Tournamen Press =>", index)
                            data.batches[index] =
                                { ...data.batches[index], is_canceled: !item.is_canceled };

                            console.log("Tournamen Press =>", JSON.stringify(data))
                            //console.log("Tournamen Press whole => ", this.state.user_selection)
                            this.setState({ data })
                        }}
                        checked={item.is_canceled}

                        style={{
                            color: '#404040',
                            backgroundColor: 'white',
                            fontFamily: 'Quicksand-Regular'
                        }}

                    />
                </View>

            </View>
        )
    }

    render() {


        let selected_start_date = this.state.selected_start_date
        let selected_end_date = this.state.selected_end_date
        let data = this.state.data
        let is_single_day = this.state.is_single_day
        let batch_array = []

        if (data != null && data.batches) {
            let batches = data.batches

            for (let i = 0; i < batches.length; i++) {
                let obj = batches[i]
                batch_array.push(this.getBatchItem(obj, i))
            }
        }


        return (
            <ScrollView
                style={style.container} >

                <View>

                    <Spinner
                        visible={this.state.spinner}
                        textStyle={defaultStyle.spinnerTextStyle}
                    />

                    <View
                        style={{
                            padding: 16
                        }}
                    >
                        <Text
                            style={[defaultStyle.bold_text_10, { color: '#A3A5AE' }]}
                        >Select Date/ Date Range</Text>


                        <View style={{
                            marginTop: 8,
                            flexDirection: 'row'
                        }} >
                            <View style={{
                                flexDirection: 'row'
                            }} >

                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => {
                                        this.setState({
                                            is_single_day: true
                                        })
                                        this.getBatchData()
                                    }}
                                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        style={{
                                            width: 16,
                                            height: 16,
                                            marginRight: 8
                                        }}
                                        source={
                                            is_single_day ? require('../../../images/ic_radio_button_checked.png')
                                                : require('../../../images/ic_radio_button_unchecked.png')
                                        } />
                                    <Text style={defaultStyle.regular_text_14}>Single day</Text>
                                </TouchableOpacity>


                            </View>

                            <View style={{
                                flexDirection: 'row',
                                marginLeft: 20
                            }} >

                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => {
                                        this.setState({
                                            is_single_day: false
                                        })
                                        this.getBatchData()
                                    }}
                                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        style={{
                                            width: 16,
                                            height: 16,
                                            marginRight: 8
                                        }}
                                        source={
                                            !is_single_day ? require('../../../images/ic_radio_button_checked.png')
                                                : require('../../../images/ic_radio_button_unchecked.png')
                                        } />
                                    <Text style={defaultStyle.regular_text_14}>Range</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 25,
                            }}
                        >

                            <View
                                style={{ marginRight: 30 }}
                            >
                                <Text
                                    style={[defaultStyle.bold_text_10, { color: '#A3A5AE' }]}
                                >Choose date</Text>

                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>

                                    <View>

                                        {/* <Text style={[defaultStyle.bold_text_14, { width: 100 }]}>
                                            {moment(selected_start_date).format(formatted_date)}
                                        </Text> */}
                                        {/* <DatePicker
                                            style={{
                                                width: 100,
                                                fontFamily: 'Quicksand-Regular',
                                                marginLeft: -10
                                            }}
                                            mode="date"
                                            placeholder={this.state.selected_start_date}
                                            format="DD-MMM-YYYY"
                                            minDate={Date.now()}
                                            maxDate={Date.now()}
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            showIcon={false}
                                            date={moment(selected_start_date).format(formatted_date)}
                                            customStyles={{
                                                dateInput: {
                                                    fontFamily: 'Quicksand-Regular',
                                                    borderBottomColor: '#fff',
                                                    borderWidth: 0
                                                }
                                            }}
                                            onDateChange={(birthdate) => { this.setState({ selected_start_date: birthdate }) }}
                                        /> */}
                                        <DatePicker
                                            style={{
                                                width: 100, borderWidth: 0,
                                                marginBottom: -2,
                                                marginLeft: -10, borderWidth: 0,
                                                borderColor: 'white',
                                                fontFamily: 'Quicksand-Regular',
                                            }}
                                            date={moment(selected_start_date).format(formatted_date)}
                                            mode="date"
                                            placeholder="select date"
                                            format="DD-MMM-YYYY"
                                            minDate="2018-05-01"
                                            //maxDate={Date.now()}
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            showIcon={false}
                                            customStyles={{

                                                dateInput: {
                                                    borderColor: 'white',
                                                    fontFamily: 'Quicksand-Regular',
                                                }
                                                // ... You can check the source to find the other keys.
                                            }}
                                            onDateChange={(birthdate) => {
                                                this.setState({ selected_start_date: birthdate })
                                                this.getBatchData()
                                            }}
                                        />

                                    </View>

                                    <Image
                                        style={{ width: 8, height: 5 }}
                                        source={require('../../../images/ic_down_arrow.png')} />
                                </View>
                                <View
                                    style={{
                                        width: 110,
                                        marginTop: 2,
                                        backgroundColor: '#A3A5AE',
                                        flex: 1,
                                        height: 1
                                    }}
                                ></View>

                            </View>

                            {!is_single_day ?
                                <View>

                                    <Text
                                        style={[defaultStyle.bold_text_10, { color: '#A3A5AE' }]}
                                    >End date</Text>

                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>

                                        <View>

                                            {/* <Text style={[defaultStyle.bold_text_14, { width: 100 }]}>
                                                {moment(selected_end_date).format(formatted_date)}
                                            </Text> */}
                                            <DatePicker
                                                style={{
                                                    width: 100, borderWidth: 0,
                                                    marginBottom: -2,
                                                    marginLeft: -10, borderWidth: 0,
                                                    borderColor: 'white',
                                                    fontFamily: 'Quicksand-Regular',
                                                }}
                                                date={moment(selected_end_date).format(formatted_date)}
                                                mode="date"
                                                placeholder="select date"
                                                format="DD-MMM-YYYY"
                                                minDate="2018-05-01"
                                                //maxDate={Date.now()}
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                showIcon={false}
                                                customStyles={{

                                                    dateInput: {
                                                        borderColor: 'white',
                                                        fontFamily: 'Quicksand-Regular',
                                                    }
                                                    // ... You can check the source to find the other keys.
                                                }}
                                                onDateChange={(birthdate) => {
                                                    this.setState({ selected_end_date: birthdate })
                                                    this.getBatchData()
                                                }}
                                            />

                                        </View>

                                        <Image
                                            style={{ width: 8, height: 5 }}
                                            source={require('../../../images/ic_down_arrow.png')} />
                                    </View>
                                    <View
                                        style={{
                                            width: 110,
                                            marginTop: 2,
                                            backgroundColor: '#A3A5AE',
                                            flex: 1,
                                            height: 1
                                        }}
                                    ></View>

                                </View> : null
                            }

                        </View>


                    </View>

                    {data != null && data.batches.length > 0 ?
                        <View>

                            <View style={{
                                paddingLeft: 16,
                                paddingRight: 16
                            }}>

                                <Text
                                    style={[defaultStyle.bold_text_10, { marginTop: 30, color: '#A3A5AE' }]}
                                >Reason For cancellation</Text>

                                <TextInput
                                    style={{
                                        textAlignVertical: 'top',
                                        marginTop: 12,
                                        height: 100,
                                        borderColor: '#CECECE',
                                        borderWidth: 1,
                                        borderRadius: 8
                                    }}
                                    onChangeText={(reason_text) => this.setState({ reason_text })}

                                >
                                </TextInput>

                                <Text
                                    style={[defaultStyle.bold_text_14, { marginTop: 16 }]}
                                >Select batch</Text>

                                <View style={{ marginTop: 8, justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text
                                        style={[defaultStyle.bold_text_10, { color: '#A3A5AE' }]}
                                    >{data.batches.length} batch has sessions on this day</Text>

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.selectAll()
                                        }}
                                    >
                                        <Text
                                            style={[defaultStyle.bold_text_10, { color: '#667DDB' }]}
                                        >Select All</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{
                                marginTop: 10,
                                padding: 16,
                                backgroundColor: '#DCDEE7',
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                alignContent: 'center',
                                alignItems: 'center',
                                justifyContent: 'center'

                            }}>

                                <View style={{
                                    //alignItems: 'center',
                                    //alignSelf: 'center',
                                    flex: 1,
                                    width: "50%",
                                    alignContent: 'center',
                                }}>

                                    <Text
                                        style={[defaultStyle.bold_text_10, {
                                            color: '#A3A5AE',
                                        }]}>
                                        Batch name
                            </Text>
                                </View>

                                {/* <View style={{
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    flex: 1,
                                    width: "33%",
                                    alignContent: 'center',
                                }}>
                                    <Text
                                        style={[defaultStyle.bold_text_10, {
                                            color: '#A3A5AE',

                                        }]}>
                                        Type
                            </Text>
                                </View> */}
                                <View style={{
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    flex: 1,
                                    width: "50%",
                                    alignContent: 'center',
                                }}>
                                    <Text
                                        style={[defaultStyle.bold_text_10, {
                                            color: '#A3A5AE',
                                        }]}>
                                        Cancel
                            </Text>
                                </View>

                            </View>

                            {batch_array}


                            <TouchableOpacity activeOpacity={.8}
                                style={style.rounded_button}
                                onPress={() => {
                                    this.submit()
                                }}>
                                <Text style={style.rounded_button_text}>
                                    Cancel session</Text>
                            </TouchableOpacity>

                        </View>
                        :

                        <View
                            style={{
                                alignContent: 'center',
                                alignItems: 'center'
                            }}
                        >

                            <Text style={[defaultStyle.regular_text_14, {
                                alignContent: 'center',
                                justifyContent: 'center',
                                flex: 1,
                                alignItems: 'center'
                            }]}>No batches on selected dates</Text></View>
                    }
                </View>

            </ScrollView >
        );
    }
}
const mapStateToProps = state => {
    return {
        data: state.BatchReducer,
    };
};
const mapDispatchToProps = {
    getBatchOperational, cancelBatch
};
export default connect(mapStateToProps, mapDispatchToProps)(CancelSession);


const style = {
    container: {
        backgroundColor: 'white'
    },
    rounded_button_text: {
        width: "100%",
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium'
    },
    rounded_button: {
        width: '90%',
        padding: 12,
        borderRadius: 24,
        //borderWidth: 1,
        margin: 20,
        borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
}
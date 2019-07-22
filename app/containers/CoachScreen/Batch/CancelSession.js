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
import { getBatchOperational } from "../../../redux/reducers/BatchReducer";
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

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
            spinner: false
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
        let end_date = is_single_day ? null : selected_end_date

        subData['is_range'] = !this.state.is_single_day
        subData['from_date'] = selected_start_date
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

    submitS

    getBatchItem(item, index) {
        return (
            <View style={{
                padding: 16,
                backgroundColor: 'white',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text
                    style={[defaultStyle.regular_text_14, { width: '33%', color: '#000000' }]}>
                    {item.batch_name}
                </Text>
                <Text
                    style={[defaultStyle.regular_text_14, { width: '33%', color: '#000000' }]}>
                    {item.batch_category}
                </Text>

                <CheckBox
                    containerStyle={{
                        backgroundColor: 'white',
                        borderWidth: 0,
                        padding: 0,
                        margin: 0,
                        width: '33%'
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

                                        <Text style={[defaultStyle.bold_text_14, { width: 100 }]}>
                                            {moment(selected_start_date).format(formatted_date)}
                                        </Text>

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

                                            <Text style={[defaultStyle.bold_text_14, { width: 100 }]}>
                                                {moment(selected_end_date).format(formatted_date)}
                                            </Text>

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

                    {data != null ?
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

                            }}>
                                <Text
                                    style={[defaultStyle.bold_text_10, {
                                        width: "33%", color: '#A3A5AE',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1
                                    }]}>
                                    Batch name
                            </Text>
                                <Text
                                    style={[defaultStyle.bold_text_10, {
                                        width: "33%", color: '#A3A5AE'
                                    }]}>
                                    Type
                            </Text>
                                <Text
                                    style={[defaultStyle.bold_text_10, {
                                        width: "33%",
                                        color: '#A3A5AE'
                                    }]}>
                                    Cancel
                            </Text>

                            </View>

                            {batch_array}


                            <TouchableOpacity activeOpacity={.8}
                                style={style.rounded_button}
                                onPress={() => {

                                }}>
                                <Text style={style.rounded_button_text}>
                                    Cancel session</Text>
                            </TouchableOpacity>

                        </View>
                        : null}
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
    getBatchOperational
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
        borderWidth: 1,
        margin: 20,
        borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
}
import React from 'react'

import { View, Text, Image, Linking, StyleSheet, Platform, TouchableOpacity, ActivityIndicator } from 'react-native'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { FlatList } from 'react-native-gesture-handler';
import { CustomeCard } from '../../components/Home/Card'
import { SwitchButton, CustomeButtonB } from '../../components/Home/SwitchButton'
import { DueView } from '../../components/Home/DueView';
import moment from 'moment'
import { getPlayerSWitcher, getPaymentHistory } from "../../redux/reducers/PaymentReducer";
import { connect } from 'react-redux';
import { getData } from '../../components/auth';
import InfoDialog from '../../components/custom/InfoDialog'
import RNPickerSelect from 'react-native-picker-select'
import MonthYearDialog from '../../components/custom/MonthYearDialog'

const placeholder = {
    label: 'Select',
    value: null,
    color: '#9EA0A4',
};

class PaymentHistory extends BaseComponent {


    constructor(props) {
        super(props);
        this.state = {
            data: null,
            playerData: [],
            player_drop: [],
            academy_drop: [],
            showDialog: false,
            message: '',
            player: ['', ''],
            selected_player: null,
            selected_academy: null,
            payment_history: null,
            show_month_dialog: false,
            selected_month: '',
            selected_year: ''
        };

        this.inputRefs = {
            players: null,
            gender: null
        };

        var today = new Date();
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        this.state.selected_month = mm
        this.state.selected_year = yyyy



        getData('header', (header) => {

            this.props.getPlayerSWitcher(header).then(() => {

                let data = this.props.data.data
                console.log('getPlayerSWitcher payload2 ' + JSON.stringify(this.props.data.data));
                if (data.success) {

                    const players = data.data.players


                    let uniqueArray = []
                    for (let i = 0; i < players.length; i++) {

                        let obj = players[i]
                        if (!this.isPlayerExists(obj.id, uniqueArray)) {
                            uniqueArray.push(obj)
                        }
                    }
                    this.setState({
                        players: uniqueArray
                    })

                    console.log("UnqiueArray => ", JSON.stringify(uniqueArray))

                    let new_array = []
                    for (let i = 0; i < uniqueArray.length; i++) {
                        let row = uniqueArray[i];
                        let obj = {
                            label: row.name,
                            value: row.user_id,
                        }
                        new_array[i] = obj
                    }
                    this.setState({
                        player_drop: new_array
                    })

                    this.setState({
                        playerData: players
                    })
                }
            }).catch((response) => {
                console.log(response);
            })
        });



    }

    isPlayerExists(id, uniqueArray) {

        for (let i = 0; i < uniqueArray.length; i++) {
            let obj = uniqueArray[i]
            if (obj.id == id) {
                return true
            }
        }
        return false
    }

    isAcademyExists(id, uniqueArray) {

        for (let i = 0; i < uniqueArray.length; i++) {
            let obj = uniqueArray[i]
            if (obj.academy_id == id) {
                return true
            }
        }
        return false
    }

    _renderItem = ({ item }) => {
        return (
            <View
                style={{
                    paddingLeft: 12,
                    paddingRight: 12,
                    paddingTop: 16,
                    paddingBottom: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} >
                <Text style={[defaultStyle.regular_text_14, {
                    width: "33%",
                    justifyContent: 'center',
                    alignItems: 'center',
                    //textAlign: 'center'
                }]}>
                    {moment(item.transferred_on).format('DD/MM/YYYY')}
                </Text>
                <Text style={[defaultStyle.regular_text_14, {
                    width: "33%",
                    justifyContent: 'center',
                    //textAlign: 'center'
                }]}>
                    {item.academy_name}
                </Text>

                <Text style={[defaultStyle.regular_text_14, {
                    width: "33%",
                    justifyContent: 'center',
                    paddingLeft:30,
                    //marginLeft: 20,
                    //textAlign: 'center'
                }]}>
                    Rs {item.amount}
                </Text>

            </View>

        )
    }

    _renderHeaderItem = ({ }) => {
        return (
            <View
                style={{
                    paddingLeft: 12,
                    paddingRight: 12,
                    paddingTop: 16,
                    paddingBottom: 16,
                    flexDirection: 'row',
                    backgroundColor: '#F4F4FA'
                }} >
                <Text style={[defaultStyle.bold_text_10, {
                    width: "33%",
                    color: '#A3A5AE',
                }]}>
                    Payment date
                </Text>
                <Text style={[defaultStyle.bold_text_10, {
                    width: "33%",
                    color: '#A3A5AE'
                }]}>
                    Academy and Player
                </Text>

                <Text style={[defaultStyle.bold_text_10, {
                    width: "33%",
                    color: '#A3A5AE',
                    textAlign: 'left',
                    paddingLeft:30,
                    //marginLeft: 20,
                }]}>
                    Amount
                </Text>

            </View>

        )
    }

    filterMatch() {

        let playerId = this.state.selected_player
        //alert(playerId)
        const players = this.state.playerData

        let uniqueArray = []
        for (let i = 0; i < players.length; i++) {

            let obj = players[i]
            console.log(obj.user_id + "===" + playerId)
            if (obj.user_id == playerId) {
                if (!this.isAcademyExists(obj.academy_id, uniqueArray)) {
                    uniqueArray.push(obj)
                }
            }
        }


        let new_array = []
        for (let i = 0; i < uniqueArray.length; i++) {
            let row = uniqueArray[i];
            let obj = {
                label: row.academy_name,
                value: row.academy_id,
            }
            new_array[i] = obj
        }
        console.log('Academy-> ', JSON.stringify(new_array))
        this.setState({
            academy_drop: new_array
        })

    }

    fetchHistory() {

        const month = this.state.selected_month
        const year = this.state.selected_year
        const academy_id = this.state.selected_academy
        const player_user_id = this.state.selected_player


        getData('header', (header) => {

            this.props.getPaymentHistory(header, month, year, academy_id, player_user_id).then(() => {

                let data = this.props.data.data
                console.log('getPaymentHistory payload2 ' + JSON.stringify(this.props.data.data));
                if (data.success) {
                    const payment_history = data.data.payment_history
                    this.setState({
                        payment_history: payment_history
                    })
                }
            }).catch((response) => {
                console.log(response);
            })
        });

    }

    render() {

        const data = this.state.data
        const payment_history = this.state.payment_history;
        const player_drop = this.state.player_drop
        const playerData = this.state.playerData
        const academy_drop = this.state.academy_drop
        const month = this.state.selected_month
        const year = this.state.selected_year
        let formatted_date = ''
        if (month != '' && year != '') {
            formatted_date = moment(month + "/" + year, 'MM-YYYY').format("MMM'YY")
            //alert(formatted_date)
        }


        if (this.props.data.loading && playerData == null) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }


        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                <MonthYearDialog
                    touchOutside={(month, year) => {
                        if (month != undefined && year != undefined) {
                            //alert(month + "-" + year)
                            this.state.selected_month = month
                            this.state.selected_year = year

                            if (this.state.selected_academy != null &&
                                this.state.selected_player != null) {
                                this.fetchHistory()
                            }
                        }
                        this.setState({
                            show_month_dialog: false
                        })
                    }}
                    visible={this.state.show_month_dialog}
                />
                <View style={{
                    paddingLeft: 12,
                    paddingTop: 16,
                    paddingBottom: 16,
                    paddingRight: 12
                }}>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',

                    }}>

                        <View style={{
                            width: '40%',
                        }}>

                            <Text style={{
                                fontSize: 10,
                                color: '#A3A5AE',
                                paddingLeft: 2,
                                fontFamily: 'Quicksand-Regular'
                            }}>
                                Player
                                    </Text>

                            <RNPickerSelect style={{
                            }}
                                placeholder={placeholder}
                                items={player_drop}
                                onValueChange={(value) => {
                                    this.setState({
                                        selected_player: value,
                                    });
                                    setTimeout(() => {
                                        this.filterMatch()
                                    }, 100)

                                }}
                                style={pickerSelectStyles}
                                value={this.state.selected_tournament_category}
                                useNativeAndroidPickerStyle={false}
                                ref={(el) => {
                                    this.inputRefs.players = el;
                                }}
                            />

                            <View style={{
                                width: "100%",
                                backgroundColor: '#C7C7CD',
                                height: 1,
                                marginTop: 2
                            }}></View>
                        </View>
                        <View style={{
                            marginLeft: 16,
                            width: '40%',
                        }}>

                            <Text style={{
                                fontSize: 10,
                                color: '#A3A5AE',
                                paddingLeft: 2,
                                fontFamily: 'Quicksand-Regular'
                            }}>Academy</Text>

                            <RNPickerSelect style={{
                            }}
                                placeholder={placeholder}
                                items={academy_drop}
                                onValueChange={(value) => {
                                    this.setState({
                                        selected_academy: value,
                                    });
                                    setTimeout(() => {
                                        this.fetchHistory()
                                    }, 100)
                                }}
                                style={pickerSelectStyles}
                                value={this.state.selected_gender}
                                useNativeAndroidPickerStyle={false}
                                ref={(el) => {
                                    this.inputRefs.gender = el;
                                }}
                            />


                            <View style={{
                                width: "100%",
                                backgroundColor: '#C7C7CD',
                                height: 1,
                                marginTop: 2
                            }}></View>
                        </View>
                    </View>



                    <View>

                        <Text style={{
                            fontSize: 10,
                            color: '#A3A5AE',
                            paddingLeft: 2,
                            marginTop: 16,
                            fontFamily: 'Quicksand-Regular'
                        }}>
                            Month and Year
                                    </Text>

                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    show_month_dialog: true
                                })
                            }}
                        >


                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 8,
                                width: 110,
                                justifyContent: 'space-between'
                            }}>

                                <Text style={{
                                    fontSize: 14,
                                    color: '#404040',
                                    paddingLeft: 2,
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    {formatted_date}
                                </Text>

                                <Image
                                    style={{ width: 8, height: 5 }}
                                    source={require('../../images/ic_down_arrow.png')} />
                            </View>
                            <View
                                style={{
                                    width: 110,
                                    marginTop: 4,
                                    backgroundColor: '#614051',
                                    height: 1
                                }}
                            ></View>
                        </TouchableOpacity>

                    </View>

                </View>




                {payment_history != null && payment_history.length > 0 ?
                    <FlatList
                        ListHeaderComponent={this._renderHeaderItem}
                        data={payment_history}
                        extraData={payment_history}
                        renderItem={this._renderItem}
                    /> :

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={defaultStyle.regular_text_14}>
                            {payment_history == null ? "Please choose player and academy" : "No payment history."}
                        </Text>
                    </View>}

            </View>
        );

    }

}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        paddingVertical: 8,
        //paddingHorizontal: 10,
        borderColor: '#614051',
        borderRadius: 8,
        color: '#404040',
        //marginBottom: 4,
        //alignItems: 'center',
        //textAlign: 'center',
        fontFamily: 'Quicksand-Regular',

        // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 14,
        fontFamily: 'Quicksand-Regular',
        borderColor: '#614051',
        borderRadius: 8,
        paddingVertical: 4,
        color: '#404040',
    },
});

const mapStateToProps = state => {
    return {
        data: state.PaymentReducer,
    };
};
const mapDispatchToProps = {
    getPlayerSWitcher, getPaymentHistory
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentHistory);
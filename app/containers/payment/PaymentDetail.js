import React from 'react'

import { View, Text, Image, Linking, Platform, TouchableOpacity, ActivityIndicator } from 'react-native'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { FlatList } from 'react-native-gesture-handler';
import { CustomeCard } from '../../components/Home/Card'
import { SwitchButton, CustomeButtonB } from '../../components/Home/SwitchButton'
import { DueView } from '../../components/Home/DueView';
import moment from 'moment'
import { paymentDues } from "../../redux/reducers/PaymentReducer";
import { connect } from 'react-redux';
import { getData } from '../../components/auth';
import InfoDialog from '../../components/custom/InfoDialog'

class PaymentDetail extends BaseComponent {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showDialog: false,
            message: ''
        };

        getData('userInfo', (value) => {
            console.warn(value)
            userData = JSON.parse(value)
            const player_id = userData['player_id']

            getData('header', (header) => {

                this.props.paymentDues(header, player_id).then(() => {

                    let data = this.props.data.data
                    console.log('paymentDues payload ' + JSON.stringify(this.props.data.data));
                    if (data.success) {

                        this.setState({
                            data: data.data.dues
                        })
                    }
                }).catch((response) => {
                    console.log(response);
                })
            });



        });

    }


    _renderItem = ({ item }) => {
        return (
            <CustomeCard >
                <View
                    style={{
                        marginLeft: 12,
                        marginRight: 12,
                        marginTop: 16
                    }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={defaultStyle.bold_text_14}>{item.academyName}</Text>

                        <DueView />

                    </View>
                    <View style={{ height: 1, backgroundColor: '#DFDFDF', marginTop: 8, marginBottom: 8 }} />

                    <Text style={[defaultStyle.bold_text_14, { marginRight: 16, }]}>{item.playerName}</Text>

                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>

                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ width: "33%" }}>
                                <Text style={[defaultStyle.bold_text_10, { color: '#A3A5AE' }]}>Batch Name</Text>
                                <Text style={[defaultStyle.bold_text_14, { marginTop: 8 }]}>
                                    {item.batchName}
                                </Text>
                            </View>


                            <View style={{ width: "33%", marginLeft: 8 }}>
                                <Text style={[defaultStyle.bold_text_10, { color: '#A3A5AE' }]}>Due Date</Text>
                                <Text style={[defaultStyle.bold_text_14, { marginTop: 8 }]}>
                                    {moment.utc(item.dueDate, 'YYYY-MM-DD').local().format("DD MMM YYYY")}
                                    {/* {item.dueDate} */}
                                </Text>
                            </View>

                            <View style={{ width: "33%", marginLeft: 8 }}>
                                <Text style={[defaultStyle.bold_text_10, { color: '#A3A5AE' }]}>Amount</Text>
                                <Text style={[defaultStyle.bold_text_14, { marginTop: 8 }]}>Rs {item.amount}</Text>
                            </View>
                        </View>

                    </View>

                    <View style={{
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        marginTop: 16,
                    }}>

                        <View style={{
                            width: '40%',
                            justifyContent: 'flex-end',

                            //alignItems: 'flex-end'
                        }}>
                            <CustomeButtonB onPress={() => {

                                const upaId = item.upaId
                                if (upaId) {
                                    let msg = 'Please make payment on this UPI ID : ' + upaId
                                    alert(msg)
                                }

                            }}>Pay</CustomeButtonB>
                        </View>
                    </View>
                </View>

            </CustomeCard>
        )
    }


    render() {

        if (this.props.data.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        const data = this.state.data

        return (
            <View style={{ flex: 1, backgroundColor: '#F7F7F7' }}>

                <View>
                    {/* 
                    <InfoDialog
                        visible={this.state.showDialog}
                        message={this.state.message}
                    /> */}

                    <TouchableOpacity onPress={() =>
                        this.props.navigation.navigate('tes')
                    }>
                        <Text style={{
                            color: '#667DDB',
                            paddingRight: 12,
                            paddingLeft: 12,
                            paddingTop: 12,
                            paddingBottom: 4,
                            textAlign: 'right',
                            fontSize: 10,
                            fontFamily: 'Quicksand-Regular'
                        }}>Payment Detail</Text>
                    </TouchableOpacity>
                </View>

                {data != null && data.length > 0 ?
                    <FlatList
                        data={data}
                        extraData={data}
                        renderItem={this._renderItem}
                    /> :

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={defaultStyle.regular_text_14}>No payment due.</Text>
                    </View>}

            </View>
        );

    }

}
const mapStateToProps = state => {
    return {
        data: state.PaymentReducer,
    };
};
const mapDispatchToProps = {
    paymentDues
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetail);
import React from 'react'

import { View, Text, Image, Linking, Platform, TouchableOpacity, ActivityIndicator } from 'react-native'
import BaseComponent, { defaultStyle, DRIBBLE_LOGO, PAYMENT_KEY } from '../BaseComponent';
import { FlatList } from 'react-native-gesture-handler';
import { CustomeCard } from '../../components/Home/Card'
import { SwitchButton, CustomeButtonB } from '../../components/Home/SwitchButton'
import { DueView } from '../../components/Home/DueView';
import moment from 'moment'
import { paymentDues, duePay } from "../../redux/reducers/PaymentReducer";
import { connect } from 'react-redux';
import { getData } from '../../components/auth';
import InfoDialog from '../../components/custom/InfoDialog'
import RazorpayCheckout from 'react-native-razorpay';
import Spinner from 'react-native-loading-spinner-overlay';

class PaymentDetail extends BaseComponent {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showDialog: false,
            message: '',
            dribble_logo: '',
            mobile_number: '',
            userData: null,
            spinner: false,
            isRefreshing: false
        };


        getData(DRIBBLE_LOGO, (value) => {
            //alert(value)
            if (value != null)
                this.state.dribble_logo = value
            else
                this.state.dribble_logo = 'https://i.imgur.com/3g7nmJC.png'
        })

        this.getDues()

    }

    onRefresh() {
        //this.setState({ isRefreshing: true }, () => { this.getDues() });
        alert('test')
    }

    getDues() {
        getData('userInfo', (value) => {
            console.warn(value)
            userData = JSON.parse(value)
            const player_id = userData['player_id']
            this.state.userData = userData

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

    progress(status) {
        setTimeout(() => {
            console.log('Progress=> ', status)
            this.setState({
                spinner: status
            })
            this.state.spinner = status
        }, 100)
    }

    processPayment(item) {

        const logo = this.state.dribble_logo
        const desc = 'Payment for ' + item.academyName
        const mobile_number = this.state.userData.user['mobile_number']
        const email = this.state.userData.user['email']
        const name = this.state.userData.user['name']
        let total = item.amount
        total = total + '00'

        var options = {
            description: desc,
            image: logo,
            currency: 'INR',
            key: PAYMENT_KEY,
            amount: total,
            name: 'Machaxi',
            prefill: {
                email: email,
                contact: mobile_number,
                name: name
            },
            theme: { color: '#67BAF5' }
        }
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            console.log('Razor Rspo ', JSON.stringify(data))
            //alert(`Success: ${data.razorpay_payment_id}`);
            let payment_details = {
                razorpay_payment_id: data.razorpay_payment_id
            }
            this.submitData(payment_details, item, total)
        }).catch((error) => {
            // handle failure
            console.log('Razor Rspo ', JSON.stringify(error))
            //alert(`Error: ${error.code} | ${error.description}`);
            alert('Payment could not succeed. Please try again.')
        });

    }

    submitData(payment_details, item, total) {

        let subData = {}
        subData.id = item.dueId
        subData.amount = total
        subData.payment_details = payment_details
        let data = {}
        data['data'] = subData

        this.progress(true)


        getData('header', (header) => {

            this.props.duePay(header, data).then(() => {

                this.progress(false)

                let data = this.props.data.data
                console.log('submitData payload ' + JSON.stringify(this.props.data.data));
                if (data.success) {
                    let msg = data.success_message
                    setTimeout(()=>{
                        alert(msg)
                        this.getDues()
                    },500)
                }
            }).catch((response) => {
                console.log(response);
                this.progress(false)
            })
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

                                this.processPayment(item)

                            }}>Pay</CustomeButtonB>
                        </View>
                    </View>
                </View>

            </CustomeCard>
        )
    }

    render() {

        if (this.props.data.loading && this.state.data.length == 0) {
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

                    <Spinner
                        visible={this.state.spinner}
                        textStyle={defaultStyle.spinnerTextStyle}
                    />

                    <TouchableOpacity onPress={() =>
                        this.props.navigation.navigate('PaymentHistory')
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
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isRefreshing}
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
    paymentDues, duePay
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetail);
import React from 'react'

import { View, Text, Image, Linking, StyleSheet, Platform, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { FlatList } from 'react-native-gesture-handler';
import { CustomeCard } from '../../components/Home/Card'
import { SwitchButton, CustomeButtonB } from '../../components/Home/SwitchButton'
import { DueView } from '../../components/Home/DueView';
import moment from 'moment'
import { getPlayerSWitcher, getPaymentHistory, getAcademyPaymentList } from "../../redux/reducers/PaymentReducer";
import { connect } from 'react-redux';
import { getData } from '../../components/auth';
import InfoDialog from '../../components/custom/InfoDialog'
import RNPickerSelect from 'react-native-picker-select'
import MonthYearDialog from '../../components/custom/MonthYearDialog';
import Spinner from 'react-native-loading-spinner-overlay';
import DatePicker from 'react-native-datepicker';

const placeholder = {
    label: 'Select',
    value: null,
    color: '#9EA0A4',
};

class PaymentReport extends BaseComponent {


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
            selected_year: '',
            history_progress: false,
            paymentListData: null,
            spinner: false,
            fromDate: '',
            toDate: '',
            paymentMethods: [
                { 'value': 'RAZORPAY', 'label': 'RAZORPAY' },
                { 'value': 'CASH', 'label': 'CASH ' },
                { 'value': 'ONLINE', 'label': 'ONLINE' },
            ],
            paymentMethodValue: '',
            academyId: '',
            pagination: false,
            page: 0,
            clearPaymentDataArray: false,
        };
        this.inputRefs = {
            paymentMethodValue: null,
        };



    }

    componentDidMount() {
        getData('userInfo', (value) => {
            console.log('value', value);
            userData = JSON.parse(value);
            this.state.academyId = userData['academy_id'];
            this.getPaymentList();
        });

    }

    progress(status) {
        this.setState({
            spinner: status
        })
    }

    getPaymentList() {
        // getData('userInfo', (value) => {
        // console.warn(value)
        // userData = JSON.parse(value)
        // const player_id = userData['player_id']
        // this.academy_id = userData['academy_id']
        // this.userid = userData.user['id']
        // this.username = userData.user['name']
        // this.state.userData = userData

        let page = this.state.page
        let size = 10
        if (this.state.pagination == false) {
            this.progress(true);
        }
        let subData = {}
        subData.academyId = this.state.academyId;
        subData.academyName = '';
        if (this.state.paymentMethodValue != null && this.state.paymentMethodValue != '') {
            subData.paymentMethods = this.state.paymentMethodValue;
        }

        subData.fromDate = this.state.fromDate;
        subData.toDate = this.state.toDate;
        let responseData = {}
        responseData['data'] = subData

        getData('header', (header) => {

            this.props.getAcademyPaymentList(header, responseData, page, size).then(() => {

                let data = this.props.data.data;
                if (this.state.pagination == false) {
                    this.progress(false);
                }
                console.log('paymentDues payload ' + JSON.stringify(this.props.data.data));
                if (data.success) {
                    let list = data.data.academy_payment_list;
                    console.log('list array', list);

                    let allPayments = this.state.paymentListData;
                    if (allPayments == null) {
                        allPayments = [];
                    }

                    if (list == 'No Data Available' && this.state.pagination == false) {
                        allPayments = [];
                        this.setState({
                            paymentListData: allPayments
                        })
                    } else {
                        if (list != 'No Data Available') {
                            if (this.state.clearPaymentDataArray) {
                                this.state.clearPaymentDataArray = false
                                allPayments = [];
                            }

                            for (let i = 0; i < list.length; i++) {
                                allPayments.push(list[i]);
                            }
                            this.setState({
                                paymentListData: allPayments
                            })
                        }
                    }


                }
            }).catch((response) => {
                if (this.state.pagination == false) {
                    this.progress(false);
                }
                console.log(response);
            })
        });
        //  });
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
                }} >

                <Text style={[defaultStyle.regular_text_14, {
                    textAlign: 'center',
                    width: 120
                }]}>
                    {item.payment_type}
                </Text>

                <Text style={[defaultStyle.regular_text_14, {
                    textAlign: 'center',
                    width: 100
                }]}>
                    {item.payment_method}
                </Text>

                <Text style={[defaultStyle.regular_text_14, {
                    textAlign: 'center',
                    width: 90
                }]}>
                    {item.paid_by_user}
                </Text>

                <Text style={[defaultStyle.regular_text_14, {
                    textAlign: 'center',
                    width: 110
                }]}>
                    Rs {item.amount_paid}
                </Text>

                <Text style={[defaultStyle.regular_text_14, {
                    textAlign: 'center',
                    width: 110
                }]}>
                    Rs {item.commission}
                </Text>

                <Text style={[defaultStyle.regular_text_14, {
                    textAlign: 'center',
                    width: 110
                }]}>
                    Rs {item.payment_gateway_fee}
                </Text>

                <Text style={[defaultStyle.regular_text_14, {
                    textAlign: 'center',
                    width: 110
                }]}>
                    Rs {item.transferable_amount}
                </Text>

                <Text style={[defaultStyle.regular_text_14, {
                    width: 140,
                    textAlign: 'center',
                }]}>
                    {moment(item.transfer_on).format('DD/MM/YYYY')}
                    {/* 2020-Mar-11 15:42 */}
                </Text>

                <Text style={[defaultStyle.regular_text_14, {
                    width: 100,
                    textAlign: 'center',
                }]}>
                    {item.status}
                </Text>

                <Text style={[defaultStyle.regular_text_14, {
                    width: 100,
                    textAlign: 'center',
                }]}>
                    {item.refund_ref_id}
                </Text>

                <Text style={[defaultStyle.regular_text_14, {
                    width: 90,
                    textAlign: 'center',
                }]}>
                    {/* Rs {item.amount} */} ATTPL
                </Text>


                <Text style={[defaultStyle.regular_text_14, {
                    width: 90,
                    textAlign: 'center',
                }]}>
                    {/* Rs {item.amount} */} Navdeep
                </Text>

                <Text style={[defaultStyle.regular_text_14, {
                    width: 200,
                    textAlign: 'center',
                }]}>
                    {item.remark}
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
                    color: '#A3A5AE',
                    width: 120,
                    textAlign: 'center',
                }]}>
                    Payment Type
                </Text>

                <Text style={[defaultStyle.bold_text_10, {
                    color: '#A3A5AE',
                    textAlign: 'center',
                    width: 100,
                }]}>
                    Payment Method
                </Text>

                <Text style={[defaultStyle.bold_text_10, {
                    color: '#A3A5AE',
                    width: 90,
                    textAlign: 'center',
                }]}>
                    Paid By
                </Text>

                <Text style={[defaultStyle.bold_text_10, {
                    color: '#A3A5AE',
                    width: 110,
                    textAlign: 'center',
                }]}>
                    Amount Paid
                </Text>

                <Text style={[defaultStyle.bold_text_10, {
                    color: '#A3A5AE',
                    width: 110,
                    textAlign: 'center',
                }]}>
                    Commission
                </Text>

                <Text style={[defaultStyle.bold_text_10, {
                    color: '#A3A5AE',
                    width: 110,
                    textAlign: 'center',
                }]}>
                    Gateway Charges
                </Text>

                <Text style={[defaultStyle.bold_text_10, {
                    color: '#A3A5AE',
                    width: 110,
                    textAlign: 'center',
                }]}>
                    Amount Transferred
                </Text>

                <Text style={[defaultStyle.bold_text_10, {
                    color: '#A3A5AE',
                    width: 140,
                    textAlign: 'center',
                }]}>
                    Payment Date
                </Text>

                <Text style={[defaultStyle.bold_text_10, {
                    color: '#A3A5AE',
                    width: 100,
                    textAlign: 'center',
                }]}>
                    Status
                </Text>


                <Text style={[defaultStyle.bold_text_10, {
                    color: '#A3A5AE',
                    width: 90,
                    textAlign: 'center',
                }]}>
                    Reference ID
                </Text>


                <Text style={[defaultStyle.bold_text_10, {
                    color: '#A3A5AE',
                    width: 100,
                    textAlign: 'center',
                }]}>
                    Batch(es)
                </Text>


                <Text style={[defaultStyle.bold_text_10, {
                    color: '#A3A5AE',
                    width: 90,
                    textAlign: 'center',
                }]}>
                    Player Name
                </Text>


                <Text style={[defaultStyle.bold_text_10, {
                    color: '#A3A5AE',
                    width: 200,
                    textAlign: 'center',
                }]}>
                    Remark
                </Text>


            </View>

        )
    }


    render() {

        const paymentListData = this.state.paymentListData

        if (paymentListData == null) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }


        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                <Spinner
                    visible={this.state.spinner}
                    textStyle={defaultStyle.spinnerTextStyle}
                />


                <View style={{
                    paddingLeft: 14,
                    marginTop: 16,
                    marginBottom: 16,
                    paddingRight: 12
                }}>

                    <View style={{
                        width: '35%',
                    }}>

                        <Text style={{
                            fontSize: 10,
                            color: '#A3A5AE',
                            fontFamily: 'Quicksand-Regular',
                            paddingLeft: 2,
                        }}>
                            Payment Method
                                    </Text>

                        <RNPickerSelect style={{
                        }}
                            placeholder={placeholder}
                            items={this.state.paymentMethods}
                            onValueChange={(value) => {
                                this.setState({
                                    paymentMethodValue: value,
                                    page: 0,
                                    pagination: false,
                                    clearPaymentDataArray: true
                                }, () => {
                                    this.getPaymentList();
                                });
                            }}
                            style={pickerSelectStyles}
                            value={this.state.paymentMethodValue}
                            useNativeAndroidPickerStyle={false}
                            ref={(el) => {
                                this.inputRefs.paymentMethodValue = el;
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
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20
                    }}>

                        <View>
                            <Text style={{
                                fontSize: 10,
                                color: '#A3A5AE',
                                fontFamily: 'Quicksand-Regular',
                                paddingLeft: 2,
                            }}>From Date</Text>
                            <DatePicker
                                style={{ borderWidth: 0, borderBottomWidth: 1, borderBottomColor: '#DFDFDF' }}
                                date={this.state.fromDate}
                                mode="date"
                                placeholder="Select date"
                                format="YYYY-MM-DD"
                                minDate={moment('1920-01-01')}
                                maxDate={moment(Date.now())}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateInput: {
                                        marginLeft: -22,
                                        borderWidth: 0,
                                    },
                                    dateText: {
                                        fontSize: 14,
                                        color: '#000000',
                                        paddingLeft: 0,
                                        fontFamily: 'Quicksand-Regular'
                                    },
                                    placeholderText: {
                                        fontFamily: 'Quicksand-Regular',
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(fromDate) => {
                                    this.setState({
                                        fromDate: fromDate,
                                        page: 0,
                                        pagination: false,
                                        clearPaymentDataArray: true
                                    }, () => {
                                        this.getPaymentList();
                                    })
                                }}
                            />
                        </View>

                        <View>
                            <Text style={{
                                fontSize: 10,
                                color: '#A3A5AE',
                                fontFamily: 'Quicksand-Regular',
                                paddingLeft: 2
                            }}>To Date</Text>
                            <DatePicker
                                style={{ borderWidth: 0, borderBottomWidth: 1, borderBottomColor: '#DFDFDF' }}
                                date={this.state.toDate}
                                mode="date"
                                placeholder="Select date"
                                format="YYYY-MM-DD"
                                minDate={moment('1920-01-01')}
                                maxDate={moment(Date.now())}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{

                                    dateInput: {
                                        marginLeft: -22,
                                        borderWidth: 0
                                    },
                                    dateText: {
                                        fontSize: 14,
                                        color: '#000000',
                                        paddingLeft: 0,
                                        fontFamily: 'Quicksand-Regular'
                                    },
                                    placeholderText: {
                                        fontFamily: 'Quicksand-Regular',
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(toDate) => {
                                    this.setState({
                                        toDate: toDate,
                                        page: 0,
                                        pagination: false,
                                        clearPaymentDataArray: true
                                    }, () => {
                                        this.getPaymentList();
                                    })
                                }}
                            />
                        </View>
                    </View>
                </View>

                {this.state.paymentListData != null && this.state.paymentListData.length > 0 ?
                    <ScrollView horizontal={true} persistentScrollbar={true}>
                        <FlatList
                            onEndReachedThreshold={0.1}
                            onEndReached={({ distanceFromEnd }) => {

                                this.setState({
                                    pagination: true
                                }, () => {
                                    console.log('on end reached ', distanceFromEnd);
                                    let page = this.state.page
                                    page = page + 1
                                    this.state.page = page

                                    console.log('page => ', this.state.page);
                                    this.getPaymentList();
                                })

                            }}
                            ListHeaderComponent={this._renderHeaderItem}
                            data={paymentListData}
                            extraData={paymentListData}
                            renderItem={this._renderItem}
                            stickyHeaderIndices={[0]}
                        />
                    </ScrollView>
                    :
                    <View style={styles.noDataOuter}>
                        <Text style={defaultStyle.regular_text_14}>No payment due.</Text>
                    </View>
                }

            </View>
        );

    }

}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        paddingVertical: 8,
        borderColor: '#614051',
        borderRadius: 8,
        color: '#404040',
        fontFamily: 'Quicksand-Regular',
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
    getPlayerSWitcher, getPaymentHistory, getAcademyPaymentList
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentReport);

const styles = {
    noDataOuter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
}
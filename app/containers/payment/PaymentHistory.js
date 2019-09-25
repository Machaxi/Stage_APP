import React from 'react'

import { View, Text, Image, Linking, StyleSheet,Platform, TouchableOpacity, ActivityIndicator } from 'react-native'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { FlatList } from 'react-native-gesture-handler';
import { CustomeCard } from '../../components/Home/Card'
import { SwitchButton, CustomeButtonB } from '../../components/Home/SwitchButton'
import { DueView } from '../../components/Home/DueView';
import moment from 'moment'
import { getPlayerSWitcher } from "../../redux/reducers/PaymentReducer";
import { connect } from 'react-redux';
import { getData } from '../../components/auth';
import InfoDialog from '../../components/custom/InfoDialog'
import RNPickerSelect from 'react-native-picker-select'
const placeholder = {
    label: 'Select',
    value: null,
    color: '#9EA0A4',
};

class PaymentHistory extends BaseComponent {


    constructor(props) {
        super(props);
        this.state = {
            data: ['','',''],
            showDialog: false,
            message: '',
            player:['','']
        };

        this.inputRefs = {
            players: null,
            gender: null
        };

       

            getData('header', (header) => {

                this.props.getPlayerSWitcher(header).then(() => {

                    let data = this.props.data.data
                    console.log('getPlayerSWitcher payload1 ' + JSON.stringify(this.props.data));
                    if (data.success) {

                       alert('test')
                    }
                }).catch((response) => {
                    console.log(response);
                })
            });
        


    }


    _renderItem = ({ item }) => {
        return (
                <View
                    style={{
                        marginLeft: 12,
                        marginRight: 12,
                        marginTop: 16,
                        flexDirection:'row'
                    }} >
                    <Text style={[defaultStyle.bold_text_14,{
                        width:"33%"
                    }]}>
                    12/12/2018
                    </Text>
                    <Text style={[defaultStyle.bold_text_14,{
                        width:"33%"
                    }]}>
                    Feather Academy
                    </Text>

                    <Text style={[defaultStyle.bold_text_14,{
                        width:"33%"
                    }]}>
                    Rs 12,000
                    </Text>

                    
                </View>

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

                <View style={{
                                                width: '25%',
                                            }}>

                                                <Text style={{
                                                    fontSize: 10,
                                                    color: '#A3A5AE',
                                                    paddingLeft: 2,
                                                    fontFamily: 'Quicksand-Regular'
                                                }}>
                                                    Select Category
                                    </Text>

                                                {/* <Text style={{
                                            fontSize: 14,
                                            paddingTop: 6,
                                            color: '#404040',
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            U-10
                                 </Text> */}
                                                <RNPickerSelect style={{
                                                }}
                                                    placeholder={placeholder}
                                                    items={this.state.tournament_category}
                                                    onValueChange={(value) => {
                                                        this.setState({
                                                            selected_tournament_category: value,
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
                                                width: '20%',
                                            }}>

                                                <Text style={{
                                                    fontSize: 10,
                                                    color: '#A3A5AE',
                                                    paddingLeft: 2,
                                                    fontFamily: 'Quicksand-Regular'
                                                }}>
                                                    Gender
                                    </Text>

                                                <RNPickerSelect style={{
                                                }}
                                                    placeholder={placeholder}
                                                    items={this.state.gender}
                                                    onValueChange={(value) => {
                                                        this.setState({
                                                            selected_gender: value,
                                                        });
                                                        setTimeout(() => {
                                                            this.filterMatch()
                                                        }, 100)
                                                    }}
                                                    style={pickerSelectStyles}
                                                    value={this.state.selected_gender}
                                                    useNativeAndroidPickerStyle={false}
                                                    ref={(el) => {
                                                        this.inputRefs.gender = el;
                                                    }}

                                                // Icon={() => {
                                                //     return (
                                                //         <Image
                                                //             style={{ width: 8, height: 5 }}
                                                //             source={require('../../images/ic_down_arrow.png')} />
                                                //     )
                                                // }}

                                                />


                                                <View style={{
                                                    width: "100%",
                                                    backgroundColor: '#C7C7CD',
                                                    height: 1,
                                                    marginTop: 2
                                                }}></View>
                                            </View>
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        paddingVertical: 8,
        //paddingHorizontal: 10,
        borderColor: '#614051',
        borderRadius: 8,
        color: 'black',
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
        color: 'black',
    },
});

const mapStateToProps = state => {
    return {
        data: state.PaymentReducer,
    };
};
const mapDispatchToProps = {
    getPlayerSWitcher
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentHistory);
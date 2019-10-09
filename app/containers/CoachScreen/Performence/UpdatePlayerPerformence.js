
import React from 'react'

import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { SwitchButton, CustomeButtonB } from '../../../components/Home/SwitchButton'
import { getPerformenceOption, savePlayerPerformance } from "../../../redux/reducers/PerformenceReducer";
import { getData } from "../../../components/auth";
import { connect } from 'react-redux';
import moment from 'moment';
import { ACADEMY, COACH } from '../../../components/Constants';
import BaseComponent, { defaultStyle, EVENT_REFRESH_PLAYER } from '../../BaseComponent';
import Events from '../../../router/events';
import Spinner from 'react-native-loading-spinner-overlay';

class UpdatePlayerPerformence extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            country: undefined,
            billingchecked: false,
            playerList: null,
            batchDetails: null,
            player_name: '',
            spinner: false,
        }
        let data = this.props.navigation.getParam('data')
        this.state.player_name = JSON.parse(data).name
        console.log(data)
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


    componentDidMount() {
        var userData;
        getData('header', (value) => {
            console.log("header", value);
        });

        console.log("CoachDashboard");
        getData('userInfo', (value) => {
            userData = JSON.parse(value);
            console.log('userData', userData);
            this.setState({
                userData: JSON.parse(value),
            });
            console.log("userData.user", userData.user['user_type'])
            let userType = userData.user['user_type']

            if (userType == COACH || userType == ACADEMY) {

                this.getCoachPerformenceData(this.props.navigation.getParam('batch_id'), this.props.navigation.getParam('player_id'), this.props.navigation.getParam('month'), this.props.navigation.getParam('year'))

            }


        });
    }

    getCoachPerformenceData(btach_id, player_id, month, year) {
        getData('header', (value) => {
            this.props.getPerformenceOption(value, btach_id, player_id, month, year).then(() => {
                let user = JSON.stringify(this.props.data.performencedata);
                console.log(' getPerformenceOption payload ' + user);
                let user1 = JSON.parse(user);

                if (user1.success == true) {
                    this.setState({
                        playerList: user1.data['attributes'],
                        batchDetails: user1.data
                    }, () => {
                        this.state.playerList.map((item, index) => {

                            item.parameters.map((newitem, newindex) => {
                                this.state.playerList[index].parameters[newindex]['score'] = '';
                                this.state.playerList[index].parameters[newindex]['attribute_id'] = this.state.playerList[index].attribute_id;
                            })

                            console.log('this.state.playerList', JSON.stringify(this.state.playerList));

                        })
                    })
                }

            }).catch((response) => {
                //handle form errors
                console.log(response);
            })

        });

    }


    renderItem = ({ item, index }) => (


        <View style={{
            flex: 1,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 8,
            paddingBottom: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            <View style={{ width: '50%' }}>
                <Text style={defaultStyle.regular_text_14}>
                    {item.name}
                </Text>
            </View>

            <View style={{
                backgroundColor: 'white', marginTop: 0, flexDirection: 'row', justifyContent: 'space-between',
                width: '45%', marginRight: 20,
            }}>
                <View style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    flex: 1,
                    alignContent: 'center',
                }}>


                    <TextInput
                        placeholder={'Enter'}
                        style={{

                            borderColor: '#CECECE',
                            borderWidth: 0.5, borderRadius: 12,
                            height: 36,
                            fontFamily: 'Quicksand-Regular',
                            width: 70,
                            textAlign: 'center',
                            padding: 10
                        }}
                        keyboardType={'number-pad'}
                        //onChangeText={(txtscore) => { item.score = txtscore }}
                        onChangeText={(text) => {
                            if (!this.isNumbericOnly(text)) {
                                text = ''
                            } else if (+text > 100) {
                                text = ''
                                alert('Percentage must be less than or equal to 100')
                            }

                            let attributes = [...this.state.playerList]
                            let parentIndex = -1
                            let childIndex = index
                            for (let i = 0; i < attributes.length; i++) {
                                let obj = attributes[i]
                                if (obj.attribute_id == item.attribute_id) {
                                    obj.parameters[childIndex].score = text
                                    break
                                }
                            }

                            this.state.playerList = attributes
                            this.setState({
                                playerList: attributes
                            })

                            console.log('attributes=> ', JSON.stringify(attributes))

                        }}
                    >{item.score}</TextInput>
                </View>
                <Text style={defaultStyle.regular_text_14}>
                    {item.prev_month_score}
                </Text>

            </View>

        </View>

    );



    savePlayerPerformanceToServer() {

        getData('header', (value) => {
            console.log('new data', this.state.playerList);

            var postData = {}, flag = false;


            var data = {};
            data['month'] = this.props.navigation.getParam('month');
            data['year'] = this.props.navigation.getParam('year');
            data['batch_id'] = this.props.navigation.getParam('batch_id');
            data['player_id'] = this.props.navigation.getParam('player_id');
            data['progress_score'] = [];

            console.log('this.state.playerList', this.state.playerList);


            this.state.playerList.map((item, index) => {

                item.parameters.map((item1, index1) => {
                    var scoreData = {};
                    if (item1.score == '') {
                        flag = true;
                    }
                    scoreData['attribute_id'] = item.attribute_id;
                    scoreData['parameter_id'] = item1.parameter_id;
                    scoreData['score'] = parseInt(item1.score);
                    data['progress_score'].push(scoreData);
                })

            })

            if (flag) {
                alert('Kindly rate on all parameters');
            } else {

                this.progress(true)
                postData['data'] = data;

                console.log('postData', postData);
                this.props.savePlayerPerformance(value, postData).then(() => {

                    this.progress(false)
                    let user = JSON.stringify(this.props.data.performencedata);
                    console.log(' user response payload ' + user);
                    let user1 = JSON.parse(user)

                    if (user1.success == true) {
                        console.log('in if');
                        Events.publish(EVENT_REFRESH_PLAYER);
                        this.props.navigation.goBack();
                    }

                }).catch((response) => {
                    this.progress(false)
                    //handle form errors
                    console.log(response);
                })
            }

        });
    }

    renderItemSection = ({ item }) => (
        <View>
            <View style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 12,
                paddingTop: 12,
                backgroundColor: '#F7F7F7',
                flexDirection: 'row'
            }}>
                <View style={{ width: '50%' }}>
                    <Text style={[defaultStyle.bold_text_12, { color: '#A3A5AE' }]}>
                        {item.name}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', width: '45%', justifyContent: 'space-between', marginRight: 20 }}>
                    <Text style={[defaultStyle.bold_text_12, {
                        color: '#A3A5AE',
                        width: "30%",
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        flex: 1,
                        textAlign: 'center',
                        alignContent: 'center'
                    }]}>
                        {moment(this.props.navigation.getParam('month') + '-' + this.props.navigation.getParam('year'), "MM/YYYY").format('MMM')}
                    </Text>
                    <Text style={[defaultStyle.bold_text_12, { color: '#A3A5AE' }]}>
                        {moment(this.state.batchDetails.prev_month + '-' + this.state.batchDetails.prev_year, "MM/YYYY").format('MMM')}
                    </Text>
                </View>
            </View>


            <View style={{ backgroundColor: 'white', marginTop: 8, marginBottom: 8 }}>
                <FlatList
                    data={item.parameters}
                    renderItem={this.renderItem}
                    keyExtractor1={(item, parmeterindex) => item.parameter_id}
                />
            </View>
        </View>

    );


    render() {
        if (this.props.data.loading && !this.state.batchDetails) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        let name = this.state.player_name

        if (this.state.batchDetails) {
            const { batch_name, batch_category, batch_id, session } = this.state.batchDetails

            // this.attedenceMangement(attandence_batch)
            //
            // this.sessionMangement(operations)
            // this.scoreMangement(tournaments)

            return <View style={{ flex: 1, marginBottom: 0, backgroundColor: 'white' }}>
                <ScrollView style={{ flex: 1, marginTop: 0, backgroundColor: 'white' }}>

                    <Spinner
                        visible={this.state.spinner}
                        textStyle={defaultStyle.spinnerTextStyle}
                    />

                    <View style={{ backgroundColor: 'white', padding: 16 }}>
                        <View >
                            <Text style={[defaultStyle.regular_text_14, { color: 'black' }]}>{'Update ' + name + '`s progress'} </Text>
                        </View>
                        <View style={{ marginTop: 20, marginBottom: 10 }}>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={[defaultStyle.regular_text_10, { color: '#A3A5AE' }]}>Month </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Text style={defaultStyle.bold_text_14}>{moment(this.props.navigation.getParam('month') + '/' + this.props.navigation.getParam('year'), "MM/YYYY").format("MMM'YY")} </Text>
                                <Text style={[defaultStyle.regular_text_14, { color: '#A3A5AE' }]}>(Enter Percentage)</Text>
                            </View>
                        </View>
                    </View>

                    <FlatList
                        data={this.state.playerList}
                        renderItem={this.renderItemSection}
                        keyExtractor={(item, index) => item.attribute_id}

                    />

                    <View style={{

                        flexDirection: 'row',
                        marginBottom: 30,
                        marginTop: 20,
                        marginRight: 16,
                        marginLeft: 16,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        {/* <View style={{ flex: 1, marginRight: 10 }}>

                            <SwitchButton

                                onPress={() => { this.savePlayerPerformanceToServer() }}>
                                Save
                    </SwitchButton>
                        </View> */}

                        <View style={{ flex: 1, marginLeft: 10 }}>

                            <CustomeButtonB
                                style={{ flex: 1 }}
                                onPress={() => { this.savePlayerPerformanceToServer() }}>
                                Save
                    </CustomeButtonB>
                        </View>

                    </View>
                </ScrollView>

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
        data: state.PerformenceReducer,
    };
};
const mapDispatchToProps = {
    getPerformenceOption, savePlayerPerformance
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdatePlayerPerformence);


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
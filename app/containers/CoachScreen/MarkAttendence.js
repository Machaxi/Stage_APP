
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
import BaseComponent, { getFormatTimeDate, defaultStyle, EVENT_REFRESH_DASHBOARD } from '../BaseComponent'
import Events from '../../router/events';
import { ACADEMY, COACH } from '../../components/Constants';
import Spinner from 'react-native-loading-spinner-overlay';


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
            coachesList: null,
            batchDetails: null,
            spinner: false,
            compensatory: null
        }
        this.compensatoryEvent = Events.subscribe('CompensatoryData', (data) => {
            this.setState({compensatory: data})
        });
    }

    componentDidMount() {
        var userData;
        getData('header', (value) => {
            console.log("header =>>>>", value);
        });

        console.log("CoachDashboard");
        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            this.setState({
                userData: JSON.parse(value)
            });
            console.log("userData.user", userData.user['user_type'])
            let userType = userData.user['user_type']

            if (userType == COACH || userType == ACADEMY) {

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

                    let players = user1.data['players']
                    for (let i = 0; i < players.length; i++) {
                        let obj = players[i]
                        obj.is_present = true
                        players[i] = obj
                    }

                    let coaches = user1.data['coaches']
                    for (let i = 0; i < coaches.length; i++) {
                        let obj = coaches[i]
                        obj.is_present = true
                        coaches[i] = obj
                    }


                    this.setState({
                        playerList: players,
                        coachesList: coaches,
                        batchDetails: user1.data['batch']

                    })
                }

            }).catch((response) => {
                //handle form errors
                console.log(response);
            })

        });

    }
    progress(status) {
        this.setState({
            spinner: status
        })
    }



    renderItem(item) {
        return (

            <View style={{
                marginLeft: 10,
                marginRight: 10,

                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                height: 50
            }} key={item.id}>

                <View style={{
                    flex: 1,
                    marginLeft: 8,
                    marginRight: 15,
                    alignItems: 'center',
                    //marginBottom: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={[defaultStyle.regular_text_14, {
                        justifyContent: 'center',
                        alignItems: 'center'
                    }]}>
                        {item.name}
                    </Text>
                    <View style={{ backgroundColor: 'white', marginTop: 0 }}>
                        <CheckBox style={{ height: 30, width: 30, alignItems: 'center', backgroundColor: 'red' }}
                            activeOpacity={.8}
                            checkedIcon={<Image style={{
                                width: 18,
                                height: 18
                            }} resizeMode="contain"
                                source={require('../../images/ic_checkbox_on.png')} />}
                            uncheckedIcon={<Image style={{
                                width: 18,
                                height: 18
                            }} resizeMode="contain"
                                source={require('../../images/ic_checkbox_off.png')} />}
                            containerStyle={{
                                backgroundColor: 'white',
                                borderWidth: 0,
                                padding: 4,
                                margin: 0,
                                marginTop: 0,

                            }}
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
        )
    };

    renderCoachItem(item) {
        return (

            <View style={{
                marginLeft: 10,
                marginRight: 10,

                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                height: 50
            }} key={item.id}>

                <View style={{
                    flex: 1,
                    marginLeft: 8,
                    marginRight: 15,
                    alignItems: 'center',
                    //marginBottom: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={[defaultStyle.regular_text_14, {
                        justifyContent: 'center',
                        alignItems: 'center'
                    }]}>
                        {item.name}
                    </Text>
                    <View style={{ backgroundColor: 'white', marginTop: 0 }}>
                        <CheckBox style={{ height: 30, width: 30, alignItems: 'center', backgroundColor: 'red' }}
                            activeOpacity={.8}
                            checkedIcon={<Image style={{
                                width: 18,
                                height: 18
                            }} resizeMode="contain"
                                source={require('../../images/ic_checkbox_on.png')} />}
                            uncheckedIcon={<Image style={{
                                width: 18,
                                height: 18
                            }} resizeMode="contain"
                                source={require('../../images/ic_checkbox_off.png')} />}
                            containerStyle={{
                                backgroundColor: 'white',
                                borderWidth: 0,
                                padding: 4,
                                margin: 0,
                                marginTop: 0,

                            }}
                            checked={item.is_present}
                            onPress={() => {
                                console.log("he;eleleo", item.is_present)
                                let coachesList = [...this.state.coachesList];
                                let index = coachesList.findIndex(el => el.id === item.id);
                                coachesList[index] = { ...coachesList[index], is_present: !item.is_present };
                                this.setState({ coachesList });

                                //   item.isPresent = !item.isPresent
                                // this.setState({
                                //     playerList:item
                                // })

                                console.log("he;eleleo", coachesList[0].is_present)
                            }


                            }
                        />
                    </View>

                </View>

            </View>
        )
    };

    renderFooterItem = () => (

        <View style={{
            flex: 1, marginBottom: 30, marginRight: 20, marginLeft: 20,
            marginTop: 20,
            justifyContent: 'flex-end'
        }}>

            <CustomeButtonB onPress={() => { this.savePlayerAttendence() }}>
                Update
       </CustomeButtonB>


        </View>
    );



    savePlayerAttendence() {

        this.progress(true)
        const { session } = this.state.batchDetails;
        getData('header', (value) => {
            console.log("savePlayerAttendence header", value);
            // const yourDate = Date()
            // console.log("savePlaye", yourDate)
            // const NewDate = moment(yourDate).format('YYYY-MM-DD')
            const NewDate = moment(session.session_date).format('YYYY-MM-DD');
            console.log("savePlayerAttendence", NewDate);
            const {compensatory} = this.state
            var compensatory_batch = compensatory.map(item => {
                return {batch_id: item.batch_id, player_id: item.player_id, is_present: item.is_present}
            })
            console.log('compesatory batches', compensatory_batch)
            var dataDic = {};
            var dict = {};
            dict['batch_id'] = this.props.navigation.getParam('batch_id')//user.phoneNumber;
            dict['attendance_date'] = NewDate;
            dict['players'] = this.state.playerList
            dict['coaches'] = this.state.coachesList
            dict['compensatory'] = compensatory_batch


            dataDic['data'] = dict;
            console.log("dicttttc ", JSON.stringify(dataDic))

            console.warn('Save===> ', JSON.stringify(this.state.playerList))

            this.props.saveCoachBatchAttendence(value, this.props.navigation.getParam('batch_id'), dataDic).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.batchdata);
                console.log(' user response payload ' + user);
                let user1 = JSON.parse(user)
                this.progress(false)

                if (user1.success == true) {
                    // this.setState({
                    //     // playerList:user1.data['players'],
                    //     // batchDetails:user1.data['batch']
                    //
                    // })
                    this.props.navigation.goBack()
                    Events.publish(EVENT_REFRESH_DASHBOARD);
                }

            }).catch((response) => {
                //handle form errors
                this.progress(false)
                console.log(response);
            })
        });
    }

    renderNewBatches =(item, index) => (
        <View style={{marginBottom: 10}}>
            <View style={{ backgroundColor: 'white' }}>
                <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={defaultStyle.bold_text_14}>Batch : {item.batch_name} </Text>
                </View>
            </View>
            <View style={{
                marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 10,
                flexDirection: 'row', justifyContent: 'space-between'
            }}>
                <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 14, marginBottom: 10 }}>Player </Text>
                <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 14 }}>Present </Text>
            </View>
            <View style={{
                backgroundColor: 'white',
                height: 50,
            }}>
                <View style={{
                    flex: 1,
                    marginLeft: 18,
                    marginRight: 25,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={[defaultStyle.regular_text_14, {
                        justifyContent: 'center',
                        alignItems: 'center'
                    }]}>
                        {item.player_name}
                    </Text>
                    <View style={{ backgroundColor: 'white', marginTop: 0 }}>
                        <CheckBox style={{ height: 30, width: 30, alignItems: 'center', backgroundColor: 'red' }}
                            activeOpacity={.8}
                            checkedIcon={<Image style={{
                                width: 18,
                                height: 18
                            }} resizeMode="contain"
                                source={require('../../images/ic_checkbox_on.png')} />}
                            uncheckedIcon={<Image style={{
                                width: 18,
                                height: 18
                            }} resizeMode="contain"
                                source={require('../../images/ic_checkbox_off.png')} />}
                            containerStyle={{
                                backgroundColor: 'white',
                                borderWidth: 0,
                                padding: 4,
                                margin: 0,
                                marginTop: 0,
                            }}
                            checked={item.is_present}
                            onPress={() => {
                                let compensatoryData = [...this.state.compensatory];
                                compensatoryData[index].is_present = !compensatoryData[index].is_present
                                this.setState({ compensatory: compensatoryData });
                                console.log('compensatory', JSON.stringify(compensatoryData));
                            }}
                        />
                    </View>
                </View>
            </View>          
        </View>
    )

    render() {
        const {compensatory} = this.state
        let newBatches = []
        if(compensatory != null && compensatory.length > 0){
            for (let i = 0; i < compensatory.length; i++) {
                let item = compensatory[i]
                newBatches.push(this.renderNewBatches(item, i))
            }
        }

        if (this.props.data.loading && !this.state.batchDetails) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }


        if (this.state.batchDetails) {


            console.log('this.state.playerList', JSON.stringify(this.state.playerList))
            let player_list = []
            if (this.state.playerList.length > 0) {

                for (let i = 0; i < this.state.playerList.length; i++) {
                    let item = this.state.playerList[i]
                    console.log('obj=>', JSON.stringify(item))
                    player_list.push(this.renderItem(item))

                }
            }

            let coaches_list = []
            if (this.state.coachesList.length > 0) {

                for (let i = 0; i < this.state.coachesList.length; i++) {
                    let item = this.state.coachesList[i]
                    console.log('obj=>', JSON.stringify(item))
                    coaches_list.push(this.renderCoachItem(item))

                }
            }

            console.log('player_list->', player_list.length)
            const { batch_name, batch_category, batch_id, session } = this.state.batchDetails

            // this.attedenceMangement(attandence_batch)
            //
            // this.sessionMangement(operations)
            // this.scoreMangement(tournaments)

            return <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>

                <Spinner
                    visible={this.state.spinner}
                    textStyle={defaultStyle.spinnerTextStyle}
                />

                <View style={{ backgroundColor: 'white' }}>
                    <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={defaultStyle.bold_text_14}>Batch 1 : {batch_name} </Text>
                        {/* <Text style={defaultStyle.bold_text_14}>{batch_category} </Text> */}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20, marginTop: -10, }}>
                        <View style={{ marginTop: 5 }}>
                            <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 10, marginBottom: 10 }}>Date </Text>
                            <Text style={defaultStyle.regular_text_14}>
                                {moment(session.session_date).format("dddd, DD MMM YYYY")}
                            </Text>

                        </View>
                        <View style={{ marginTop: 5 }}>
                            <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 10, marginBottom: 10 }}>Time slot </Text>
                            <Text style={defaultStyle.regular_text_14}>
                                {getFormatTimeDate(session.session_date, session.start_time)
                                    + " - " +
                                    getFormatTimeDate(session.session_date, session.end_time)}
                            </Text>
                        </View>
                    </View>
                </View>

                <ScrollView>
                    <View>

                        <View style={{
                            marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 10,
                            flexDirection: 'row', justifyContent: 'space-between'
                        }}>
                            <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 14, marginBottom: 10 }}>Player </Text>
                            <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 14 }}>Present </Text>
                        </View>

                        <View style={
                            { backgroundColor: 'white', marginTop: -10, flex: 1 }}>

                            <View>

                                {player_list}

                            </View>

                            {/* <CustomeCard> */}

                            {/* <FlatList
                            data={this.state.playerList}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => item.id}
                            ListFooterComponent={this.renderFooterItem}
                        /> */}

                            {/* </CustomeCard> */}

                        </View>

                        {coaches_list.length > 0 ?
                            <View>
                                <View style={{
                                    marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 10,
                                    flexDirection: 'row', justifyContent: 'space-between'
                                }}>
                                    <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 14, marginBottom: 10 }}>Coach </Text>
                                    <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 14 }}>Present </Text>
                                </View>

                                <View style={
                                    { backgroundColor: 'white', marginTop: -10, flex: 1 }}>

                                    <View>

                                        {coaches_list}

                                    </View>

                                    {/* <CustomeCard> */}

                                    {/* <FlatList
                            data={this.state.playerList}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => item.id}
                            ListFooterComponent={this.renderFooterItem}
                        /> */}

                                    {/* </CustomeCard> */}

                                </View>
                            </View> : null}

                        <View>
                            <View style={{
                                marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 10,
                                flexDirection: 'row', justifyContent: 'space-between'
                            }}>
                                <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 14, marginBottom: 10 }}>Compensatory Batches</Text>
                                <Text
                                    style={styles.rounded_button_half} 
                                    onPress={() => this.props.navigation.navigate('AddCompensatoryBatch', {
                                        batch_id: this.props.navigation.getParam('batch_id'),
                                        compensatory: this.state.compensatory
                                        })}>
                                    Add
                                </Text>
                            </View>
                        </View>
                        
                        { newBatches }

                        {this.renderFooterItem()}
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
        data: state.BatchReducer,
    };
};
const mapDispatchToProps = {
    getCoachBatchAttendence, saveCoachBatchAttendence
};
export default connect(mapStateToProps, mapDispatchToProps)(MarkAttendence);

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

    },
    rounded_button_half: {
        width: '25%',
        padding: 10,
        borderRadius: 20,
        //borderWidth: 1,
        marginLeft: 4,
        //marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium'
    }


});
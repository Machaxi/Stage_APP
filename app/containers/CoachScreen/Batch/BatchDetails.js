
import React from 'react'


import { View, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-paper'

import { CustomeCard } from '../../../components/Home/Card'
import { getCoachBatchDetails } from "../../../redux/reducers/BatchReducer";
import { getData } from "../../../components/auth";
import { connect } from 'react-redux';
import BaseComponent, { defaultStyle, SESSION_DATE_FORMAT, formattedName } from '../../BaseComponent';
import moment from 'moment'
import { COACH, ACADEMY } from '../../../components/Constants';
import NavigationDrawerStructure from '../../../router/NavigationDrawerStructure';
import RightMenuToolbar from '../../../router/RightMenuToolbar';


class BatchDetails extends BaseComponent {

    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: navigation.getParam('batch_name', ''),
            headerTitleStyle: defaultStyle.headerStyle,

            headerLeft: (<NavigationDrawerStructure navigationProps={navigation}
                showBackAction={true}
                showDrawer={false} />
            ),
            headerRight: (
                <RightMenuToolbar navigationProps={navigation}
                    navigation={navigation} showHome={false} />
            )
        };

    };



    constructor(props) {
        super(props)

        this.state = {
            batchDetails: null,
            coactList: null,
            userData: null,
            academy_id: ''

        }
        const { navigation } = this.props.navigation;
        const batch_name = this.props.navigation.getParam('batch_name')
        this.props.navigation.setParams({
            batch_name: batch_name
        })
    }

    componentDidMount() {
        var userData;
        getData('header', (value) => {
            console.log("header", value);
        });

        console.log("CoachDashboard");
        getData('userInfo', (value) => {
            console.log('userInfo => ', value)
            userData = JSON.parse(value)
            this.setState({
                userData: JSON.parse(value)
            });
            console.log("userData.user", this.props.navigation.getParam('batch_id'))
            let userType = userData.user['user_type']
            this.state.academy_id = userData['academy_id']

            if (userType == COACH || userType == ACADEMY) {
                this.getCoachBatch(this.props.navigation.getParam('batch_id'))
            }


        });
    }

    getCoachBatch(batch_id) {
        getData('header', (value) => {
            console.log("header", value, batch_id);
            this.props.getCoachBatchDetails(value, batch_id).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.batchdata);
                console.log(' user response payload ' + user);
                let user1 = JSON.parse(user)

                if (user1.success == true) {
                    this.setState({
                        batchDetails: user1.data['batch'],
                        coactList: user1.data['batch'].coaches
                        // strenthList:user1.data.player_profile['stats']

                    })
                }

            }).catch((response) => {
                //handle form errors
                console.log(response);
            })

        });

    }

    sessionMangement(session) {

        console.log(session)
        sessionArray = [];
        // for (let i = 0; i < operations.next_sessions.length; i++)
        // {
        const { routine_name, session_date, is_canceled, end_time, start_time } = session

        console.log("is_canceled", { is_canceled })
        if (is_canceled == true) {
            sessionArray.push(
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{
                            margin: 10, textDecorationLine: 'line-through',
                            fontFamily: 'Quicksand-Medium',
                            color: '#404040'
                        }}>{routine_name}</Text>
                        <View style={{ backgroundColor: '#FF7373', margin: 0, borderRadius: 10 }}>
                            <Text style={{
                                margin: 10, color: 'white'
                            }}>Canceled</Text>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row', marginLeft: 10,
                        justifyContent: 'space-between',
                        marginRight: 10,
                        marginBottom: 10
                    }}>
                        <Text style={{
                            marginRight: 20,
                            fontSize: 14,
                            textDecorationLine: 'line-through'
                        }}>
                            {moment.utc(session_date).local().format(SESSION_DATE_FORMAT)}
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            textDecorationLine: 'line-through'
                        }}>
                            {moment.utc(session_date + " " + start_time).local().format("hh:mm a")
                                + "  -   " +
                                moment.utc(session_date + " " + end_time).local().format("hh:mm a")}
                        </Text>

                    </View>

                </View>
            );
        } else {
            sessionArray.push(
                <View>

                    <Text style={{
                        margin: 10,
                        color: '#404040',
                        fontFamily: 'Quicksand-Medium',
                    }}>{routine_name}</Text>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginLeft: 10,
                        marginRight: 10,
                        marginBottom: 10
                    }}>
                        <Text style={{
                            marginRight: 10,
                            fontSize: 14,
                            color: '#404040',
                            fontFamily: 'Quicksand-Regular',
                        }}>
                            {moment.utc(session_date).local().format(SESSION_DATE_FORMAT)}
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            color: '#404040',
                            fontFamily: 'Quicksand-Regular',
                        }}>
                            {moment.utc(session_date + " " + start_time).local().format("hh:mm a")
                                + "  -   " +
                                moment.utc(session_date + " " + end_time).local().format("hh:mm a")}
                        </Text>

                    </View>

                </View>
            );
        }
        // }
    }


    renderItem = ({ item }) => (
        <TouchableOpacity key={item} onPress={() => {

            this.props.navigation.navigate('CoachProfileDetail', {
                academy_id: this.state.academy_id,
                coach_id: item.id
            })

        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <View style={{ marginRight: 20, flexDirection: 'row', height: 50, alignItems: 'center' }}>

                    <Image source={{ uri: item.profile_pic }}
                        resizeMode="contain"
                        style={{
                            width: 36,
                            borderRadius: 8,
                            height: 36, marginRight: 10
                        }} />
                    <Text style={[defaultStyle.regular_text_14]}>{formattedName(item.name)}</Text>
                    <View style={{ fontFamily: 'Quicksand-Medium', backgroundColor: '#CDB473', borderRadius: 10, marginRight: 10, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                        {item.is_head ? <Text style={{ fontFamily: 'Quicksand-Medium', fontSize: 10, color: 'white', marginRight: 10, marginLeft: 10, textAlign: 'center' }}>Head Coach</Text> : null}
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../../images/ic_star.png')}
                        style={{
                            width: 14,
                            height: 14, marginRight: 6
                        }} />
                    <View style={{
                        borderColor: '#DFDFDF',
                        marginTop: 2, marginBottom: 2,
                        borderWidth: 1, borderRadius: 20, alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#707070',
                                fontFamily: 'Quicksand-Bold',
                                marginRight: 10,
                                marginLeft: 10,

                            }}>{item.ratings == undefined ? "0.0" :
                                item.ratings.toFixed(1)}</Text>

                    </View>
                    <Image source={require('../../../images/right_icon.png')}
                        style={{
                            width: 6,
                            height: 13,
                            marginLeft: 10
                        }} />
                </View>

            </View>

        </TouchableOpacity>

    );


    render() {
        if (this.props.data.loading && !this.state.batchDetails) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }
        if (this.state.batchDetails) {

            const { is_attandence_due, is_performance_due, is_reward_point_due, is_scorer, operations, tournaments, session } = this.state.batchDetails

            if (session != null)
                this.sessionMangement(session);

            return <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>
                <ScrollView style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>
                    <View style={{ marginTop: 20 }}>


                        <CustomeCard>
                            <View
                                style={{
                                    margin: 10,
                                    color: '#404040',

                                    color: '#404040',
                                    marginTop: 20, flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                <Text style={defaultStyle.bold_text_10}>Next Session</Text>

                            </View>
                            <View style={{ height: 1, backgroundColor: '#DFDFDF', marginLeft: 10, marginRight: 10 }} />
                            {sessionArray}

                        </CustomeCard>

                    </View>

                    <CustomeCard>
                        <View
                            style={{
                                marginLeft: 12,
                                marginRight: 12,
                                marginTop: 16
                            }}
                        >
                            <Text style={defaultStyle.bold_text_10}>Timing</Text>

                            <View style={defaultStyle.line_style} />


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                {operations.weekday ?
                                    <View style={{ width: '50%' }}>
                                        <Text style={{ fontSize: 10, color: '#A3A5AE', marginBottom: 10, fontFamily: 'Quicksand-Medium' }}>Weekdays</Text>
                                        <Text style={{ color: '#404040', fontSize: 14, marginBottom: 10, fontFamily: 'Quicksand-Regular' }}>{operations.weekday.days.join(' ')}</Text>
                                        <Text style={{ color: '#404040', fontSize: 14, marginBottom: 10, fontFamily: 'Quicksand-Regular' }}>
                                            {moment.utc("01/01/1970 " + operations.weekday.start_time).local().format("hh:mm a")
                                                + ' - ' +
                                                moment.utc("01/01/1970 " + operations.weekday.end_time).local().format("hh:mm a")
                                            }
                                        </Text>
                                    </View> : null}

                                {operations.weekend ?
                                    <View style={{ width: '50%' }}>
                                        <Text style={{ fontSize: 10, color: '#A3A5AE', marginBottom: 10, fontFamily: 'Quicksand-Medium' }}>Weekend</Text>
                                        <Text style={{ color: '#404040', fontSize: 14, marginBottom: 10, fontFamily: 'Quicksand-Regular' }}>{operations.weekend.days.join(' ')}</Text>
                                        <Text style={{ color: '#404040', fontSize: 14, marginBottom: 10, fontFamily: 'Quicksand-Regular' }}>
                                            {moment.utc("01/01/1970 " + operations.weekend.start_time).local().format("hh:mm a")
                                                + ' - ' +
                                                moment.utc("01/01/1970 " + operations.weekend.end_time).local().format("hh:mm a")
                                            }
                                        </Text>

                                    </View>
                                    : null}


                            </View>

                        </View>
                    </CustomeCard>

                    <CustomeCard>
                        <View
                            style={{
                                marginLeft: 12,
                                marginRight: 12,
                                marginTop: 16
                            }}
                        >
                            <Text style={defaultStyle.bold_text_10}>Coach</Text>

                            <View style={defaultStyle.line_style} />

                            <FlatList
                                data={this.state.coactList}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => item.id}
                            />
                        </View>
                    </CustomeCard>
                    <View >
                        <CustomeCard>
                            <TouchableOpacity onPress={() => {

                                console.warn("Touch Press")
                                this.props.navigation.navigate('PlayersListing', { batch_id: this.props.navigation.getParam('batch_id'), List_type: 'BATCH' })

                            }}>
                                <View style={{ margin: 10, flexDirection: 'row', height: 40 }}>

                                    <View style={{ flex: 1 }}>

                                        <View style={{
                                            marginTop: 10,
                                            flex: 1,
                                            marginRight: 15,
                                            marginBottom: 5,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <Text style={defaultStyle.regular_text_14}>
                                                View Players
                                            </Text>

                                            <Image source={require('../../../images/path.png')}
                                                style={{
                                                    width: 19,
                                                    height: 13, marginRight: 0, marginTop: 5
                                                }} />

                                        </View>
                                    </View>
                                </View>


                            </TouchableOpacity>
                        </CustomeCard>
                    </View>
                    <View >
                        <CustomeCard>
                            <TouchableOpacity onPress={() => {

                                //console.warn("Touch Press")
                                this.props.navigation.navigate('Performence')

                            }}>
                                <View style={{ margin: 10, flexDirection: 'row', height: 40 }}>


                                    <View style={{ flex: 1 }}>

                                        <View style={{
                                            marginTop: 10,
                                            flex: 1,
                                            marginRight: 15,
                                            marginBottom: 5,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <Text style={defaultStyle.regular_text_14}>
                                                Update Player Progress
                                            </Text>

                                            <Image source={require('../../../images/path.png')}
                                                style={{
                                                    width: 19,
                                                    height: 13, marginRight: 0, marginTop: 5
                                                }} />

                                        </View>
                                    </View>
                                </View>


                            </TouchableOpacity>
                        </CustomeCard>
                    </View>
                    <View >
                        <CustomeCard>
                            <TouchableOpacity onPress={() => {

                                console.warn("Touch Press")
                                //
                                this.props.navigation.navigate('AttendenceBook', {
                                    batch_id: this.props.navigation.getParam('batch_id'),
                                    batch_data: this.state.batchDetails,
                                    batch_name: this.props.navigation.getParam('batch_name')
                                })
                            }}>
                                <View style={{ margin: 10, flexDirection: 'row', height: 40 }}>


                                    <View style={{ flex: 1 }}>

                                        <View style={{
                                            marginTop: 10,
                                            flex: 1,
                                            marginRight: 15,
                                            marginBottom: 5,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <Text style={defaultStyle.regular_text_14}>
                                                Attendance Book
                                            </Text>

                                            <Image source={require('../../../images/path.png')}
                                                style={{
                                                    width: 19,
                                                    height: 13, marginRight: 0, marginTop: 5
                                                }} />

                                        </View>
                                    </View>
                                </View>


                            </TouchableOpacity>
                        </CustomeCard>
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
    getCoachBatchDetails
};
export default connect(mapStateToProps, mapDispatchToProps)(BatchDetails);


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
import React from 'react'

import { View, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList, ScrollView } from 'react-native';
import { Card, ActivityIndicator } from 'react-native-paper'
import { Rating } from 'react-native-ratings';
import { getData, storeData } from "../../components/auth";
import { getPlayerSWitcher, getCoachSWitcher } from "../../redux/reducers/switchReducer";
import { connect } from 'react-redux';
import BaseComponent, { defaultStyle, getFormattedLevel } from '../BaseComponent';
import PlayerHeader from '../../components/custom/PlayerHeader'

var deviceWidth = Dimensions.get('window').width - 20;
class PlayerSwitcher extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {

            userData: null,
            itemList: null,


        }
    }

    componentDidMount() {
        var userData;

        getData('header', (value) => {
            console.log("header", value);
        });

        console.log("PlayerSwitcher");
        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            this.setState({
                userData: JSON.parse(value)
            });
            console.log("userData.user", userData.user['user_type'])
            if (userData.user['user_type'] == 'PLAYER') {
                this.getPlayerSwitchingData()

            } else if (userData.user['user_type'] == 'FAMILY') {
                this.getPlayerSwitchingData()

            } if (userData.user['user_type'] == 'COACH') {

                this.getCoatchSwitchingData();
            }



        });

        // const { navigation } = this.props;
        // const otherParam = navigation.getParam('userType');

    }


    getPlayerSwitchingData() {
        console.log("hererererre");

        getData('header', (value) => {
            console.log("header", value);
            this.props.getPlayerSWitcher(value).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.switherlist);
                console.log(' user response payload ' + user);
                let user1 = JSON.parse(user)

                if (user1.success == true) {
                    this.setState({
                        itemList: user1.data['players']
                    })
                }

            }).catch((response) => {
                //handle form errors
                console.log(response);
            })

        });

    }

    getCoatchSwitchingData() {

        getData('header', (value) => {
            console.log("header", value);
            this.props.getCoachSWitcher(value).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.switherlist);
                console.log(' user response payload ' + user);
                let user1 = JSON.parse(user)

                if (user1.success == true) {
                    this.setState({
                        itemList: user1.data['academies']
                    })
                }

            }).catch((response) => {
                //handle form errors
                console.log(response);
            })

        });
    }


    renderItemAcedemic = ({ item }) => (
        <Card style={{ marginTop: 20, borderRadius: 10, margin: 10 }}>
            <TouchableOpacity onPress={() => {

                console.warn("Touch Press")
                var tempuserData = this.state.userData;
                tempuserData['academy_id'] = item.academy_id;
                console.log('tempuserData', tempuserData)
                storeData("userInfo", JSON.stringify(tempuserData))
                storeData('academy_name', item.academy_name)
                storeData('academy_id', item.academy_id)
                this.props.navigation.navigate('CHome', { academy_name: item.academy_name })

            }}>

                <View style={{ margin: 10, marginTop: 20, marginBottom: 10 }}>
                    <Text style={defaultStyle.bold_text_16}> {item.academy_name}</Text>
                </View>
                <View style={{
                    paddingLeft: 12,
                    paddingTop: 8, flexDirection: 'row', flex: 1
                }}>

                    <Rating
                        type='custom'
                        ratingColor='#F4FC9A'
                        ratingBackgroundColor='#D7D7D7'
                        ratingCount={5}
                        startingValue={item.academy_rating}
                        imageSize={14}
                        readonly={true}
                        style={{ height: 30, width: 80 }}
                    />

                    <Text style={{
                        backgroundColor: '#DFDFDF',
                        height: 19,
                        width: 30,
                        textAlign: 'center',
                        fontSize: 12,
                        color: '#707070',
                        fontFamily: 'Quicksand-Medium',
                        borderRadius: 12,
                    }}>{item.academy_rating}</Text>

                </View>

                {/* <View style={{ margin: 10, height: 80, flexDirection: 'row' }}>

                    <View style={{ margin: 5 }}>
                        <Text style={{ fontSize: 10, marginRight: 20 }}>Next Session</Text>

                        <Text style={{ marginRight: 20, fontSize: 14, marginTop: 10 }}>{item.next_session.next_sessions[0].session_date}</Text>
                        <Text style={{ marginRight: 20, fontSize: 14, marginTop: 10 }}>{item.next_session.next_sessions[0].start_time + "  -   " + item.next_session.next_sessions[0].end_time}</Text>
                    </View>

                </View> */}
            </TouchableOpacity>
        </Card>);



    renderItem = ({ item }) => (

        <Card style={{ marginTop: 20, borderRadius: 10 }}>
            <TouchableOpacity
                activeOpacity={.7}
                onPress={() => {

                    var tempuserData = this.state.userData;
                    tempuserData['academy_id'] = item.academy_id;
                    tempuserData['player_id'] = item.id;
                    tempuserData['academy_name'] = item.academy_name;
                    tempuserData['academy_rating'] = item.academy_rating;

                    console.log('tempuserData', tempuserData)
                    storeData("userInfo", JSON.stringify(tempuserData))

                    storeData('academy_name', item.academy_name)
                    storeData('academy_id', item.academy_id)
                    storeData('academy_rating', item.academy_rating)
                    storeData('player_id', item.id)

                    if (tempuserData.user['user_type'] == 'PLAYER') {
                        this.props.navigation.navigate('UHome')
                    } else {
                        this.props.navigation.navigate('PHome')
                    }


                }}>
                <View style={{ margin: 10, marginTop: 20, marginBottom: 20 }}>
                    <Text style={[defaultStyle.heavy_bold_text_14, { color: 'black' }]}>{item.academy_name} </Text></View>

                <PlayerHeader player_profile={item} />

                {/* <View style={{ margin: 10, height: 80, flexDirection: 'row' }}>


                    <View style={{ margin: 5 }}>
                        <Text style={defaultStyle.bold_text_10}>Attendance</Text>
                        <Text style={[defaultStyle.bold_text_14, { marginTop: 10 }]}>{item.operations.attendance['attendance'] + '%' + '(' + item.operations.attendance.month + ')'}</Text>
                    </View>
                    <View style={{ width: 1, backgroundColor: '#DFDFDF', margin: 10 }} />
                    <View style={{ margin: 5 }}>
                        <Text
                            style={[defaultStyle.bold_text_10, { marginRight: 20 }]}>Next Session</Text>

                        <Text
                            style={[defaultStyle.regular_text_14, { marginRight: 20, marginTop: 10 }]}>{item.operations.next_sessions[0].session_date}</Text>
                        <Text style={[defaultStyle.regular_text_14, { marginRight: 20, marginTop: 10 }]}>{item.operations.next_sessions[0].start_time + "  -   " + item.operations.next_sessions[0].end_time}</Text>
                    </View>

                </View> */}
            </TouchableOpacity>
        </Card>

    );
    render() {

        const { userData } = this.state;
        console.log("userData", userData)
        const otherParam = null
        if (userData) {
            const otherParam = userData.user['user_type'];
            console.log("otherParam", otherParam)
        }


        if (this.props.data.loading || this.state.itemList == null) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }


        return (

            <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>
                {userData ? <ScrollView style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>

                    {(userData.user['user_type'] == 'PLAYER' || userData.user['user_type'] == 'FAMILY') ? null : <View style={{ marginTop: 15, marginBottom: 0, flex: 1, alignItems: 'center' }}>
                        <Text style={defaultStyle.regular_text_14}>Select Academy</Text></View>}

                    <View>


                        <FlatList
                            data={this.state.itemList}
                            renderItem={(userData.user['user_type'] == 'PLAYER' || userData.user['user_type'] == 'FAMILY') ? this.renderItem : this.renderItemAcedemic}
                            keyExtractor={(item, index) => item.id}
                        />
                    </View>
                    <View style={{ margin: 5 }}>
                        <Card style={{ margin: 5, borderRadius: 10 }}>
                            <TouchableOpacity onPress={() => {

                                //console.warn("Touch Press")
                                this.props.navigation.navigate('CurrentBooking')

                            }}>
                                <View style={{ margin: 10, flexDirection: 'row', height: 40 }}>

                                    <Image source={require('../../images/book_play.png')}
                                        style={{
                                            width: 30,
                                            height: 30, marginRight: 20, marginTop: 5
                                        }} />
                                    <View style={{ flex: 1 }}>

                                        <View style={{
                                            marginTop: 10,
                                            flex: 1,
                                            marginRight: 15,
                                            marginBottom: 5,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <Text style={defaultStyle.bold_text_14}>
                                                Book and Play
                                    </Text>

                                            <Image source={require('../../images/path.png')}
                                                style={{
                                                    width: 19,
                                                    height: 13, marginRight: 0, marginTop: 5
                                                }} />

                                        </View>
                                    </View>
                                </View>


                            </TouchableOpacity>
                        </Card>
                    </View>


                    <View style={{ margin: 5 }}>
                        <Card style={{ margin: 5, borderRadius: 10 }}>
                            <TouchableOpacity onPress={() => {

                                console.warn("Touch Press")
                                this.props.navigation.navigate('AcademyListing')

                            }}>

                                <View style={{ margin: 10, flexDirection: 'row', height: 40 }}>

                                    <Image source={require('../../images/browse_academy.png')}
                                        style={{
                                            width: 30,
                                            height: 30, marginRight: 20, marginTop: 5
                                        }} />
                                    <View style={{ flex: 1 }}>

                                        <View style={{
                                            marginTop: 10,
                                            flex: 1,
                                            marginRight: 15,
                                            marginBottom: 5,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <Text style={defaultStyle.bold_text_14}>
                                                Browse other Academies
                                    </Text>

                                            <Image source={require('../../images/path.png')}
                                                style={{
                                                    width: 19,
                                                    height: 13, marginRight: 0, marginTop: 5
                                                }} />

                                        </View>
                                    </View>
                                </View>


                            </TouchableOpacity>
                        </Card>
                    </View>

                    <View style={{ margin: 5 }}>
                        <Card style={{ margin: 5, borderRadius: 10 }}>
                            <TouchableOpacity onPress={() => {

                                console.warn("Touch Press")


                            }}>
                                <View style={{ margin: 10, flexDirection: 'row', height: 40 }}>

                                    <Image source={require('../../images/about_dribble.png')}
                                        style={{
                                            width: 26,
                                            height: 26, marginRight: 20, marginTop: 5
                                        }} />
                                    <View style={{ flex: 1 }}>

                                        <View style={{
                                            marginTop: 10,
                                            flex: 1,
                                            marginRight: 15,
                                            marginBottom: 5,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <Text style={defaultStyle.bold_text_14}>
                                                About Dribble Diary
                                    </Text>

                                            <Image source={require('../../images/path.png')}
                                                style={{
                                                    width: 19,
                                                    height: 13, marginRight: 0, marginTop: 5
                                                }} />

                                        </View>
                                    </View>
                                </View>


                            </TouchableOpacity>
                        </Card>
                    </View>


                </ScrollView> : null}
            </View>
        );

    }
}

const mapStateToProps = state => {
    return {
        data: state.SwitchReducer,
    };
};
const mapDispatchToProps = {
    getPlayerSWitcher, getCoachSWitcher
};
export default connect(mapStateToProps, mapDispatchToProps)(PlayerSwitcher);


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
        color: '#F4F4F4',
        marginRight: 20,
        textAlign: 'right',
        fontSize: 22,
        fontFamily: "Quicksand-Bold"
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
import React from 'react'

import { View, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-paper'
import { Rating } from 'react-native-ratings';
import { getData, storeData } from "../../components/auth";
import { getPlayerSWitcher, getCoachSWitcher } from "../../redux/reducers/switchReducer";
import { connect } from 'react-redux';
import BaseComponent, { defaultStyle } from '../BaseComponent';

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
                this.props.navigation.navigate('CHome')

            }}>

                <View style={{ margin: 10, marginTop: 20, marginBottom: 10 }}>
                    <Text style={{ fontSize: 16 }}> {item.academy_name}</Text>
                </View>
                <View style={{ paddingLeft: 12, paddingTop: 8, flexDirection: 'row', flex: 1 }}>

                    <Rating
                        type='custom'
                        ratingColor='#F4FC9A'
                        ratingBackgroundColor='#D7D7D7'
                        ratingCount={5}
                        imageSize={14}
                        style={{ height: 30, width: 80 }}
                    />

                    <Text style={{
                        backgroundColor: '#DFDFDF', height: 19, width: 30, textAlign: 'center',
                        fontSize: 12,
                        color: '#707070',
                        paddingTop: 2,
                        borderRadius: 12,
                    }}>{item.academy_rating}</Text>

                </View>

                <View style={{ margin: 10, height: 80, flexDirection: 'row' }}>

                    <View style={{ margin: 5 }}>
                        <Text style={{ fontSize: 10, marginRight: 20 }}>Next Session</Text>

                        <Text style={{ marginRight: 20, fontSize: 14, marginTop: 10 }}>{item.next_session.next_sessions[0].session_date}</Text>
                        <Text style={{ marginRight: 20, fontSize: 14, marginTop: 10 }}>{item.next_session.next_sessions[0].start_time + "  -   " + item.next_session.next_sessions[0].end_time}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        </Card>);



    renderItem = ({ item }) => (

        <Card style={{ marginTop: 20, borderRadius: 10 }}>
            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => {

                    var tempuserData = this.state.userData;
                    tempuserData['academy_id'] = item.academy_id;
                    tempuserData['player_id'] = item.id;
                    tempuserData['academy_name'] = item.academy_name;
                    console.log('tempuserData', tempuserData)
                    storeData("userInfo", JSON.stringify(tempuserData))

                    if (tempuserData.user['user_type'] == 'PLAYER') {
                        this.props.navigation.navigate('UHome')
                    } else {
                        this.props.navigation.navigate('PHome')
                    }


                }}>
                <View style={{ margin: 10, marginTop: 20, marginBottom: 20 }}>
                    <Text style={[defaultStyle.heavy_bold_text_14, { color: 'black' }]}>{item.academy_name} </Text></View>
                <View style={{ width: '100%', marginTop: 0, height: 300, }}>
                    <ImageBackground
                        source={require('../../images/RectangleImg.png')}
                        style={{
                            width: '100%',
                            height: '100%', borderRadius: 20
                        }}>
                        <View style={{ marginTop: 20, flex: 1, height: '100%' }}>

                            <View style={{ position: 'relative' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../../images/playerimg.png')}
                                        style={{
                                            width: 201,
                                            height: 238, marginRight: 20, marginTop: 0, display: 'flex'
                                        }}>

                                    </Image>
                                    <View style={{ display: 'flex', flex: 1, marginBottom: 100 }}>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontFamily: 'Quicksand-Bold',
                                                color: 'white',
                                                marginRight: 0,
                                                textAlign: 'center',
                                                fontSize: 22,
                                            }}>{item.name}</Text>


                                        {/* <Image source={require('../../images/Rank.png')}
                                            style={{
                                                width: 119,
                                                height: 84,
                                                alignItems: 'center',
                                                display: 'flex',
                                                marginBottom: 20,
                                                marginTop: 20
                                            }}>

                                        </Image> */}

                                        <View style={{
                                            width: 119,
                                            height: 84,
                                            alignItems: 'center',
                                            display: 'flex',
                                            marginBottom: 20,
                                            marginTop: 20,
                                            justifyContent: 'center', alignItems: 'center',
                                        }}>

                                            <ImageBackground
                                                style={{
                                                    height: 38, width: 25, justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                                source={require('../../images/batch_pink.png')}>


                                                <View style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    backgroundColor: '#485FA0', height: 6, width: '120%'
                                                }}>
                                                    <Image style={{ height: 7, width: 12, marginLeft: -12 }}
                                                        source={require('../../images/left_batch_arrow.png')}></Image>

                                                    <Text style={{ fontSize: 5, color: 'white', textAlign: 'center' }}>{item.badge}</Text>
                                                    <Image style={{ height: 7, width: 12, marginRight: -12 }}
                                                        source={require('../../images/right_batch_arrow.png')}></Image>

                                                </View>
                                            </ImageBackground>


                                        </View>


                                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                            <Text style={{
                                                color: 'white',
                                                marginRight: 10,
                                                textAlign: 'center',
                                                fontSize: 12,
                                                fontFamily: 'Quicksand-Bold',
                                            }}>{item.player_level}</Text>
                                            <View
                                                style={{ backgroundColor: 'red', width: 60, marginRight: 20, marginTop: -5 }}>
                                                <Text style={{
                                                    color: 'white',
                                                    marginRight: 0,
                                                    textAlign: 'center',
                                                    fontSize: 12,
                                                    fontFamily: 'Quicksand-Bold',
                                                    marginTop: 5,
                                                    marginBottom: 5
                                                }}>{item.player_category} </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    position: 'absolute',
                                    bottom: 20,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    selfAlign: 'center'
                                }}>
                                    {console.log("width", deviceWidth / 3)}
                                    <View style={{
                                        width: deviceWidth / 3,
                                        height: 80, marginLeft: 10
                                    }}>

                                        <ImageBackground source={require('../../images/box.png')}
                                            style={{
                                                width: '100%',
                                                height: 80,
                                            }}>

                                            <Text style={{ fontSize: 12, margin: 15, color: '#F4F4F4', fontFamily: 'Quicksand-Medium' }}>Rank</Text>
                                            {item.rank ? <Text style={styles.scoreBox}>{item.rank}</Text> : <Text style={styles.scoreBox}>00</Text>}


                                        </ImageBackground>

                                    </View>
                                    <ImageBackground source={require('../../images/box.png')}
                                        style={{
                                            width: deviceWidth / 3,
                                            height: 80,
                                        }}>
                                        <Text style={{ fontFamily: 'Quicksand-Medium', fontSize: 12, margin: 15, color: '#F4F4F4' }}>Score</Text>
                                        <Text style={styles.scoreBox}>{item.score}</Text>

                                    </ImageBackground>
                                    <View style={{
                                        width: deviceWidth / 3,
                                        height: 80, marginRight: 0
                                    }}>
                                        <ImageBackground source={require('../../images/box.png')}
                                            style={{
                                                width: '100%',
                                                height: 80,
                                            }}>

                                            <Text style={{ fontFamily: 'Quicksand-Medium', fontSize: 12, margin: 15, color: '#F4F4F4' }}>Reward</Text>
                                            <Text style={styles.scoreBox}>{item.reward_point}</Text>


                                        </ImageBackground>

                                    </View>


                                </View>

                            </View>
                        </View>
                    </ImageBackground>

                </View>
                <View style={{ margin: 10, height: 80, flexDirection: 'row' }}>


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

                </View>
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
        return <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>
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


                        }}>
                            <View style={{ margin: 10, flexDirection: 'row', height: 40 }}>

                                <Image source={require('../../images/booking.png')}
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
                                            View other Players Progress
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


            </ScrollView> : null}
        </View>
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
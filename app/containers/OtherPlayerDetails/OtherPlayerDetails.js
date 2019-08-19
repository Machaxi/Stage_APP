import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import * as Progress from 'react-native-progress';

import { View, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { CustomeCard } from '../../components/Home/Card'
import { Card } from 'react-native-paper'
import { getData, storeData } from "../../components/auth";
import { getCoachSWitcher, getPlayerSWitcher } from "../../redux/reducers/switchReducer";
import { getOtherPlayerDashboard } from "../../redux/reducers/dashboardReducer";
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import PlayerHeader from '../../components/custom/PlayerHeader'
import BaseComponent, { defaultStyle } from '../BaseComponent';

var deviceWidth = Dimensions.get('window').width - 20;

class OtherPlayerDetails extends BaseComponent {

    constructor(props) {
        super(props)
        this.inputRefs = {

            acedemic: null

        };
        this.state = {

            userData: null,
            country: undefined,
            player_profile: null,
            strenthList: null
        }


    }

    componentDidMount() {
        getData('header', (value) => {
            console.log("header", value);
        });
        let academy_id = this.props.navigation.getParam('academy_id', '')
        let player_id = this.props.navigation.getParam('player_id', '')
        //alert('academy ' + academy_id)
        if (academy_id == '') {
            //console.warn('if=>')
            getData('userInfo', (value) => {
                let userData = JSON.parse(value)
                let academy_id = userData['academy_id']
               // console.warn('academy_id=>', academy_id)

                this.fetch(academy_id, player_id)
            });
        } else {
            this.fetch(academy_id, player_id)
        }

        // if (academy_id == '' || player_id == '') {
        //     alert('player id is missing')
        // } else {

        // }

        // console.log("PlayerDashboard academy_id=" + academy_id + " player_id" + player_id);
    }

    fetch(academy_id, player_id) {
        console.log("PlayerDashboard academy_id=" + academy_id + " player_id" + player_id);
        this.getPlayerDashboardData(academy_id, player_id)
    }



    getPlayerDashboardData(academy_id, player_id, ) {

        this.props.getOtherPlayerDashboard(academy_id, player_id).then(() => {
            // console.log(' user response payload ' + JSON.stringify(this.props.data));
            // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
            let user = JSON.stringify(this.props.data.dashboardData);
            console.log(' user getOtherPlayerDashboard ' + user);
            let user1 = JSON.parse(user)

            if (user1.success == true) {
                this.setState({
                    player_profile: user1.data['player_profile'],
                    strenthList: user1.data.player_profile['stats']

                })
            }

        }).catch((response) => {
            //handle form errors
            console.log(response);
        })
    }

    renderItem = ({ item }) => (
        <TouchableOpacity key={item} onPress={() => {

            console.warn("Touch Press1")

            // this.props.navigation.navigate('OrderTracking', {
            //     order_id: item.increment_id
            // })

        }}>
            <View style={{ margin: 10, flexDirection: 'row', height: 60 }}>

                <Image source={require('../../images/Mysatus.png')}
                    style={{
                        width: 40,
                        height: 40, marginRight: 20
                    }} />
                <View>

                    <View style={{
                        marginLeft: 8,
                        marginRight: 15,
                        marginBottom: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={defaultStyle.bold_text_14}>
                            {item.name}
                        </Text>
                        <Text style={defaultStyle.bold_text_12}>
                            {item.score}
                        </Text>
                    </View>
                    <Progress.Bar style={{ backgroundColor: '#E1E1E1', color: '#305F82', borderRadius: 11, borderWidth: 0 }} progress={item.score / 100} width={deviceWidth - 130} height={14} />
                </View>
                <View style={{
                    height: 50,
                    width: 30,
                    alignItems: 'center',
                    marginTop: 26, marginRight: 10, marginLeft: 20
                }}>
                    <Image source={require('../../images/ic_drawer_arrow.png')}
                        resizeMode="contain"
                        style={{
                            width: 5,
                            height: 11, marginRight: 10
                        }} />
                </View>

            </View>
        </TouchableOpacity>

    );






    render() {
        if (this.props.data.loading && !this.state.player_profile) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }
        if (this.state.player_profile) {
            const { name, academy_name, badge, rank, score, player_level, reward_point, player_category, operations } = this.state.player_profile

            return <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>
                <ScrollView style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>

                    <PlayerHeader
                        player_profile={this.state.player_profile}
                    />

                    {/* <View style={{ margin: 10 }}>
                        <CustomeCard>
                            <Text style={{ fontSize: 14, margin: 10 }}>My Stats </Text>
                            <FlatList
                                data={this.state.strenthList}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => item.id}
                            />
                        </CustomeCard>
                    </View> */}
                    {this.state.strenthList.length != 0 ?
                        <View style={{ margin: 10 }}>
                            <Card style={{ borderRadius: 12 }}>
                                <View>

                                    <Text style={[defaultStyle.bold_text_14, { marginLeft: 10, marginTop: 10 }]}>My Stats </Text>
                                    <View style={{
                                        width: 60,
                                        height: 3, marginLeft: 10,
                                        marginTop: 2, marginBottom: 8, backgroundColor: '#404040'
                                    }}></View>

                                    <FlatList
                                        data={this.state.strenthList}
                                        renderItem={this.renderItem}
                                        keyExtractor={(item, index) => item.id}
                                    />
                                </View>
                            </Card>
                        </View> : null}


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
        data: state.DashboardReducer,
    };
};
const mapDispatchToProps = {
    getOtherPlayerDashboard,
};
export default connect(mapStateToProps, mapDispatchToProps)(OtherPlayerDetails);




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
        marginBottom: 20,
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
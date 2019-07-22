
import React from 'react'


import { View, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-paper'

import { CustomeCard } from '../../../components/Home/Card'
import { getCoachBatch } from "../../../redux/reducers/BatchReducer";
import { getData } from "../../../components/auth";
import { connect } from 'react-redux';
import BaseComponent, { defaultStyle } from '../../BaseComponent'
import { COACH, ACADEMY } from '../../../components/Constants';

const acedemicList = [
    {
        label: 'India',
        value: 'IN',
    }

];

const placeholder = {
    label: 'Select Option',
    value: null,
    color: '#9EA0A4',
};
var deviceWidth = Dimensions.get('window').width - 20;

class BatchScreen extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {

            batchList: null,
            userData: null

        }
    }

    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: 'My Batch',
            headerTitleStyle: defaultStyle.headerStyle,

            headerLeft: (
                <TouchableOpacity
                    onPress={() => {
                        navigation.toggleDrawer();
                    }}
                    activeOpacity={.8}>
                    <Image
                        source={require('../../../images/hamburger.png')}
                        style={{ width: 20, height: 16, marginLeft: 12 }}
                    />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('SwitchPlayer')
                    }}
                    activeOpacity={.8}
                >
                    <Text
                        style={{
                            marginRight: 12,
                            fontFamily: 'Quicksand-Regular',
                            fontSize: 10,
                            color: '#667DDB'
                        }}
                    >Switch Academy</Text>
                </TouchableOpacity>

            )
        };

    };


    componentDidMount() {
        var userData;
        getData('header', (value) => {
            console.log("header", value);
        });

        console.log("CoachDashboard");
        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            this.setState({
                userData: JSON.parse(value)
            });
            let userType = userData.user['user_type']
            console.log("userData.user", userType)

            if (userType == COACH || userType == ACADEMY) {
                this.getCoachBatchList(userData['academy_id'], userData['coach_id'])
            }

        });
    }

    getCoachBatchList(academy_id, player_id, ) {
        getData('header', (value) => {
            console.log("header", value, academy_id, player_id);
            this.props.getCoachBatch(value, academy_id, player_id).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.batchdata);
                console.log(' user response payload ' + user);
                let user1 = JSON.parse(user)

                if (user1.success == true) {
                    this.setState({
                        batchList: user1.data['coach_batches'],
                        // strenthList:user1.data.player_profile['stats']

                    })
                }

            }).catch((response) => {
                //handle form errors
                console.log(response);
            })

        });

    }

    renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={.8}
            key={item} onPress={() => {

                this.props.navigation.navigate('BatchDetails', { batch_id: item.batch_id })

            }}>
            <CustomeCard>


                <View style={{
                    marginLeft: 8,
                    marginRight: 15,
                    margin: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={defaultStyle.bold_text_14}>
                        {item.batch_name}
                    </Text>
                    <Image source={require('../../../images/forward.png')}
                        style={{
                            width: 6,
                            height: 13, marginRight: 10, marginTop: 5
                        }} />


                </View>
                <View style={{ height: 1, backgroundColor: '#DFDFDF', margin: 10, marginTop: 0 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                    {/*<View>*/}
                    {/*<Text style={{fontSize:10,color:'#A3A5AE',marginBottom:10}}>Attendance</Text>*/}
                    {/*<Text style={{fontSize:14,marginBottom:10}}>80%</Text>*/}
                    {/*</View>*/}
                    <View>
                        <Text style={{
                            fontSize: 10, color: '#A3A5AE', marginBottom: 10,
                            fontFamily: 'Quicksand-Medium'
                        }}>Level</Text>
                        <Text style={{ fontSize: 14, marginBottom: 10, fontFamily: 'Quicksand-Regular' }}>{item.level}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 10, color: '#A3A5AE', marginBottom: 10, fontFamily: 'Quicksand-Medium' }}>Player</Text>
                        <Text style={{ fontSize: 14, marginBottom: 10, fontFamily: 'Quicksand-Regular' }}>{item.total_players}</Text>
                    </View>
                </View>

            </CustomeCard>
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
        // if (this.state.coach_profile) {


        if (this.state.batchList != null && this.state.batchList.length > 0) {
            return (
                <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>

                    <View style={{ margin: 10, marginTop: 20 }}>

                        <TouchableOpacity onPress={() =>
                            this.props.navigation.navigate('CancelSession')
                        }>
                            <Text style={{
                                color: '#667DDB', textAlign: 'right',
                                fontSize: 10,
                                fontFamily: 'Quicksand-Regular'
                            }}> Cancel Session</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={this.state.batchList}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => item.id}
                    />

                </View>);
        } else {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ marginTop: 50, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={defaultStyle.regular_text_14}>No Batch Found.</Text>
                    </View>
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
    getCoachBatch
};
export default connect(mapStateToProps, mapDispatchToProps)(BatchScreen);


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
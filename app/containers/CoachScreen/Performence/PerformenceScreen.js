
import React from 'react'


import { View, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, ScrollView, SectionList } from 'react-native';
import { Card } from 'react-native-paper'

import { CustomeCard } from '../../../components/Home/Card'
import { getCoachPerformenceList } from "../../../redux/reducers/PerformenceReducer";
import { getData } from "../../../components/auth";
import { connect } from 'react-redux';
import moment from "moment/moment";
import { COACH, ACADEMY } from '../../../components/Constants';
import BaseComponent, { defaultStyle } from '../../BaseComponent'


class PerformenceScreen extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {

            batchList: null,
            userData: null

        }
    }

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
            console.log("userData.user", userData.user['user_type'])
            let userType = userData.user['user_type']

            if (userType == COACH || userType == ACADEMY) {
                this.getCoachBatchList(userData['academy_id'], userData['coach_id'])

            }


        });
    }

    getCoachBatchList(academy_id, player_id, ) {
        getData('header', (value) => {
            console.log("header", value, academy_id, player_id);
            this.props.getCoachPerformenceList(value, academy_id, player_id).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.performencedata);
                console.log(' getCoachPerformenceList payload ' + user);
                let user1 = JSON.parse(user)

                if (user1.success == true) {
                    tempArray = []
                    for (let i = 0; i < user1.data['dues'].length; i++) {

                        var tempdata = user1.data.dues[i]
                        var month = user1.data.dues[i].month
                        var year = user1.data.dues[i].year

                        tempatta1 = []
                        for (let j = 0; j < user1.data.dues[i].batches.length; j++) {

                            var data = user1.data.dues[i].batches[j]
                            data['month'] = month
                            data['year'] = year
                            tempatta1[j] = data
                        }
                        // tempdata['title'] = moment('06-'+month +'-'+year).format('MMM YY')
                        tempdata['batches'] = tempatta1
                        tempArray[i] = tempdata
                    }

                    console.log('tempArray', tempArray)
                    this.setState({
                        batchList: tempArray,



                        // strenthList:user1.data.player_profile['stats']

                    })
                }

            }).catch((response) => {
                //handle form errors
                console.log(response);
            })

        });

    }

    renderItemSection = ({ item }) => (
        <View>
            <View style={{ marginLeft: 12, marginRight: 12, marginTop: 12 }}>
                <Text style={defaultStyle.bold_text_14}>
                    {moment('06-' + item.month + '-' + item.year).format('MMM YY')}
                </Text>
            </View>
            <FlatList
                data={item.batches}
                renderItem={this.renderItem}
                keyExtractor1={(item, index) => moment('06-' + item.month + '-' + item.year).format('MMM YY')}
            />
        </View>

    );

    renderItem = ({ item }) => (
        <TouchableOpacity key={item} onPress={() => {
            // console.warn("Touch Press",index)
            this.props.navigation.navigate('PlayersListing', { batch_id: item.batch_id, month: item.month, year: item.year })

        }}>
            <CustomeCard>

                <View style={{
                    marginLeft: 8,
                    marginRight: 15,
                    margin: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Text style={defaultStyle.regular_text_14}>
                        {item.batch_name}
                    </Text>
                    <Image source={require('../../../images/forward.png')}
                        resizeMode="contain"
                        style={{
                            width: 5,
                            height: 11,
                        }} />


                </View>
                <View style={[defaultStyle.line_style, { marginLeft: 10, marginRight: 10 }]} />
                <View style={{ flexDirection: 'row', margin: 10 }}>

                    <View style={{ wdith: '50%' }}>
                        <Text style={[defaultStyle.regular_text_10, { color: '#A3A5AE', marginBottom: 10 }]}>Category</Text>
                        <Text style={[defaultStyle.regular_text_14, { marginBottom: 10 }]}>{item.batch_category}</Text>
                    </View>
                    <View style={{ wdith: '40%', marginLeft: 100 }}>
                        <Text style={[defaultStyle.regular_text_10, { color: '#A3A5AE', marginBottom: 10 }]}>Players to be updated</Text>
                        <Text style={[defaultStyle.regular_text_14, { marginBottom: 10 }]}>{item.remaining_players}</Text>
                    </View>
                </View>

            </CustomeCard>
        </TouchableOpacity>

    );


    render() {
        if (this.props.data.loading && !this.state.batchList) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }
        if (this.state.batchList && this.state.batchList.length > 0) {


            return <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>

                <FlatList
                    data={this.state.batchList}
                    renderItem={this.renderItemSection}
                    keyExtractor={(item, index) => item.id}
                />

            </View>;
        } else {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ marginTop: 50, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={defaultStyle.regular_text_14}>No Dues Yet.</Text>
                    </View>
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
    getCoachPerformenceList
};
export default connect(mapStateToProps, mapDispatchToProps)(PerformenceScreen);


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
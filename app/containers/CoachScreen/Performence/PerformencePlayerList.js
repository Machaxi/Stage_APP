
import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import * as Progress from 'react-native-progress';

import { View, TextInput, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-paper'
import { SwitchButton, CustomeButtonB } from '../../../components/Home/SwitchButton'
import { CustomeCard } from '../../../components/Home/Card'
import { getPerformenceDuePlayer } from "../../../redux/reducers/PerformenceReducer";
import { getData } from "../../../components/auth";
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements'
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import { COACH, ACADEMY } from '../../../components/Constants';
const acedemicList = [
    {
        label: 'India',
        value: 'IN',
    }

];
const KEYS_TO_FILTERS = ['name',];
const placeholder = {
    label: 'Select Option',
    value: null,
    color: '#9EA0A4',
};
var deviceWidth = Dimensions.get('window').width - 20;

class PerformencePlayerList extends React.Component {

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
            batchDetails: null,
            attendenceDate: '26-JUNE-2019',
            searchtxt: '',
            isSearching: false,
            searchArray: null
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

                //const yourDate = Date()

                // const NewDate = moment(this.state.attendenceDate).format('YYYY-MM-DD')
                // console.log("savePlaye",NewDate)
                this.getPerformencePlayerData(this.props.navigation.getParam('batch_id'), this.props.navigation.getParam('month'), this.props.navigation.getParam('year'))

            }


        });
    }

    getPerformencePlayerData(btach_id, month, year) {
        getData('header', (value) => {
            console.log("header", value, btach_id);
            this.props.getPerformenceDuePlayer(value, btach_id, month, year).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.performencedata);
                console.log(' user response payload ' + user);
                let user1 = JSON.parse(user)

                if (user1.success == true) {
                    this.setState({
                        playerList: user1.data['players'],
                        batchDetails: user1.data['batch'],
                        searchArray: user1.data['players']
                    })
                }

            }).catch((response) => {
                //handle form errors
                console.log(response);
            })

        });

    }




    renderItem = ({ item }) => (
        <TouchableOpacity key={item} onPress={() => {

            console.warn("Touch Press")

            this.props.navigation.navigate('UpdatePlayerPerformence', {
                batch_id: '1', player_id: item.id, month: this.props.navigation.getParam('month'), year: this.props.navigation.getParam('year')
            })

        }}>
            <View style={{ marginLeft: 0, marginRight: 10, flex: 1, flexDirection: 'row', height: 50 }}>

                <View style={{
                    flex: 1,
                    marginLeft: 8,
                    marginRight: 15,
                    marginBottom: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text>
                        {item.name}
                    </Text>

                    <Image source={require('../../../images/forward.png')}
                        style={{
                            width: 3,
                            height: 8, marginRight: -10, marginTop: 5
                        }} />

                </View>


            </View>
        </TouchableOpacity>

    );

    find(query) {
        const { playerList } = this.state;

        if (query === '') {
            return playerList;
        }
        try {
            const regex = new RegExp(`${query.trim()}`, 'i');
            console.log('regex ', regex)

            return playerList.filter(item => item.name.search(regex) >= 0);
        } catch (e) {
            // alert(e);
            return false;
        }

    }




    render() {
        if (this.props.data.loading && !this.state.player_profile) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }
        if (this.state.batchDetails) {
            const { batch_name, batch_category, total_players, remaining_players, batch_id, session } = this.state.batchDetails

            // this.attedenceMangement(attandence_batch)
            //
            // this.sessionMangement(operations)
            // this.scoreMangement(tournaments)

            //
            // {console.warn(filteredEmails)}
            return <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>


                <View style={{ backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', margin: 20, }}>
                        <View style={{ justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 10, marginBottom: 5, color: '#A3A5AE' }}>Batch name</Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{batch_name} </Text>
                        </View>

                        <View style={{ justifyContent: 'space-between', marginLeft: 30 }}>
                            <Text style={{ fontSize: 10, marginBottom: 5, color: '#A3A5AE' }}>Category</Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{batch_category}</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', margin: 20, justifyContent: 'space-between' }}>
                        <View style={{ justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 10, marginBottom: 5, color: '#A3A5AE' }}>Total players</Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{total_players} </Text>
                        </View>

                        <View style={{ justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 10, marginBottom: 5, color: '#A3A5AE' }}>Update remaining</Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{remaining_players}</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 10, marginBottom: 5, color: '#A3A5AE' }}>Month</Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{moment('06-' + this.props.navigation.getParam('month') + '-' + this.props.navigation.getParam('year')).format('MMM YY')}</Text>
                        </View>

                    </View>
                    <View>

                    </View>
                    <TextInput
                        // autoFocus
                        style={{ height: 40, margin: 15, paddingLeft: 10, borderWidth: 0.5, borderColor: '#CECECE', borderRadius: 15 }}
                        onChangeText={value => {

                            const data = this.find(value);
                            // this.state.searchArray = data;
                            this.setState({
                                searchtxt: value,
                                searchArray: data
                            })

                        }}
                        placeholder={'Search'}
                        value={this.state.searchtxt}
                    />
                </View>

                <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, marginBottom: 10, color: '#A3A5AE' }}>Name </Text>

                </View>

                <View style={{ backgroundColor: 'white', marginTop: -10 }}>
                    <CustomeCard>

                        <FlatList
                            data={this.state.searchArray}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => item.id}
                        />
                    </CustomeCard>

                </View>

                <View style={{ flex: 1, marginBottom: 30, marginRight: 20, marginLeft: 20, justifyContent: 'flex-end' }}>

                    {/*<CustomeButtonB onPress={() => {this.savePlayerAttendence()}}>*/}
                    {/*Update*/}
                    {/*</CustomeButtonB>*/}


                </View>


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
    getPerformenceDuePlayer
};
export default connect(mapStateToProps, mapDispatchToProps)(PerformencePlayerList);


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
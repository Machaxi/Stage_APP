import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Image, FlatList, TextInput, Keyboard, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, { defaultStyle, getFormattedTournamentType, getFormattedCategory, getFormattedTournamentLevel } from '../BaseComponent'
import { ScrollView } from 'react-native-gesture-handler';
import Moment from 'moment';
import { connect } from 'react-redux';
import { getData } from "../../components/auth";
import { getRegisteredTournament, getTournamentFixture } from "../../redux/reducers/TournamentReducer";
import { COACH } from '../../components/Constants'
import RNPickerSelect from 'react-native-picker-select'
import Icon from 'react-native-vector-icons'
const placeholder = {
    label: 'Select',
    value: null,
    color: '#9EA0A4',
};
class ResultsTournamentDetail extends BaseComponent {


    constructor(props) {
        super(props)
        this.state = {
            tournament_data: null,
            data: null,
            tournament_fixtures: [],
            is_show_dialog: false,
            tournament_id: '',
            user_type: '',
            is_coach: false,
            tournament_category: [],
            selected_tournament_category: '',
            selected_gender: '',
            gender: [{ label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' }],
            fixture_type: []

        }


        this.inputRefs = {
            tournament: null,
            gender: null
        };

        getData('userInfo', (value) => {

            if (value != '') {

                let userData = JSON.parse(value)
                let user_type = userData.user['user_type']
                this.state.is_coach = user_type == COACH
                this.setState({
                    user_type: user_type
                })
            }
        });


        this.dialogRef = React.createRef();
        this.state.tournament_id = this.props.navigation.getParam('id')
        this.getFixtureData()

    }

    getFixtureData() {

        let tournament_id = this.state.tournament_id

        getData('header', (value) => {

            this.props.getTournamentFixture(value, tournament_id).then(() => {

                let data = this.props.data.data
                console.log(' getTournamentFixture ' + JSON.stringify(data));

                let success = data.success
                if (success) {

                    let tournament_data = data.data.tournament
                    this.state.tournament_data = tournament_data
                    console.warn('tournament_data =>', JSON.stringify(tournament_data))
                    let tournament_category = []
                    let tournament_fixtures = data.data.tournament_fixtures
                    for (let i = 0; i < tournament_fixtures.length; i++) {
                        let obj = tournament_fixtures[i]
                        tournament_category.push(obj.tournament_category)
                    }
                    let unique = [...new Set(tournament_category)];
                    console.warn('unique=> ', unique)
                    let temp_cat = []
                    for (let i = 0; i < unique.length; i++) {
                        let obj = {
                            label: getFormattedCategory(unique[i]),
                            value: unique[i],
                        }
                        temp_cat.push(obj)
                    }
                    this.setState({
                        tournament_category: temp_cat,
                        tournament: tournament_data
                    })


                    if (tournament_fixtures != null && tournament_fixtures.length > 0) {
                        console.log(' tournament_fixtures ' + JSON.stringify(data.data.tournament_fixtures));
                        this.setState({
                            tournament_fixtures: tournament_fixtures,
                        })
                    }
                    else {
                        //alert('No data found.')
                    }

                }

            }).catch((response) => {
                console.log(response);
            })
        })
    }

    filterMatch() {

        let category = this.state.selected_tournament_category
        let gender = this.state.selected_gender
        const filter = []

        if (category != '') {

            const tournament_fixtures = this.state.tournament_fixtures
            for (let i = 0; i < tournament_fixtures.length; i++) {
                let obj = tournament_fixtures[i]
                if (obj.tournament_category == category) {

                    if (gender == '' || gender == null)
                        filter.push(obj)
                    else if (obj.gender_type == gender.toUpperCase()) {
                        filter.push(obj)
                        //filter.push(obj)
                    }
                }
            }
            console.log('filter => ', filter.length)
            this.state.fixture_type = filter
            this.setState({
                fixture_type: filter
            })
        }


    }

    getIconByType(type) {
        if (type == 'SINGLE') {
            return require('../../images/single_man.png')
        }
        else if (type == 'DOUBLE') {
            return require('../../images/double.png')
        }
        else if (type == 'MIX_DOUBLE') {
            return require('../../images/mixed_double.png')
        } else {
            return require('../../images/single_man.png')
        }
    }

    render() {

        let data = this.state.tournament_data
        console.warn('data => ', JSON.stringify(data))

        if (this.props.data.loading || data == null) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        let size = this.state.tournament_fixtures.length
        let name = data.name + " "

        return (

            <ScrollView>

                <View style={styles.chartContainer}>

                    <Card
                        style={{
                            elevation: 2
                        }}>
                        <View style={{ marginLeft: 8, marginRight: 8, marginTop: 2 }}>
                            <Image style={{ height: 150, width: "100%" }}
                                source={{ uri: data.cover_pic }}
                            />


                            <View style={{
                                marginLeft: 6,
                                marginRight: 6,
                                marginBottom: 12
                            }}>

                                <View style={{
                                    paddingTop: 12, paddingRight: 12,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>

                                    <Text style={defaultStyle.bold_text_14}>
                                        {data.name}
                                    </Text>

                                    {/* <Image
                                        resizeMode="contain"
                                        style={{ width: 16, height: 18, marginRight: 8 }}
                                        source={require('../../images/share.png')}
                                    /> */}

                                </View>


                                <View style={{ paddingTop: 8, flexDirection: 'row' }}>

                                    <Text style={defaultStyle.bold_text_14}>
                                        {data.month + " " + data.year}
                                    </Text>

                                    <Text style={{
                                        backgroundColor: '#667DDB',
                                        textAlign: 'center',
                                        fontSize: 11,
                                        marginLeft: 8,
                                        color: 'white',
                                        borderRadius: 4,
                                        paddingLeft: 6,
                                        paddingRight: 6,
                                        paddingTop: 2,
                                        paddingBottom: 2,
                                        fontFamily: 'Quicksand-Medium'
                                    }}>{getFormattedTournamentType(data.academic_type)}</Text>

                                </View>

                                <Text style={{
                                    paddingTop: 6, fontSize: 14,
                                    color: '#404040',
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    Dates <Text style={defaultStyle.bold_text_14}>
                                        {Moment(data.start_date).format('DD MMM') + " - " + Moment(data.end_date).format('DD MMM')}
                                    </Text>
                                </Text>


                                {size > 0 ?
                                    <View>

                                        <Text style={[defaultStyle.bold_text_14, {
                                            paddingTop: 24,
                                        }]}>
                                            Fixtures
                                         </Text>

                                        <View style={{
                                            flexDirection: 'row',
                                            marginTop: 12,

                                        }}>
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
                                                        this.inputRefs.tournament = el;
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
                                        <View style={{ marginTop: 20, marginBottom: 8, backgroundColor: '#DFDFDF', height: 1 }}></View>


                                        {this.state.fixture_type.length > 0 ?
                                            <FlatList
                                                style={{
                                                    margin: 8,
                                                }}
                                                contentContainerStyle={{
                                                    margin: 8
                                                }}
                                                data={this.state.fixture_type}
                                                numColumns={2}
                                                renderItem={({ item }) =>

                                                    <View style={{
                                                        flex: 0.5,
                                                        marginRight: 8,
                                                        marginBottom: 4,
                                                    }}>
                                                        <TouchableOpacity
                                                            activeOpacity={1}
                                                            onPress={() => {
                                                                this.props.navigation.navigate('TournamentFixture', {
                                                                    data: JSON.stringify(item),
                                                                    title: name + item.name
                                                                })
                                                            }}
                                                        >

                                                            <Card style={styles.card_style}>

                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center'
                                                                }}>

                                                                    <Image
                                                                        resizeMode="contain"
                                                                        style={{ width: 40, height: 48, marginLeft: 16 }}
                                                                        source={this.getIconByType(item.tournament_type)}
                                                                    />

                                                                    <Text style={{
                                                                        fontSize: 14,
                                                                        color: '#404040',
                                                                        marginLeft: 12,
                                                                        fontFamily: 'Quicksand-Regular'
                                                                    }}>{getFormattedTournamentLevel(item.tournament_type)}</Text>
                                                                </View>
                                                            </Card>
                                                        </TouchableOpacity>

                                                    </View>

                                                }
                                            /> :
                                            <Text style={[defaultStyle.bold_text_14, {
                                                paddingTop: 24,
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: 'center'
                                            }]}>
                                                {this.state.selected_tournament_category == '' ?
                                                    'Select Category to see fixture' : 'Fixture not available'}
                                            </Text>}</View> :

                                    <Text style={[defaultStyle.bold_text_14, {
                                        paddingTop: 24,
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center'
                                    }]}>
                                        No data found
                                         </Text>}
                            </View>

                        </View>
                    </Card>
                </View></ScrollView >
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.TournamentReducer,
    };
};
const mapDispatchToProps = {
    getRegisteredTournament, getTournamentFixture
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsTournamentDetail);

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
    },
    inputAndroid: {
        fontSize: 14,
        fontFamily: 'Quicksand-Regular',
        borderColor: '#614051',
        borderRadius: 8,
        color: 'black',
    },
});

const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },
    card_style: {
        width: "100%",
        paddingTop: 8,
        paddingBottom: 8,
        elevation: 2,
        margin: 4,
        borderRadius: 16
    },
    rounded_button: {
        width: '48%',
        padding: 10,
        borderRadius: 20,
        //borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
    rounded_button_white: {
        width: '48%',
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: 'white',
        color: '#67BAF5',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
});


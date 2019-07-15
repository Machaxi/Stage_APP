import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput, Keyboard, Text } from 'react-native';
import { Card, ActivityIndicator, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, { defaultStyle } from '../BaseComponent'
import { CustomeButtonB } from '../../components/Home/Card';
import { getRegisteredTournament, getTournamentFixture } from "../../redux/reducers/TournamentReducer";
import { connect } from 'react-redux';
import { getData } from "../../components/auth";
import Moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';

class RegisteredRoute extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            tournaments: null,
            query: '',
            spinner: false,
        }
    }
    componentDidMount() {

        getData('header', (value) => {

            this.props.getRegisteredTournament(value).then(() => {
                let data = this.props.data.data
                console.log(' getRegisteredTournament ' + JSON.stringify(data));

                let success = data.success
                if (success) {

                    console.log(' 1getRegisteredTournament ' + JSON.stringify(data.data.tournaments));

                    this.setState({
                        tournaments: data.data.tournaments
                    })
                }

            }).catch((response) => {
                console.log(response);
            })
        })
    }

    progress(status) {
        this.setState({
            spinner: status
        })
    }

    getFixtureData(tournament_id) {

        this.progress(true)

        getData('header', (value) => {

            this.props.getTournamentFixture(value, tournament_id).then(() => {

                this.progress(false)

                let data = this.props.data.data
                console.log(' getTournamentFixture ' + JSON.stringify(data));

                let success = data.success
                if (success) {

                    console.log(' tournament_fixtures ' + JSON.stringify(data.data.tournament_fixtures));

                    let fixture_data = data.data.tournament_fixtures[1].tournament_matches
                    console.log('fixture array ', fixture_data)

                    let playerArray = []

                    for (var key in fixture_data) {
                        if (fixture_data.hasOwnProperty(key)) {
                            console.log("KEY = >", key)
                            //console.log(data[key].id);
                            let tournament_matches = fixture_data[key]

                            let count = 0
                            let subArray = []
                            for (let i = 0; i < tournament_matches.length; i++) {

                                let obj = tournament_matches[i]

                                let player1 = obj.player1
                                let player2 = obj.player2
                                //subArray[count++] = player1
                                ///subArray[count++] = player2
                                subArray.push(player1)
                                subArray.push(player2)
                            }
                            playerArray.push(subArray)

                        }
                    }
                    console.log('Final => ', JSON.stringify(playerArray))

                    this.props.navigation.navigate('TournamentFixture', { data: JSON.stringify(playerArray) })

                }

            }).catch((response) => {
                console.log(response);
                this.progress(false)
            })
        })

    }

    find(query) {
        if (query === '') {
            return [];
        }
        const { suggestionResult } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        console.log('regex ', regex)
        return suggestionResult.filter(item => item.name.search(regex) >= 0);
    }

    listHeader() {

        return (
            <View
                style={{
                    marginLeft: 16,
                    marginRight: 16,
                    marginTop: 16,
                    marginBottom: 8,
                    borderRadius: 12
                }}>
                <Card style={{ borderRadius: 16, elevation: 1 }}>

                    <TextInput style={{
                        marginLeft: 8,
                        backgroundColor: 'white',
                        borderRadius: 16,
                        fontFamily: 'Quicksand-Regular'
                    }} placeholder="Search"></TextInput>


                </Card>

                <Text style={{
                    marginTop: 8,
                    marginBottom: 4,
                    textAlign: 'right',
                    color: '#404040',
                    fontSize: 12,
                    fontFamily: 'Quicksand-Regular'
                }} >Filter</Text>

                <View style={{ width: '100%', height: 1, backgroundColor: '#d7d7d7' }}></View>
            </View>
        )
    }
    _renderItem = ({ item }) => (

        <TouchableOpacity activeOpacity={.8}
            onPress={() => {
                this.props.navigation.navigate('RegisteredTournamentDetail')
            }}>

            <Card
                style={{
                    borderRadius: 16,
                    marginLeft: 16,
                    marginRight: 16,
                    marginTop: 8,
                    marginBottom: 8,
                    elevation: 2

                }}>
                <View>
                    <Image style={{ height: 150, width: "100%", borderRadius: 16, }}
                        source={{ uri: item.cover_pic }}
                    >

                    </Image>

                    <View style={{
                        paddingLeft: 16,
                        paddingTop: 8,
                        paddingBottom: 8
                    }}>


                        <View style={{
                            paddingTop: 12, paddingRight: 12,
                            flexDirection: 'row', flex: 1, justifyContent: 'space-between'
                        }}>

                            <Text style={defaultStyle.bold_text_14}>
                                {item.name}
                            </Text>

                            <Image
                                style={{ width: 5, height: 12, }}
                                source={require('../../images/forward.png')}
                            >

                            </Image>

                        </View>


                        <View style={{ paddingTop: 8, flexDirection: 'row', flex: 1 }}>

                            <Text style={defaultStyle.bold_text_14}>
                                {Moment(item.start_date).format('MMM YYYY')}
                            </Text>

                            <Text style={defaultStyle.blue_rounded_4}>{item.academic_type}</Text>

                        </View>

                        <Text style={{
                            paddingTop: 6,
                            fontSize: 14,
                            color: '#404040',
                            fontFamily: 'Quicksand-Regular'
                        }}>
                            Dates <Text style={defaultStyle.bold_text_14}>
                                {Moment(item.start_date).format('DD') + " - " + Moment(item.end_date).format('DD MMM')}
                            </Text>
                        </Text>

                        <Text style={{
                            paddingTop: 6, fontSize: 14,
                            color: '#FF7373',
                            fontFamily: 'Quicksand-Regular'
                        }}>
                            Last Date of Registration
                            <Text style={defaultStyle.bold_text_14}>
                                {Moment(item.registration_last_date).format('DD MMM YYYY')}</Text>
                        </Text>



                        <View style={{ marginTop: 8, marginBottom: 8, backgroundColor: '#DFDFDF', height: 1 }}></View>

                        <Text style={{
                            fontSize: 10,
                            color: '#A3A5AE',
                            fontFamily: 'Quicksand-Regular'
                        }}>
                            Registered Players
                    </Text>

                        <Text style={
                            [defaultStyle.bold_text_14, { paddingTop: 10, }]}>
                            Prithiviraj P | Prithiviraj P | Prithiviraj P
                    </Text>

                        <TouchableOpacity activeOpacity={.8}
                            onPress={() => {
                                this.getFixtureData(item.id)
                            }}
                        >


                            <View style={{
                                width: '100%',
                                marginTop: 12,
                                marginBottom: 8,
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>


                                <Text style={defaultStyle.rounded_button_150}>
                                    View Fixtures
                                </Text>


                            </View>
                        </TouchableOpacity>

                    </View>
                </View>

            </Card>
        </TouchableOpacity>

    );

    render() {

        if (this.props.data.loading && this.state.tournaments == null) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        return (

            <View style={styles.chartContainer}>

                <Spinner
                    visible={this.state.spinner}
                    textStyle={defaultStyle.spinnerTextStyle}
                />

                <FlatList
                    ListHeaderComponent={() => this.listHeader()}
                    data={this.state.tournaments}
                    extraData={this.state.tournaments}
                    renderItem={this._renderItem}
                />

            </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(RegisteredRoute);

const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },

});


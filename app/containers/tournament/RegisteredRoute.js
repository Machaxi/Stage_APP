import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator,View, TouchableOpacity, Image, FlatList, TextInput, Keyboard, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, { defaultStyle,getFormattedTournamentType } from '../BaseComponent'
import { CustomeButtonB } from '../../components/Home/Card';
import { getRegisteredTournament, getTournamentFixture } from "../../redux/reducers/TournamentReducer";
import { connect } from 'react-redux';
import { getData } from "../../components/auth";
import Moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import TournamentCategoryDialog from './TournamentCategoryDialog'
import { SkyFilledButton } from '../../components/Home/SkyFilledButton';

var filterData = ''


class RegisteredRoute extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            tournaments: [],
            tournament_fixtures: [],
            query: '',
            spinner: false,
            is_show_dialog: false,
            isRefreshing: false
        }
    }
    componentDidMount() {

        this.selfComponentDidMount('')
    }

    selfComponentDidMount(filter) {
        getData('header', (value) => {

            this.props.getRegisteredTournament(value, filter).then(() => {
                let data = this.props.data.data
                console.log(' getRegisteredTournament ' + JSON.stringify(data));

                let success = data.success
                if (success) {

                    console.log(' 1getRegisteredTournament ' + JSON.stringify(data.data.tournaments));

                    this.setState({
                        tournaments: data.data.tournaments
                    })
                }
                this.setState({ isRefreshing: false })

            }).catch((response) => {
                this.setState({ isRefreshing: false })
                console.log(response);
            })
        })
    }

    progress(status) {
        this.setState({
            spinner: status
        })
    }

    onFilterSelected(data) {
        filterData = data

        if (data != '') {
            //query_param = query
            //?gender_type=MALE&tournament_type=SINGLE&category_type=U10

            let gtype = ""
            let ttype = ""
            let ctype = ""

            let tournament_categories = filterData[0]
            let gender_types = filterData[1]
            let tournament_type = filterData[2]


            for (let i = 0; i < tournament_categories.data.length; i++) {
                let obj = tournament_categories.data[i]
                if (obj.is_selected) {
                    ctype = ctype + "category_type=" + obj.name + "&"
                }
            }
            if (ctype.length > 0) {
                ctype = ctype.substring(0, ctype.length - 1)
            }

            for (let i = 0; i < gender_types.data.length; i++) {
                let obj = gender_types.data[i]
                if (obj.is_selected) {
                    gtype = gtype + "gender_type=" + obj.name + "&"
                }
            }
            if (gtype.length > 0) {
                gtype = gtype.substring(0, gtype.length - 1)
            }

            for (let i = 0; i < tournament_type.data.length; i++) {
                let obj = tournament_type.data[i]
                if (obj.is_selected) {
                    ttype = ttype + "tournament_type=" + obj.name + "&"
                }
            }
            if (ttype.length > 0) {
                ttype = ttype.substring(0, ttype.length - 1)
            }

            let query = gtype + "&" + ttype + "&" + ctype
            console.warn('selected = > ', query)
            this.selfComponentDidMount(query)
        } else {
            this.selfComponentDidMount('')
        }

    }


    onRefresh() {
        this.setState({ isRefreshing: true }, function () { this.selfComponentDidMount() });
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

                    let tournament_fixtures = data.data.tournament_fixtures
                    if (tournament_fixtures != null && tournament_fixtures.length > 0) {
                        console.log(' tournament_fixtures ' + JSON.stringify(data.data.tournament_fixtures));
                        this.setState({
                            tournament_fixtures: tournament_fixtures,
                            is_show_dialog: true

                        })
                    }
                    else {
                        alert('No data found.')
                    }

                }

            }).catch((response) => {
                console.log(response);
                this.progress(false)
            })
        })

    }

    showFixture(id) {
        this.setState({
            is_show_dialog: false
        })
        if (id == undefined) {
            return
        }

        console.warn('ShowFixture = > ', id)

        let data = null
        let tournament_fixtures = this.state.tournament_fixtures
        for (let i = 0; i < tournament_fixtures.length; i++) {
            let obj = tournament_fixtures[i]
            if (obj.id == id) {
                data = obj
            }
        }

        if (data != null) {
            let fixture_data = data.tournament_matches

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
                        if (player1 != null)
                            subArray.push(player1)
                        if (player2 != null)
                            subArray.push(player2)
                    }
                    playerArray.push(subArray)

                }
            }
            console.log('Final => ', JSON.stringify(playerArray))

            this.props.navigation.navigate('TournamentFixture', { data: JSON.stringify(playerArray) })

        } else {
            alert('No data found.')
        }
    }

    find(query) {
        let tournaments = this.state.tournaments
        if (query === '') {
            return tournaments;
        }
        const regex = new RegExp(`${query.trim()}`, 'i');
        console.log('regex ', regex)
        return tournaments.filter(item => item.name.search(regex) >= 0);
    }

    listHeader() {

        return (
            <View
                style={{
                    marginLeft: 12,
                    marginRight: 12,
                    marginTop: 16,
                    marginBottom: 8,
                    borderRadius: 12
                }}>
                <Card style={{ borderRadius: 16, elevation: 1 }}>

                    <TextInput
                        onChangeText={text => {
                            this.state.query = text
                            //console.warn(this.state.query)
                            this.setState({
                                query: text
                            })
                        }}
                        style={{
                            marginLeft: 8,
                            height: 45,
                            backgroundColor: 'white',
                            borderRadius: 16,
                            fontFamily: 'Quicksand-Regular'
                        }} placeholder="Search"></TextInput>


                </Card>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('TournamentFilter', {
                            onFilterSelected: this.onFilterSelected.bind(this),
                            filterData: filterData
                        })
                    }}>

                    <Text style={{
                        marginTop: 8,
                        marginBottom: 4,
                        textAlign: 'right',
                        color: '#404040',
                        fontSize: 12,
                        fontFamily: 'Quicksand-Regular'
                    }} >Filter</Text>
                </TouchableOpacity>

                <View style={{ width: '100%', height: 1, backgroundColor: '#d7d7d7' }}></View>
            </View>
        )
    }
    _renderItem = ({ item }) => (

        <TouchableOpacity activeOpacity={.8}
            onPress={() => {
                this.props.navigation.navigate('RegisteredTournamentDetail', {
                    data: JSON.stringify(item)
                })
            }}>

            <Card
                style={{
                    borderRadius: 12,
                    marginLeft: 12,
                    marginRight: 12,
                    marginTop: 8,
                    marginBottom: 8,
                    elevation: 2

                }}>
                <View>
                    <Image style={{
                        height: 150, width: "100%",
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                    }}
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
                                resizeMode="contain"
                                style={{ width: 7, height: 13, }}
                                source={require('../../images/forward.png')}
                            >

                            </Image>

                        </View>


                        <View style={{ paddingTop: 8, flexDirection: 'row', flex: 1 }}>

                            <Text style={defaultStyle.bold_text_14}>
                                {Moment(item.start_date).format('MMM YYYY')}
                            </Text>
                            <View style={defaultStyle.blue_rounded_4}>
                                <Text style={[defaultStyle.bold_text_10, { color: 'white' }]} >
                                    {getFormattedTournamentType(item.academic_type)}
                                </Text>
                            </View>
                            

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
                            <Text style={defaultStyle.bold_text_14}> {Moment(item.registration_last_date).format('DD MMM YYYY')}</Text>
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

                        {/* <TouchableOpacity activeOpacity={.8}
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
                        </TouchableOpacity> */}
                        <View style={{
                            margin: 16,
                            alignSelf: 'center',
                            width: 150,
                        }}>
                            <SkyFilledButton
                                onPress={() => {
                                    this.props.navigation.navigate('FixtureSelection',{
                                        id:item.id
                                    })
                                    //this.getFixtureData(item.id)
                                }}
                            >View Fixtures</SkyFilledButton>
                        </View>

                    </View>
                </View>

            </Card>
        </TouchableOpacity>

    );

    render() {

        if (!this.state.isRefreshing && (this.props.data.loading && this.state.tournaments.length == 0)) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        const data = this.find(this.state.query);

        return (

            <View style={styles.chartContainer}>

                <Spinner
                    visible={this.state.spinner}
                    textStyle={defaultStyle.spinnerTextStyle}
                />

                <TournamentCategoryDialog
                    tournament_fixture={this.state.tournament_fixtures}
                    touchOutside={(id) => this.showFixture(id)}
                    visible={this.state.is_show_dialog} />


                {this.listHeader()}
                {this.state.tournaments.length != 0 ?
                    <FlatList
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isRefreshing}
                        //ListHeaderComponent={() => this.listHeader()}
                        data={data}
                        extraData={data}
                        renderItem={this._renderItem}
                    /> :
                    <View
                        style={{

                            alignSelf: 'center',
                            marginTop: 150,
                            justifyContent: 'center', flex: 1, alignItems: 'center'
                        }}
                    >

                        <Text style={[defaultStyle.regular_text_14, {
                            justifyContent: 'center',
                            flex: 1, textAlign: 'center',
                        }]}>No Tournament found</Text></View>
                }


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


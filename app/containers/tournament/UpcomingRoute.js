import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Image, FlatList, TextInput, Keyboard, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, { defaultStyle, REFRESH_SCREEN_CALLBACK, getFormattedTournamentType } from '../BaseComponent'
import { getData, storeData } from "../../components/auth";
import { getUpcomingTournament } from "../../redux/reducers/UpcomingReducer";
import { connect } from 'react-redux';
import Moment from 'moment';
import Events from '../../router/events';
import FastImage from 'react-native-fast-image'
import { SkyFilledButton } from '../../components/Home/SkyFilledButton';
import LinearGradient from "react-native-linear-gradient";

var filterData = ''


class UpcomingRoute extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            tournaments: [],
            query: '',
            isRefreshing: false
        }


        getData('deep_data', (value) => {
            storeData('deep_data', null)
            //alert('test==>' + value)
            if (value != null && value != 'null') {
                let tournament_id = JSON.parse(value).tournament_id
                if (tournament_id) {
                    this.props.navigation.navigate('UpcomingTournamentDetail',
                        { tournament_id: tournament_id })

                }
            }
        })
    }

    componentDidMount() {


        this.refreshEvent = Events.subscribe(REFRESH_SCREEN_CALLBACK, (msg) => {
            this.selfComponentDidMount('')
        });

        this.selfComponentDidMount('')
    }

    selfComponentDidMount(filter) {

        getData('header', (value) => {

            this.props.getUpcomingTournament(value, filter).then(() => {
                let data = this.props.data.data
                console.log(' getUpcomingTournament ' + JSON.stringify(data));

                let success = data.success
                if (success) {

                    //console.log(' getUpcomingTournament ' + JSON.stringify(data.data.tournaments));

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

    find(query) {
        let tournaments = this.state.tournaments
        if (query === '') {
            return tournaments;
        }
        const regex = new RegExp(`${query.trim()}`, 'i');
        console.log('regex ', regex)
        return tournaments.filter(item => item.name.search(regex) >= 0);
    }

    onRefresh() {
        this.setState({ isRefreshing: true }, function () { this.selfComponentDidMount() });
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
                 <View style={styles.inputview}>
                    <TextInput
                    style={styles.input}
                    placeholder="Search"
                    placeholderTextColor="#BFBFBF"
                    maxLength={30}
                    onChangeText={text => {
                        this.state.query = text
                        this.setState({ query: text })
                    }}
                    />
                 </View>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('TournamentFilter', {
                            onFilterSelected: this.onFilterSelected.bind(this),
                            filterData: filterData
                        })
                    }}>

                    <Text style={{
                        marginTop: 8, marginBottom: 4,
                        textAlign: 'right',
                        color: 'white', fontSize: 12,
                        fontFamily: 'Quicksand-Regular'
                    }} >Filter</Text>

                </TouchableOpacity>
                <View style={{ width: '100%', height: 1, backgroundColor: '#d7d7d7' }}></View>
            </View>
        )
    }


    _renderItem = ({ item }) => {

        let split = item.registration_last_date.split("T")
        let reg_last = split[0] + " 23:59:59"
        let last_date = Moment(reg_last).format("X")
        var today = new Date();
        let today_time = Moment(today).format("X")
        let show_register = item.can_register;
        if (show_register) {
            if (today_time > last_date)
                show_register = false
        }

        return (<TouchableOpacity activeOpacity={.8}
            onPress={() => {
                this.props.navigation.navigate('UpcomingTournamentDetail', {
                    tournament_id:
                        item.id
                })
                //this.props.navigation.navigate('UpcomingTournamentDetail', { data: item })
            }}>

            {/* <Card
                style={{
                    borderRadius: 12,
                    marginLeft: 12,
                    marginRight: 12,
                    marginTop: 8,
                    marginBottom: 8,
                    elevation: 2,
                    paddingBottom: 10
                }}> */}
            <LinearGradient
                colors={["rgba(255, 255, 255, 0.068)", " rgba(255, 255, 255, 0.0102)"]}
                style={ styles.gradient }
            >
                <View>
                    {/* <Image style={{
                        height: 150, width: "100%",
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                    }}
                        source={{ uri: item.cover_pic }}
                    >

                    </Image> */}
                    <FastImage
                        style={{
                            height: 150, width: "100%",
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                        }}
                        source={{ uri: item.cover_pic }}
                    />

                    <View style={{
                        paddingLeft: 16,
                        paddingTop: 8,
                        paddingBottom: 8
                    }}>


                        <View style={{
                            paddingTop: 12, paddingRight: 12,
                            flexDirection: 'row', flex: 1, justifyContent: 'space-between'
                        }}>

                            <Text style={[defaultStyle.bold_text_14, {color: "white"}]}>
                                {item.name}
                            </Text>

                            <Image
                                resizeMode="contain"
                                style={{ width: 7, height: 13, tintColor: "white" }}
                                source={require('../../images/forward.png')}
                            >

                            </Image>

                        </View>


                        <View style={{ paddingTop: 8, flexDirection: 'row', flex: 1 }}>

                            <Text style={[defaultStyle.bold_text_14, {color: "white"}]}>
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
                            color: "white",
                            fontFamily: 'Quicksand-Regular'
                        }}>
                            Dates <Text style={[defaultStyle.bold_text_14, {color: "#A3A5AE"}]}>
                                {Moment.utc(item.start_date).local().format('DD') + " - " + Moment.utc(item.end_date).local().format('DD MMM')}
                            </Text>
                        </Text>

                        <Text style={{
                            paddingTop: 6, fontSize: 14, paddingBottom: 10,
                            color: '#FF7373',
                            fontFamily: 'Quicksand-Regular'
                        }}>
                            Last Date of Registration <Text style={[defaultStyle.bold_text_14,{color: "#A3A5AE"}]}>
                                {Moment.utc(item.registration_last_date).local().format("DD MMM YYYY")}

                            </Text>
                        </Text>

                        <TouchableOpacity activeOpacity={.8}
                            style={[styles.rounded_button, {
                                backgroundColor: show_register ? '#67BAF5' : 'gray', marginTop: 16, marginBottom: 16, alignSelf: 'center',
                            }]}
                            onPress={() => {

                                this.props.navigation.navigate('UpcomingTournamentDetail', {
                                    tournament_id:
                                        item.id
                                })

                            }}>
                            <Text
                                style={{
                                    color: 'white',
                                    textAlign: 'center',
                                    fontFamily: 'Quicksand-Medium'
                                }}
                            >Register</Text>
                        </TouchableOpacity>


                        {/* <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity activeOpacity={.8}
                                style={styles.rounded_button_white}
                                onPress={() => {
                                    this.props.navigation.navigate('FixtureSelection', { id: item.id, 'clickedBtn': 'fixtures' })
                                }}
                            >
                                <View>
                                    <Text style={defaultStyle.rounded_button_150}>
                                        View Fixtures
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={.8}
                                style={[{ marginLeft: 10 }, styles.rounded_button_white]}
                                onPress={() => {
                                    this.props.navigation.navigate('FixtureSelection', {
                                        id: item.id, 'clickedBtn': 'matches'
                                    })
                                }}
                            >
                                <View>
                                    <Text style={defaultStyle.rounded_button_150}>
                                        View Matches
                                    </Text>
                                </View>
                            </TouchableOpacity>

                        </View> */}

                    </View>


                </View>

            </LinearGradient>
        </TouchableOpacity>);

    };

    render() {

        if (!this.state.isRefreshing && (this.props.data.loading || this.state.tournaments == null)) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }
        const data = this.find(this.state.query);

        return (

            <LinearGradient
            colors={["#051732", "#232031"]}
            style={{ flex: 1}}
          >
                  <View style={styles.chartContainer}>

                {this.listHeader()}


                <FlatList
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isRefreshing}
                    data={data}
                    extraData={data}
                    renderItem={this._renderItem}
                />
                {this.state.tournaments.length == 0 ?
                    <View
                        style={{

                            alignSelf: 'center',
                            marginTop: 0,
                            justifyContent: 'center', flex: 1, alignItems: 'center'
                        }}
                    >

                        <Text style={[defaultStyle.regular_text_14, {
                            justifyContent: 'center',
                            flex: 1, textAlign: 'center',
                            color: "white"
                        }]}>No Tournament found</Text></View>
                    : null}


            </View>
            </LinearGradient>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.UpcomingTournamentReducer,
    };
};
const mapDispatchToProps = {
    getUpcomingTournament
};
export default connect(mapStateToProps, mapDispatchToProps)(UpcomingRoute);

const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
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
    inputview: {
        marginTop: 7,
        borderColor: "#FCB550",
        borderRadius: 26,
        borderWidth: 1,
        height: 50,
        justifyContent: "center",
      },
      input: {
        paddingHorizontal: 20,
        fontFamily: "Nunito-Regular",
        color: "white",
      },
      gradient: {
        borderRadius: 10,
        paddingBottom: 14,
        paddingTop: 3,
        paddingHorizontal: 6,
        marginHorizontal: 15,
        borderColor: "#70765788",
        borderWidth: 1,
        marginTop: 10,
      },
});


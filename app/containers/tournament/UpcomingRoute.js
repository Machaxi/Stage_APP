import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput, Keyboard, Text } from 'react-native';
import { Card, ActivityIndicator, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, { defaultStyle } from '../BaseComponent'
import { getData } from "../../components/auth";
import { getUpcomingTournament } from "../../redux/reducers/TournamentReducer";
import { connect } from 'react-redux';
import Moment from 'moment';

class UpcomingRoute extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            tournaments: [],
            query: '',
        }
    }

    componentDidMount() {

        getData('header', (value) => {

            this.props.getUpcomingTournament(value).then(() => {
                let data = this.props.data.data
                console.log(' getUpcomingTournament ' + JSON.stringify(data));

                let success = data.success
                if (success) {

                    console.log(' 1getUpcomingTournament ' + JSON.stringify(data.data.tournaments));

                    this.setState({
                        tournaments: data.data.tournaments
                    })
                }

            }).catch((response) => {
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
                            backgroundColor: 'white',
                            borderRadius: 16,
                            fontFamily: 'Quicksand-Regular'
                        }} placeholder="Search"></TextInput>


                </Card>

                <Text style={{
                    marginTop: 8, marginBottom: 4,
                    textAlign: 'right',
                    color: '#404040', fontSize: 12,
                    fontFamily: 'Quicksand-Regular'
                }} >Filter</Text>

                <View style={{ width: '100%', height: 1, backgroundColor: '#d7d7d7' }}></View>
            </View>
        )
    }
    _renderItem = ({ item }) => (

        <TouchableOpacity activeOpacity={.8}
            onPress={() => {
                this.props.navigation.navigate('UpcomingTournamentDetail', { data: item })
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

                            <Text style={defaultStyle.blue_rounded_4}>{item.academic_type}</Text>

                        </View>

                        <Text style={{
                            paddingTop: 6,
                            fontSize: 14,
                            color: '#404040',
                            fontFamily: 'Quicksand-Regular'
                        }}>
                            Dates <Text style={defaultStyle.bold_text_14}>
                                {Moment.utc(item.start_date).local().format('DD') + " - " + Moment.utc(item.end_date).local().format('DD MMM')}
                            </Text>
                        </Text>

                        <Text style={{
                            paddingTop: 6, fontSize: 14,
                            color: '#FF7373',
                            fontFamily: 'Quicksand-Regular'
                        }}>
                            Last Date of Registration <Text style={defaultStyle.bold_text_14}>
                                {Moment.utc(item.registration_last_date).local().format("DD MMM YYYY")}

                            </Text>
                        </Text>

                    </View>


                </View>

            </Card>
        </TouchableOpacity>

    );

    render() {

        if (this.props.data.loading || this.state.tournaments == null) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }
        const data = this.find(this.state.query);

        return (

            <View style={styles.chartContainer}>

                {this.listHeader()}

                {this.state.tournaments.length != 0 ?
                    <FlatList
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
    getUpcomingTournament
};
export default connect(mapStateToProps, mapDispatchToProps)(UpcomingRoute);

const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },
    rounded_button: {
        width: '48%',
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
});


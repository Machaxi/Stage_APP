import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput, Keyboard, ImageBackground, Text } from 'react-native';
import { Card, ActivityIndicator, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, { defaultStyle } from '../BaseComponent'
import { getTournamentResultListing, getTournamentFixture } from "../../redux/reducers/TournamentReducer";
import { connect } from 'react-redux';
import { getData } from "../../components/auth";
import Spinner from 'react-native-loading-spinner-overlay';
import Moment from 'moment';
import { SkyFilledButton } from '../../components/Home/SkyFilledButton';


class ResultsRoute extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            tournaments: [],
            query: '',
            spinner: false,
            isRefreshing: false
        }
    }

    componentDidMount() {

        this.selfComponentDidMount()
    }

    selfComponentDidMount() {
        getData('header', (value) => {

            this.props.getTournamentResultListing(value).then(() => {
                let data = this.props.data.data
                console.log(' getTournamentResultListing ' + JSON.stringify(data));

                let success = data.success
                if (success) {

                    console.log(' getTournamentResultListing ' + JSON.stringify(data.data.tournaments));

                    this.setState({
                        tournaments: data.data.tournaments
                    })
                }
                this.setState({ isRefreshing: false })

            }).catch((response) => {
                console.log(response);
                this.setState({ isRefreshing: false })
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

    progress(status) {
        this.setState({
            spinner: status
        })
    }

    onRefresh() {
        this.setState({ isRefreshing: true }, function () { this.selfComponentDidMount() });
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

                    <TextInput style={{
                        marginLeft: 8,
                        height: 45,
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

    _renderItem = ({ item }) => {
        console.warn(item.name)

        let array = []
        if (item.winners) {

            for (var key in item.winners) {
                if (item.winners.hasOwnProperty(key)) {
                    console.log("KEY = >", key)
                    let data = item.winners[key]

                    array.push(
                        <View>


                            <Text style={{
                                fontSize: 10,
                                color: '#A3A5AE',
                                fontFamily: 'Quicksand-Regular'
                            }}>
                                Winner {key}
                            </Text>

                            <View style={{
                                paddingTop: 8,
                                flexDirection: 'row',
                                flex: 1,
                                justifyContent: 'space-between'
                            }}>
                                <Text style={defaultStyle.regular_text_14}>
                                    {data.name}
                                </Text>

                                <Text style={defaultStyle.regular_text_14}>
                                    1st
                                </Text>

                                <Text style={defaultStyle.regular_text_14}>
                                    {"   -   "}
                                </Text>

                            </View>
                        </View>
                    )
                }
            }
        }

        return (

            <TouchableOpacity activeOpacity={.8}
                onPress={() => {
                    this.props.navigation.navigate('ResultsTournamentDetail', {
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

                            height: 150,
                            width: "100%",
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
                                    source={require('../../images/forward.png')} />
                            </View>


                            <View style={{ paddingTop: 8, flexDirection: 'row', flex: 1 }}>

                                <Text style={defaultStyle.bold_text_14}>
                                    {item.month + " " + item.year}
                                </Text>

                                <Text style={defaultStyle.blue_rounded_4}>{item.academic_type}</Text>

                            </View>

                            <Text style={{
                                paddingTop: 6,
                                fontSize: 14,
                                color: '#404040',
                                fontFamily: 'Quicksand-Regular'
                            }}>
                                Dates <Text style={defaultStyle.bold_text_14}>{Moment(item.start_date).format('DD MMM YY')}</Text>
                            </Text>


                            {item.gallery && item.gallery.length > 0 ?
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => {
                                        this.props.navigation.navigate('TournamentGallery', {
                                            images: item.gallery
                                        })
                                    }}
                                >

                                    <Image
                                        style={{
                                            height: 86,
                                            marginTop: 23,
                                            borderRadius: 8,
                                            marginBottom: 20,
                                            width: "95%"
                                        }}
                                        resizeMode="contain"
                                        source={require('../../images/view_gallery.png')}
                                    >

                                    </Image>
                                </TouchableOpacity> : null
                            }


                            {/* <View style={{
                                color: '#4B4B4B',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                alignItems: 'center',
                            }}>

                                <Text style={[defaultStyle.bold_text_14,
                                { justifyContent: 'center', color: 'white' }]}>View Gallery</Text>

                            </View> */}

                            <View style={{ marginTop: 12, marginBottom: 8, marginRight: 12 }}>
                                {array}
                            </View>



                            {/* <TouchableOpacity activeOpacity={.8}
                                onPress={() => {
                                    this.props.navigation.navigate('TournamentFixture')
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
                                        //this.props.navigation.navigate('TournamentFixture')
                                    }}
                                >View Fixtures</SkyFilledButton>
                            </View>
                        </View>

                    </View>

                </Card>
            </TouchableOpacity>

        )
    };

    render() {

        if (!this.state.isRefreshing && (this.props.data.loading && this.state.tournaments.length == 0)) {
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
                {this.listHeader()}

                {this.state.tournaments.length != 0 ?
                    <FlatList
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isRefreshing}
                        //ListHeaderComponent={() => this.listHeader()}
                        data={this.state.tournaments}
                        extraData={this.state.tournaments}
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
    getTournamentResultListing, getTournamentFixture
};
export default connect(mapStateToProps, mapDispatchToProps)(ResultsRoute);

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


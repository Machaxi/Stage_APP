import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, TouchableOpacity, Image, FlatList, TextInput, Keyboard, ImageBackground, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, { defaultStyle, getFormattedTournamentType } from '../BaseComponent'
import { getTournamentResultListing, getTournamentFixture } from "../../redux/reducers/TournamentReducer";
import { connect } from 'react-redux';
import { getData } from "../../components/auth";
import Spinner from 'react-native-loading-spinner-overlay';
import Moment from 'moment';
import { SkyFilledButton } from '../../components/Home/SkyFilledButton';
import FastImage from 'react-native-fast-image'
import LinearGradient from "react-native-linear-gradient";

var filterData = ''


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

        this.selfComponentDidMount('')
    }

    selfComponentDidMount(filter) {
        getData('header', (value) => {

            this.props.getTournamentResultListing(value, filter).then(() => {
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
                 <View style={styles.inputview}>
                    <TextInput
                    style={styles.input}
                    placeholder="Search"
                    placeholderTextColor="#BFBFBF"
                    maxLength={30}
                    onChangeText={text => {
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
                                paddingBottom: 6,
                                flexDirection: 'row',
                                flex: 1,
                                justifyContent: 'space-between'
                            }}>
                                <Text style={[defaultStyle.bold_text_14, { color: 'white' }] }>
                                    {data.name}
                                </Text>

                                {/* <Text style={defaultStyle.regular_text_14}>
                                    1st
                                </Text> */}

                                <Text style={[defaultStyle.regular_text_14, { color: 'white' }]}>
                                    {data.academy_name == undefined ? ' - ' : data.academy_name}
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
                        id: item.id
                    })
                }}>

                {/* <Card
                    style={{
                        borderRadius: 12,
                        marginLeft: 12,
                        marginRight: 12,
                        marginTop: 8,
                        marginBottom: 8,
                        elevation: 2

                    }}> */}
            <LinearGradient
                colors={["rgba(255, 255, 255, 0.068)", " rgba(255, 255, 255, 0.0102)"]}
                style={ styles.gradient }
            >
                    <View>
                        {/* <Image style={{

                            height: 150,
                            width: "100%",
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
                                    style={{ width: 7, height: 13, }}
                                    source={require('../../images/forward.png')} />
                            </View>


                            <View style={{ paddingTop: 8, flexDirection: 'row', flex: 1 }}>

                                <Text style={[defaultStyle.bold_text_14, {color: "white"}]}>            
                                    {item.month + " " + item.year}
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
                                color: 'white',
                                fontFamily: 'Quicksand-Regular'
                            }}>
                                Dates <Text style={[defaultStyle.bold_text_14, { color: 'white' }]}>{Moment(item.start_date).format('DD MMM YY')}</Text>
                            </Text>


                            {item.gallery && item.gallery.length > 0 ?
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => {
                                        this.props.navigation.navigate('TournamentGallerySlider', {
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

                            <View style={{
                                margin: 16,
                                alignSelf: 'center',
                                width: 150,
                            }}>
                                <SkyFilledButton
                                    onPress={() => {
                                        this.props.navigation.navigate('FixtureSelection', {
                                            id: item.id
                                        })
                                        //this.getFixtureData(item.id)
                                    }}
                                >View Matches</SkyFilledButton>
                            </View>



                            {/* <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                                <TouchableOpacity activeOpacity={.8}
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
                                    style={{ marginLeft: 10 }}
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
            </TouchableOpacity >

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

            <LinearGradient
            colors={["#051732", "#232031"]}
            style={{ flex: 1}}
          >
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
                            color: "white"
                        }]}>No Tournament found</Text></View>
                }

            </View>
            </LinearGradient>
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
    // rounded_button: {
    //     width: '48%',
    //     height: 44,
    //     padding: 10,
    //     borderRadius: 23,
    //     //borderWidth: 1,
    //     marginLeft: 4,
    //     marginRight: 4,
    //     //borderColor: '#67BAF5',
    //     backgroundColor: '#67BAF5',
    //     justifyContent: 'center',
    //     fontFamily: 'Quicksand-Regular'
    // },
});


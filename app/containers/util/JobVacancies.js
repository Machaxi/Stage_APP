import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, TouchableOpacity, Image, FlatList, TextInput, Keyboard, Text } from 'react-native';
import { Card, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { connect } from 'react-redux';
import { getAllAcademy, search, search_auto_suggest, } from '../../redux/reducers/AcademyReducer'
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios'
import BaseComponent, {getBaseUrl, defaultStyle } from './../BaseComponent'
import { RateViewFill } from '../../components/Home/RateViewFill';
import { getData, storeData } from '../../components/auth';
import Events from '../../router/events';

var filterData = ''

class JobVacancies extends BaseComponent {

    constructor(props) {
        super(props)
        this.secondTextInputRef = React.createRef();

        this.state = {
            academies: [],
            query: '',
            autodata: [],
            suggestionResult: [],
            isAutoSuggest: false,
            isRefreshing: false,

        }
        this._handleChange = this._handleChange.bind(this)
    }

    _refresh() {
        // setTimeout(()=>{

        // },100)
        //this.getAcademyList()
        //
    }

    _handleChange(e) {
        //console.warn('_handleChange => ', e)
        this.setState({
            query: e
        })
        this.getAutoSuggestion()

        if (e == '') {
            this.getAcademyList('')
        }
    }

    getAcademyList(query) {
        this.props.getAllAcademy(query).then(() => {
            //console.warn('Res=> ' + JSON.stringify(this.props.data.res.data.academies))
            let status = this.props.data.res.success
            if (status) {
                let list = this.props.data.res.data.academies

                this.setState({
                    academies: list
                })
            }

            this.setState({ isRefreshing: false })

        }).catch((response) => {
            console.log(response);
            this.setState({ isRefreshing: false })
        })
    }

    componentDidMount() {

        // getData('deep_linking', (value) => {
        //     console.warn('deep->', value)
        //     if (value == 'true') {
        //         this.props.navigation.navigate('Tournament')
        //         storeData('deep_linking', null)
        //     }
        // })

        this.refreshEvent = Events.subscribe('FROM_REGISTRATION', (deep_data) => {
            let type = null;
            console.log('deep data', deep_data)
            if (deep_data != null) {
                storeData('deep_data', JSON.stringify(deep_data))
                let player_id = deep_data.player_id
                let academy_id = deep_data.academy_id
                type = deep_data.type
                if (type !== null && type === 'profile') {
                    this.props.navigation.navigate('OtherPlayerDeatils', { player_id: player_id, academy_id: academy_id })
                }
            }
            if (type == null) {
                setTimeout(() => {
                    this.props.navigation.navigate('Tournament')
                }, 100)
            }
        });


        this.getAcademyList('')
    }

    onFilterSelected(data) {
        filterData = data

        if (data != '') {
            //query_param = query

            let sport_type = "sport=Badminton"
            let academy_rating = ""
            let coach_rating = ""
            let academy_array = filterData[1]
            let coach_array = filterData[2]

            for (let i = 0; i < academy_array.data.length; i++) {
                let obj = academy_array.data[i]
                if (obj.is_selected) {
                    academy_rating = academy_rating + "academy_ratings=" + obj.name + "&"
                }
            }
            if (academy_rating.length > 0) {
                academy_rating = academy_rating.substring(0, academy_rating.length - 1)
            }

            for (let i = 0; i < coach_array.data.length; i++) {
                let obj = coach_array.data[i]
                if (obj.is_selected) {
                    coach_rating = coach_rating + "coach_ratings=" + obj.name + "&"
                }
            }
            if (coach_rating.length > 0) {
                coach_rating = coach_rating.substring(0, coach_rating.length - 1)
            }

            let query = sport_type + "&" + academy_rating + "&" + coach_rating
            console.warn('selected = > ', query)
            this.getAcademyList(query)
        } else {
            this.getAcademyList('')
        }

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



    getAutoSuggestion() {

        // this.secondTextInputRef.current.focus();
        this.state.isAutoSuggest = true;
        let search_query = this.state.query


        // this.props.search_auto_suggest(search_query).then(() => {
        //     console.warn('search_auto_suggest=> ' + JSON.stringify(this.props.data.res))

        // }).catch((response) => {
        //     console.log(response);
        // })
        const addCart = getBaseUrl() + `global/academy/search-auto-suggest?search_query=${search_query}`

        console.log(addCart)

        axios.get(addCart)
            .then((response) => {

                let res = JSON.stringify(response.data.data.localities)
                //console.warn("response " + res);
                let isFirst = true
                let data = []
                let count = 0
                for (let i = 0; i < response.data.data.localities.length; i++) {
                    let obj = response.data.data.localities[i]
                    if (isFirst) {
                        obj['is_first'] = true
                        isFirst = false;
                    } else {
                        obj['is_first'] = false
                    }
                    obj['is_academy'] = false
                    console.log(obj)
                    data[count] = obj
                    count = count + 1
                }
                isFirst = true
                for (let i = 0; i < response.data.data.academies.length; i++) {
                    let obj = response.data.data.academies[i]
                    if (isFirst) {
                        obj['is_first'] = true
                        isFirst = false;
                    } else {
                        obj['is_first'] = false
                    }
                    obj['is_academy'] = true
                    console.log(obj)
                    data[count] = obj
                    count = count + 1
                }

                //console.warn(data)
                this.state.suggestionResult = data
                this.setState({
                    suggestionResult: data
                })
                //this.secondTextInputRef.current.focus();
            })
            .catch((error) => {
                // handle error
                console.log("error " + error);
            });
    }

    getAcademicSearchResult(hardSearch) {
        this.state.suggestionResult = []

        this.state.isAutoSuggest = true
        let locality_id = ""
        let search_query = ""
        console.warn(this.state.query)
        if (hardSearch) {
            search_query = this.state.query
        } else {
            locality_id = this.state.query
        }

        this.props.search(search_query, locality_id).then(() => {
            console.warn('Res=> ' + JSON.stringify(this.props.data.res.data.academies))
            let status = this.props.data.res.success
            if (status) {
                let list = this.props.data.res.data.academies

                this.setState({
                    academies: list
                })
            }


        }).catch((response) => {
            console.log(response);
        })
    }
    handleKeyDown = (e) => {

        console.warn('handle key ', this.state.query)
        this.getAcademicSearchResult(true)

        //let text = e.key
        //let text = this.state.query
        // if (text != undefined && text.length > 0) {
        //    // this.getAutoSuggestion()
        // }
    }

    onRefresh() {
        this.setState({ isRefreshing: true }, function () { this.getAcademyList('') });

    }
    handleKeyDown(e) {
        console.warn(e.nativeEvent.key)
        if (e.nativeEvent.key == "Enter") {
            dismissKeyboard();
        }
    }

    listHeader() {

        const autoData = this.find(this.state.query);

        return (

            <View
                style={{
                    marginLeft: 16,
                    marginRight: 16,
                    marginTop: 16,
                    marginBottom: 8,
                    borderRadius: 12,

                }}>
                <Card style={{
                    borderRadius: 4,
                    elevation: 8,
                    flex: 1,
                    left: 0,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    zIndex: 1
                }}>

                    <TextInput
                        onChangeText={this._handleChange}
                        // onChangeText={(text) => {
                        //     this.state.query = text
                        //     //console.warn(text)
                        //     this.getAutoSuggestion()
                        // }}
                        returnKeyType="search"
                        //onKeyPress={this.handleKeyDown}
                        onSubmitEditing={this.handleKeyDown}
                        value={this.state.query}
                        style={{
                            marginLeft: 8,
                            backgroundColor: 'white',
                            borderRadius: 16,
                            height: 45,
                            fontFamily: 'Quicksand-Regular',

                        }} placeholder="Search" />

                    <FlatList

                        keyboardShouldPersistTaps={'handled'}
                        data={autoData}
                        renderItem={({ item }) =>
                            <View >
                                {item.is_first ?
                                    <Text
                                        style={{
                                            backgroundColor: '#ECECEC',
                                            color: 'black',
                                            paddingTop: 4,
                                            paddingBottom: 4,
                                            paddingLeft: 8,
                                            fontSize: 12,
                                            fontFamily: 'Quicksand-Regular'
                                        }}
                                    >{item.is_academy ? "Academies by name" : "Academies by location"}</Text>
                                    :
                                    null
                                }

                                <TouchableOpacity
                                    onPress={() => {
                                        {

                                            if (!item.is_academy) {
                                                //this.state.query = item.name
                                                this.setState({
                                                    query: item.name
                                                })
                                                this.state.query = item.name
                                                this.getAcademicSearchResult(true)
                                            } else {
                                                this.props.navigation.navigate('AcademyProfile', { id: item.id })
                                            }
                                        }
                                    }}
                                >
                                    <Text style={{
                                        fontSize: 14,
                                        padding: 6,
                                        color: '#000000',
                                        fontFamily: 'Quicksand-Regular'
                                    }}>{item.name}</Text>
                                </TouchableOpacity>

                            </View>

                        }
                    />

                    {/* <Autocomplete
                        listStyle={{ borderWidth: 0 }}
                        containerStyle={{
                            borderWidth: 0,
                            padding: 0,
                            margin: 0
                        }}
                        ref={this.secondTextInputRef}
                        inputContainerStyle={{
                            marginTop: 2,
                            marginBottom: 2,
                            backgroundColor: 'white',
                            borderWidth: 0,
                        }}
                        style={{
                            fontFamily: 'Quicksand-Regular',
                            borderRadius: 4
                        }}
                        data={autoData}
                        defaultValue={this.state.query}
                        onChangeText={text => {
                            this.state.query = text
                            //console.warn(text)
                            this.getAutoSuggestion()
                        }}
                        onSubmitEditing={() => {
                            this.state.suggestionResult = []
                            this.getAcademicSearchResult(true)
                        }}
                        placeholder="Search"
                        onKeyPress={this.handleKeyDown}
                        returnKeyType='search'
                        renderItem={({ item, i }) =>
                            (
                                <View >
                                    {item.is_first ?
                                        <Text
                                            style={{
                                                backgroundColor: '#ECECEC',
                                                color: 'black',
                                                paddingTop: 4,
                                                paddingBottom: 4,
                                                fontSize: 12,
                                                fontFamily: 'Quicksand-Regular'
                                            }}
                                        >{item.is_academy ? "Academies by name" : "Academies by location"}</Text>
                                        :
                                        null
                                    }

                                    <TouchableOpacity
                                        onPress={() => {
                                            {
                                                this.state.suggestionResult = []
                                                if (!item.is_academy) {
                                                    this.state.query = item.name
                                                    this.getAcademicSearchResult(true)
                                                } else {
                                                    this.props.navigation.navigate('AcademyProfile', { id: item.id })
                                                }
                                            }
                                        }}
                                    >
                                        <Text style={{
                                            fontSize: 14,
                                            padding: 6,
                                            color: '#000000',
                                            fontFamily: 'Quicksand-Regular'
                                        }}>{item.name}</Text>
                                    </TouchableOpacity>

                                </View>

                            )}
                    /> */}

                </Card>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('AcademyFilter', {
                            onFilterSelected: this.onFilterSelected.bind(this),
                            filterData: filterData
                        })
                    }}
                >

                    <Text style={{
                        marginTop: 55, paddingTop: 4,
                        paddingLeft: 20,
                        paddingBottom: 2,
                        textAlign: 'right',
                        color: '#404040', fontSize: 12,
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
                this.props.navigation.navigate('AcademyProfile', { id: item.id })
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
                    <Image style={{ height: 130, width: "100%", borderRadius: 16, }}
                        source={{ uri: item.cover_pic }}
                    >

                    </Image>

                    <Text style={{
                        paddingTop: 12, paddingLeft: 12, fontSize: 16,
                        color: '#707070',
                        fontFamily: 'Quicksand-Medium'
                    }}>
                        {item.name}
                    </Text>

                    <View style={{
                        alignItems: 'center',
                        paddingTop: 12,
                        paddingBottom: 12,
                        paddingLeft: 6,
                        flexDirection: 'row',
                        flex: 1
                    }}>

                        <Rating
                            type='custom'
                            ratingColor='#F4FC9A'
                            ratingBackgroundColor='#D7D7D7'
                            ratingCount={5}
                            imageSize={12}
                            readonly={true}
                            startingValue={item.ratings}
                            style={{ width: 80 }}
                        />

                        {/* <Text style={{
                            backgroundColor: '#DFDFDF', height: 19, width: 30, textAlign: 'center',
                            fontSize: 12,
                            color: '#707070',
                            paddingTop: 0,
                            borderRadius: 12,
                            fontFamily: 'Quicksand-Medium'
                        }}>{item.ratings.toFixed(1)}</Text> */}
                        <RateViewFill>{item.ratings}</RateViewFill>
                    </View>

                    <View style={{ flexDirection: 'row', margin: 8 }}>

                        <Text
                            style={styles.rounded_button}
                        >
                            View Batches
                                </Text>
                        <Text
                            style={styles.rounded_button}
                        >
                            Book Court
                                </Text>

                    </View>

                </View>

            </Card>
        </TouchableOpacity>

    );

    render() {

        if (!this.state.isRefreshing && this.props.data.loading && !this.state.isAutoSuggest) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        return (
            <View style={styles.chartContainer}>
                {
                    this.listHeader()
                }
                {this.state.academies.length > 0 ?
                    <FlatList
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isRefreshing}
                        //ListHeaderComponent={() => this.listHeader()}
                        data={this.state.academies}
                        extraData={this.state.academies}
                        renderItem={this._renderItem}
                    /> :
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={defaultStyle.regular_text_14}>No Academy Found</Text>
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.AcademyReducer,
    };
};
const mapDispatchToProps = {
    getAllAcademy, search, search_auto_suggest
};

export default connect(mapStateToProps, mapDispatchToProps)(JobVacancies);


const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
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
        fontFamily: 'Quicksand-Medium'
    },
});


import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput, Keyboard, Text } from 'react-native';
import { Card, ActivityIndicator, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { connect } from 'react-redux';
import { getAllAcademy, search, search_auto_suggest } from '../../redux/reducers/AcademyReducer'
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios'

class AcademyListing extends Component {

    constructor(props) {
        super(props)
        this.secondTextInputRef = React.createRef();


        this.state = {
            academies: [],
            query: '',
            autodata: [],
            suggestionResult: [],
            isAutoSuggest: false,

        }
    }

    componentDidMount() {

        this.props.getAllAcademy().then(() => {
            //console.warn('Res=> ' + JSON.stringify(this.props.data.res.data.academies))
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

        this.secondTextInputRef.current.focus();
        this.state.isAutoSuggest = true;
        let search_query = this.state.query


        // this.props.search_auto_suggest(search_query).then(() => {
        //     console.warn('search_auto_suggest=> ' + JSON.stringify(this.props.data.res))

        // }).catch((response) => {
        //     console.log(response);
        // })
        const addCart = "http://13.233.124.189:8080/api/" + `global/academy/search-auto-suggest?search_query=${search_query}`

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
                this.secondTextInputRef.current.focus();
            })
            .catch((error) => {
                // handle error
                console.log("error " + error);
            });
    }

    getAcademicSearchResult(hardSearch) {

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



    listHeader() {

        const autoData = this.find(this.state.query);

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

                    {/* <TextInput style={{
                        marginLeft: 8,
                        backgroundColor: 'white',
                        borderRadius: 16,
                        fontFamily: 'Quicksand-Regular'
                    }} placeholder="Search"></TextInput> */}

                    <Autocomplete
                        ref={this.secondTextInputRef}
                        inputContainerStyle={{
                            marginLeft: 8,
                            marginRight: 8,
                            marginTop: 2,
                            marginBottom: 2,
                            backgroundColor: 'white',
                            borderRadius: 16,
                            borderWidth: 0,

                        }}
                        style={{
                            fontFamily: 'Quicksand-Regular'
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
                                <View>
                                    {item.is_first ?
                                        <Text
                                            style={{
                                                backgroundColor: '#f7f7f7', color: 'black', padding: 4
                                                , fontWeight: 'bold', fontFamily: 'Quicksand-Regular'
                                            }}
                                        >{item.is_academy ? "Academies" : "Localities"}</Text>
                                        :
                                        null
                                    }

                                    <TouchableOpacity
                                        onPress={() => {
                                            {
                                                this.state.suggestionResult = []
                                                if (!item.is_academy) {
                                                    this.state.query = item.name
                                                    this.getAcademicSearchResult(false)
                                                } else {
                                                    this.props.navigation.navigate('AcademyProfile')
                                                }
                                            }
                                        }}
                                    >
                                        <Text style={{ fontSize: 12, padding: 2, fontFamily: 'Quicksand-Regular' }}>{item.name}</Text>
                                    </TouchableOpacity>

                                </View>

                            )}
                    />

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
                this.props.navigation.navigate('AcademyProfile')
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

                    <Text style={{ paddingTop: 12, paddingLeft: 12, fontSize: 16, 
                        color: '#707070',
                        fontFamily: 'Quicksand-Regular'
                        }}>
                        {item.name}
                    </Text>

                    <View style={{ paddingLeft: 12, paddingTop: 8, flexDirection: 'row', flex: 1 }}>

                        <Rating
                            type='custom'
                            ratingColor='#F4FC9A'
                            ratingBackgroundColor='#D7D7D7'
                            ratingCount={5}
                            imageSize={14}
                            readonly={true}
                            style={{ height: 30, width: 80 }}
                        />

                        <Text style={{
                            backgroundColor: '#DFDFDF', height: 19, width: 30, textAlign: 'center',
                            fontSize: 12,
                            color: '#707070',
                            paddingTop: 2,
                            borderRadius: 12,
                            fontFamily: 'Quicksand-Regular'
                        }}>{item.ratings}</Text>

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

        if (this.props.data.loading && !this.state.isAutoSuggest) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        return (

            <View style={styles.chartContainer}>

                <FlatList
                    ListHeaderComponent={() => this.listHeader()}
                    data={this.state.academies}
                    extraData={this.state.academies}
                    renderItem={this._renderItem}
                />


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

export default connect(mapStateToProps, mapDispatchToProps)(AcademyListing);


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


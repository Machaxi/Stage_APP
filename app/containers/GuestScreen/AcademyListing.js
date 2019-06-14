import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput, Keyboard } from 'react-native';
import { Card, Text, ActivityIndicator, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { connect } from 'react-redux';
import { getAllAcademy, search, search_auto_suggest } from '../../redux/reducers/AcademyReducer'
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios'

class AcademyListing extends Component {

    constructor(props) {
        super(props)
        this.state = {
            academies: [],
            query: '',
            autodata: [],
            isAutoSuggest: false
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

    getAutoSuggestion() {

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

                let res = JSON.stringify(response.data)
                console.warn("response " + res);

            })
            .catch((error) => {
                // handle error
                console.log("error " + error);
            });
    }

    getAcademicSearchResult(hardSearch) {

        this.state.isAutoSuggest = false
        let locality_id = ""
        let search_query = ""
        console.warn(this.state.query)
        if (hardSearch) {
            search_query = this.state.query
        }

        this.props.search(search_query, locality_id).then(() => {
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

                    {/* <TextInput style={{
                        marginLeft: 8,
                        backgroundColor: 'white',
                        borderRadius: 16,
                        fontFamily: 'Quicksand-Regular'
                    }} placeholder="Search"></TextInput> */}

                    <Autocomplete
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
                        data={this.state.autodata}
                        defaultValue={this.state.query}
                        onChangeText={text => {
                            this.state.query = text
                            //console.warn(text)
                            this.getAutoSuggestion()
                        }}
                        onSubmitEditing={() => {
                            this.getAcademicSearchResult(true)
                        }}
                        placeholder="Search"
                        onKeyPress={this.handleKeyDown}
                        returnKeyType='search'
                        renderItem={({ item, i }) => (
                            <TouchableOpacity onPress={() => this.setState({ query: item })}>
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </Card>

                <Text style={{
                    marginTop: 8, marginBottom: 4,
                    textAlign: 'right',
                    color: '#404040', fontSize: 12
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

                    <Text style={{ paddingTop: 12, paddingLeft: 12, fontSize: 16, color: '#707070' }}>
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
        color: 'white', textAlign: 'center'
    },
});


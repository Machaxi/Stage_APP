import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput, Keyboard, Text } from 'react-native';
import { Card, ActivityIndicator, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { connect } from 'react-redux';
import { getAllAcademy, search, search_auto_suggest } from '../../redux/reducers/AcademyReducer'
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios'
import BaseComponent, {EVENT_SELECT_PLAYER_TOURNAMENT} from './../BaseComponent'
import Events from '../../router/events';

export default class AddPartner extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            data: ["", "", "", "", "", ""],
            query: '',
            item_id:''
        }
        this.state.item_id = this.props.navigation.getParam('id','')
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


    _renderItem = ({ item }) => (

        <TouchableOpacity activeOpacity={.8}
            onPress={() => {
                let id = this.state.item_id
                //this.props.navigation.navigate('AcademyProfile', { id: item.id })
                this.props.navigation.goBack()
                Events.publish(EVENT_SELECT_PLAYER_TOURNAMENT,
                    {name:'Raj',phone:'919999999999',id:id});
            }}>

            <Card
                style={{
                    borderRadius: 8,
                    marginLeft: 16,
                    marginRight: 16,
                    marginTop: 6,
                    marginBottom: 6,
                    elevation: 2

                }}>
                <View
                style={{flexDirection:'row', alignItems:'center', 
                paddingTop:10, paddingRight:16,paddingBottom:10,
                paddingLeft:16}}
                >
                    <Image style={{ height: 50, width: 45, borderRadius: 16, }}
                        source={require('../../images/player_small.png')}
                    >

                    </Image>

                    <Text style={{
                        paddingLeft: 12, fontSize: 16,
                        color: '#707070',
                        fontFamily: 'Quicksand-Regular'
                    }}>
                        Rohit J.
                    </Text>

                </View>

            </Card>
        </TouchableOpacity>

    );

    render() {

        const autoData = this.find(this.state.query);

        // if (this.props.data.loading && !this.state.isAutoSuggest) {
        //     return (
        //         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //             <ActivityIndicator size="large" color="#67BAF5" />
        //         </View>
        //     )
        // }

        return (

            <View style={styles.chartContainer}>

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

                    <TouchableOpacity activeOpacity={.8}
                    onPress={()=>{
                        this.props.navigation.navigate('AddPartnerWithPhone')
                    }}
                    >

                    <Text style={{
                        marginTop: 8, marginBottom: 4,
                        color: '#404040', fontSize: 10,
                        fontFamily: 'Quicksand-Regular'
                    }} >Can’t find the player?
                    
                    <Text style={{
                        marginTop: 8, marginBottom: 4,
                        color: '#667DDB', fontSize: 10,
                        marginLeft:4,
                        fontFamily: 'Quicksand-Regular'
                    }} >Add via Phone number</Text>

                    </Text>
                    </TouchableOpacity>
                    
                </View>
                
                <FlatList
                    data={this.state.data}
                    extraData={this.state.data}
                    renderItem={this._renderItem}
                />

            </View>
        );
    }
}



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


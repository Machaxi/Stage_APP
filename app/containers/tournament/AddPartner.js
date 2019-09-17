import React, { Component } from 'react';
import { StyleSheet, View,ActivityIndicator, TouchableOpacity, Image, FlatList, TextInput, Keyboard, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { connect } from 'react-redux';
import { getAllAcademy, search, search_auto_suggest } from '../../redux/reducers/AcademyReducer'
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios'
import BaseComponent, {EVENT_SELECT_PLAYER_TOURNAMENT,EVENT_SELECT_PLAYER_ADD_NUMBER, defaultStyle} from './../BaseComponent'
import Events from '../../router/events';
import { getPartnerList } from "../../redux/reducers/TournamentReducer";
import { getData } from "../../components/auth";

class AddPartner extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            players: [],
            query: '',
            item_id:'',
            tournament_id:''
        }
        this.state.item_id = this.props.navigation.getParam('id','')
        this.state.tournament_id = this.props.navigation.getParam('tournament_id','')
        
        this.refreshEvent = Events.subscribe('AddPartner', (args) => {
            Events.publish(EVENT_SELECT_PLAYER_TOURNAMENT,
               args);
              this.props.navigation.goBack()

        });
    }

    componentDidMount(){

        getData('header', (value) => {

            let size = 20
            let page =0
            let tournament_id = this.state.tournament_id

            this.props.getPartnerList(value,tournament_id,page,size).then(() => {
                let data = this.props.data.data
                console.log(' getTournamentResultListing ' + JSON.stringify(data));

                let success = data.success
                if (success) {

                    console.log(' getTournamentResultListing ' + JSON.stringify(data.data.tournaments));

                    this.setState({
                        players: data.data.players
                    })
                }

            }).catch((response) => {
                console.log(response);
            })
        })
    }


    find(query) {
        let players = this.state.players
        if (query === '') {
            return players;
        }
        const regex = new RegExp(`${query.trim()}`, 'i');
        console.log('regex ', regex)
        return players.filter(item => item.name.search(regex) >= 0);
    }


    _renderItem = ({ item }) => (

        <TouchableOpacity activeOpacity={.8}
            onPress={() => {
                let id = this.state.item_id
                //this.props.navigation.navigate('AcademyProfile', { id: item.id })
                this.props.navigation.goBack()
                Events.publish(EVENT_SELECT_PLAYER_TOURNAMENT,
                    {name:item.name,phone:'-',id:id});
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
                    <Image 
                    resizeMode="contain"
                    style={{ height: 50, width: 45, borderRadius: 8, }}
                        source={{uri:item.profile_pic}} />

                    <Text style={
                        [defaultStyle.regular_text_14,
                            {paddingLeft: 12, 
                                color: '#707070',
                                }] }>
                       {item.name}
                    </Text>

                </View>

            </Card>
        </TouchableOpacity>

    );

    render() {

        const autoData = this.find(this.state.query);

        if (this.props.data.loading && this.state.players.length==0) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

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
                        }} placeholder="Search"
                        onChangeText={text => {
                            this.state.query = text
                            this.setState({
                                query:text
                            })
                            // console.warn(text)
                            // const data = this.find(this.state.query);
                            // this.state.filter = data;
                            // this.setState({
                            //     filter: data
                            // })
                        }}>
                        
                        </TextInput>


                    </Card>

                    <TouchableOpacity activeOpacity={.8}
                    onPress={()=>{
                        let id = this.state.item_id
                        this.props.navigation.navigate('AddPartnerWithPhone',{
                            id:id
                        })
                        
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
                
                {}
                <FlatList
                    data={autoData}
                    extraData={autoData}
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
    getPartnerList
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPartner);



const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7'
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
});


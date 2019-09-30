import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Card, } from 'react-native-paper';
import BaseComponent, {
    EVENT_SELECT_PLAYER_TOURNAMENT,
    defaultStyle, getFormattedTournamentType, getFormattedRound,
    getFormattedCategory, getFormattedTournamentLevel, formattedName
} from '../BaseComponent'
import Moment from 'moment';
import { getData } from '../../components/auth';
import { FlatList } from 'react-native-gesture-handler';
import Events from '../../router/events';


export default class EditPartner extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            players: null,
            show_enable: false
        }

        this.state.data = JSON.parse(this.props.navigation.getParam('data'));
        console.log('Data-> ', this.props.navigation.getParam('data'))
        //storeData('temp', this.props.navigation.getParam('data'))

        const registrations = this.state.data['tournament_registrations']
        let playerName = []
        for (let i = 0; i < registrations.length; i++) {
            playerName.push(registrations[i].player.id)
        }
        const playerTemp = [... new Set(playerName)]
        console.log('playerTemp -> 0', JSON.stringify(playerTemp))


        let category = []

        for (let j = 0; j < registrations.length; j++) {
            let obj = registrations[j]
            category.push(obj.tournament_category)
        }
        const tempCategory = [... new Set(category)]
        console.log('TempCategory=>', JSON.stringify(tempCategory))


        let new_player = []
        for (let i = 0; i < playerTemp.length; i++) {

            let player = playerTemp[i]
            let category_array = []
            for (let j = 0; j < tempCategory.length; j++) {

                let cat = tempCategory[j]
                let obj = this.getPlayerMatch(registrations, player, cat);
                if (obj != null) {
                    obj= { ...obj, tournament_id: player.id }
                    category_array.push(obj)
                }
            }
            if (category_array.length > 0) {
                player = { id: player, list: category_array }
                playerTemp[i] = { ...player }
                new_player.push(player)
            }

        }
        console.log('pLayerList => ', JSON.stringify(playerTemp))
        console.log('bewPlayer => ', JSON.stringify(new_player))

        const final_array = []
        for (let i = 0; i < new_player.length; i++) {

            let temp = new_player[i]
            let playerObj = this.getPlayerById(temp.id, registrations)
            console.log('playerObj=> ', JSON.stringify(playerObj))
            const player = { player: playerObj, list: temp.list }
            playerTemp[i] = { ...player }
            final_array.push(player)
        }

        console.log('final_array => ', JSON.stringify(final_array))


        this.setState({
            players: final_array
        })
        this.state.players = final_array



    }

    componentDidMount() {

        this.refreshEvent = Events.subscribe(EVENT_SELECT_PLAYER_TOURNAMENT, (args) => {
            console.log(EVENT_SELECT_PLAYER_TOURNAMENT)
            console.log('args - > ' + JSON.stringify(args))

        });

    }

    getPlayerById(id, registrations) {
        for (let i = 0; i < registrations.length; i++) {
            if (registrations[i].player.id == id) {
                return registrations[i].player
            }
        }
    }

    getPlayerMatch(registrations, playerId, cat) {

        let type_array = []

        for (let i = 0; i < registrations.length; i++) {

            let player = registrations[i]
            console.log(player.player.id + '==' + playerId + '&&' + player.tournament_category + '==' + cat)
            if (player.player.id == playerId && player.tournament_category == cat) {
                if (player.tournament_type != 'SINGLE') {
                    let obj = {
                        tournament_type: player.tournament_type,
                        partner_name: player.partner_name
                    }
                    type_array.push(obj)
                }
            }
        }


        //console.log('Cat -> ' + cat, JSON.stringify(type_array))
        if (type_array.length > 0) {
            let obj = {
                tournament_category: cat,
                tournament_type: type_array
            }
            console.log('Cat -> ' + cat, JSON.stringify(obj))
            return obj;
        } else {
            return null
        }

    }

    tournament_types(tournament_types) {

        let str = ''
        for (let i = 0; i < tournament_types.length; i++) {
            let tournament_type = tournament_types[i].tournament_type
            str = str + getFormattedTournamentLevel(tournament_type) + ", "
        }

        return str.substring(0, str.length - 2);
    }


    getRegisteredPlayers(tournament_registrations) {

        let array = []
        let str = ''
        for (let i = 0; i < tournament_registrations.length; i++) {
            let name = tournament_registrations[i].player.name
            array.push(name)
            //str = str + name + " | "
        }

        let unique = [...new Set(array)];
        for (let i = 0; i < unique.length; i++) {
            let name = unique[i]
            str = str + name + " | "
        }
        return str.substring(0, str.length - 2);
    }

    getCategoryView(list) {


        return (
            <View>
                <Text style={{
                    paddingTop: 10,
                    fontSize: 14,
                    color: '#404040',
                    width: "20%",
                    textAlign: 'left',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    fontFamily: 'Quicksand-Regular'
                }}>{getFormattedCategory(obj.tournament_category)}</Text>

            </View>
        )
    }

    _renderItem = ({ item }) => {
        console.log('item-> ', JSON.stringify(item))
        return (

            <View>
                <Text style={[defaultStyle.heavy_bold_text_14, {
                    paddingTop: 10,
                }]}>{item.player.name}
                </Text>
                <FlatList
                    data={item.list}
                    renderItem={this.sub_renderItem}
                />
            </View>

        )
    }

    sub_renderItem = ({ item }) => {

        console.log('sub_renderItem-> ', JSON.stringify(item))

        return (

            <View>
                <Text style={[defaultStyle.heavy_bold_text_14, {
                    paddingTop: 10,
                }]}>{getFormattedCategory(item.tournament_category)}
                </Text>
                <FlatList
                    data={item.tournament_type}
                    renderItem={this.editItem}
                />
            </View>
        )
    }

    editItem = ({ item }) => {

        console.log('editItem-> ', JSON.stringify(item))

        return (

            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 6
            }}>
                <Text style={[defaultStyle.regular_text_14, {
                    width: "40%"
                }]}>
                    {getFormattedTournamentLevel(item.tournament_type)}
                </Text>

                <Text
                    numberOfLines={1}
                    style={[defaultStyle.heavy_bold_text_14, {
                        width: "40%"
                    }]}>
                    {item.partner_name}
                </Text>


                <TouchableOpacity
                    onPress={() => {

                        this.props.navigation.navigate('AddPartner', {
                            id: item.id,
                            tournament_id: this.state.data['id'],
                            user_id: ''
                        })
                    }}
                >

                    <Text style={[defaultStyle.regular_text_12, {
                        //width: "30%",
                        marginLeft: 12,
                        color: '#67BAF5'
                    }]}>
                        Edit
                </Text>
                </TouchableOpacity>

            </View>
        )
    }
    render() {

        const show_enable = this.state.show_enable
        let data = this.state.data
        let players = this.state.players
        console.log('players => ', JSON.stringify(players))
        return (

            <ScrollView>

                <View style={styles.chartContainer}>

                    <Card
                        style={{
                            elevation: 2
                        }}>
                        <View style={{ marginLeft: 8, marginRight: 8, marginTop: 2 }}>
                            <Image style={{ height: 150, width: "100%" }}
                                source={require('../../images/tournament_banner.png')}
                            />


                            <View style={{
                                marginLeft: 6,
                                marginRight: 6,
                                marginBottom: 12
                            }}>

                                <View style={{
                                    paddingTop: 12,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>

                                    <Text style={defaultStyle.bold_text_14}>
                                        {data.name}
                                    </Text>

                                </View>


                                <View style={{ paddingTop: 8, flexDirection: 'row' }}>

                                    <Text style={defaultStyle.bold_text_14}>
                                        {data.month + " " + data.year}
                                    </Text>

                                </View>

                                <Text style={{
                                    paddingTop: 6, fontSize: 14,
                                    color: '#404040',
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    Dates <Text style={defaultStyle.bold_text_14}>
                                        {Moment(data.start_date).format('DD MMM') + " - " + Moment(data.end_date).format('DD MMM')}
                                    </Text>
                                </Text>



                                <View style={{ marginBottom: 8, marginRight: 12 }}>


                                    <View style={{
                                        marginTop: 12,
                                    }}>

                                        <Text style={{
                                            fontSize: 10,
                                            color: '#A3A5AE',
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            Players
                                    </Text>

                                        {players != null ?

                                            <View>

                                                <FlatList
                                                    data={players}
                                                    extraData={players}
                                                    renderItem={this._renderItem}
                                                />
                                                <View style={{
                                                    justifyContent: 'center',
                                                    padding: 16,
                                                    marginTop: 20,
                                                    alignItems: 'center'
                                                }}>

                                                    <TouchableOpacity activeOpacity={.8}
                                                        style={[styles.rounded_button, {
                                                            backgroundColor: show_enable ? '#67BAF5' : 'gray',
                                                        }]}
                                                        onPress={() => {

                                                            if (show_enable) {

                                                            }
                                                        }}>
                                                        <Text
                                                            style={{
                                                                color: 'white',
                                                                textAlign: 'center',
                                                                fontFamily: 'Quicksand-Medium'
                                                            }}
                                                        >Save</Text>
                                                    </TouchableOpacity></View>

                                            </View>


                                            : null}
                                    </View>

                                </View>

                            </View>

                        </View>
                    </Card>
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },
    rounded_button: {
        width: '40%',
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
    rounded_button_white: {
        width: '48%',
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: 'white',
        color: '#67BAF5',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
});


import React from 'react';
import { StyleSheet, View, Image, Text, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Card, } from 'react-native-paper';
import BaseComponent, {
    EVENT_SELECT_PLAYER_TOURNAMENT,
    defaultStyle, getFormattedTournamentType, getFormattedRound,
    getFormattedCategory, getFormattedTournamentLevel, formattedName
} from '../BaseComponent'
import Moment from 'moment';
import { getData } from '../../components/auth';
import { FlatList } from 'react-native-gesture-handler';
import { editPartner } from "../../redux/reducers/EditPartnerReducer";
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Events from '../../router/events';

class EditPartner extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            players: null,
            show_enable: false,
            spinner: false,
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
                    obj = { ...obj, tournament_id: player.id }
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

        const final_array1 = []
        for (let i = 0; i < final_array.length; i++) {

            let player = final_array[i].player
            let list = final_array[i].list
            let temp_list = []
            for (let j = 0; j < list.length; j++) {

                let list_obj = list[j]
                let tournament_category = list_obj.tournament_category
                let tournament_type = list_obj.tournament_type
                let temp_tournament_type = []
                for (let k = 0; k < tournament_type.length; k++) {

                    let type = tournament_type[k].tournament_type
                    let tournament_id = this.searchTournamentId(player.entity_id,
                        tournament_category,
                        type)

                    let newObj = { ...tournament_type[k], tournament_id: tournament_id }
                    temp_tournament_type.push(newObj)
                    //list[j] = {...}
                }
                console.log('temp_tournament_type=> ', JSON.stringify(temp_tournament_type))
                let t_type = {
                    tournament_category: tournament_category,
                    tournament_type: temp_tournament_type
                }
                temp_list.push(t_type)
            }

            let obj = {
                player: final_array[i].player,
                list: temp_list
            }
            final_array1.push(obj)
        }

        console.log('final_array1 => ', JSON.stringify(final_array1))


        this.setState({
            players: final_array1
        })
        this.state.players = final_array1
    }

    progress(status) {
        setTimeout(() => {
            console.log('Progress=> ', status)
            this.setState({
                spinner: status
            })
            this.state.spinner = status
        }, 100)

    }

    searchTournamentId(entity_id, tournament_category, type) {
        const registrations = this.state.data['tournament_registrations']
        for (let i = 0; i < registrations.length; i++) {

            let obj = registrations[i]
            let t_entity_id = obj.player.entity_id
            let t_tournament_category = obj.tournament_category
            let t_tournament_type = obj.tournament_type

            if (t_entity_id == entity_id && t_tournament_category == tournament_category &&
                type == t_tournament_type) {
                return obj.id
            }
        }
    }
    componentDidMount() {

        this.refreshEvent = Events.subscribe(EVENT_SELECT_PLAYER_TOURNAMENT, (args) => {
            console.log(EVENT_SELECT_PLAYER_TOURNAMENT)
            console.log('args - > ' + JSON.stringify(args))
            let match_id = args.id
            let name = args.name
            let phone = args.phone
            this.setState({
                show_enable: true
            })
            this.updatePartner(match_id, name, phone)
        });

    }

    updatePartner(match_id, partner_name, mobile_number) {

        let final_array = this.state.players
        const final_array1 = []
        for (let i = 0; i < final_array.length; i++) {

            let player = final_array[i].player
            let list = final_array[i].list
            let temp_list = []
            for (let j = 0; j < list.length; j++) {

                let list_obj = list[j]
                let tournament_category = list_obj.tournament_category
                let tournament_type = list_obj.tournament_type
                let temp_tournament_type = []
                for (let k = 0; k < tournament_type.length; k++) {

                    let type = tournament_type[k].tournament_type
                    let tournament_id = tournament_type[k].tournament_id

                    let newObj = {}

                    if (tournament_id == match_id) {
                        newObj = {
                            ...tournament_type[k],
                            tournament_id: tournament_id,
                            partner_name: partner_name,
                            partner_mobile_number: mobile_number,
                            is_change: true
                        }
                    } else {
                        newObj = { ...tournament_type[k], tournament_id: tournament_id }
                    }

                    temp_tournament_type.push(newObj)

                }
                console.log('temp_tournament_type=> ', JSON.stringify(temp_tournament_type))
                let t_type = {
                    tournament_category: tournament_category,
                    tournament_type: temp_tournament_type
                }
                temp_list.push(t_type)
            }

            let obj = {
                player: final_array[i].player,
                list: temp_list
            }
            final_array1.push(obj)
        }

        console.log('update_final_array1 => ', JSON.stringify(final_array1))

        this.setState({
            players: final_array1
        })
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

    updateApi() {

        let final_array = this.state.players
        let update_array = []

        for (let i = 0; i < final_array.length; i++) {

            let list = final_array[i].list
            for (let j = 0; j < list.length; j++) {

                let list_obj = list[j]
                let tournament_type = list_obj.tournament_type
                for (let k = 0; k < tournament_type.length; k++) {

                    let is_change = tournament_type[k].is_change
                    if (is_change) {
                        let update_obj = {
                            id: tournament_type[k].tournament_id,
                            partner_name: tournament_type[k].partner_name,
                            partner_mobile_number: tournament_type[k].partner_mobile_number
                        }
                        update_array.push(update_obj)
                    }

                }
            }
        }

        console.log('update_array => ', JSON.stringify(update_array))
        let data = {}
        data['data'] = update_array

        this.progress(true)

        getData('header', (value) => {

            this.props.editPartner(value, data).then(() => {

                this.progress(false)

                let data = this.props.data.data
                console.log(' editPartner ' + JSON.stringify(data));

                let success = data.success
                if (success) {

                    let msg = data.success_message
                    setTimeout(() => {
                        Alert.alert(
                            'Success',
                            msg,
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        Events.publish('EDIT_PARTNER');
                                        this.props.navigation.goBack()
                                    }
                                },
                            ],
                            { cancelable: false },
                        );
                    }, 100)

                }
                this.setState({ isRefreshing: false })

            }).catch((response) => {
                this.progress(false)
                console.log(response);
            })
        })
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
                            id: item.tournament_id,//match_id
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

                    <Spinner
                        visible={this.state.spinner}
                        textStyle={defaultStyle.spinnerTextStyle}
                    />
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
                                                                this.updateApi()
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
const mapStateToProps = state => {
    return {
        data: state.EditPartnerReducer,
    };
};
const mapDispatchToProps = {
    editPartner
};
export default connect(mapStateToProps, mapDispatchToProps)(EditPartner);

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


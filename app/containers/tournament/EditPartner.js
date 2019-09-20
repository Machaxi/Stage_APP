import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Card, } from 'react-native-paper';
import BaseComponent, {
    defaultStyle, getFormattedTournamentType, getFormattedRound,
    getFormattedCategory, getFormattedTournamentLevel, formattedName
} from '../BaseComponent'
import Moment from 'moment';
import { getData } from '../../components/auth';


export default class EditPartner extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            data: {},

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



        for (let i = 0; i < playerTemp.length; i++) {

            let category = []
            let player = playerTemp[i]
            let playerObj = null

            for (let j = 0; j < registrations.length; j++) {
                let obj = registrations[j]
                if (playerTemp[i] == obj.player.id) {
                    playerObj = obj.player
                    playerObj.avgFeedbackEntities = null
                    category.push(obj.tournament_category)
                }
            }

            const catTemp = [... new Set(category)]
            player = { player: playerObj }
            player.category = catTemp
            playerTemp[i] = player
        }

        console.log('playerTemp -> 1', JSON.stringify(playerTemp))


        for (let i = 0; i < playerTemp.length; i++) {

            //let category = []
            let player = playerTemp[i]
            let playerObj = null

            let category = player.category
            for (j = 0; j < category.length; j++) {

                console.log('playerTemp -> 2',JSON.stringify(category))

                let cat = category[j]
                let type = []

                for (let k = 0; k < registrations.length; k++) {
                    let obj = registrations[k]
                    console.log('playerTemp -> if',JSON.stringify(player)+' == '+obj.player.id)
                    if (player.player.id == obj.player.id && obj.tournament_category == cat) {

                        type.push(obj.tournament_type)
                        // playerObj = obj.player
                        // playerObj.avgFeedbackEntities = null
                        // category.push(obj.tournament_category)
                    }
                }
                
                let tempCat = {cat:cat,type:type}
                category[j] = 
                playerTemp[i].category = category[j] 
            }
        }

        console.log('playerTemp -> 3', JSON.stringify(playerTemp))


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

    render() {


        let data = this.state.data
        let tournament_registrations = data.tournament_registrations
        let registered_array = []
        for (let i = 0; i < tournament_registrations.length; i++) {

            let obj = tournament_registrations[i]

            registered_array.push(
                <View style={{

                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'space-between'
                }}>

                    <Text style={{
                        paddingTop: 10, fontSize: 14,
                        color: '#404040',
                        width: "30%",
                        fontWeight: '400',
                        fontFamily: 'Quicksand-Medium'
                    }}>{formattedName(obj.player.name)}</Text>

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

                    <Text style={{
                        paddingTop: 10,
                        fontSize: 14,
                        textAlign: 'left',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        color: '#404040',
                        width: "30%",
                        fontFamily: 'Quicksand-Regular'
                    }}>{getFormattedTournamentLevel(obj.tournament_type)}</Text>

                    {obj.tournament_type == 'MIX_DOUBLE' || obj.tournament_type == 'DOUBLE'
                        ?
                        <Text
                            onPress={() => {
                                alert('under development')
                            }}
                            style={{
                                paddingTop: 10, fontSize: 10,
                                color: '#667DDB',
                                width: "20%",
                                textAlign: 'center',
                                alignItems: 'center',
                                fontFamily: 'Quicksand-Regular'
                            }}>
                            Edit Partner
                    </Text>
                        : <Text style={{ width: "20%", }}></Text>
                    }


                </View>
            )

        }

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
                                            Registered Players
                                    </Text>
                                        {registered_array}
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


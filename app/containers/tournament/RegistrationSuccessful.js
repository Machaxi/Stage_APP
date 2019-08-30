import React from 'react'

import { View, ImageBackground, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import BaseComponent, { defaultStyle, GO_TO_HOME, getFormattedTournamentType,getFormattedTournamentLevel } from '../BaseComponent';
import { ScrollView } from 'react-native-gesture-handler';
import Moment from 'moment';
import { CustomeButtonB } from '../../components/Home/Card';
import { getData, storeData } from '../../components/auth';
import { GUEST, PLAYER, PARENT, COACH, ACADEMY } from '../../components/Constants'
import Events from './../../router/events';


export default class RegistrationSuccessful extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            user_selection: [],
            name: '',
            data: {}
        }
        this.state.user_selection = this.props.navigation.getParam('user_selection', '')
        this.state.name = this.props.navigation.getParam('name', '')
        this.state.data = this.props.navigation.getParam('data', '')

    }

    render() {

        let data = JSON.parse(this.state.data)
        let id = data['id']
        let name = this.state.name
        let tournament_name = data['name']
        let month = data['month'] + " " + data['year']
        let academic_type = data['academic_type']
        let start_date = data['start_date']
        let end_date = data['end_date']

        let dates = Moment.utc(start_date).local().format('DD MMM') + " - " +
            Moment.utc(end_date).local().format('DD MMM')

        let user_selection = JSON.parse(this.state.user_selection)
        let array = []
        for (let i = 0; i < user_selection.length; i++) {
            let obj = user_selection[i]
            let title = obj.title
            let wholeText = ''
            wholeText = wholeText + title
            let tournament_types = obj.tournament_types
            for (let j = 0; j < tournament_types.length; j++) {

                let type = tournament_types[j]
                if (type.selected && !type.disable) {

                    wholeText = wholeText + "          " + getFormattedTournamentLevel(type.tournament_type)
                }


            }
            array.push(<Text style={[defaultStyle.regular_text_14, { paddingBottom: 8 }]}>
                {wholeText}
            </Text>)
        }
        console.log('registrion success => ', user_selection)


        return (

            <ScrollView>

                <View
                    style={{
                        padding: 16

                    }}>

                    <View>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20
                        }}>

                            <Image style={{
                                height: 100,
                                width: 100,

                            }}
                                source={require('../../images/success_icon.png')}
                            />

                            <Text style={{
                                fontSize: 14,
                                color: '#000000',
                                marginTop: 16,
                                marginBottom: 4,
                                fontFamily: 'Quicksand-Medium'
                            }}>
                                Registration Sucessfull!
                    </Text>

                        </View>

                        <View style={defaultStyle.line_style}></View>


                        <View style={{
                            paddingLeft: 16,
                            paddingTop: 8,
                            paddingBottom: 8
                        }}>


                            <Text style={{
                                fontSize: 14,
                                paddingTop: 12,
                                color: '#404040',
                                fontFamily: 'Quicksand-Regular'
                            }}>
                                {tournament_name}
                            </Text>


                            <View style={{ paddingTop: 12, flexDirection: 'row', flex: 1 }}>

                                <Text style={{
                                    fontSize: 14,
                                    color: '#404040',
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    {month}
                                </Text>

                                <Text style={{
                                    backgroundColor: '#667DDB',
                                    textAlign: 'center',
                                    fontSize: 12,
                                    marginLeft: 8,
                                    color: 'white',
                                    borderRadius: 4,
                                    paddingLeft: 6,
                                    paddingRight: 6,
                                    paddingTop: 2,
                                    paddingBottom: 2,
                                    fontFamily: 'Quicksand-Regular'
                                }}>{getFormattedTournamentType(academic_type)}</Text>

                            </View>

                            <Text style={{
                                paddingTop: 12, fontSize: 14,
                                color: '#404040',
                                fontFamily: 'Quicksand-Regular'
                            }}>
                                Dates <Text style={{ color: '#404040' }}>{dates}</Text>
                            </Text>



                            <Text style={{
                                fontSize: 10,
                                marginTop: 10,
                                color: '#A3A5AE',
                                fontFamily: 'Quicksand-Regular'
                            }}>
                                Registered Players
                    </Text>

                            <Text style={{
                                paddingTop: 6, fontSize: 14,
                                color: '#404040',
                                fontFamily: 'Quicksand-Regular'
                            }}>
                                {name}
                            </Text>

                            <View style={{ paddingTop: 10, }}>

                                {array}

                            </View>


                            <View style={{ marginTop: 8, marginBottom: 8, backgroundColor: '#DFDFDF', height: 1 }}></View>

                            {/* <TouchableOpacity activeOpacity={.8}
                                onPress={() => {
                                    this.props.navigation.navigate('RegistrationSteps')
                                    //console.warn('Done')
                                }}
                            >
                                <View style={{
                                    marginTop: 16,
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={[defaultStyle.regular_text_12, { color: '#667DDB' }]}>
                                        Register another Player?
                                </Text>
                                </View>
                            </TouchableOpacity> */}


                            <TouchableOpacity activeOpacity={.8}
                                style={{ marginTop: 20 }}
                                onPress={() => {
                                    //this.props.navigation.navigate('TournamentFixture')
                                    console.warn('Done')
                                }}
                            >

                                {/* <View style={{
                                    width: '100%',
                                    marginTop: 16,
                                    marginBottom: 8,
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>

                                    <Text style={style.rounded_button}>
                                        Finish Registration
                                </Text>
                                </View> */}
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: "100%"
                                }}>

                                    <View style={{
                                        flex: 1,
                                        width: 200,
                                    }}>
                                        <CustomeButtonB
                                            onPress={() => {
                                                let obj = {
                                                    tournament_id: id,
                                                }
                                                Events.publish(GO_TO_HOME, obj);
                                            }}
                                        >
                                            Finish Registration
                                    </CustomeButtonB>
                                    </View>
                                </View>

                            </TouchableOpacity>

                        </View>
                    </View>

                </View>
            </ScrollView>

        );
    }

}

const style = {
    rounded_button: {
        width: '100%',
        height: 40,
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
    textinput: {
        textAlign: 'center',
        height: 36,
        marginTop: 12,
        color: '#404040',
        width: 150, borderBottomColor: '#DFDFDF',
        borderBottomWidth: 1,
        fontFamily: 'Quicksand-Regular'
    },
    text: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 10,
        color: '#A3A5AE'
    },
    rounded_button: {
        flex: 1,
        width: 150,
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: '#67BAF5',
        color: 'white',
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
}
import React from 'react'

import { View, ImageBackground, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import BaseComponent from '../BaseComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, ActivityIndicator, } from 'react-native-paper';

export default class RegistrationSuccessful extends BaseComponent {

    constructor(props) {
        super(props)

    }

    render() {
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
                                fontFamily: 'Quicksand-Bold'
                            }}>
                                Registration Sucessfull!
                    </Text>

                        </View>

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
                                Feather Academy Tournament
                    </Text>


                            <View style={{ paddingTop: 12, flexDirection: 'row', flex: 1 }}>

                                <Text style={{
                                    fontSize: 14,
                                    color: '#404040',
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    May 2019
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
                                }}>Inter-Academy</Text>

                            </View>

                            <Text style={{
                                paddingTop: 12, fontSize: 14,
                                color: '#404040',
                                fontFamily: 'Quicksand-Regular'
                            }}>
                                Dates <Text style={{ color: '#404040' }}>05 May 19</Text>
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
                                Prithiviraj P
                    </Text>

                            <View style={{ flexDirection: 'row', paddingTop: 10, }}>
                                <Text style={{
                                    fontSize: 14,
                                    color: '#404040',
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    U - 13
                                </Text>

                                <Text style={{
                                    fontSize: 14,
                                    color: '#404040',
                                    marginLeft:16,
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    Singles
                                </Text>

                                <Text style={{
                                    fontSize: 14,
                                    color: '#404040',
                                    marginLeft:16,
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    Doubles
                                </Text>

                            </View>


                            <View style={{ marginTop: 8, marginBottom: 8, backgroundColor: '#DFDFDF', height: 1 }}></View>

                            <TouchableOpacity activeOpacity={.8}
                                onPress={() => {
                                    //this.props.navigation.navigate('TournamentFixture')
                                    console.warn('Done')
                                }}
                            >

                                <View style={{
                                    width: '100%',
                                    marginTop: 12,
                                    marginBottom: 8,
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>

                                    <Text style={style.rounded_button}>
                                        Finish Registration
                                </Text>
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
        borderWidth: 1,
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
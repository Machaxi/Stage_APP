import React from 'react'

import { View, Text, Image } from 'react-native'
import BaseComponent from '../BaseComponent';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { CustomeButtonB, SwitchButton, } from '../../components/Home/SwitchButton'

export default class TournamentScorer extends BaseComponent {

    constructor(props) {
        super(props)

    }

    render() {
        return (

            <ScrollView>

                <View style={{ padding: 16, }}>

                    <View style={{

                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>

                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center'
                            }}>
                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: 17,
                                    fontWeight: "400",
                                    fontFamily: 'Quicksand-Medium'
                                }}
                            >Rahul R</Text>

                            <Image
                                source={require('../../images/playerimg.png')}
                                style={{ marginTop: 20, width: 130, height: 180 }}

                            />
                            <Text
                                style={{
                                    color: '#667DDB',
                                    fontSize: 10,
                                    marginTop: 20,
                                    fontFamily: 'Quicksand-Regular'
                                }}
                            >Give bye</Text>


                        </View>

                        <View>

                            <View
                                style={{ flex: 1 }}
                            >

                            </View>

                            <View
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 44 / 2,
                                    marginBottom: 10,
                                    backgroundColor: "#D2D2D2",
                                    justifyContent: 'center'
                                }}>



                                <Text style={{
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    fontSize: 17,
                                    fontWeight: "400",
                                    fontFamily: 'Quicksand-Medium',
                                    color: 'white'

                                }}>VS</Text>

                            </View>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center'
                            }}>
                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: 17,
                                    fontWeight: "400",
                                    fontFamily: 'Quicksand-Medium'
                                }}
                            >Rahul R</Text>

                            <Image
                                source={require('../../images/playerimg.png')}
                                style={{ marginTop: 20, width: 130, height: 180 }}

                            />
                            <Text
                                style={{
                                    color: '#667DDB',
                                    fontSize: 10,
                                    marginTop: 20,
                                    fontFamily: 'Quicksand-Regular'
                                }}
                            >Give bye</Text>


                        </View>
                    </View>

                    <View style={{
                        flex: 1,
                        marginTop: 10,
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                        <Text
                            style={{
                                textAlign: 'center',
                                width: 120,
                                elevation: 2,
                                marginTop: 16,
                                padding: 4,
                                color: '#A3A5AE',
                                fontFamily: 'Quicksand-Regular',
                                borderRadius: 8,
                                backgroundColor: 'white'
                            }}
                        >Set 1</Text>

                        <Text
                            style={{
                                marginTop: 16,
                                textAlign: 'center',
                                width: 120,
                                elevation: 2,
                                padding: 4,
                                color: '#A3A5AE',
                                fontFamily: 'Quicksand-Regular',
                                borderRadius: 8,
                                backgroundColor: 'white'
                            }}
                        >Set 2</Text>

                        <Text
                            style={{
                                marginTop: 16,
                                textAlign: 'center',
                                width: 120,
                                elevation: 2,
                                padding: 4,
                                color: '#A3A5AE',
                                fontFamily: 'Quicksand-Regular',
                                borderRadius: 8,
                                backgroundColor: 'white'
                            }}
                        >Set 3</Text>

                    </View>

                    <View style={{
                        marginTop: 30,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>

                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center'
                        }}>


                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row'

                                }}>

                                <View
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 30 / 2,
                                        marginBottom: 10,
                                        backgroundColor: "#F3F1F1",
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        marginTop: 6,
                                        justifyContent: 'center'
                                    }}>



                                    <Text style={{
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        alignItems: 'center',
                                        fontSize: 30,
                                        fontWeight: "400",
                                        fontFamily: 'Quicksand-Medium',
                                        color: '#A3A5AE'

                                    }}>–</Text>

                                </View>
                                <Text
                                    style={{
                                        color: '#404040',
                                        fontSize: 40,
                                        fontWeight: "400",
                                        marginLeft: 10,
                                        fontFamily: 'Quicksand-Medium'
                                    }}>10</Text>

                            </View>


                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center'
                            }}>


                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        marginTop: 6
                                    }}>

                                    <View
                                        style={{
                                            width: 30,
                                            height: 30,
                                            borderRadius: 30 / 2,
                                            marginBottom: 10,
                                            alignItems: 'center',
                                            alignContent: 'center',
                                            marginTop: 6,
                                            justifyContent: 'center'
                                        }}>

                                    </View>

                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        onPress={() => {
                                            console.warn('test')
                                        }}
                                    >


                                        <Image
                                            source={require('../../images/ic_plus.png')}
                                            style={{ width: 40, height: 40 }}

                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center'
                        }}>


                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row'

                                }}>

                                <View
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 30 / 2,
                                        marginBottom: 10,
                                        backgroundColor: "#F3F1F1",
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        marginTop: 6,
                                        justifyContent: 'center'
                                    }}>



                                    <Text style={{
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        alignItems: 'center',
                                        fontSize: 30,
                                        fontWeight: "400",
                                        fontFamily: 'Quicksand-Medium',
                                        color: '#A3A5AE'

                                    }}>–</Text>

                                </View>
                                <Text
                                    style={{
                                        color: '#404040',
                                        fontSize: 40,
                                        fontWeight: "400",
                                        marginLeft: 10,
                                        fontFamily: 'Quicksand-Medium'
                                    }}>10</Text>

                            </View>


                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center'
                            }}>


                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        marginTop: 6
                                    }}>

                                    <View
                                        style={{
                                            width: 30,
                                            height: 30,
                                            borderRadius: 30 / 2,
                                            marginBottom: 10,
                                            alignItems: 'center',
                                            alignContent: 'center',
                                            marginTop: 6,
                                            justifyContent: 'center'
                                        }}>

                                    </View>

                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        onPress={() => {
                                            console.warn('test')
                                        }}
                                    >


                                        <Image
                                            source={require('../../images/ic_plus.png')}
                                            style={{ width: 40, height: 40 }}

                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </View>

                    </View>

                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 20,
                    }}>

                        <TouchableOpacity activeOpacity={.8}
                            style={style.rounded_button}
                            onPress={() => {

                            }}>
                            <Text style={style.rounded_button_text}>
                                Save</Text>
                        </TouchableOpacity>

                    </View>

                </View >
            </ScrollView >

        );
    }

}

const style = {

    rounded_button: {
        width: 100,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
    },
    rounded_button_text: {
        padding: 10,
        color: '#A3A5AE',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
}
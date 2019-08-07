import React from 'react'

import { View, Text, Image } from 'react-native'
import BaseComponent, { defaultStyle, ImageBackground } from '../BaseComponent';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { CustomeButtonB, SwitchButton, } from '../../components/Home/SwitchButton'

export default class TournamentScorer extends BaseComponent {

    constructor(props) {
        super(props)

    }

    render() {
        return (

            <ScrollView>

                <View style={{
                    position: 'absolute',
                    height: "100%",
                    justifyContent: 'center',
                    alignItems: 'center',
                    selfAlign: 'center',
                    alignContent: 'center',
                    width: "100%",
                }}>



                    <View style={{
                        height: "100%",
                        width: 3,
                        backgroundColor: '#C4C4C4'
                    }}></View>
                </View>

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
                                    width: 40,
                                    height: 40,
                                    borderRadius: 40 / 2,
                                    marginBottom: 10,
                                    alignItems: 'center',
                                    backgroundColor: "#D2D2D2",
                                    justifyContent: 'center'
                                }}>



                                <Text style={{
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    fontSize: 17,
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

                    }}>

                        <View style={{
                            flex: 1,
                            marginTop: 10,
                            alignContent: 'center',
                            alignItems: 'center',
                        }}>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 16,
                                paddingTop: 4,
                                paddingBottom: 4,
                                paddingLeft: 14,
                                paddingRight: 14,
                                elevation: 2,
                                width: 120,
                                borderRadius: 8,
                                backgroundColor: 'white'
                            }}>

                                <Text
                                    style={defaultStyle.bold_text_14}>21</Text>

                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: '#A3A5AE',
                                        fontFamily: 'Quicksand-Regular',
                                    }}>Set 1</Text>

                                <Text
                                    style={defaultStyle.bold_text_14}>12</Text>
                            </View>

                            <Text
                                style={{
                                    marginTop: 14,
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
                                    marginTop: 14,
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
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'

                                    }}>

                                    <Image
                                        source={require('../../images/ic_minus.png')}
                                        style={{
                                            width: 30,
                                            height: 30,
                                            marginTop: 5,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            color: '#404040',
                                            fontSize: 46,
                                            marginLeft: 16,
                                            fontFamily: 'Quicksand-Medium'
                                        }}>10</Text>

                                </View>


                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    marginLeft: 40,
                                }}>


                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        onPress={() => {
                                            console.warn('test')
                                        }}>
                                        <Image
                                            source={require('../../images/ic_plus.png')}
                                            style={{ width: 48, height: 48 }}

                                        />
                                    </TouchableOpacity>


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
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'

                                    }}>

                                    <Image
                                        source={require('../../images/ic_minus.png')}
                                        style={{
                                            width: 30,
                                            height: 30,
                                            marginTop: 5,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            color: '#404040',
                                            fontSize: 46,
                                            marginLeft: 16,
                                            fontFamily: 'Quicksand-Medium'
                                        }}>10</Text>

                                </View>


                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    marginLeft: 40,
                                    marginTop: 12,
                                }}>


                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        onPress={() => {
                                            console.warn('test')
                                        }}>
                                        <Image
                                            source={require('../../images/ic_plus.png')}
                                            style={{ width: 48, height: 48 }}

                                        />
                                    </TouchableOpacity>


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
        fontFamily: 'Quicksand-Medium'
    },
}
import React from 'react'

import { View, Text } from 'react-native'
import BaseComponent from '../BaseComponent';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements'
import { Card } from 'react-native-paper';

export default class RegistrationSteps extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            birthdate: "",
            txtname: '',
            txtphone: '',
            step: 1,
            checked: false
        }
    }

    showStepOne() {
        return (

            <View style={{ elevation: 1 }}>

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                    }}>

                    <Text style={{
                        fontFamily: 'Quicksand-Bold',
                        fontSize: 14,
                        color: '#000000'
                    }}>
                        Select Category
                    </Text>

                    <Text style={{
                        color: '#404040',
                        fontSize: 14,
                        marginTop: 20,
                        fontFamily: 'Quicksand-Bold',
                    }}>
                        Prithviraj P
                    </Text>

                </View>

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30
                    }}
                >
                    <Text style={style.text1}>
                        Gender
                    </Text>

                    <Text style={{
                        color: '#404040',
                        fontSize: 14,
                        marginTop: 6,
                        fontFamily: 'Quicksand-Regular',
                    }}>
                        Male
                    </Text>
                </View>

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                    }}
                >
                    <Text style={style.text1}>
                        Select player to play
                    </Text>

                    <CheckBox
                        title='U-13'
                        containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                        checked={this.state.checked}
                        style={{ color: '#404040', backgroundColor: 'white' }}
                    />

                    <CheckBox
                        title='U-15'
                        containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                        checked={this.state.checked}
                        style={{ color: '#404040', backgroundColor: 'white' }}
                    />

                </View>


                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 40,
                }}>

                    <TouchableOpacity activeOpacity={.8}
                        style={style.rounded_button}
                        onPress={() => {
                            this.setState({
                                step: this.state.step + 1
                            })
                        }}>
                        <Text style={style.rounded_button_text}>
                            Next</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    showStepTwo() {

        return (

            <View style={{ elevation: 1 }}>

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 16
                    }}>

                    <Text style={{
                        fontFamily: 'Quicksand-Bold',
                        fontSize: 14,
                        color: '#000000'
                    }}>
                        Select Tournament Type for U-13
                    </Text>

                    <View>

                        <View style={{
                            flexDirection: 'row',
                            alignContent: 'center',
                            marginTop: 30,
                            alignItems: 'center',
                        }}>

                            <CheckBox
                                title='Singles'
                                containerStyle={{
                                    backgroundColor: 'white',
                                    borderWidth: 0,
                                    width: "60%",
                                }}
                                checked={this.state.checked}
                                style={{
                                    color: '#404040', backgroundColor: 'white',
                                    fontFamily: 'Quicksand-Regular'
                                }}
                            />

                            <Text style={{
                                justifyContent: 'center',
                                fontFamily: 'Quicksand-Regular',
                                fontSize: 14,
                                color: '#000000'
                            }}>
                                Rs 500
                             </Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignContent: 'center',
                            alignItems: 'center',
                        }}>

                            <CheckBox
                                title='Doubles'
                                containerStyle={{
                                    backgroundColor: 'white',
                                    borderWidth: 0,
                                    width: "60%",
                                }}
                                checked={this.state.checked}
                                style={{
                                    color: '#404040', backgroundColor: 'white',
                                    fontFamily: 'Quicksand-Regular'
                                }}
                            />

                            <Text style={{
                                justifyContent: 'center',
                                fontFamily: 'Quicksand-Regular',
                                fontSize: 14,
                                color: '#000000'
                            }}>
                                Rs 500
                             </Text>
                        </View>


                        <TouchableOpacity activeOpacity={.8}

                            onPress={() => {
                                this.props.navigation.navigate('AddPartner')
                            }}
                            style={{
                                backgroundColor: '#F2F2F2',
                                borderRadius: 2,
                                marginLeft: 50,
                                marginRight: 40
                            }}
                        >

                            <Text style={{
                                justifyContent: 'center',
                                fontFamily: 'Quicksand-Regular',
                                fontSize: 14,
                                padding: 6,

                                color: '#A3A5AE'
                            }}>
                                + Add Partner
                             </Text>
                        </TouchableOpacity>


                        <View style={{
                            flexDirection: 'row',
                            alignContent: 'center',
                            alignItems: 'center',
                        }}>

                            <CheckBox
                                title='Mixed Doubles'
                                containerStyle={{
                                    backgroundColor: 'white',
                                    borderWidth: 0,
                                    width: "60%",
                                }}
                                checked={this.state.checked}
                                style={{
                                    color: '#404040', backgroundColor: 'white',
                                    fontFamily: 'Quicksand-Regular'
                                }}
                            />

                            <Text style={{
                                justifyContent: 'center',
                                fontFamily: 'Quicksand-Regular',
                                fontSize: 14,
                                color: '#000000'
                            }}>
                                Rs 800
                             </Text>
                        </View>

                        <View style={{
                            width: 260,
                            marginTop: 8,
                            marginBottom: 8,
                            height: 1,
                            backgroundColor: "#E5E5E5"
                        }}></View>

                        <Text style={{
                            marginTop: 8,
                            width: 250,
                            textAlign: 'right',
                            justifyContent: 'center',
                            fontFamily: 'Quicksand-Regular',
                            fontSize: 14,
                            color: '#000000'
                        }}>
                            Fees (U-13) : Rs 800
                             </Text>

                    </View>



                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 40,
                    }}>

                        <TouchableOpacity activeOpacity={.8}
                            style={style.rounded_button}
                            onPress={() => {
                                this.setState({
                                    step: this.state.step + 1
                                })
                            }}>
                            <Text style={style.rounded_button_text}>
                                Next</Text>
                        </TouchableOpacity>

                    </View>
                </View>



            </View>
        )
    }

    showStepThree() {

        return (
            <ScrollView>

                <View style={{ elevation: 1 }}>

                    <View
                        style={{

                            margin: 20
                        }}>

                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>

                            <Text style={{

                                fontFamily: 'Quicksand-Bold',
                                fontSize: 14,
                                color: '#000000'
                            }}>
                                Payment
                    </Text>
                        </View>


                        <View style={{
                            width: "100%",
                            marginTop: 16,
                            marginBottom: 10,
                            height: 1,
                            backgroundColor: "#E5E5E5"
                        }}></View>

                        <Text style={{
                            fontFamily: 'Quicksand-Regular',
                            fontSize: 10,
                            color: '#A3A5AE'
                        }}>
                            Registered Player
                    </Text>

                        <View>

                            <View style={{
                                backgroundColor: "#F2F2F2",
                                marginTop: 12,
                                padding: 8,
                                marginBottom: 12
                            }}>

                                <Text style={{

                                    fontFamily: 'Quicksand-Regular',
                                    fontSize: 14,
                                    color: '#A3A5AE'
                                }}>
                                    U - 13
                            </Text>

                                <View style={{ flexDirection: 'row' }}>

                                    <View style={{ marginTop: 12 }}>

                                        <Text style={{
                                            fontFamily: 'Quicksand-Regular',
                                            fontSize: 10,
                                            color: '#A3A5AE'
                                        }}>
                                            Singles
                                    </Text>
                                        <Text style={{
                                            marginTop: 4,
                                            fontFamily: 'Quicksand-Regular',
                                            fontSize: 14,
                                            color: '#A3A5AE'
                                        }}>
                                            Rs 500
                                    </Text>
                                    </View>

                                    <View style={{ marginTop: 12, marginLeft: 12 }}>

                                        <Text style={{
                                            fontFamily: 'Quicksand-Regular',
                                            fontSize: 10,
                                            color: '#A3A5AE'
                                        }}>
                                            Doubles
                                    </Text>
                                        <Text style={{
                                            marginTop: 4,
                                            fontFamily: 'Quicksand-Regular',
                                            fontSize: 14,
                                            color: '#A3A5AE'
                                        }}>
                                            Rs 500
                                    </Text>
                                    </View>
                                    <View style={{
                                        marginTop: 12,
                                        marginLeft: 12,
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                        flex: 1

                                    }}>

                                        <Text style={{
                                            fontFamily: 'Quicksand-Regular',
                                            fontSize: 10,
                                            color: '#A3A5AE'
                                        }}>
                                            Total Fees
                                    </Text>
                                        <Text style={{
                                            marginTop: 4,
                                            fontFamily: 'Quicksand-Regular',
                                            fontSize: 14,
                                            color: '#A3A5AE'
                                        }}>
                                            Rs 500
                                    </Text>
                                    </View>


                                </View>

                                <View style={{ flexDirection: 'row' }}>

                                    <View style={{ marginTop: 12 }}>

                                        <Text style={{
                                            fontFamily: 'Quicksand-Regular',
                                            fontSize: 10,
                                            color: '#A3A5AE'
                                        }}>
                                            Singles
                                    </Text>
                                        <Text style={{
                                            marginTop: 4,
                                            fontFamily: 'Quicksand-Regular',
                                            fontSize: 14,
                                            color: '#A3A5AE'
                                        }}>
                                            Rs 500
                                    </Text>
                                    </View>

                                    <View style={{ marginTop: 12, marginLeft: 12 }}>

                                        <Text style={{
                                            fontFamily: 'Quicksand-Regular',
                                            fontSize: 10,
                                            color: '#A3A5AE'
                                        }}>
                                            Doubles
                                    </Text>
                                        <Text style={{
                                            marginTop: 4,
                                            fontFamily: 'Quicksand-Regular',
                                            fontSize: 14,
                                            color: '#A3A5AE'
                                        }}>
                                            Rs 500
                                    </Text>
                                    </View>
                                    <View style={{
                                        marginTop: 12,
                                        marginLeft: 12,
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                        flex: 1

                                    }}>

                                        <Text style={{
                                            fontFamily: 'Quicksand-Regular',
                                            fontSize: 10,
                                            color: '#A3A5AE'
                                        }}>
                                            Total Fees
                                    </Text>
                                        <Text style={{
                                            marginTop: 4,
                                            fontFamily: 'Quicksand-Regular',
                                            fontSize: 14,
                                            color: '#A3A5AE'
                                        }}>
                                            Rs 500
                                    </Text>
                                    </View>


                                </View>


                            </View>

                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 30
                            }}>


                                <Text style={{
                                    fontFamily: 'Quicksand-Regular',
                                    fontSize: 10,
                                    color: '#A3A5AE'
                                }}>
                                    Total Fees
                                    </Text>

                                <Text style={{
                                    fontFamily: 'Quicksand-Bold',
                                    fontSize: 16,
                                    marginTop: 8,
                                    color: '#404040'
                                }}>
                                    Rs 1100
                                    </Text>

                                <Text style={{
                                    fontFamily: 'Quicksand-Regular',
                                    fontSize: 12,
                                    marginTop: 5,
                                    marginBottom: 16,
                                    color: '#404040'
                                }}>
                                    Non Refundable
                                    </Text>



                                <TouchableOpacity activeOpacity={.8}
                                    style={style.rounded_button}
                                    onPress={() => {
                                       this.props.navigation.navigate('RegistrationSuccessful')
                                    }}>
                                    <Text style={style.rounded_button_text}>
                                        Next</Text>
                                </TouchableOpacity>


                            </View>

                        </View>


                    </View>

                </View >
            </ScrollView>

        )
    }

    render() {

        let stepView
        if (this.state.step == 1) {
            stepView = this.showStepOne();
        } else if (this.state.step == 2) {
            stepView = this.showStepTwo()
        } else if (this.state.step == 3) {
            stepView = this.showStepThree()
        }

        let step = this.state.step

        return (

            <View
                style={{
                    flex: 1,
                    backgroundColor: '#F7F7F7',
                }}
            >


                <View
                    style={{
                        margin: 16,
                        height: 80,
                        selfAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <View style={style.circle_colored}><Text style={style.text}>1</Text></View>

                        <View style={step >= 2 ? style.line_colored : style.line}></View>

                        <View style={step >= 2 ? style.circle_colored : style.circle}>
                            {step >= 2 ? <Text style={style.text}>2</Text> : null}
                        </View>

                        <View style={step >= 3 ? style.line_colored : style.line}></View>

                        <View style={step >= 3 ? style.circle_colored : style.circle}>

                            {step >= 3 ? <Text style={style.text}>3</Text> : null}

                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Text style={style.bottom_text}>{step >= 1 ? "Select Player" : ""}</Text>

                        <Text style={style.bottom_text}>{step >= 2 ? "U-13 | U-15" : ""}</Text>

                        <Text style={style.bottom_text}>{step >= 3 ? "Payment" : ""}</Text>

                    </View>

                </View>


                <Card
                    style={{ height: "100%", width: "100%", elevation: 5, borderRadius: 10 }}
                >
                    {stepView}
                </Card>

            </View >
        );
    }

}

const style = {

    rounded_button: {
        borderRadius: 20,
        borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',
    },
    rounded_button_text: {
        width: 150,
        padding: 10,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
    circle: {
        width: 22,
        height: 22,
        borderRadius: 22 / 2,
        textAlign: 'center',
        backgroundColor: '#C4C4C4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle_colored: {
        width: 22,
        height: 22,
        borderRadius: 22 / 2,
        textAlign: 'center',
        backgroundColor: '#667DDB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'Quicksand-Regular',
    },
    text1: {
        color: '#A3A5AE',
        fontSize: 12,
        fontFamily: 'Quicksand-Regular',
    },
    bottom_text: {
        color: '#667DDB',
        fontSize: 10,
        alignContent: 'center',
        textAlign: 'center',
        width: "33%",
        marginTop: 6,
        fontFamily: 'Quicksand-Regular'
    },
    line: {
        width: 90,
        height: 2,
        backgroundColor: '#C4C4C4'
    },
    line_colored: {
        width: 90,
        height: 2,
        backgroundColor: '#667DDB'
    },
    textinput: {
        textAlign: 'center',
        height: 36,
        marginTop: 12,
        color: '#404040',
        width: 150, borderBottomColor: '#DFDFDF',
        borderBottomWidth: 1,
        fontFamily: 'Quicksand-Regular'
    }
}
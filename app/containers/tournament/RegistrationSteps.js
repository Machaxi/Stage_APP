import React from 'react'

import { View, Text } from 'react-native'
import BaseComponent from '../BaseComponent';
import { TouchableOpacity, ScrollView, FlatList } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements'
import { Card } from 'react-native-paper';
import { getData } from '../../components/auth';


export default class RegistrationSteps extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            birthdate: "",
            txtname: '',
            txtphone: '',
            step: 1,
            subStep: 0,
            selected_tour_size: 0,
            checked: false,
            data: [],
            tournament_selection: [],
            checked_category: [],
            tournament_types: [],
            user_selection: []

        }

        getData('detail', (value) => {

            this.state.data = JSON.parse(value)

            let array = []
            for (let i = 0; i < this.state.data.category_types.length; i++) {

                let tournament = this.state.data.category_types[i]
                let obj = { title: tournament, selected: false }
                array[i] = obj
            }

            let tournament_types = []
            for (let i = 0; i < this.state.data.tournament_types.length; i++) {

                let tournament = this.state.data.tournament_types[i]
                let obj = { ...tournament, selected: false }
                tournament_types[i] = obj
            }

            this.setState({
                tournament_selection: array,
                tournament_types: tournament_types
            })
            console.log("tournament_types => ", this.state.tournament_types)
        })
    }

    showStepOne() {
        return (
            <ScrollView>
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


                        <FlatList
                            data={this.state.tournament_selection}
                            renderItem={({ item }) =>
                                <CheckBox
                                    checked={item.selected}
                                    onPress={() => {
                                        let tournament_selection = [...this.state.tournament_selection];
                                        let index = tournament_selection.findIndex(el => el.title === item.title);
                                        tournament_selection[index] = { ...tournament_selection[index], selected: !item.selected };
                                        this.setState({ tournament_selection });

                                    }
                                    }
                                    style={{ marginTop: -4 }}
                                    title={item.title}
                                    containerStyle={{
                                        backgroundColor: 'white',
                                        borderWidth: 0
                                    }}
                                    style={{
                                        color: '#404040',
                                        backgroundColor: 'white'
                                    }}
                                />
                            }
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

                                let tournament = this.state.tournament_selection
                                let count = 0
                                let checked_category = []
                                let template = []
                                for (let i = 0; i < tournament.length; i++) {
                                    if (tournament[i].selected) {
                                        checked_category[count] = tournament[i].title
                                        let detail = {
                                            title: tournament[i].title,
                                            tournament_types: [...this.state.tournament_types]
                                        }
                                        template[count++] = detail
                                    }
                                }
                                this.state.checked_category = checked_category;
                                let size = checked_category.length
                                this.state.user_selection = template

                                if (size == 0) {
                                    alert('Please select atleast one category')
                                } else {
                                    console.warn('userselection=>', this.state.user_selection)
                                    this.setState({
                                        step: this.state.step + 1,
                                        selected_tour_size: size,
                                    })
                                }


                            }}>
                            <Text style={style.rounded_button_text}>
                                Next</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        )
    }

    showStepTwo(model) {

        let tournament_types = model.tournament_types


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
                        Select Tournament Type for {model.title}
                    </Text>

                    <View>

                        <FlatList
                            style={{
                                flexGrow: 0,
                                marginTop: 16
                            }}
                            data={tournament_types}
                            renderItem={({ item }) =>

                                <View>

                                    <View style={{
                                        flexDirection: 'row',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                    }}>

                                        <CheckBox
                                            title={item.tournament_type}
                                            containerStyle={{
                                                backgroundColor: 'white',
                                                borderWidth: 0,
                                                width: "60%",
                                            }}
                                            checked={item.selected}
                                            onPress={() => {
                                                let user_selection = [...this.state.user_selection];
                                                let tournament_model = user_selection[this.state.subStep]

                                                let index = tournament_model.tournament_types.findIndex(el => el.id === item.id);
                                                console.log("Tournamen Press =>", index)
                                                tournament_model.tournament_types[index] =
                                                    { ...tournament_model.tournament_types[index], selected: !item.selected };

                                                console.log("Tournamen Press =>", tournament_model)
                                                console.log("Tournamen Press whole => ", this.state.user_selection)
                                                this.setState({ user_selection })
                                            }}
                                            style={{
                                                color: '#404040',
                                                backgroundColor: 'white',
                                                fontFamily: 'Quicksand-Regular'
                                            }}

                                        />

                                        <Text style={{
                                            justifyContent: 'center',
                                            fontFamily: 'Quicksand-Regular',
                                            fontSize: 14,
                                            color: '#000000'
                                        }}>
                                            Rs {item.fees}
                                        </Text>
                                    </View>

                                    {item.is_partner_required && item.selected
                                        ?
                                        <TouchableOpacity activeOpacity={.8}

                                            onPress={() => {
                                                this.props.navigation.navigate('AddPartner')
                                            }}
                                            style={{
                                                backgroundColor: '#F2F2F2',
                                                borderRadius: 2,
                                                marginLeft: 50,
                                                marginRight: 40
                                            }}>

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
                                        :
                                        null
                                    }

                                </View>

                            }
                        />


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

                                if (this.state.subStep == this.state.selected_tour_size - 1) {
                                    this.setState({
                                        step: this.state.step + 1,
                                        subStep: this.state.subStep + 1
                                    })

                                } else {
                                    this.setState({
                                        subStep: this.state.subStep + 1
                                    })
                                }
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
        const user_selection = this.state.user_selection
        console.log(user_selection)
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

                            <FlatList
                                data={user_selection}
                                renderItem={this.renderItem_tournament}
                            />

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

    renderItem_tournament = ({ item }) => (
        <View style={{
            backgroundColor: "white",
            marginBottom: 6,
            marginTop: 10
        }}>

            <Text style={{

                fontFamily: 'Quicksand-Regular',
                fontSize: 14,
                color: '#404040'
            }}>
                {item.title}
            </Text>

            <View style={{ flexDirection: 'row' }}>
                <FlatList
                    horizontal={true}
                    data={item.tournament_types}
                    renderItem={this.renderItem_sub_tournament}
                />

                <View style={{
                    marginTop: 8,
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
                        color: '#404040'
                    }}>
                        Rs 500
            </Text>
                </View>


            </View>

        </View>
    );

    renderItem_sub_tournament = ({ item }) => (

        <View>
            {item.selected ? <View style={{ marginTop: 8, marginRight: 12 }}>

                <Text style={{
                    fontFamily: 'Quicksand-Regular',
                    fontSize: 10,
                    color: '#A3A5AE'
                }}>
                    {item.tournament_type}</Text>
                <Text style={{
                    marginTop: 4,
                    fontFamily: 'Quicksand-Regular',
                    fontSize: 14,
                    color: '#404040'
                }}>
                    {item.fees}</Text>
            </View>
                : null}
        </View>

    )

    render() {

        let stepView
        if (this.state.step == 1) {
            stepView = this.showStepOne();
        } else if (this.state.step == 2 && this.state.subStep < this.state.selected_tour_size) {

            let model = this.state.user_selection[this.state.subStep]
            stepView = this.showStepTwo(model)

        } else if (this.state.step == 3) {
            stepView = this.showStepThree()
        }

        let step = this.state.step
        let subStep = this.state.subStep
        let checked_category = this.state.checked_category

        if (step == 2) {
            let string = ""
            this.state.checked_category.map((item) => {
                string = string + item + " | "
            });
            string = string.substring(0, string.length - 2)
            console.log(string)

            let selected_cat = ""
        }


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


                        <FlatList
                            style={{
                                alignSelf: 'center',
                                marginTop: 6,
                            }}
                            contentContainerStyle={{
                                flex: 1,
                                justifyContent: 'center',
                            }}
                            horizontal={true}
                            data={step >= 2 ? checked_category : null}
                            renderItem={({ item, index }) =>
                                <Text
                                    style={index < subStep ? {
                                        fontSize: 10,
                                        color: "#667DDB",
                                        fontFamily: 'Quicksand-Regular'
                                    } : {
                                            fontSize: 10,
                                            color: "#A3A5AE",
                                            fontFamily: 'Quicksand-Regular'
                                        }}
                                >{item} <Text style={{
                                    fontSize: 10,
                                    color: "#A3A5AE",
                                    fontFamily: 'Quicksand-Regular'
                                }}>{index != checked_category.length - 1 ? " | " : ""}</Text></Text>
                            }
                        />
                        {/* <Text style={style.bottom_text}>{step >= 2 ? "U-13 | U-15" : ""}</Text> */}

                        <Text style={style.bottom_text}>{step >= 3 ? "Payment" : ""}</Text>

                    </View>

                </View>

                <ScrollView>
                    <Card
                        style={{ height: "100%", width: "100%", elevation: 5, borderRadius: 10 }}
                    >
                        {stepView}

                    </Card>
                </ScrollView>

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
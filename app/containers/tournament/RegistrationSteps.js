import React from 'react'

import { View, Text, Image, Modal, StyleSheet, BackHandler } from 'react-native'
import BaseComponent, { defaultStyle, EVENT_SELECT_PLAYER_TOURNAMENT, PAYMENT_KEY, GO_TO_HOME, TEMP_USER_INFO, getFormattedTournamentLevel } from '../BaseComponent';
import { TouchableOpacity, ScrollView, FlatList } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements'
import { Card } from 'react-native-paper';
import { getData, storeData } from '../../components/auth';
import { registerTournament, getPlayerSWitcher } from "../../redux/reducers/TournamentReducer";
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Events from '../../router/events';
import RNPickerSelect from 'react-native-picker-select'
import AbortDialog from './AbortDialog'
import { GUEST, PLAYER, PARENT, COACH, ACADEMY } from '../../components/Constants'
import RazorpayCheckout from 'react-native-razorpay';

const placeholder = {
    label: 'Select ',
    value: null,
    color: '#A3A5AE',
};

class RegistrationSteps extends BaseComponent {


    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: 'Tournament Registration',
            headerTitleStyle: defaultStyle.headerStyle,

            headerLeft: (
                <TouchableOpacity
                    onPress={() => {
                        navigation.getParam('goBackAction')();
                    }}
                    activeOpacity={.8}>
                    <Image
                        resizeMode="contain"
                        source={require('../../images/go_back_arrow.png')}
                        style={{ padding: 8, width: 20, height: 16, marginLeft: 12, }}
                    />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity
                    onPress={() => {
                        navigation.getParam('showConfirmAlert')();
                    }}
                    activeOpacity={.8}
                >
                    <Text
                        style={{
                            padding: 12,
                            fontFamily: 'Quicksand-Regular',
                            fontSize: 10,
                            color: '#FF7373'
                        }}
                    >Abort</Text>
                </TouchableOpacity>

            )
        };

    };

    goBackAction = () => {
        let step = this.state.step
        console.log('steps => ' + step)
        let subStep = this.state.subStep

        if (step == 3) {
            step = 2
            subStep = subStep - 1
        }
        else if (step == 2 && subStep >= 1) {

            subStep = subStep - 1

        } else if (step == 2) {
            step = 1;
        } else if (step == 1) {
            this.setState({
                show_alert: true
            })
        }

        this.setState({
            step: step,
            subStep: subStep
        })
    }

    showConfirmAlert = () => {
        this.setState({
            show_alert: true
        })
    }

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
            user_selection: [],
            show_alert: false,
            //user_id: '',
            spinner: false,
            is_player_selected: false, //if selected then show tournament category
            players: [],
            country: '',
            new_array: [], // this is for picker,
            selected_player: null,
            alert_msg: '',
            user_type: '',
            temp_user: false,
            profile_pic: null,
            userData: null,
            total_amount: 0
        }

        this.inputRefs = {
            country: null
        };

        const { navigation } = this.props
        navigation.setParams({
            showConfirmAlert: this.showConfirmAlert,
            goBackAction: this.goBackAction
        })

        temp_user = this.props.navigation.getParam('temp_user', false)
        this.state.temp_user = temp_user
        console.warn('temp_user => ', temp_user)

        // getData('userInfo', (value) => {
        //     console.log('userInfo => ' + value)
        //     let userData = JSON.parse(value)
        //     this.state.user_id = userData.user['id']
        //     console.log('userId= > ', this.state.user_id)
        // });

        getData('detail', (value) => {

            console.log('detail=> ', value)
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

        //============== ADD PLAYER CALLBACK ==========================
        this.refreshEvent = Events.subscribe(EVENT_SELECT_PLAYER_TOURNAMENT, (args) => {
            console.log(EVENT_SELECT_PLAYER_TOURNAMENT)
            console.log('args - > ' + JSON.stringify(args))

            let user_selection = [...this.state.user_selection]
            let steps_data = user_selection[this.state.subStep]
            let tournament_types = steps_data.tournament_types

            for (let i = 0; i < tournament_types.length; i++) {


                console.log('tournament_types => ', tournament_types[i])
                let id = tournament_types[i].id
                let selected = tournament_types[i].selected

                if (id == args.id && selected) {
                    console.log('true => ')
                    tournament_types[i]['partner_name'] = args.name;
                    tournament_types[i]['partner_phone'] = args.phone;

                }
            }
            this.setState({
                user_selection: user_selection
            })
            console.log('steps_data => ', JSON.stringify(steps_data))
            console.log('user_selection => ', JSON.stringify(user_selection))

        });
        ///===============================================================


        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }
    componentDidMount() {

        let key = 'userInfo'
        if (this.state.temp_user) {
            key = TEMP_USER_INFO
        }
        getData(key, (value) => {

            console.log(key + "=== " + value)

            if (value != '') {

                let userData = JSON.parse(value)
                let user_type = userData.user['user_type']
                this.setState({
                    user_type: user_type,
                    userData: userData
                })
                if (user_type == PLAYER || user_type == PARENT) {
                    this.getPlayerList()
                }
                else if (user_type == GUEST || user_type == COACH) {

                    let name = userData.user['name']
                    //Treating guest as player so setting player object
                    let selected_player = {}
                    selected_player.name = name
                    selected_player.genderType = userData.user['genderType']
                    selected_player.user_id = userData.user['id']
                    selected_player.profile_pic = userData.user['profile_pic']
                    this.state.txtname = name
                    this.setState({
                        selected_player: selected_player
                    })
                    this.setState({
                        is_player_selected: true
                    })

                } else {
                    alert('Unknown User Type.')
                }
            }

        });

    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.setState({
            show_alert: true
        })
        return true;
    }

    getPlayerList() {

        this.progress(true)

        getData('header', (value) => {
            console.log("header", value);
            this.props.getPlayerSWitcher(value).then(() => {

                this.progress(false)

                let user = JSON.stringify(this.props.data.data);
                console.log(' getPlayerSWitcher payload ' + user);
                let user1 = JSON.parse(user)

                let uniqueArray = []
                if (user1.success == true) {
                    let itemList = user1.data['players']
                    for (let i = 0; i < itemList.length; i++) {

                        let obj = itemList[i]
                        if (!this.isPlayerExists(obj.id, uniqueArray)) {
                            uniqueArray.push(obj)
                        }
                    }
                    this.setState({
                        players: uniqueArray
                    })
                    //console.warn('uniqueArray => ', JSON.stringify(uniqueArray))

                    let new_array = []
                    for (let i = 0; i < uniqueArray.length; i++) {
                        let row = uniqueArray[i];
                        let obj = {
                            label: row.name,
                            value: row.id,
                        }
                        new_array[i] = obj
                    }
                    this.setState({
                        new_array: new_array
                    })
                }

            }).catch((response) => {
                //handle form errors
                console.log(response);
                this.progress(false)
            })

        });

    }
    isPlayerExists(id, uniqueArray) {

        for (let i = 0; i < uniqueArray.length; i++) {
            let obj = uniqueArray[i]
            if (obj.id == id) {
                return true
            }
        }
        return false
    }

    getPlayerById(id) {
        let selected_obj = null
        let players = this.state.players
        for (let i = 0; i < players.length; i++) {
            let obj = players[i]
            if (obj.id == id) {
                selected_obj = obj;
            }
        }
        return selected_obj
    }

    progress(status) {
        this.setState({
            spinner: status
        })
    }

    getFeesTotal() {

    }

    showStepOne() {

        let is_guest = this.state.user_type == GUEST || this.state.user_type == COACH
        //if there is GUEST then in that case we are not showing picker selection
        let is_player_selected = this.state.is_player_selected
        let profile_pic = this.state.profile_pic
        let selected_player = this.state.selected_player

        return (
            <ScrollView>
                <View style={{ elevation: 1 }}>

                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20
                        }}>


                    </View>

                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>


                        {is_guest ?

                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    fontFamily: 'Quicksand-Medium',
                                    fontSize: 14,
                                    color: '#000000'
                                }}>
                                    Select Category
                            </Text>
                                <Text style={{

                                    color: '#404040',
                                    fontSize: 14,

                                    marginTop: 20,
                                    fontFamily: 'Quicksand-Medium',
                                }}>
                                    {this.state.txtname}
                                </Text></View>
                            :
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text style={{
                                    fontFamily: 'Quicksand-Medium',
                                    fontSize: 14,
                                    color: '#000000'
                                }}>
                                    Select Player
                                </Text>

                                <RNPickerSelect style={{
                                    width: '90%',
                                }}
                                    placeholder={placeholder}
                                    items={this.state.new_array}
                                    onValueChange={(value) => {
                                        //console.warn(value)
                                        if (value != null) {
                                            let player = this.getPlayerById(value)
                                            this.state.txtname = player.name
                                            this.setState({
                                                country: value,
                                                selected_player: player,
                                                is_player_selected: true
                                            });
                                        }
                                    }}
                                    style={pickerSelectStyles}
                                    value={this.state.country}
                                    useNativeAndroidPickerStyle={false}
                                    ref={(el) => {
                                        this.inputRefs.country = el;
                                    }}
                                /></View>
                        }




                    </View>

                    {is_player_selected ?
                        <View>

                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 20
                                }}
                            >

                                {selected_player.profile_pic != null ?
                                    <Image
                                        resizeMode="contain"
                                        style={{ width: 80, height: 100 }}
                                        source={{ uri: selected_player.profile_pic }} /> : null}

                                <Text style={[style.text1, { marginTop: 10 }]}>
                                    Gender
                                </Text>

                                <Text style={{
                                    color: '#404040',
                                    fontSize: 14,
                                    marginTop: 6,
                                    fontFamily: 'Quicksand-Regular',
                                }}>
                                    {selected_player.genderType == undefined ? "-" : selected_player.genderType}
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
                                            checkedIcon={<Image style={{
                                                width: 18,
                                                height: 18
                                            }} resizeMode="contain" source={require('../../images/ic_checkbox_on.png')} />}
                                            uncheckedIcon={<Image style={{
                                                width: 18,
                                                height: 18
                                            }} resizeMode="contain" source={require('../../images/ic_checkbox_off.png')} />}
                                            containerStyle={{
                                                backgroundColor: 'white',
                                                borderWidth: 0,
                                                padding: 4,
                                                margin: 0,
                                                marginTop: 20,

                                            }}
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
                                            style={{
                                                color: '#404040',
                                                backgroundColor: 'white',
                                            }}
                                        />
                                    }
                                />

                            </View>


                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginTop: 40,
                                marginBottom: 40
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
                                            alert('Please select at least one category')
                                        } else {
                                            //console.warn('userselection=>', this.state.user_selection)
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
                        : null}
                </View>
            </ScrollView>
        )
    }

    showStepTwo(model) {

        let tournament_types = model.tournament_types
        let user_selection = this.state.user_selection
        let sub_total_ui = []
        let all_total = 0

        for (let i = 0; i < user_selection.length; i++) {

            let element = user_selection[i]
            let title = element['title']
            let total = 0
            let tournament_types = element['tournament_types']
            for (let j = 0; j < tournament_types.length; j++) {

                let selected = tournament_types[j].selected
                if (selected) {
                    total = total + tournament_types[j].fees
                    all_total = tournament_types[j].fees + all_total
                }
            }
            if (total > 0) {
                sub_total_ui.push(
                    <Text style={{
                        marginTop: 8,
                        width: 250,
                        textAlign: 'right',
                        justifyContent: 'center',
                        fontFamily: 'Quicksand-Regular',
                        fontSize: 14,
                        color: '#A3A5AE'
                    }}>
                        Fees ({title}) :
                    <Text style={{ marginLeft: 12, color: '#404040' }}>    Rs {total}</Text>
                    </Text>
                )
            }
        }

        return (

            <View style={{ elevation: 1 }}>

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 16
                    }}>

                    <Text style={{
                        fontFamily: 'Quicksand-Medium',
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
                                            checkedIcon={<Image style={{
                                                width: 18,
                                                height: 18
                                            }} resizeMode="contain" source={require('../../images/ic_checkbox_on.png')} />}
                                            uncheckedIcon={<Image style={{
                                                width: 18,
                                                height: 18
                                            }} resizeMode="contain" source={require('../../images/ic_checkbox_off.png')} />}
                                            containerStyle={{
                                                backgroundColor: 'white',
                                                borderWidth: 0,
                                                padding: 4,
                                                margin: 0,
                                                marginTop: 20,
                                                fontFamily: 'Quicksand-Regular',
                                                fontWeight: '0'
                                            }}
                                            title={getFormattedTournamentLevel(item.tournament_type)}
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
                                                this.props.navigation.navigate('AddPartner', {
                                                    id: item.id,
                                                    tournament_id: this.state.data['id']
                                                })
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
                                            }}
                                                numberOfLines={1}
                                            >
                                                {item.partner_name ? item.partner_name + ' (' + item.partner_phone + ')'
                                                    : '+ Add Partner'}
                                            </Text>
                                        </TouchableOpacity>
                                        :
                                        null
                                    }

                                </View>

                            }
                        />

                        {this.state.alert_msg != '' ?
                            <Text style={[defaultStyle.regular_text_14, {
                                color: 'red'
                            }]}>
                                {this.state.alert_msg}
                            </Text> : null}


                        <View style={{
                            width: 260,
                            marginTop: 12,
                            marginBottom: 8,
                            height: 1,
                            backgroundColor: "#E5E5E5"
                        }}></View>



                        {sub_total_ui}

                        {all_total > 0 ?
                            <View>
                                <View style={{
                                    width: 260,
                                    marginTop: 12,
                                    marginBottom: 8,
                                    height: 1,
                                    backgroundColor: "#E5E5E5"
                                }}></View>

                                <Text style={{
                                    marginTop: 8,
                                    width: 250,
                                    textAlign: 'right',
                                    justifyContent: 'center',
                                    fontFamily: 'Quicksand-Medium',
                                    fontSize: 14,
                                    color: '#A3A5AE'
                                }}>
                                    Total Fees :
                            <Text style={{ color: '#404040' }}>    Rs {all_total}</Text>
                                </Text>
                            </View> : null
                        }

                    </View>



                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 40,
                        marginBottom: 40,
                    }}>

                        <TouchableOpacity activeOpacity={.8}
                            style={style.rounded_button}
                            onPress={() => {

                                console.log('tournament_types => ', tournament_types)
                                let is_selected = false
                                for (let i = 0; i < tournament_types.length; i++) {

                                    let type = tournament_types[i]
                                    if (type.selected) {
                                        is_selected = true;
                                        break;
                                    }
                                }

                                let is_double_player_selected = true
                                let typeName = ''

                                for (let i = 0; i < tournament_types.length; i++) {

                                    let type = tournament_types[i]
                                    if (type.selected && type.is_partner_required) {
                                        if (type.partner_name == undefined
                                            || type.partner_name == '') {
                                            typeName = type.tournament_type
                                            is_double_player_selected = false
                                            break
                                        }
                                    }
                                }

                                if (!is_selected) {
                                    //alert('Please select tournament type')
                                    this.setState({
                                        alert_msg: 'Please select tournament type'
                                    })
                                } else if (!is_double_player_selected) {
                                    //alert()
                                    this.setState({
                                        alert_msg: 'Please select partner for ' + getFormattedTournamentLevel(typeName)
                                    })
                                } else {
                                    this.setState({
                                        alert_msg: ''
                                    })
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
        let all_total = 0
        console.log('user_selection=> ' + JSON.stringify(user_selection))
        for (let i = 0; i < user_selection.length; i++) {

            let element = user_selection[i]
            let title = element['title']
            let total = 0
            let tournament_types = element['tournament_types']
            for (let j = 0; j < tournament_types.length; j++) {

                let selected = tournament_types[j].selected
                if (selected) {
                    total = total + tournament_types[j].fees
                    all_total = tournament_types[j].fees + all_total
                }
            }
            element['total'] = total

        }

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

                                fontFamily: 'Quicksand-Medium',
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


                        <View style={{
                            marginTop: 8, flexDirection: 'row', justifyContent: 'space-between'
                        }}>

                            <Text style={defaultStyle.regular_text_14}>
                                {this.state.txtname}
                            </Text>
                            <Text style={{
                                fontFamily: 'Quicksand-Regular',
                                fontSize: 14,
                                color: '#A3A5AE'
                            }}>
                                Total Fees :
                            <Text style={{ color: '#404040' }}> Rs {all_total}</Text>
                            </Text>

                        </View>

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
                                    fontFamily: 'Quicksand-Medium',
                                    fontSize: 16,
                                    marginTop: 8,
                                    color: '#404040'
                                }}>
                                    Rs {all_total}
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

                                        this.processPaymentGateway()
                                    }}>
                                    <Text style={style.rounded_button_text}>
                                        Next
                                        </Text>
                                </TouchableOpacity>


                            </View>

                        </View>


                    </View>

                </View >
            </ScrollView>

        )
    }


    getTotalAmount() {
        const user_selection = this.state.user_selection
        let all_total = 0
        //console.log('user_selection=> ' + JSON.stringify(user_selection))
        for (let i = 0; i < user_selection.length; i++) {

            let element = user_selection[i]
            let total = 0
            let tournament_types = element['tournament_types']
            for (let j = 0; j < tournament_types.length; j++) {

                let selected = tournament_types[j].selected
                if (selected) {
                    total = total + tournament_types[j].fees
                    all_total = tournament_types[j].fees + all_total
                }
            }

        }
        return all_total
    }

    processPaymentGateway() {

        let fees = this.getTotalAmount()
        let total = fees
        total = total + '00'

        let userData = this.state.userData
        let user = userData['user']
        let name = user['name']
        let email = user['email']
        if (name == null || name == undefined)
            name = ''

        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: PAYMENT_KEY,
            amount: total,
            name: 'Dribble Diary',
            prefill: {
                email: email,
                contact: '',
                name: name
            },
            theme: { color: '#F37254' }
        }
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            console.log('Razor Rspo ', JSON.stringify(data))
            //alert(`Success: ${data.razorpay_payment_id}`);
            let payment_details = {
                razorpay_payment_id: data.razorpay_payment_id
            }
            this.submitData(payment_details, fees)
        }).catch((error) => {
            // handle failure
            console.log('Razor Rspo ', JSON.stringify(error))
            alert(`Error: ${error.code} | ${error.description}`);
        });

    }

    submitData(payment_details, fees) {

        let tournament_reg_details = [];

        let tournament_id = this.state.data['id']
        let user_id = this.state.selected_player['user_id']

        let user_selection = this.state.user_selection
        for (let i = 0; i < user_selection.length; i++) {

            let element = user_selection[i]
            let title = element['title']
            let tournament_types = element['tournament_types']
            for (let j = 0; j < tournament_types.length; j++) {

                let selected = tournament_types[j].selected
                if (selected) {

                    let obj = {}
                    obj['tournament_category'] = title
                    obj['tournament_type'] = tournament_types[j].tournament_type
                    obj['partner_name'] = tournament_types[j].partner_name
                    obj['partner_mobile_number'] = tournament_types[j].partner_phone
                    tournament_reg_details.push(obj)

                }
            }
        }

        let subData = {}
        subData['tournament_id'] = tournament_id
        subData['participant_user_id'] = user_id
        subData['tournament_registration_details'] = tournament_reg_details
        subData['fees'] = fees
        subData['payment_details'] = payment_details

        let data = {}
        data['data'] = subData
        console.log('Data=> ', JSON.stringify(data))

        this.progress(true)
        getData('header', (value) => {

            this.props.registerTournament(value, data).then(() => {
                this.progress(false)

                let data = this.props.data.data
                console.log(' registerTournament payload ' + JSON.stringify(data));

                let success = data.success
                if (success) {
                    console.log('userText=> ', JSON.stringify(this.state.user_selection))
                    this.props.navigation.navigate('RegistrationSuccessful', {
                        data: JSON.stringify(this.state.data),
                        name: this.state.txtname,
                        user_selection: JSON.stringify(this.state.user_selection)
                    })
                }

            }).catch((response) => {
                console.log(response);
                this.progress(false)
            })
        })

        //=============BYPASS CODE================
        // this.props.navigation.navigate('RegistrationSuccessful', {
        //     data: JSON.stringify(this.state.data),
        //     name: this.state.txtname,
        //     user_selection: JSON.stringify(this.state.user_selection)
        // })

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
                        Rs {item.total}
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
                    {getFormattedTournamentLevel(item.tournament_type)}</Text>
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
                }} >

                <AbortDialog
                    onYesPress={() => {
                        this.setState({
                            show_alert: false
                        })
                        setTimeout(() => {

                            Events.publish(GO_TO_HOME, true);


                        }, 100)

                    }}
                    onNoPress={() => {
                        this.setState({
                            show_alert: false
                        })
                    }}
                    visible={this.state.show_alert} />

                <Spinner
                    visible={this.state.spinner}
                    textStyle={defaultStyle.spinnerTextStyle}
                />

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

                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1
                    }}
                >
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

const mapStateToProps = state => {
    return {
        data: state.TournamentReducer,
    };
};
const mapDispatchToProps = {
    registerTournament, getPlayerSWitcher
};
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationSteps);

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        paddingVertical: 18,
        //paddingHorizontal: 10,
        borderColor: '#A3A5AE',
        borderRadius: 8,
        color: 'black',
        marginBottom: 4,
        width: 150,
        alignSelf: 'center',
        borderBottomWidth: 1,
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular',
    },
    inputAndroid: {
        marginTop: 12,
        fontSize: 14,
        textAlign: 'center',
        width: 150,
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontFamily: 'Quicksand-Regular',
        borderColor: '#A3A5AE',
        borderRadius: 8,
        borderBottomWidth: 1,
        color: 'black',
    },
});
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
    },
    touch_red_border: {
        padding: 10,
        backgroundColor: '#ffffff',
        borderColor: '#FF7373',
        borderRadius: 23,
        borderWidth: 1,
    },
    touch_red_border_txt: {
        fontSize: 14,
        color: '#FF7373',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
    touch_sky_fill: {
        padding: 10,
        backgroundColor: '#67BAF5',
        color: 'white',
        borderRadius: 23,
    },
    touch_sky_txt: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 14,
        color: 'white',
        textAlign: 'center'
    },
}
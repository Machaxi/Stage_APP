import React from 'react'

import { View, ImageBackground, Text, TextInput, Platform, Alert, ActivityIndicator, StyleSheet, TouchableOpacity, Image, BackHandler } from 'react-native'
import BaseComponent, { defaultStyle, getFormatTime, } from '../BaseComponent';
import { CustomeButtonB, SwitchButton, } from '../../components/Home/SwitchButton'
import { getData, storeData, isSignedIn } from '../../components/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import { bookTrial } from "../../redux/reducers/AcademyReducer";
import { connect } from 'react-redux';
import moment from 'moment'

class BookTrial extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            progress: false,
            txtname: '',
            txtphone: '+91',
            spinner: false,
            data: null,
            academyId: null,
            signedIn: false,
        }

        isSignedIn()
            .then(res => {
                if (res == true) {
                    getData('userInfo', (value) => {

                        if (value != '') {

                            const data = JSON.parse(value)
                            let name = data['user'].name
                            let mobile_number = data['user'].mobile_number
                            this.setState({
                                signedIn: true,
                                txtname: name,
                                txtphone: mobile_number
                            })
                        }

                    })

                }
                this.setState({
                    signedIn: res
                })
            })



        this.state.data = this.props.navigation.getParam('data')
        this.state.academyId = this.props.navigation.getParam('academyId')
        console.log('Booktrail-> ', JSON.stringify(this.state.data))
    }


    register() {

        let alert_msg = ''

        let { txtname, txtphone } = this.state


        if (txtname == '') {
            alert_msg = 'Name can\'t be blank'
            this.setState({
                alert_msg: alert_msg
            })
        }
        else if (txtphone == '' || txtphone == '+91') {
            alert_msg = 'Phone number can\'t be blank'
            this.setState({
                alert_msg: alert_msg
            })
        }
        else {

            alert_msg = ''
            this.setState({
                alert_msg: alert_msg
            })

            this.progress(true)
            let subData = {}


            const { data, academyId, signedIn } = this.state
            const batch_id = data.batch_id

            subData['academy_id'] = this.state.academyId
            subData['batch_id'] = batch_id

            if (signedIn) {

                getData('header', (value) => {
                    this.submit(value, subData)
                })

            } else {

                subData['name'] = txtname
                subData['contact'] = txtphone
                this.submit('', subData)
            }


        }
    }

    submit(value, subData) {

        let batch_name = this.state.data['batch_name']

        var data = {}
        data['data'] = subData

        this.props.bookTrial(value, data).then(() => {

            this.progress(false)

            let res = JSON.stringify(this.props.data.res);
            console.log(' bookTrial 1' + res);
            let user1 = JSON.parse(res)

            if (user1.success == true) {

                let success_message = user1.data.Success
                let mobile_number = user1.data.academy_phone
                const array = user1.data.Timings
                let classes = ''
                for (let i = 0; i < array.length; i++) {

                    let obj = array[i]
                    classes = classes + this.spaceCount(obj['weekday'].substring(0, 3)) + "  "
                        + getFormatTime(obj['start_time']) + " - "
                        + getFormatTime(obj['end_time']) + "\n"

                }
                success_message = 'Booking successful for Trial session for ' + batch_name + '. You can visit the academy on:'
                success_message = success_message + '\n\n' + classes
                if (mobile_number)
                    success_message = success_message + '\n\n' + 'You can also call the academy at ' + mobile_number + ' for more details.'


                console.log('classes=> ', classes)
                //alert(success_message)
                setTimeout(() => {
                    Alert.alert(
                        '',
                        success_message,
                        [
                            {
                                text: 'OK', onPress: () => {
                                    this.props.navigation.goBack()
                                }
                            },
                        ],
                        { cancelable: false },
                    );

                }, 500)

            }

            //this.progress(false)


        }).catch((response) => {
            this.progress(false)
            console.log(response);
        })
    }

    spaceCount(weekday) {
        let count = 8 - weekday.length
        let extraSpace = ''
        for (let i = 0; i < count; i++) {
            extraSpace = extraSpace + ' '
        }
        return weekday + extraSpace
    }

    progress(status) {
        this.setState({
            spinner: status
        })
        this.state.spinner = status

    }

    render() {

        let alert_msg = this.state.alert_msg
        let progress = this.state.progress
        console.log('SpinnerState => ', this.state.spinner)

        if (progress) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        return (

            <View
                style={{
                    margin: 16,
                    flex: 1,
                    marginTop: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >

                <Spinner
                    visible={this.state.spinner}
                    textStyle={defaultStyle.spinnerTextStyle}
                />
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                    }}
                >

                    <Text style={defaultStyle.bold_text_14}>
                        Book Trial
                    </Text>

                    <TextInput
                        style={style.textinput}
                        // mode='outlined'
                        placeholder='Name'
                        // theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black', underlineColor: '#ffffff80', background: '#ffffff80' } }}
                        value={this.state.txtname}
                        onChangeText={(txtname) => this.setState({ txtname: txtname })}
                    />

                </View>


                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10
                    }}
                >

                    <TextInput
                        keyboardType="number-pad"
                        placeholder='Phone Number'
                        style={style.textinput}
                        value={this.state.txtphone}
                        onChangeText={(txtphone) => this.setState({ txtphone: txtphone })}
                    >

                    </TextInput>

                </View>

                <Text style={[defaultStyle.regular_text_14,
                {
                    marginTop: 20,
                    color: 'red'
                }]}>{alert_msg}</Text>

                <View style={{ flex: 1, margin: 30, width: '50%' }}>
                    <CustomeButtonB onPress={() => {
                        this.register()

                    }}> Next </CustomeButtonB>
                </View>
            </View>
        );
    }

}
const mapStateToProps = state => {
    return {
        data: state.AcademyReducer,
    };
};
const mapDispatchToProps = {
    bookTrial,
};
export default connect(mapStateToProps, mapDispatchToProps)(BookTrial);


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
    }
}
import React from 'react'

import { View, ImageBackground, Text, TextInput, Image } from 'react-native'
import BaseComponent from '../BaseComponent';
import { CustomeButtonB, SwitchButton, } from '../../components/Home/SwitchButton'
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'
import PhotoUpload from 'react-native-photo-upload'
import { getData } from "../../components/auth";
import { saveUserStartupProfile } from "../../redux/reducers/ProfileReducer";
import { connect } from 'react-redux';
class EditProfile extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            birthdate: "2016-05-15",
            txtname: 'Niranjan',
            txtphone: '8291088636',
            imageData: null,
        }
    }
    saveUserProfile() {
        getData('header', (value) => {
            var formData = new FormData();
            var dataDic = {};
            // data.append('file', this.state.imageData);
            var dict = {};
            //dataDic['file'] = "storage/emulated/0/Pictures/test.jpg"//this.state.imageData
            formData.append("file", "storage/emulated/0/Pictures/test.jpg");

            dict['phone_number'] = "+919214088636"//user.phoneNumber;
            dict['name'] = 'Niranjan';
            dict['dob'] = "1987-06-28";
             data.append('post', dict);
            formData.append("post", dict)
            // console.log("header",value,batch_id);

            this.props.saveUserStartupProfile(value, formData).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
              //  let user = JSON.stringify(this.props.data.profileData);
                console.log(' user response payload ' + this.props);
                // let user1 = JSON.parse(user)

                // if (user1.success == true) {
                //     this.setState({
                //         batchDetails: user1.data['batch'],
                //         coactList: user1.data['batch'].coaches
                //         // strenthList:user1.data.player_profile['stats']

                //     })
                // }

            }).catch((response) => {
                //handle form errors
                console.log(response);
            })
        })

        // this.props.navigation.navigate('SwitchPlayer')
    }

    render() {
        return (

            <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>
                <ScrollView style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>
                    <View
                        style={{
                            margin: 16,
                            flex: 1,
                            marginTop: 10,
                            // justifyContent: 'center',
                            alignItems: 'center'

                        }}
                    >
                        <PhotoUpload containerStyle={{ margin: 10 }}
                            onPhotoSelect={avatar => {
                                console.log('Image base64 string: ')
                                if (avatar) {
                                    this.setState({
                                        imageData: avatar
                                    })
                                    console.log('Image base64 string: ', avatar)
                                }
                            }}
                        >
                            <Image
                                style={{
                                    paddingVertical: 0,
                                    width: 180,
                                    height: 240,
                                    marginBottom: -40
                                    // borderRadius: 75
                                }}
                                //  resizeMode='cover'
                                source={require('../../images/edit_profile_holder.png')}
                            />
                            <View style={{
                                flex: 1,
                                justifyContent: 'flex-end', marginBottom: 0,
                            }}>

                                <View style={{
                                    padding: 10,
                                    backgroundColor: '#67BAF5',
                                    height: 46,
                                    //borderWidth:1,
                                    //borderColor:'#67BAF5',

                                    borderRadius: 23,
                                    marginBottom: 0,
                                }} >
                                    <Text style={{
                                        fontSize: 14,
                                        color: '#FFFFFF',
                                        textAlign: 'center',
                                        marginTop: 5
                                    }}  > Change Image</Text>
                                </View>
                            </View>
                        </PhotoUpload>
                        {/*<ImageBackground*/}
                        {/*style={{ width: 180, height: 240 }}*/}
                        {/*source={require('../../images/edit_profile_holder.png')}*/}
                        {/*>*/}

                        {/*<View style={{*/}
                        {/*flex: 1,*/}
                        {/*justifyContent: 'flex-end',marginBottom:-20,*/}
                        {/*}}>*/}

                        {/*<CustomeButtonB> Change Image</CustomeButtonB>*/}
                        {/*</View>*/}


                        {/*</ImageBackground>*/}

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20
                            }}
                        >
                            <Text style={style.text}>
                                Name
                    </Text>
                            <TextInput
                                style={style.textinput}
                                // mode='outlined'
                                label='name'

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
                            <Text style={style.text}>
                                Phone Number
                    </Text>

                            <TextInput
                                style={style.textinput}>
                                987654210
                    </TextInput>
                        </View>

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 10
                            }}
                        >
                            <Text style={style.text}>
                                Birth Date
                    </Text>

                            <DatePicker
                                style={{ width: 200, borderWidth: 0 }}
                                date={this.state.birthdate}
                                mode="date"
                                placeholder="select date"
                                format="DD-MMM-YYYY"
                                minDate="2016-05-01"
                                maxDate={Date.now()}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{

                                    dateInput: {
                                        marginLeft: 36,
                                        borderWidth: 0
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(birthdate) => { this.setState({ birthdate: birthdate }) }}
                            />
                        </View>
                        <View style={{ flex: 1, margin: 20, width: '80%' }}>
                            <CustomeButtonB onPress={() => this.saveUserProfile()}> Update </CustomeButtonB>
                        </View>
                        <View style={{ flex: 1, marginTop: -20, width: '80%' }}>
                            <SwitchButton onPress={() => this.props.navigation.navigate('SwitchPlayer')}> Skip </SwitchButton>
                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }

}

const mapStateToProps = state => {
    return {
        data: state.ProfileReducer,
    };
};
const mapDispatchToProps = {
    saveUserStartupProfile
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);


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
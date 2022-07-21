
import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import * as Progress from 'react-native-progress';

import { View, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-paper'
import { SwitchButton, CustomeButtonB } from '../../../components/Home/SwitchButton'
import { CustomeCard } from '../../../components/Home/Card'
import { getCoachBatchAttendenceDetails } from "../../../redux/reducers/BatchAttendenceReducer";
import { saveCoachBatchAttendence } from "../../../redux/reducers/BatchReducer";
import { getData } from "../../../components/auth";
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements'
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import { defaultStyle, getFormatTimeDate } from '../../BaseComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import { ACADEMY, COACH } from '../../../components/Constants';
import NavigationDrawerStructure from '../../../router/NavigationDrawerStructure';
import RightMenuToolbar from '../../../router/RightMenuToolbar';
import Events from '../../../router/events';
import InfoDialog from '../../../components/custom/InfoDialog';

class CoachAttendenceBook extends React.Component {

    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: navigation.getParam('batch_name', ''),
            headerTitleStyle: defaultStyle.headerStyle,

            headerLeft: (<NavigationDrawerStructure navigationProps={navigation}
                showBackAction={true}
                showDrawer={false} />
            ),
            headerRight: (
                <RightMenuToolbar navigationProps={navigation}
                    navigation={navigation} showHome={false} />
            )
        };

    };



    constructor(props) {
        super(props)
        this.inputRefs = {

            acedemic: null

        };
        this.state = {
            showDialog:false,
            message:"",
            title:"",
            //  coach_profile:null,
            country: undefined,
            billingchecked: false,
            playerList: null,
            batchDetails: null,
            attendenceDate: '10-JULY-2019',
            batch_data: null,
            spinner: false,
            session: null,
            compensatory: null
        }

        this.compensatoryEvent = Events.subscribe('CompensatoryData', (data) => {
            this.setState({compensatory: data})
        });
        this.state.attendenceDate = moment(new Date()).format("DD-MMMM-YYYY")

        const batch_data = this.props.navigation.getParam('batch_data', undefined)
        this.state.batch_data = batch_data
        console.log('Batch-Data=>', this.state.batch_data)
        const batch_name = this.props.navigation.getParam('batch_name', '')
        this.props.navigation.setParams({
            batch_name: batch_name,
        })
        console.warn('batch_data => ', this.state.batch_data)
        this.compensatoryEvent = Events.subscribe('CompensatoryData', (data) => {
            console.log("Got Comp. Data",data);
            this.setState({compensatory: data})
        });
    }

    progress(status) {
        this.setState({
            spinner: status
        })
    }

    componentDidMount() {
        var userData;
        let batch_id = this.props.navigation.getParam('batch_id')


        console.log("Coach Attendance Book");
        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            this.setState({
                userData: JSON.parse(value)
            });
            console.log("userData.user", userData.user['user_type'])
            let userType = userData.user['user_type']

            if (userType == COACH || userType == ACADEMY) {

                const yourDate = Date()

                const NewDate = moment(this.state.attendenceDate).format('YYYY-MM-DD')
                console.log("savePlaye", NewDate)
                this.getCoachAttendencedData(batch_id, NewDate)

            }
        });
    }

    getCoachAttendencedData(btach_id, date) {

        this.state.session= null
        this.progress(true)

        getData('header', (value) => {
            console.log("header", value, btach_id);
            this.props.getCoachBatchAttendenceDetails(value, btach_id, date).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                this.progress(false)

                let user = JSON.stringify(this.props.data.batchdata);
                console.log(' getCoachBatchAttendenceDetails response payload ' + user);
                let user1 = JSON.parse(user)

               


                if (user1.success == true) {
                    let compPlayers =   user1.data["compAttendancePlayers"];
                    let compPlayersMapped =[];
                    if(compPlayers){
                        compPlayersMapped = compPlayers.map((item)=>{
                            return {
                                player_id:item.id,
                                player_name:item.name,
                                batch_id:item.operations.batch_id,
                                batch_name:item.operations.batch_name,
                                is_present:item.is_present,
                                Due: item.Due,
                            }
                        })
                    }

                    this.setState({
                        playerList: user1.data['players'],
                        batchDetails: user1.data['batch'],
                        session: user1.data['batch'].session,
                        coachesList:user1.data['coaches'],
                        compensatory:compPlayersMapped
                    })
                }

            }).catch((response) => {
                //handle form errors
                console.warn(response);
                this.progress(false)
            })

        });

    }

    renderCoachItem=({item})=> {
        return (

            <View style={{
                marginLeft: 10,
                marginRight: 10,

                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                height: 50
            }} key={item.id}>

                <View style={{
                    flex: 1,
                    marginLeft: 8,
                    marginRight: 15,
                    alignItems: 'center',
                    //marginBottom: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={[defaultStyle.regular_text_14, {
                        justifyContent: 'center',
                        alignItems: 'center'
                    }]}>
                        {item.name}
                    </Text>
                    <View style={{ backgroundColor: 'white', marginTop: 0 }}>
                        <CheckBox style={{ height: 30, width: 30, alignItems: 'center', backgroundColor: 'red' }}
                            activeOpacity={.8}
                            checkedIcon={<Image style={{
                                width: 18,
                                height: 18
                            }} resizeMode="contain"
                                source={require('../../../images/ic_checkbox_on.png')} />}
                            uncheckedIcon={<Image style={{
                                width: 18,
                                height: 18
                            }} resizeMode="contain"
                                source={require('../../../images/ic_checkbox_off.png')} />}
                            containerStyle={{
                                backgroundColor: 'white',
                                borderWidth: 0,
                                padding: 4,
                                margin: 0,
                                marginTop: 0,

                            }}
                            checked={item.is_present}
                            onPress={() => {
                                console.log("he;eleleo", item.is_present)
                                let coachesList = [...this.state.coachesList];
                                let index = coachesList.findIndex(el => el.id === item.id);
                                coachesList[index] = { ...coachesList[index], is_present: !item.is_present };
                                this.setState({ coachesList });

                                //   item.isPresent = !item.isPresent
                                // this.setState({
                                //     playerList:item
                                // })

                                console.log("he;eleleo", coachesList[0].is_present)
                            }


                            }
                        />
                    </View>

                </View>

            </View>
        )
    };

    renderFooterItem = () => (

        <View style={{
            flex: 1, marginBottom: 30, marginRight: 20, marginLeft: 20,
            marginTop: 20,
            justifyContent: 'flex-end'
        }}>

            <CustomeButtonB onPress={() => { 
                this.savePlayerAttendence() 
                }}>
                Update
       </CustomeButtonB>


        </View>
    );

    renderPlayerItem =({item})=> {
        return (

            <View style={{
                marginLeft: 10,
                marginRight: 10,
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                height: 50
            }} key={item.id}>

                <View style={{
                    flex: 1,
                    marginLeft: 8,
                    marginRight: 15,
                    alignItems: 'center',
                    //marginBottom: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={[defaultStyle.regular_text_14, {
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex:1,
                    }]}>
                        {item.name}
                    </Text>
                   
                    {item.Due &&
                    <Text style={[defaultStyle.regular_text_14, {
                        color:item.Due.color,
                        width:'50%',
                    }]}>
                        {item.Due.label}
                    </Text>
                    }
                    <View style={{ marginTop: 0 }}>
                        <CheckBox style={{ height: 30, width: 30, alignItems: 'right', backgroundColor: 'red' }}
                            activeOpacity={.8}
                            checkedIcon={<Image style={{
                                width: 18,
                                height: 18
                            }} resizeMode="contain"
                                source={require('../../../images/ic_checkbox_on.png')} />}
                            uncheckedIcon={<Image style={{
                                width: 18,
                                height: 18
                            }} resizeMode="contain"
                                source={require('../../../images/ic_checkbox_off.png')} />}
                            containerStyle={{
                                backgroundColor: 'white',
                                borderWidth: 0,
                                padding: 4,
                                margin: 0,
                                marginTop: 0,

                            }}
                            checked={item.is_present}
                            onPress={() => {
                                console.log("he;eleleo", item.is_present)
                                let playerList = [...this.state.playerList];
                                let index = playerList.findIndex(el => el.id === item.id);
                                playerList[index] = { ...playerList[index], is_present: !item.is_present };
                                this.setState({ playerList });

                                //   item.isPresent = !item.isPresent
                                // this.setState({
                                //     playerList:item
                                // })

                                console.log("he;eleleo", playerList[0].is_present)
                            }


                            }
                        />
                    </View>

                </View>

            </View>
        )
    };
    renderCompStudents = ({ item }) => {

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ backgroundColor: 'white' }}>
                    <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={defaultStyle.bold_text_14}>Batch : {item.batch_name} </Text>
                    </View>
                </View>
                <View style={{
                    backgroundColor: '#F7F7F7',
                    paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10,
                    flexDirection: 'row', justifyContent: 'space-between'
                }}>
                    <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 14 }}>Player </Text>
                    <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 14 }}>Present </Text>
                </View>
                <View style={{
                    backgroundColor: 'white',
                    height: 50,
                }}>
                    <View style={{
                        flex: 1,
                        marginLeft: 18,
                        marginRight: 25,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={[defaultStyle.regular_text_14, {
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }]}>
                            {item.player_name}
                        </Text>

                        {item.Due &&
                            <Text style={[defaultStyle.regular_text_14, {
                                color: item.Due.color,
                                width: '50%',
                            }]}>
                                {item.Due.label}
                            </Text>
                        }
                        <View style={{ marginTop: 0 }}>
                            <CheckBox style={{ height: 30, width: 30, alignItems: 'right', backgroundColor: 'red' }}
                                activeOpacity={.8}
                                checkedIcon={<Image style={{
                                    width: 18,
                                    height: 18
                                }} resizeMode="contain"
                                    source={require('../../../images/ic_checkbox_on.png')} />}
                                uncheckedIcon={<Image style={{
                                    width: 18,
                                    height: 18
                                }} resizeMode="contain"
                                    source={require('../../../images/ic_checkbox_off.png')} />}
                                containerStyle={{
                                    backgroundColor: 'white',
                                    borderWidth: 0,
                                    padding: 4,
                                    margin: 0,
                                    marginTop: 0,

                                }}
                                checked={item.is_present}
                                onPress={() => {
                                    let compensatoryData = [...this.state.compensatory];
                                    let index = compensatoryData.findIndex(el => el.player_id === item.player_id);
                                    compensatoryData[index].is_present = !compensatoryData[index].is_present
                                    this.setState({ compensatory: compensatoryData });
                                    console.log('compensatory', JSON.stringify(compensatoryData));
                                }}
                            />
                        </View>

                    </View>
                </View>
            </View>
        );
    }
   

    render() {
       
        // if (this.props.data.loading && !this.state.player_profile) {
        //     return (
        //         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        //             <ActivityIndicator size="large" color="#67BAF5"/>
        //         </View>
        //     )
        // }
        // const { batch_name, batch_category, batch_id, session } = this.state.batchDetails


        console.log('comp data => ',  this.state.compensatory)
        console.log('batch_data => ', JSON.stringify(this.state.batch_data))
        console.log('player_list => ', JSON.stringify(this.state.playerList))
        if (this.state.batch_data) {

            const batchDetails = this.state.batchDetails
            let batch_name = this.state.batch_data.batch_name
            let batch_category = this.state.batch_data.batch_category
            let session = this.state.session//this.state.batch_data.session
            let batch_id = this.state.batch_data.batch_id

            return <ScrollView><View style={{ flex: 1, marginTop: 0, backgroundColor: '#ffffff' }}>
 <InfoDialog
            touchOutside={() => {
                this.props.navigation.goBack()
                this.setState({
                    showDialog: false,
                    message: ''
                })
            }}
            title={this.state.title}
        visible={this.state.showDialog}
        message={this.state.message}
    /> 
                <Spinner
                    visible={this.state.spinner}
                    textStyle={defaultStyle.spinnerTextStyle}
                />

                <View style={{ backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>

                        <View >
                            <Text style={[defaultStyle.regular_text_10, { color: '#A3A5AE', marginBottom: 5 }]} > Batch name</Text>
                            <Text style={defaultStyle.regular_text_14}>{batch_name} </Text>
                        </View>
                        <View style={{ justifyContent: 'space-between' }}>
                            <Text style={[defaultStyle.regular_text_10, { color: '#A3A5AE', marginBottom: 5 }]} > Showing for</Text>
                            <DatePicker
                                textStyle={defaultStyle.regular_text_14}
                                style={[defaultStyle.regular_text_14, { width: 120, borderWidth: 0 }]}
                                date={this.state.attendenceDate}
                                mode="date"
                                placeholder="select date"
                                format="DD-MMM-YYYY"
                                minDate="01-01-2019"
                                maxDate={Date.now()}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                customStyles={{

                                    dateInput: {
                                        borderWidth: 0,
                                        fontSize: 14,
                                        color: '#404040',
                                        fontFamily: 'Quicksand-Regular',
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#A3A5AE'
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(attendenceDate) => {
                                    this.setState({
                                        batchDetails: []
                                    })
                                    const NewDate = moment(attendenceDate).format('YYYY-MM-DD')
                                    console.log("savePlaye", NewDate)
                                    this.getCoachAttendencedData(this.props.navigation.getParam('batch_id'), NewDate)
                                    this.setState({ attendenceDate: attendenceDate })
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20, marginTop: -10, }}>

                        <View style={{ margin: 5 }}>
                            <Text style={[defaultStyle.regular_text_10, { color: '#A3A5AE', marginBottom: 10 }]}>Time slot </Text>
                            <Text style={[defaultStyle.regular_text_14, { color: '#404040' }]}>

                                {session == null ? '-' :
                                    getFormatTimeDate("01/01/1970 ", session.start_time)
                                    + ' - ' +
                                    getFormatTimeDate("01/01/1970 ", session.end_time)}

                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{backgroundColor: '#F7F7F7',
                paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10,
                flexDirection: 'row', justifyContent: 'space-between'
            }}>
                <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 14, marginBottom: 10 }}>Player </Text>
                <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 14 }}>Present </Text>
            </View>
               
                {batchDetails != null && batchDetails.length != 0 ?
                    <View style={
                        { backgroundColor: 'white', marginTop: -10, flex: 1 }}>
                        <View>
                            <FlatList data={this.state.playerList} renderItem={this.renderPlayerItem }/>
                        </View>
                        {this.state.coachesList.length > 0 ?
                            <View>
                                <View style={{backgroundColor: '#F7F7F7',
                paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10,
                flexDirection: 'row', justifyContent: 'space-between'
            }}>
                                    <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 14, marginBottom: 10 }}>Coach </Text>
                                    <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 14 }}>Present </Text>
                                </View>

                                <View style={
                                    { backgroundColor: 'white', marginTop: -10, flex: 1 }}>
                                    <View>
                                    <FlatList data={this.state.coachesList} renderItem={this.renderCoachItem }/>
                                    </View>
                                </View>
                            </View> : null
                        }

                        <View>
                            <View style={{
                                marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 10,
                                flexDirection: 'row', justifyContent: 'space-between'
                            }}>
                                <Text style={{ fontFamily: 'Quicksand-Medium', color: '#A3A5AE', fontSize: 14, marginBottom: 10 }}>Compensatory Classes</Text>
                                <Text
                                    style={styles.rounded_button_half} 
                                    onPress={() => this.props.navigation.navigate('AddCompensatoryBatch', {
                                        batch_id: this.props.navigation.getParam('batch_id'),
                                        compensatory: this.state.compensatory
                                        })}>
                                    Add
                                </Text>
                            </View>
                        
                        <FlatList data={this.state.compensatory} renderItem={this.renderCompStudents }/>
                        {this.renderFooterItem()}
                        </View>
                    </View>
                    :
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 16
                        }}
                    >

                        <Text style={defaultStyle.regular_text_14}>Attendance not found for this date.</Text>
                    </View>

                }


                <View style={{ flex: 1, marginBottom: 30, marginRight: 20, marginLeft: 20, justifyContent: 'flex-end' }}>

                    {/*<CustomeButtonB onPress={() => {this.savePlayerAttendence()}}>*/}
                    {/*Update*/}
                    {/*</CustomeButtonB>*/}


                </View>


            </View></ScrollView>;
        } else {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                </View>
            )
        }
    }
    savePlayerAttendence() {

       // this.progress(true)
        const { session } = this.state.batchDetails;
        getData('header', (value) => {
            console.log("savePlayerAttendence header", value);
            const NewDate = moment(session.session_date).format('YYYY-MM-DD');
            console.log("savePlayerAttendence", NewDate);
            const {compensatory} = this.state
            var compensatory_batch = []
            if(compensatory !== null){
                compensatory_batch = compensatory.map(item => {
                    return {batch_id: item.batch_id, player_id: item.player_id, is_present: item.is_present}
                })
            }
           console.log('compensatory batches', compensatory_batch)
            var dataDic = {};
            var dict = {};
            dict['batch_id'] = this.state.batchDetails.batch_id//user.phoneNumber;
            dict['attendance_date'] = NewDate;
            dict['players'] = this.state.playerList
            dict['coaches'] = this.state.coachesList
            dict['compensatory'] = compensatory_batch
    
    
            dataDic['data'] = dict;
            console.log("dicttttc ", JSON.stringify(dataDic))
    
            console.warn('Save===> ', JSON.stringify(this.state.playerList))
    
            this.props.saveCoachBatchAttendence(value, this.state.batchDetails.batch_id, dataDic).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.batchdata);
                console.log(' user response payload ' + user);
                let user1 = JSON.parse(user)
                this.progress(false)
    
                if (user1.success == true) {
                    // this.setState({s
                    //     // playerList:user1.data['players'],
                    //     // batchDetails:user1.data['batch']
                    //
                    // })
                     
                    this.setState({title:"Success",message:"Attendance saved successfully.",showDialog:true})
                    //this.props.navigation.goBack()
                }
    
            }).catch((response) => {
                //handle form errors
                this.progress(false)
                console.log(response);
            })
        });
    }
}




const mapStateToProps = state => {
    return {
        data: state.BatchAttendenceReducer,
    };
};
const mapDispatchToProps = {
    getCoachBatchAttendenceDetails, saveCoachBatchAttendence
};
export default connect(mapStateToProps, mapDispatchToProps)(CoachAttendenceBook);


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        // paddingVertical: 12,
        //paddingHorizontal: 10,
        borderWidth: 0,
        borderColor: '#D3D3D3',
        borderRadius: 4,
        color: 'white',
        // paddingLeft: 10,

        // alignItems: 'stretch',
        // // justifyContent: 'right',
        alignSelf: 'center',
        height: 40,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5
        // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#614051',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

const styles = StyleSheet.create({
    navBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // backgroundColor: 'green'
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    rightIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginRight: 20
        //backgroundColor: 'white',
    },

    scoreBox: {
        color: 'white',
        marginRight: 20,
        textAlign: 'right', fontSize: 24, fontWeight: 'bold'
    },
    buttomButton: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,

        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: -5,
        marginLeft: -5,
        marginRight: -5,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 1 }, borderBottomRightRadius: 10, borderBottomLeftRadius: 10

    },
    rounded_button_half: {
        width: '25%',
        padding: 10,
        borderRadius: 20,
        //borderWidth: 1,
        marginLeft: 4,
        //marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium'
    }


});
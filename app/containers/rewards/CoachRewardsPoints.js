
import React from 'react'
import { View, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-paper'
import { SwitchButton, CustomeButtonB } from '../../components/Home/SwitchButton'
import { CustomeCard } from '../../components/Home/Card'
import { getPlayerBatch } from "../../redux/reducers/PlayerBatchReducer";
import { getData } from "../../components/auth";
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import PlayerBatchComponent from '../PlayerBatch/PlayerBatchComponent'
import ParentRewardComponent from './ParentRewardComponent';
import BaseComponent, { defaultStyle } from '../BaseComponent';
import RNPickerSelect from 'react-native-picker-select'
import { getAcademyListing, getRewardDue } from "../../redux/reducers/RewardReducer";

const placeholder = {
    label: 'Select Option ',
    value: null,
    color: '#9EA0A4',
};

class CoachRewardsPoints extends BaseComponent {


    constructor(props) {
        super(props)
        this.state = {
            batchList: ["Test1", "Test2", "Test3"],
            country: '',
            academies: [],
            coach_id: '',
            dues: null
        }
        this.inputRefs = {
            country: null
        };
        console.warn('test')
    }

    componentDidMount() {

        getData('userInfo', (value) => {
            let userData = JSON.parse(value)
            this.setState({
                coach_id: userData['coach_id']
            })
        })

        getData('header', (value) => {

            console.log("header", value);
            this.props.getAcademyListing(value).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.data);
                console.log(' user response payload 11' + user);
                let user1 = JSON.parse(user)
                if (user1.success) {
                    let array = user1.data['academies']
                    let newArray = []
                    for (let i = 0; i < array.length; i++) {
                        let row = array[i];
                        let obj = {
                            label: row.academy_name,
                            value: row.academy_id,
                        }
                        newArray[i] = obj
                    }
                    this.setState({
                        academies: newArray
                    })

                }

            }).catch((response) => {
                //handle form errors
                console.log(response);
            })
        });
    }

    fetchBatchByAcademy(academy_id) {

        let coach_id = this.state.coach_id
        coach_id = 1

        getData('header', (value) => {

            console.log("header", value);
            this.props.getRewardDue(value, academy_id, coach_id).then(() => {

                console.log(' getRewardDue response payload ' + JSON.stringify(this.props.data.data));
                let data = JSON.stringify(this.props.data.data);
                let user1 = JSON.parse(data)
                if (user1.success) {
                    let dues = user1.data['dues']
                    console.warn('dues', dues)
                    this.setState({
                        dues: dues
                    })
                }

            }).catch((response) => {
                //handle form errors
                console.log(response);
            })
        });
    }

    _renderItem = ({ item }) => (

        <View style={{
            marginTop: 12,
        }}>
            <Text style={[defaultStyle.bold_text_14,
            { marginTop: 6 }]}>{item.month + "/" + item.year}</Text>

            <FlatList
                data={item.batches}
                extraData={item}
                renderItem={this._renderSubItem}
            />




        </View>
    );

    _renderSubItem = ({ item }) => (


        <View style={{
            elevation: 2,
            marginTop: 10,
            borderRadius: 12,
            marginBottom: 2,
            backgroundColor: '#ffffff'
        }}>

            <View >


                <View style={{
                    padding: 16,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <View>
                        <Text style={styles.regular_text_10}>Batch Name</Text>
                        <Text style={[defaultStyle.bold_text_14, { marginTop: 6, color: '#707070' }]}>{item.batch_name}</Text>
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={styles.regular_text_10}>Points available</Text>
                        <Text style={[defaultStyle.regular_text_14, { marginTop: 10 }]}>{item.totalPointsAvailable}</Text>
                    </View>

                    <View style={{ marginLeft: 20 }}>
                        <Text style={styles.regular_text_10}>Category</Text>
                        <Text style={[defaultStyle.bold_text_14, { marginTop: 10, color: '#707070' }]}>{item.batch_category}</Text>
                    </View>
                </View>

                <View style={{
                    justifyContent: 'flex-end',
                    marginTop: 10,
                    width: 150,
                    marginRight: 16,
                    alignSelf: 'flex-end'
                }}>
                    <CustomeButtonB onPress={() => {

                        this.props.navigation.navigate('CoachGiveRewards', {
                            month: '6',
                            year: '2019',
                            batch_id: '1',//item.batch_id,
                            academy_id: '1'//item.academy_id
                        })

                    }}>Award Players </CustomeButtonB>
                </View>
            </View>

        </View>
    )



    render() {

        let data = this.state.dues

        if (this.props.data.loading && this.state.academies.length == []) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }


        return (

            <View style={{ flex: 1, padding: 16, backgroundColor: '#F7F7F7' }}>

                <View
                    style={{ justifyContent: 'center', alignItems: 'center', }} >

                    <RNPickerSelect style={{
                        width: '90%',
                    }}
                        placeholder={placeholder}
                        items={this.state.academies}
                        onValueChange={(value) => {
                            console.warn(value)
                            this.setState({
                                country: value,
                            });
                            this.fetchBatchByAcademy(value)
                        }}
                        style={pickerSelectStyles}
                        value={this.state.country}
                        useNativeAndroidPickerStyle={false}
                        ref={(el) => {
                            this.inputRefs.country = el;
                        }}
                    />


                    <View style={{
                        width: 220,
                        backgroundColor: '#A3A5AE',
                        height: 1
                    }}></View>

                </View>

                <FlatList
                    data={data}
                    renderItem={this._renderItem}
                />



            </View>);

    }
}

const mapStateToProps = state => {
    return {
        data: state.RewardReducer,
    };
};
const mapDispatchToProps = {
    getAcademyListing, getRewardDue
};
export default connect(mapStateToProps, mapDispatchToProps)(CoachRewardsPoints);


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        //paddingVertical: 12,
        //paddingHorizontal: 10,
        borderColor: '#D3D3D3',
        borderRadius: 4,
        color: 'black',
        width: 200,
        height: 40,
        marginBottom: 4,
        fontFamily: 'Quicksand-Regular',
        // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontFamily: 'Quicksand-Regular',
        borderColor: '#614051',
        borderRadius: 8,
        color: 'black',
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
    scene: {
        flex: 1,
    },
    regular_text_10: {
        fontSize: 10,
        color: '#A3A5AE',
        fontFamily: 'Quicksand-Regular'
    },
});

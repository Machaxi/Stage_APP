import React from 'react'

import { View, ScrollView, Text, StyleSheet, Modal, TouchableOpacity, Image, TextInput } from 'react-native'
import { CustomeCard } from '../../components/Home/Card'
import { SwitchButton, CustomeButtonB } from '../../components/Home/SwitchButton'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { getData, storeData } from "../../components/auth";
import { getAcademyListing, getPlayerRewardDue } from "../../redux/reducers/RewardReducer";
import { connect } from 'react-redux';

class ParentRewardComponent extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            following_diet: '',
            love_game: '',
            month: '',
            year: '',
            batch_id: '',
            parent_player_id: '',
            response: []
        }
        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            console.warn("userData.user", userData.user['id'])
            parent_player_id = userData.user['id']
            // getData('header', (value) => {

            //     this.props.getPlayerRewardDue(value, parent_player_id).then(() => {
            //         console.log(' getPlayerRewardDue response payload ' + JSON.stringify(this.props.data));
            //         // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
            //         let user = JSON.stringify(this.props.data.data);
            //         console.log(' user response payload 11' + user);
            //         let user1 = JSON.parse(user)
            //         if (user1.success) {
            //             this.setState({
            //                 response: user1.data.data
            //             })
            //             console.warn(JSON.stringify(user1.data.data))


            //             //     let array = user1.data['academies']
            //             //     let newArray = []
            //             //     for (let i = 0; i < array.length; i++) {
            //             //         let row = array[i];
            //             //         let obj = {
            //             //             label: row.academy_name,
            //             //             value: row.academy_id,
            //             //         }
            //             //         newArray[i] = obj
            //             //     }
            //             //     this.setState({
            //             //         academies: newArray
            //             //     })

            //         }

            //     }).catch((response) => {
            //         //handle form errors
            //         console.log(response);
            //     })

            // })



        });



    }

    componentDidMount() {
        console.warn("Jump => " + JSON.stringify(this.props.jumpTo))
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    saveData() {
        //     {
        //         "data" : {
        //                 "month": 6,
        //         "year": 2019,
        //         "batch_id":3,
        //         "reward_detail":{"loveForGame":200,"dietInTake":200},
        //         "player_id":2,
        //         "parent_player_id":12
        //         }
        // }

        let data = {};
        data["month"] = this.state.month
        data["year"] = this.state.year
        data["batch_id"] = this.state.batch_id
        data["player_id"] = this.state.player_id
        data["parent_player_id"] = this.state.parent_player_id
        let reward = { loveForGame: this.state.love_game, dietInTake: this.state.following_diet }
        data["reward_detail"] = reward
        let req = {}
        req['data'] = data
        console.warn(JSON.stringify(req))

    }

    render() {

        return (
            <ScrollView
                style={{ backgroundColor: '#F7F7F7' }}>
                <View>

                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={this.state.modalVisible}
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            //backgroundColor: '#0E0E0E',
                            //opacity: 0.56,
                            backgroundColor: 'rgba(52, 52, 52, 0.8)',
                            padding: 16
                        }}>
                            <View style={{
                                width: "100%",
                                margin: 16,
                                padding: 16,
                                borderRadius: 16,
                                backgroundColor: 'white',
                                height: 300,
                            }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={defaultStyle.bold_text_14}>Reward Points to Rahul </Text>
                                    <Image style={{ height: 30, width: 30, }} source={require('../../images/ic_close.png')}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ marginTop: 10, flexDirection: 'row', marginBottom: 20 }}>
                                        <View>
                                            <Text style={styles.regular_text_10}>Month</Text>
                                            <Text style={[defaultStyle.bold_text_14, { marginTop: 6 }]}>Oct 19</Text>
                                        </View>
                                        <View style={{ marginLeft: 20 }}>
                                            <Text style={styles.regular_text_10}>Available</Text>
                                            <Text style={[defaultStyle.regular_text_14, { marginTop: 10 }]}>500  pts</Text>
                                        </View>
                                    </View>
                                </View>

                                <Text
                                    style={defaultStyle.bold_text_14}>Reward Rahul for :</Text>

                                <View style={{
                                    flexDirection: 'row',
                                }}>

                                </View>

                                <View style={{
                                    flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 15,
                                    marginBottom: 18,
                                    fontSize: 10
                                }} >

                                    <TextInput style={styles.formInput}
                                        placeholder="Following Diet"
                                        onChangeText={(text) => this.setState({ following_diet: text })}
                                        value={this.state.text}
                                    ></TextInput>

                                    <TextInput style={[styles.formInput, { marginLeft: 20 }]}
                                        placeholder="Love for the game"
                                        placeholderTextColor='#A3A5AE'
                                        onChangeText={(text) => this.setState({ love_game: text })}
                                        value={this.state.text}
                                    ></TextInput>

                                </View>


                                <Text style={[defaultStyle.rounded_button, { marginTop: 16, width: "100%", marginLeft: 0, marginRight: 0 }]}
                                    onPress={() => {
                                        this.saveData()
                                        this.setModalVisible(false);
                                    }}>
                                    Reward</Text>

                            </View>

                        </View>
                    </Modal>

                    <CustomeCard>
                        <View style={{ margin: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={defaultStyle.regular_text_12}>Reward Points</Text>
                                <View
                                    style={{ backgroundColor: '#FF7373', marginRight: 10, marginLeft: 10, borderRadius: 5 }}>
                                    <Text style={{
                                        fontSize: 10,
                                        padding: 4,
                                        fontFamily: 'Quicksand-Regular',
                                        color: 'white',
                                        marginRight: 6,
                                        marginLeft: 6,
                                    }}>Due</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#DFDFDF', margin: 8 }} />


                        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>

                            <View style={{ margin: 10, flexDirection: 'row' }}>
                                <View>
                                    <Text style={styles.regular_text_10}>Month</Text>
                                    <Text style={[defaultStyle.bold_text_14, { marginTop: 6 }]}>Oct 19</Text>
                                </View>
                                <View style={{ marginLeft: 20 }}>
                                    <Text style={styles.regular_text_10}>Available</Text>
                                    <Text style={[defaultStyle.regular_text_14, { marginTop: 10 }]}>500  pts</Text>
                                </View>
                            </View>

                            <View style={{
                                flex: 1,
                                marginLeft: 50,
                                marginRight: 20,
                                marginTop: 10,
                                alignSelf: 'center'
                            }}>
                                <CustomeButtonB onPress={() => {
                                    this.setModalVisible(true);

                                }}>
                                    Reward </CustomeButtonB>
                            </View>
                        </View>

                    </CustomeCard>
                </View>
            </ScrollView >
        )

    }
}

const mapStateToProps = state => {
    return {
        data: state.RewardReducer,
    };
};
const mapDispatchToProps = {
    getPlayerRewardDue
};
export default connect(mapStateToProps, mapDispatchToProps)(ParentRewardComponent);


const styles = StyleSheet.create({
    labelText: {
        marginBottom: 5,
        color: '#A3A5AE',
        fontSize: 10,

        // backgroundColor: 'blue',
    },
    regular_text_10: {
        fontSize: 10,
        color: '#A3A5AE',
        fontFamily: 'Quicksand-Regular'
    },
    formInput: {
        backgroundColor: 'white',
        fontFamily: 'Quicksand-Regular',
        borderColor: '#A3A5AE',
        borderRadius: 4,
        fontSize: 14,
        borderWidth: 1,
        height: 40,
        width: '45%',
        color: '#A3A5AE',
    }
}
);
import React from 'react'

import { View, ScrollView, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Image, TextInput } from 'react-native'
import { CustomeCard } from '../../components/Home/Card'
import { SwitchButton, CustomeButtonB } from '../../components/Home/SwitchButton'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { getData, storeData } from "../../components/auth";
import { getAcademyListing, getPlayerRewardDue, saveParentRewardData } from "../../redux/reducers/RewardReducer";
import { connect } from 'react-redux';
import moment from 'moment'
import { Card } from 'react-native-paper';

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
            response: [],
            data: [],
            player_due: [],
            selected_item: null,
            alert: '',
            success_dialog: false,
            name: '',
            player_history: []
        }
        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            console.warn("userData.user", userData.user['id'])
            this.state.parent_player_id = userData.user['id']
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

        let obj = this.props.jumpTo//JSON.parse()
        console.warn(obj)
        let player_dues = obj.player_dues
        let player_history = obj.player_history
        let history_view = [];
        for (let i = 0; i < player_history.length; i++) {
            let obj = { ...player_history[i], expand: false }
            history_view[i] = obj
        }
        //console.warn("Jump => " + JSON.stringify(player_dues))

        this.setState({
            data: obj,
            player_due: player_dues,
            name: this.props.name,
            player_history: history_view
            ///player_due: obj.player_due
        })

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

        let following_diet = this.state.following_diet == '' ? 0 : this.state.following_diet
        let love_game = this.state.love_game == '' ? 0 : this.state.love_game

        // if (love_game + "".match(/[^\d]/) || following_diet + "".match(/[^\d]/)) {
        //     alert('Invalid character input')
        //     return
        // }
        
        let sum = +love_game + +following_diet
        console.warn('sum => ', sum)
        // if (following_diet == 0) {
        //     this.setState({
        //         alert: 'Following diet field is empty'
        //     })
        //     //alert('Following diet field is empty')
        // }


        if (love_game == 0 && following_diet == 0) {
            this.setState({
                alert: 'Reward fields is empty'
            })

            //alert('Love for the game field is empty')
        }
        else if (sum > 500) {
            this.setState({
                alert: 'Total points sum must be less than or equivalent to 500'
            })
        }
        else {

            this.setState({
                alert: ''
            })

            let item = this.state.selected_item
            let data = {};
            data["month"] = item.month
            data["year"] = item.year
            data["batch_id"] = item.id
            data["player_id"] = item.playerId
            data["parent_player_id"] = this.state.parent_player_id
            let reward = { loveForGame: love_game, dietInTake: following_diet }
            data["reward_detail"] = reward
            let req = {}
            req['data'] = data
            console.warn(JSON.stringify(req))

            getData('header', (value) => {

                this.props.saveParentRewardData(value, req).then(() => {

                    //console.warn('Res=> ' + JSON.stringify(this.props.data))
                    let data = this.props.data.data
                    if (data.success) {
                        this.setModalVisible(false);
                        this.setState({ success_dialog: true });
                    } else {
                        alert("Something went wrong.")
                    }
                }).catch((response) => {
                    console.log(response);

                })

            })


        }

    }

    _renderItem = ({ item }) => (
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
                        <Text style={[defaultStyle.bold_text_14, { marginTop: 6 }]}>
                            {moment.utc(item.month + " " + item.year, "MM YYYY").local()
                                .format("MMM YYYY")}

                        </Text>
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={styles.regular_text_10}>Available</Text>
                        <Text style={[defaultStyle.regular_text_14, { marginTop: 6 }]}>500  pts</Text>
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
                        this.setState({
                            selected_item: item,
                            month: item.month,
                            year: item.year
                        })
                        this.setModalVisible(true);

                    }}>
                        Reward </CustomeButtonB>
                </View>
            </View>

        </CustomeCard>
    );

    render() {

        let data = this.state.player_due
        data = this.filterRewards(data)


        let name = this.state.name
        let player_history = this.state.player_history
        let history_view = [];
        for (let i = 0; i < player_history.length; i++) {

            let obj = player_history[i]
            let coach = obj.COACH == undefined ? 0 : obj.COACH
            let family = obj.FAMILY == undefined ? 0 : obj.FAMILY

            let total = +coach + +family

            history_view.push(
                <View>
                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={() => {
                            obj.expand = !obj.expand
                            player_history[i] = obj
                            this.setState({
                                player_history: player_history
                            })
                            console.warn('player_history => ', JSON.stringify(player_history))
                        }}
                    >

                        <View style={{
                            padding: 12,
                            marginBottom: 8,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={[defaultStyle.regular_text_14, { width: '50%', color: "#707070" }]}>{moment.utc(obj.month, "MM").format("MMMM")}</Text>
                            <Text style={[defaultStyle.regular_text_14, { width: '45%', color: "#707070" }]}>{~~total}</Text>

                            {obj.expand ?
                                <Image
                                    resizeMode="contain"
                                    style={{
                                        width: 14,
                                        marginTop: 3,
                                        height: 10,
                                    }}
                                    source={require('../../images/up_arrow_reward.png')}
                                /> :
                                <Image
                                    resizeMode="contain"
                                    style={{
                                        width: 14,
                                        marginTop: 3,
                                        height: 10,
                                    }}
                                    source={require('../../images/down_arrow_reward.png')}
                                />}


                        </View>
                    </TouchableOpacity>

                    {obj.expand ?
                        <View style={{
                            backgroundColor: '#F8F8F8',
                            padding: 12,
                            flexDirection: 'row'
                        }}>

                            <View style={{ marginRight: 50 }}>
                                <Text style={[defaultStyle.bold_text_10, {}]}>Parents</Text>
                                <Text style={[defaultStyle.regular_text_14, { color: "#707070", marginTop: 2, }]}>{~~family} pts</Text>

                            </View>
                            <View style={{ marginRight: 70 }}>
                                <Text style={[defaultStyle.bold_text_10, {}]}>Coach</Text>
                                <Text style={[defaultStyle.regular_text_14, { color: "#707070", marginTop: 2, }]}>{~~coach} pts</Text>

                            </View>

                            <View style={{ marginRight: 50 }}>
                                <Text style={[defaultStyle.bold_text_10, {}]}>Total</Text>
                                <Text style={[defaultStyle.regular_text_14, { color: "#707070", marginTop: 2, }]}>{total} pts</Text>

                            </View>
                        </View>
                        : null}
                </View>)

        }

        const selected_item = this.state.selected_item
        console.log('selected_item => ', JSON.stringify(selected_item))

        return (
            <ScrollView
                style={{ backgroundColor: '#F7F7F7' }}>
                <View>

                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setState({
                                modalVisible: false
                            });
                        }}>
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
                                    <Text style={defaultStyle.bold_text_14}>Reward Points to {name} </Text>

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setModalVisible(false);
                                            this.setState({
                                                alert: ''
                                            })
                                        }}
                                    >

                                        <Image

                                            style={{ height: 30, width: 30, }} source={require('../../images/ic_close.png')}
                                        />
                                    </TouchableOpacity>

                                </View>

                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ marginTop: 10, flexDirection: 'row', marginBottom: 20 }}>
                                        <View>
                                            <Text style={styles.regular_text_10}>Month</Text>
                                            <Text style={[defaultStyle.bold_text_14, { marginTop: 6 }]}>
                                                {moment.utc(this.state.month + " " + this.state.year, "MM YYYY").local()
                                                    .format("MMM YYYY")}
                                            </Text>
                                        </View>
                                        <View style={{ marginLeft: 20 }}>
                                            <Text style={styles.regular_text_10}>Available</Text>
                                            <Text style={[defaultStyle.regular_text_14, { marginTop: 6 }]}>500  pts</Text>
                                        </View>
                                    </View>
                                </View>

                                <Text
                                    style={defaultStyle.bold_text_14}>Reward {name} for :</Text>

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
                                        keyboardType={'number-pad'}
                                        onChangeText={(text) => {
                                            if (!this.isNumbericOnly(text)) {
                                                this.setState({ following_diet: '' })
                                            } else
                                                this.setState({ following_diet: text })
                                        }}
                                        value={this.state.following_diet}
                                    ></TextInput>

                                    <TextInput style={[styles.formInput, { marginLeft: 20 }]}
                                        placeholder="Love for the game"
                                        keyboardType={'number-pad'}
                                        placeholderTextColor='#A3A5AE'
                                        onChangeText={(text) => {
                                            if (!this.isNumbericOnly(text)) {
                                                this.setState({ love_game: '' })
                                            } else
                                                this.setState({ love_game: text })
                                        }}
                                        value={this.state.love_game}
                                    ></TextInput>

                                </View>

                                {this.state.alert != '' ?
                                    <Text style={[defaultStyle.bold_text_14, { color: 'red' }]}>{this.state.alert}</Text>
                                    : null}




                                <Text style={[defaultStyle.rounded_button, {
                                    marginTop: 16, width: "100%",
                                    alignItems: 'center',
                                    marginLeft: 0, marginRight: 0
                                }]}
                                    onPress={() => {
                                        this.saveData()

                                    }}>
                                    Reward</Text>

                            </View>

                        </View>
                    </Modal>

                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={this.state.success_dialog}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
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
                                width: 300,
                                borderRadius: 16,
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 300,
                            }}>

                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: 'black',
                                        fontWeight: "400",
                                        fontFamily: 'Quicksand-Medium'
                                    }}
                                >Success</Text>

                                <Image
                                    style={{ marginTop: 16, height: 100, width: 100 }}
                                    source={require('../../images/success_icon.png')}
                                ></Image>

                                <Text
                                    style={{
                                        fontSize: 14,
                                        marginTop: 16,
                                        paddingLeft: 16,
                                        paddingRight: 16,
                                        color: 'black',
                                        fontWeight: "400",
                                        textAlign: 'center',
                                        fontFamily: 'Quicksand-Regular'
                                    }}
                                >Thank you ! Your rewards has been succesfully submitted.</Text>

                                <Text style={[styles.rounded_button, { marginTop: 16, width: 70 }]}
                                    onPress={() => {
                                        this.setState({ success_dialog: false });
                                        this.props.navigation.goBack(null);
                                    }}>
                                    OK</Text>

                            </View>

                        </View>
                    </Modal>


                    {/* {data.length == 0 ?
                        <View
                            style={{

                                alignSelf: 'center',
                                marginTop: 150,
                                justifyContent: 'center', flex: 1, alignItems: 'center'
                            }}
                        >

                            <Text style={[defaultStyle.regular_text_14, {
                                justifyContent: 'center',
                                flex: 1, textAlign: 'center',
                            }]}>No Dues found</Text></View>
                        :
                       } */}

                    <ScrollView>
                        <View>


                            <FlatList
                                data={data}
                                renderItem={this._renderItem}
                            />


                            <Card style={{
                                margin: 12,
                                borderRadius: 8
                            }}>

                                <View>

                                    <Text style={[defaultStyle.bold_text_12, {
                                        margin: 12
                                    }]}>Reward History</Text>
                                    <View style={{
                                        padding: 12,
                                        marginTop: 4,
                                        backgroundColor: '#F4F5FB',
                                        flexDirection: 'row'
                                    }}>
                                        <Text style={[defaultStyle.bold_text_10, { width: '50%', color: '#A3A5AE' }]}>Month</Text>
                                        <Text style={[defaultStyle.bold_text_10, { width: '50%', color: '#A3A5AE' }]}>Total Rewards gained</Text>
                                    </View>

                                    {history_view}

                                </View>
                            </Card>

                        </View>
                    </ScrollView>

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
    getPlayerRewardDue, saveParentRewardData
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
        color: '#404040',
    },
    rounded_button: {
        width: '90%',
        padding: 8,
        borderRadius: 20,
        //borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium'
    },
}
);
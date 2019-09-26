
import React from 'react'
import { View, ImageBackground, Text, StyleSheet, Image, Modal, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-paper'
import { getData } from "../../components/auth";
import { connect } from 'react-redux';
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { getAcademyListing, getRewardDue, getRewardMonthlyDue, saveRewardData } from "../../redux/reducers/RewardReducer";
import { TextInput } from 'react-native-gesture-handler';
import moment from 'moment'
import { SkyFilledButton } from '../../components/Home/SkyFilledButton'
import Events from '../../router/events';


class CoachGiveRewards extends BaseComponent {


    constructor(props) {
        super(props)
        this.state = {
            playerList: null,
            country: '',
            academies: [],
            coach_id: '',
            dues: null,
            academy_id: '',
            batch_id: '',
            month: '',
            year: '',
            batch_name: '',
            batch_category: '',
            total_player: 0,
            totalPointsAvailable: 0,
            modalVisible: false,
            remainingPointsAvailable: 0
        }

        this.state.batch_id = this.props.navigation.getParam('batch_id', '')
        this.state.month = this.props.navigation.getParam('month', '')
        this.state.year = this.props.navigation.getParam('year', '')
        this.state.academy_id = this.props.navigation.getParam('academy_id', '')

    }

    componentDidMount() {

        //api/rewards/batch-monthly-due?academy_id=1&batch_id=3&month=6&year=2019
        const { academy_id, batch_id, month, year } = this.state

        getData('userInfo', (value) => {
            console.warn('userinfo , ', value)
            let userData = JSON.parse(value)
            this.setState({
                coach_id: userData['coach_id']
            })
        })

        getData('header', (value) => {

            this.props.getRewardMonthlyDue(value, academy_id, batch_id, month, year).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.data);
                console.log(' getRewardMonthlyDue payload ' + user);
                let user1 = JSON.parse(user)
                if (user1.success) {
                    let players = user1.data.players
                    let batch = user1.data.batch

                    this.setState({

                        batch_name: batch.batch_name,
                        batch_category: batch.batch_category,
                        total_player: batch.total_players,
                        totalPointsAvailable: batch.totalPointsAvailable,
                        remainingPointsAvailable: batch.totalPointsAvailable
                    })

                    let newPlayerList = []
                    for (let i = 0; i < players.length; i++) {

                        let obj = players[i]
                        let newObj = { ...obj, input_score: 0 }
                        newPlayerList[i] = newObj
                    }
                    this.setState({
                        playerList: newPlayerList,
                    })
                }

            }).catch((response) => {
                //handle form errors
                console.log(response);
            })
        });
    }

    submitScore() {

        let total = this.state.totalPointsAvailable
        let remainingPointsAvailable = this.state.remainingPointsAvailable
        console.warn('remainingPointsAvailable = > ', remainingPointsAvailable)
        if (remainingPointsAvailable < 0) {

            alert('You can give total point equivalent to ' + Math.floor(total))

        } else {


            // "{
            //     ""data"" : {
            //         ""month"": 6,
            //         ""year"": 2019,
            //         ""batch_id"":3,
            //         ""coach_id"":2,
            //         ""rewards"":{""2"":""1000""}
            //     }
            // }"

            let data = {};
            data["month"] = this.state.month
            data["year"] = this.state.year
            data["batch_id"] = this.state.batch_id
            data["coach_id"] = this.state.coach_id

            const players = this.state.playerList
            let totalScore = 0
            let rewards = {}
            for (let i = 0; i < players.length; i++) {

                let reward = {}
                let player = players[i]
                let id = player.id
                let nId = id + ""
                let score = player.input_score
                reward[nId] = score
                //rewards[i] = reward
                //rewards = {...rewards,reward}
                rewards[nId] = score
                //console.log('rewards = ',JSON.stringify(rewards))
                totalScore = totalScore + player.input_score
            }
            data["rewards"] = rewards

            let req = {}
            req['data'] = data
            console.warn(JSON.stringify(req))



            getData('header', (value) => {

                this.props.saveRewardData(value, req).then(() => {

                    //console.warn('Res=> ' + JSON.stringify(this.props.data))
                    let data = this.props.data.data
                    if (data.success) {
                        this.setState({
                            modalVisible: true
                        })
                    } else {
                        alert("Something went wrong.")
                    }
                }).catch((response) => {
                    console.log(response);
                    this.setState({
                        spinner: false
                    })
                })

            })
        }
    }

    fetchBatchByAcademy(academy_id) {

        let coach_id = this.state.coach_id

        getData('header', (value) => {

            console.log("header", value);
            this.props.getRewardDue(value, academy_id, coach_id).then(() => {

                console.log(' getRewardDue response payload ' + JSON.stringify(this.props.data.data));
                let data = JSON.stringify(this.props.data.data);
                let user1 = JSON.parse(data)
                if (user1.success) {
                    let dues = user1.data['dues']
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

    _renderHeaderItem = ({ item }) => (
        <View style={{
            padding: 16,
            flexDirection: 'row',
            backgroundColor: '#F4F5FB'
        }}>
            <Text style={[defaultStyle.bold_text_12, { color: '#A3A5AE', width: '60%' }]}>Player</Text>
            <Text style={[defaultStyle.bold_text_12, { color: '#A3A5AE', width: '40%' }]}>Total reward points</Text>
        </View>
    )

    subtractRewardPoints = (points) => {


        const players = this.state.playerList
        let totalScore = 0
        for (let i = 0; i < players.length; i++) {
            let player = players[i]
            totalScore = +totalScore + +player.input_score
        }
        console.log('players ', JSON.stringify(players))
        console.warn('total => ', totalScore)

        let total = this.state.totalPointsAvailable
        total = total - totalScore
        this.setState({
            remainingPointsAvailable: total
        })
        // if (points) {
        //     this.setState({ remainingPointsAvailable: this.state.totalPointsAvailable - points });
        // }
        // else {
        //     this.setState({ remainingPointsAvailable: this.state.totalPointsAvailable });
        // }
    }

    _renderItem = ({ item, index }) => (

        <View style={{
            padding: 16,
            flexDirection: 'row',
            backgroundColor: 'white'
        }}>
            <Text style={[defaultStyle.bold_text_14, { width: '60%' }]}>{item.name}</Text>
            <TextInput
                placeholder={"Enter Score"}
                keyboardType={'number-pad'}
                style={{
                    textAlign: 'center',
                    color: '#404040',
                    width: 100, height: 36,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#CECECE'
                }}
                onChangeText={(text) => {
                    item.input_score = text
                    // const NON_DIGIT = '/[^\d]/g';
                    // const intValue = parseInt(text.toString().replace(NON_DIGIT, ''));
                    // item.input_score = intValue
                    // //alert(intValue)
                    // const playerList = this.state.playerList
                    // playerList[index] = {...item}
                    // console.log('oNChangeText => ',JSON.stringify(playerList))
                    // this.setState({
                    //     playerList: [...playerList]
                    // })

                    this.subtractRewardPoints(text)
                }}

            >{item.input_score}</TextInput>
        </View>
    );

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }


    render() {

        let data = this.state.playerList
        if (data != null)
            console.warn('list == ' + data.length)

        if (this.props.data.loading && this.state.playerList == null) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        return (

            <View style={{
                flex: 1
            }}>

                <ScrollView style={{

                }}>

                    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>

                        <Modal
                            animationType="none"
                            transparent={true}
                            visible={this.state.modalVisible}
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
                                            color: 'black',
                                            fontWeight: "400",
                                            textAlign: 'center',
                                            fontFamily: 'Quicksand-Regular'
                                        }}
                                    >Thank you ! Your rewards has been succesfully submitted.</Text>

                                    <Text style={[styles.rounded_button, { marginTop: 16, width: 70 }]}
                                        onPress={() => {
                                            this.setModalVisible(false);
                                            Events.publish('REFRESH_REWARDS');
                                            setTimeout(() => {
                                                this.props.navigation.goBack(null);
                                            }, 100)

                                        }}>
                                        OK</Text>

                                </View>

                            </View>
                        </Modal>



                        <View
                            style={{
                                backgroundColor: 'white',
                                padding: 20,
                            }}>

                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <View
                                    style={{
                                        width: "60%"
                                    }}>
                                    <Text style={styles.regular_text_10}>Batch Name</Text>
                                    <Text style={[defaultStyle.regular_text_14, { marginTop: 6 }]}>{this.state.batch_name}</Text>
                                </View>
                                <View
                                    style={{
                                        width: "40%",

                                    }}>
                                    <Text style={styles.regular_text_10}>Total reward points</Text>
                                    <Text style={[defaultStyle.regular_text_14, { marginTop: 10 }]}>{Math.floor(this.state.totalPointsAvailable)}</Text>
                                </View>

                            </View>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 16
                            }}>
                                <View
                                    style={{
                                        width: "60%"
                                    }}>
                                    <Text style={styles.regular_text_10}>Total players</Text>
                                    <Text style={[defaultStyle.regular_text_14, { marginTop: 6 }]}>{this.state.total_player}</Text>
                                </View>
                                <View
                                    style={{
                                        width: "40%"
                                    }}>
                                    <Text style={styles.regular_text_10}>Month</Text>
                                    <Text style={[defaultStyle.regular_text_14, { marginTop: 10 }]}>
                                        {/* {this.state.month + "/" + this.state.year} */}
                                        {moment.utc(this.state.month + " " + this.state.year, "MM YYYY").local()
                                            .format("MMM YYYY")}
                                    </Text>
                                </View>

                            </View>
                        </View>

                        <View>

                            <FlatList
                                data={data}
                                extraData={data}
                                ListHeaderComponent={this._renderHeaderItem}
                                renderItem={this._renderItem}
                            />


                        </View>



                    </View>
                </ScrollView>

                <Card
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        elevation: 8,
                        height: 100
                    }}
                >
                    <Text style={[defaultStyle.bold_text_14, { marginTop: 8 }]}>{Math.floor(this.state.remainingPointsAvailable)} pts remaining</Text>
                    <View style={{
                        margin: 16,
                        flex: 1
                    }}>
                        {/* <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => {
                                this.submitScore()
                            }}
                        >

                            <Text
                                style={styles.rounded_button}
                            >Award</Text>
                        </TouchableOpacity> */}
                        <SkyFilledButton
                            onPress={() => {
                                this.submitScore()
                            }}
                        >Award</SkyFilledButton>

                    </View>

                </Card>
            </View>


        );

    }
}

const mapStateToProps = state => {
    return {
        data: state.RewardReducer,
    };
};
const mapDispatchToProps = {
    getAcademyListing, getRewardDue, getRewardMonthlyDue, saveRewardData
};
export default connect(mapStateToProps, mapDispatchToProps)(CoachGiveRewards);


const styles = StyleSheet.create({
    navBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'blue',
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

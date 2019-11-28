import React from 'react'

import { View, Text, ActivityIndicator, Image, Modal, TextInput,Alert } from 'react-native'
import BaseComponent, { defaultStyle, ImageBackground, formattedName } from '../BaseComponent';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { CustomeButtonB, SwitchButton, } from '../../components/Home/SwitchButton'
import { getMatchScore, updateMatchScore, skipSet, giveBye } from "../../redux/reducers/TournamentScorer";
import { connect } from 'react-redux';
import { getData } from "../../components/auth";
import { SkyFilledButton, SkyBorderButton } from '../../components/Home/SkyFilledButton'
import EditScore from './EditScore';

class TournamentScorer extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            match_scores: null,
            winner: null,
            player1: null,
            player2: null,
            current_set: null,
            currentIndex: -1,
            match_id: '',
            header: '',
            score_call: false, //protect unuseful of progress loader
            start_card_show: false,
            is_shown: false,
            modalVisible: false,
            edit_index: -1,
            edit_instance: null,
            is_show: false,
            disable_increasement_p1: false,
            disable_increasement_p2: false

        }

        this.state.match_id = this.props.navigation.getParam('match_id', '')

    }

    componentDidMount() {
        const { match_id } = this.state
        getData('header', (value) => {
            this.state.header = value
            this.props.getMatchScore(value, match_id).then(() => {
                let data = this.props.data.data
                console.log(' getMatchScore ' + JSON.stringify(data));
                let success = data.success
                if (success) {

                    if (data.data.player1 && data.data.player2) {

                        this.setState({
                            match_scores: data.data.match_scores,
                            player1: data.data.player1,
                            player2: data.data.player2,
                            winner: data.data.winner
                        })

                        console.log('player => ', JSON.stringify(this.state.player1))
                    }else{
                        Alert.alert(
                            '',
                            'No Players detail found.',
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        this.props.navigation.goBack()
                                    }
                                },
                            ],
                            { cancelable: false },
                        );
                    }


                }

            }).catch((response) => {
                console.log(response);
            })
        })
    }

    setModalVisible(visible, index=-1) {
        console.log('index is', index)
        this.setState({ modalVisible: visible, currentIndex: index });
    }

    updateScore(isPlayer1, deduct) {
        let currentIndex = this.state.currentIndex
        let match_scores = this.state.match_scores
        let currentSet = match_scores[currentIndex]
        let playerScore = ''

        if (deduct == false) {

            if (isPlayer1) {
                playerScore = currentSet.player1_score
                currentSet.player1_score = currentSet.player1_score + 1
            } else {
                playerScore = currentSet.player2_score
                currentSet.player2_score = currentSet.player2_score + 1
            }

        }
        else {
            if (isPlayer1) {
                playerScore = currentSet.player1_score
                currentSet.player1_score = currentSet.player1_score - 1
                if (currentSet.player1_score < 0) {
                    currentSet.player1_score = 0
                }
            } else {
                playerScore = currentSet.player2_score
                currentSet.player2_score = currentSet.player2_score - 1
                if (currentSet.player2_score < 0) {
                    currentSet.player2_score = 0
                }
            }
        }

        match_scores[currentIndex] = currentSet


        // if (playerScore > 21) {
        //     if (isPlayer1) {
        //         this.setState({
        //             disable_increasement_p1: true
        //         })
        //     } else {
        //         this.setState({
        //             disable_increasement_p2: true
        //         })
        //     }

        //     return
        // }

        this.setState({
            // match_scores: match_scores,
            score_call: true
        })

        //================ API CALL========================
        this.submit(match_scores)
        //========================END =================================
    }

    editScore(previousRound, winner_id) {
        console.log('winner is', this.state);
        if(winner_id !== null){
            this.declareWinner(winner_id)
        } else{
            let match_scores = this.state.match_scores
            console.log('After Update => ', JSON.stringify(match_scores))
            this.submit(match_scores)
        }
    }

    submit(match_scores) {
        let match_id = this.state.match_id
        let subData = {}
        subData['match_scores'] = match_scores
        subData['match_id'] = match_id

        let data = {}
        data['data'] = subData
        console.log('MatchScore => ', JSON.stringify(data))

        let header = this.state.header
        this.props.updateMatchScore(header, data).then(() => {
            let data = this.props.data.data
            console.log(' updateMatchScore ' + JSON.stringify(data));

            let success = data.success
            if (success) {

                if (data.data.player1 == null || data.data.player2 == null) {
                    alert('Player detail not found')
                }
                else {
                    this.setState({
                        match_scores: data.data.match_scores,
                        player1: data.data.player1,
                        player2: data.data.player2,
                        winner: data.data.winner
                    })
                }


            }

        }).catch((response) => {
            console.log(response);
        })
    }

    giveBye(bye_to) {
        let match_id = this.state.match_id
        let subData = {}
        subData['bye_to'] = bye_to
        subData['match_id'] = match_id

        let data = {}
        data['data'] = subData
        console.log('giveBye => ', JSON.stringify(data))
        let header = this.state.header
        this.props.giveBye(header, data).then(() => {
            let data = this.props.data.data
            console.log(' giveBye ' + JSON.stringify(data));

            let success = data.success
            if (success) {

                if (data.data.player1 == null || data.data.player2 == null) {
                    alert('Player detail not found')
                }
                else {
                    this.setState({
                        winner: data.data.winner,
                        match_scores: data.data.match_scores,
                        player1: data.data.player1,
                        player2: data.data.player2,
                    })
                }


            }

        }).catch((response) => {
            console.log(response);
        })
    }

    skipSet() {
        let match_scores = this.state.match_scores
        let match_id = this.state.match_id
        let subData = {}
        subData['match_scores'] = match_scores
        subData['match_id'] = match_id

        let data = {}
        data['data'] = subData
        console.log('MatchScore => ', JSON.stringify(data))

        let header = this.state.header
        this.props.skipSet(header, data).then(() => {
            let data = this.props.data.data
            console.log(' skipSet ' + JSON.stringify(data));

            let success = data.success
            if (success) {

                if (data.data.player1 == null || data.data.player2 == null) {
                    alert('Player detail not found')
                }
                else {
                    this.setState({
                        winner: data.data.winner,
                        match_scores: data.data.match_scores,
                        player1: data.data.player1,
                        player2: data.data.player2,

                    })
                }


            }

        }).catch((response) => {
            console.log(response);
        })
    }

    declareWinner(winner_id){
        const {currentIndex} = this.state;
        let match_scores = this.state.match_scores
        match_scores[currentIndex]['winner_id'] = winner_id
        console.log('After Update => ', JSON.stringify(match_scores))
        this.submit(match_scores)
    }
    render() {
        if (!this.state.score_call &&
            (this.props.data.loading || this.state.match_scores == null || this.state.player1 == null)) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        let player1 = this.state.player1
        let player2 = this.state.player2
        let match_scores = this.state.match_scores
        let start_card_show = this.state.start_card_show
        let is_shown = this.state.is_shown
        let currentRound = null
        let previousRound = null;
        const winner = this.state.winner

        let is_tournament_completed = true;
        console.warn('winner=>', JSON.stringify(winner))
        if (winner == null) {
            for (let i = match_scores.length - 1; i >= 0; i--) {
                let obj = match_scores[i]
                if (!obj.winner_id) {
                    is_tournament_completed = false
                }
            }

        } else {
            is_tournament_completed = true;
        }

        let finalWinner = null

        if (!is_tournament_completed) {

            let currentMatchIndex = -1;
            for (let i = match_scores.length - 1; i >= 0; i--) {
                let obj = match_scores[i]
                if (obj.winner_id) {
                    console.log('winner => ', (i + 1))
                    if ((i + 1) < match_scores.length)
                        currentMatchIndex = i + 1
                    break
                }
            }

            if (currentMatchIndex == -1) {
                currentMatchIndex = 0
            }
            this.state.currentIndex = currentMatchIndex

            match_scores[currentMatchIndex]['active'] = true
            console.log('currentMatchIndex => ', JSON.stringify(match_scores))


            currentRound = match_scores[currentMatchIndex]

            //show completed card condition
            if (currentMatchIndex != 0 && !is_shown) {
                previousRound = match_scores[currentMatchIndex - 1]
                if (currentRound.player1_score == 0 && currentRound.player2_score == 0) {
                    start_card_show = true;
                }
            } else {
                start_card_show = false
            }
            console.log('previousRound => ', JSON.stringify(previousRound))


            if (is_shown && (currentRound.player1_score > 0 || currentRound.player2_score > 0)) {
                this.setState({
                    is_shown: false
                })
            }

        } else {

            start_card_show = false
            let count_player_1 = 0
            let count_player_2 = 0

            for (let i = 0; i < match_scores.length; i++) {
                let obj = match_scores[i]
                if (obj.winner_id == player1.id) {
                    count_player_1 = count_player_1 + 1
                } else {
                    count_player_2 = count_player_2 + 1
                }
            }
            if (count_player_1 > count_player_2) {
                finalWinner = player1
            } else {
                finalWinner = player2
            }

            if (winner != null)
                finalWinner = winner

        }
        let edit_instance = this.state.edit_instance

        //console.warn('previous ', JSON.stringify(previousRound))

        ///start_card_show = true

        //////////////////////////////////

        let match_array = []
        match_scores.map((element, index) => {


            let bgcolor = '#ffffff'
            let justifyContent = 'center'
            let color = '#A3A5AE'

            if (element.active) {
                bgcolor = '#667DDB'
                color = 'white'
            }

            if (element.winner_id) {
                justifyContent = 'space-between'
            }

            match_array.push(
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 180,
                }}>


                    <TouchableOpacity
                        onPress={() => {
                        }}
                    >
                        <View
                            resizeMode="contain"
                            style={{
                                width: 10,
                                height: 10,
                                marginTop: 8,
                                marginLeft: 8, marginRight: 8
                            }}>

                        </View>
                    </TouchableOpacity>

                    <View style={{

                        flexDirection: 'row',
                        justifyContent: justifyContent,
                        alignItems: 'center',
                        marginTop: 12,
                        paddingTop: 4,
                        paddingBottom: 4,
                        paddingLeft: 8,
                        paddingRight: 8,
                        elevation: 2,
                        width: 130,
                        borderRadius: 8,
                        backgroundColor: bgcolor
                    }}>


                        {element.winner_id ?
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>

                                <Image
                                    resizeMode="contain"
                                    style={{
                                        width: 9,
                                        height: 12,
                                        marginTop: 2,
                                        marginRight: 4,
                                    }}
                                    source={element.winner_id == player1.id ?
                                        require('../../images/winner_badge.png') : null}
                                />
                                <Text
                                    style={defaultStyle.bold_text_14}>
                                    {element.player1_score}
                                </Text>
                            </View>
                            : null}

                        <Text
                            style={{
                                fontSize: 14,
                                color: color,
                                fontFamily: 'Quicksand-Regular',
                            }}>Set {element.round}</Text>

                        {element.winner_id ?
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>


                                <Text
                                    style={defaultStyle.bold_text_14}>
                                    {element.player2_score}
                                </Text>
                                <Image
                                    resizeMode="contain"
                                    style={{
                                        width: 9,
                                        height: 12,
                                        marginTop: 2,
                                        marginLeft: 4,
                                    }}
                                    source={element.winner_id == player2.id ?
                                        require('../../images/winner_badge.png') : null}
                                />
                            </View>
                            : null}

                    </View>

                    {start_card_show && previousRound != null && previousRound.round ==
                        element.round ?
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    // edit_instance: this.state.match_scores[index],
                                    edit_index: index,
                                },
                                this.setModalVisible(true, index)
                                )}
                            }
                        >

                            <Image
                                resizeMode="contain"
                                style={{
                                    width: 10,
                                    height: 10,
                                    marginTop: 8,
                                    marginLeft: 16, marginRight: 8
                                }}
                                source={
                                    require('../../images/edit_profile.png')}
                            />
                        </TouchableOpacity>
                        : null
                    }
                    {is_tournament_completed ?
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    edit_instance: this.state.match_scores[index],
                                    edit_index: index,

                                },
                                    this.setModalVisible(true, index))
                                setTimeout(() => {
                                    console.warn('Element-> ', index)
                                    console.warn('Element->direct', JSON.stringify(this.state.match_scores[index]))
                                    console.warn('Element->edit_instance', JSON.stringify(this.state.edit_instance))

                                }, 500)

                                //this.state.modalVisible = true
                                // this.setModalVisible(true)
                            }}
                        >

                            <Image
                                resizeMode="contain"
                                style={{
                                    width: 10,
                                    height: 10,
                                    marginTop: 8,
                                    marginLeft: 16, marginRight: 8
                                }}
                                source={
                                    require('../../images/edit_profile.png')}
                            />
                        </TouchableOpacity>
                        : null
                    }

                </View>
            )
        })



        return (

            <ScrollView>

                <View style={{
                    position: 'absolute',
                    height: "100%",
                    justifyContent: 'center',
                    alignItems: 'center',
                    selfAlign: 'center',
                    alignContent: 'center',
                    width: "100%",
                }}>


                    <View style={{
                        height: "100%",
                        width: 3,
                        backgroundColor: '#C4C4C4'
                    }}></View>
                </View>

                <View style={{ padding: 16, }}>

                    <View style={{

                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>

                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center'
                            }}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    textAlign: 'center',
                                    color: 'black',
                                    fontSize: 17,
                                    fontFamily: 'Quicksand-Medium'
                                }}
                            >{formattedName(player1.name)}</Text>


                            <View
                                style={{
                                    marginTop: 20,
                                    position: 'relative'
                                }}>

                                <Image
                                    resizeMode="contain"
                                    source={{ uri: player1.profile_pic }}
                                    style={{ width: 130, height: 180 }}
                                />

                                {finalWinner != null && finalWinner.id != player1.id
                                    ?
                                    <View style={{
                                        width: 130, height: 180,
                                        backgroundColor: '#88a5a5a5',
                                        position: 'absolute'
                                    }}>
                                    </View> : null
                                }


                            </View>

                            {finalWinner == null ?
                                <TouchableOpacity
                                    onPress={() => {
                                        this.giveBye(player1.id)
                                    }}
                                >

                                    <Text
                                        style={{
                                            color: '#667DDB',
                                            fontSize: 10,
                                            marginTop: 20,
                                            fontFamily: 'Quicksand-Regular'
                                        }}
                                    >Give bye</Text>
                                </TouchableOpacity>
                                : null
                            }



                        </View>

                        <View>

                            <View
                                style={{ flex: 1 }}
                            >

                            </View>

                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 40 / 2,
                                    marginBottom: 10,
                                    alignItems: 'center',
                                    backgroundColor: "#D2D2D2",
                                    justifyContent: 'center'
                                }}>



                                <Text style={{
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    fontSize: 17,
                                    fontFamily: 'Quicksand-Medium',
                                    color: 'white'

                                }}>VS</Text>

                            </View>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center'
                            }}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    textAlign: 'center',
                                    color: 'black',
                                    fontSize: 17,
                                    fontWeight: "400",
                                    fontFamily: 'Quicksand-Medium'
                                }}
                            >{formattedName(player2.name)}</Text>

                            <View
                                style={{
                                    marginTop: 20,
                                    position: 'relative'
                                }}>
                                <Image
                                    resizeMode="contain"
                                    source={{ uri: player2.profile_pic }}
                                    style={{ width: 130, height: 180 }}

                                />

                                {finalWinner != null && finalWinner.id != player2.id
                                    ?
                                    <View style={{
                                        width: 130, height: 180,
                                        backgroundColor: '#88a5a5a5',
                                        position: 'absolute'
                                    }}>
                                    </View> : null
                                }
                            </View>

                            {finalWinner == null ?
                                <TouchableOpacity
                                    onPress={() => {
                                        this.giveBye(player2.id)
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#667DDB',
                                            fontSize: 10,
                                            marginTop: 20,
                                            fontFamily: 'Quicksand-Regular'
                                        }}
                                    >Give bye</Text>
                                </TouchableOpacity> : null}


                        </View>
                    </View>

                    <View style={{

                    }}>


                        {!is_tournament_completed ?
                            <View>

                                <View style={{
                                    flex: 1,
                                    marginTop: 10,
                                    alignContent: 'center',
                                    alignItems: 'center',
                                }}>

                                    {match_array}

                                </View>

                                {start_card_show && previousRound != null
                                    ?
                                    <Card style={{
                                        elevation: 4,
                                        margin: 16,
                                    }}>
                                        <View style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: 12,
                                        }}>

                                            <Text style={defaultStyle.bold_text_14}>Set {previousRound.round}</Text>
                                            <Text style={[defaultStyle.heavy_bold_text_14, { marginTop: 10 }]}>
                                                {previousRound.winner_id == player1.id ?
                                                    player1.name : player2.name} Won !</Text>
                                            <Text style={[defaultStyle.heavy_bold_text_14,
                                            { marginTop: 12 }]}>
                                                {previousRound.player1_score} - {previousRound.player2_score}</Text>

                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                marginTop: 20,
                                                //flex: 2
                                            }}>


                                                <View style={{
                                                    flex: 1,
                                                    width: 120,
                                                    marginRight: 8,
                                                    alignItems: 'center',
                                                }}>

                                                    <SkyBorderButton
                                                        onPress={() => {
                                                            this.skipSet()
                                                        }}
                                                    >Skip Set</SkyBorderButton>

                                                </View>

                                                <View style={{
                                                    flex: 1,
                                                    width: 120,
                                                    marginLeft: 8,
                                                    alignItems: 'center',

                                                }}>

                                                    {/* <SkyFilledButton
                                                        onPress={() => {
                                                            this.setState({
                                                                start_card_show: false,
                                                                is_shown: true
                                                            })
                                                        }}
                                                    >Start Set !</SkyFilledButton> */}
                                                    <TouchableOpacity activeOpacity={.8}
                                                        style={[style.rounded_button1, {
                                                            width: 120,
                                                            // width: "100%",
                                                        }]}
                                                        onPress={() => {
                                                            this.setState({
                                                                start_card_show: false,
                                                                is_shown: true
                                                            })
                                                        }}>
                                                        <Text
                                                            style={{
                                                                color: 'white',
                                                                textAlign: 'center',
                                                                fontFamily: 'Quicksand-Medium',
                                                            }}>
                                                            Start Set !
                                                        </Text>
                                                    </TouchableOpacity>

                                                </View>
                                            </View>
                                        </View>
                                    </Card>
                                    :

                                    <View>
                                        <View style={{
                                            marginTop: 30,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignContent: 'center'
                                        }}>

                                            <View style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                alignContent: 'center'
                                            }}>


                                                <View
                                                    style={{
                                                        flex: 1,
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'

                                                    }}>

                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            this.updateScore(true, true)
                                                        }}
                                                    >

                                                        <Image
                                                            source={require('../../images/ic_minus.png')}
                                                            style={{
                                                                width: 30,
                                                                height: 30,
                                                                marginTop: 5,
                                                            }}
                                                        />

                                                    </TouchableOpacity>

                                                    <Text
                                                        style={{
                                                            width: 56,
                                                            textAlign: 'center',
                                                            color: '#404040',
                                                            fontSize: 46,
                                                            marginLeft: 8,
                                                            fontFamily: 'Quicksand-Medium'
                                                        }}>{currentRound.player1_score}</Text>

                                                    <TouchableOpacity
                                                        activeOpacity={.8}
                                                        onPress={() => {
                                                            //true means player1
                                                            if (!this.state.disable_increasement_p1)
                                                                this.updateScore(true, false)
                                                        }}>
                                                        <Image
                                                            source={require('../../images/ic_plus.png')}
                                                            style={{ width: 48, height: 48 }}

                                                        />
                                                    </TouchableOpacity>
                                                </View>


                                                {/* <View style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    alignContent: 'center',
                                                    marginLeft: 40,
                                                }}>
                                                    <TouchableOpacity
                                                        activeOpacity={.8}
                                                        onPress={() => {
                                                            //true means player1
                                                            if (!this.state.disable_increasement_p1)
                                                                this.updateScore(true, false)
                                                        }}>
                                                        <Image
                                                            source={require('../../images/ic_plus.png')}
                                                            style={{ width: 48, height: 48 }}

                                                        />
                                                    </TouchableOpacity>
                                                </View> */}

                                                <View
                                                    style={{
                                                        flex: 1,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        alignContent: 'center',
                                                        marginTop: 5,
                                                    }}
                                                >
                                                    <CustomeButtonB onPress={
                                                        () => this.declareWinner(player1.id)}
                                                    >Declare Winner</CustomeButtonB>
                                                </View>
                                            </View>

                                            <View style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                alignContent: 'center'
                                            }}>

                                                <View
                                                    style={{
                                                        flex: 1,
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'

                                                    }}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            this.updateScore(false, true)
                                                        }}
                                                    >
                                                        <Image
                                                            source={require('../../images/ic_minus.png')}
                                                            style={{
                                                                width: 30,
                                                                height: 30,
                                                                marginTop: 5,
                                                            }}
                                                        />
                                                    </TouchableOpacity>
                                                    <Text
                                                        style={{
                                                            textAlign: 'center',
                                                            color: '#404040',
                                                            fontSize: 46,
                                                            width: 56,
                                                            marginLeft: 8,
                                                            fontFamily: 'Quicksand-Medium'
                                                        }}>{currentRound.player2_score}</Text>
                                                    
                                                    <TouchableOpacity
                                                        activeOpacity={.8}
                                                        onPress={() => {
                                                            //false means player2
                                                            if (!this.state.disable_increasement_p2)
                                                                this.updateScore(false, false)
                                                        }}>
                                                        <Image
                                                            source={require('../../images/ic_plus.png')}
                                                            style={{ width: 43, height: 43 }}

                                                        />
                                                    </TouchableOpacity>
                                                </View>


                                                {/* <View style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    alignContent: 'center',
                                                    marginLeft: 40,
                                                }}>
                                                    <TouchableOpacity
                                                        activeOpacity={.8}
                                                        onPress={() => {
                                                            //false means player2
                                                            if (!this.state.disable_increasement_p2)
                                                                this.updateScore(false, false)
                                                        }}>
                                                        <Image
                                                            source={require('../../images/ic_plus.png')}
                                                            style={{ width: 43, height: 43 }}

                                                        />
                                                    </TouchableOpacity>
                                                </View> */}

                                                <View
                                                    style={{
                                                        flex: 1,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        alignContent: 'center',
                                                        marginTop: 5,
                                                    }}
                                                >
                                                    <CustomeButtonB onPress={
                                                        () => this.declareWinner(player2.id)}
                                                    >Declare Winner</CustomeButtonB>
                                                </View>
                                            </View>

                                        </View>

                                        {/* <View style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: 20,
                                        }}>

                                            <TouchableOpacity activeOpacity={.8}
                                                style={style.rounded_button}
                                                onPress={() => {

                                                }}>
                                                <Text style={style.rounded_button_text}>Save</Text>
                                            </TouchableOpacity>

                                        </View> */}
                                    </View>}
                            </View> :

                            <View>
                                <Card style={{
                                    elevation: 4,
                                    margin: 16,
                                }}>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 12,
                                    }}>

                                        <Text style={defaultStyle.bold_text_14}>Game over</Text>
                                        <Text style={[defaultStyle.heavy_bold_text_14, { marginTop: 10 }]}>
                                            {finalWinner.name} Won !</Text>

                                        {match_array}

                                        <View style={{
                                            flex: 1,
                                            width: 150,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: 20,
                                        }}>

                                            <TouchableOpacity activeOpacity={.8}
                                                style={[style.rounded_button1, {
                                                    width: 120,
                                                    alignItems: 'center'
                                                    // width: "100%",
                                                }]}
                                                onPress={() => {
                                                    this.props.navigation.goBack()
                                                }}>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        textAlign: 'center',
                                                        fontFamily: 'Quicksand-Medium',
                                                    }}>
                                                    Finish
                                                        </Text>
                                            </TouchableOpacity>
                                            {/* <SkyFilledButton
                                                onPress={() => {
                                                    this.props.navigation.goBack()
                                                }}
                                            >Finish</SkyFilledButton> */}


                                        </View>

                                    </View>
                                </Card>
                            </View>
                        }
                    </View>

                    {previousRound != null || this.state.edit_index != -1 ?
                        <EditScore
                            touchOutside={(round = null, winner_id = null) => {
                                this.state.modalVisible = false
                                this.setState({
                                    modalVisible: false
                                })
                                if (round == null)
                                    return

                                setTimeout(() => {
                                    this.editScore(round, winner_id)
                                }, 100)
                            }}
                            edit_index={this.state.edit_index}
                            match_score={this.state.match_scores}
                            player1={player1}
                            player2={player2}
                            previousRound={is_tournament_completed == true ?
                                edit_instance : previousRound}
                            visible={this.state.modalVisible}
                        />
                        : null}

                </View >

            </ScrollView >

        );
    }

}

const mapStateToProps = state => {
    return {
        data: state.TournamentScorerReducer,
    };
};
const mapDispatchToProps = {
    getMatchScore, updateMatchScore, skipSet, giveBye
};
export default connect(mapStateToProps, mapDispatchToProps)(TournamentScorer);



const style = {

    rounded_button: {
        width: 100,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
    },
    rounded_button_text: {
        padding: 10,
        color: '#A3A5AE',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium'
    },
    rounded_button1: {
        //width:'100%',
        // padding: 10,
        // flexShrink: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // borderRadius: 20,
        // //borderWidth: 1,
        // marginLeft: 4,
        // marginRight: 4,
        // borderColor: '#67BAF5',
        // backgroundColor: '#67BAF5',
        padding: 10,
        backgroundColor: '#67BAF5',
        height: 42,
        borderRadius: 23,

    },
    declare_winner: {
        borderRadius: 20,
        color: '#A3A5AE',
        fontFamily: 'Quicksand-Medium',
        padding: 10,
        backgroundColor: '#E0E0E0',
    }
}
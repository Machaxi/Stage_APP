import React from 'react'

import { View, Text, Image } from 'react-native'
import BaseComponent, { defaultStyle, ImageBackground } from '../BaseComponent';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Card, ActivityIndicator, } from 'react-native-paper';
import { CustomeButtonB, SwitchButton, } from '../../components/Home/SwitchButton'
import { getMatchScore, updateMatchScore } from "../../redux/reducers/TournamentScorer";
import { connect } from 'react-redux';
import { getData } from "../../components/auth";
import { SkyFilledButton } from '../../components/Home/SkyFilledButton'

class TournamentScorer extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            match_scores: null,
            player1: null,
            player2: null,
            current_set: null,
            currentIndex: -1,
            match_id: '28',
            header: '',
            score_call: false, //protect unuseful of progress loader
            start_card_show: false,
            is_shown: false
        }

    }

    componentDidMount() {

        let match_id = this.state.match_id

        getData('header', (value) => {

            this.state.header = value
            this.props.getMatchScore(value, match_id).then(() => {
                let data = this.props.data.data
                console.log(' getMatchScore ' + JSON.stringify(data));

                let success = data.success
                if (success) {


                    this.setState({
                        match_scores: data.data.match_scores,
                        player1: data.data.player1,
                        player2: data.data.player2,

                    })

                    console.log('player => ', JSON.stringify(this.state.player1))
                }

            }).catch((response) => {
                console.log(response);
            })
        })
    }

    updateScore(isPlayer1) {
        let currentIndex = this.state.currentIndex
        let match_scores = this.state.match_scores
        let currentSet = match_scores[currentIndex]
        if (isPlayer1) {
            currentSet.player1_score = currentSet.player1_score + 1
        } else {
            currentSet.player2_score = currentSet.player2_score + 1
        }
        match_scores[currentIndex] = currentSet

        this.setState({
            // match_scores: match_scores,
            score_call: true
        })

        //================ API CALL========================
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

                this.setState({
                    match_scores: data.data.match_scores,
                    player1: data.data.player1,
                    player2: data.data.player2,

                })
            }

        }).catch((response) => {
            console.log(response);
        })
        //========================END =================================
    }


    render() {

        if (!this.state.score_call &&
            (this.props.data.loading || this.state.match_scores == null)) {
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

        let is_tournament_completed = true;
        for (let i = match_scores.length - 1; i >= 0; i--) {
            let obj = match_scores[i]
            if (!obj.winner_id) {
                is_tournament_completed = false
            }
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
        }




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

            match_array.push(<View style={{
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

            </View>)
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
                            >{player1.name}</Text>

                            <Image
                                resizeMode="contain"
                                source={{ uri: player1.profile_pic }}
                                style={{ marginTop: 20, width: 130, height: 180 }}

                            />
                            <Text
                                style={{
                                    color: '#667DDB',
                                    fontSize: 10,
                                    marginTop: 20,
                                    fontFamily: 'Quicksand-Regular'
                                }}
                            >Give bye</Text>


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
                            >{player2.name}</Text>

                            <Image
                                resizeMode="contain"
                                source={{ uri: player2.profile_pic }}
                                style={{ marginTop: 20, width: 130, height: 180 }}

                            />
                            <Text
                                style={{
                                    color: '#667DDB',
                                    fontSize: 10,
                                    marginTop: 20,
                                    fontFamily: 'Quicksand-Regular'
                                }}
                            >Give bye</Text>


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
                                                flex: 1,
                                                width: 100,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginTop: 20,
                                            }}>

                                                <SkyFilledButton
                                                    onPress={() => {
                                                        this.setState({
                                                            start_card_show: false,
                                                            is_shown: true
                                                        })
                                                    }}
                                                >Start Set !</SkyFilledButton>

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

                                                    <Image
                                                        source={require('../../images/ic_minus.png')}
                                                        style={{
                                                            width: 30,
                                                            height: 30,
                                                            marginTop: 5,
                                                        }}
                                                    />
                                                    <Text
                                                        style={{
                                                            width: 56,
                                                            textAlign: 'center',
                                                            color: '#404040',
                                                            fontSize: 46,
                                                            marginLeft: 16,
                                                            fontFamily: 'Quicksand-Medium'
                                                        }}>{currentRound.player1_score}</Text>

                                                </View>


                                                <View style={{
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
                                                            this.updateScore(true)
                                                        }}>
                                                        <Image
                                                            source={require('../../images/ic_plus.png')}
                                                            style={{ width: 48, height: 48 }}

                                                        />
                                                    </TouchableOpacity>


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

                                                    <Image
                                                        source={require('../../images/ic_minus.png')}
                                                        style={{
                                                            width: 30,
                                                            height: 30,
                                                            marginTop: 5,
                                                        }}
                                                    />
                                                    <Text
                                                        style={{
                                                            textAlign: 'center',
                                                            color: '#404040',
                                                            fontSize: 46,
                                                            width: 56,
                                                            marginLeft: 16,
                                                            fontFamily: 'Quicksand-Medium'
                                                        }}>{currentRound.player2_score}</Text>

                                                </View>


                                                <View style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    alignContent: 'center',
                                                    marginLeft: 40,
                                                    marginTop: 12,
                                                }}>


                                                    <TouchableOpacity
                                                        activeOpacity={.8}
                                                        onPress={() => {
                                                            //false means player2
                                                            this.updateScore(false)
                                                        }}>
                                                        <Image
                                                            source={require('../../images/ic_plus.png')}
                                                            style={{ width: 48, height: 48 }}

                                                        />
                                                    </TouchableOpacity>


                                                </View>


                                            </View>

                                        </View>

                                        <View style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: 20,
                                        }}>

                                            <TouchableOpacity activeOpacity={.8}
                                                style={style.rounded_button}
                                                onPress={() => {

                                                }}>
                                                <Text style={style.rounded_button_text}>
                                                    Save</Text>
                                            </TouchableOpacity>

                                        </View>
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

                                            <SkyFilledButton
                                                onPress={() => {
                                                    this.props.navigation.goBack()
                                                }}
                                            >Finish</SkyFilledButton>

                                        </View>

                                    </View>
                                </Card>
                            </View>
                        }
                    </View>

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
    getMatchScore, updateMatchScore
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
}
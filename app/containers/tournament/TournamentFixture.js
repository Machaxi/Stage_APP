import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { getRegisteredTournament, getTournamentFixture } from "../../redux/reducers/TournamentReducer";
import { connect } from 'react-redux';
import { getData } from "../../components/auth";
import { Card, ActivityIndicator, } from 'react-native-paper';
import BaseComponent, { defaultStyle, formattedName } from '../BaseComponent'
import TournamentCategoryDialog from './TournamentCategoryDialog'
import { COACH, PLAYER } from '../../components/Constants'
import { Text as MyText } from 'react-native'

import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationDrawerStructure from '../../router/NavigationDrawerStructure';



class TournamentFixture extends BaseComponent {

    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: (
                <View style={{
                    flexDirection: 'row',
                    //alignItems: 'center'
                }}><MyText
                    style={defaultStyle.bold_text_12}>{navigation.getParam('title')}
                    </MyText></View>),
            headerTitleStyle: defaultStyle.headerStyle,

            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showDrawer={false}
                showBackAction={true} />
            ,
            headerRight: (
                <TouchableOpacity
                    onPress={() => {
                        //navigation.navigate('SwitchPlayer')
                    }}
                    activeOpacity={.8}
                >
                    <Text
                        style={{
                            marginRight: 12,
                            fontFamily: 'Quicksand-Regular',
                            fontSize: 10,
                            color: '#667DDB'
                        }} >Refresh</Text>
                </TouchableOpacity>

            )
        };

    };

    constructor(props) {
        super(props)
        this.state = {
            array: [],
            data: null,
            tournament_fixtures: [],
            is_show_dialog: false,
            tournament_id: '',
            user_type: '',
            is_coach: false,
            tournament_name: '',
            academy_name: 'Test Academy',
            winner: null

        }

        getData('userInfo', (value) => {

            if (value != '') {

                let userData = JSON.parse(value)
                let user_type = userData.user['user_type']
                this.state.is_coach = user_type == COACH
                this.setState({
                    user_type: user_type
                })
            }
        });


        this.dialogRef = React.createRef();
        //this.state.tournament_id = this.props.navigation.getParam('id')
        //console.warn('ID => ', this.state.tournament_id)

        //let data = this.props.navigation.getParam('data')
        // this.setState({
        //     array : JSON.parse(data)
        // })s
        //this.state.array = JSON.parse(data)
        //console.warn('Fxitrue data' + this.state.array)

        // this.getFixtureData()
        let data = this.props.navigation.getParam('data')
        console.log('Tournament Fixture -> ' + data)
        let json = JSON.parse(data)
        this.state.tournament_name = json.name

        // let navigation = this.props.navigation
        // navigation.setParams({
        //     title: json.name
        // })
        let title = this.state.academy_name + " " + json.name
        //alert('Name ' + json.name)
        this.setState({
            tournament_name: title
        })
        this.state.data = json
        this.showFixture(json)
    }

    getFixtureData() {

        let tournament_id = this.state.tournament_id

        getData('header', (value) => {

            this.props.getTournamentFixture(value, tournament_id).then(() => {

                let data = this.props.data.data
                console.log(' getTournamentFixture ' + JSON.stringify(data));

                let success = data.success
                if (success) {

                    let tournament_fixtures = data.data.tournament_fixtures
                    if (tournament_fixtures != null && tournament_fixtures.length > 0) {
                        console.log(' tournament_fixtures ' + JSON.stringify(data.data.tournament_fixtures));
                        this.setState({
                            tournament_fixtures: tournament_fixtures,
                            is_show_dialog: true

                        })
                    }
                    else {
                        alert('No data found.')
                    }

                }

            }).catch((response) => {
                console.log(response);
            })
        })

    }

    showFixture(data) {

        // if (id == undefined) {
        //     return
        // }

        // console.warn('ShowFixture = > ', id)

        // let data = null
        // let tournament_fixtures = this.state.tournament_fixtures
        // for (let i = 0; i < tournament_fixtures.length; i++) {
        //     let obj = tournament_fixtures[i]
        //     if (obj.id == id) {
        //         data = obj
        //     }
        // }

        if (data != null) {
            let fixture_data = data.tournament_matches

            console.log('fixture array ', fixture_data)

            let playerArray = []
            let firstArray = []
            let last_key = ""

            for (var key in fixture_data) {
                if (fixture_data.hasOwnProperty(key)) {
                    last_key = key
                    console.log("KEY = >", key)
                    //console.log(data[key].id);
                    let tournament_matches = fixture_data[key]

                    let count = 0
                    let subArray = []
                    for (let i = 0; i < tournament_matches.length; i++) {

                        let obj = tournament_matches[i]
                        let match_id = obj.id
                        console.log('match id => ', obj.id)
                        console.log('obj => ', JSON.stringify(obj))
                        console.warn('tournament-match => ', obj.tournament_match_scores)
                        let player1 = obj.player1
                        let player2 = obj.player2



                        //subArray[count++] = player1
                        ///subArray[count++] = player2
                        if (player1 != null) {
                            player1['match_id'] = match_id
                            player1['player_description'] = obj.player1_description
                            player1.tournament_match_scores = obj.tournament_match_scores == undefined ? [] : obj.tournament_match_scores
                            subArray.push(player1)

                        }

                        if (player2 != null) {
                            player2['match_id'] = match_id
                            player2['player_description'] = obj.player2_description
                            player2.tournament_match_scores = obj.tournament_match_scores == undefined ? [] : obj.tournament_match_scores
                            subArray.push(player2)
                        }

                        // if (obj.player1_match == null && player2 == null) {
                        //     let newplayer1 = { ...player1 }
                        //     newplayer1.name = "To be decided"
                        //     subArray.push(newplayer1)
                        // }

                        if (playerArray.length > 0 && obj.player1 == null) {
                            let newplayer1 = { ...player1 }
                            newplayer1.name = "To be decided"
                            subArray.push(newplayer1)
                        }

                        if (playerArray.length > 0 && obj.player2 == null) {
                            let newplayer1 = { ...player1 }
                            newplayer1.name = "To be decided"
                            subArray.push(newplayer1)
                        }





                        //================================================
                        //special condition to check bye guy in first round only

                        if (playerArray.length == 1) {

                            if (obj.player1_match == null) {

                                let round1Array = playerArray[0];
                                let isExists = false
                                for (let i = 0; i < round1Array.length; i++) {

                                    if (round1Array[i].id == player1.id) {
                                        isExists = true
                                        break
                                    }
                                }
                                if (!isExists) {
                                    let byePlayer = { ...player1, is_bye: true }

                                    if (!this.isPlayerExistsInArray(firstArray, byePlayer.id)) {
                                        firstArray.push(byePlayer)
                                        firstArray.push(byePlayer)
                                    }


                                    let temp_round1_array = [...playerArray[0]]
                                    let newArray = []
                                    newArray.push(byePlayer)
                                    newArray.push(byePlayer)
                                    temp_round1_array.map((element, index) => {
                                        console.log('element => ', element)
                                        newArray.push(temp_round1_array[index])
                                    })

                                    //newArray = [...newArray,temp_round1_array]
                                    playerArray[0] = newArray
                                    //playerArray[0].push(byePlayer)
                                    //playerArray[0].push(byePlayer)
                                    console.log('bye guy => ', + "player1 => " + player1.name)
                                }
                            }

                            if (obj.player1_match) {

                                console.log('player_description=>', JSON.stringify(obj))
                                let temp_player1 = obj.player1_match.player1
                                let temp_player2 = obj.player1_match.player2
                                temp_player1['match_id'] = obj.player1_match.id
                                temp_player2['match_id'] = obj.player1_match.id
                                temp_player1['player_description'] = obj.player1_match.player1_description
                                temp_player2['player_description'] = obj.player1_match.player2_description
                                console.log('temp_player_description=>', JSON.stringify(temp_player1))

                                temp_player1.tournament_match_scores = obj.tournament_match_scores == undefined ? [] : obj.tournament_match_scores
                                temp_player2.tournament_match_scores = obj.tournament_match_scores == undefined ? [] : obj.tournament_match_scores

                                if (!this.isPlayerExistsInArray(firstArray, temp_player1.id)) {
                                    firstArray.push(temp_player1)
                                }

                                if (!this.isPlayerExistsInArray(firstArray, temp_player2.id)) {
                                    firstArray.push(temp_player2)
                                }
                            }

                            if (obj.player2_match) {


                                let temp_player1 = obj.player2_match.player1
                                let temp_player2 = obj.player2_match.player2
                                temp_player1['match_id'] = obj.player2_match.id
                                temp_player2['match_id'] = obj.player2_match.id
                                temp_player1['player_description'] = obj.player2_match.player1_description
                                temp_player2['player_description'] = obj.player2_match.player2_description

                                temp_player1.tournament_match_scores = obj.tournament_match_scores == undefined ? [] : obj.tournament_match_scores
                                temp_player2.tournament_match_scores = obj.tournament_match_scores == undefined ? [] : obj.tournament_match_scores


                                if (!this.isPlayerExistsInArray(firstArray, temp_player1.id)) {
                                    firstArray.push(temp_player1)
                                }

                                if (!this.isPlayerExistsInArray(firstArray, temp_player2.id)) {
                                    firstArray.push(temp_player2)
                                }
                            }
                        }

                        //===================== END =============================

                    }
                    console.log('subArray => ', JSON.stringify(subArray))
                    if (subArray.length > 0)
                        playerArray.push(subArray)

                    console.log('First Round => ', JSON.stringify(firstArray))
                }
            }
            //==========FOR WINNER FINDING ==============================

            let matches = fixture_data[key]
            if (matches.length == 1) {
                if (matches[0].winner) {

                    let obj = { ...matches[0].winner }
                    obj.winner = true
                    this.state.winner = obj
                    console.log('Winner-> ', JSON.stringify(obj))
                    // let winnerArray = []
                    // winnerArray[0] = obj
                    // playerArray.push(subArray)
                }
            }

            //=============END

            // if (firstArray.length > 8 && firstArray.length < 16) {
            //     let reminder = 16 % firstArray.length
            //     console.warn('reminder => ', reminder)
            //     for (let i = 0; i < reminder; i++) {
            //         let player = {
            //             is_bye: true,
            //             id: 0,
            //             name: 'Unknown',
            //             match_id: 0
            //         }
            //         firstArray.push(player)
            //     }
            // }
            console.log('Final => ', JSON.stringify(playerArray))

            if (firstArray.length != 0)
                playerArray[0] = firstArray
            this.setState({
                array: playerArray
            })
            this.state.array = playerArray
            // setTimeout(() => {
            //     this.setState({
            //         is_show_dialog: false
            //     })
            // }, 200)
            //this.props.navigation.navigate('TournamentFixture', { data: JSON.stringify(playerArray) })

        } else {
            alert('No data found.')
        }
    }

    isPlayerExistsInArray(array, id) {
        let isExists = false
        for (let i = 0; i < array.length; i++) {

            if (array[i].id == id) {
                isExists = true
                break
            }
        }
        return isExists
    }

    componentDidMount() {



    }
    square(val) {
        return val * val
    }

    random() {
        return "00"
        //return Math.floor(Math.random() * 90 + 10)
    }

    componentDidMount() {
    }

    getName(player) {
        console.log('Player->', JSON.stringify(player))
        if (player.player_description != undefined) {

            let array = player.player_description.split(", ")
            console.log('Array=>', JSON.stringify(array))
            let name = ""
            for (let i = 0; i < array.length; i++) {
                name = name + formattedName(array[i]) + ", "
            }
            name = name.substring(0, name.length - 2)
            return name//player.player_description
        } else {
            return formattedName(player.name)
        }
    }

    render() {

        // let array = [
        //     //["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H","A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"],
        //     //["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"],
        //     ["A", "B", "C", "D", "E", "F", "G", "H"],
        //     ["A", "C", "E", "H"],
        //     ["A", "E"]
        // ]

        let array = this.state.array
        let container = []

        if (array.length != 0) {


            // container.push(
            //     <Text
            //         stroke="black"
            //         strokeWidth="1"
            //         fontSize="14"
            //         fontFamily="Quicksand-Regular"
            //         x={10}
            //         y={10}
            //     >{this.state.tournament_name}</Text>
            // )


            let height = 45
            let width = 200

            let col = array.length
            let centerOfLast = []
            let marginLeft = 50
            let line = 30
            let borderColor = "#A3A5AE"
            let textColor = "black"

            for (let i = 0; i < col; i++) {

                let row = array[i].length
                let x = marginLeft * (i + 1) + (width * (i))

                let count = 0
                let space = 0;
                let topSpace = 0

                let is_final = 0
                let roundName = "Round " + (i + 1)
                console.log("Round---- " + i + " == " + (col - 1))
                if (i == col - 1) {
                    if (array[col - 1].length == 2) {
                        roundName = "Final Round"
                        is_final = 20;
                    }
                }

                // container.push(<Rect
                //     x={x + (width / 2) - 30}
                //     y={5}
                //     width={100}
                //     height={25}
                //     rx="8"
                //     ry="8"
                //     fill="#DFDFDF" />
                // )
                // container.push(
                //     <Text
                //         stroke="black"
                //         strokeWidth="1"
                //         fontSize="14"
                //         fontFamily="Quicksand-Regular"
                //         x={x + (width / 2) - 15}
                //         y={20}
                //     >{roundName}</Text>


                // )

                const fontSize = 14;
                container.push(<Rect
                    x={x + (width / 2) - 30}
                    y={5}
                    width={100 + is_final}
                    height={25}
                    rx="8"
                    ry="8"
                    fill="#DFDFDF" />
                )


                container.push(
                    <Text
                        fill="black"
                        fontFamily="Quicksand-Regular"
                        fontSize={fontSize}
                        textAnchor="middle"
                        x={x + (width / 2) + 10 + is_final}
                        y={22}
                        height={25}
                    >
                        {roundName}
                    </Text>
                )





                let check = false
                let pos = 0;
                let tempCenter = []
                for (let j = 0; j < row; j++) {

                    // if (array[i][j].is_bye) {
                    //     continue
                    // }

                    if (i != 0) {
                        space = 0
                        if (j % 2 == 0) {
                            //console.log('jjj = ' + j + " => " + centerOfLast)
                            topSpace = (centerOfLast[j] + centerOfLast[j + 1]) / 2
                            topSpace = topSpace - height * (j + 1)
                            //console.log('j val => topSpace ' + j + " , " + topSpace + "- " + centerOfLast[j] + " -- " + centerOfLast[j + 1])
                        }
                    }

                    //console.log("TopSpace => " + i + " " + topSpace)

                    if (count == 2) {
                        space = space + (height * 2);
                        count = 0
                    }

                    if (i != 0) {
                        space = 0
                    }


                    let y = height * (j + 1) + space + topSpace

                    if (j % 2 == 0) {
                        tempCenter[pos] = y
                        //console.log('centerArry =>', tempCenter)
                        pos = pos + 1
                    }


                    //console.log("i " + i + " y => " + y + " space => " + height + " space => " + space + " top => " + topSpace)
                    let color = "white"
                    if (j % 2 == 0) {
                        color = "white"//F6F6F6
                    } else {
                        color = "#F1F1F1"
                    }

                    container.push(<Rect
                        onPress={() => {

                            const user_type = array[i][j].user_type
                            if (user_type == PLAYER) {
                                let id = array[i][j].id
                                console.warn("playerid : " + id)
                                if (id != undefined) {
                                    this.props.navigation.navigate('OtherPlayerDeatils', {
                                        player_id: id,
                                        fixture: true
                                    })
                                }
                            }

                        }}
                        key={"id_" + (i * 100 + j)}
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        //stroke={borderColor}
                        stroke="#DFDFDF"
                        strokeWidth=".5"
                        rx="4"
                        ry="4"
                        fill={color}>

                        />
                </Rect>)

                    //==================== Adding content within cell  =======================

                    // container.push(
                    //     <Image
                    //         x={x + 10}
                    //         y={y + 10}
                    //         width="24"
                    //         height="24"
                    //         preserveAspectRatio="xMidYMid slice"
                    //         opacity="0.5"
                    //         href="https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Woman-15-512.png"
                    //     />
                    // )

                    let is_bye = array[i][j].is_bye
                    let odd = j % 2 == 1
                    if (is_bye && odd) {

                        container.push(
                            <Text
                                stroke={textColor}
                                fontSize="12"
                                fontFamily="Quicksand-Regular"
                                x={x + ((width - 30) / 2)}
                                y={y + 25}>
                                BYE
                            </Text>)

                    } else {
                        // container.push(
                        //     < Circle
                        //         cx={x + 10 + 10}
                        //         cy={y + 10 + 10}
                        //         r="12"
                        //         fill="#667DDB"
                        //     />)
                        // container.push(
                        //     <Text
                        //         stroke="white"
                        //         strokeWidth="1"
                        //         fontSize="11"
                        //         fontFamily="Quicksand-Regular"
                        //         x={x + 13}
                        //         y={y + 24}
                        //     >{this.random()}</Text>
                        // )

                        container.push(
                            <Text
                                onPress={() => {

                                    const user_type = array[i][j].user_type
                                    if (user_type == PLAYER) {
                                        let id = array[i][j].id
                                        console.warn("playerid : " + id)
                                        if (id != undefined) {
                                            this.props.navigation.navigate('OtherPlayerDeatils', {
                                                player_id: id,
                                                fixture: true
                                            })
                                        }
                                    }
                                }}
                                stroke={array[i][j].user_type == PLAYER ? 'blue' : textColor}
                                fontSize="12"
                                fontFamily="Quicksand-Regular"
                                x={x + 12}
                                y={y + 25}>
                                {array[i][j].name == 'To be decided' ? 'To be decided' : this.getName(array[i][j])}
                            </Text>
                        )
                    }



                    //===============ADDING SCORE =============================

                    if (!array[i][j].is_bye) {


                        let score = array[i][j].tournament_match_scores
                        console.log('Score-Array=> ', JSON.stringify(score))

                        if (score == undefined || score == null || score.length == 0) {

                            let length = i > 0 ? 3 : 2

                            for (k = 0; k < length; k++) {

                                let color = "white"
                                if (j % 2 == 0) {
                                    color = "white"
                                } else {
                                    color = "#F1F1F1"
                                }

                                let bgColor = color
                                // if (j % 2 == 0) {
                                //     if (k % 2 == 0)
                                //         bgColor = "#F5FFB8"
                                //     else
                                //         bgColor = color

                                // } else {
                                //     if (k % 2 == 0)
                                //         bgColor = 'color'
                                //     else
                                //         bgColor = "#F5FFB8"
                                // }


                                container.push(
                                    <Rect
                                        onPress={() => {

                                            if (this.state.is_coach) {
                                                //console.warn("Match : " + JSON.stringify(array[i][j]))
                                                this.props.navigation.navigate('TournamentScorer', {
                                                    match_id: array[i][j].match_id
                                                })
                                            }
                                        }}
                                        x={x + width - 30 * (k + 1)}
                                        y={y}
                                        height={height}
                                        width="30"
                                        stroke="#DFDFDF"
                                        strokeWidth=".5"
                                        fill={bgColor} >

                                    </Rect>
                                )

                                container.push(
                                    <Text
                                        onPress={() => {

                                            if (this.state.is_coach) {
                                                //console.warn("Match : " + JSON.stringify(array[i][j]))
                                                this.props.navigation.navigate('TournamentScorer', {
                                                    match_id: array[i][j].match_id
                                                })
                                            }
                                        }}
                                        stroke={textColor}
                                        fontSize="12"
                                        fontFamily="Quicksand-Regular"
                                        x={x + width + 10 - (30 * (k + 1))}
                                        y={y + 24}>

                                    </Text>
                                )
                            }


                        } else {

                            let length = score.length
                            for (k = 0; k < length; k++) {

                                let obj = score[k]
                                let bgColor
                                if (j % 2 == 0) {
                                    if (k % 2 == 0)
                                        bgColor = "#F5FFB8"
                                    else
                                        bgColor = color

                                } else {
                                    if (k % 2 == 0)
                                        bgColor = color
                                    else
                                        bgColor = "#F5FFB8"
                                }

                                let player_score = ''
                                if (i == 0) {
                                    if (j % 2 == 1) {
                                        player_score = obj.player1_score == undefined ? '-' : obj.player1_score
                                    }
                                    else {
                                        player_score = obj.player2_score == undefined ? '-' : obj.player2_score
                                    }
                                } else {

                                    if (j % 2 == 0) {
                                        player_score = obj.player1_score == undefined ? '-' : obj.player1_score
                                    }
                                    else {
                                        player_score = obj.player2_score == undefined ? '-' : obj.player2_score
                                    }
                                }



                                container.push(
                                    <Rect
                                        onPress={() => {

                                            if (this.state.is_coach) {
                                                //console.warn("Match : " + JSON.stringify(array[i][j]))
                                                this.props.navigation.navigate('TournamentScorer', {
                                                    match_id: array[i][j].match_id
                                                })
                                            }
                                        }}
                                        x={x + width - 30 * (k + 1)}
                                        y={y}
                                        height={height}
                                        width="30"
                                        stroke="#DFDFDF"
                                        strokeWidth=".5"
                                        fill={bgColor} >

                                    </Rect>
                                )

                                container.push(
                                    <Text
                                        onPress={() => {

                                            if (this.state.is_coach) {
                                                //console.warn("Match : " + JSON.stringify(array[i][j]))
                                                this.props.navigation.navigate('TournamentScorer', {
                                                    match_id: array[i][j].match_id
                                                })
                                            }
                                        }}
                                        stroke={textColor}
                                        fontSize="12"
                                        fontFamily="Quicksand-Regular"
                                        x={x + width + 10 - (30 * (k + 1))}
                                        y={y + 24}>
                                        {player_score}
                                    </Text>
                                )
                            }
                        }

                    }





                    // container.push(
                    //     < Circle
                    //         cx={x + width - 16}
                    //         cy={y + 20}
                    //         r="12"
                    //         fill="#C4D58E"
                    //     />)

                    // container.push(
                    //     <Text
                    //         stroke={textColor}
                    //         fontSize="12"
                    //         x={x + width - 22}
                    //         y={y + 25}
                    //     >{this.random()}</Text>
                    // )

                    // ================== END CONTENT ADDING  ==============================


                    if (i != 0 && j % 2 == 1) {

                        //Left Line
                        container.push(<Line
                            x1={x - +marginLeft / 2}
                            y1={y}
                            x2={x}
                            y2={y}
                            stroke={borderColor}
                            strokeWidth="1"
                        />)
                    }


                    if (j % 2 == 1 && i != col - 1) {

                        //Right Line
                        container.push(<Line
                            x1={x + width + marginLeft / 2}
                            y1={y}
                            x2={x + width}
                            y2={y}
                            stroke={borderColor}
                            strokeWidth="1"
                        />)

                    }

                    //Down and up lines
                    if (i != col - 1) {


                        if (pos % 2 == 1) {
                            let y2 = y + (height * (i + 4) + height * this.square(i))
                            console.log("i=" + i + " j=" + j + " y1=" + y + " y2=" + y2)

                            container.push(<Line
                                x1={x + width + marginLeft / 2}
                                y1={y + height}
                                x2={x + width + marginLeft / 2}
                                y2={y2}
                                stroke={borderColor}
                                strokeWidth="1"
                            />)
                        } else {

                            let y2 = y - (height * (i + 3) + height * this.square(i))

                            console.log("i=" + i + " j=" + j + " y1=" + y + " y2=" + y2)
                            container.push(<Line
                                x1={x + width + marginLeft / 2}
                                y1={y}
                                x2={x + width + marginLeft / 2}
                                y2={y2}
                                stroke={borderColor}
                                strokeWidth="1"
                            />)
                        }
                    }
                    count = count + 1
                }

                centerOfLast = []
                centerOfLast = tempCenter

                if ((i == col - 1) && this.state.winner) {

                    const winner = this.state.winner

                    let j = row - 1
                    let x1 = x + width
                    let y = height * (j + 1) + space + topSpace
                    y = y - (height / 2)

                    container.push(<Rect
                        x={x1 + marginLeft + 12}
                        y={5}
                        width={80}
                        height={25}
                        rx="8"
                        ry="8"
                        fill="#DFDFDF" />
                    )

                    container.push(
                        <Text
                            //stroke={textColor}
                            fontSize="14"
                            fontFamily="Quicksand-Regular"
                            x={x1 + marginLeft + 27}
                            y={22}>
                            Winner
                        </Text>
                    )

                    container.push(<Line
                        x1={x + width + marginLeft}
                        y1={y + (height / 2)}
                        x2={x + width}
                        y2={y + (height / 2)}
                        stroke={borderColor}
                        strokeWidth="1"
                    />)

                    container.push(<Rect
                        onPress={() => {

                            const user_type = array[i][j].user_type
                            if (user_type == PLAYER) {
                                let id = array[i][j].id
                                console.warn("playerid : " + id)
                                if (id != undefined) {
                                    this.props.navigation.navigate('OtherPlayerDeatils', {
                                        player_id: id,
                                        fixture: true
                                    })
                                }
                            }
                        }}
                        key={"id_" + (i * 100 + 0)}
                        x={x1 + marginLeft}
                        y={y}
                        width={width}
                        height={height}
                        //stroke={borderColor}
                        stroke="#DFDFDF"
                        strokeWidth=".5"
                        rx="4"
                        ry="4"
                        fill="white">

                        />
                </Rect>)

                    container.push(
                        <Text
                            onPress={() => {
                                // let id = array[i][j].id
                                // console.warn("playerid : " + id)
                                // if (id != undefined) {
                                //     this.props.navigation.navigate('OtherPlayerDeatils', {
                                //         player_id: id
                                //     })
                                // }
                            }}
                            stroke={array[i][j].user_type == PLAYER ? 'blue' : textColor}
                            fontSize="12"
                            fontFamily="Quicksand-Regular"
                            x={x1 + marginLeft + 12}
                            y={y + 25}>
                            {formattedName(winner.name)}
                        </Text>
                    )


                }
            }


        }

        // if (this.props.data.loading && array.length == 0) {
        //     return (
        //         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //             <ActivityIndicator size="large" color="#67BAF5" />
        //         </View>
        //     )
        // }
        console.warn('Show => ', this.state.is_show_dialog)

        return (
            <ScrollView contentContainerStyle={{ height: 1500 }}>
                <ScrollView horizontal contentContainerStyle={{ width: 1500 }}>

                    {/* <TournamentCategoryDialog
                        tournament_fixture={this.state.tournament_fixtures}
                        touchOutside={(id) => {
                            this.state.is_show_dialog = false
                            this.setState({
                                is_show_dialog: false
                            })
                            setTimeout(() => {
                                this.showFixture(id)
                            }, 200)

                        }}
                        visible={this.state.is_show_dialog} /> */}

                    <View style={{
                        marginTop: 50,
                        flex: 1, width: "100%", height: "100%",
                    }}>

                        {/* <Text style={defaultStyle.bold_text_14}>this.state.academy_name</Text>
                        <Text style={[defaultStyle.bold_text_14, {
                            marginTop: 4
                        }]}>this.state.tournament_name</Text> */}

                        {this.state.array.length != 0
                            ?
                            <Svg
                                height="100%" width="100%">
                                {container}
                            </Svg>
                            : null}

                    </View>

                </ScrollView>
            </ScrollView>

        );
    }
}
const mapStateToProps = state => {
    return {
        data: state.TournamentReducer,
    };
};
const mapDispatchToProps = {
    getRegisteredTournament, getTournamentFixture
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentFixture);

const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
});
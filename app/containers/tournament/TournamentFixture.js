import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, PanResponder, Dimensions } from 'react-native';
import { getRegisteredTournament, getTournamentFixture } from "../../redux/reducers/TournamentReducer";
import { connect } from 'react-redux';
import { getData } from "../../components/auth";
import { Card, ActivityIndicator, } from 'react-native-paper';
import BaseComponent, { defaultStyle, formattedName } from '../BaseComponent'
import TournamentCategoryDialog from './TournamentCategoryDialog'
import { COACH, PLAYER, ACADEMY } from '../../components/Constants'
import { Text as MyText } from 'react-native'
import Events from '../../router/events';

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
const { width, height } = Dimensions.get('window');

function calcDistance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

function middle(p1, p2) {
    return (p1 + p2) / 2;
}

function calcCenter(x1, y1, x2, y2) {
    return {
        x: middle(x1, x2),
        y: middle(y1, y2),
    };
}

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
        this.firstRender = false;
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
            winner: null,
            zoom: 0.09820492746901595,
            left: 0,
            top: 150,

        }

        getData('userInfo', (value) => {

            if (value != '') {

                let userData = JSON.parse(value)
                let user_type = userData.user['user_type']
                //alert(user_type)
                this.state.is_coach = user_type == COACH || user_type == ACADEMY
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
        this.init(data)


        this.refreshEvent = Events.subscribe('REFRESH_FIXTURE', (data) => {
            // alert('REFRESH_FIXTURE')
            console.log('REFRESH_FIXTURE->', JSON.stringify(data))
            this.init(JSON.stringify(data))
        })

        // setTimeout(() => {
        //     Events.publish('FIXTURE_CALL_API');
        // }, 20000)

        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                if (this.firstRender) {
                    Events.publish('FIXTURE_CALL_API');
                } else {
                    this.firstRender = true
                }
            }
        )

    }

    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }

    init(data) {
        let json = JSON.parse(data)
        this.state.tournament_name = json.name

        let title = this.state.academy_name + " " + json.name
        //alert('Name ' + json.name)
        this.setState({
            tournament_name: title
        })
        this.state.data = json
        this.showFixture(json)
    }

    processPinch(x1, y1, x2, y2) {
        const distance = calcDistance(x1, y1, x2, y2);
        const { x, y } = calcCenter(x1, y1, x2, y2);


        if (!this.state.isZooming) {
            const { top, left, zoom } = this.state;
            this.setState({
                isZooming: true,
                initialX: x,
                initialY: y,
                initialTop: top,
                initialLeft: left,
                initialZoom: zoom,
                initialDistance: distance,
            });
            console.log('processPinch', "x=" + x + ', y=' + y + ", top=" + top + ",left=" + left + ", zoom=" + zoom + ",distance=" + distance)

        } else {
            const {
                initialX,
                initialY,
                initialTop,
                initialLeft,
                initialZoom,
                initialDistance,
            } = this.state;

            const touchZoom = distance / initialDistance;
            const dx = x - initialX;
            const dy = y - initialY;

            const left = (initialLeft + dx - x) * touchZoom + x;
            const top = (initialTop + dy - y) * touchZoom + y;
            const zoom = initialZoom * touchZoom;

            this.setState({
                zoom,
                left,
                top,
            });
        }
    }

    processTouch(x, y) {
        if (!this.state.isMoving || this.state.isZooming) {
            const { top, left } = this.state;
            this.setState({
                isMoving: true,
                isZooming: false,
                initialLeft: left,
                initialTop: top,
                initialX: x,
                initialY: y,
            });
        } else {
            const { initialX, initialY, initialLeft, initialTop } = this.state;
            const dx = x - initialX;
            const dy = y - initialY;
            this.setState({
                left: initialLeft + dx,
                top: initialTop + dy,
            });
        }
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onPanResponderGrant: () => { },
            onPanResponderTerminate: () => { },
            onMoveShouldSetPanResponder: () => false,
            onStartShouldSetPanResponder: () => true,
            onShouldBlockNativeResponder: () => false,
            onPanResponderTerminationRequest: () => true,
            onMoveShouldSetPanResponderCapture: () => false,
            onStartShouldSetPanResponderCapture: () => {
                console.log('onStartShouldSetPanResponderCapture')
                return false
            },
            onPanResponderMove: evt => {
                const touches = evt.nativeEvent.touches;
                const length = touches.length;
                if (length === 1) {
                    const [{ locationX, locationY }] = touches;
                    this.processTouch(locationX, locationY);
                } else if (length === 2) {
                    const [touch1, touch2] = touches;
                    this.processPinch(
                        touch1.locationX,
                        touch1.locationY,
                        touch2.locationX,
                        touch2.locationY
                    );
                }
            },
            onPanResponderRelease: () => {
                this.setState({
                    isZooming: false,
                    isMoving: false,
                });
            },
        });
    }

    goToPlayerDetail(id) {

        let user_type = this.state.user_type
        // if (user_type != null && user_type != '') {

        // }
        this.props.navigation.navigate('OtherPlayerDeatils', {
            player_id: id,
            fixture: true
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

            console.log('fixture array ', JSON.stringify(fixture_data))

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

                                const temp_obj = fixture_data[last_key]
                                console.log('TempObj => ', JSON.stringify(temp_obj))
                                //temp_player1.tournament_match_scores = temp_obj.player1_match.tournament_match_scores == undefined ? [] : temp_obj.player1_match.tournament_match_scores
                                //temp_player2.tournament_match_scores = temp_obj.player2_match.tournament_match_scores == undefined ? [] : temp_obj.player2_match.tournament_match_scores
                                temp_player1.tournament_match_scores = this.getMatchScoreById(obj.player1_match.id, temp_obj)
                                temp_player2.tournament_match_scores = this.getMatchScoreById(obj.player1_match.id, temp_obj)
                                console.log('temp_player1.tournament_match_scores', JSON.stringify(temp_player1.tournament_match_scores))

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



                                const temp_obj = fixture_data[last_key]
                                console.log('TempObj1 => ' + last_key, JSON.stringify(temp_obj))
                                //temp_player1.tournament_match_scores = temp_obj.player1_match.tournament_match_scores == undefined ? [] : temp_obj.player1_match.tournament_match_scores
                                //temp_player2.tournament_match_scores = temp_obj.player2_match.tournament_match_scores == undefined ? [] : temp_obj.player2_match.tournament_match_scores
                                temp_player1.tournament_match_scores = this.getMatchScoreById(obj.player2_match.id, temp_obj)
                                temp_player2.tournament_match_scores = this.getMatchScoreById(obj.player2_match.id, temp_obj)
                                console.log('temp_player1.tournament_match_scores', JSON.stringify(temp_player1.tournament_match_scores))
                                if (!this.isPlayerExistsInArray(firstArray, temp_player1.id)) {
                                    firstArray.push(temp_player1)
                                }

                                if (!this.isPlayerExistsInArray(firstArray, temp_player2.id)) {
                                    firstArray.push(temp_player2)
                                }
                            }

                            if (obj.player1_match == undefined) {

                                console.log('player1_match_undefine', JSON.stringify(obj))
                                let temp_player1 = { ...obj.player1 }
                                if (temp_player1) {
                                    temp_player1['match_id'] = obj.id
                                    temp_player1['player_description'] = obj.player1_description
                                    temp_player1['is_bye'] = true

                                    if (!this.isPlayerExistsInArray(firstArray, temp_player1.id)) {
                                        firstArray.push(temp_player1)
                                        firstArray.push(temp_player1)
                                    }

                                }
                                let temp_player2 = { ...obj.player2 }
                                if (temp_player2) {
                                    temp_player2['match_id'] = obj.id
                                    temp_player2['player_description'] = obj.player2_description
                                    temp_player2['is_bye'] = true

                                    if (!this.isPlayerExistsInArray(firstArray, temp_player2.id)) {
                                        firstArray.push(temp_player2)
                                        firstArray.push(temp_player2)
                                    }
                                }



                                // const temp_obj = fixture_data[last_key]
                                // //temp_player1.tournament_match_scores = temp_obj.player1_match.tournament_match_scores == undefined ? [] : temp_obj.player1_match.tournament_match_scores
                                // //temp_player2.tournament_match_scores = temp_obj.player2_match.tournament_match_scores == undefined ? [] : temp_obj.player2_match.tournament_match_scores
                                // temp_player1.tournament_match_scores = this.getMatchScoreById(obj.id, temp_obj)
                                // temp_player2.tournament_match_scores = this.getMatchScoreById(obj.id, temp_obj)



                            }

                            if (obj.player2_match == undefined) {
                                console.log('player2_match_undefine', JSON.stringify(obj))

                                let temp_player1 = { ...obj.player1 }
                                if (temp_player1) {
                                    temp_player1['match_id'] = obj.match_number
                                    temp_player1['player_description'] = obj.player1_description
                                    temp_player1['is_bye'] = true

                                    if (!this.isPlayerExistsInArray(firstArray, temp_player1.id)) {
                                        firstArray.push(temp_player1)
                                    }
                                }
                                let temp_player2 = { ...obj.player2 }
                                if (temp_player2) {
                                    temp_player2['match_id'] = obj.match_number
                                    temp_player2['player_description'] = obj.player2_description
                                    temp_player2['is_bye'] = true
                                    if (!this.isPlayerExistsInArray(firstArray, temp_player2.id)) {
                                        firstArray.push(temp_player2)
                                    }
                                }



                                // const temp_obj = fixture_data[last_key]
                                // //temp_player1.tournament_match_scores = temp_obj.player1_match.tournament_match_scores == undefined ? [] : temp_obj.player1_match.tournament_match_scores
                                // //temp_player2.tournament_match_scores = temp_obj.player2_match.tournament_match_scores == undefined ? [] : temp_obj.player2_match.tournament_match_scores
                                // temp_player1.tournament_match_scores = this.getMatchScoreById(obj.id, temp_obj)
                                // temp_player2.tournament_match_scores = this.getMatchScoreById(obj.id, temp_obj)





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
            let temp_first = []
            for (let l = 0; l < firstArray.length; l++) {
                let obj = firstArray[l]
                if (obj.id) {
                    temp_first.push(obj)
                }
            }
            firstArray = temp_first

            if (firstArray.length != 0)
                playerArray[0] = firstArray
            this.setState({
                array: playerArray
            })
            console.log('Final-modify => ', JSON.stringify(playerArray))

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

    getMatchScoreById(matchid, array) {
        console.log('getMatchScoreById-debug => debug 1 ' + matchid)
        console.log('getMatchScoreById => debug ' + matchid + JSON.stringify(array))

        let data =  this.state.data
        let fixture_data = data.tournament_matches
        for (var key in fixture_data) {
            if (fixture_data.hasOwnProperty(key)) {


                array = fixture_data[key]

                for (let i = 0; i < array.length; i++) {

                    if (array[i].player1_match && array[i].player1_match.id == matchid) {
                        console.log('getMatchScoreById-debug =>' + matchid + ' player1_match ' + JSON.stringify(array[i].player1_match))

                        console.log('compare match id player1_match '+array[i].player2_match.id+"== "+matchid)

                       
                            console.log('compare match id player1_match-true'+array[i].player1_match.id+"== "+matchid)
                            return array[i].player1_match.tournament_match_scores
                       
                    }
                    else if (array[i].player2_match && array[i].player2_match.id == matchid) {
                        console.log('getMatchScoreById-debug =>' + matchid + ' player2_match ' + JSON.stringify(array[i].player2_match))
                        console.log('compare match id '+array[i].player2_match.id+"== "+matchid)
                        
                            console.log('compare match id player2_match-true '+array[i].player2_match.id+"== "+matchid)

                            return array[i].player2_match.tournament_match_scores
                      
                    }
                }
            }
        }

        return []
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

    getColor(player) {
        if (player.user_type == PLAYER && player.name != 'To be decided')
            return 'blue'
        else
            return 'black'
    }

    render() {

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
                        onPressIn={() => {
                            const user_type = array[i][j].user_type
                            if (user_type == PLAYER && array[i][j].name != 'To be decided') {
                                let id = array[i][j].id
                                console.warn("playerid : " + id)
                                if (id != undefined) {
                                    // this.props.navigation.navigate('OtherPlayerDeatils', {
                                    //     player_id: id,
                                    //     fixture: true
                                    // })
                                    this.goToPlayerDetail(id)
                                }
                            }
                        }}
                        onPressOut={() => {
                            const user_type = array[i][j].user_type
                            if (user_type == PLAYER && array[i][j].name != 'To be decided') {
                                let id = array[i][j].id
                                console.warn("playerid : " + id)
                                if (id != undefined) {
                                    // this.props.navigation.navigate('OtherPlayerDeatils', {
                                    //     player_id: id,
                                    //     fixture: true
                                    // })
                                    this.goToPlayerDetail(id)
                                }
                            }
                        }}
                        onPress={() => {

                            const user_type = array[i][j].user_type
                            if (user_type == PLAYER && array[i][j].name != 'To be decided') {
                                let id = array[i][j].id
                                console.warn("playerid : " + id)
                                if (id != undefined) {
                                    // this.props.navigation.navigate('OtherPlayerDeatils', {
                                    //     player_id: id,
                                    //     fixture: true
                                    // })
                                    this.goToPlayerDetail(id)
                                }
                            }

                        }}
                        key={"id_" + ((i + 1) * 100 + (j + 1))}
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
                                onPressIn={() => {

                                    const user_type = array[i][j].user_type
                                    if (user_type == PLAYER && array[i][j].name != 'To be decided') {
                                        let id = array[i][j].id
                                        console.warn("playerid : " + id)
                                        if (id != undefined) {
                                            // this.props.navigation.navigate('OtherPlayerDeatils', {
                                            //     player_id: id,
                                            //     fixture: true
                                            // })
                                            this.goToPlayerDetail(id)
                                        }
                                    }
                                }}
                                onPressOut={() => {

                                    const user_type = array[i][j].user_type
                                    if (user_type == PLAYER && array[i][j].name != 'To be decided') {
                                        let id = array[i][j].id
                                        console.warn("playerid : " + id)
                                        if (id != undefined) {
                                            // this.props.navigation.navigate('OtherPlayerDeatils', {
                                            //     player_id: id,
                                            //     fixture: true
                                            // })
                                            this.goToPlayerDetail(id)
                                        }
                                    }
                                }}
                                onPress={() => {

                                    const user_type = array[i][j].user_type
                                    if (user_type == PLAYER && array[i][j].name != 'To be decided') {
                                        let id = array[i][j].id
                                        console.warn("playerid : " + id)
                                        if (id != undefined) {
                                            // this.props.navigation.navigate('OtherPlayerDeatils', {
                                            //     player_id: id,
                                            //     fixture: true
                                            // })
                                            this.goToPlayerDetail(id)
                                        }
                                    }
                                }}
                                stroke={this.getColor(array[i][j])}
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
                        //console.log('Score-Array=> ', JSON.stringify(score))

                        if (score == undefined || score == null || score.length == 0) {

                            let length = i > 0 ? 3 : 3

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
                                        onPressIn={() => {
                                            if (this.state.is_coach && this.state.winner == null) {
                                                //console.warn("Match : " + JSON.stringify(array[i][j]))
                                                this.props.navigation.navigate('TournamentScorer', {
                                                    match_id: array[i][j].match_id
                                                })
                                            }
                                        }}
                                        onPressOut={() => {
                                            if (this.state.is_coach && this.state.winner == null) {
                                                //console.warn("Match : " + JSON.stringify(array[i][j]))
                                                this.props.navigation.navigate('TournamentScorer', {
                                                    match_id: array[i][j].match_id
                                                })
                                            }
                                        }}
                                        onPress={() => {

                                            if (this.state.is_coach && this.state.winner == null) {
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
                                        onPressIn={() => {
                                            if (this.state.is_coach && this.state.winner == null) {
                                                //console.warn("Match : " + JSON.stringify(array[i][j]))
                                                this.props.navigation.navigate('TournamentScorer', {
                                                    match_id: array[i][j].match_id
                                                })
                                            }
                                        }}
                                        onPressOut={() => {
                                            if (this.state.is_coach && this.state.winner == null) {
                                                //console.warn("Match : " + JSON.stringify(array[i][j]))
                                                this.props.navigation.navigate('TournamentScorer', {
                                                    match_id: array[i][j].match_id
                                                })
                                            }
                                        }}
                                        onPress={() => {

                                            if (this.state.is_coach && this.state.winner == null) {
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
                            let tempScore = []
                            for (let x = length - 1; x >= 0; x--) {
                                tempScore.push(score[x])
                            }
                            score = tempScore

                            for (k = 0; k < length; k++) {

                                let obj = score[k]
                                //console.log('Match Score11 => ' + JSON.stringify(obj))

                                if (j % 2 == 0) {
                                    //  console.log('Match Score11 => ' + array[i][j].name + "== " + obj.player1_score)
                                }
                                else {
                                    //console.log('Match Score11 => ' + array[i][j].name + "== " + obj.player2_score)
                                }
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
                                // if (i == 0) {
                                //     if (j % 2 == 1) {
                                //         player_score = obj.player1_score == undefined ? '-' : obj.player1_score
                                //     }
                                //     else {
                                //         player_score = obj.player2_score == undefined ? '-' : obj.player2_score
                                //     }
                                // } else {

                                //     if (j % 2 == 0) {
                                //         player_score = obj.player1_score == undefined ? '-' : obj.player1_score
                                //     }
                                //     else {
                                //         player_score = obj.player2_score == undefined ? '-' : obj.player2_score
                                //     }
                                // }
                                if (j % 2 == 0) {
                                    player_score = obj.player1_score == undefined ? '-' : obj.player1_score
                                }
                                else {
                                    player_score = obj.player2_score == undefined ? '-' : obj.player2_score
                                }


                                container.push(
                                    <Rect
                                        onPress={() => {

                                            if (this.state.is_coach && this.state.winner == null) {
                                                //console.warn("Match : " + JSON.stringify(array[i][j]))
                                                this.props.navigation.navigate('TournamentScorer', {
                                                    match_id: array[i][j].match_id
                                                })
                                            }
                                        }}
                                        onPressIn={() => {

                                            if (this.state.is_coach && this.state.winner == null) {
                                                //console.warn("Match : " + JSON.stringify(array[i][j]))
                                                this.props.navigation.navigate('TournamentScorer', {
                                                    match_id: array[i][j].match_id
                                                })
                                            }
                                        }}
                                        onPressOut={() => {

                                            if (this.state.is_coach && this.state.winner == null) {
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

                                            if (this.state.is_coach && this.state.winner == null) {
                                                //console.warn("Match : " + JSON.stringify(array[i][j]))
                                                this.props.navigation.navigate('TournamentScorer', {
                                                    match_id: array[i][j].match_id
                                                })
                                            }
                                        }}
                                        onPressIn={() => {

                                            if (this.state.is_coach && this.state.winner == null) {
                                                //console.warn("Match : " + JSON.stringify(array[i][j]))
                                                this.props.navigation.navigate('TournamentScorer', {
                                                    match_id: array[i][j].match_id
                                                })
                                            }
                                        }}
                                        onPressOut={() => {

                                            if (this.state.is_coach && this.state.winner == null) {
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

                        onPressOut={() => {
                            const user_type = array[i][j].user_type
                            if (user_type == PLAYER) {
                                let id = array[i][j].id
                                console.warn("playerid : " + id)
                                if (id != undefined) {
                                    // this.props.navigation.navigate('OtherPlayerDeatils', {
                                    //     player_id: id,
                                    //     fixture: true
                                    // })
                                    this.goToPlayerDetail(id)
                                }
                            }
                        }}
                        onPressIn={() => {
                            const user_type = array[i][j].user_type
                            if (user_type == PLAYER) {
                                let id = array[i][j].id
                                console.warn("playerid : " + id)
                                if (id != undefined) {
                                    // this.props.navigation.navigate('OtherPlayerDeatils', {
                                    //     player_id: id,
                                    //     fixture: true
                                    // })
                                    this.goToPlayerDetail(id)
                                }
                            }
                        }}
                        onPress={() => {

                            const user_type = array[i][j].user_type
                            if (user_type == PLAYER) {
                                let id = array[i][j].id
                                console.warn("playerid : " + id)
                                if (id != undefined) {
                                    // this.props.navigation.navigate('OtherPlayerDeatils', {
                                    //     player_id: id,
                                    //     fixture: true
                                    // })
                                    this.goToPlayerDetail(id)
                                }
                            }
                        }}
                        key={"id_" + (i * 100 + 0)}
                        x={x1 + marginLeft}
                        y={y}
                        width={100}
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

        console.warn('Show => ', this.state.is_show_dialog)
        const viewBoxSize = 65;
        const { left, top, zoom } = this.state;
        const resolution = viewBoxSize / Math.min(height, width);//.09//
        console.log('resolution=>' + resolution)

        return (

            <View  {...this._panResponder.panHandlers}>
                <Svg

                    width={width}
                    height={height}
                    viewBox="0 0 65 65"
                    preserveAspectRatio="xMinYMin meet">
                    <G
                        transform={{
                            translateX: left * resolution,
                            translateY: top * resolution,
                            scale: zoom,
                        }}>
                        {container}
                    </G>
                </Svg>

            </View>

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
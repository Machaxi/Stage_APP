import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { getRegisteredTournament, getTournamentFixture } from "../../redux/reducers/TournamentReducer";
import { connect } from 'react-redux';
import { getData } from "../../components/auth";
import { Card, ActivityIndicator, } from 'react-native-paper';
import BaseComponent, { defaultStyle } from '../BaseComponent'
import TournamentCategoryDialog from './TournamentCategoryDialog'


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



class TournamentFixture extends Component {

    constructor(props) {
        super(props)
        this.state = {
            array: [],
            tournament_fixtures: [],
            is_show_dialog: false

        }
        this.dialogRef = React.createRef();

        //let data = this.props.navigation.getParam('data')
        // this.setState({
        //     array : JSON.parse(data)
        // })s
        //this.state.array = JSON.parse(data)
        console.warn('Fxitrue data' + this.state.array)

        this.getFixtureData('3')
    }

    getFixtureData(tournament_id) {

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

    showFixture(id) {

        setTimeout(() => {
            this.setState({
                is_show_dialog: false
            })
            this.state.is_show_dialog = false
            console.warn('show -> ', this.state.is_show_dialog)
        }, 1000)
        if (id == undefined) {
            return
        }

        console.warn('ShowFixture = > ', id)

        let data = null
        let tournament_fixtures = this.state.tournament_fixtures
        for (let i = 0; i < tournament_fixtures.length; i++) {
            let obj = tournament_fixtures[i]
            if (obj.id == id) {
                data = obj
            }
        }

        if (data != null) {
            let fixture_data = data.tournament_matches

            console.log('fixture array ', fixture_data)

            let playerArray = []

            for (var key in fixture_data) {
                if (fixture_data.hasOwnProperty(key)) {
                    console.log("KEY = >", key)
                    //console.log(data[key].id);
                    let tournament_matches = fixture_data[key]

                    let count = 0
                    let subArray = []
                    for (let i = 0; i < tournament_matches.length; i++) {

                        let obj = tournament_matches[i]
                        let match_id = obj.id
                        console.log('match id => ', obj.id)
                        let player1 = obj.player1
                        let player2 = obj.player2



                        //subArray[count++] = player1
                        ///subArray[count++] = player2
                        if (player1 != null) {
                            subArray.push(player1)
                            player1['match_id'] = match_id
                        }

                        if (player2 != null) {
                            player2['match_id'] = match_id
                            subArray.push(player2)
                        }

                        if (obj.player1_match == null && player2 == null) {
                            let newplayer1 = { ...player1 }
                            newplayer1.name = "To be decided"
                            subArray.push(newplayer1)
                        }

                        //================================================
                        //special condition to check bye guy in first round only
                        if (playerArray.length == 1 && obj.player1_match == null) {

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
                                let temp_round1_array = [...playerArray[0]]
                                let newArray = []
                                newArray.push(byePlayer)
                                newArray.push(byePlayer)
                                temp_round1_array.map((element, index) => {
                                    console.warn('element => ', element)
                                    newArray.push(temp_round1_array[index])
                                })

                                //newArray = [...newArray,temp_round1_array]
                                playerArray[0] = newArray
                                //playerArray[0].push(byePlayer)
                                //playerArray[0].push(byePlayer)
                                console.warn('bye guy => ', + "player1 => " + player1.name)
                            }
                        }
                        //===================== END =============================

                    }
                    console.warn('subArray => ', JSON.stringify(subArray))
                    if (subArray.length > 0)
                        playerArray.push(subArray)

                }
            }
            console.log('Final => ', JSON.stringify(playerArray))

            this.setState({
                array: playerArray
            })
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

                container.push(
                    <Text
                        stroke="black"
                        strokeWidth="1"
                        fontSize="14"
                        fontFamily="Quicksand-Regular"
                        x={x + (width / 2) - 15}
                        y={10}
                    >Round {i + 1}</Text>
                )


                let check = false
                let pos = 0;
                let tempCenter = []
                for (let j = 0; j < row; j++) {

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
                        color = "#F6F6F6"
                    } else {
                        color = "#F1F1F1"
                    }

                    container.push(<Rect
                        key={"id_" + (i * 100 + j)}
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        stroke={borderColor}
                        strokeWidth="0"
                        rx="4"
                        ry="4"
                        onPress={() => {

                            console.warn("Match : " + array[i][j].match_id)
                            this.props.navigation.navigate('TournamentScorer', {
                                match_id: array[i][j].match_id
                            })
                        }}
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
                        container.push(
                            < Circle
                                cx={x + 10 + 10}
                                cy={y + 10 + 10}
                                r="12"
                                fill="#667DDB"
                            />)
                        container.push(
                            <Text
                                stroke="white"
                                strokeWidth="1"
                                fontSize="11"
                                fontFamily="Quicksand-Regular"
                                x={x + 13}
                                y={y + 24}
                            >{this.random()}</Text>
                        )

                        container.push(
                            <Text
                                stroke={textColor}
                                fontSize="12"
                                fontFamily="Quicksand-Regular"
                                x={x + 40}
                                y={y + 25}>
                                {array[i][j].name}
                            </Text>
                        )
                    }



                    //===============ADDING SCORE =============================
                    // for (k = 0; k < 2; k++) {

                    //     let bgColor
                    //     if (j % 2 == 0) {
                    //         if (k % 2 == 0)
                    //             bgColor = "#F5FFB8"
                    //         else
                    //             bgColor = color

                    //     } else {
                    //         if (k % 2 == 0)
                    //             bgColor = color
                    //         else
                    //             bgColor = "#F5FFB8"
                    //     }


                    //     container.push(
                    //         <Rect
                    //             x={x + width - 30 * (k + 1)}
                    //             y={y}
                    //             height={height}
                    //             width="30"
                    //             stroke="#DFDFDF"
                    //             strokeWidth=".5"
                    //             fill={bgColor} >

                    //         </Rect>
                    //     )

                    //     container.push(
                    //         <Text
                    //             stroke={textColor}
                    //             fontSize="12"
                    //             fontFamily="Quicksand-Regular"
                    //             x={x + width + 10 - (30 * (k + 1))}
                    //             y={y + 24}>
                    //             10
                    //         </Text>
                    //     )
                    // }




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
            }
        }

        if (this.props.data.loading && array.length == 0) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        return (
            <ScrollView contentContainerStyle={{ height: 1000 }}>
                <ScrollView horizontal contentContainerStyle={{ width: 1000 }}>

                    <TournamentCategoryDialog
                        tournament_fixture={this.state.tournament_fixtures}
                        touchOutside={(id) => {
                            this.state.is_show_dialog=false
                            // setTimeout(()=>{
                            //     this.showFixture(id)
                            // },200)
                            
                        }}
                        visible={this.state.is_show_dialog} />

                    <View style={{
                        flex: 1, width: '100%', height: '100%', marginTop: 50
                    }}>

                        {this.state.array.length != 0
                            ?
                            <Svg height="100%" width="100%">
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
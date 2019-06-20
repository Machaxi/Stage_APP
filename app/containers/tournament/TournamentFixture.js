import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';

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



export default class TournamentFixture extends Component {

    square(val) {
        return val * val
    }

    random() {
        return Math.floor(Math.random() * 90 + 10)
    }

    componentDidMount() {
    }

    render() {

        let array = [
            //["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H","A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"],
            //["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"],
            ["A", "B", "C", "D", "E", "F", "G", "H"],
            ["A", "C", "E", "H"],
            ["A", "E"]]

        let height = 40
        let width = 150
        let container = []
        let col = array.length
        let centerOfLast = []
        let marginLeft = 50
        let line = 30
        let borderColor = "black"
        let textColor = "black"

        for (let i = 0; i < col; i++) {

            let row = array[i].length
            let x = marginLeft * (i + 1) + (width * (i))

            let count = 0
            let space = 0;
            let topSpace = 0


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

                container.push(<Rect
                    key={"id_" + (i * 100 + j)}
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    stroke={borderColor}
                    strokeWidth="1"
                    onPress={() => {
                        console.warn("Round : " + (i + 1) + " Player : " + (j + 1))
                    }}
                    fill="pink">

                    />
                </Rect>)

                //==================== Adding content within cell  =======================

                container.push(
                    <Image
                        x={x + 10}
                        y={y + 10}
                        width="24"
                        height="24"
                        preserveAspectRatio="xMidYMid slice"
                        opacity="0.5"
                        href="https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Woman-15-512.png"
                    />
                )
                container.push(
                    <Text
                        stroke={textColor}
                        fontSize="12"
                        x={x + 40}
                        y={y + 25}>
                        Player {array[i][j]}
                    </Text>
                )

                container.push(
                    < Circle
                        cx={x + width - 16}
                        cy={y + 20}
                        r="12"
                        fill="#C4D58E"
                    />)

                container.push(
                    <Text
                        stroke={textColor}
                        fontSize="12"
                        x={x + width - 22}
                        y={y + 25}
                    >{this.random()}</Text>
                )

                // ================== END CONTENT ADDING  ==============================


                if (i != 0 && j % 2 == 1) {

                    //Left Line
                    container.push(<Line
                        x1={x - +marginLeft / 2}
                        y1={y}
                        x2={x}
                        y2={y}
                        stroke={borderColor}
                        strokeWidth="2"
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
                        strokeWidth="2"
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
                            strokeWidth="2"
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
                            strokeWidth="2"
                        />)
                    }
                }
                count = count + 1
            }

            centerOfLast = []
            centerOfLast = tempCenter
        }

        return (
            <ScrollView contentContainerStyle={{ height: 1000 }}>
                <ScrollView horizontal contentContainerStyle={{ width: 1000 }}>

                    <View style={{
                        flex: 1, width: '100%', height: '100%', marginTop: 50
                    }}>

                        <Svg height="100%" width="100%">
                            {container}

                        </Svg>
                    </View>

                </ScrollView>
            </ScrollView>

        );
    }
}



const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
});
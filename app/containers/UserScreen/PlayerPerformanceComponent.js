import React from 'react'

import { View, ScrollView, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Image, TextInput } from 'react-native'
import { SwitchButton, CustomeButtonB } from '../../components/Home/SwitchButton'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { getData, storeData } from "../../components/auth";
import { getAcademyListing, getPlayerRewardDue, saveParentRewardData } from "../../redux/reducers/RewardReducer";
import { connect } from 'react-redux';
import moment from 'moment'
import { Card } from 'react-native-paper';
//import { ECharts } from 'react-native-echarts-wrapper';
import YouTube from 'react-native-youtube';
import { WebView } from 'react-native-webview';


class PlayerPerformanceComponent extends BaseComponent {

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
            player_history: [],
            error: '',
            height: 301,
            answer: '',
            question: ''
        }

    }

    componentDidMount() {
        console.log('hiiiiiiiiiiiiiiiiii', this.props.jumpTo)
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    answerModal() {
        return (

            <View style={{ backgroundColor: '#F7F7F7' }}>
                <Modal animationType="none" transparent={true} visible={this.state.modalVisible}>
                    <View style={styles.modalOuter}>
                        <View style={styles.modalBox}>
                            <View style={styles.modalHeadingOuter}>
                                <Text></Text>
                                <Text style={[defaultStyle.bold_text_14, styles.modalHeadingText]}>{this.state.question}</Text>

                                <TouchableOpacity activeOpacity={.8} onPress={() => { this.setModalVisible(false); }}>
                                    <Image style={styles.closeImg} source={require('../../images/ic_close.png')} />
                                </TouchableOpacity>




                            </View>
                            <ScrollView>
                                <Text style={styles.answerText}>{this.state.answer}</Text>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>


        )

    }

    _renderItem = ({ item }) => (
        <View>
            <Card style={[styles.performanceCard, { marginTop: 14 }]}>
                <Text style={styles.reportCardheadingText}>Report</Text>
                <View style={styles.scoreBestLabelOuter}>
                    <Text style={styles.scoreLabel}>Score</Text>
                    <Text style={styles.bestScoreLabel}>Best(Batch) Score</Text>
                </View>
                <View style={styles.scoreBestValueOuter}>
                    <View style={styles.scoreValueOuter}>
                        <Text style={styles.scoreValue}>{item.current_parameter.score}</Text>
                        {
                            item.current_parameter.prev_score != 0 &&
                            <View style={{ flexDirection: 'row' }}>

                                {


                                    ((item.current_parameter.prev_score - item.current_parameter.score) != 0 ?

                                        ((item.current_parameter.prev_score > item.current_parameter.score) ?

                                            <Image style={styles.triangleImg} source={require('../../images/triangle_red.png')} /> :

                                            <Image style={styles.triangleImg} source={require('../../images/triangle_green.png')} />)

                                        : <Image style={[styles.triangleImg, { opacity: 0 }]} source={require('../../images/triangle_red.png')} />

                                    )

                                }


                                {
                                    (item.current_parameter.prev_score > item.current_parameter.score) ?
                                        <Text style={styles.scoreMinValue}>{item.current_parameter.prev_score - item.current_parameter.score} </Text> :
                                        <Text style={styles.scoreMinValue}>{item.current_parameter.score - item.current_parameter.prev_score} </Text>
                                }


                            </View>
                        }

                    </View>
                    <Text style={styles.bestScoreValue}>{item.current_parameter.batch_best_score}</Text>
                </View>
            </Card>
            <Card style={[styles.performanceCard, { paddingBottom: 40 }]}>
                <Text style={styles.reportCardheadingText}>Me vs My Batch</Text>
                <View style={{ width: '100%', height: 300 }}>
                    <ECharts
                        style={{ width: '100%' }}
                        option={option}></ECharts>
                </View>
            </Card>
            <Card style={styles.performanceCard}>
                <View style={{ width: '100%', height: 300 }}>

                    {
                        <WebView
                            source={{ uri: `https://www.youtube.com/embed/${item.attribute.intro_video_url.split('=')[1]}` }}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                        />
                    }





                    {/* <YouTube
                    apiKey='AIzaSyAFWt-p6Wz0mk7RYyR_amCJUQhojnePTSg'
                    videoId='wF_B_aagLfI'   // The YouTube video ID
                    controls={1}
                    play={true}
                    onReady={e => {
                        this.setState({ height: 300 });
                        this.setState({ isReady: true });

                    }}
                    onChangeState={e => this.setState({ status: e.state })}
                    onChangeQuality={e => this.setState({ quality: e.quality })}
                    onError={e => {
                        console.log('e.error', e.error);
                        this.setState({ error: e.error })
                    }}

                    style={{ alignSelf: 'stretch', height: this.state.height }}
                /> */}

                </View>
                <View style={{ backgroundColor: '#EFEFEF', borderRadius: 12, height: 36, marginTop: 12, padding: 10, flexDirection: 'row' }}>
                    <Image source={require('../../images/shape.png')} />
                    <View style={{ height: 19, width: 1, borderWidth: 1, borderColor: '#DFDFDF', marginLeft: 17, marginRight: 17 }}></View>
                    <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 11, color: '#A3A5AE' }}>{item.attribute.intro_video_url}</Text>
                </View>
            </Card>

            {
                item.attribute.qa.map((element, index) => {

                    return (
                        <Card style={[styles.performanceCard, { marginBottom: 14 }]} onPress={() => {

                            this.setState({
                                question: element.question,
                                answer: element.answer
                            }, () => {
                                this.setModalVisible(true);
                            });
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../images/info-bulb.png')} />
                                <View style={{ height: 25, width: 1, borderWidth: 1, borderColor: '#DFDFDF', marginLeft: 17, marginRight: 17 }}></View>
                                <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 14, color: '#404040' }}>{element.question}</Text>
                            </View>
                        </Card>
                    )
                })
            }


        </View>
    );


    render() {

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        let labels = [];
        let my_score = [];
        let batch_avg = [];
        let batch_best = [];


        this.props.jumpTo.current_parameter.graph_data.map((element, index) => {
            console.log('element.month', months[element.month - 1]);
            labels.push(months[element.month - 1]);
            my_score.push(element.self_score)
            batch_avg.push(element.avg_score)
            batch_best.push(element.best_score)
        })



        config = {
            rotate: 90,
            align: 'left',
            verticalAlign: 'middle',
            position: 'top',
            distance: 5,
        };

        labelOption = {
            normal: {
                show: true,
                position: config.position,
                distance: config.distance,
                align: config.align,
                verticalAlign: config.verticalAlign,
                //rotate: config.rotate,
                formatter: '{c}',
                color: '#7D955C',
                fontSize: 8,
                fontFamily: 'Quicksand-Regular'
                // rich: {
                //     name: {
                //         textBorderColor: 'red'
                //     }
                // }
            }
        };

        option = {
            color: ['#5E9AFD', '#FFA800', '#76D190'],
            // tooltip: {
            //     trigger: 'axis',
            //     axisPointer: {
            //         type: 'shadow'
            //     }
            // },
            legend: {
                data: ['My Score', 'Batch Average', 'Batch Best'],
                bottom: 0.1,
                itemWidth: 14,
                icon: 'rect',
                textStyle: {
                    color: '#b2b2b2',
                },
                padding: [
                    40,  // up
                    40, // right
                    -5,  // down
                    40, // left
                ]
            },
            grid: {
                top: 40
            },
            // toolbox: {
            //     show: true,
            //     orient: 'vertical',
            //     left: 'right',
            //     top: 'center',
            //     feature: {
            //         mark: { show: false },
            //         dataView: { show: false, readOnly: false },
            //         magicType: { show: false, type: ['line', 'bar', 'stack', 'tiled'] },
            //         restore: { show: false },
            //         saveAsImage: { show: false }
            //     }
            // },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    axisTick: { show: false },
                    data: labels,
                    axisLine: {
                        lineStyle: {
                            color: '#B6B6B6'
                        }
                    },
                    axisLabel: {
                        color: '#707070',
                        margin: 15
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    offset: -7,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#B6B6B6'
                        }
                    },
                    axisLabel: {
                        color: '#707070',
                    }
                }
            ],
            series: [
                {
                    name: 'My Score',
                    type: 'bar',
                    barGap: '90%',
                    barWidth: 7,
                    label: labelOption,
                    data: my_score

                },
                {
                    name: 'Batch Average',
                    type: 'bar',
                    barWidth: 7,
                    label: labelOption,
                    data: batch_avg
                },
                {
                    name: 'Batch Best',
                    type: 'bar',
                    barWidth: 7,
                    barCategoryGap: '70%',
                    label: labelOption,
                    data: batch_best
                }

            ]
        };

        let data = [this.props.jumpTo];

        return (


            <View style={styles.performanceContainer}>
                <FlatList
                    data={data}
                    renderItem={this._renderItem}
                />
                {this.answerModal()}
            </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPerformanceComponent);


const styles = StyleSheet.create({
    performanceContainer: {
        flex: 1,
        fontFamily: 'Quicksand-Regular',
        backgroundColor: '#F7F7F7',
    },
    performanceCard: {
        borderRadius: 16,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 7,
        marginBottom: 7,
        elevation: 2,
        paddingHorizontal: 12,
        paddingVertical: 16
    },
    videoPlayerCard: {
        borderRadius: 16,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 14,
        elevation: 2,
    },
    reportCardheadingText: {
        fontSize: 10,
        color: '#404040',
        marginRight: 10,
        fontFamily: 'Quicksand-Medium',
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF',
        paddingBottom: 9
    },
    scoreBestLabelOuter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12
    },
    scoreLabel: {
        fontSize: 10,
        color: '#A3A5AE',
        width: '50%',
        fontFamily: 'Quicksand-Medium'
    },
    bestScoreLabel: {
        fontSize: 10,
        color: '#A3A5AE',
        width: '50%',
        fontFamily: 'Quicksand-Medium'
    },
    scoreBestValueOuter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    scoreValueOuter: {
        display: 'flex',
        flexDirection: 'row',
        width: '50%',
    },
    scoreValue: {
        fontSize: 20,
        color: '#404040',
        fontFamily: 'Quicksand-Regular'
    },
    scoreMinValue: {
        fontSize: 16,
        color: '#404040',
        fontFamily: 'Quicksand-Regular',
        marginTop: 5,
    },
    bestScoreValue: {
        fontSize: 20,
        color: '#404040',
        width: '50%',
        fontFamily: 'Quicksand-Regular'
    },
    triangleImg: {
        height: 7,
        width: 13,
        marginTop: 17,
        marginLeft: 15,
        marginRight: 5
    },
    closeImg: {
        height: 30,
        width: 30,
    },
    modalOuter: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        paddingVertical: 16
    },
    modalBox: {
        width: "95%",
        //margin: 16,
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 16,
        backgroundColor: 'white',
        height: 470,
    },
    modalHeadingOuter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        //marginTop: 10,
    },
    modalHeadingText: {
        color: '#000000',
        fontFamily: 'Quicksand-Bold'
    },
    answerText: {
        fontFamily: 'Quicksand-Regular'
    }
}
);
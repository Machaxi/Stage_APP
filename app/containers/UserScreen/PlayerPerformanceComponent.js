import React from 'react'

import { View, ScrollView, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Image, TextInput } from 'react-native'
import { SwitchButton, CustomeButtonB } from '../../components/Home/SwitchButton'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { getData, storeData } from "../../components/auth";
import { getAcademyListing, getPlayerRewardDue, saveParentRewardData } from "../../redux/reducers/RewardReducer";
import { connect } from 'react-redux';
import moment from 'moment'
import { Card } from 'react-native-paper';
import { ECharts } from 'react-native-echarts-wrapper';
import YouTube from 'react-native-youtube'

config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'top',
    distance: 15,
};

var labelOption = {
    normal: {
        show: true,
        position: config.position,
        distance: config.distance,
        align: config.align,
        verticalAlign: config.verticalAlign,
        rotate: config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
            name: {
                textBorderColor: '#fff'
            }
        }
    }
};

option = {
    color: ['#869BDA', '#FCAB04', '#51DB8E'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['My Score', 'Batch Average', 'Batch Best']
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            mark: { show: false },
            dataView: { show: false, readOnly: false },
            magicType: { show: false, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: false },
            saveAsImage: { show: false }
        }
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            axisTick: { show: false },
            data: ['May', 'June', 'July', 'Aug', 'Sept', 'Oct']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            data: [50, 60, 70, 80, 20, 30]
        },
        {
            name: '',
            type: 'bar',
            label: labelOption,
            data: [85, 75, 65, 55, 40, 50]
        },
        {
            name: '',
            type: 'bar',
            label: labelOption,
            data: [90, 80, 70, 60, 60, 70]
        }

    ]
};

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
            error:'',
            height: 301
        }

    }

    componentDidMount() {

    }

    _renderItem = ({ item }) => (
        <View>
            <Card style={styles.performanceCard}>
                <Text style={styles.reportCardheadingText}>Report</Text>
                <View style={styles.scoreBestLabelOuter}>
                    <Text style={styles.scoreLabel}>Score</Text>
                    <Text style={styles.bestScoreLabel}>Best Score</Text>
                </View>
                <View style={styles.scoreBestValueOuter}>
                    <View style={styles.scoreValueOuter}>
                        <Text style={styles.scoreValue}>65</Text>
                        <Image style={styles.triangleImg} source={require('../../images/triangle_red.png')} />
                        <Text style={styles.scoreMinValue}>10</Text>
                    </View>
                    <Text style={styles.bestScoreValue}>80</Text>
                </View>
            </Card>
            <Card style={styles.performanceCard}>
                <Text style={styles.reportCardheadingText}>Me vs My Batch</Text>
                <View style={{ width: '100%', height: 300 }}>
                    <ECharts
                        style={{ width: '100%', height: 300 }}
                        option={option}></ECharts>
                </View>
            </Card>
            <Card style={styles.performanceCard}>
                <View style={{ width: '100%', height: 300 }}>
                    
                </View>
            </Card>
        </View>
    );


    render() {

        let data = [{ 'name': 'Deepika' }];

        return (


            <View style={styles.performanceContainer}>
                <YouTube
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
                        this.setState({ error: e.error })}}

                        style={{ alignSelf: 'stretch', height: this.state.height }}
                    />
                <FlatList
                    data={data}
                    renderItem={this._renderItem}
                />
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
        marginTop: 14,
        elevation: 2,
        paddingHorizontal: 12,
        paddingVertical: 16
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
    }
}
);
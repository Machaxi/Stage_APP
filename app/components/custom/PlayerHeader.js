import React from "react";
import { Header } from "react-navigation";
import { View, Platform, Text, TouchableOpacity, Image, ImageBackground, Dimensions, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import BaseComponent, { defaultStyle, bebas_text_blue_10, getFormattedLevel } from "../../containers/BaseComponent";

var deviceWidth = Dimensions.get('window').width - 20;

export default class PlayerHeader extends BaseComponent {

    constructor(props) {
        super(props);
    }

    render() {

        const { name, academy_name, badge, rank, score, player_level, reward_point, player_category, operations } =
            this.props.player_profile


        return (
            <View style={{ width: '100%', height: 300, }}>
                {/* <ImageBackground
                
                    source={require('../../images/RectangleImg.png')}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}> */}

                <LinearGradient
                    colors={['#332B70', '#24262A']}
                    style={{ flex: 1 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 2.5, y: 0 }}
                >
                    {/* <CustomHeader title="Navdeep's Academy ▼ " showBackArrow={true}
                                navigation={this.props.navigation} /> */}

                    <View style={{ position: 'relative', marginTop: 30 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../../images/playerimg.png')}
                                style={{
                                    width: 201,
                                    height: 238, marginRight: 20, marginTop: 0, display: 'flex'
                                }}>

                            </Image>
                            <View style={{ display: 'flex', flex: 1, marginBottom: 100 }}>
                                <Text style={{
                                    color: 'white',
                                    marginRight: 0,
                                    fontFamily: 'Quicksand-Bold',
                                    textAlign: 'center', fontSize: 22,
                                }}
                                    numberOfLines={1}
                                >{name}</Text>


                                <View style={{
                                    width: 119,
                                    height: 84,
                                    alignItems: 'center',
                                    display: 'flex',
                                    marginBottom: 20,
                                    marginTop: 20,
                                    justifyContent: 'center', alignItems: 'center',
                                }}>

                                    <ImageBackground
                                        style={{
                                            height: 85, width: 57, justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        source={require('../../images/batch_pink.png')}>


                                        <View style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            borderRadius: 2,
                                            backgroundColor: '#485FA0', height: 26, width: '110%'
                                        }}>
                                            <Image style={{ height: 18, width: 20, }}
                                                source={require('../../images/left_batch_arrow.png')}></Image>

                                            <Text style={
                                                [defaultStyle.bebas_text_blue_10,
                                                {
                                                    width: '100%',
                                                    textAlign: 'center',
                                                }]
                                            }>{badge}</Text>
                                            <Image style={{ height: 18, width: 20, }}
                                                source={require('../../images/right_batch_arrow.png')}></Image>

                                        </View>
                                    </ImageBackground>




                                </View>
                                {/* <Image source={require('../../images/Rank.png')}
                                            style={{
                                                width: 119,
                                                height: 84,
                                                alignItems: 'center',
                                                display: 'flex',
                                                marginBottom: 20,
                                                marginTop: 20
                                            }}>

                                        </Image> */}
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 10
                                }}>
                                    <Text style={{
                                        color: 'white',
                                        marginRight: 10,
                                        textAlign: 'center',
                                        fontSize: 12,
                                        fontFamily: 'Quicksand-Medium',

                                    }}>{getFormattedLevel(player_level)}</Text>
                                    <View
                                        style={{
                                            backgroundColor: 'red',
                                            width: 36,
                                            height: 22,
                                            borderRadius: 4,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: 20,
                                            marginTop: -5
                                        }}>
                                        <Text style={{
                                            color: 'white',
                                            marginRight: 0,
                                            textAlign: 'center',
                                            fontSize: 12,
                                            fontFamily: 'Quicksand-Bold',
                                        }}> {player_category} </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            position: 'absolute',
                            bottom: 20,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            selfAlign: 'center'
                        }}>
                            {console.log("width", deviceWidth / 3)}
                            <View style={{
                                width: deviceWidth / 3,
                                height: 80, marginLeft: 10
                            }}>

                                <ImageBackground source={require('../../images/box.png')}
                                    style={{
                                        width: '100%',
                                        height: 80,
                                    }}>

                                    <Text style={styles.box_label}>Rank</Text>
                                    {rank ? <Text style={styles.scoreBox}>{rank}</Text> : <Text style={styles.scoreBox}>00</Text>}


                                </ImageBackground>

                            </View>
                            <ImageBackground source={require('../../images/box.png')}
                                style={{
                                    width: deviceWidth / 3,
                                    height: 80,
                                }}>
                                <Text style={styles.box_label}>Score</Text>
                                {score ? <Text style={styles.scoreBox}>{score}</Text> : <Text style={styles.scoreBox}>00</Text>}

                            </ImageBackground>


                            <View style={{
                                width: deviceWidth / 3,
                                height: 80, marginRight: 0
                            }}>
                                <ImageBackground source={require('../../images/box.png')}
                                    style={{
                                        width: '100%',
                                        height: 80,
                                    }}>

                                    <Text style={styles.box_label}>Reward</Text>
                                    {reward_point ? <Text style={styles.scoreBox}>{reward_point}</Text> : <Text style={styles.scoreBox}>00</Text>}


                                </ImageBackground>

                            </View>


                        </View>


                    </View>
                </LinearGradient>

            </View>
        )

    }
}
const styles = StyleSheet.create({
    scoreBox: {
        color: 'white',
        marginRight: 20,
        marginBottom: 20,
        textAlign: 'right',
        fontSize: 24,
        fontFamily: 'Quicksand-Bold'
    },
    box_label: {
        fontFamily: 'Quicksand-Medium',
        marginLeft: 18,
        marginTop: 15,
        color: '#F4F4F4',
        fontSize: 12,
    }


});
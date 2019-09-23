import React from "react";
import { Header } from "react-navigation";
import { View, Platform, Text, TouchableOpacity, Image, ImageBackground, Dimensions, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import BaseComponent, {
    defaultStyle,
    getFormattedBadge,
    bebas_text_blue_10, getFormattedCategory, getFormattedLevel, formattedName
} from "../../containers/BaseComponent";
import FastImage from 'react-native-fast-image'

var deviceWidth = Dimensions.get('window').width - 20;

export default class PlayerHeader extends BaseComponent {

    constructor(props) {
        super(props);
    }

    render() {

        const { name, academy_name, badge, rank, score,
            player_level,
            reward_point,
            profile_pic,
            player_category, operations } =
            this.props.player_profile

        // let is_toolbar = this.props.is_toolbar
        // console.warn('is_toolbar = ',is_toolbar)
        // if (is_toolbar == undefined)
        //     is_toolbar = false

        let is_toolbar = false
        let bg_img = require('../../images/toolbar_bottom.png')//require('../../images/RectangleImg.png')
        if (is_toolbar) {
            bg_img = require('../../images/toolbar_bottom.png')
        }

        let newName = formattedName(name)

        return (
            <View style={{ width: '100%', height: 290, }}>
                <ImageBackground
                    source={bg_img}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}>

                    {/* <LinearGradient
                    colors={['#332B70', '#24262A']}
                    style={{ flex: 1 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 2.5, y: 0 }}
                > */}
                    {/* <CustomHeader title="Navdeep's Academy ▼ " showBackArrow={true}
                                navigation={this.props.navigation} /> */}

                    <View style={{ position: 'relative', marginTop: 8 }}>
                        <View style={{ flexDirection: 'row' }}>
                            {/* <Image source={{ uri: profile_pic }}
                                resizeMode="contain"
                                style={{
                                    width: 201,
                                    height: 238, marginRight: 20, marginTop: 0, display: 'flex'
                                }}> 
                                </Image>*/}

                            <FastImage
                                resizeMode={FastImage.resizeMode.contain}
                                style={{
                                    width: 201,
                                    height: 238, marginRight: 20, marginTop: 0, display: 'flex'
                                }}
                                source={{ uri: profile_pic }}
                            />

                            <View style={{ display: 'flex', flex: 1, marginBottom: 120 }}>
                                <Text style={{
                                    width: 120,
                                    color: 'white',
                                    marginRight: 0,
                                    textAlign: 'center',
                                    fontFamily: 'Quicksand-Bold',
                                    fontSize: 28,
                                }}
                                    numberOfLines={1}
                                >{newName}</Text>


                                <ImageBackground
                                    resizeMode="contain"
                                    style={{
                                        marginBottom: 20,
                                        marginTop: 8,
                                        height: 80,
                                        width: 120
                                    }}
                                    source={require('../../images/single_shield.png')}


                                >

                                    <View style={{
                                        alignItems: 'center',
                                        marginTop: 33,
                                    }}>

                                        <Text style={
                                            [defaultStyle.bebas_text_blue_10,
                                            {
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 60,
                                                height: 20,
                                                textAlign: 'center',
                                            }]
                                        }>{getFormattedBadge(badge)}</Text>


                                    </View>
                                </ImageBackground>


                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 10,
                                    marginLeft: 10,
                                }}>
                                    <Text style={{
                                        color: 'white',
                                        marginRight: 10,
                                        textAlign: 'center',
                                        fontSize: 11,
                                        fontFamily: 'Quicksand-Medium',

                                    }}>{getFormattedLevel(player_level)}</Text>
                                    <View
                                        style={{
                                            backgroundColor: 'red',
                                            paddingLeft: 6,
                                            paddingRight: 6,
                                            height: 22,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: 20,
                                            borderRadius: 2

                                        }}>
                                        <Text style={{
                                            color: 'white',
                                            marginRight: 0,
                                            textAlign: 'center',
                                            fontSize: 11,
                                            fontFamily: 'Quicksand-Bold',
                                        }}>{getFormattedCategory(player_category)}</Text>
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
                                height: 100, marginLeft: 10
                            }}>

                                <ImageBackground source={require('../../images/box.png')}
                                    style={{
                                        width: '100%',
                                        height: 100,
                                    }}>

                                    <Text style={styles.box_label}>Rank</Text>
                                    {rank ? <Text style={styles.scoreBox}>{rank}</Text> : <Text style={styles.scoreBox}>00</Text>}


                                </ImageBackground>

                            </View>
                            <ImageBackground source={require('../../images/box.png')}
                                style={{
                                    width: deviceWidth / 3,
                                    height: 100,
                                }}>
                                <Text style={styles.box_label}>Score</Text>
                                {score ? <Text style={styles.scoreBox}>{score}</Text> : <Text style={styles.scoreBox}>00</Text>}

                            </ImageBackground>


                            <View style={{
                                width: deviceWidth / 3,
                                height: 100, marginRight: 0
                            }}>
                                <ImageBackground source={require('../../images/box.png')}
                                    style={{
                                        width: '100%',
                                        height: 100,
                                    }}>

                                    <Text style={styles.box_label}>Reward</Text>
                                    {reward_point ? <Text style={styles.scoreBox}>{reward_point}</Text> : <Text style={styles.scoreBox}>00</Text>}


                                </ImageBackground>

                            </View>


                        </View>


                    </View>
                </ImageBackground>

            </View >
        )

    }
}
const styles = StyleSheet.create({
    scoreBox: {
        color: 'white',
        marginRight: 20,
        marginTop: 16,
        marginBottom: 20,
        textAlign: 'right',
        fontSize: 24,
        fontFamily: 'Quicksand-Bold'
    },
    box_label: {
        fontFamily: 'Quicksand-Medium',
        marginLeft: 18,
        marginTop: 16,
        color: '#F4F4F4',
        fontSize: 12,
    }


});
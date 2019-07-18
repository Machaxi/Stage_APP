import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, Platform, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';

import Swiper from 'react-native-swiper'

export default class IntroPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sliderData: [
                require('../../images/boarding_1.png'),
                require('../../images/boarding_2.png'),
                require('../../images/boarding_3.png'),
                require('../../images/boarding_4.png'),
                require('../../images/boarding_5.png'),
                require('../../images/boarding_6.png'),
                require('../../images/boarding_7.png'),
            ],
            selectedIndex: 1,
            label: 1,
        }
    }

    onPress() {

        if (this.state.label == this.state.sliderData.length) {
            this.props.navigation.navigate('Login')
        } else {
            this.swiper.scrollBy(this.state.selectedIndex)
        }
    }


    updateState(index) {
        this.setState({
            label: index + 1
        })
    };


    render() {
        return (
            <View style={styles.container}>
                {/* <SliderImage slider={this.state.sliderData}

                    onButtonPress={(catId) => this.onButtonPress(catId)} /> */}
                <Swiper style={styles.wrapper}
                    ref={ref => this.swiper = ref}
                    showsPagination={false}
                    onIndexChanged={this.updateState.bind(this)}
                    loop={false} >
                    {
                        this.state.sliderData.map((item, index) => {
                            return (
                                <Image key={index}
                                    source={item}
                                    style={styles.sliderImage} />
                            )
                        })
                    }
                </Swiper>
                <View
                    style={{
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 6,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>

                    <TouchableOpacity
                        style={{ height: 20, width: 50 }}
                        onPress={() => {
                            this.props.navigation.navigate('Login')
                        }}
                    >
                        <Text style={{
                            color: '#667DDB',
                            fontFamily: 'Quicksand-Regular',
                            fontSize: 14,
                        }}>
                            SKIP
                    </Text>
                    </TouchableOpacity>

                    <Text style={{
                        color: '#BDBDBD',
                        fontFamily: 'Quicksand-Regular',
                        fontSize: 14,
                    }}>
                        {this.state.label}/{this.state.sliderData.length}
                    </Text>

                    <TouchableOpacity
                        style={{ height: 30, width: 60, alignItems: 'flex-end' }}
                        activeOpacity={.8}
                        onPress={() => {
                            this.onPress()
                        }}
                    >

                        <Image
                            style={{ width: 19, height: 13, }}
                            source={require('../../images/path.png')}
                        ></Image>
                    </TouchableOpacity>


                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: "100%",
    },
    wrapper: {
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    sliderImage: {
        width: "100%",
        height: "100%",
        alignItems:'center',
        flex:1,
        resizeMode: 'stretch',
    }
});



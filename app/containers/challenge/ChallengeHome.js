import React from 'react'
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import DashboardRoute from './DashboardRoute'
import RegisteredRoute from '../tournament/RegisteredRoute'
import ResultsRoute from '../tournament/ResultsRoute'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { Button } from 'react-native-paper';
import firebase from "react-native-firebase";
import { onSignOut } from "../../components/auth";
//import firebase from 'react-native-firebase';

class ChallengeHome extends BaseComponent {


    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Dashboard' },
            { key: 'second', title: 'Your results' },
            { key: 'third', title: 'Leader board' }
        ],
    };

    constructor(props) {
        super(props)
    }

    _handleIndexChange = index => this.setState({ index });

    _renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const color = Animated.color(
                        Animated.round(
                            Animated.interpolate(props.position, {
                                inputRange,
                                outputRange: inputRange.map(inputIndex =>
                                    inputIndex === i ? 255 : 0
                                ),
                            })
                        ),
                        0,
                        0
                    );

                    return (
                        <TouchableOpacity
                            indicatorStyle={{ backgroundColor: '#00887A' }}
                            labelStyle={{ color: '#000000' }}
                            style={styles.tabItem}
                            onPress={() => this.setState({ index: i })}>
                            <Animated.Text style={{ color }}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    _renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'first':
                return <DashboardRoute navigation={this.props.navigation} />
            case 'second':
                return <RegisteredRoute navigation={this.props.navigation} />
            case 'third':
                return <ResultsRoute navigation={this.props.navigation} />
        }
    };


    render() {
        return (
            <TabView

                navigationState={this.state}
                renderScene={this._renderScene}
                renderTabBar={props =>
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: '#667DDB', height: 4 }}
                        style={{ backgroundColor: 'white', elevation: 0 }}
                        labelStyle={{ color: '#404040', fontFamily: 'Quicksand-Regular', }}
                    />
                }
                onIndexChange={this._handleIndexChange}
            />
        );
    }

}
export default ChallengeHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
});

// const style = {
//     buttonStyle: {

//         backgroundColor: '#FF7860',
//         borderRadius: 5,
//         height: 50,
//         width: 150,
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontFamily: 'Lato-Regular',

//     },
//     buttonStyleLogin: {

//         backgroundColor: '#00B4C4',
//         borderRadius: 5,
//         height: 50,
//         width: 150,
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontFamily: 'Lato-Regular',

//     },
//     textStyle: {
//         alignSelf: 'center',
//         color: '#ffffff',
//         fontSize: 16,
//         fontWeight: '600',
//         paddingBottom: 10,
//         paddingTop: 10

//     }
// }
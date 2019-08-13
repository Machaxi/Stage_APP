import React from 'react'

import ChallengeHome from '../containers/challenge/ChallengeHome'
import OpponentList from '../containers/challenge/OpponentList'
import { createStackNavigator } from "react-navigation";
import TournamentTabs from "../containers/tournament/TournamentTabs";
import NavigationDrawerStructure from './NavigationDrawerStructure'
import RightMenuToolbar from "./RightMenuToolbar";
import { StyleSheet, TouchableOpacity, Text } from "react-native";


const userChallengeModule = createStackNavigator({


    ChallengeHome: {
        screen: ChallengeHome,
        navigationOptions: ({ navigation }) => ({
            title: 'Challenge',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showDrawer={true}
                showBackAction={false}
            />,

            headerRight: (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('SwitchPlayer')
                    }}
                    activeOpacity={.8}
                >
                    <Text
                        style={{
                            marginRight: 12,
                            fontFamily: 'Quicksand-Regular',
                            fontSize: 10,
                            color: '#667DDB'
                        }}
                    >Switch Player</Text>
                </TouchableOpacity>

            ),
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),

    },
    OpponentList: {
        screen: OpponentList,
        navigationOptions: ({ navigation }) => ({
            title: 'Select Opponent',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showDrawer={true}
                showBackAction={true}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={false} />,

            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),

    }

}
);

export default userChallengeModule;

const style = StyleSheet.create({
    headerStyle: {
        color: '#191919',
        fontFamily: 'Quicksand-Medium',
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 16,
        flexGrow: 1,
        alignSelf: 'center',
    }
})
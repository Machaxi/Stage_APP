import React from 'react'

import { createStackNavigator } from "react-navigation";
import mybatch from "../containers/PlayerBatch/PlayerBatch";
import PlayersListing from "../containers/GuestScreen/PlayersListing";
import AppMain from "./router";
import NavigationDrawerStructure from './NavigationDrawerStructure'
import RightMenuToolbar from "./RightMenuToolbar";
import { StyleSheet } from "react-native";
import PlayerAttendance from "../containers/PlayerBatch/MyCalendar"
import CoachProfileDetail from '../containers/GuestScreen/CoachProfileDetail'
import otherplayerDetails from '../containers/OtherPlayerDetails/OtherPlayerDetails'

const userBatchModule = createStackNavigator({

    // mybatch: {
    //     screen: mybatch,
    //     // navigationOptions: ({ navigation }) => ({
    //     //     title: "My Batch",
    //     //     headerLeft: <NavigationDrawerStructure navigationProps={navigation}
    //     //         showBackAction={false}
    //     //     />,
    //     //     headerRight: <RightMenuToolbar navigationProps={navigation}
    //     //         navigation={navigation} showHome={false} />,
    //     //     headerTitleStyle: {
    //     //         color: 'black'
    //     //     },
    //     //     // headerStyle: {
    //     //     //     elevation: 0, shadowOpacity: 0, borderBottomWidth: 0,
    //     //     //
    //     //     // },


    //     // })
    // },
    MyBatch: {
        screen: mybatch,

    },
    CoachProfileDetail: {
        screen: CoachProfileDetail,
        navigationOptions: ({ navigation }) => ({
            title: "Coach Profile",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={true} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })

    },

    PlayersListing: {
        screen: PlayersListing,
        navigationOptions: ({ navigation }) => ({
            title: "My Batchmates",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={false} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })
    },
    PlayerAttendance: {
        screen: PlayerAttendance,
        navigationOptions: ({ navigation }) => ({
            title: 'My Attendance',
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

    },
    OtherPlayerDeatils: {
        screen: otherplayerDetails,
        navigationOptions: ({ navigation }) => ({
            title: "Player Detail",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showDrawer={false} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={false} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })
    },

}
);
export default userBatchModule;


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
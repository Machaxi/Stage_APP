import React from 'react'

import { createStackNavigator } from "react-navigation";
import mybatch from "../containers/PlayerBatch/PlayerBatch";
import PlayersListing from "../containers/GuestScreen/PlayersListing";
import AppMain from "./router";
import NavigationDrawerStructure from './NavigationDrawerStructure'
import RightMenuToolbar from "./RightMenuToolbar";
import { StyleSheet } from "react-native";

const userBatchModule = createStackNavigator({

    UserHome: {
        screen: mybatch,
        // navigationOptions: ({ navigation }) => ({
        //     title: "My Batch",
        //     headerLeft: <NavigationDrawerStructure navigationProps={navigation}
        //         showBackAction={false}
        //     />,
        //     headerRight: <RightMenuToolbar navigationProps={navigation}
        //         navigation={navigation} showHome={false} />,
        //     headerTitleStyle: {
        //         color: 'black'
        //     },
        //     // headerStyle: {
        //     //     elevation: 0, shadowOpacity: 0, borderBottomWidth: 0,
        //     //
        //     // },


        // })
    },
    PlayersListing: {
        screen: PlayersListing,
        navigationOptions: ({ navigation }) => ({
            title: "Players Listing",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={true} />,
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
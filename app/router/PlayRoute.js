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
import CoachListing from '../containers/GuestScreen/CoachListing'
import ViewPlayerPerformance from '../containers/UserScreen/ViewPlayerPerformance'

import PlayScreen from '././../containers/play/PlayScreen';
import NavigationDrawerWhite from './NavigationDrawerWhite';



const playModule = createStackNavigator({
    Play: {
        screen: PlayScreen,
        navigationOptions: ({ navigation }) => ({
            title: "PLay",
            headerLeft: <NavigationDrawerWhite navigationProps={navigation}
            showBackAction={false} showDrawer={true}
        />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showNotification={true} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#21202F',
            },

        })
    },
        // navigationOptions = ({ navigation }) => {
        //     return {
        //         headerTitle: 'Vidushi',
        //         headerTitleStyle: defaultStyle.headerStyle,
        
        //         headerLeft: (
        //             <TouchableOpacity
        //                 onPress={() => {
        //                     navigation.toggleDrawer();
        //                 }}
        //                 style={{padding: 7}}
        //                 activeOpacity={.8}>
        //                 <Image
        //                     source={require('../../images/hamburger.png')}
        //                     style={{ width: 20, height: 16, marginLeft: 12 }}
        //                 />
        //             </TouchableOpacity>
        //         ),
        //         headerRight: (
        //             <TouchableOpacity
        //                 onPress={() => {
        //                     navigation.navigate('SwitchPlayer')
        //                 }}
        //                 activeOpacity={.8}
        //             >
        //                 <Text
        //                     style={{
        //                         marginRight: 12,
        //                         fontFamily: 'Quicksand-Regular',
        //                         fontSize: 10,
        //                         color: '#667DDB'
        //                     }}>{navigation.getParam('switch_button','')}</Text>
        //             </TouchableOpacity>
        
        //         )
        //     };
        
        // },

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
    CoachListing: {
        screen: CoachListing,
        navigationOptions: ({ navigation }) => ({
            title: "Coach Listing",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={true} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })
    },
    ViewPlayerPerformance: {
        screen: ViewPlayerPerformance,
        navigationOptions: ({ navigation }) => ({
            title: "My Stats",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
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
export default playModule;


const style = StyleSheet.create({
    headerStyle: {
        color: '#F2F2F2',
        fontFamily: 'Quicksand-Medium',
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 16,
        flexGrow: 1,
        alignSelf: 'center',
    }
})
import React from 'react'
import batchDeatails from "../containers/CoachScreen/Batch/BatchDetails";
import coachBatch from "../containers/CoachScreen/Batch/BatchScreen";
import {createStackNavigator} from "react-navigation";
import coachAttendenceBook from "../containers/CoachScreen/Batch/CoachAttendenceBook";
import PlayersListing from "../containers/GuestScreen/PlayersListing";
import {Dimensions, StyleSheet} from "react-native";
import NavigationDrawerStructure from './NavigationDrawerStructure'
import RightMenuToolbar from "./RightMenuToolbar";

const coachBatchModule = createStackNavigator({


        CoachBatch: {
            screen: coachBatch,
            // navigationOptions: ({ navigation }) => ({
            //     title: "My Batch",
            //     headerLeft: <NavigationDrawerStructure navigationProps={navigation}
            //                                            showBackAction={false}
            //     />,
            //     headerRight: <RightMenuToolbar navigationProps={navigation}
            //                                    navigation={navigation} showHome={false} />,
            //     headerTitleStyle: style.headerStyle,
            //     headerStyle: {
            //         backgroundColor: '#FFFFFF',
            //     },

            // })

        },
        BatchDetails: {
            screen: batchDeatails,
            navigationOptions: ({ navigation }) => ({
                title: "Batch Details",
                headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                                                       showBackAction={true}
                />,
                headerRight: <RightMenuToolbar navigationProps={navigation}
                                               navigation={navigation} showHome={false} />,
                headerTitleStyle: style.headerStyle,
                headerStyle: {
                    backgroundColor: '#FFFFFF',
                },

            })

        },  PlayersListing: {
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
        AttendenceBook: {
            screen: coachAttendenceBook,
            navigationOptions: ({ navigation }) => ({
                title: "Batch Details",
                headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                                                       showBackAction={true}
                />,
                headerRight: <RightMenuToolbar navigationProps={navigation}
                                               navigation={navigation} showHome={false} />,
                headerTitleStyle: style.headerStyle,
                headerStyle: {
                    backgroundColor: '#FFFFFF',
                },

            })

        },




    }, {
        contentComponent: ({ navigation }) => {
            return (<CoachMenuDrawer navigation={navigation} />)
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
    }, {
        contentComponent: ({ navigation }) => {
            return (<CoachMenuDrawer navigation={navigation} />)
        },
        drawerWidth: Dimensions.get('window').width * 0.83,
    }
);
export default coachBatchModule;

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
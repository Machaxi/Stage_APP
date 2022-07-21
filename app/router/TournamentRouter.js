import React from 'react'

import ResultsTournamentDetail from "../containers/tournament/ResultsTournamentDetail";
import TournamentFixture from "../containers/tournament/TournamentFixture";
import TournamentMatchList from "../containers/tournament/TournamentMatchList";
import UpcomingTournamentDetail from "../containers/tournament/UpcomingTournamentDetail";
import TournamentScorer from "../containers/tournament/TournamentScorer";
import RegisteredTournamentDetail from "../containers/tournament/RegisteredTournamentDetail";
import { createStackNavigator } from "react-navigation";
import TournamentTabs from "../containers/tournament/TournamentTabs";
import NavigationDrawerStructure from './NavigationDrawerStructure'
import RightMenuToolbar from "./RightMenuToolbar";
import { StyleSheet } from "react-native";
import TournamentGallery from '../containers/tournament/TournamentGallery'
import FixtureSelection from '../containers/tournament/FixtureSelection'
import TournamentFilter from '../containers/tournament/TournamentFilter'
import TournamentTerms from '../containers/tournament/TournamentTerms'
import otherplayerDetails from '../containers/OtherPlayerDetails/OtherPlayerDetails'
import TournamentGallerySliderZoom from '../containers/tournament/TournamentGallerySliderZoom'
import TournamentGallerySlider from '../containers/tournament/TournamentGallerySlider'
import EditPartner from '../containers/tournament/EditPartner'
import AddPartner from "../containers/tournament/AddPartner";
import AddPartnerWithPhone from "../containers/tournament/AddPartnerWithPhone";

const TournamentModule = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    TournamentTabs: {
        screen: TournamentTabs,
        // navigationOptions: ({ navigation }) => ({
        //     title: 'Tournament',
        //     headerTitleStyle: style.headerStyle,
        //     headerLeft: <NavigationDrawerStructure navigationProps={navigation}
        //                                            showBackAction={false}
        //     />,
        //     headerRight: <RightMenuToolbar navigationProps={navigation}
        //                                    navigation={navigation} showNotification={true} />,
        //     headerStyle: {
        //         backgroundColor: '#FFFFFF',
        //     },

        //     headerTintColor: '#000',
        // }),
    },
    UpcomingTournamentDetail: {
        screen: UpcomingTournamentDetail,
        navigationOptions: ({ navigation }) => ({
            title: 'Tournament',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showBackAction={true}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showNotification={false} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    }
    ,
    RegisteredTournamentDetail: {
        screen: RegisteredTournamentDetail,
        // navigationOptions: ({ navigation }) => ({
        //     title: 'Registered Tournament',
        //     headerTitleStyle: style.headerStyle,
        //     headerLeft: <NavigationDrawerStructure navigationProps={navigation}
        //         showBackAction={true}
        //     />,
        //     headerRight: <RightMenuToolbar navigationProps={navigation}
        //         navigation={navigation} showNotification={false} />,
        //     headerStyle: {
        //         backgroundColor: '#FFFFFF',
        //     },

        //     headerTintColor: '#000',
        // }),
    },
    ResultsTournamentDetail: {
        screen: ResultsTournamentDetail,
        navigationOptions: ({ navigation }) => ({
            title: 'Tournament Results',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showBackAction={true}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation}
                showNotification={false} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    },


    TournamentFixture: {
        screen: TournamentFixture,
        // navigationOptions: ({ navigation }) => ({
        //     title: 'Fixture',
        //     headerTitleStyle: style.headerStyle,
        //     headerLeft: <NavigationDrawerStructure navigationProps={navigation}
        //         showBackAction={true}
        //     />,
        //     headerRight: <RightMenuToolbar navigationProps={navigation}
        //         navigation={navigation} showNotification={false} />,
        //     headerStyle: {
        //         backgroundColor: '#FFFFFF',
        //     },

        //     headerTintColor: '#000',
        // }),
    },
    TournamentMatchList:{
        screen: TournamentMatchList,
    },

    TournamentScorer: {
        screen: TournamentScorer,
        navigationOptions: ({ navigation }) => ({
            title: 'Tournament Scorer',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showBackAction={true}
                showDrawer={false}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showNotification={false} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    },

    TournamentGallery: {
        screen: TournamentGallery,
        navigationOptions: ({ navigation }) => ({
            title: 'Gallery',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showDrawer={false}
                showBackAction={true}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showNotification={false} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    },
    TournamentGallerySlider: {
        screen: TournamentGallerySlider,
        navigationOptions: ({ navigation }) => ({
            title: 'Gallery',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showDrawer={false}
                showBackAction={true}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showNotification={false} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    },
    TournamentGallerySliderZoom: {
        screen: TournamentGallerySliderZoom,
        navigationOptions: ({ navigation }) => ({
            title: 'Gallery',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showDrawer={false}
                showBackAction={true}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showNotification={false} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    },
    TournamentFilter: {
        screen: TournamentFilter,
        // navigationOptions: ({ navigation }) => ({
        //     title: 'Filter',
        //     headerTitleStyle: style.headerStyle,
        //     headerLeft: <NavigationDrawerStructure navigationProps={navigation}
        //         showDrawer={false}
        //         showBackAction={true}
        //     />,
        //     headerRight: <RightMenuToolbar navigationProps={navigation}
        //         navigation={navigation} showNotification={false} />,
        //     headerStyle: {
        //         backgroundColor: '#FFFFFF',
        //     },

        //     headerTintColor: '#000',
        // }),
    },
    FixtureSelection: {
        screen: FixtureSelection,
        navigationOptions: ({ navigation }) => ({
            title: 'Fixture',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showDrawer={false}
                showBackAction={true}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showNotification={false} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    },
    TournamentTerms: {
        screen: TournamentTerms,
        navigationOptions: ({ navigation }) => ({
            title: 'Tournament terms',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showDrawer={false}
                showBackAction={true}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showNotification={false} />,
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
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={false} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })
    },
    EditPartner: {
        screen: EditPartner,
        navigationOptions: ({ navigation }) => ({
            title: "Edit Partner",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={false} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })
    },
    AddPartner: {
        screen: AddPartner,
        navigationOptions: ({ navigation }) => ({
            title: 'Add Partner',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showBackAction={true}
                showDrawer={false}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showNotification={false} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    },
    AddPartnerWithPhone: {
        screen: AddPartnerWithPhone,
        navigationOptions: ({ navigation }) => ({
            title: 'Add Partner',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showBackAction={true}
                showDrawer={false}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showNotification={true} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    },
})

export default TournamentModule;

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
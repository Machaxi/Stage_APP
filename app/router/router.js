import React from 'react'
import { Platform, StatusBar, Image, View, Dimensions, TouchableOpacity, Text, StyleSheet, ImageBackground } from "react-native";
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator,
    createSwitchNavigator,
    createDrawerNavigator,
    TabBarBottom
} from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import welcome from '../containers/welcome/welcome'
import coachhome from '../containers/CoachScreen/CoachHome'
import guesthome from '../containers/GuestScreen/GuestHome'
import guestdetails from '../containers/GuestScreen/GuestDetails'
import parenthome from '../containers/ParentsScreen/ParentHome'
import AcademyListing from '../containers/GuestScreen/AcademyListing'
import AcademyProfile from '../containers/GuestScreen/AcademyProfile'
import CoachListing from '../containers/GuestScreen/CoachListing'
import PlayersListing from '../containers/GuestScreen/PlayersListing'
import CoachProfileDetail from '../containers/GuestScreen/CoachProfileDetail'
import CustomHeader from '../components/custom/CustomHeader'
import spalsh from '../containers/welcome/SplashScreen'
import IntroScreen from '../containers/welcome/IntroScreen'

import phoneauth from '../containers/Login/PhoneAuth'
import CoachMenuDrawer from './CoachMenuDrawer'
import EditProfile from '../containers/profile/EditProfile'
import markAttendence from '../containers/CoachScreen/MarkAttendence'
import otherplayerDetails from '../containers/OtherPlayerDetails/OtherPlayerDetails'
import CurrentBooking from '../containers/court_booking/CurrentBooking';
import CourtAcademyListing from '../containers/court_booking/CourtAcademyListing'
import ChooseTimeDate from '../containers/court_booking/ChooseTimeDate'

import { isSignedIn } from "../components/auth";
import BaseComponent from '../containers/BaseComponent';
import TournamentModule from './TournamentRouter'
import coachBatchModule from './CoachBatchRouter'
import userBatchModule from './PlayerBatchRouter'
import NavigationDrawerStructure from './NavigationDrawerStructure'
import RightMenuToolbar from "./RightMenuToolbar";
import coachPerfomenceModule from './CoachPerformenceRouter'
import WriteFeedback from '../containers/feedback/WriteFeedbackListing'
import WriteAcademyFeedback from '../containers/feedback/WriteAcademyFeedback'
import ChallengeHome from '../containers/challenge/ChallengeHome'
import Switcher from './Switcher'
import userHomeModule from './UserHomeModule'
import CoachRewardsPoints from '../containers/rewards/CoachRewardsPoints'
import CoachGiveRewards from '../containers/rewards/CoachGiveRewards'
import ParentRewards from '../containers/rewards/ParentRewards'
import CoachMyFeedbackListing from '../containers/feedback/CoachMyFeedbackListing'
import EditOtherProfile from '../containers/profile/EditOtherProfile'
import TabBarHighlightLabel from './TabBarHighlightLabel'
import CancelSession from '../containers/CoachScreen/Batch/CancelSession'

const headerStyle = {
    marginTop: Platform.OS === "android" ? 0 : 0
};
const loginModule = createStackNavigator({

    Splash: {
        screen: spalsh,
        navigationOptions: {
            // title: "Sign In",
            headerStyle,
            header: null
        }
    },
    Welcome: {
        screen: welcome,
        navigationOptions: {
            // title: "Sign In",
            headerStyle,
            header: null
        }
    },
    IntroScreen: {
        screen: IntroScreen,
        navigationOptions: {
            // title: "Sign In",
            headerStyle,
            header: null
        }
    },
    Login: {
        screen: phoneauth,
        navigationOptions: {
            header: null
            //header:null
        }
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: ({ navigation }) => ({
            title: "Edit Profile",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} showMenuAction={false} showBackAction={false} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={false} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })
    },


})



const userChallengeModule = createStackNavigator({


    ChallengeHome: {
        screen: ChallengeHome,

    }

}
);


const GuestHomeModule = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    AcademyListing: {
        screen: AcademyListing,
        navigationOptions: ({ navigation }) => ({
            title: 'Dribble Diaries',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showBackAction={false}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showNotification={true} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    },
    AcademyProfile: {
        screen: AcademyProfile,
        navigationOptions: ({ navigation }) => ({
            //header: <CustomHeader title="Academy Profile" showBackArrow={true} />,
            title: "Academy Profile",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={true} />,
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
    EditProfile: {
        screen: EditProfile,
        navigationOptions: ({ navigation }) => ({
            title: "Edit Profile",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={true} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })

    },
    WriteFeedback: {
        screen: WriteFeedback,
        navigationOptions: ({ navigation }) => ({
            title: "Write Feedbacks",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={true} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })

    },
    WriteAcademyFeedback: {
        screen: WriteAcademyFeedback,
        navigationOptions: ({ navigation }) => ({
            title: "Give Feedback",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={false} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })

    },
})


const tabBarController = createBottomTabNavigator(
    {
        Home: {
            screen: userHomeModule,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarLabel: ({ focused }) =>
                    <TabBarHighlightLabel
                        focused={focused}
                        activeIcon={require('../images/ic_tab_home.png')} />,

            },


        },
        Batch: {
            screen: userBatchModule,
            navigationOptions: {
                tabBarLabel: 'Batch',
                tabBarLabel: ({ focused }) =>
                    <TabBarHighlightLabel
                        focused={focused}
                        activeIcon={require('../images/ic_tab_batch.png')} />,
            }

        },
        Tournament: {
            screen: TournamentModule,
            navigationOptions: {
                tabBarLabel: 'Tournament',
                tabBarLabel: ({ focused }) =>
                    <TabBarHighlightLabel
                        focused={focused}
                        activeIcon={require('../images/ic_tab_tournament.png')} />,
            }

        },
        Challenge: {
            screen: userChallengeModule,
            navigationOptions: {
                tabBarLabel: 'Challenge',
                tabBarLabel: ({ focused }) =>
                    <TabBarHighlightLabel
                        focused={focused}
                        activeIcon={require('../images/ic_tab_challenge.png')} />,
            }

        },
        BookandPlay: {
            screen: GuestHomeModule,
            navigationOptions: {
                tabBarLabel: 'Book and Play',
                tabBarLabel: ({ focused }) =>
                    <TabBarHighlightLabel
                        focused={focused}
                        activeIcon={require('../images/ic_tab_booking.png')} />,
            }

        },

    })




const playerDrawer = createDrawerNavigator({


    playerfirst: {
        screen: tabBarController,
        // navigationOptions: {
        //     header: <CustomHeader title="Academy" />,
        // }
    },

}, {
        contentComponent: ({ navigation }) => {
            return (<CoachMenuDrawer navigation={navigation} />)
        },
        drawerWidth: Dimensions.get('window').width * 0.83,
    }
);

const coachHomeModule = createStackNavigator({


    CoachHome: {
        screen: coachhome,
        navigationOptions: ({ navigation }) => ({
            title: "Dribble",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showBackAction={false}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={false} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })


    },
    CoachMyFeedbackListing: {
        screen: CoachMyFeedbackListing,
        navigationOptions: ({ navigation }) => ({
            title: "My Feedback",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showBackAction={true}
                showDrawer={false}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={false} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })
    },

    MarkAttendence: {
        screen: markAttendence,
        navigationOptions: ({ navigation }) => ({
            title: "Mark Attendence",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={false} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: ({ navigation }) => ({
            title: "Edit Profile",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={false} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })
    },
    CoachRewardPoints: {
        screen: CoachRewardsPoints,
        navigationOptions: ({ navigation }) => ({
            title: "Reward points",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showDrawer={true} showBackAction={true} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={true} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })
    },
    CoachGiveRewards: {
        screen: CoachGiveRewards,
        navigationOptions: ({ navigation }) => ({
            title: "Award Players",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showDrawer={true} showBackAction={true} />,
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
    OtherPlayerDeatils: {
        screen: otherplayerDetails,
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
    AcademyListing: {
        screen: AcademyListing,
        navigationOptions: ({ navigation }) => ({
            title: 'Dribble Diaries',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showDrawer={false}
                showBackAction={true}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showNotification={true} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    },
    AcademyProfile: {
        screen: AcademyProfile,
        navigationOptions: ({ navigation }) => ({
            //header: <CustomHeader title="Academy Profile" showBackArrow={true} />,
            title: "Academy Profile",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={true} />,
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
    EditProfile: {
        screen: EditProfile,
        navigationOptions: ({ navigation }) => ({
            title: "Edit Profile",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={true} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })

    },
    WriteFeedback: {
        screen: WriteFeedback,
        navigationOptions: ({ navigation }) => ({
            title: "Write Feedbacks",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={true} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })

    },
    WriteAcademyFeedback: {
        screen: WriteAcademyFeedback,
        navigationOptions: ({ navigation }) => ({
            title: "Give Feedback",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
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
        drawerWidth: Dimensions.get('window').width * 0.83,
    }
);


const tabBarControllerCoach = createBottomTabNavigator(
    {
        Home: {
            screen: coachHomeModule,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarLabel: ({ focused }) =>
                    <TabBarHighlightLabel
                        focused={focused}
                        activeIcon={require('../images/ic_tab_home.png')} />,

            },


        },
        Batch: {
            screen: coachBatchModule,
            navigationOptions: {
                tabBarLabel: 'Batch',
                tabBarLabel: ({ focused }) =>
                    <TabBarHighlightLabel
                        focused={focused}
                        activeIcon={require('../images/ic_tab_batch.png')} />,
            }

        },
        Tournament: {
            screen: TournamentModule,
            navigationOptions: {
                tabBarLabel: 'Tournament',
                tabBarLabel: ({ focused }) =>
                    <TabBarHighlightLabel
                        focused={focused}
                        activeIcon={require('../images/ic_tab_tournament.png')} />,
            }

        },
        Performence: {
            screen: coachPerfomenceModule,
            navigationOptions: {
                tabBarLabel: 'Performance',
                tabBarLabel: ({ focused }) =>
                    <TabBarHighlightLabel
                        focused={focused}
                        activeIcon={require('../images/ic_tab_performance.png')} />,
            }

        },
        BookandPlay: {
            screen: GuestHomeModule,
            navigationOptions: {
                tabBarLabel: 'Book and Play',
                tabBarLabel: ({ focused }) =>
                    <TabBarHighlightLabel
                        focused={focused}
                        activeIcon={require('../images/ic_tab_booking.png')} />,
            }

        },

    })



const coachDrawer = createDrawerNavigator({


    coachfirst: {
        screen: tabBarControllerCoach,
        // navigationOptions: {
        //     header: <CustomHeader title="Academy" />,
        // }
    },

}, {
        contentComponent: ({ navigation }) => {
            return (<CoachMenuDrawer navigation={navigation} />)
        },
        drawerWidth: Dimensions.get('window').width * 0.83,
    }
);

const BookPlayModule = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    CurrentBooking: {
        screen: CurrentBooking,
        navigationOptions: ({ navigation }) => ({
            title: 'Book and play',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showDrawer={true}
                showBackAction={false}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showNotification={true} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    },
    CourtAcademyListing: {
        screen: CourtAcademyListing,
        navigationOptions: ({ navigation }) => ({
            title: 'Book and play',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showBackAction={true}
                showDrawer={true}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showNotification={false} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    },
    ChooseTimeDate: {
        screen: ChooseTimeDate,
        navigationOptions: ({ navigation }) => ({
            title: 'Book and play',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showBackAction={true}
                showDrawer={true}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showNotification={false} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    },

})

const tabBarControllerGuest = createBottomTabNavigator(
    {
        Home: {
            screen: GuestHomeModule,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarLabel: ({ focused }) =>
                    <TabBarHighlightLabel
                        focused={focused}
                        activeIcon={require('../images/ic_tab_home.png')} />,
            },
        },

        Tournament: {
            screen: TournamentModule,
            navigationOptions: {
                tabBarLabel: 'Tournament',
                tabBarLabel: ({ focused }) =>
                    <TabBarHighlightLabel
                        focused={focused}
                        activeIcon={require('../images/ic_tab_tournament.png')} />,
            }

        },

        BookandPlay: {
            screen: BookPlayModule,
            navigationOptions: {
                tabBarLabel: 'Book and Play',
                tabBarLabel: ({ focused }) =>
                    <TabBarHighlightLabel
                        focused={focused}
                        activeIcon={require('../images/ic_tab_booking.png')} />,
            }
        },

    })


const guestDrawer = createDrawerNavigator({


    Guestfirst: {
        screen: tabBarControllerGuest,
        // navigationOptions: {
        //     header: <CustomHeader title="Academy" />,
        // }
    },

},
    {
        contentComponent: ({ navigation }) => {
            return (<CoachMenuDrawer navigation={navigation} />)
        },
        drawerWidth: Dimensions.get('window').width * 0.83,
    }
);

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: WIDTH * 0.83,
    contentComponent: ({ navigation }) => {
        return (<CoachMenuDrawer navigation={navigation} />)
    }
}
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


const parentHomeModule = createStackNavigator({


    ParentHome: {
        screen: parenthome,
        navigationOptions: {
            title: "Sign In",
            // headerStyle,
            // header: null
        }
    },

    ParentRewards: {
        screen: ParentRewards,
        navigationOptions: ({ navigation }) => ({
            title: 'Reward points',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showDrawer={true}
                showBackAction={true}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showNotification={true} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    },
    AcademyListing: {
        screen: AcademyListing,
        navigationOptions: ({ navigation }) => ({
            title: 'Dribble Diaries',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showBackAction={true}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showNotification={true} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    },
    AcademyProfile: {
        screen: AcademyProfile,
        navigationOptions: ({ navigation }) => ({
            //header: <CustomHeader title="Academy Profile" showBackArrow={true} />,
            title: "Academy Profile",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={true} />,
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
    EditProfile: {
        screen: EditProfile,
        navigationOptions: ({ navigation }) => ({
            title: "Edit Profile",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={true} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })

    },
    EditOtherProfile: {
        screen: EditOtherProfile,
        navigationOptions: ({ navigation }) => ({
            title: "Edit Profile",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showBackAction={true}
                showDrawer={false}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={true} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })

    },
    WriteFeedback: {
        screen: WriteFeedback,
        navigationOptions: ({ navigation }) => ({
            title: "Write Feedbacks",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={true} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })

    },

    WriteAcademyFeedback: {
        screen: WriteAcademyFeedback,
        navigationOptions: ({ navigation }) => ({
            title: "Give Feedback",
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


const tabBarControllerParent = createBottomTabNavigator(
    {
        Home: {
            screen: parentHomeModule,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarLabel: ({ focused }) =>
                    <TabBarHighlightLabel
                        focused={focused}
                        activeIcon={require('../images/ic_tab_home.png')} />,
            },


        },
        Batch: {
            screen: userBatchModule,
            navigationOptions: {
                tabBarLabel: 'Batch',
                tabBarLabel: ({ focused }) =>
                    <TabBarHighlightLabel
                        focused={focused}
                        activeIcon={require('../images/ic_tab_batch.png')} />,
            }

        },
        Tournament: {
            screen: TournamentModule,
            navigationOptions: {
                tabBarLabel: 'Tournament',
                tabBarLabel: ({ focused }) =>
                    <TabBarHighlightLabel
                        focused={focused}
                        activeIcon={require('../images/ic_tab_tournament.png')} />,
            }

        },
        Challenge: {
            screen: userChallengeModule,
            navigationOptions: {
                tabBarLabel: 'Challenge',
                tabBarLabel: ({ focused }) =>
                    <TabBarHighlightLabel
                        focused={focused}
                        activeIcon={require('../images/ic_tab_challenge.png')} />,
            }

        },
        BookandPlay: {
            screen: BookPlayModule,
            navigationOptions: {
                tabBarLabel: 'Book and Play',
                tabBarLabel: ({ focused }) =>
                    <TabBarHighlightLabel
                        focused={focused}
                        activeIcon={require('../images/ic_tab_booking.png')} />,
            }

        },

    })

const parentDrawer = createDrawerNavigator({


    Guestfirst: {
        screen: tabBarControllerParent,
        // navigationOptions: {
        //     header: <CustomHeader title="Academy" />,
        // }
    },

},
    {
        contentComponent: ({ navigation }) => {
            return (<CoachMenuDrawer navigation={navigation} />)
        },
        drawerWidth: Dimensions.get('window').width * 0.83,
    }
);

const BaseNavigator = createSwitchNavigator({
    // Main: {
    //     screen: InitialNavigator
    // },
    // DrawerNavigator: {
    //     screen: DrawerNavigator
    // },
    Login: {
        screen: loginModule
    },
    PHome: {
        screen: parentDrawer
    },
    GHome: {
        screen: guestDrawer,

    },
    CHome: {
        screen: coachDrawer,

    },
    UHome: {
        screen: playerDrawer,

    },
    SwitchPlayer: {
        screen: Switcher,
    }
    // Home:{
    //     screen: HomeModule
    // },

    // SignedOut: {
    //     screen: loginModule
    // }


});



const AppMain = createAppContainer(BaseNavigator);
export default AppMain;

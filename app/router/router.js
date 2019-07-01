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
import userhome from '../containers/UserScreen/UserHome'
import AcademyListing from '../containers/GuestScreen/AcademyListing'
import AcademyProfile from '../containers/GuestScreen/AcademyProfile'
import CoachListing from '../containers/GuestScreen/CoachListing'
import PlayersListing from '../containers/GuestScreen/PlayersListing'
import CoachProfileDetail from '../containers/GuestScreen/CoachProfileDetail'
import CustomHeader from '../components/custom/CustomHeader'
import spalsh from '../containers/welcome/SplashScreen'

import phoneauth from '../containers/Login/PhoneAuth'
import switchplayer from '../containers/PlayerSwitch/PlayerSwitcher'
import CoachMenuDrawer from './CoachMenuDrawer'
import EditProfile from '../containers/profile/EditProfile'
import markAttendence from '../containers/CoachScreen/MarkAttendence'
import otherplayerDetails from '../containers/OtherPlayerDetails/OtherPlayerDetails'

import { isSignedIn } from "../components/auth";
import BaseComponent from '../containers/BaseComponent';
import TournamentModule from './TournamentRouter'
import coachBatchModule from './CoachBatchRouter'
import userBatchModule from './PlayerBatchRouter'
import NavigationDrawerStructure from './NavigationDrawerStructure'
import RightMenuToolbar from "./RightMenuToolbar";
import coachPerfomenceModule from './CoachPerformenceRouter'

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
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
    Login: {
        screen: phoneauth,
        navigationOptions: {
            title: "Login",
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },
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
const Switcher = createStackNavigator({

    SwitchPlayer1: {
        screen: switchplayer,
        navigationOptions: {
            title: "Switch Player",
            headerStyle
            // : {
            //     backgroundColor: '#FFFFFF',
            //
            // },
            //header:null
        }

    },

}
);

const userHomeModule = createStackNavigator({


    UserHome: {
        screen: userhome,

    },


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
})


const tabBarController = createBottomTabNavigator(
    {
        Home: {
            screen: userHomeModule,
            navigationOptions: {
                tabBarLabel: 'Home1',
                tabBarIcon: ({ tintColor }) => (

                    <Image
                        //focused={focused}
                        source={require('../images/Home.png')}
                        tintColor={tintColor}
                        size={24}
                    />


                ),
                tabBarOptions: {
                    showLabel: true,
                    showIcon: true,
                    underlineBottomPosition: 1,
                    underlineColor: 'red',
                    underlineHeight: 5
                },

            },


        },
        Batch: {
            screen: userBatchModule,
            navigationOptions: {
                tabBarLabel: 'Batch',
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        //focused={focused}
                        source={require('../images/groupicon.png')}
                        tintColor={tintColor}
                        size={24}
                    />
                ),
                tabBarOptions: {
                    showLabel: true,
                    showIcon: true,
                    // tintColor: '#333',
                    // activeTintColor: '#aaa',
                }
            }

        },
        Tournament: {
            screen: TournamentModule,
            navigationOptions: {
                tabBarLabel: 'Tournament',
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        //focused={focused}
                        source={require('../images/Tournamenticon.png')}
                        tintColor={tintColor}
                        size={24}
                    />
                ),
                tabBarOptions: {
                    showLabel: true,
                    showIcon: true,
                    // tintColor: '#333',
                    // activeTintColor: '#aaa',
                }
            }

        },
        Challenge: {
            screen: userHomeModule,
            navigationOptions: {
                tabBarLabel: 'Challenge',
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        //focused={focused}
                        source={require('../images/Challengeiocn.png')}
                        tintColor={tintColor}
                        size={24}
                    />
                ),
                tabBarOptions: {
                    showLabel: true,
                    showIcon: true,
                    // tintColor: '#333',
                    // activeTintColor: '#aaa',
                }
            }

        },
        BookandPlay: {
            screen: GuestHomeModule,
            navigationOptions: {
                tabBarLabel: 'Book and Play',
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        //focused={focused}
                        source={require('../images/Bookingicon.png')}
                        tintColor={tintColor}
                        size={24}
                    />
                ),
                tabBarOptions: {
                    showLabel: true,
                    showIcon: true,
                    // tintColor: '#333',
                    // activeTintColor: '#aaa',
                }
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
                tabBarLabel: 'Home1',
                tabBarIcon: ({ tintColor }) => (

                    <Image
                        //focused={focused}
                        source={require('../images/Home.png')}
                        tintColor={tintColor}
                        size={24}
                    />


                ),
                tabBarOptions: {
                    showLabel: true,
                    showIcon: true,
                    underlineBottomPosition: 1,
                    underlineColor: 'red',
                    underlineHeight: 5
                },

            },


        },
        Batch: {
            screen: coachBatchModule,
            navigationOptions: {
                tabBarLabel: 'Batch',
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (

                    <Image
                        //focused={focused}
                        source={require('../images/groupicon.png')}
                        tintColor={tintColor}
                        size={24}
                    />


                ),
                tabBarOptions: {
                    showLabel: true,
                    showIcon: true,
                    // tintColor: '#333',
                    // activeTintColor: '#aaa',
                }
            }

        },
        Tournament: {
            screen: TournamentModule,
            navigationOptions: {
                tabBarLabel: 'Tournament',
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        //focused={focused}
                        source={require('../images/Tournamenticon.png')}
                        tintColor={tintColor}
                        size={24}
                    />
                ),
                tabBarOptions: {
                    showLabel: true,
                    showIcon: true,
                    // tintColor: '#333',
                    // activeTintColor: '#aaa',
                }
            }

        },
        Performence: {
            screen: coachPerfomenceModule,
            navigationOptions: {
                tabBarLabel: 'Performence',
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        //focused={focused}
                        source={require('../images/performence.png')}
                        tintColor={tintColor}
                        size={24}
                    />
                ),
                tabBarOptions: {
                    showLabel: true,
                    showIcon: true,
                    // tintColor: '#333',
                    // activeTintColor: '#aaa',
                }
            }

        },
        BookandPlay: {
            screen: GuestHomeModule,
            navigationOptions: {
                tabBarLabel: 'Book and Play',
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        //focused={focused}
                        source={require('../images/Bookingicon.png')}
                        tintColor={tintColor}
                        size={24}
                    />
                ),
                tabBarOptions: {
                    showLabel: true,
                    showIcon: true,
                    // tintColor: '#333',
                    // activeTintColor: '#aaa',
                }
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



const tabBarControllerGuest = createBottomTabNavigator(
    {
        Home: {
            screen: GuestHomeModule,
            navigationOptions: {
                tabBarLabel: 'Home1',
                tabBarIcon: ({ tintColor }) => (

                    <Image
                        //focused={focused}
                        source={require('../images/Home.png')}
                        tintColor={tintColor}
                        size={24}
                    />


                ),
                tabBarOptions: {
                    showLabel: true,
                    showIcon: true,
                    underlineBottomPosition: 1,
                    underlineColor: 'red',
                    underlineHeight: 5
                },

            },


        },

        Tournament: {
            screen: TournamentModule,
            navigationOptions: {
                tabBarLabel: 'Tournament',
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        //focused={focused}
                        source={require('../images/Tournamenticon.png')}
                        tintColor={tintColor}
                        size={24}
                    />
                ),
                tabBarOptions: {
                    showLabel: true,
                    showIcon: true,
                    // tintColor: '#333',
                    // activeTintColor: '#aaa',
                }
            }

        },

        BookandPlay: {
            screen: userHomeModule,
            navigationOptions: {
                tabBarLabel: 'Book and Play',
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        //focused={focused}
                        source={require('../images/Bookingicon.png')}
                        tintColor={tintColor}
                        size={24}
                    />
                ),
                tabBarOptions: {
                    showLabel: true,
                    showIcon: true,
                    // tintColor: '#333',
                    // activeTintColor: '#aaa',
                }
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
    BaseComponent.isUserLoggedIn ?
        {
            contentComponent: ({ navigation }) => {
                return (<CoachMenuDrawer navigation={navigation} />)
            },
            drawerWidth: Dimensions.get('window').width * 0.83,
        } : {
            drawerLockMode: 'locked-closed'
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
        fontFamily: 'Quicksand-Bold',
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
    ParentHome: {
        screen: parenthome,
        navigationOptions: {
            title: "Sign In",
            // headerStyle,
            // header: null
        }
    },
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
        screen: parentHomeModule
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

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
import mybatch from '../containers/MyBatch/MyBatch'
import TournamentTabs from '../containers/tournament/TournamentTabs'
import TournamentFixture from '../containers/tournament/TournamentFixture'
import UpcomingTournamentDetail from '../containers/tournament/UpcomingTournamentDetail'
import markAttendence from '../containers/CoachScreen/MarkAttendence'
import otherplayerDetails from '../containers/OtherPlayerDetails/OtherPlayerDetails'
import coachBatch from '../containers/CoachScreen/Batch/BatchScreen'
import batchDeatails from '../containers/CoachScreen/Batch/BatchDetails'


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
            headerRight: <RigitMenuToolbar navigationProps={navigation}
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
        // navigationOptions: ({ navigation }) => ({
        //     //title: "Dribble",
        //
        //     headerLeft: <NavigationDrawerStructure navigationProps={navigation}
        //         showBackAction={false}
        //     />,
        //     headerRight: <RigitMenuToolbar navigationProps={navigation}
        //         navigation={navigation} showHome={false} />,
        //     headerTitleStyle: {
        //         color: 'white'
        //     },
        //     headerStyle: {
        //         elevation: 0, shadowOpacity: 0, borderBottomWidth: 0,
        //
        //      },
        //    // //  header: <CustomHeader title="Navdeep's Academy ▼ " showBackArrow={true}
        //    //  navigation={navigation} />,
        //     // headerBackground: (
        //     //     <LinearGradient
        //     //         colors={['#262051', '#24262A']}
        //     //         style={{ flex: 1 }}
        //     //         start={{ x: 0, y: 0 }}
        //     //         end={{ x: 2.5, y: 0 }}
        //     //     />
        //    //  ),
        //
        // })
    },


}
);

const userBatchModule = createStackNavigator({


    UserHome: {
        screen: mybatch,
        navigationOptions: ({ navigation }) => ({
            title: "My Batch",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showBackAction={false}
            />,
            headerRight: <RigitMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={false} />,
            headerTitleStyle: {
                color: 'black'
            },
            // headerStyle: {
            //     elevation: 0, shadowOpacity: 0, borderBottomWidth: 0,
            //
            // },


        })
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
            headerRight: <RigitMenuToolbar navigationProps={navigation}
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
            headerRight: <RigitMenuToolbar navigationProps={navigation}
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
            headerRight: <RigitMenuToolbar navigationProps={navigation}
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
            headerRight: <RigitMenuToolbar navigationProps={navigation}
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
            headerRight: <RigitMenuToolbar navigationProps={navigation}
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
            headerRight: <RigitMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={true} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })

    },
})

const TournamentModule = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    TournamentTabs: {
        screen: TournamentTabs,
        navigationOptions: ({ navigation }) => ({
            title: 'Tournament',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                                                   showBackAction={false}
            />,
            headerRight: <RigitMenuToolbar navigationProps={navigation}
                                           navigation={navigation} showNotification={true} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    },
    UpcomingTournamentDetail: {
        screen: UpcomingTournamentDetail,
        navigationOptions: ({ navigation }) => ({
            title: 'Tournament',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                                                   showBackAction={false}
            />,
            headerRight: <RigitMenuToolbar navigationProps={navigation}
                                           navigation={navigation} showNotification={true} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    },

    TournamentFixture: {
        screen: TournamentFixture,
        navigationOptions: ({ navigation }) => ({
            title: 'Fixture',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                                                   showBackAction={false}
            />,
            headerRight: <RigitMenuToolbar navigationProps={navigation}
                                           navigation={navigation} showNotification={true} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
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
            headerRight: <RigitMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={false} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })


    },
        MarkAttendence: {
            screen: markAttendence,
            navigationOptions: ({navigation}) => ({
                title: "Mark Attendence",
                headerLeft: <NavigationDrawerStructure navigationProps={navigation}/>,
                headerRight: <RigitMenuToolbar navigationProps={navigation}
                                               navigation={navigation} showHome={false}/>,
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
            headerRight: <RigitMenuToolbar navigationProps={navigation}
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
                headerRight: <RigitMenuToolbar navigationProps={navigation}
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
        headerRight: <RigitMenuToolbar navigationProps={navigation}
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

const coachBatchModule = createStackNavigator({


    CoachBatch: {
        screen: coachBatch,
        navigationOptions: ({navigation}) => ({
            title: "My Batch",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                                                   showBackAction={false}
            />,
            headerRight: <RigitMenuToolbar navigationProps={navigation}
                                           navigation={navigation} showHome={false}/>,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })

    },
        BatchDetails: {
            screen: batchDeatails,
            navigationOptions: ({navigation}) => ({
                title: "Batch Details",
                headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                                                       showBackAction={true}
                />,
                headerRight: <RigitMenuToolbar navigationProps={navigation}
                                               navigation={navigation} showHome={false}/>,
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
                headerRight: <RigitMenuToolbar navigationProps={navigation}
                                               navigation={navigation} showHome={true} />,
                headerTitleStyle: style.headerStyle,
                headerStyle: {
                    backgroundColor: '#FFFFFF',
                },

            })
        },
},{
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

}, {
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


class RigitMenuToolbar extends React.Component {

    //==================================================================
    //          showNotification = true/false (show/hide)
    //          showHome 
    //==================================================================

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {

        //showNotification={false} showHome={true}
        let showNotification = false
        let showHome = false
        if (this.props.showNotification != undefined)
            showNotification = this.props.showNotification

        if (this.props.showHome != undefined)
            showHome = this.props.showHome


        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

                {showNotification ? <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => { }}>

                    <Image
                        source={require('../images/ic_notifications.png')}
                        style={{ width: 20, height: 20, marginRight: 12 }}
                    />
                </TouchableOpacity> : null}


                {showHome ? <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => { }}>

                    <Image
                        source={require('../images/ic_home.png')}
                        style={{ width: 20, height: 20, marginRight: 12 }}
                    />
                </TouchableOpacity> : null}


            </View>
        );
    }
}

class NavigationDrawerStructure extends React.Component {

    //==================================================================
    //          showBackAction = true/false (show/hide)
    //           
    //==================================================================


    //Structure for the navigatin Drawer
    toggleDrawer = () => {
        //Props to open/close the drawer
        this.props.navigationProps.toggleDrawer();
    };

    toggleToHome = () => {
        this.props.navigationProps.goBack(null);
    };

    render() {

        let showBackAction = true
        if (this.props.showBackAction != undefined)
            showBackAction = this.props.showBackAction


        return (
            <View style={{ flexDirection: 'row' }}>
                {showBackAction ?
                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={this.toggleToHome.bind(this)}>

                        <Image
                            source={require('../images/go_back_arrow.png')}
                            style={{ width: 20, height: 16, marginLeft: 12 }}
                        />
                    </TouchableOpacity>
                    : null
                }


                <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
                    {/*Donute Button Image */}
                    <Image
                        source={require('../images/hamburger.png')}
                        style={{ width: 24, height: 16, marginLeft: 12 }}
                    />
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={this.toggleToHome.bind(this)}>
                <Image
                        source={require('../images/header_icon.png')}
                        style={{ width: 55, height: 50,marginLeft:-15}}
                    />
                    </TouchableOpacity> */}
            </View>
        );
    }
}

const AppMain = createAppContainer(BaseNavigator);
export default AppMain;

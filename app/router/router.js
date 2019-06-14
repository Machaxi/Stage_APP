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
import CoachMenuDrawer from './CoachMenuDrawer'

import phoneauth from '../containers/Login/PhoneAuth'


const loginModule = createStackNavigator({


    Welcome: {
        screen: welcome,
        navigationOptions: {
            // title: "Sign In",
            // headerStyle,
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
    //
    // SignUp: {
    //     screen: signup,
    //     navigationOptions: {
    //         title: "Register",
    //         headerStyle,
    //         //header:null
    //     }
    // },
    // ForgotPass: {
    //     screen: forgotPassword,
    //     navigationOptions: {
    //         title: "Forgot Password",
    //         headerStyle,
    //         //header:null
    //     }
    // },
    // PhoneAuth: {
    //     screen: phoneAuth,
    //     navigationOptions: {
    //         title: "Phone Number Login",
    //         headerStyle,
    //         //header:null
    //     }
    // },
    // ResetPassword: {
    //     screen: resetPassword,
    //     navigationOptions: {
    //         title: "Reset Password",
    //         headerStyle,
    //         //header:null
    //     }
    // }

})
const userHomeModule = createStackNavigator({


    UserHome: {
        screen: userhome,
        navigationOptions: {
            title: "Sign In",
            headerStyle: { display: "none" },
            //header:null
        }
    },
}
);
const tabOptions = {
    tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: '#D3D3D3',
        style: {
            backgroundColor: 'green',
            borderTopWidth: 1,
            borderTopColor: '#D3D3D3'
        },
        indicatorStyle: {
            backgroundColor: 'red',
        },
    },
}


// const tabBarController= createMaterialBottomTabNavigator({
//     Home: { screen: userHomeModule },
//     Player: { screen: userHomeModule },
//     // History: { screen: History },
//     // Cart: { screen: Cart },
// }, {
//     initialRouteName: 'Home',
//     activeColor: '#f0edf6',
//     inactiveColor: '#3e2465',
//     barStyle: { backgroundColor: '#694fad' },
//     indicatorStyle: {
//         backgroundColor: 'red',
//     },
//     underlineBottomPosition:0,
//                     underlineColor:'red',
//                     underlineHeight:5,
//     tabOptions
// });

const tabBarController = createBottomTabNavigator(
    {
        Home: {
            screen: userHomeModule,
            navigationOptions: {
                tabBarLabel: "Home",
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        //focused={focused}
                        source={require('../images/Home.png')}
                        tintColor={tintColor}
                    />


                ),
                // tabBarSelectedItemStyle: {
                //     underlineColor:'red',
                //     underlineHeight:5,
                //     borderBottomWidth: 5,
                //     borderBottomColor: 'red',
                //     underlineBottomPosition:0,
                // },
                // indicatorStyle: {
                //     underlineBottomPosition:0,
                //     underlineColor:'red',
                //     underlineHeight:5,
                //     backgroundColor: 'red',
                //     borderBottomWidth: 5,
                // },
            },


        },
        Player: {
            screen: userHomeModule,
            navigationOptions: {
                tabBarLabel: "Home",
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name="home"
                        color={tintColor}
                        size={24}
                    />
                )
            }

        },

    })

const coachHomeModule = createStackNavigator({


    CoachHome: {
        screen: coachhome,
        navigationOptions: {
            title: "Sign In",
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        }
    },
}
);

const AcademyListingStack = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    AcademyListing: {
        screen: AcademyListing,
        navigationOptions: ({ navigation }) => ({
            title: 'Dribble Diaries',
            headerTitleStyle: {
                color: '#191919',
                fontFamily: 'Quicksand-Bold',
                fontWeight: '400',
                textAlign: 'center',
                fontSize:16,
                alignSelf: 'center',
            },
           
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RigitMenuToolbar navigationProps={navigation}
                navigation={navigation} />,
            //header: <CustomHeader title="Academy" />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    },
    AcademyProfile: {
        screen: AcademyProfile,
        navigationOptions: {
            header: <CustomHeader title="Academy Profile" showBackArrow={true} />,
            //title: "Sign In",
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },
        }
    },
    CoachListing: {
        screen: CoachListing,
        navigationOptions: {
            title: "Sign In",
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        }
    },
    PlayersListing: {
        screen: PlayersListing,
        navigationOptions: {
            title: "Sign In",
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        }
    },
    CoachProfileDetail: {
        screen: CoachProfileDetail,
        navigationOptions: {
            title: "Sign In",
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        }
    },
})
const GuestHomeModule = createDrawerNavigator({


    AcademyListing: {
        screen: AcademyListingStack,
        // navigationOptions: {
        //     header: <CustomHeader title="Academy" />,
        // }
    },
    

    GuestDe: {
        screen: guestdetails,
        navigationOptions: {
            title: "Sign In",
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        }
    },
},{
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
        screen: GuestHomeModule,

    },
    CHome: {
        screen: coachHomeModule,

    },
    UHome: {
        screen: tabBarController,

    },
    // Home:{
    //     screen: HomeModule
    // },

    // SignedOut: {
    //     screen: loginModule
    // }


});


class RigitMenuToolbar extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    render() {

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => { }}>

                    <Image
                        source={require('../images/ic_notifications.png')}
                        style={{ width: 20, height: 20, marginRight: 12 }}
                    />
                </TouchableOpacity>

            </View>
        );
    }
}

class NavigationDrawerStructure extends React.Component {


    //Structure for the navigatin Drawer
    toggleDrawer = () => {
        //Props to open/close the drawer
        this.props.navigationProps.toggleDrawer();
        //this.props.navigation.dispatch(DrawerActions.toggleDrawer())
        //this.props.navigationProps.toggleDrawer();
    };

    toggleToHome = () => {
        //Props to open/close the drawer
        this.props.navigationProps.navigate('First');
        //this.props.navigation.dispatch(DrawerActions.toggleDrawer())
        //this.props.navigationProps.toggleDrawer();
    };

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
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

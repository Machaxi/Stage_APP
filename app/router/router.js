import React from 'react'
import { Platform, StatusBar, Image, View, Dimensions, TouchableOpacity, Text, StyleSheet, ImageBackground } from "react-native";
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator,
    createSwitchNavigator,
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
                headerStyle: {display:"none"},
                 //header:null
            }
        },
    }
);
const tabOptions = {
    tabBarOptions: {
        activeTintColor:'white',
        inactiveTintColor:'#D3D3D3',
        style:{
            backgroundColor:'green',
            borderTopWidth:1,
            borderTopColor:'#D3D3D3'
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

const tabBarController =createBottomTabNavigator(
    {
        Home: {
            screen: userHomeModule,
            navigationOptions: {
                tabBarLabel:'Home1',
                tabBarIcon: ({tintColor}) => (

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
                    underlineBottomPosition:1,
                    underlineColor:'red',
                    underlineHeight:5
                },

            },


        },
        Player: {
            screen: userHomeModule,
            navigationOptions: {
                tabBarLabel:'Home',
                showLabel: false,
                tabBarIcon: ({tintColor}) => (
                    <Icon
                        name="home"
                        color={tintColor}
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
const GuestHomeModule = createStackNavigator({


        GuestHome: {
            screen: guesthome,
            navigationOptions: {
                title: "Sign In",
                headerStyle: {
                    backgroundColor: '#FFFFFF',
                },

            }
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
    }
);
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
const AppMain = createAppContainer(BaseNavigator);
export default AppMain;

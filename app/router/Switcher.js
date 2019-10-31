import React from 'react'

import { createStackNavigator } from "react-navigation";
import mybatch from "../containers/PlayerBatch/PlayerBatch";
import PlayersListing from "../containers/GuestScreen/PlayersListing";
import AppMain from "./router";
import NavigationDrawerStructure from './NavigationDrawerStructure'
import RightMenuToolbar from "./RightMenuToolbar";
import { StyleSheet } from "react-native";
import switchplayer from '../containers/PlayerSwitch/PlayerSwitcher'
import CurrentBooking from '../containers/court_booking/CurrentBooking';
import CourtAcademyListing from '../containers/court_booking/CourtAcademyListing'
import ChooseTimeDate from '../containers/court_booking/ChooseTimeDate'
import AcademyListing from '../containers/GuestScreen/AcademyListing'
import AcademyProfile from '../containers/GuestScreen/AcademyProfile'
import CoachListing from '../containers/GuestScreen/CoachListing'
import CoachProfileDetail from '../containers/GuestScreen/CoachProfileDetail'
import EditProfile from '../containers/profile/EditProfile'
import WriteFeedback from '../containers/feedback/WriteFeedbackListing'
import WriteAcademyFeedback from '../containers/feedback/WriteAcademyFeedback'
import AcademyFilter from '../containers/GuestScreen/AcademyFilter'
import BookTrial from '../containers/GuestScreen/BookTrial'
import WebViewScreen from '../containers/util/WebViewScreen'
import AcademyBatch from '../containers/GuestScreen/AcademyBatch'
import PaymentPage from '../containers/court_booking/PaymentPage'
import Registration from "../containers/tournament/Registration";

const Switcher = createStackNavigator({

    SwitchPlayer1: {
        screen: switchplayer,
        navigationOptions: ({ navigation }) => ({
            title: "Machaxi",
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },
            headerTintColor: '#000',
        })
    },
    CurrentBooking: {
        screen: CurrentBooking,
        navigationOptions: ({ navigation }) => ({
            title: 'Book and play',
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
                navigation={navigation} showNotification={false} />,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

            headerTintColor: '#000',
        }),
    },
    ViewPlayersListing: {
        screen: PlayersListing,
        navigationOptions: ({ navigation }) => ({
            title: "View Players",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={false} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })
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
    AcademyFilter: {
        screen: AcademyFilter,

    },
    AcademyBatch: {
        screen: AcademyBatch,
        navigationOptions: ({ navigation }) => ({
            title: "View Batches",
            headerLeft: <NavigationDrawerStructure
                showDrawer={false}
                navigationProps={navigation} showBackAction={true} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={false} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })

    },

    BookTrial: {
        screen: BookTrial,
        navigationOptions: ({ navigation }) => ({
            title: "Book Trial",
            headerLeft: <NavigationDrawerStructure
                showDrawer={false}
                navigationProps={navigation} showBackAction={true} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={false} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })

    },
    WebViewScreen: {
        screen: WebViewScreen,
        navigationOptions: ({ navigation }) => ({
            title: "About Us",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showBackAction={true}
                showDrawer={false} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation}
                showHome={false} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })
    },

    CurrentBooking: {
        screen: CurrentBooking,
        navigationOptions: ({ navigation }) => ({
          title: 'Book and play',
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
      CourtAcademyListing: {
        screen: CourtAcademyListing,
        navigationOptions: ({ navigation }) => ({
          title: 'Book and play',
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
      ChooseTimeDate: {
        screen: ChooseTimeDate,
        navigationOptions: ({ navigation }) => ({
          title: 'Book and play',
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
      Registration: {
        screen: Registration,
      },
      PaymentPage: {
        screen: PaymentPage,
      }
}
);
export default Switcher;


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
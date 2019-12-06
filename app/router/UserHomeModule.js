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
import userhome from '../containers/UserScreen/UserHome'
import ParentRewards from '../containers/rewards/ParentRewards'
import EditOtherProfile from '../containers/profile/EditOtherProfile'
import PlayerAttendance from "../containers/PlayerBatch/MyCalendar"
import otherplayerDetails from '../containers/OtherPlayerDetails/OtherPlayerDetails'
import TournamentGallerySlider from '../containers/tournament/TournamentGallerySlider'
import AcademyFilter from '../containers/GuestScreen/AcademyFilter'
import NotificationList from '../containers/notification/NotificationList'
import ViewPlayerPerformance from '../containers/UserScreen/ViewPlayerPerformance'
import WebViewScreen from '../containers/util/WebViewScreen'
import PaymentDetail from '../containers/payment/PaymentDetail'
import PDFExample from '../containers/util/PDFExample'
import ProgressExample from '../containers/util/ProgressExample'
import TournamentGallerySliderZoom from '../containers/tournament/TournamentGallerySliderZoom'
import AcademyBatch from '../containers/GuestScreen/AcademyBatch'
import TestExample from '../containers/welcome/TestExample'
import BookTrial from '../containers/GuestScreen/BookTrial'
import PaymentHistory from '../containers/payment/PaymentHistory'
import ImageGuidelines from '../containers/profile/ImageGuidelines'
import ContactUs from '../containers/util/ContactUs'
import FaqScreen from '../containers/util/FaqScreen';
import EnrollmentForm from '../containers/profile/EnrollmentForm';

const userHomeModule = createStackNavigator({

    UserHome: {
        screen: userhome,
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
            title: 'Browse Academies',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showDrawer={true}
                showBackAction={true}
            />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation}
                showNotification={false}
                showHome={true} />,
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
            title: "Academy Players",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={false} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })
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
    OtherPlayerDeatils: {
        screen: otherplayerDetails,
        navigationOptions: ({ navigation }) => ({
            title: "Player Detail",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showDrawer={false} />,
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
                navigation={navigation} showHome={false} />,
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
                navigation={navigation} showHome={false} />,
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
    AcademyFilter: {
        screen: AcademyFilter,

    },
    NotificationList: {
        screen: NotificationList,
        navigationOptions: ({ navigation }) => ({
            title: 'Notification',
            headerTitleStyle: style.headerStyle,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showDrawer={false}
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
    PaymentDetail: {
        screen: PaymentDetail,
        navigationOptions: ({ navigation }) => ({
            title: "Payment",
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
    PDFExample: {
        screen: PDFExample,
        navigationOptions: ({ navigation }) => ({
            title: "WebView",
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
    ProgressExample: {
        screen: ProgressExample,
        navigationOptions: ({ navigation }) => ({
            title: "Progress Example",
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
    TestExample: {
        screen: TestExample,
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
    PaymentHistory: {
        screen: PaymentHistory,
        navigationOptions: ({ navigation }) => ({
            title: "Payment History",
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

    ImageGuidelines: {
        screen: ImageGuidelines,
        navigationOptions: ({ navigation }) => ({
            title: "Edit Image Guidelines",
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
    ContactUs: {
        screen: ContactUs,
        navigationOptions: ({ navigation }) => ({
            title: "Contact Us",
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
    FaqScreen: {
        screen: FaqScreen,
        navigationOptions: ({ navigation }) => ({
            title: "FAQ",
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
    EnrollmentForm: {
        screen: EnrollmentForm,
        navigationOptions: ({ navigation }) => ({
            title: "Enrollment Form",
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: <RightMenuToolbar navigationProps={navigation}
                navigation={navigation} showHome={true} />,
            headerTitleStyle: style.headerStyle,
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },

        })
    },
});

export default userHomeModule;


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
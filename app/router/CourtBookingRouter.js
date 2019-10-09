import React from 'react'

import { createStackNavigator } from "react-navigation";
import CurrentBooking from '../containers/court_booking/CurrentBooking';
import CourtAcademyListing from '../containers/court_booking/CourtAcademyListing'
import ChooseTimeDate from '../containers/court_booking/ChooseTimeDate'
import PaymentPage from '../containers/court_booking/PaymentPage'
import Registration from "../containers/tournament/Registration";
import AcademyListing from '../containers/GuestScreen/AcademyListing'
import AcademyProfile from '../containers/GuestScreen/AcademyProfile'
import CoachListing from '../containers/GuestScreen/CoachListing'
import PlayersListing from '../containers/GuestScreen/PlayersListing'
import CoachProfileDetail from '../containers/GuestScreen/CoachProfileDetail'
import AcademyBatch from '../containers/GuestScreen/AcademyBatch'
import NavigationDrawerStructure from './NavigationDrawerStructure'
import RightMenuToolbar from "./RightMenuToolbar";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import otherplayerDetails from '../containers/OtherPlayerDetails/OtherPlayerDetails'
import EditProfile from '../containers/profile/EditProfile'
import WriteFeedback from '../containers/feedback/WriteFeedbackListing'
import WriteAcademyFeedback from '../containers/feedback/WriteAcademyFeedback'
import AcademyFilter from '../containers/GuestScreen/AcademyFilter'
import BookTrial from '../containers/GuestScreen/BookTrial'


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
  Registration: {
    screen: Registration,
  },
  PaymentPage: {
    screen: PaymentPage,
  },
  AcademyListing: {
    screen: AcademyListing,
  },
  AcademyFilter: {
    screen: AcademyFilter,

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
        navigation={navigation} showHome={false} />,
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

});

export default BookPlayModule;

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
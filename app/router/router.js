import React from "react";
import {
  Platform,
  StatusBar,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  TabBarBottom,
} from "react-navigation";
// import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";

import welcome from "../containers/welcome/welcome";
import coachhome from "../containers/CoachScreen/CoachHome";
import guesthome from "../containers/GuestScreen/GuestHome";
import guestdetails from "../containers/GuestScreen/GuestDetails";
import parenthome from "../containers/ParentsScreen/ParentHome";
import AcademyListing from "../containers/GuestScreen/AcademyListing";
import AcademyProfile from "../containers/GuestScreen/AcademyProfile";
import CoachListing from "../containers/GuestScreen/CoachListing";
import PlayersListing from "../containers/GuestScreen/PlayersListing";
import CoachProfileDetail from "../containers/GuestScreen/CoachProfileDetail";
import AcademyBatch from "../containers/GuestScreen/AcademyBatch";
import CustomHeader from "../components/custom/CustomHeader";
import spalsh from "../containers/welcome/SplashScreen";
import IntroScreen from "../containers/welcome/IntroScreen";
import mybatch from "../containers/PlayerBatch/PlayerBatch";

import phoneauth from "../containers/Login/PhoneAuth";
import CoachMenuDrawer from "./CoachMenuDrawer";
import EditProfile from "../containers/profile/EditProfile";
import markAttendence from "../containers/CoachScreen/MarkAttendence";
import AddCompensatoryBatch from "../containers/CoachScreen/AddCompensatoryBatch";
import otherplayerDetails from "../containers/OtherPlayerDetails/OtherPlayerDetails";
import DeviceInfo from "react-native-device-info";
import { isSignedIn } from "../components/auth";
import BaseComponent from "../containers/BaseComponent";
import TournamentModule from "./TournamentRouter";
import coachBatchModule from "./CoachBatchRouter";
import userBatchModule from "./PlayerBatchRouter";
import PlayRoute from "./PlayRoute";
import PlayScreen from "././../containers/play/PlayScreen";
import NavigationDrawerStructure from "./NavigationDrawerStructure";
import RightMenuToolbar from "./RightMenuToolbar";
import coachPerfomenceModule from "./CoachPerformenceRouter";
import WriteFeedback from "../containers/feedback/WriteFeedbackListing";
import WriteAcademyFeedback from "../containers/feedback/WriteAcademyFeedback";
import userChallengeModule from "./ChallengeRouter";
import Switcher from "./Switcher";
import userHomeModule from "./UserHomeModule";
import CoachRewardsPoints from "../containers/rewards/CoachRewardsPoints";
import CoachGiveRewards from "../containers/rewards/CoachGiveRewards";
import ParentRewards from "../containers/rewards/ParentRewards";
import CoachMyFeedbackListing from "../containers/feedback/CoachMyFeedbackListing";
import EditOtherProfile from "../containers/profile/EditOtherProfile";
import ImageGuidelines from "../containers/profile/ImageGuidelines";
import TabBarHighlightLabel from "./TabBarHighlightLabel";
import CancelSession from "../containers/CoachScreen/Batch/CancelSession";
import Registration from "../containers/tournament/Registration";
import RegistrationSteps from "../containers/tournament/RegistrationSteps";
import RegistrationSuccessful from "../containers/tournament/RegistrationSuccessful";
import AddPartner from "../containers/tournament/AddPartner";
import AddPartnerWithPhone from "../containers/tournament/AddPartnerWithPhone";
import MyCalendar from "../containers/PlayerBatch/MyCalendar";
import AcademyFilter from "../containers/GuestScreen/AcademyFilter";
import ChallengeDisputeScreen from "../containers/CoachScreen/Challenge/ChallengeDisputeScreen";
import TournamentFixture from "../containers/tournament/TournamentFixture";
import TournamentScorer from "../containers/tournament/TournamentScorer";
import NotificationList from "../containers/notification/NotificationList";
import JobVacancies from "../containers/util/JobVacancies";
import TournamentGallerySliderZoom from "../containers/tournament/TournamentGallerySliderZoom";
import TournamentGallerySlider from "../containers/tournament/TournamentGallerySlider";
import AcademyFeedbackListing from "../containers/feedback/AcademyFeedbackListing";
import ViewPlayerPerformance from "../containers/UserScreen/ViewPlayerPerformance";
import WebViewScreen from "../containers/util/WebViewScreen";
import DietPlan from "../containers/ParentsScreen/DietPlan";
import EmptyScreen from "../containers/util/EmptyScreen";
import BookTrial from "../containers/GuestScreen/BookTrial";
import BookPlayModule from "./CourtBookingRouter";
import LeaderboardRoute from "../containers/challenge/LeaderBoardRoute";
import PaymentDetail from "../containers/payment/PaymentDetail";
import PaymentHistory from "../containers/payment/PaymentHistory";
import Test from "../containers/welcome/Test";
import ContactUs from "../containers/util/ContactUs";
import FaqScreen from "../containers/util/FaqScreen";
import EnrollmentForm from "../containers/profile/EnrollmentForm";
import GuestTrial from "../containers/GuestScreen/GuestTrial";
import GuestTrialTerms from "../containers/GuestScreen/GuestTrialTerms";
import SaveGuestTrial from "../containers/GuestScreen/SaveGuestTrial";
import PaymentDues from "../containers/payment/PaymentDues";
import PaymentReport from "../containers/payment/PaymentReport";
import PlanPurchaseView from "../components/custom/PlanPurchaseView";
import ShopScreen from "../containers/FirstTimeUser/ShopScreen";
import PlayerScreen from "../containers/FirstTimeUser/PlayerScreen";
import CoachScreen from "../containers/FirstTimeUser/CoachScreen";
import TrialBook from "../containers/FirstTimeUser/TrialBook";
import HomeScreen from "../containers/FirstTimeUser/HomeScreen";
import LoginSceen from "../containers/Login/LoginSceen";
import CongratulationScreen from "../containers/FirstTimeUser/TrialBook/CongratulationScreen";
import MyRequestsHome from "../containers/MyRequests/MyRequestsHome";
import MyBookingsScreen from "../containers/MyBookings/MyBookingsScreen";
import ShopTabRoute from "./ShopTabRoute";
import TabbarItem from "./TabbarItem";
import { white } from "../containers/util/colors";
import ShopPage from "../containers/ExsitingUser/ShopPage";
import LearnBookTrial from "../containers/FirstTimeUser/LearnBookTrial";
import CoachingPlan from "../containers/BuyPlan/CoachingPlan";
import PlayingPlan from "../containers/BuyPlan/PlayingPlan";
import ParentHome from "../containers/ParentsScreen/ParentHome";
import { Nunito_Bold } from "../containers/util/fonts";
import RequestHeaderLeft from "../atoms/requestHeaderLeft";
import NotificationsScreen from "../containers/notification/NotificationsScreen";
import BookSlotScreen from "../containers/play/BookSlotScreen";
import RenewPlayPlan from "../containers/RenewPlan/RenewPlayPlan";
import DisplayLearnTrial from "../containers/FirstTimeUser/TrialBook/DisplayLearnTrial";
import LearnTrialList from "../containers/FirstTimeUser/TrialBook/LearnTrialList";
import RequestHeaderBack from "../atoms/requestHeaderBack";
import PlayTrialList from "../containers/FirstTimeUser/TrialBook/PlayTrialList";
import DisplayPlayTrial from "../containers/FirstTimeUser/TrialBook/DisplayPlayTrial";
import RequestHeaderRight from "../atoms/requestHeaderRight";
import PrivacyPolicy from "../containers/util/PrivacyPolicy";
import BlogScreen from "../containers/util/BlogScreen";
import DeleteAccount from "../containers/util/DeleteAccount";
import { LeaveRequestPage } from "../containers/Leave/LeaveRequestPage";

const deviceModel = DeviceInfo.getModel();

const headerStyle = {
  marginTop: Platform.OS === "android" ? 0 : 0,
};
const loginModule = createStackNavigator({
  Splash: {
    screen: spalsh,
    navigationOptions: {
      // title: "Sign In",
      headerStyle,
      header: null,
    },
  },
  Welcome: {
    screen: welcome,
    navigationOptions: {
      // title: "Sign In",
      headerStyle,
      header: null,
    },
  },
  Test: {
    screen: Test,
  },
  MyCalendar: {
    screen: MyCalendar,
  },
  // IntroScreen: {
  //     screen: IntroScreen,
  //     navigationOptions: {
  //         // title: "Sign In",
  //         headerStyle,
  //         header: null
  //     }
  // },
  Login: {
    // screen: phoneauth,
    screen: LoginSceen,
    navigationOptions: {
      header: null,
      //header:null
    },
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: ({ navigation }) => ({
      title: "Edit Profile",
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showMenuAction={false}
          showBackAction={false}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  ImageGuidelines: {
    screen: ImageGuidelines,
    navigationOptions: ({ navigation }) => ({
      title: "Image Guidelines",
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showMenuAction={false}
          showBackAction={true}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
});

const GuestHomeModule = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  GuestTrial: {
    screen: GuestTrial,
  },
  AcademyListing: {
    screen: AcademyListing,
  },
  AcademyFilter: {
    screen: AcademyFilter,
  },
  Login: {
    screen: phoneauth,
    navigationOptions: {
      header: null,
      //header:null
    },
  },
  AcademyProfile: {
    screen: AcademyProfile,
    navigationOptions: ({ navigation }) => ({
      //header: <CustomHeader title="Society Profile" showBackArrow={true} />,
      title: "Society Profile",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={true}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  CoachListing: {
    screen: CoachListing,
    navigationOptions: ({ navigation }) => ({
      title: "Coach Listing",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={true}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  ViewPlayersListing: {
    screen: PlayersListing,
    navigationOptions: ({ navigation }) => ({
      title: "View Players",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  PlayersListing: {
    screen: PlayersListing,
    navigationOptions: ({ navigation }) => ({
      title: "Players Listing",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={true}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  OtherPlayerDeatils: {
    screen: otherplayerDetails,
    navigationOptions: ({ navigation }) => ({
      title: "Player Detail",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  CoachProfileDetail: {
    screen: CoachProfileDetail,
    navigationOptions: ({ navigation }) => ({
      title: "Coach Profile",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={true}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: ({ navigation }) => ({
      title: "Edit Profile",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  WriteFeedback: {
    screen: WriteFeedback,
    navigationOptions: ({ navigation }) => ({
      title: "Write Feedbacks",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={true}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  WriteAcademyFeedback: {
    screen: WriteAcademyFeedback,
    navigationOptions: ({ navigation }) => ({
      title: "Give Feedback",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  AcademyBatch: {
    screen: AcademyBatch,
    navigationOptions: ({ navigation }) => ({
      title: "View Batches",
      headerLeft: (
        <NavigationDrawerStructure
          showDrawer={false}
          navigationProps={navigation}
          showBackAction={true}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  BookTrial: {
    screen: BookTrial,
    navigationOptions: ({ navigation }) => ({
      title: "Book Trial",
      headerLeft: (
        <NavigationDrawerStructure
          showDrawer={false}
          navigationProps={navigation}
          showBackAction={true}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  WebViewScreen: {
    screen: WebViewScreen,
    navigationOptions: ({ navigation }) => ({
      title: "About Us",
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showBackAction={true}
          showDrawer={false}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  NotificationList: {
    screen: NotificationList,
    navigationOptions: ({ navigation }) => ({
      title: "Notification",
      headerTitleStyle: style.headerStyle,
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showDrawer={false}
          showBackAction={true}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },

      headerTintColor: "#000",
    }),
  },
  ContactUs: {
    screen: ContactUs,
    navigationOptions: ({ navigation }) => ({
      title: "Contact Us",
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showBackAction={true}
          showDrawer={false}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  ImageGuidelines: {
    screen: ImageGuidelines,
    navigationOptions: ({ navigation }) => ({
      title: "Image Guidelines",
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showMenuAction={false}
          showBackAction={true}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  GuestTrialTerms: {
    screen: GuestTrialTerms,
    navigationOptions: ({ navigation }) => ({
      title: "Trial Session",
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showDrawer={false}
          showBackAction={true}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showNotification={false}
        />
      ),
    }),
  },
  SaveGuestTrial: {
    screen: SaveGuestTrial,
    navigationOptions: ({ navigation }) => ({
      title: "Trial Session",
      headerTitleStyle: style.headerStyle,
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showDrawer={false}
          showBackAction={true}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showNotification={false}
        />
      ),
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },

      headerTintColor: "#000",
    }),
  },
  SubscriptionPurchaseScreen: {
    screen: PlanPurchaseView,

    navigationOptions: ({ navigation }) => ({
      header: null,
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
});

const tabBarControllerBook = createBottomTabNavigator({
  Home: {
    screen: userHomeModule,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Home"
          focused={focused}
          activeIcon={require("../images/ic_tab_home.png")}
        />
      ),
    },
  },
  Batch: {
    screen: userBatchModule,
    navigationOptions: {
      tabBarLabel: "Batch",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Batch"
          focused={focused}
          activeIcon={require("../images/ic_tab_batch.png")}
        />
      ),
    },
  },
  Tournament: {
    screen: TournamentModule,
    navigationOptions: {
      tabBarLabel: "Tournament",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Tournament"
          focused={focused}
          activeIcon={require("../images/ic_tab_tournament.png")}
        />
      ),
    },
  },
  Challenge: {
    screen: userChallengeModule,
    navigationOptions: {
      tabBarLabel: "Challenge",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Challenge"
          focused={focused}
          activeIcon={require("../images/ic_tab_challenge.png")}
        />
      ),
    },
  },
  BookandPlay: {
    screen: BookPlayModule,
    navigationOptions: {
      tabBarLabel: "Book and Play",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Book&Play"
          focused={focused}
          activeIcon={require("../images/ic_tab_booking.png")}
        />
      ),
    },
  },
});

const playerBookDrawer = createDrawerNavigator(
  {
    playerfirst: {
      screen: tabBarControllerBook,
      // navigationOptions: {
      //     header: <CustomHeader title="Academy" />,
      // }
    },
  },
  {
    contentComponent: ({ navigation }) => {
      return <CoachMenuDrawer navigation={navigation} />;
    },
    drawerWidth: Dimensions.get("window").width * 0.86,
  }
);

const tabBarController = createBottomTabNavigator({
  Home: {
    screen: userHomeModule,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Home"
          focused={focused}
          activeIcon={require("../images/ic_tab_home.png")}
        />
      ),
    },
  },
  Batch: {
    screen: userBatchModule,
    navigationOptions: {
      tabBarLabel: "Batch",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Batch"
          focused={focused}
          activeIcon={require("../images/ic_tab_batch.png")}
        />
      ),
    },
  },
  Tournament: {
    screen: TournamentModule,
    navigationOptions: {
      tabBarLabel: "Tournament",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Tournament"
          focused={focused}
          activeIcon={require("../images/ic_tab_tournament.png")}
        />
      ),
    },
  },
  Challenge: {
    screen: userChallengeModule,
    navigationOptions: {
      tabBarLabel: "Challenge",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Challenge"
          focused={focused}
          activeIcon={require("../images/ic_tab_challenge.png")}
        />
      ),
    },
  },
});

const playerDrawer = createDrawerNavigator(
  {
    playerfirst: {
      screen: tabBarController,
      // navigationOptions: {
      //     header: <CustomHeader title="Academy" />,
      // }
    },
  },
  {
    contentComponent: ({ navigation }) => {
      return <CoachMenuDrawer navigation={navigation} />;
    },
    drawerWidth: Dimensions.get("window").width * 0.86,
  }
);

const coachHomeModule = createStackNavigator(
  {
    CoachHome: {
      screen: coachhome,
      // navigationOptions: ({ navigation }) => ({
      //     title: "Machaxi",
      //     headerLeft: <NavigationDrawerStructure navigationProps={navigation}
      //         showBackAction={false}
      //     />,
      //     headerRight: <RightMenuToolbar navigationProps={navigation}
      //         navigation={navigation} showHome={false} />,
      //     headerTitleStyle: style.headerStyle,
      //     headerStyle: {
      //         backgroundColor: '#FFFFFF',
      //     },

      // })
    },
    CoachMyFeedbackListing: {
      screen: CoachMyFeedbackListing,
      navigationOptions: ({ navigation }) => ({
        title: "My Feedback",
        headerLeft: (
          <NavigationDrawerStructure
            navigationProps={navigation}
            showBackAction={true}
            showDrawer={false}
          />
        ),
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={false}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },

    MarkAttendence: {
      screen: markAttendence,
      navigationOptions: ({ navigation }) => ({
        title: "Mark Attendence",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={false}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    AddCompensatoryBatch: {
      screen: AddCompensatoryBatch,
      // navigationOptions: ({ navigation }) => ({
      //     title: "Add Compensatory Batch",
      //     headerLeft: <NavigationDrawerStructure navigationProps={navigation}
      //         showDrawer={false} showBackAction={true}/>,
      //     headerRight: <RightMenuToolbar navigationProps={navigation}
      //         navigation={navigation} showNotification={false} />,
      //     headerTitleStyle: style.headerStyle,
      //     headerStyle: {
      //         backgroundColor: '#FFFFFF',
      //     },
      // })
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: ({ navigation }) => ({
        title: "Edit Profile",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={false}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    CoachRewardPoints: {
      screen: CoachRewardsPoints,
      navigationOptions: ({ navigation }) => ({
        title: "Reward points",
        headerLeft: (
          <NavigationDrawerStructure
            navigationProps={navigation}
            showDrawer={true}
            showBackAction={true}
          />
        ),
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={true}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    CoachGiveRewards: {
      screen: CoachGiveRewards,
      navigationOptions: ({ navigation }) => ({
        title: "Award Players",
        headerLeft: (
          <NavigationDrawerStructure
            navigationProps={navigation}
            showDrawer={true}
            showBackAction={true}
          />
        ),
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={true}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },

    PlayersListing: {
      screen: PlayersListing,
      navigationOptions: ({ navigation }) => ({
        title: "Players Listing",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={true}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    OtherPlayerDeatils: {
      screen: otherplayerDetails,
      navigationOptions: ({ navigation }) => ({
        title: "Player Detail",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={false}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    AcademyListing: {
      screen: AcademyListing,
      navigationOptions: ({ navigation }) => ({
        title: "Machaxi",
        headerTitleStyle: style.headerStyle,
        headerLeft: (
          <NavigationDrawerStructure
            navigationProps={navigation}
            showDrawer={false}
            showBackAction={true}
          />
        ),
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showNotification={false}
          />
        ),
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },

        headerTintColor: "#000",
      }),
    },
    ViewPlayersListing: {
      screen: PlayersListing,
      navigationOptions: ({ navigation }) => ({
        title: "View Players",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={false}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    AcademyProfile: {
      screen: AcademyProfile,
      navigationOptions: ({ navigation }) => ({
        //header: <CustomHeader title="Society Profile" showBackArrow={true} />,
        title: "Society Profile",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={true}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    CoachListing: {
      screen: CoachListing,
      navigationOptions: ({ navigation }) => ({
        title: "Coach Listing",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={true}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    PlayersListing: {
      screen: PlayersListing,
      navigationOptions: ({ navigation }) => ({
        title: "Players Listing",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={true}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    CoachProfileDetail: {
      screen: CoachProfileDetail,
      navigationOptions: ({ navigation }) => ({
        title: "Coach Profile",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={true}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: ({ navigation }) => ({
        title: "Edit Profile",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={true}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    WriteFeedback: {
      screen: WriteFeedback,
      navigationOptions: ({ navigation }) => ({
        title: "Write Feedbacks",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={true}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    WriteAcademyFeedback: {
      screen: WriteAcademyFeedback,
      navigationOptions: ({ navigation }) => ({
        title: "Give Feedback",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={false}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    AcademyFeedbackListing: {
      screen: AcademyFeedbackListing,
      // navigationOptions: ({ navigation }) => ({
      //     title: "Society Feedback",
      //     headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      //     headerRight: <RightMenuToolbar navigationProps={navigation}
      //         navigation={navigation} showHome={false} />,
      //     headerTitleStyle: style.headerStyle,
      //     headerStyle: {
      //         backgroundColor: '#FFFFFF',
      //     },

      // })
    },

    TournamentFixture: {
      screen: TournamentFixture,
      navigationOptions: ({ navigation }) => ({
        title: "Fixture",
        headerTitleStyle: style.headerStyle,
        headerLeft: (
          <NavigationDrawerStructure
            navigationProps={navigation}
            showBackAction={true}
          />
        ),
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showNotification={false}
          />
        ),
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
        headerTintColor: "#000",
      }),
    },
    ChallengeDisputeScreen: {
      screen: ChallengeDisputeScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Challenge Dispute",
        headerLeft: (
          <NavigationDrawerStructure
            navigationProps={navigation}
            showBackAction={true}
          />
        ),
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={true}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    TournamentScorer: {
      screen: TournamentScorer,
      navigationOptions: ({ navigation }) => ({
        title: "Tournament Scorer",
        headerTitleStyle: style.headerStyle,
        headerLeft: (
          <NavigationDrawerStructure
            navigationProps={navigation}
            showBackAction={true}
            showDrawer={false}
          />
        ),
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showNotification={false}
          />
        ),
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },

        headerTintColor: "#000",
      }),
    },
    AcademyFilter: {
      screen: AcademyFilter,
    },

    JobVacancies: {
      screen: JobVacancies,
      navigationOptions: ({ navigation }) => ({
        title: "Job Vacancies",
        headerTitleStyle: style.headerStyle,
        headerLeft: (
          <NavigationDrawerStructure
            navigationProps={navigation}
            showDrawer={true}
            showBackAction={true}
          />
        ),
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showNotification={false}
            showHome={true}
          />
        ),
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },

        headerTintColor: "#000",
      }),
    },
    TournamentGallerySlider: {
      screen: TournamentGallerySlider,
      navigationOptions: ({ navigation }) => ({
        title: "Gallery",
        headerTitleStyle: style.headerStyle,
        headerLeft: (
          <NavigationDrawerStructure
            navigationProps={navigation}
            showDrawer={false}
            showBackAction={true}
          />
        ),
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showNotification={false}
          />
        ),
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },

        headerTintColor: "#000",
      }),
    },
    TournamentGallerySliderZoom: {
      screen: TournamentGallerySliderZoom,
      navigationOptions: ({ navigation }) => ({
        title: "Gallery",
        headerTitleStyle: style.headerStyle,
        headerLeft: (
          <NavigationDrawerStructure
            navigationProps={navigation}
            showDrawer={false}
            showBackAction={true}
          />
        ),
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showNotification={false}
          />
        ),
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },

        headerTintColor: "#000",
      }),
    },
    AcademyBatch: {
      screen: AcademyBatch,
      navigationOptions: ({ navigation }) => ({
        title: "View Batches",
        headerLeft: (
          <NavigationDrawerStructure
            showDrawer={false}
            navigationProps={navigation}
            showBackAction={true}
          />
        ),
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={false}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },

    WebViewScreen: {
      screen: WebViewScreen,
      navigationOptions: ({ navigation }) => ({
        title: "About Us",
        headerLeft: (
          <NavigationDrawerStructure
            navigationProps={navigation}
            showBackAction={true}
            showDrawer={false}
          />
        ),
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={false}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    BookTrial: {
      screen: BookTrial,
      navigationOptions: ({ navigation }) => ({
        title: "Book Trial",
        headerLeft: (
          <NavigationDrawerStructure
            showDrawer={false}
            navigationProps={navigation}
            showBackAction={true}
          />
        ),
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={false}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    LeaderboardRoute: {
      screen: LeaderboardRoute,
      navigationOptions: ({ navigation }) => ({
        title: "Challenge Leaderboard",
        headerLeft: (
          <NavigationDrawerStructure
            navigationProps={navigation}
            showBackAction={true}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    NotificationList: {
      screen: NotificationList,
      navigationOptions: ({ navigation }) => ({
        title: "Notification",
        headerTitleStyle: style.headerStyle,
        headerLeft: (
          <NavigationDrawerStructure
            navigationProps={navigation}
            showDrawer={false}
            showBackAction={true}
          />
        ),
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={false}
          />
        ),
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },

        headerTintColor: "#000",
      }),
    },
    ContactUs: {
      screen: ContactUs,
      navigationOptions: ({ navigation }) => ({
        title: "Contact Us",
        headerLeft: (
          <NavigationDrawerStructure
            navigationProps={navigation}
            showBackAction={true}
            showDrawer={false}
          />
        ),
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={false}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    ImageGuidelines: {
      screen: ImageGuidelines,
      navigationOptions: ({ navigation }) => ({
        title: "Image Guidelines",
        headerLeft: (
          <NavigationDrawerStructure
            navigationProps={navigation}
            showMenuAction={false}
            showBackAction={true}
          />
        ),
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={false}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    DuePaymentsScreen: {
      screen: PaymentDues,
      navigationOptions: ({ navigation }) => ({
        title: "Payment Dues",
        headerLeft: (
          <NavigationDrawerStructure
            navigationProps={navigation}
            showMenuAction={false}
            showBackAction={true}
          />
        ),
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={false}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
    PaymentReport: {
      screen: PaymentReport,
      navigationOptions: ({ navigation }) => ({
        title: "Payment Report",
        headerLeft: (
          <NavigationDrawerStructure
            navigationProps={navigation}
            showMenuAction={false}
            showBackAction={true}
          />
        ),
        headerRight: (
          <RightMenuToolbar
            navigationProps={navigation}
            navigation={navigation}
            showHome={false}
          />
        ),
        headerTitleStyle: style.headerStyle,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }),
    },
  },
  {
    contentComponent: ({ navigation }) => {
      return <CoachMenuDrawer navigation={navigation} />;
    },
    drawerWidth: Dimensions.get("window").width * 0.86,
  }
);

const tabBarControllerBookCoach = createBottomTabNavigator({
  Home: {
    screen: coachHomeModule,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Home"
          bgColor={white}
          focused={focused}
          activeIcon={require("../images/ic_tab_home.png")}
        />
      ),
    },
  },
  Batch: {
    screen: coachBatchModule,
    navigationOptions: {
      tabBarLabel: "Batch",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Batch"
          bgColor={white}
          focused={focused}
          activeIcon={require("../images/ic_tab_batch.png")}
        />
      ),
    },
  },
  Tournament: {
    screen: TournamentModule,
    navigationOptions: {
      tabBarLabel: "Tournament",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Tournament"
          focused={focused}
          bgColor={white}
          activeIcon={require("../images/ic_tab_tournament.png")}
        />
      ),
    },
  },
  Performence: {
    screen: coachPerfomenceModule,
    navigationOptions: {
      tabBarLabel: "Performance",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Performance"
          bgColor={white}
          focused={focused}
          activeIcon={require("../images/ic_tab_performance.png")}
        />
      ),
    },
  },
  BookandPlay: {
    screen: BookPlayModule,
    navigationOptions: {
      tabBarLabel: "Book and Play",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Book&Play"
          bgColor={white}
          focused={focused}
          activeIcon={require("../images/ic_tab_booking.png")}
        />
      ),
    },
  },
});

const coachBookDrawer = createDrawerNavigator(
  {
    coachfirst: {
      screen: tabBarControllerBookCoach,
      // navigationOptions: {
      //     header: <CustomHeader title="Academy" />,
      // }
    },
  },
  {
    contentComponent: ({ navigation }) => {
      return <CoachMenuDrawer navigation={navigation} />;
    },
    drawerWidth: Dimensions.get("window").width * 0.86,
  }
);

const tabBarControllerCoach = createBottomTabNavigator({
  Home: {
    screen: coachHomeModule,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Home"
          bgColor={white}
          focused={focused}
          activeIcon={require("../images/ic_tab_home.png")}
        />
      ),
    },
  },
  Batch: {
    screen: coachBatchModule,
    navigationOptions: {
      tabBarLabel: "Batch",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Batch"
          bgColor={white}
          focused={focused}
          activeIcon={require("../images/ic_tab_batch.png")}
        />
      ),
    },
  },
  Tournament: {
    screen: TournamentModule,
    navigationOptions: {
      tabBarLabel: "Tournament",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Tournament"
          focused={focused}
          bgColor={white}
          activeIcon={require("../images/ic_tab_tournament.png")}
        />
      ),
    },
  },
  Performence: {
    screen: coachPerfomenceModule,
    navigationOptions: {
      tabBarLabel: "Performance",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Performance"
          focused={focused}
          bgColor={white}
          activeIcon={require("../images/ic_tab_performance.png")}
        />
      ),
    },
  },
});

const coachDrawer = createDrawerNavigator(
  {
    coachfirst: {
      screen: tabBarControllerCoach,
      // navigationOptions: {
      //     header: <CustomHeader title="Academy" />,
      // }
    },
  },
  {
    contentComponent: ({ navigation }) => {
      return <CoachMenuDrawer navigation={navigation} />;
    },
    drawerWidth: Dimensions.get("window").width * 0.86,
  }
);

const tabBarControllerBookGuest = createBottomTabNavigator({
  Home: {
    screen: GuestHomeModule,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Home"
          focused={focused}
          activeIcon={require("../images/ic_tab_home.png")}
        />
      ),
    },
  },

  Tournament: {
    screen: TournamentModule,
    navigationOptions: {
      tabBarLabel: "Tournament",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Tournament"
          focused={focused}
          activeIcon={require("../images/ic_tab_tournament.png")}
        />
      ),
    },
  },
  // BookandPlay: {
  //     screen: BookPlayModule,
  //     navigationOptions: {
  //         tabBarLabel: 'Book and Play',
  //         tabBarLabel: ({ focused }) =>
  //             <TabBarHighlightLabel
  //                 label='Book&Play'
  //                 focused={focused}
  //                 activeIcon={require('../images/ic_tab_booking.png')} />,
  //     }
  // },
});

const guestBookDrawer = createDrawerNavigator(
  {
    Guestfirst: {
      screen: tabBarControllerBookGuest,
      // navigationOptions: {
      //     header: <CustomHeader title="Academy" />,
      // }
    },
  },
  {
    contentComponent: ({ navigation }) => {
      return <CoachMenuDrawer navigation={navigation} />;
    },
    drawerWidth: Dimensions.get("window").width * 0.86,
  }
);

const WIDTH = Dimensions.get("window").width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.86,
  contentComponent: ({ navigation }) => {
    return <CoachMenuDrawer navigation={navigation} />;
  },
};
const style = StyleSheet.create({
  headerStyle: {
    color: "#191919",
    fontFamily: "Quicksand-Medium",
    fontWeight: "400",
    textAlign: "center",
    fontSize: 16,
    flexGrow: 1,
    alignSelf: "center",
  },
  titlestyle: {
    color: "#F2F2F2",
    fontFamily: Nunito_Bold,
    textAlign: "center",
    fontSize: 20,
    flexGrow: 1,
    alignSelf: "center",
  },
});

const parentHomeModule = createStackNavigator({
  ParentHome: {
    screen: parenthome,
    navigationOptions: {
      title: "Sign In",
      // headerStyle,
      // header: null
    },
  },
  SubscriptionPurchaseScreen: {
    screen: PlanPurchaseView,

    navigationOptions: ({ navigation }) => ({
      header: null,
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  ViewPlayerPerformance: {
    screen: ViewPlayerPerformance,
    navigationOptions: ({ navigation }) => ({
      title: "My Stats",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },

  ParentRewards: {
    screen: ParentRewards,
    navigationOptions: ({ navigation }) => ({
      title: "Reward points",
      headerTitleStyle: style.headerStyle,
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showDrawer={true}
          showBackAction={true}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showNotification={false}
        />
      ),
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },

      headerTintColor: "#000",
    }),
  },
  AcademyListing: {
    screen: AcademyListing,
    navigationOptions: ({ navigation }) => ({
      title: "Browse Academies",
      headerTitleStyle: style.headerStyle,
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showDrawer={true}
          showBackAction={true}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showNotification={false}
          showHome={true}
        />
      ),
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },

      headerTintColor: "#000",
    }),
  },
  AcademyProfile: {
    screen: AcademyProfile,
    navigationOptions: ({ navigation }) => ({
      //header: <CustomHeader title="Society Profile" showBackArrow={true} />,
      title: "Society Profile",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={true}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  CoachListing: {
    screen: CoachListing,
    navigationOptions: ({ navigation }) => ({
      title: "Coach Listing",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  ViewPlayersListing: {
    screen: PlayersListing,
    navigationOptions: ({ navigation }) => ({
      title: "View Players",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  PlayersListing: {
    screen: PlayersListing,
    navigationOptions: ({ navigation }) => ({
      title: "Academy Players",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  CoachProfileDetail: {
    screen: CoachProfileDetail,
    navigationOptions: ({ navigation }) => ({
      title: "Coach Profile",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={true}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  OtherPlayerDeatils: {
    screen: otherplayerDetails,
    navigationOptions: ({ navigation }) => ({
      title: "Player Detail",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={true}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: ({ navigation }) => ({
      title: "Edit Profile",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={true}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  EditOtherProfile: {
    screen: EditOtherProfile,
    navigationOptions: ({ navigation }) => ({
      title: "Edit Profile",
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showBackAction={true}
          showDrawer={false}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={true}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  EnrollmentForm: {
    screen: EnrollmentForm,
    navigationOptions: ({ navigation }) => ({
      title: "Enrollment Form",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={true}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  ImageGuidelines: {
    screen: ImageGuidelines,
    navigationOptions: ({ navigation }) => ({
      title: "Image Guidelines",
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showBackAction={true}
          showDrawer={false}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  WriteFeedback: {
    screen: WriteFeedback,
    navigationOptions: ({ navigation }) => ({
      title: "Write Feedbacks",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={true}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },

  WriteAcademyFeedback: {
    screen: WriteAcademyFeedback,
    navigationOptions: ({ navigation }) => ({
      title: "Give Feedback",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  AcademyFilter: {
    screen: AcademyFilter,
  },
  NotificationList: {
    screen: NotificationList,
    navigationOptions: ({ navigation }) => ({
      title: "Notification",
      headerTitleStyle: style.headerStyle,
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showDrawer={false}
          showBackAction={true}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },

      headerTintColor: "#000",
    }),
  },
  TournamentGallerySlider: {
    screen: TournamentGallerySlider,
    navigationOptions: ({ navigation }) => ({
      title: "Gallery",
      headerTitleStyle: style.headerStyle,
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showDrawer={false}
          showBackAction={true}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showNotification={false}
        />
      ),
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },

      headerTintColor: "#000",
    }),
  },
  TournamentGallerySliderZoom: {
    screen: TournamentGallerySliderZoom,
    navigationOptions: ({ navigation }) => ({
      title: "Gallery",
      headerTitleStyle: style.headerStyle,
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showDrawer={false}
          showBackAction={true}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showNotification={false}
        />
      ),
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },

      headerTintColor: "#000",
    }),
  },
  AcademyBatch: {
    screen: AcademyBatch,
    navigationOptions: ({ navigation }) => ({
      title: "View Batches",
      headerLeft: (
        <NavigationDrawerStructure
          showDrawer={false}
          navigationProps={navigation}
          showBackAction={true}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },

  DietPlan: {
    screen: DietPlan,
  },
  BookTrial: {
    screen: BookTrial,
    navigationOptions: ({ navigation }) => ({
      title: "Book Trial",
      headerLeft: (
        <NavigationDrawerStructure
          showDrawer={false}
          navigationProps={navigation}
          showBackAction={true}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  PaymentDetail: {
    screen: PaymentDetail,
    navigationOptions: ({ navigation }) => ({
      title: "Payment",
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showBackAction={true}
          showDrawer={false}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  PaymentHistory: {
    screen: PaymentHistory,
    navigationOptions: ({ navigation }) => ({
      title: "Payment History",
      headerLeft: (
        <NavigationDrawerStructure
          showDrawer={false}
          navigationProps={navigation}
          showBackAction={true}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  WebViewScreen: {
    screen: WebViewScreen,
    navigationOptions: ({ navigation }) => ({
      title: "About Us",
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showBackAction={true}
          showDrawer={false}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  ContactUs: {
    screen: ContactUs,
    navigationOptions: ({ navigation }) => ({
      title: "Contact Us",
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showBackAction={true}
          showDrawer={false}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  FaqScreen: {
    screen: FaqScreen,
    navigationOptions: ({ navigation }) => ({
      title: "FAQ",
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showBackAction={true}
          showDrawer={false}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
});

const tabBarControllerBookParent = createBottomTabNavigator({
  Home: {
    screen: parentHomeModule,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Home"
          focused={focused}
          activeIcon={require("../images/ic_tab_home.png")}
        />
      ),
    },
  },
  Batch: {
    screen: userBatchModule,
    navigationOptions: {
      tabBarLabel: "Batch",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Batch"
          focused={focused}
          activeIcon={require("../images/ic_tab_batch.png")}
        />
      ),
    },
  },
  Tournament: {
    screen: TournamentModule,
    navigationOptions: {
      tabBarLabel: "Tournament",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Tournament"
          focused={focused}
          activeIcon={require("../images/ic_tab_tournament.png")}
        />
      ),
    },
  },
  Challenge: {
    screen: userChallengeModule,
    navigationOptions: {
      tabBarLabel: "Challenge",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Challenge"
          focused={focused}
          activeIcon={require("../images/ic_tab_challenge.png")}
        />
      ),
    },
  },
  BookandPlay: {
    screen: BookPlayModule,
    navigationOptions: {
      tabBarLabel: "Book and Play",
      tabBarLabel: ({ focused }) => (
        <TabBarHighlightLabel
          label="Book&Play"
          focused={focused}
          activeIcon={require("../images/ic_tab_booking.png")}
        />
      ),
    },
  },
});

const LearnStack = createStackNavigator({
  Play: {
    screen: ParentHome,
  },
  BookLearnTrail: {
    screen: TrialBook,
    navigationOptions: ({ navigation }) => ({
      title: "Learn",
      headerLeft: <RequestHeaderLeft navigation={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  CoachingPlan: {
    screen: CoachingPlan,
    navigationOptions: ({ navigation }) => ({
      title: "Learn",
      headerLeft: <RequestHeaderLeft navigation={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: ({ navigation }) => ({
      title: "Edit Profile",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  ImageGuidelines: {
    screen: ImageGuidelines,
    navigationOptions: ({ navigation }) => ({
      title: "Image Guidelines",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  PaymentDetail: {
    screen: PaymentDetail,
    navigationOptions: ({ navigation }) => ({
      title: "Payment",
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showBackAction={true}
          showDrawer={false}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  CoachProfileDetail: {
    screen: CoachProfileDetail,
    navigationOptions: ({ navigation }) => ({
      title: "Coach Profile",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  PaymentHistory: {
    screen: PaymentHistory,
    navigationOptions: ({ navigation }) => ({
      title: "Payment History",
      headerLeft: (
        <NavigationDrawerStructure
          showDrawer={false}
          navigationProps={navigation}
          showBackAction={true}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.headerStyle,
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  WebViewScreen: {
    screen: WebViewScreen,
    navigationOptions: ({ navigation }) => ({
      title: "About Us",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  PrivacyPolicy: {
    screen: PrivacyPolicy,
    navigationOptions: ({ navigation }) => ({
      title: "Privacy Policy",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  BlogScreen: {
    screen: BlogScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Blog",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  DeleteAccount: {
    screen: DeleteAccount,
    navigationOptions: ({ navigation }) => ({
      title: "Delete Account",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  ContactUs: {
    screen: ContactUs,
    navigationOptions: ({ navigation }) => ({
      title: "Contact Us",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  LearnTrialList: {
    screen: LearnTrialList,
    navigationOptions: ({ navigation }) => ({
      title: "Learn Trial",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  ApplyLeave: {
    screen: LeaveRequestPage,
    navigationOptions: ({ navigation }) => ({
      title: " Pause Membership",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  
  DisplayLearnTrial: {
    screen: DisplayLearnTrial,
    navigationOptions: ({ navigation }) => ({
      title: "Learn Trial",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  PlayersListing: {
    screen: PlayersListing,
    navigationOptions: ({ navigation }) => ({
      title: "Other Players",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  OtherPlayerDeatils: {
    screen: otherplayerDetails,
    navigationOptions: ({ navigation }) => ({
      title: "Player Detail",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  CoachListing: {
    screen: CoachListing,
    navigationOptions: ({ navigation }) => ({
      title: "Coach Listing",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  ViewPlayerPerformance: {
    screen: ViewPlayerPerformance,
    navigationOptions: ({ navigation }) => ({
      title: "My Stats",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  WriteAcademyFeedback: {
    screen: WriteAcademyFeedback,
    navigationOptions: ({ navigation }) => ({
      title: "Give Feedback",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  Batch: {
    screen: mybatch,
    navigationOptions: ({ navigation }) => ({
      title: "My Batch",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showHome={false}
        />
      ),
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  FaqScreen: {
    screen: FaqScreen,
    navigationOptions: ({ navigation }) => ({
      title: "FAQ",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  ParentRewards: {
    screen: ParentRewards,
    navigationOptions: ({ navigation }) => ({
      title: "Reward points",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  AcademyListing: {
    screen: AcademyListing,
    navigationOptions: ({ navigation }) => ({
      title: "Browse Academies",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  WriteFeedback: {
    screen: WriteFeedback,
    navigationOptions: ({ navigation }) => ({
      title: "Write Feedbacks",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  AcademyFilter: {
    screen: AcademyFilter,
  },
  TournamentGallerySlider: {
    screen: TournamentGallerySlider,
    navigationOptions: ({ navigation }) => ({
      title: "Gallery",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  TournamentGallerySliderZoom: {
    screen: TournamentGallerySliderZoom,
    navigationOptions: ({ navigation }) => ({
      title: "Gallery",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  AcademyBatch: {
    screen: AcademyBatch,
    navigationOptions: ({ navigation }) => ({
      title: "View Batches",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  DietPlan: {
    screen: DietPlan,
  },
});

const tabBarControllerLearn = createBottomTabNavigator(
  {
    Home: {
      screen: LearnStack,
      navigationOptions: {
        tabBarLabel: "Learn",
        tabBarLabel: ({ focused }) => (
          <TabbarItem
            label="Learn"
            focused={focused}
            // gradientColors={["#595466", "#9a97a2"]}
            gradientColors={["#221b33", "#595466"]}
            activeIndicatorColor={white}
            inactiveIndicatorColor={white}
            bottomBarColor={"transparent"}
            focusedIcon={focused ? require("../images/learn_active.png") : null}
            activeIcon={require("../images/learn.png")}
          />
        ),
      },
    },
    PlayingMainScreen: {
      screen: PlayRoute,
      navigationOptions: {
        tabBarLabel: "Play",
        tabBarLabel: ({ focused }) => (
          <TabbarItem
            label="Play"
            focused={focused}
            gradientColors={["#595466", "#9a97a2"]}
            activeIndicatorColor={white}
            inactiveIndicatorColor={white}
            bottomBarColor={"transparent"}
            focusedIcon={
              focused ? require("../images/play_highlight.png") : null
            }
            activeIcon={require("../images/play_inactive.png")}
          />
        ),
      },
    },
    ShopTabMainScreen: {
      screen: ShopTabRoute,
      navigationOptions: {
        tabBarLabel: "Shop",
        tabBarLabel: ({ focused }) => (
          <TabbarItem
            label="Shop"
            focused={focused}
            activeIndicatorColor={white}
            gradientColors={["#9a97a2", "#595466"]}
            inactiveIndicatorColor={white}
            bottomBarColor={"transparent"}
            focusedIcon={focused ? require("../images/shop_active.png") : null}
            activeIcon={require("../images/shop.png")}
          />
        ),
      },
    },
    Tournament: {
      screen: TournamentModule,
      navigationOptions: {
        tabBarLabel: "Tournament",
        tabBarLabel: ({ focused }) => (
          <TabbarItem
            label="Tournament"
            activeIndicatorColor={white}
            gradientColors={["#595466", "#221b33"]}
            inactiveIndicatorColor={white}
            focused={focused}
            bottomBarColor={"transparent"}
            focusedIcon={
              focused ? require("../images/tournament_active.png") : null
            }
            activeIcon={require("../images/tournament.png")}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        marginBottom: deviceModel === "iPhone 11 Pro" ? -40 : 0,
      },
    },
  }
);

const parentBookDrawer = createDrawerNavigator(
  {
    Guestfirst: {
      screen: tabBarControllerBookParent,
      // navigationOptions: {
      //     header: <CustomHeader title="Academy" />,
      // }
    },
  },
  {
    contentComponent: ({ navigation }) => {
      return <CoachMenuDrawer navigation={navigation} />;
    },
    drawerWidth: Dimensions.get("window").width * 0.86,
  }
);

const bookslotModule = createStackNavigator({
  BookSlotScreen: {
    screen: BookSlotScreen,
  },
});

const notificationsStack = createStackNavigator({
  NotificationsScreen: NotificationsScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Notification",
    headerTitleStyle: style.headerStyle,
    // headerLeft: (
    //   <GoBackHeader title={''} navigation={navigation} />
    // ),
    headerLeft: (
      <NavigationDrawerStructure
        navigationProps={navigation}
        showDrawer={false}
        showBackAction={true}
      />
    ),
    headerStyle: {
      backgroundColor: "#FFFFFF",
    },
    headerTintColor: "#000",
  }),
});

const HomeStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      // title: navigation.getParam("title"),
      title: "Machaxi",
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
      headerLeft: <RequestHeaderLeft navigation={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
    }),
  },
  BookLearnTrail: {
    screen: TrialBook,
    navigationOptions: ({ navigation }) => ({
      title: "Learn",
      headerLeft: <RequestHeaderLeft navigation={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  LearnBookTrial: {
    screen: LearnBookTrial,
    navigationOptions: ({ navigation }) => ({
      title: "Play",
      headerLeft: <RequestHeaderLeft navigation={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  CoachingPlan: {
    screen: CoachingPlan,
    navigationOptions: ({ navigation }) => ({
      title: "Learn",
      headerLeft: <RequestHeaderLeft navigation={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  PlayingPlan: {
    screen: PlayingPlan,
    navigationOptions: ({ navigation }) => ({
      title: "Play",
      headerLeft: <RequestHeaderLeft navigation={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  NotificationsScreen: {
    screen: NotificationsScreen,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
    }),
  },
  ApplyLeave: {
    screen: LeaveRequestPage,
    navigationOptions: ({ navigation }) => ({
      title: " Pause Membership",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: ({ navigation }) => ({
      title: "Edit Profile",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  LearnTrialList: {
    screen: LearnTrialList,
    navigationOptions: ({ navigation }) => ({
      title: "Learn Trial",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  PlayTrialList: {
    screen: PlayTrialList,
    navigationOptions: ({ navigation }) => ({
      title: "Play Trial",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  DisplayLearnTrial: {
    screen: DisplayLearnTrial,
    navigationOptions: ({ navigation }) => ({
      title: "Learn Trial",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  DisplayPlayTrial: {
    screen: DisplayPlayTrial,
    navigationOptions: ({ navigation }) => ({
      title: "Play Trial",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  DeleteAccount: {
    screen: DeleteAccount,
    navigationOptions: ({ navigation }) => ({
      title: "Delete Account",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  WebViewScreen: {
    screen: WebViewScreen,
    navigationOptions: ({ navigation }) => ({
      title: "About Us",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  PrivacyPolicy: {
    screen: PrivacyPolicy,
    navigationOptions: ({ navigation }) => ({
      title: "Privacy Policy",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  BlogScreen: {
    screen: BlogScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Blog",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  FaqScreen: {
    screen: FaqScreen,
    navigationOptions: ({ navigation }) => ({
      title: "FAQ",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
  ImageGuidelines: {
    screen: ImageGuidelines,
    navigationOptions: ({ navigation }) => ({
      title: "Image Guidelines",
      headerLeft: <RequestHeaderBack navigationProps={navigation} />,
      headerRight: <RightMenuToolbar navigationProps={navigation} showNotification={true} darkThemFlow={true}/>,
      headerTitleStyle: style.titlestyle,
      headerStyle: {
        backgroundColor: "#21202F",
      },
    }),
  },
});

const parentDrawer = createDrawerNavigator(
  {
    LearnHomePage: {
      screen: tabBarControllerLearn,
    },
    //TODO:
    BookSlotScreen: {
      screen: bookslotModule,
      // navigationOptions: {
      //     header: <CustomHeader title="Academy" />,
      // }
    },
    NotificationsScreen: {
      screen: notificationsStack,
    },
  },
  {
    contentComponent: ({ navigation }) => {
      return <CoachMenuDrawer navigation={navigation} />;
    },
    drawerWidth: Dimensions.get("window").width * 0.86,
  }
);

const HomeDrawer = createDrawerNavigator(
  {
    HomeStack: {
      screen: HomeStack,
    },
  },
  {
    contentComponent: ({ navigation }) => {
      return <CoachMenuDrawer navigation={navigation} />;
    },
    drawerWidth: Dimensions.get("window").width * 0.66,
  }
);

const TournamentRegistration = createStackNavigator({
  Registration: {
    screen: Registration,
    // navigationOptions: ({ navigation }) => ({
    //     title: 'Tournament Registration',
    //     headerTitleStyle: style.headerStyle,
    //     headerLeft: <NavigationDrawerStructure navigationProps={navigation}
    //         showBackAction={false}
    //         showDrawer={false}
    //     />,
    //     headerRight: <RightMenuToolbar navigationProps={navigation}
    //         navigation={navigation} showNotification={false} />,
    //     headerStyle: {
    //         backgroundColor: '#FFFFFF',
    //     },

    //     headerTintColor: '#000',
    // }),
  },
  RegistrationSteps: {
    screen: RegistrationSteps,
    // navigationOptions: ({ navigation }) => ({
    //     title: 'Tournament Registration',
    //     headerTitleStyle: style.headerStyle,
    //     headerLeft: <NavigationDrawerStructure navigationProps={navigation}
    //                                            showBackAction={true}
    //                                            showDrawer={false}
    //     />,
    //     headerRight: <RightMenuToolbar navigationProps={navigation}
    //                                    navigation={navigation} showNotification={true} />,
    //     headerStyle: {
    //         backgroundColor: '#FFFFFF',
    //     },

    //     headerTintColor: '#000',
    // }),
  },

  AddPartner: {
    screen: AddPartner,
    navigationOptions: ({ navigation }) => ({
      title: "Add Partner",
      headerTitleStyle: style.headerStyle,
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showBackAction={true}
          showDrawer={false}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showNotification={false}
          darkThemFlow={true}
        />
      ),
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },

      headerTintColor: "#000",
    }),
  },
  AddPartnerWithPhone: {
    screen: AddPartnerWithPhone,
    navigationOptions: ({ navigation }) => ({
      title: "Add Partner",
      headerTitleStyle: style.headerStyle,
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showBackAction={true}
          showDrawer={false}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showNotification={true}
          darkThemFlow={true}
        />
      ),
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },

      headerTintColor: "#000",
    }),
  },
  RegistrationSuccessful: {
    screen: RegistrationSuccessful,
    navigationOptions: ({ navigation }) => ({
      title: "Tournament Registration",
      headerTitleStyle: style.headerStyle,
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          showBackAction={false}
          showDrawer={false}
        />
      ),
      headerRight: (
        <RightMenuToolbar
          navigationProps={navigation}
          navigation={navigation}
          showNotification={false}
        />
      ),
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },

      headerTintColor: "#000",
    }),
  },
});

const EmptyStack = createStackNavigator({
  EmptyScreen: {
    screen: EmptyScreen,
  },
});

const BaseNavigator = createSwitchNavigator({
  // Main: {
  //     screen: InitialNavigator
  // },
  // DrawerNavigator: {
  //     screen: DrawerNavigator
  // },
  Login: {
    screen: loginModule,
  },
  /* navigation with book and play*/
  ParentBookHome: {
    screen: parentBookDrawer,
  },
  GuestBookHome: {
    screen: guestBookDrawer,
  },
  LoginSceen: {
    screen: LoginSceen,
  },
  ShopScreen: {
    screen: ShopScreen,
  },
  ShopPage: {
    screen: ShopPage,
  },
  PlayerScreen: {
    screen: PlayerScreen,
  },
  PlayScreen: {
    screen: PlayScreen,
  },
  CongratulationScreen: {
    screen: CongratulationScreen,
  },
  CoachScreen: {
    screen: CoachScreen,
  },
  HomeStack: {
    screen: HomeStack,
  },
  RenewPlayPlan: {
    screen: RenewPlayPlan,
  },
  HomeDrawer: {
    screen: HomeDrawer,
  },
  LearnBookTrial: {
    screen: LearnBookTrial,
  },
  TrialBook: {
    screen: TrialBook,
  },
  CoachBookHome: {
    screen: coachBookDrawer,
  },
  UserBookHome: {
    screen: playerBookDrawer,
  },
  CoachingPlan: {
    screen: CoachingPlan,
  },
  PlayingPlan: {
    screen: PlayingPlan,
  },
  /* navigation without book and play*/
  ParentHome: {
    screen: parentDrawer,
  },
  CoachHome: {
    screen: coachDrawer,
  },
  UserHome: {
    screen: playerDrawer,
  },
  SwitchPlayer: {
    screen: Switcher,
  },
  // Home:{
  //     screen: HomeModule
  // },

  // SignedOut: {
  //     screen: loginModule
  // }
  RegistrationSteps: {
    screen: TournamentRegistration,
  },
  EmptyScreen: {
    screen: EmptyStack,
  },
});

const AppMain = createAppContainer(BaseNavigator);
export default AppMain;

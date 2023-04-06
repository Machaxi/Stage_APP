import React from "react";
import NetInfo from "@react-native-community/netinfo";
import { getData, storeData, onSignOut, clearData } from "../components/auth";
import { GUEST, PLAYER, PARENT, COACH, ACADEMY } from "../components/Constants";
import Events from "../router/events";
import axios from "axios";
import { client } from "../../App";
import moment from "moment";
import { StatusBar } from "react-native";
import auth from '@react-native-firebase/auth';
import Snackbar from "react-native-snackbar";
msg = "GUEST";

colors = {
  BLACK_TEXT: "#404040",
  GRAY: "#A3A5AE",
  SKY: "#67BAF5",
  PURPLE: "#667DDB",
};

ACADEMY_LISTING = "AcademyListing";
var connected = false;
fontMedium = "Quicksand-Medium";
fontBold = "Quicksand-Bold";
fontRegular = "Quicksand-Regular";

export const EVENT_REFRESH_DASHBOARD = "EVENT_REFRESH_DASHBOARD";
export const EVENT_EDIT_PROFILE = "EVENT_EDIT_PROFILE";
export const EVENT_SELECT_PLAYER_TOURNAMENT = "EVENT_SELECT_PLAYER_TOURNAMENT";
export const EVENT_SELECT_PLAYER_ADD_NUMBER = "EVENT_SELECT_PLAYER_ADD_NUMBER";
export const PROFILE_PIC_UPDATED = "PROFILE_PIC_UPDATED";

//to refresh challenge dashboard
export const EVENT_REFRESH_CHALLENGE = "EVENT_REFRESH_CHALLENGE";

//to refresh player listing in performance update
export const EVENT_REFRESH_PLAYER = "EVENT_REFRESH_PLAYER";

//to refresh results in challenge
export const EVENT_REFRESH_RESULTS = "EVENT_REFRESH_RESULTS";

export const EVENT_UPDATE_DIALOG = "EVENT_UPDATE_DIALOG";

//to clear performance graph
export const EVENT_CLEAR_GRAPH = "EVENT_CLEAR_GRAPH";

//STORE KEYS
export const TOURNAMENT_REGISTER = "TOURNAMENT_REGISTER";
export const TEMP_USER_INFO = "TEMP_USER_INFO";
export const GO_TO_HOME = "GO_TO_HOME";
export const GO_TO_SWITCHER = "GO_TO_SWITCHER";
export const TOURNAMENT_FITLER = "TOURNAMENT_FITLER";
export const PUSH_TOKEN = "PUSH_TOKEN";
export const ONE_SIGNAL_USERID = "ONE_SIGNAL_USERID";
export const DRIBBLE_LOGO = "DRIBBLE_LOGO";
export const RATING_UPDATE = "RATING_UPDATE";
//setting GLOBAL VARIABLES
global.USER_TYPE = "";
global.SELECTED_PLAYER_ID = "";
global.PROFILE_REFRESH = null;

//

//===============================================================================================
//======================== FOR LIVE AND DEBUG CONFIGURATION =====================================

//TEST
//export const PAYMENT_KEY = 'rzp_test_hEiHYwRLYkvcNV'
//export const SHOW_LOGIN_BY_NAME = true
//export const FIREBASE_CHECK = false
//export const BASE_URL = 'http://stage.dribblediary.com/api/'

//LIVE
//export const BASE_URL = 'https://www.machaxi.com/api/'
///export const PAYMENT_KEY = 'rzp_live_uh7h7N55m9BHaZ'
//export const SHOW_LOGIN_BY_NAME = false
//export const FIREBASE_CHECK = true

//===============================================================================================

export const DEBUG_APP = true;
export const PROD_DEBUG = true;

export const ONE_SIGNAL_ID = "0afba88e-fe31-4da9-9540-412faf6b856b";

export const SESSION_DATE_FORMAT = "ddd, DD MMM'YY";
export const REFRESH_SCREEN_CALLBACK = "REFRESH_SCREEN_CALLBACK";

export function getBaseUrl() {
  if (DEBUG_APP) return "http://stage.dribblediary.com/api/";
  else return "https://www.machaxi.com/api/";
}

export function getPaymentKey() {
  if (DEBUG_APP) return "rzp_test_hEiHYwRLYkvcNV";
  else return "rzp_live_uh7h7N55m9BHaZ";
}

export function getFirebaseCheck() {
  if (DEBUG_APP) {
    return true;
  } else {
    return true;
  }
}

export function getShowLoginByName() {
  if (DEBUG_APP) {
    return true;
  } else {
    if (PROD_DEBUG) return true;
    else return false;
  }
}
export function getRazorPayEmail() {
  return "hello@machaxi.com";
}

export default class BaseComponent extends React.Component {
  static isUserLoggedIn = false;
  myNavigation = null;
  profileRefreshEvent=null;
  constructor(props) {
    super(props);

    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this._handleConnectivityChange
    );
    NetInfo.isConnected.fetch().done((isConnected) => {
      connected = isConnected;
      if (!isConnected && global.NO_INTERNT_SHOWN == undefined) {
        global.NO_INTERNT_SHOWN = true;
        alert("No Internet Connection.");
      }
    });

    if(global.PROFILE_REFRESH)
      global.PROFILE_REFRESH.remove();

    this.refreshEvent = Events.subscribe(GO_TO_HOME, (from_registration) => {
      this.goToHome(from_registration);
    });

    this.refreshEvent = Events.subscribe(GO_TO_SWITCHER, () => {
      this.goToSwitcher();
    });

    this.refreshEvent = Events.subscribe("LOGOUT", () => {
      this.logout();
    });

    global.PROFILE_REFRESH = Events.subscribe("PROFILE_REFRESH", () => {
      this.refreshUserProfile();
    });

  }

  getDefaultRazorPayEmail() {
    return "hello@machaxi.com";
  }

  setNavigation(navigation) {
    myNavigation = navigation;
  }

  showSnackBar(msg) {
    Snackbar.show({
      color: "white",
      title: msg,
      duration: Snackbar.LENGTH_LONG,
    });
  }

  notificationOpenScreen(type) {
    if (type == null || type == "") {
      return;
    } else {
      getData("userInfo", (value) => {
        if (value != "") {
          let userData = JSON.parse(value);
          let userType = userData.user["user_type"];

          switch (type) {
            case "batch_cancelled":
              this.props.navigation.navigate("Batch");
              break;
            case "challange_disputed":
              //this.props.navigation.navigate('Batch')
              break;
            case "new_tournament_created":
              this.props.navigation.navigate("Tournament");
              break;
            case "last_day_tournament_registration":
              this.props.navigation.navigate("Tournament");
              break;
            case "tournament_winner_declared":
              this.props.navigation.navigate("Tournament");
              break;

            case "challenge_dispute_resolved":
              this.props.navigation.navigate("Challenge");
              break;
            case "new_challange_created":
              this.props.navigation.navigate("Challenge");
              break;
            case "challenge_accepted":
              this.props.navigation.navigate("Challenge");
              break;
            case "challenge_score_updated":
              this.props.navigation.navigate("Challenge");
              break;
            case "batch_dues":
              if (userType == COACH)
                this.props.navigation.navigate("Performence");
              break;
            case "payment_dues":
              this.props.navigation.navigate("PaymentDetail");
              break;
            case "rewards_due":
              if (userType == COACH)
                this.props.navigation.navigate("CoachRewardPoints");
              else if (userType == PARENT)
                this.props.navigation.navigate("ParentRewards");
              break;

            case "coach_job_vacancy":
              this.props.navigation.navigate("AcademyListing", {
                vacancy: true,
              });
              break;

            case "rewards_due_player":
              if (userType == COACH)
                this.props.navigation.navigate("CoachRewardPoints");
              else if (userType == PARENT)
                this.props.navigation.navigate("ParentRewards");
              break;
          }
        }
      });
    }
  }

  isNumbericOnly(value) {
    return /^\d*$/.test(value);
  }
  static isUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  logout(myNavigation) {
    onSignOut();
    clearData();
    global.USER_TYPE = "";
    global.SELECTED_PLAYER_ID = "";
    auth().signOut();
    myNavigation.navigate("Login");
  }

  filterRewards(reward_detail) {
    let temp_reward = [];
    for (let i = 0; i < reward_detail.length; i++) {
      let month = reward_detail[i].month;
      let year = reward_detail[i].year;

      let is_exists = false;
      for (let j = 0; j < temp_reward.length; j++) {
        if (temp_reward[j].month == month && temp_reward[j].year == year) {
          is_exists = true;
          break;
        }
      }
      if (is_exists == false) {
        temp_reward.push(reward_detail[i]);
      }
    }
    return temp_reward;
  }

  //using top of all dashboard to check notification, this code will hellp
  // to reduce extra efforts in all cases
  getNotificationCount(callback) {
    let token = "";
    let one_singal_userid = "";

    getData("header", (value) => {
      if (value == "") return;

      getData(PUSH_TOKEN, (token) => {
        getData(ONE_SIGNAL_USERID, (one_singal_userid) => {
          const headers = {
            "Content-Type": "application/json",
            "x-authorization": value,
            one_signal_device_id: one_singal_userid,
            fcm_token: token,
            app_version: "1",
          };

          console.log("Notification_header=>", JSON.stringify(headers));

          //client.call
          client
            .get("notification/notification-count", { headers })
            .then(function(response) {
              console.log("notification" + JSON.stringify(response.data));
              let json = response.data;
              let success = json.success;
              if (success) {
                console.log("notification" + JSON.stringify(json));
                let notification_count = json.data.notification_count;
                callback(notification_count);

                //checking for app update
                let must_update = json.data.must_update;
                //let visible_challenge = json.data.visible_challenge

                if (must_update == true) {
                  Events.publish(EVENT_UPDATE_DIALOG, true);
                } else {
                  Events.publish(EVENT_UPDATE_DIALOG, false);
                }

                //checking sync data
                let is_sync = true; //json.data.is_sync
                if (is_sync == true) {
                  getSettingData(headers);
                }
              } else {
                if (json.code == "1020") {
                  Events.publish("LOGOUT");
                }
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      });
    });
  }

  isValidMobileNumber(phone) {
    let is_valid = true;
    if (phone.length != 13) {
      is_valid = false;
    } else {
      if (!phone.startsWith("+91") && !phone.startsWith("+92")) {
        is_valid = false;
      } else {
        let std = phone.substring(0, 3);
        let number = phone.substring(3, phone.length - 1);
        if (
          number.startsWith("9") ||
          number.startsWith("8") ||
          number.startsWith("7") ||
          number.startsWith("6")
        ) {
          is_valid = true;
        } else {
          is_valid = false;
        }
      }
    }
    return is_valid;
  }

  isValidMobileNumberWithoutPrefix(phone) {
    let is_valid = true;
    if (phone.length != 10) {
      is_valid = false;
    } else {
      let number = phone.substring(0, phone.length - 1);
      if (
        number.startsWith("9") ||
        number.startsWith("8") ||
        number.startsWith("7") ||
        number.startsWith("6")
      ) {
        is_valid = true;
      } else {
        is_valid = false;
      }
    }
    return is_valid;
  }

  getNetworkStatus() {
    if (!connected) {
      alert("Oops!! No Internet Connection Available");
    }
    return connected;
  }
  navigate(screen, param) {
    this.props.navigation.navigate(screen, param);
  }
  navigateMe=(screen)=>{
    myNavigation.navigate(screen);
  }
  _handleConnectivityChange = (isConnected) => {
    connected = isConnected;
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this._handleConnectivityChange
    );
  }
  // render() {
  //     return (<StatusBar
  //         backgroundColor="blue"
  //         barStyle="light-content"
  //     />)
  // }

  //This function is used when we go for tournament registration and  go back to home
  //in that case we have to use this, we are using tournaments in new stack, we cannot
  // go back on back press.
  goToHome(data){
    getData("userInfo", (value) => {
      if (value != "") {
        let userData = JSON.parse(value);
        // onSignIn()
        let userType = userData.user["user_type"];
        console.log("SplashScreen1=> ", JSON.stringify(userData));
        console.warn("userType ", userType);
        let academy_id = userData.academy_id;
        //console.warn('academy_id ', userData.academy_id)

        if (userType == GUEST) {
          this.props.navigation.navigate("GuestBookHome");
        } else if (academy_id != null) {
          if (userType == PLAYER) {
            if (userData.can_book_court) {
              this.props.navigation.navigate("UserBookHome");
            } else {
              this.props.navigation.navigate("UserHome");
            }
          } else if (userType == COACH) {
            if (userData.can_book_court) {
              this.props.navigation.navigate("CoachBookHome");
            } else {
              this.props.navigation.navigate("CoachHome");
            }
          } else if (userType == ACADEMY) {
            storeData("multiple", userData.has_multiple_acadmies);
            if (userData.has_multiple_acadmies == false) {
              if (userData.can_book_court) {
                this.props.navigation.navigate("CoachBookHome");
              } else {
                this.props.navigation.navigate("CoachHome");
              }
            } else {
              this.props.navigation.navigate("SwitchPlayer", {
                userType: COACH,
              });
            }
          } else if (userType == PARENT) {
            if (userData.can_book_court) {
              this.props.navigation.navigate("ParentBookHome");
            } else {
              this.props.navigation.navigate("ParentHome");
            }
          }
        } else {
          if (userType == PLAYER) {
            //this.props.navigation.navigate('UHome')
            if (!userData.has_multiple_acadmies) {
              if (userData.can_book_court) {
                this.props.navigation.navigate("UserBookHome");
              } else {
                this.props.navigation.navigate("UserHome");
              }
            } else {
              this.props.navigation.navigate("SwitchPlayer", {
                userType: "PLAYER",
              });
            }
          } else if (userType == COACH || userType == ACADEMY) {
            //this.props.navigation.navigate('CHome')
            storeData("multiple", userData.has_multiple_acadmies);
            if (userData.has_multiple_acadmies == false) {
              if (userData.can_book_court) {
                this.props.navigation.navigate("CoachBookHome");
              } else {
                this.props.navigation.navigate("CoachHome");
              }
            } else {
              this.props.navigation.navigate("SwitchPlayer", {
                userType: COACH,
              });
            }
          } else if (userType == PARENT) {
            //this.props.navigation.navigate('PHome')
            if (userData.has_multiple_acadmies == false) {
              if (userData.can_book_court) {
                this.props.navigation.navigate("ParentBookHome");
              } else {
                this.props.navigation.navigate("ParentHome");
              }
            } else {
              this.props.navigation.navigate("SwitchPlayer", {
                userType: PLAYER,
              });
            }
          }
        }
      } else {
        this.props.navigation.navigate("GuestBookHome");
      }

      if (data != null) Events.publish("FROM_REGISTRATION", data);
    });
  }

  goToSwitcher() {
    getData("userInfo", (value) => {
      if (value != "") {
        let userData = JSON.parse(value);
        // onSignIn()
        let userType = userData.user["user_type"];
        console.log("SplashScreen1=> ", JSON.stringify(userData));
        console.warn("userType ", userType);
        let academy_id = userData.academy_id;
        //console.warn('academy_id ', userData.academy_id)

        if (userType == GUEST) {
          this.props.navigation.navigate("GuestBookHome");
        } else {
          if (userType == PLAYER) {
            this.props.navigation.navigate("SwitchPlayer", {
              userType: "PLAYER",
            });
          } else if (userType == COACH || userType == ACADEMY) {
            this.props.navigation.navigate("SwitchPlayer", {
              userType: COACH,
            });
          } else if (userType == PARENT) {
            this.props.navigation.navigate("SwitchPlayer", {
              userType: PLAYER,
            });
          }
        }
      } else {
        this.props.navigation.navigate("GuestBookHome");
      }
    });
  }

  getProfileCallback =(response)=>{
      let json = response.data;
      console.log("Refreshing Profile" + JSON.stringify(json));
      let success = json.success;
      if (success) {
        var userData = json['data'];
        var userInfoData = userData['user'];
        storeData("userInfo", JSON.stringify(userData))
        if (userInfoData.user_type == GUEST) {
          console.log("Navigation to Guest Home");
          this.navigateMe('GuestBookHome');
      }
      else if (userInfoData.user_type == PLAYER) {
          storeData('multiple', userData.has_multiple_acadmies)
          if (!userData.has_multiple_acadmies && userData.academy_id != null) {
              if (userData.can_book_court) {
                this.navigateMe('UserBookHome');
              } else {
                this.navigateMe('UserHome');
              }
          } else {
            this.navigateMe('SwitchPlayer1', {
                  userType: 'PLAYER'
              })
          }

      } else if (userInfoData.user_type == PARENT) {
          storeData('multiple', userData.has_multiple_acadmies)
          this.navigateMe('SwitchPlayer1', {
            userType: PLAYER
        })

      }
      else if (userInfoData.user_type == COACH) {
          storeData('multiple', userData.has_multiple_acadmies)
          if (userData.has_multiple_acadmies == false && userData.academy_id != null) {
              if (userData.can_book_court) {
                this.navigateMe('CoachBookHome')
              } else {
                this.navigateMe('CoachHome');
              }
          } else {
            this.navigateMe('SwitchPlayer1', {
                  userType: COACH
              })
          }

      }
      else if (userInfoData.user_type == ACADEMY) {
          //==================== NOTE ==========================
          //      Forcefully adding coach_id = '', to run coach section as academy
          //      academy section does not require coach_id
          //=====================================================
          userData['coach_id'] = ''
          storeData("userInfo", JSON.stringify(userData))
          storeData('academy_name', userData.user.name)
          console.log('coach userData => ', JSON.stringify(userData))
          storeData('multiple', userData.has_multiple_acadmies)
          if (userData.has_multiple_acadmies == false && userData.academy_id != null) {
              if (userData.can_book_court) {
                this.navigateMe('CoachBookHome');
              } else {
                this.navigateMe('CoachHome');
              }
          } else {
            this.navigateMe('SwitchPlayer1', {
                  userType: COACH
              })
          }
      }
  }
}

  refreshUserProfile=()=> {
     getData("header", (value) => {
     if (value == "") return;
     
      const headers = {
        "Content-Type": "application/json",
        "x-authorization": value,
      };
       console.log("Refreshing Profile");
       client
         .get(getBaseUrl() + "login-refreshed", { headers })
         .then((response)=>{
          this.getProfileCallback(response)
         })
         .catch(function(error) {
          console.log(error);
        });
    
      
       
     });
  }
  }


export function getFormatTime(time) {
  //utc commented
  //return moment.utc(time, 'hh:mm a').local().format("hh:mm a")

  return moment(time, "hh:mm a").format("hh:mm a");
}

export function getFormatTimeDate(date, time) {
  //utc commented
  //return moment.utc(date + " " + time).local().format("hh:mm a")
  return moment(date + " " + time).format("hh:mm a");
}

export function getStatsImageById(id) {
  id = id + "";

  switch (id) {
    case "1":
      return require("../images/home_footwork.png");
    case "2":
      return require("../images/home_stamina.png");
    case "3":
      return require("../images/home_agility.png");
    case "4":
      return require("../images/home_strokes_and_grips.png");
    case "5":
      return require("../images/home_love_game.png");
    case "6":
      return require("../images/home_core_strength.png");
    case "7":
      return require("../images/home_match_temperament.png");
    case "8":
      return require("../images/Effort.png");
  }
  return require("../images/Mysatus.png");
}
export function getStatsImageBySportId(id) {
  id = id + "";
  switch (id) {
    case "1":
      return require("../images/sports/badminton.png");
    case "8":
      return require("../images/sports/tt.png");
    case "9":
      return require("../images/sports/basketball.png");
    case "10":
      return require("../images/sports/lawn_tennis.png");
    case "11":
      return require("../images/sports/swimming.png");
    case "12":
      return require("../images/sports/squash.png");
    case "13":
      return require("../images/sports/cricket.png");
    case "14":
      return require("../images/sports/yoga.png");
    case "15":
      return require("../images/sports/zumba.png");
    case "16":
      return require("../images/sports/dance.png");
    case "17":
      return require("../images/sports/taekwondo.png");
    case "18":
      return require("../images/sports/karate.png");
  }
  return require("../images/sports/common.png");
}
export function getSettingData(headers) {
  console.log("user-setting");
  client
    .get(getBaseUrl() + "user/settings", { headers })
    .then(function(response) {
      let json = response.data;
      console.log("user-setting" + JSON.stringify(json));
      let success = json.success;
      if (success) {
        const dribble_logo = json.data.settings.dribble_logo;
        console.log("dribble_logo=>", dribble_logo);
        storeData(DRIBBLE_LOGO, dribble_logo);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

export function checkProfilePic(profile_pic) {
  if (profile_pic != null) {
    profile_pic = { uri: profile_pic };
  } else {
    profile_pic = require("../images/coach_photo.png");
  }
  return profile_pic;
}

export function formattedName(name) {
  if (name) {
    let array = name.split(" ");
    let newName = "";
    if (array.length > 1) {
      let singleChar = array[1].charAt(0);
      newName = array[0] + " " + singleChar;
      return newName;
    } else {
      newName = name;
    }
    //alert(array)
    return newName;
  } else {
    return "";
  }
}

export function camelCase(str) {
  if (str == undefined) {
    return "";
  } else {
    let firstChar = str.charAt(0).toUpperCase();
    let last = str.substring(1, str.length).toLowerCase();
    return firstChar + last;
  }
}

export function getFormattedBadge(name) {
  if (name == null || name == undefined) return "";
  let result = name.replace("LEVEL", "L");
  result = name.replace("Level", "L");
  return result;
}

export function getFormattedLevel(level) {
  switch (level) {
    case "DISTRICT_LEVEL":
      return "District Level";

    case "STATE_LEVEL":
      return "State Level";

    case "DISTRICT_LEVEL":
      return "District Level";

    case "NATIONAL_LEVEL":
      return "National Level";

    case "INTERNATIONAL_LEVEL":
      return "International Level";
    case "NA":
      return "        ";
    case " na":
      return "        ";
  }
  return level;
}

export function getFormattedTournamentType(level) {
  switch (level) {
    case "INTER_ACADEMY":
      return "Inter-Academy";

    case "INTRA_ACADEMY":
      return "Intra-Academy";
  }
  return level;
}

export function getFormattedCategory(category) {
  switch (category) {
    case "U10":
      return "U-10";

    case "U13":
      return "U-13";

    case "U15":
      return "U-15";

    case "U17":
      return "U-17";

    case "OPEN":
      return "Open";
  }
  return category;
}

export function getFormattedTournamentLevel(type) {
  switch (type) {
    case "SINGLE":
      return "Singles";

    case "DOUBLE":
      return "Doubles";

    case "MIX_DOUBLE":
      return "Mix Doubles";
  }
  return type;
}
export function genderCamal(gender) {
  switch (gender) {
    case "BOTH":
      return "Both";

    case "MALE":
      return "Male";

    case "FEMALE":
      return "Female";
  }
  return gender;
}

export function getFormattedRound(round) {
  switch (round) {
    case "KNOCK_OUT":
      return "Knock Out";
  }
  return round;
}

export function getUtcDateFromTime(date, time) {
  const format = "dddd DD MMMM YYYY HH:mm a";
  console.log("getUtcDateFromTime", date + " " + time);
  // Tuesday 10 September 2019 09:00 AM
  var localDate2 = date + " " + time;
  //let test = moment.utc(localDate2, format).local().format(SESSION_DATE_FORMAT)
  let test = moment(localDate2, format).format(SESSION_DATE_FORMAT);

  console.log("localFormat: ", test);
  return test;
}
export function getUtcDateFromTimeFormatted(date, time) {
  const format = "dddd DD MMMM YYYY HH:mm a";
  console.log("getUtcDateFromTime", date + " " + time);
  // Tuesday 10 September 2019 09:00 AM
  var localDate2 = date + " " + time;
  //let test = moment.utc(localDate2, format).local().format(SESSION_DATE_FORMAT)
  let test = moment(localDate2, format).format("YYYY-MM-DD");

  console.log("localFormat: ", test);
  return test;
}



export const defaultStyle = {
  spinnerTextStyle: {
    color: "#FFF",
  },
  bold_text_14: {
    fontSize: 14,
    color: "#404040",
    fontFamily: "Quicksand-Medium",
  },
  bold_text_16: {
    fontSize: 16,
    color: "#404040",
    fontFamily: "Quicksand-Medium",
  },
  heavy_bold_text_14: {
    fontSize: 14,
    color: "#404040",
    fontFamily: "Quicksand-Bold",
  },
  bold_text_12: {
    fontSize: 12,
    color: "#404040",
    fontFamily: "Quicksand-Medium",
  },
  bold_text_10: {
    fontSize: 10,
    color: "#404040",
    fontFamily: "Quicksand-Medium",
  },
  regular_text_14: {
    fontSize: 14,
    color: "#404040",
    fontFamily: "Quicksand-Regular",
  },
  regular_text_10: {
    fontSize: 10,
    color: "#404040",
    fontFamily: "Quicksand-Regular",
  },
  regular_text_12: {
    fontSize: 12,
    color: "#404040",
    fontFamily: "Quicksand-Regular",
  },
  regular_text_blue_10: {
    fontSize: 10,
    color: "#667DDB",
    fontFamily: "Quicksand-Regular",
  },
  blue_rounded_4: {
    backgroundColor: "#667DDB",
    textAlign: "center",
    fontSize: 12,
    marginLeft: 8,
    color: "white",
    borderRadius: 4,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 2,
    paddingBottom: 2,
    fontWeight: "100",
    fontFamily: "Quicksand-Medium",
  },
  line_style: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#DFDFDF",
    height: 1,
  },
  rounded_button_150: {
    flex: 1,
    width: 150,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#67BAF5",
    color: "white",
    textAlign: "center",
    fontFamily: "Quicksand-Medium",
  },
  rounded_button: {
    width: "48%",
    //height: 42,
    padding: 10,
    justifyContent: "center",
    borderRadius: 23,
    //borderWidth: 1,
    marginLeft: 4,
    marginRight: 4,
    //borderColor: '#67BAF5',
    backgroundColor: "#67BAF5",
    color: "white",
    textAlign: "center",
    alignItems: "center",
    alignSelf: "center",
    fontFamily: "Quicksand-Regular",
  },
  headerStyle: {
    color: "#191919",
    fontFamily: "Quicksand-Medium",
    fontWeight: "400",
    textAlign: "center",
    fontSize: 16,
    flexGrow: 1,
    alignSelf: "center",
  },
  line_style: {
    height: 1,
    backgroundColor: "#DFDFDF",
    marginTop: 8,
    marginBottom: 8,
  },
  bebas_text_blue_10: {
    fontSize: 10,
    color: "#F4F4F4",
    fontFamily: "BebasNeue-Regular",
  },
};

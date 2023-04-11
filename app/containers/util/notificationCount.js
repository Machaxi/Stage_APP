import { client } from "../../../App";
import { COACH, PARENT } from "../../components/Constants";
import { getData, storeData } from "../../components/auth";
import Events from "../../router/events";
import { DRIBBLE_LOGO, EVENT_UPDATE_DIALOG, ONE_SIGNAL_USERID, PUSH_TOKEN, getBaseUrl } from "../BaseComponent";

export const notificationOpenScreen = (type, navigation) => {
    if (type == null || type == "") {
      return;
    } else {
      getData("userInfo", (value) => {
        if (value != "") {
          let userData = JSON.parse(value);
          let userType = userData.user["user_type"];

          switch (type) {
            case "batch_cancelled":
              navigation.navigate("Batch");
              break;
            case "challange_disputed":
              //navigation.navigate('Batch')
              break;
            case "new_tournament_created":
              navigation.navigate("Tournament");
              break;
            case "last_day_tournament_registration":
              navigation.navigate("Tournament");
              break;
            case "tournament_winner_declared":
              navigation.navigate("Tournament");
              break;

            case "challenge_dispute_resolved":
              navigation.navigate("Challenge");
              break;
            case "new_challange_created":
              navigation.navigate("Challenge");
              break;
            case "challenge_accepted":
              navigation.navigate("Challenge");
              break;
            case "challenge_score_updated":
              navigation.navigate("Challenge");
              break;
            case "batch_dues":
              if (userType == COACH)
                navigation.navigate("Performence");
              break;
            case "payment_dues":
              navigation.navigate("PaymentDetail");
              break;
            case "rewards_due":
              if (userType == COACH)
                navigation.navigate("CoachRewardPoints");
              else if (userType == PARENT)
                navigation.navigate("ParentRewards");
              break;

            case "coach_job_vacancy":
              navigation.navigate("AcademyListing", {
                vacancy: true,
              });
              break;

            case "rewards_due_player":
              if (userType == COACH)
                navigation.navigate("CoachRewardPoints");
              else if (userType == PARENT)
                navigation.navigate("ParentRewards");
              break;
          }
        }
      });
    }
  }

function getSettingData(headers) {
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

export const getNotificationCount = (callback)=> {
   
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
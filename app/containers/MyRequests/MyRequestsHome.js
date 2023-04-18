import React, {useState, useEffect} from "react";

import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  RefreshControl,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Linking,
  ToastAndroid,
} from "react-native";
import { getData, storeData } from "../../components/auth";
import {
  getPlayerDashboard,
  getPlayerSWitcher,
} from "../../redux/reducers/dashboardReducer";
import { connect } from "react-redux";
import BaseComponent, {
  defaultStyle,
  EVENT_EDIT_PROFILE,
} from "../BaseComponent";
import Events from "../../router/events";
import { darkBlue, darkBlueVariant, lightBlue } from "../util/colors";
import { myRequestData } from "../util/dummyData/myRequestData";
import MyRequestSentView from "../../atoms/myRequestSentView";
import MyRequestTabItem from "../../atoms/myRequestTabItem";
import MyRequestReceivedView from "../../atoms/myRequestReceivedView";
import RequestHeaderTitle from "../../atoms/requestHeaderTitle";
import RequestHeaderBg from "../../atoms/requestHeaderBg";
import RequestHeaderLeft from "../../atoms/requestHeaderLeft";
import RequestHeaderRight from "../../atoms/requestHeaderRight";
import LoadingIndicator from "../../components/molecules/loadingIndicator";
import { getNotificationCount } from "../util/notificationCount";
import { client } from "../../../App";
const MyRequestsHome = ({ navigation }) => {
 var updateErrorResponse = null;
 var getErrorResponse = null;
 const [refreshing, setRefreshing] = useState(false);
 const [loading, setLoading] = useState(true);
 const [requestResponse, setRequestResponse] = useState(null);
 const [requestReceiveVal, setRequestReceiveVal] = useState([]);
 const [isSent, setSentVal] = useState(true);
  const getNotifications = () => {
    getNotificationCount((count) => {
      navigation.setParams({ notification_count: count });
      navigation.setParams({
        headerRight: <RequestHeaderRight navigation={navigation} />,
      });
    });
  };

  const checkNotification = () => {
    if (global.NOTIFICATION_DATA) {
      try {
        let notification_for = global.NOTIFICATION_DATA.notification_for;
        notificationOpenScreen(notification_for);
        global.NOTIFICATION_DATA = null;
      } catch (err) {}
    }
  };

  const getRequestsData = async () => {
    setLoading(true);
    getData("header", (value) => {
      if (value == "") return;
      const headers = {
        "Content-Type": "application/json",
        //"x-authorization": value,
        //TODO:remove this static logic
        "x-authorization": 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MjciLCJzY29wZXMiOlsiUExBWUVSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJpYXQiOjE2ODA4NjAxNDUsImV4cCI6NTIyNTY0MDA4NjAxNDV9.gVyDUz8uFURw10TuCKMGBcx0WRwGltXS7nDWBzOgoFTq2uyib-6vUbFCeZrhYeno5pIF5dMLupNrczL_G-IhKg'
      };
      //client.call
      client
        .get("court/booking-request", {
          headers,
          params: {},
        })
        .then(function(response) {
          console.log({response})
          getErrorResponse = response;
          
          let json = response.data;
          let success = json.success;
          if (success) {
            setRequestResponse(json.data);
            var receiveData = json.data?.received;
            json.data?.received?.map((val)=>{
              val['expanded'] = false;
            })
            setRequestReceiveVal(receiveData);
          } else {
            if (json.code == "1020") {
              Events.publish("LOGOUT");
            }
          }
          setLoading(false);
        })
        .catch(function(error) {
          setLoading(false);
           ToastAndroid.show(
             `${getErrorResponse?.response?.response?.data?.error_message ??
               ""}`,
             ToastAndroid.SHORT
           );
          console.log(error);
        });
    });
  };

  const updateRequestApi = async(id, requestType) => {
      const data = {
          requestId: id,
          status: requestType,
      };

      setLoading(true);
      getData("header", (value) => {
        if (value == "") return;
        const headers = {
          "Content-Type": "application/json",
          //"x-authorization": value,
          //TODO:remove this static logic
          "x-authorization":
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MjciLCJzY29wZXMiOlsiUExBWUVSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJpYXQiOjE2ODA4NjAxNDUsImV4cCI6NTIyNTY0MDA4NjAxNDV9.gVyDUz8uFURw10TuCKMGBcx0WRwGltXS7nDWBzOgoFTq2uyib-6vUbFCeZrhYeno5pIF5dMLupNrczL_G-IhKg"
        };
        //client.call
        client
          .post("court/updated-booking-request", 
             {data: data},
             {headers: headers}
            
          )
          .then(function(response) {
            updateErrorResponse = {response};
           
            try {
            let json = response?.data;
            let success = json?.success;
            if (success) {
            } else {
               ToastAndroid.show(
                 `${updateErrorResponse?.response?.response?.data
                   ?.error_message ?? ""}`,
                 ToastAndroid.SHORT
               );
              if (json.code == "1020") {
                Events.publish("LOGOUT");
              }
            }
            setLoading(false);
          }
          catch(e){
             setLoading(false);
             ToastAndroid.show(
               `${
                 updateErrorResponse?.response?.response?.data?.error_message ?? ''
               }`,
               ToastAndroid.SHORT
             );
          }
          })
          .catch(function(error) {
             setLoading(false);
             ToastAndroid.show(
               `${updateErrorResponse?.response?.response?.data
                 ?.error_message ?? ""}`,
               ToastAndroid.SHORT
             );
          });
      });
  
  }

  useEffect(() => {
    navigation.setParams({
      headerRight: <RequestHeaderRight navigation={navigation} />,
    });
    getNotifications();
    var refreshEventCallNotif = Events.subscribe("NOTIFICATION_CALL", (msg) => {
      getNotifications();
    });

    checkNotification();

    var refreshEvent = Events.subscribe("NOTIFICATION_CLICKED", (msg) => {
      checkNotification();
    });

    
    getRequestsData();
    return () => {
      refreshEvent.remove();
      refreshEventCallNotif.remove();
      // Anything in here is fired on component unmount.
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true)
    getRequestsData();
    // In actual case set refreshing to false when whatever is being refreshed is done!
    setTimeout(() => {
      setRefreshing(false)
    }, 1000);
  };
 const onTabPress = (val) => {
    setSentVal(val == 'sent' ? true : false)
 }



 const cancelBooking = (id) => {
  updateRequestApi(id, 'CANCELLED');
 }

 const acceptRequest = (id) => {
  updateRequestApi(id, "ACCEPTED");
 }

 const declineRequest = (id) => {
  updateRequestApi(id, "DECLINED");
 }

 const showDetails = (passedId) => {
    var previousData = requestReceiveVal;
    requestReceiveVal.map((val, ind) => {
      if (passedId == val.id) {
        previousData[ind].expanded = !val.expanded;
      }
    });
    
    setRequestReceiveVal([...previousData]);
    
  }

  if(loading){
    return (
      <LoadingIndicator />
    )
  }

  console.log({requestReceiveVal})
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
            title="Pull to refresh"
          />
        }
        style={styles.main_container}
      >
        <View style={{ width: "100%", flexDirection: "row" }}>
          <MyRequestTabItem
            colors={
              isSent ? ["#a975284d", "#a9752880"] : ["#ffffff54", "#ffffff33"]
            }
            name={"Sent"}
            isLeft={true}
            onTabPress={() => onTabPress("sent")}
            isSelected={isSent}
          />
          <MyRequestTabItem
            colors={
              !isSent
                ? ["#a975284d", "#a9752880"]
                : ["#ffffff54", "#ffffff33"]
            }
            name={"Received"}
            isLeft={false}
            onTabPress={() => onTabPress("")}
            isSelected={!isSent}
          />
        </View>
        <View style={{ height: 4, width: "100%" }} />
        {isSent
          ? requestResponse?.sent != null
            ? requestResponse?.sent?.map((val) => (
                <MyRequestSentView
                  val={val}
                  cancelBooking={() => cancelBooking(val?.id)}
                />
              ))
            : null
          : null}
        {!isSent
          ? requestReceiveVal?.length > 0
            ? requestReceiveVal?.map((val) => (
                <MyRequestReceivedView
                  val={val}
                  acceptRequest={() => acceptRequest(val?.id)}
                  declineRequest={() => declineRequest(val?.id)}
                  areDetailsShown={val.expanded}
                  showBookingDetails={() => showDetails(val?.id)}
                />
              ))
            : null
          : null}
        <View style={{ height: 20, width: "100%" }} />

        {/* </ViewShot> */}
      </ScrollView>
    </SafeAreaView>
  );
};

MyRequestsHome.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: <RequestHeaderTitle title={"My Requests"} />,
    headerTitleStyle: {
      color: "white",
    },

    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerBackground: <RequestHeaderBg />,
    headerLeft: <RequestHeaderLeft navigation={navigation} />,
    headerRight: <RequestHeaderRight navigation={navigation} />,
  };
};

export default MyRequestsHome;

const styles = StyleSheet.create({
  navBar: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: 'blue',
  },
  mainContainer: { flex: 1, marginTop: 0, backgroundColor: darkBlueVariant },
  main_container: {
    flex: 1,
    marginTop: 0,
  },
});

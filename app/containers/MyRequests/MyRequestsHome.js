import React, {useState, useEffect} from "react";

import {
  View,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  FlatList,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { getData } from "../../components/auth";
import Events from "../../router/events";
import { darkBlueVariant } from "../util/colors";
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
import EmptyDataContainer from "../../components/molecules/emptyDataContainer";
const MyRequestsHome = ({ navigation }) => {
 var updateErrorResponse = null;
 var getErrorResponse = null;
 const [refreshing, setRefreshing] = useState(false);
 const [loading, setLoading] = useState(true);
 const [requestResponse, setRequestResponse] = useState(null);
 const [isSent, setSentVal] = useState(true);
 const [allDataFetched, setAllDataFetched] = useState(false);
 const [pageCount, setPageCount] = useState(0);
 const [sentRequestsData, setSentRequestsData] = useState([]);
 const [receivedRequestsData, setReceivedRequestsData] = useState([]);
 
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

  const getRequestsData = async ({pageCountVal , isSentRequest}) => {
    setLoading(true);

    getData("header", (value) => {
      if (value == "") return;
      const headers = {
        "Content-Type": "application/json",
        "x-authorization": value,
        //TODO:remove this static logic
       // "x-authorization": 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MjciLCJzY29wZXMiOlsiUExBWUVSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJpYXQiOjE2ODA4NjAxNDUsImV4cCI6NTIyNTY0MDA4NjAxNDV9.gVyDUz8uFURw10TuCKMGBcx0WRwGltXS7nDWBzOgoFTq2uyib-6vUbFCeZrhYeno5pIF5dMLupNrczL_G-IhKg'
      };
      //client.call
      client
        .get("court/booking-request", {
          headers,
          params: {
            sent: isSentRequest,
            received: !isSentRequest,
            size: 10,
            page: pageCountVal
          },
        })
        .then(function(response) {
          console.log({ response });
          getErrorResponse = response;

          let json = response.data;
          let success = json.success;
          if (success) {
            //*** */
            if (json.data?.received?.length > 0) {
               var receiveData = json.data?.received;
               json.data?.received?.map((val) => {
                 val["expanded"] = false;
               });
              //setRequestReceiveVal(receiveData);
              setReceivedRequestsData([...receiveData]);
            }
          
            if (json.data?.sent?.length > 0) {
    
              setSentRequestsData([...json.data?.sent]);
              
            }

            if (isSent) {
              if (json?.data?.sent?.length == 0) {
                setAllDataFetched(true);
              }
            } else {
              if (json?.data?.received?.length == 0) {
                setAllDataFetched(true);
              }
            }
            //*** */
            setRequestResponse(json.data);
           
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
            `${getErrorResponse?.response?.response?.data
              ?.error_message ?? ""}`,
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
          "x-authorization": value,
          //TODO:remove this static logic
          // "x-authorization":
          //   "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MjciLCJzY29wZXMiOlsiUExBWUVSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJpYXQiOjE2ODA4NjAxNDUsImV4cCI6NTIyNTY0MDA4NjAxNDV9.gVyDUz8uFURw10TuCKMGBcx0WRwGltXS7nDWBzOgoFTq2uyib-6vUbFCeZrhYeno5pIF5dMLupNrczL_G-IhKg"
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

    
    getRequestsData({
      pageCountVal: 0,
      isSentRequest: isSent,
    });
    return () => {
      refreshEvent.remove();
      refreshEventCallNotif.remove();
      // Anything in here is fired on component unmount.
    };
  }, []);

  const resetData = () => {
    setPageCount(0);
    setLoading(true);
    setSentRequestsData([]);
    setReceivedRequestsData([]);
    setAllDataFetched(false);
  }

  const onRefresh = () => {
    setRefreshing(true)
    resetData()
    getRequestsData({
      pageCountVal: 0,
      isSentRequest: isSent,
    });
    // In actual case set refreshing to false when whatever is being refreshed is done!
    setTimeout(() => {
      setRefreshing(false)
    }, 1000);
  };
 const onTabPress = (val) => {
    setSentVal(val == 'sent' ? true : false)
    resetData()
    getRequestsData({pageCountVal : 0, isSentRequest : val == "sent" ? true : false});
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
    var previousData = receivedRequestsData;
    receivedRequestsData.map((val, ind) => {
      if (passedId == val.id) {
        previousData[ind].expanded = !val.expanded;
      }
    });
    
    setReceivedRequestsData([...previousData]);
    
  }

   const onHitPaginationCb = () => {
     var pageCountVal = pageCount + 1;
     setPageCount(pageCountVal);
    getRequestsData({
      pageCountVal: pageCountVal,
      isSentRequest: isSent,
    });
   };

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
        {isSent ? (
          sentRequestsData?.length > 0 ? (
            <FlatList
              data={sentRequestsData}
              onEndReachedThreshold={0.3}
              onEndReached={({ distanceFromEnd }) => {
                console.log("on end reached ", distanceFromEnd);
                if (allDataFetched == false) onHitPaginationCb();
              }}
              renderItem={({ item }) => {
                return (
                  <MyRequestSentView
                    val={item}
                    cancelBooking={() => cancelBooking(item?.id)}
                  />
                );
              }}
            />
          ) : loading == false ? (
            <EmptyDataContainer msg={"No sent requests found."} />
          ) : null
        ) : null}
        {!isSent ? (
          receivedRequestsData?.length > 0 ? (
            <FlatList
              data={receivedRequestsData}
              onEndReachedThreshold={0.3}
              onEndReached={({ distanceFromEnd }) => {
                console.log("res onendreached" + pageCount);

                if (allDataFetched == false) onHitPaginationCb();
              }}
              renderItem={({ item }) => {
                return (
                  <MyRequestReceivedView
                    val={item}
                    acceptRequest={() => acceptRequest(item?.id)}
                    declineRequest={() => declineRequest(item?.id)}
                    areDetailsShown={item.expanded}
                    showBookingDetails={() => showDetails(item?.id)}
                  />
                );
              }}
            />
          ) : loading == false ? (
            <EmptyDataContainer msg={"No received requests found."} />
          ) : null
        ) : null}
        {loading ? (
          <View style={{ marginVertical: 10 }}>
            <LoadingIndicator size={20} />
          </View>
        ) : null}
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

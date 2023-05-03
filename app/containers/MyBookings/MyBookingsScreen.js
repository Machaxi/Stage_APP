import React, {useState, useEffect} from "react";

import {
  View,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  FlatList,
} from "react-native";
import { darkBlueVariant } from "../util/colors";
import { myBookingsData } from "../util/dummyData/myBookingsData";
import MyRequestTabItem from "../../atoms/myRequestTabItem";
import MyBookingsView from "../../atoms/myBookingsView";
import RequestHeaderTitle from "../../atoms/requestHeaderTitle";
import RequestHeaderBg from "../../atoms/requestHeaderBg";
import RequestHeaderLeft from "../../atoms/requestHeaderLeft";
import RequestHeaderRight from "../../atoms/requestHeaderRight";
import { getData } from "../../components/auth";
import { client } from "../../../App";
import LoadingIndicator from "../../components/molecules/loadingIndicator";
import { getNotificationCount } from "../util/notificationCount";
import Events from "../../router/events";
import EmptyDataContainer from "../../components/molecules/emptyDataContainer";

const MyBookingsScreen = ({ navigation }) => {
 var cancelBookingError = null;
 var getErrorResponse = null;
 const [refreshing, setRefreshing] = useState(false);
 const [isUpcoming, setIsUpcoming] = useState(true);
 const [paginationLoading, setPaginationLoading] = useState(false);
 const [loading, setLoading] = useState(true);
 const [allDataFetched, setAllDataFetched] = useState(false)
 const [pageCount, setPageCount] = useState(0)
 const [bookingsApiRes, setBookingsApiResponse] = useState(null);
 const [upcomingBookings, setUpcomingBookings] = useState([]);
 const [pastBookings, setPastBookings] = useState([]);
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

  const getBookingsData = async ({pageCountVal, isUpcomingRequest}) => {
    setLoading(true);
    getData("header", (value) => {
      if (value == "") return;
      const headers = {
        "Content-Type": "application/json",
        "x-authorization": value,
        //TODO:remove this static logic
        // "x-authorization":
        //   "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MjciLCJzY29wZXMiOlsiUExBWUVSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJpYXQiOjE2ODA4NjAxNDUsImV4cCI6NTIyNTY0MDA4NjAxNDV9.gVyDUz8uFURw10TuCKMGBcx0WRwGltXS7nDWBzOgoFTq2uyib-6vUbFCeZrhYeno5pIF5dMLupNrczL_G-IhKg",
      };
      //client.call
      client
        .get("court/bookings", {
          headers,
          params: {
            upcoming: isUpcomingRequest,
            past: !isUpcomingRequest,
            size: 10,
            page: pageCountVal,
          },
        })
        .then(function(response) {
          console.log({ response });
          getErrorResponse = response;
          console.log("requestData" + JSON.stringify(response.data));
          let json = response.data;
          let success = json.success;
          if (success) {
            if (json.data?.upcoming?.length > 0) {
              setUpcomingBookings([...json.data?.upcoming]);
            }
            if (json.data?.past?.length > 0) {
              setPastBookings([...json.data?.past]);
            }

            setBookingsApiResponse(json.data);
            if (isUpcoming) {
              if (json?.data?.upcoming?.length == 0) {
                setAllDataFetched(true);
              }
            } else {
              if (json?.data?.past?.length == 0) {
                setAllDataFetched(true);
              }
            }
          } else {
            if (json.code == "1020") {
              Events.publish("LOGOUT");
            }
          }
          setPaginationLoading(false);
          setLoading(false);
        })
        .catch(function(error) {
          setLoading(false);
          setPaginationLoading(false);
          ToastAndroid.show(
            `${getErrorResponse?.response?.response?.data
              ?.error_message ?? ""}`,
            ToastAndroid.SHORT
          );
          console.log(error);
        });
    });
  };

  const cancelPresentBooking = async (id) => {
    setLoading(true);
    getData("header", (value) => {
      if (value == "") return;
      const headers = {
        "Content-Type": "application/json",
        "x-authorization": value,
        //TODO:remove this static logic
        // "x-authorization":
        //   "Bearer  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MjciLCJzY29wZXMiOlsiUExBWUVSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJpYXQiOjE2ODA4NjAxNDUsImV4cCI6NTIyNTY0MDA4NjAxNDV9.gVyDUz8uFURw10TuCKMGBcx0WRwGltXS7nDWBzOgoFTq2uyib-6vUbFCeZrhYeno5pIF5dMLupNrczL_G-IhKg",
      };
      //client.call
      client
        .get("court/cancel-court-booking/" + id, {
          headers,
          params: {
          },
        })
        .then(function(response) {
          console.log({ response });
          cancelBookingError = response;
          console.log("requestData" + JSON.stringify(response.data));
          let json = response.data;
          let success = json.success;
          if (success) {
            if(isUpcoming){
              var data = upcomingBookings;
              if(data?.length > 0){
              for(var i=0; i< data?.length; i++){
                if(data[i].id == id){
                  data[i].isCancelled = true;
                }
              }
            }
              setUpcomingBookings(data)
            }
            else {
              var data = pastBookings;
              if (data?.length > 0) {
                for (var i = 0; i < data?.length; i++) {
                  if (data[i].id == id) {
                    data[i].isCancelled = true;
                  }
                }
              }
              setPastBookings(data);
            }
            // setBookingsApiResponse(json.data);
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
            `${cancelBookingError?.response?.data
              ?.error_message ?? ""}`,
            ToastAndroid.SHORT
          );
          console.log(error);
        });
    });
  };

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

    getBookingsData({
      pageCountVal: pageCount,
      isUpcomingRequest: isUpcoming,
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
    setUpcomingBookings([]);
    setPastBookings([]);
    setAllDataFetched(false);
  };

  const onRefresh = () => {
    setRefreshing(true)
    resetData();
    getBookingsData({
      pageCountVal: 0,
      isUpcomingRequest: isUpcoming,
    });

    // In actual case set refreshing to false when whatever is being refreshed is done!
    setTimeout(() => {
      setRefreshing(false)
    }, 1000);
  };

 const onTabPress = (val) => {
    setIsUpcoming(val == 'upcoming' ? true : false)
    resetData();
    getBookingsData({
      pageCountVal: 0,
      isUpcomingRequest: val == "upcoming" ? true : false,
    });

 }

 const onHitPaginationCb = () => {
  var pageCountVal = pageCount + 1;
  setPageCount(pageCountVal);
  setPaginationLoading(true);
  getBookingsData({
    pageCountVal: pageCountVal,
    isUpcomingRequest: isUpcoming ? true : false,
  });  
 }



 const cancelBooking = (id) => {
  cancelPresentBooking(id);
 }


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
                  isUpcoming
                    ? ["#a975284d", "#a9752880"]
                    : ["#ffffff54", "#ffffff33"]
                }
                name={"Upcoming"}
                isLeft={true}
                onTabPress={() => onTabPress("upcoming")}
                isSelected={isUpcoming}
              />
              <MyRequestTabItem
                colors={
                  !isUpcoming
                    ? ["#a975284d", "#a9752880"]
                    : ["#ffffff54", "#ffffff33"]
                }
                name={"Past"}
                isLeft={false}
                onTabPress={() => onTabPress("")}
                isSelected={!isUpcoming}
              />
            </View>
            <View style={{ height: 4, width: "100%" }} />
            {isUpcoming ? (
              upcomingBookings?.length > 0 ? (
                <FlatList
                  data={upcomingBookings}
                  onEndReachedThreshold={0.3}
                  onEndReached={({ distanceFromEnd }) => {
                    console.log("on end reached ", distanceFromEnd);
                    if (allDataFetched == false) onHitPaginationCb();
                  }}
                  renderItem={({ item }) => {
                    return (
                      <MyBookingsView
                        val={item}
                        isUpcoming={isUpcoming}
                        cancelBooking={() => cancelBooking(item.id)}
                      />
                    );
                  }}
                />
              ) : loading == false ? (
                <EmptyDataContainer msg={"No upcoming bookings found."} />
              ) : null
            ) : pastBookings?.length > 0 ? (
              <FlatList
                data={pastBookings}
                onEndReachedThreshold={0.3}
                onEndReached={({ distanceFromEnd }) => {
                  console.log("on end reached ", distanceFromEnd);
                  if (allDataFetched == false) onHitPaginationCb();
                }}
                renderItem={({ item }) => {
                  return (
                    <MyBookingsView
                      val={item}
                      isUpcoming={isUpcoming}
                      cancelBooking={() =>
                        cancelBooking(item.id)
                      }
                    />
                  );
                }}
              />
            ) : loading == false ? (
              <EmptyDataContainer msg={"No past bookings found."} />
            ) : null}
            {loading || paginationLoading ? (
              <View style={{ marginVertical: 10 }}>
                <LoadingIndicator size={20} />
              </View>
            ) : null}
            <View style={{ height: 20, width: "100%" }} />
          </ScrollView>
        </SafeAreaView>
      );
   
}

MyBookingsScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: <RequestHeaderTitle title={"My Bookings"} />,
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

export default MyBookingsScreen;

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

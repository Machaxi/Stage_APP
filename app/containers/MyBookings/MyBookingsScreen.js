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

const MyBookingsScreen = ({ navigation }) => {
 var cancelBookingError = null;
 var getErrorResponse = null;
 const [refreshing, setRefreshing] = useState(false);
 const [isUpcoming, setIsUpcoming] = useState(true);
 const [loading, setLoading] = useState(true);
 const [bookingsApiRes, setBookingsApiResponse] = useState(null);
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

  const getBookingsData = async () => {
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
        .get("court/bookings", {
          headers,
          params: {},
        })
        .then(function(response) {
          console.log({ response });
          getErrorResponse = response;
          console.log("requestData" + JSON.stringify(response.data));
          let json = response.data;
          let success = json.success;
          console.log("---->" + success);
          if (success) {
            setBookingsApiResponse(json.data);
            
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

  const cancelPresentBooking = async (id) => {
    setLoading(true);
    getData("header", (value) => {
      if (value == "") return;
      const headers = {
        "Content-Type": "application/json",
        //"x-authorization": value,
        //TODO:remove this static logic
        "x-authorization":
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MjciLCJzY29wZXMiOlsiUExBWUVSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJpYXQiOjE2ODA4NjAxNDUsImV4cCI6NTIyNTY0MDA4NjAxNDV9.gVyDUz8uFURw10TuCKMGBcx0WRwGltXS7nDWBzOgoFTq2uyib-6vUbFCeZrhYeno5pIF5dMLupNrczL_G-IhKg",
      };
      //client.call
      client
        .get("court/cancel-court-booking/", {
          headers,
          params: {
            bookingId: id
          },
        })
        .then(function(response) {
          console.log({ response });
          cancelBookingError = response;
          console.log("requestData" + JSON.stringify(response.data));
          let json = response.data;
          let success = json.success;
          console.log("---->" + success);
          if (success) {
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
            `${cancelBookingError?.response?.response?.data
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

    
    getBookingsData();
    return () => {
      refreshEvent.remove();
      refreshEventCallNotif.remove();
      // Anything in here is fired on component unmount.
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true)
    getBookingsData();
    // In actual case set refreshing to false when whatever is being refreshed is done!
    setTimeout(() => {
      setRefreshing(false)
    }, 1000);
  };

 const onTabPress = (val) => {
    setIsUpcoming(val == 'upcoming' ? true : false)
 }



 const cancelBooking = (id) => {
  cancelPresentBooking(id);
 }


//  const showDetails = (passedId) => {
//     var previousData = requestReceiveVal;
//     requestReceiveVal.map((val, ind) => {
//       if (passedId == val.id) {
//         previousData[ind].expanded = !val.expanded;
//       }
//     });
//     // this.setState((prevState) => ({
//     //   // areDetailsShown: !prevState.areDetailsShown,
//     //   requestReceiveVal: previousData,
//     // }));
//     setRequestReceiveVal([...previousData]);
    
//   }

  // const showDetails = (id) => {
  //   var previousData = bookingData;
  //   bookingData.map((val, ind) => {
  //     if (id == val.id) {
  //       previousData[ind].expanded = !val.expanded;
  //     }
  //   });
  //   setBookingData([...previousData]);

  // }

  if(loading){
    return (
      <LoadingIndicator />
    )
  }
  console.log({ bookingsApiRes });

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
              bookingsApiRes?.upcoming?.length > 0 ? (
                <FlatList
                  data={bookingsApiRes?.upcoming}
                  renderItem={({ item }) => {
                    return (
                      <MyBookingsView
                        val={item}
                        cancelBooking={() => cancelBooking(item.id)}
                      />
                    );
                  }}
                />
              ) : null
            ) : bookingsApiRes?.past?.length > 0 ? (
              <FlatList
                data={bookingsApiRes?.past}
                renderItem={({ item }) => {
                  return (
                    <MyBookingsView
                      val={item}
                      cancelBooking={() => console.log('')}
                    />
                  );
                }}
              />
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

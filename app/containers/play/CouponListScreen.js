import React, { useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  ScrollView,
  FlatList
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { couponListData } from "../util/dummyData/couponListData";
import CouponListItem from "../../components/molecules/couponListItem";
import { commonStyles } from "../util/commonStyles";
import GoBackHeader from "../../components/molecules/goBackHeader";
import EnterCouponCode from "../../components/molecules/enterCouponCode";
import { darkGreyVariant } from "../util/colors";
import RequestHeaderRight from "../../atoms/requestHeaderRight";
import { getNotificationCount, notificationOpenScreen } from "../util/notificationCount";
// import TabView from "./TopTabView";
import Events from "../../router/events";
import RequestHeaderTitle from "../../atoms/requestHeaderTitle";
import RequestHeaderBg from "../../atoms/requestHeaderBg";
import RequestHeaderLeft from "../../atoms/requestHeaderLeft";
import { deviceWidth } from "../util/dimens";

const 
  CouponListScreen = ({ navigation }) => {

    const [code, setCode] = useState('')

    const handleChange = (text) => {
        setCode(text)
    }

    const handleKeyDown = () => {

    }

  const getNotifications = () => {
    getNotificationCount((count) => {
        console.log('??? ' + count)
      navigation.setParams({ notification_count: count });
      navigation.setParams({
        headerRight: <RequestHeaderRight navigation={navigation} />,
      });
    });
  }


  

  const checkNotification = () => {
    if (global.NOTIFICATION_DATA) {
      try {
        let notification_for = global.NOTIFICATION_DATA.notification_for;
        notificationOpenScreen(notification_for);
        global.NOTIFICATION_DATA = null;
      } catch (err) {}
    }
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

    return () => {
        refreshEvent.remove();
        refreshEventCallNotif.remove();
            // Anything in here is fired on component unmount.
        }
    

  }, []);

 
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#051732", "#232031"]}
        style={{ flex: 1, paddingHorizontal: 12 }}
      >
        <ScrollView style={{ height: "100%" }}>
          <GoBackHeader title={"Apply Coupon"} />
          <EnterCouponCode handleChange={(val)=>handleChange(val)} value={code} handleKeyDown={()=> handleKeyDown()} />
          <View style={styles.bar} />
          <FlatList
            data={couponListData}
            extraData={code}
            renderItem={({ item, index }) => {
                return(
                  <CouponListItem
                    coupon_code={item.coupon_code}
                    discount={item.discount}
                    couponApplied={code == item.coupon_code}
                  />
                );}}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

CouponListScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: <RequestHeaderTitle title={"Play"} />,
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

export default CouponListScreen;

const styles = StyleSheet.create({
  arrow_img: {
    height: 5,
    width: 12,
    resizeMode: "contain",
  },
  menuHeading: {
    color: "#FF9C33",
    fontSize: 16,
    fontFamily: "Nunito-Regular",
    marginTop: 2,
    textAlign: "center",
  },
  skyFilledButtonView: {
    position: "absolute",
    width: "80%",
    alignSelf: "center",
    bottom: 12,
  },
  bar: {backgroundColor:darkGreyVariant, width: '100%', marginBottom: 35},
  playingLevelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 13,
    marginRight: 19,
    marginTop: 32,
    marginBottom: 14,
  },
});

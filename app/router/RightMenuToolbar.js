import React from "react";
import { Platform, StatusBar, Image, View, Dimensions, TouchableOpacity, Text, StyleSheet, ImageBackground } from "react-native";
import { getData, storeData } from '../components/auth';
import { GUEST, PLAYER, PARENT, COACH, ACADEMY } from '../components/Constants'
import events from "./events";
import BaseComponent, {GO_TO_HOME, defaultStyle} from "../containers/BaseComponent";

class RightMenuToolbar extends BaseComponent {

    //==================================================================
    //          showNotification = true/false (show/hide)
    //          showHome
    //==================================================================

    constructor(props) {
        super(props);
        this.state={
            notificationCount: 0
        }

    }

    componentDidMount() {
        this.getNotificationCount((count) => {
            this.setState({
              notificationCount: count
            });
        });    
    }

    render() {
        //showNotification={false} showHome={true}
        let showNotification = false
        let showHome = false
        if (this.props.showNotification != undefined)
            showNotification = this.props.showNotification

        if (this.props.showHome != undefined)
            showHome = this.props.showHome


        //for balance weightage
        let show_empty = false
        if (showHome == false && showNotification == false)
        {
            show_empty = true
            console.warn('show-empty ',show_empty)
        }    

        return (
          <View
            style={{ flexDirection: "row", justifyContent: "flex-end" }}
          >
            {showNotification ? (
              // <TouchableOpacity
              //     activeOpacity={.8}
              //     onPress={() => {
              //         // this.props.navigationProps.navigate("NotificationList")
              //     }}>

              //     <Image
              //         source={require("../images/notifications.png")}
              //         style={{ width: 25, height: 20, marginRight: 12 }}
              //     />
              // </TouchableOpacity>
              <ImageBackground
                resizeMode="contain"
                source={require("../images/ic_notifications.png")}
                style={{
                  width: 22,
                  height: 22,
                  marginLeft: 12,
                  marginRight: 12,
                  alignItems: "flex-end",
                }}
              >
                {this.state.notificationCount > 0 ? (
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 30 / 2,
                      backgroundColor: "#ED2638",
                    }}
                  >
                    <Text
                      style={[
                        defaultStyle.bold_text_10,
                        { fontSize: 8, color: "white" },
                      ]}
                    >
                      {this.state.notificationCount >
                      99
                        ? "99+"
                        : this.state.notificationCount}
                    </Text>
                  </View>
                ) : null}
              </ImageBackground>
            ) : null}

            {showHome ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.props.navigation.navigate("EmptyScreen");
                  // setTimeout(() => {
                  //     events.publish(GO_TO_HOME, null);
                  // }, 10)
                }}
              >
                <Image
                  source={require("../images/ic_home.png")}
                  style={{ width: 20, height: 20, marginRight: 12 }}
                />
              </TouchableOpacity>
            ) : null}

            {show_empty ? (
              <Image
                style={{ width: 20, height: 20, marginRight: 12 }}
              />
            ) : null}
          </View>
        );
    }
}
export default RightMenuToolbar;
import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  View,
} from "react-native";
import { defaultStyle } from "../containers/BaseComponent";

const RequestHeaderRight = ({ navigation }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        style={{}}
        onPress={() => {
          navigation.navigate("NotificationsScreen");
        }}
        activeOpacity={0.8}
      >
        <ImageBackground
          resizeMode="contain"
          source={require("../images/ic_notifications.png")}
          style={styles.background}
        >
          {navigation.getParam("notification_count", 0) > 0 ? (
            <View style={styles.bell}>
              <Text
                style={[
                  defaultStyle.bold_text_10,
                  { fontSize: 8, color: "white" },
                ]}
              >
                {navigation.getParam("notification_count", "") > 99
                  ? "99+"
                  : navigation.getParam("notification_count", "")}
              </Text>
            </View>
          ) : null}
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bell: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30 / 2,
    backgroundColor: "#ED2638",
  },
  background: {
    width: 22,
    height: 22,
    marginLeft: 12,
    marginRight: 12,
    alignItems: "flex-end",
  },
});

export default RequestHeaderRight;

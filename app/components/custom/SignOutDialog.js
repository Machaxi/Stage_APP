import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Dialog, { DialogContent } from "react-native-popup-dialog";
import { defaultStyle } from "../../containers/BaseComponent";
import RoundedGradientBtn from "../molecules/roundedGradientBtn";
import { white } from "../../containers/util/colors";

export default class SignOutDialog extends Component {
  render() {
    let message = "Are you sure you want to sign out of the app?";
    let width = 300;

    return (
      <Dialog
        width={width}
        height={210}
        visible={this.props.visible}
        dialogStyle={{ borderRadius: 12, backgroundColor: "#515157" }}
        onTouchOutside={() => {
          this.props.cancelPressed();
        }}
      >
        <DialogContent style={styles.contentContainer}>
          <Text
            style={[
              defaultStyle.heavy_bold_text_14,
              { padding: 16, color: white },
            ]}
          >
            Sign Out
          </Text>
          <View style={styles.header} />

          <Text
            style={[
              defaultStyle.regular_text_14,
              { padding: 8, marginBottom: 20, color: white },
            ]}
          >
            {message}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <RoundedGradientBtn
              text={"No"}
              colors={["#575f61ed", "#2b293aed"]}
              onBtnPress={() => {
                this.props.cancelPressed();
              }}
              width={110}
            />
            <View style={{ width: 30 }} />
            <RoundedGradientBtn
              text={"Yes"}
              colors={["#48acf1", "#3e53d9"]}
              onBtnPress={() => {
                this.props.exitPressed();
              }}
              width={110}
            />
          </View>
        </DialogContent>
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "column",
    alignItems: "center",
    alignContent: "stretch",
    paddingTop: 10,
    paddingHorizontal: 0,
    margin: 0,
  },
  text: {
    color: "#404040",
    fontSize: 14,
    // marginVertical:7,
    padding: 8,
  },
  text1: {
    color: "#000",
    fontSize: 15,
    // marginVertical:7,
    padding: 8,
  },
  touchstyle: {
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 1,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#DFDFDF",
  },
});

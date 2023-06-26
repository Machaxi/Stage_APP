import React from "react";
import { Linking, View, StyleSheet } from "react-native";
import BaseComponent, { getBaseUrl } from "../BaseComponent";
import { WebView } from "react-native-webview";
import RequestHeaderBack from "../../atoms/requestHeaderBack";
import RequestHeaderRight from "../../atoms/requestHeaderRight";
import { Nunito_Bold } from "./fonts";

export default class PrivacyPolicy extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  render() {
    const uri = "https://machaxi.com/privacy-policy";
    let visible = this.state.visible;

    return (
      <View style={{ flex: 1 }}>
        <WebView
          onLoad={() => {
            this.hideSpinner();
          }}
          startInLoadingState={true}
          originWhitelist={["*"]}
          ref={(ref) => {
            this.webview = ref;
          }}
          source={{ uri }}
          // onNavigationStateChange={(event) => {
          //   if (event.url !== uri) {
          //     this.webview.stopLoading();
          //     Linking.openURL(event.url);
          //   }
          // }}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  titlestyle: {
    color: "#F2F2F2",
    fontFamily: Nunito_Bold,
    textAlign: "center",
    fontSize: 20,
    flexGrow: 1,
    alignSelf: "center",
  },
});

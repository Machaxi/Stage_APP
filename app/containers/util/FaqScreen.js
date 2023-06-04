import React, { Component } from "react";
import { Linking, View, ActivityIndicator } from "react-native";
import BaseComponent from "../BaseComponent";
import Spinner from "react-native-loading-spinner-overlay";
import { WebView } from "react-native-webview";

export default class FaqScreen extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  render() {
    const uri = "https://stage.machaxi.com/faq";
    //const uri = 'http://www.africau.edu/images/default/sample.pdf'
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
          onNavigationStateChange={(event) => {
            if (event.url !== uri) {
              this.webview.stopLoading();
              Linking.openURL(event.url);
            }
          }}
        />
      </View>
    );
  }
}

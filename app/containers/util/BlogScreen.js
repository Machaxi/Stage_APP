import React from "react";
import { Linking, View } from "react-native";
import BaseComponent from "../BaseComponent";
import { WebView } from "react-native-webview";

export default class BlogScreen extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  render() {
    const uri = "https://blog.machaxi.com";
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

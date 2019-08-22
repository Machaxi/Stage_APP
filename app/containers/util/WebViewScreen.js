import React, { Component } from 'react';
import { WebView, Linking } from 'react-native';
import BaseComponent from '../BaseComponent'

export default class WebViewScreen extends BaseComponent {
    render() {
        const uri = 'http://stackoverflow.com/questions/35531679/react-native-open-links-in-browser';
        return (
            <WebView
                ref={(ref) => { this.webview = ref; }}
                source={{ uri }}
                onNavigationStateChange={(event) => {
                    if (event.url !== uri) {
                        this.webview.stopLoading();
                        Linking.openURL(event.url);
                    }
                }}
            />
        );
    }
}
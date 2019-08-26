import React, { Component } from 'react';
import { WebView, Linking } from 'react-native';
import BaseComponent from '../BaseComponent'

export default class WebViewScreen extends BaseComponent {


    render() {
        // const uri = 'http://stage.dribblediary.com/';
        const uri = 'http://www.africau.edu/images/default/sample.pdf'
        return (
            <WebView
                originWhitelist={['*']}
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
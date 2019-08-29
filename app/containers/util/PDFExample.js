import React, { Component } from 'react';
import { WebView, Linking } from 'react-native';
import BaseComponent from '../BaseComponent'

export default class PDFExample extends BaseComponent {


    render() {
        const uri = 'https://docs.google.com/gview?embedded=true&url=http://www.africau.edu/images/default/sample.pdf';
        //const uri = 'http://www.africau.edu/images/default/sample.pdf'
        return (
            <WebView
                startInLoadingState={true}
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
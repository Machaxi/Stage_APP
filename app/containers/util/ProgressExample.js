import React, { Component } from 'react';
import { WebView, Linking, View } from 'react-native';
import BaseComponent from '../BaseComponent'
import CustomProgress from '../../components/custom/CustomProgress'

export default class ProgressExample extends BaseComponent {

    render() {
        return (
            <View
                style={{
                    margin: 16
                }}>

                <CustomProgress
                    height="14"
                    width="300"
                    percent={50}
                />

            </View>
        );
    }
}
import React, { Component } from 'react';
import { WebView, Linking, View } from 'react-native';
import BaseComponent from '../BaseComponent'
import { CustomProgress } from '../../components/custom/CustomProgress'

export default class ProgressExample extends BaseComponent {

    render() {
        return (
            <View
                style={{
                    margin: 16
                }}>

                <CustomProgress
                    percent={50}
                />

            </View>
        );
    }
}
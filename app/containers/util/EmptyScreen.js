import React, { Component } from 'react';
import { View } from 'react-native';
import BaseComponent, { GO_TO_HOME } from '../BaseComponent'
import events from "../../router/events";

export default class EmptyScreen extends BaseComponent {

    constructor(props){
        super(props)
        events.publish(GO_TO_HOME, null);
    }

    render() {
        return (
            <View/>
        );
    }
}
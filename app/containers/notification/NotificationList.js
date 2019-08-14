import React from 'react'

import { View, Image, FlatList, Text } from 'react-native'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { Card } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

class NotificationList extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            list: ['', '', '', '']
        };
    }


    _renderItem = ({ item }) => {
        console.warn('test')
        return (
            <Card
                style={{
                    margin: 4,
                    padding: 16,
                    elevation: 4
                }}
            >
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => {

                    }}
                >


                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>

                        <Image
                            resizeMode="contain"
                            style={{
                                width: 32,
                                height: 32
                            }}
                            source={require('../../images/ic_notifications.png')}
                        />

                        <View style={{ marginLeft: 8 }}>

                            <Text style={defaultStyle.bold_text_14}>Title</Text>
                            <Text style={defaultStyle.regular_text_12}>Description</Text>
                        </View>

                    </View>
                </TouchableOpacity>
            </Card>
        )
    };


    render() {

        let data = this.state.list

        return (
            <View style={{ flex: 1, }}>

                <FlatList
                    data={data}
                    extraData={data}
                    renderItem={this._renderItem}
                />

            </View>
        );

    }

}
export default NotificationList;

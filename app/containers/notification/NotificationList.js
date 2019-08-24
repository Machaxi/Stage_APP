import React from 'react'

import { View, Image, FlatList, Text, ActivityIndicator } from 'react-native'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { Card } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getNotificationListing } from "../../redux/reducers/NotificationReducer";
import { getData } from "../../components/auth";
import { connect } from 'react-redux';


class NotificationList extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            list: ['', '', '', ''],
            notifications: []
        };
    }

    componentDidMount() {

        getData('header', (value) => {

            this.props.getNotificationListing(value).then(() => {
                //console.log('getNotificationListing payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.data);
                console.log(' user getNotificationListing ' + user);
                let user1 = JSON.parse(user)

                if (user1.success == true) {
                    this.setState({
                        notifications: user1.data.notifications
                    })
                }

            }).catch((response) => {
                console.log(response);
            })

        });


    }


    _renderItem = ({ item }) => {
        console.warn('test')
        let backgroundColor = "#eee"
        if (item.is_seen == true)
            backgroundColor = "#fff"


        return (
            <Card
                style={{
                    margin: 4,
                    padding: 16,
                    elevation: 4,
                    backgroundColor: backgroundColor
                }}
            >
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => {
                        this.props.navigation.navigate('Batch')
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

                            <Text style={defaultStyle.bold_text_14}>{item.title}</Text>
                            <Text style={defaultStyle.regular_text_12}>{item.body}</Text>
                        </View>

                    </View>
                </TouchableOpacity>
            </Card>
        )
    };


    render() {

        let data = this.state.notifications
        if (this.props.data.loading && !this.state.player_profile) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        if (data && data.length > 0)
            return (
                <View style={{ flex: 1, }}>

                    <FlatList
                        data={data}
                        extraData={data}
                        renderItem={this._renderItem}
                    />

                </View>
            );
        else {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={defaultStyle.regular_text_14}>No Notifications Yet!</Text>
                </View>
            )
        }
    }

}
const mapStateToProps = state => {
    return {
        data: state.NotificationReducer,
    };
};
const mapDispatchToProps = {
    getNotificationListing,
};
export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);


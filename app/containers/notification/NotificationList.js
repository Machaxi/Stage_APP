import React from 'react'

import { View, Image, FlatList, Text, ActivityIndicator } from 'react-native'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { Card } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getNotificationListing } from "../../redux/reducers/NotificationReducer";
import { getData } from "../../components/auth";
import { connect } from 'react-redux';
import Events from '../../router/events';
import moment from 'moment'

class NotificationList extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            list: ['', '', '', ''],
            notifications: [],
            isRefreshing: false,
            page: 0,
        };

    }

    componentDidMount() {

        this.selfComponentDidMount()
        Events.publish('NOTIFICATION_CALL');


    }

    selfComponentDidMount() {

        let page = this.state.page;
        const size = 20

        getData('header', (value) => {

            this.props.getNotificationListing(value, page, size).then(() => {
                //console.log('getNotificationListing payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.data);
                console.log(' user getNotificationListing ' + user);
                let user1 = JSON.parse(user)

                if (user1.success == true) {
                    if (user1.data.notifications.length > 0) {
                        let notificationArray = [...this.state.notifications]

                        for (let i = 0; i < user1.data.notifications.length; i++) {
                            let obj = user1.data.notifications[i]
                            notificationArray.push(obj)
                        }

                        this.setState({
                            notifications: notificationArray
                        })
                    }

                }

                this.setState({ isRefreshing: false })

            }).catch((response) => {
                console.log(response);
                this.setState({ isRefreshing: false })
            })

        });
    }

    onRefresh() {
        this.setState({ isRefreshing: true }, function () { this.selfComponentDidMount() });
    }

    getRelativeTime(date) {
        let temp = moment(date).fromNow()
        return temp.replace("a day", "1 day");
    }


    _renderItem = ({ item }) => {
        console.warn('test')
        let backgroundColor = "#eee"
        if (item.is_seen == true)
            backgroundColor = "#fff"


        return (
            <Card
                style={{
                    marginTop: .5,
                    marginBottom: .5,
                    padding: 20,
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

                        {/* <Image
                            resizeMode="contain"
                            style={{
                                width: 32,
                                height: 32
                            }}
                            source={require('../../images/ic_notifications.png')}
                        /> */}

                        <View style={{ marginLeft: 0 }}>

                            {/* <Text style={defaultStyle.bold_text_14}>{item.title}</Text> */}
                            <Text style={defaultStyle.regular_text_12}>{item.body}</Text>
                            <Text style={[defaultStyle.regular_text_10, {
                                color: '#727169'
                            }]}>{this.getRelativeTime(item.created_at)}</Text>

                        </View>

                    </View>
                </TouchableOpacity>
            </Card>
        )
    };


    render() {

        let data = this.state.notifications
        if (this.props.data.loading) {
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
                        // onEndReachedThreshold={0.5}
                        // onEndReached={({ distanceFromEnd }) => {
                        //     console.log('on end reached ', distanceFromEnd);
                        //     let page = this.state.page
                        //     page = page + 1
                        //     this.state.page = page
                        //     this.selfComponentDidMount()
                        // }}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isRefreshing}
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


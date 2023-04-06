
import React from 'react'
import { View, ImageBackground, Text,StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, ScrollView, StatusBar } from 'react-native';
import { Card } from 'react-native-paper'
import { SwitchButton, CustomeButtonB } from '../../components/Home/SwitchButton'
import { CustomeCard } from '../../components/Home/Card'
import { getPlayerBatch } from "../../redux/reducers/PlayerBatchReducer";
import { getData } from "../../components/auth";
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import PlayerBatchComponent from './PlayerBatchComponent'
import BaseComponent, { defaultStyle, REFRESH_SCREEN_CALLBACK } from '../BaseComponent';
import moment from 'moment'
import { PLAYER, FAMILY, PARENT } from '../../components/Constants';
import Events from '../../router/events';
import * as Analytics from "../../Analytics"
import PTRView from 'react-native-pull-to-refresh';
import NavigationDrawerWhite from '../../router/NavigationDrawerWhite';

class PlayerBatch extends BaseComponent {


    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: 'My Batches',
            headerTitleStyle: defaultStyle.headerStyle,

            headerLeft: (<NavigationDrawerWhite navigationProps={navigation}
                showBackAction={true}
                 />
            ),
            headerRight:( <RightMenuToolbar navigationProps={navigation}
            navigation={navigation} showHome={false} />
    )
        };

    };


    constructor(props) {
        super(props)
        this.inputRefs = {

            acedemic: null

        };
        this.state = {

            batchList: null,
            country: undefined,
            strenthList: null,
            index: 0,
            routes: [],
            click_batch_id: ''

        }
        if (global.click_batch_id != undefined) {
            this.state.click_batch_id = global.click_batch_id
            global.click_batch_id = null
        }


    }

   

    componentDidMount() {
        getData('userInfo', (value)=>{
            var userData = JSON.parse(value)
            if(userData.user){
                var userid = userData.user['id']
                var username = userData.user['name']
              Analytics.logEvent("PlayerBatch", {userid: userid, username: username})
            }
        })
        // firebase.analytics().logEvent("PlayerBatch", {})

        this.selfComponentDidMount()

        this.refreshEvent = Events.subscribe(REFRESH_SCREEN_CALLBACK, () => {
            this.selfComponentDidMount()
        });
    }

    selfComponentDidMount() {

        var userData;
        getData('header', (value) => {
            console.log("header", value);
        });

        console.log("CoachDashboard");
        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            this.setState({
                userData: JSON.parse(value)
            });
            console.log("userData.user", userData.user['user_type'])

            let user_type = userData.user['user_type']
            if (user_type == PARENT) {
                this.props.navigation.setParams({
                    switch_button: 'Switch Child'
                })
            } else {
                this.props.navigation.setParams({
                    switch_button: 'Switch Academy'
                })
            }

            this.getPlayerBatchData(userData['academy_id'], userData['player_id'])
        });
    }

    getPlayerBatchData(academy_id, player_id, ) {
        getData('header', (value) => {
            console.log("header", value, academy_id, player_id);
            this.props.getPlayerBatch(value, academy_id, player_id).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.batchdata);
                console.log(' getPlayerBatchData response payload ' + user);
                let user1 = JSON.parse(user)

                if (user1.success == true) {
                    var temparra = [];
                    for (let i = 0; i < user1.data['batches'].length; i++) {
                        let batch = user1.data.batches[i]
                        //console.log('batch compare ' + this.state.click_batch_id + '==' + batch.batch_id)
                        if (this.state.click_batch_id == batch.batch_id) {
                            this.state.index = i
                            //alert('set')
                        }
                        const obj = { 'key': i, 'title': batch.batch_name };
                        temparra.push(obj);

                    }
                    this.setState({
                        batchList: user1.data['batches'],
                        routes: temparra
                        // strenthList:user1.data.player_profile['stats']

                    })
                }

            }).catch((response) => {
                //handle form errors
                console.log(response);
            })

        });

    }


    _getLabelText = ({ route, scene }) => (
        route.title
    );

    _renderTabBar = props => (
        <TabBar
            {...props}
            scrollEnabled
            indicatorStyle={{
                backgroundColor: '#667DDB',
                position: 'absolute',
                left: 5,
                bottom: 0,
                right: 5,
                height: 5,
            }}
            getLabelText={this._getLabelText}
            style={{ backgroundColor: 'white' }}
            tabStyle={styles.tab}
            labelStyle={defaultStyle.regular_text_14}
        />
    );
    renderScene = ({ route, jumpTo }) => {
        return <PlayerBatchComponent jumpTo={this.state.batchList[route.key]} navigation={this.props.navigation} />;
        // case 'albums': return <AlbumsRoute jumpTo={jumpTo} />;

    };

    _refresh = () => {
        this.selfComponentDidMount()
        setTimeout(() => {
        }, 500)
        return new Promise((resolve) => {
            resolve()
        });
    }

    render() {
        if (this.props.data.loading && !this.state.player_profile) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }
        if (this.state.batchList && this.state.batchList.length > 0) {

            return <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>
                <PTRView onRefresh={this._refresh} >

                    <TabView
                        navigationState={this.state}
                        renderTabBar={this._renderTabBar}
                        renderScene={this.renderScene}

                        onIndexChange={index => this.setState({ index })}
                        initialLayout={{ width: Dimensions.get('window').width }}
                    />
                </PTRView>

            </View>;
        } else {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={defaultStyle.regular_text_14}>
                        {this.state.batchList ? 'No Batch Found' : ''}
                    </Text>
                </View>
            )
        }
    }
}
const mapStateToProps = state => {
    return {
        data: state.PlayerBatchReducer,
    };
};
const mapDispatchToProps = {
    getPlayerBatch
};
export default connect(mapStateToProps, mapDispatchToProps)(PlayerBatch);


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        // paddingVertical: 12,
        //paddingHorizontal: 10,
        borderWidth: 0,
        borderColor: '#D3D3D3',
        borderRadius: 4,
        color: 'white',
        // paddingLeft: 10,

        // alignItems: 'stretch',
        // // justifyContent: 'right',
        alignSelf: 'center',
        height: 40,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5
        // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#614051',
        borderRadius: 8, color: 'black', paddingRight: 30, // to ensure the text is never behind the icon
    },
});

const styles = StyleSheet.create({
    navBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // backgroundColor: 'green'
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    rightIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginRight: 20
        //backgroundColor: 'white',
    },

    scoreBox: {
        color: 'white',
        marginRight: 20,
        textAlign: 'right', fontSize: 24, fontWeight: 'bold'
    },
    buttomButton: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,

        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: -5,
        marginLeft: -5,
        marginRight: -5,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 1 }, borderBottomRightRadius: 10, borderBottomLeftRadius: 10

    },
    scene: {
        flex: 1,
    },


});

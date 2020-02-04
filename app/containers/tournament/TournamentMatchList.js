
import React from 'react'
import { View, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, ScrollView, StatusBar } from 'react-native';
import { Card } from 'react-native-paper'
import { SwitchButton, CustomeButtonB } from '../../components/Home/SwitchButton'
import { CustomeCard } from '../../components/Home/Card'
import { getPlayerBatch } from "../../redux/reducers/PlayerBatchReducer";
import { getData } from "../../components/auth";
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import PlayerBatchComponent from '../../containers/PlayerBatch/PlayerBatchComponent'
import BaseComponent, { defaultStyle, REFRESH_SCREEN_CALLBACK } from '../BaseComponent';
import moment from 'moment'
import { PLAYER, FAMILY, PARENT, ACADEMY, COACH } from '../../components/Constants';
import Events from '../../router/events';
import firebase from "react-native-firebase";
import { Text as MyText } from 'react-native'
import PTRView from 'react-native-pull-to-refresh';
import NavigationDrawerStructure from '../../router/NavigationDrawerStructure';
import MatchListComponent from "./MatchListComponent";
const { width, height } = Dimensions.get('window');

class TournamentMatchList extends BaseComponent {


    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: (
                <View style={{
                    flexDirection: 'row',
                    //alignItems: 'center'
                }}><MyText
                    style={defaultStyle.bold_text_12}>{navigation.getParam('title')}
                    </MyText></View>),
            headerTitleStyle: defaultStyle.headerStyle,

            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showDrawer={false}
                showBackAction={true} />
            ,
            // headerRight: (
            //     <TouchableOpacity
            //         onPress={() => {
            //             //navigation.navigate('SwitchPlayer')
            //         }}
            //         activeOpacity={.8}
            //     >
            //         <Text
            //             style={{
            //                 marginRight: 12,
            //                 fontFamily: 'Quicksand-Regular',
            //                 fontSize: 10,
            //                 color: '#667DDB'
            //             }} >Refresh</Text>
            //     </TouchableOpacity>

            // )
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
            click_batch_id: '',

            array: [],
            data: null,
            tournament_fixtures: [],
            is_show_dialog: false,
            tournament_id: '',
            user_type: '',
            is_coach: false,
            tournament_name: '',
            academy_name: 'Test Academy',
            winner: null,
            zoom: 0.09820492746901595,
            left: 0,
            top: 150,
            view_container: [],
            tournamentFormat: '',
            selectedGroupMatches: true,
            showTabs: false
        }
        if (global.click_batch_id != undefined) {
            this.state.click_batch_id = global.click_batch_id
            global.click_batch_id = null
        }


    }



    componentDidMount() {
        getData('userInfo', (value) => {
            var userData = JSON.parse(value)
            // if(userData.user){
            //     var userid = userData.user['id']
            //     var username = userData.user['name']
            //     firebase.analytics().logEvent("PlayerBatch", {userid: userid, username: username})
            // }
        })
        // firebase.analytics().logEvent("PlayerBatch", {})


        getData('userInfo', (value) => {

            if (value != '') {

                let userData = JSON.parse(value)
                let user_type = userData.user['user_type']
                //alert(user_type)
                let data = this.props.navigation.getParam('data')
                data = JSON.parse(data)
                this.state.is_coach = user_type == COACH || user_type == ACADEMY || data.can_update_score
                this.setState({
                    user_type: user_type
                })
            }
        });

        this.state.tournamentFormat = this.props.navigation.getParam('tournamentFormat');

        console.log('tournamentFormat', this.state.tournamentFormat);



        let data = this.props.navigation.getParam('data')
        console.log('Tournament Fixture -> ' + data)
        let json = JSON.parse(data)

        if (json.tournament_matches.length == 0 && json.group_matches.length == 0) {
            this.state.showTabs = false;
        } else {
            this.state.showTabs = true;
        }

        this.init(data)

        this.refreshEvent = Events.subscribe('REFRESH_FIXTURE', (data) => {
            // alert('REFRESH_FIXTURE')
            console.log('REFRESH_FIXTURE->', JSON.stringify(data))
            this.init(JSON.stringify(data))
        })

        setTimeout(() => {
            Events.publish('FIXTURE_CALL_API');
        }, 20000)

        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                if (this.firstRender) {
                    Events.publish('FIXTURE_CALL_API');
                } else {
                    this.firstRender = true
                }
            }
        )


        // this.selfComponentDidMount()
        //
        // this.refreshEvent = Events.subscribe(REFRESH_SCREEN_CALLBACK, () => {
        //     this.selfComponentDidMount()
        // });
    }



    init(data) {
        // alert('teste')
        let json = JSON.parse(data)
        console.log('FiXTURE DATA', json);
        this.state.tournament_name = json.name

        let title = this.state.academy_name + " " + json.name
        //alert('Name ' + json.name)
        this.setState({
            tournament_name: title
        })
        this.state.data = json
        //  this.showFixture(json)
        // tournament_matches
        // console.log('json.tournament_matches',(json.tournament_matches).getAllKeys())

        let fixture_data;
        var temparra = [];
        var batchArray = [];
        var i = 0;

        console.log('jsin', json);

        if (this.state.tournamentFormat == 'KNOCK_OUT') {
            console.log('in if');
            console.log('fixture_data11111', json.tournament_matches);
            fixture_data = json.tournament_matches
        } else {
            console.log('in else');
            console.log('fixture_data11111', json.tournament_matches);
            if (this.state.selectedGroupMatches) {
                fixture_data = json.group_matches
            } else {
                fixture_data = json.tournament_matches
            }

        }

        console.log('fixture_data', fixture_data)

        for (var key in fixture_data) {
            const obj = {};
            if (this.state.tournamentFormat == 'KNOCK_OUT') {
                if(fixture_data[key][0].is_final==true) {
                    obj = { 'key': i, 'title': 'Finals' };
                } else {
                    obj = { 'key': i, 'title': 'Round ' + key };
                }
            } else {
                if (this.state.selectedGroupMatches) {
                    obj = { 'key': i, 'title': key };
                } else {
                    if(fixture_data[key][0].is_final==true) {
                        obj = { 'key': i, 'title': 'Finals' };
                    } else {
                        obj = { 'key': i, 'title': 'Round ' + key };
                    }
                }

            }
            i = i + 1;
            temparra.push(obj);
            console.log('fixture_data[key]', fixture_data[key])
            batchArray.push(fixture_data[key])
        }
        if ((json.tournament_matches) || (json.group_matches)) {
            // var temparra = [];
            // for (let i = 0; i < (json.tournament_matches).length; i++) {
            //     let batch = (json.tournament_matches)[i]
            //     //console.log('batch compare ' + this.state.click_batch_id + '==' + batch.batch_id)
            //     if (this.state.click_batch_id == batch.batch_id) {
            //         this.state.index = i
            //         //alert('set')
            //     }
            //     const obj = { 'key': i, 'title': 'Round'+(i+1) };
            //     temparra.push(obj);
            //
            // }

            console.log('temparra', batchArray)
            this.setState({
                batchList: batchArray,
                routes: temparra,
                allMatches: batchArray
                // strenthList:user1.data.player_profile['stats']

            })
        }

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
        let data = this.props.navigation.getParam('data');
        data = JSON.parse(data)
        var matchData = {
            'data': this.state.batchList[route.key],
            'can_update_score': data.can_update_score
        };
        return <MatchListComponent jumpTo={matchData} navigation={this.props.navigation} />;
        // case 'albums': return <AlbumsRoute jumpTo={jumpTo} />;

    };

    _refresh = () => {
        let data = this.props.navigation.getParam('data')
        this.init(data);
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

        if (this.state.showTabs) {

            let buttonStyle;
            if (this.state.selectedGroupMatches == true) {
                buttonStyleFirst = { width: '50%', backgroundColor: 'white' };
                buttonStyleSecond = { width: '50%' };
            }
            else {
                buttonStyleFirst = { width: '50%' };
                buttonStyleSecond = { width: '50%', backgroundColor: 'white' };
            }

            return <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>

                <PTRView onRefresh={this._refresh} >

                    {this.state.tournamentFormat == 'ROUND_ROBIN_KNOCK_OUT' &&

                        <View style={{ flexDirection: 'row', backgroundColor: '#F7F7F7' }}>

                            <TouchableOpacity style={buttonStyleFirst} activeOpacity={.8} onPress={() => {
                                if (this.state.selectedGroupMatches == false) {
                                    this.setState({
                                        selectedGroupMatches: true
                                    }, () => {
                                        let data = this.props.navigation.getParam('data')
                                        this.init(data)
                                    })
                                }
                            }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.rounded_button_150}>
                                        Group Stage
                                </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={buttonStyleSecond} activeOpacity={.8} onPress={() => {
                                if (this.state.selectedGroupMatches == true) {
                                    this.setState({
                                        selectedGroupMatches: false
                                    }, () => {
                                        let data = this.props.navigation.getParam('data')
                                        this.init(data)
                                    })
                                }
                            }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.rounded_button_150}>
                                        Knockout Stage
                                </Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                    }

                    {
                        this.state.batchList && this.state.batchList.length > 0 ?

                            <TabView
                                navigationState={this.state}
                                renderTabBar={this._renderTabBar}
                                renderScene={this.renderScene}

                                onIndexChange={index => this.setState({ index })}
                                initialLayout={{ width: Dimensions.get('window').width }}
                            /> :
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                                <View>
                                    <Text style={defaultStyle.regular_text_14}>
                                        {this.state.batchList ? 'No Matches Found' : ''}
                                    </Text>
                                </View>
                            </View>
                    }


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
export default connect(mapStateToProps, mapDispatchToProps)(TournamentMatchList);


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
    rounded_button_150: {
        //flex: 1,
        //width: '50%',
        padding: 10,
        //alignItems: 'center',
        //justifyContent: 'center',
        //backgroundColor: '#67BAF5',
        color: 'black',
        //borderRadius: 5,
        //textAlign: 'center',
        fontFamily: 'Quicksand-Medium'
    },


});

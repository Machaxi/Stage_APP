
import React from 'react'
import { View, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-paper'
import { SwitchButton, CustomeButtonB } from '../../components/Home/SwitchButton'
import { CustomeCard } from '../../components/Home/Card'
import { getPlayerBatch } from "../../redux/reducers/PlayerBatchReducer";
import { getData } from "../../components/auth";
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import PlayerBatchComponent from '../PlayerBatch/PlayerBatchComponent'
import ParentRewardComponent from './ParentRewardComponent';


class ParentRewards extends React.Component {

    constructor(props) {
        super(props)
        this.inputRefs = {

            acedemic: null

        };
        this.state = {

            batchList: ["Test1", "Test2", "Test3"],
            index: 0,
            routes: [
                { key: 'first', title: 'First' },
                { key: 'second', title: 'Second' },
              ],

        }
    }

    componentDidMount() {
        var userData;
        getData('header', (value) => {
            console.log("header", value);
        });
    }


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
            style={{ backgroundColor: 'white' }}
            tabStyle={styles.tab}
            labelStyle={{ color: 'Black', fontSize: 16, fontWeight: 'bold' }}
        />
    );
    renderScene = ({ route, jumpTo }) => {
        console.warn('test')
        return <ParentRewardComponent jumpTo={this.state.batchList[route.key]} navigation={this.props.navigation} />;
        // return <PlayerBatchComponent jumpTo = {this.state.batchList[route.key]} navigation= {this.props.navigation} />;
        // case 'albums': return <AlbumsRoute jumpTo={jumpTo} />;

    };
    render() {


        return (

            <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>
                <TabView
                    navigationState={this.state}
                    renderTabBar={this._renderTabBar}
                    renderScene={this.renderScene}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />

            </View>);

    }
}

export default ParentRewards


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

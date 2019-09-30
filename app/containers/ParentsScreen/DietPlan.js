import React, { Component } from 'react';
import { Linking, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import BaseComponent, { defaultStyle } from '../BaseComponent'
import { WebView } from 'react-native-webview';
import { dietPlan } from "../../redux/reducers/DietPlanReducer";
import { connect } from 'react-redux';
import { getData } from '../../components/auth';
import NavigationDrawerStructure from '../../router/NavigationDrawerStructure';


class DietPlan extends BaseComponent {

    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: (

                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',

                    flex: 1
                }}><Text
                    style={defaultStyle.bold_text_16}>Diet Plan ({global.SELECTED_PLAYER_NAME})</Text></View>),
            headerTitleStyle: defaultStyle.headerStyle,

            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showDrawer={false}
                showBackAction={true} />
            ,
            headerRight: (
                <TouchableOpacity
                    onPress={() => {
                        //navigation.navigate('SwitchPlayer')
                    }}
                    activeOpacity={.8}
                >
                    <Text
                        style={{
                            marginRight: 12,
                            fontFamily: 'Quicksand-Regular',
                            fontSize: 10,
                            color: '#667DDB'
                        }} ></Text>
                </TouchableOpacity>

            )
        };

    };

    constructor(props) {
        super(props)
        this.state = {
            dietUrl: null,
            progress: true
        }



    }

    componentDidMount() {

        getData('userInfo', (value) => {
            console.warn(value)
            userData = JSON.parse(value)
            const player_id = userData['player_id']
            const academy_id = userData['academy_id']

            getData('header', (header) => {

                this.props.dietPlan(header, player_id, academy_id).then(() => {

                    let data = this.props.data.profileData
                    console.log('dietPlan payload ' + JSON.stringify(this.props.data.profileData));
                    if (data.success) {

                        const diet = data.data.diet
                        this.setState({
                            progress: false,
                            dietUrl: diet
                        })

                    }
                }).catch((response) => {
                    console.log(response);
                })
            });

        });
    }

    render() {

        if (this.state.progress) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        const dietUrl = this.state.dietUrl
        if (dietUrl == null || dietUrl == '') {

            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={[defaultStyle.bold_text_14, {
                        textAlign: 'center',
                        padding:16
                    }]}>
                        Diet plan not available. Please get in touch with the academy to upload it.</Text>
                </View>
            )
        }
        const uri = 'https://docs.google.com/gview?embedded=true&url=' + dietUrl;
        console.log('NewDietUrl-> ', uri)

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

const mapStateToProps = state => {
    return {
        data: state.DietPlanReducer,
    };
};
const mapDispatchToProps = {
    dietPlan
};
export default connect(mapStateToProps, mapDispatchToProps)(DietPlan);


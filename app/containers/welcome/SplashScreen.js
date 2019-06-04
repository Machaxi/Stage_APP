import React from 'react'

import { View, Image, Linking, Platform } from 'react-native'
import { isSignedIn, storeData } from "../../components/auth";

class Splash extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            checkedSignIn: false,
            deepUrl: ""
        };
    }

    componentDidMount() {
        // this.props.navigation.navigate('Dashboard')
        isSignedIn()
            .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
            .catch(err => alert("An error occurred"));

        setTimeout(() => {
            const { checkedSignIn, signedIn } = this.state;
            console.log("signedIn", signedIn)
            if (!checkedSignIn) {
                this.props.navigation.navigate('SignedOut')
                return;
            }
            if (signedIn !== true) {
                this.props.navigation.navigate('SignedOut')//'SignedOut')
            } else {
                this.props.navigation.navigate('DrawerNavigator')
            }

        }, 1000)

        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
                this.navigate(url);
            });
        } else {
            Linking.addEventListener('url', this.handleOpenURL);
        }
    }
    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);

    }
    handleOpenURL(event) {
    }

    navigate = (url) => { // E
        this.state.deepUrl = url
        storeData('deepUrl',this.state.deepUrl)

    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <Image style={{ width: '100%', height: '100%' }}
                    source={require('../../images/splash.png')}
                />

            </View>
        );

    }

}
export default Splash;
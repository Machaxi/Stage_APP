import React from 'react'

import { View, Image, Text, Platform } from 'react-native'
import BaseComponent, { TOURNAMENT_REGISTER, GO_TO_HOME, defaultStyle } from '../BaseComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { SkyFilledButton } from '../../components/Home/SkyFilledButton';


class TournamentTerms extends BaseComponent {


    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        const conditions = this.props.navigation.getParam('conditions')
        const show_register = this.props.navigation.getParam('show_register')

        return (
            <ScrollView>
                <View style={{
                    flex: 1,
                    padding: 16,
                }}>

                    <Text style={[defaultStyle.bold_text_14, {
                        marginBottom: 20,
                        flex: 1
                    }]}>{conditions} </Text>

                    {show_register ?
                        <SkyFilledButton
                            style={{
                                marginTop: 30
                            }}
                            onPress={() => {
                                this.props.navigation.navigate('RegistrationSteps')
                            }} >Register</SkyFilledButton>
                        : null}
                </View>
            </ScrollView>

        );

    }

}
export default TournamentTerms;

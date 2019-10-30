import React from 'react'

import { View, Image, Text, Platform } from 'react-native'
import BaseComponent, { TOURNAMENT_REGISTER, GO_TO_HOME, defaultStyle } from '../BaseComponent';
import { ScrollView } from 'react-native-gesture-handler';


class ContactUs extends BaseComponent {


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
                    }]}>
                        For any issues that you are facing, please send an e-mail to hello@machaxi.com and we will try to respond back to you within 24-48 hours.
                    </Text>


                </View>
            </ScrollView>

        );

    }

}
export default ContactUs;

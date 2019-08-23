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
        return (
            <ScrollView>
                <View style={{
                    flex: 1,
                    padding: 16,
                }}>

                    <Text style={[defaultStyle.bold_text_14, {
                        marginBottom: 20
                    }]}>
                        This tournament has following rules:
                        </Text>
                    <Text style={[defaultStyle.bold_text_14, {
                        marginBottom: 20
                    }]}>
                        1. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </Text>
                    <Text style={[defaultStyle.bold_text_14, {
                        marginBottom: 20
                    }]}>
                        2. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </Text>
                    <Text style={[defaultStyle.bold_text_14, {
                        marginBottom: 20
                    }]}>
                        3. When an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </Text>
                    <Text style={[defaultStyle.bold_text_14, {
                        marginBottom: 20
                    }]}>
                        4. It has survived not only five centuries, but also the leap into electronic typesetting
                        </Text>
                    <Text style={[defaultStyle.bold_text_14, {
                        marginBottom: 20
                    }]}>
                        5. More recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Text>

                    <SkyFilledButton
                        style={{
                            marginTop: 30
                        }}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }} >Play</SkyFilledButton>

                </View>
            </ScrollView>

        );

    }

}
export default TournamentTerms;

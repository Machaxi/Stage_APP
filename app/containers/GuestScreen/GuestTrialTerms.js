import React from 'react'

import { StyleSheet, View, Image, Text } from 'react-native'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { SkyFilledButton } from '../../components/Home/SkyFilledButton';


class GuestTrialTerms extends BaseComponent {


    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <ScrollView>
                <View style={styles.mainContainer}>

                    <View><Text style={styles.mainHeading}>Our plans</Text></View>

                    <View style={styles.subHeadingView}>
                        <Text style={defaultStyle.heavy_bold_text_14}>MasterKey</Text>
                    </View>

                    <View>
                        <View style={styles.listOuter}>
                            <View style={styles.listElement}>
                                <Text>{'\u2022'}</Text>
                                <Text style={[defaultStyle.bold_text_14, styles.padding_5]}>All Sports</Text>
                            </View>
                            <View style={styles.listElement}>
                                <Text>{'\u2022'}</Text>
                                <Text style={[defaultStyle.bold_text_14, styles.padding_5]}>Guided Environment</Text>
                            </View>
                        </View>
                        <View style={styles.listOuter}>
                            <View style={styles.listElement}>
                                <Text>{'\u2022'}</Text>
                                <Text style={[defaultStyle.bold_text_14, styles.padding_5]}>All Facilities</Text>
                            </View>
                            <View style={styles.listElement}>
                                <Text>{'\u2022'}</Text>
                                <Text style={[defaultStyle.bold_text_14, styles.padding_5]}>Unlimited Access</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.imgOuter}>
                        <Image
                            source={require('../../images/plan2.png')}
                            style={styles.imgStyle}
                        />
                        <Image
                            source={require('../../images/plan1.png')}
                            style={[styles.imgStyle, { marginLeft: 12 }]}
                        />
                    </View>

                    <View style={styles.subHeadingView}>
                        <Text style={defaultStyle.heavy_bold_text_14}>Single Sport</Text>
                    </View>

                    <View style={{ marginBottom: 50 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                            <View style={styles.listElement}>
                                <Text>{'\u2022'}</Text>
                                <Text style={[defaultStyle.bold_text_14, styles.padding_5]}>One Sport</Text>
                            </View>
                            <View style={styles.listElement}>
                                <Text>{'\u2022'}</Text>
                                <Text style={[defaultStyle.bold_text_14, styles.padding_5]}>Guided Environment</Text>
                            </View>
                        </View>
                        <View style={styles.listOuter}>
                            <View style={styles.listElement}>
                                <Text>{'\u2022'}</Text>
                                <Text style={[defaultStyle.bold_text_14, styles.padding_5]}>All Facilities</Text>
                            </View>
                            <View style={styles.listElement}>
                                <Text>{'\u2022'}</Text>
                                <Text style={[defaultStyle.bold_text_14, styles.padding_5]}>Unlimited Access</Text>
                            </View>
                        </View>
                    </View>

                    <SkyFilledButton
                        style={styles.btnStyle}
                        onPress={() => {
                            this.props.navigation.navigate('SaveGuestTrial')
                        }} >Book Machaxi Trial
                    </SkyFilledButton>

                </View>
            </ScrollView >
        );
    }
}
export default GuestTrialTerms;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 16,
    },
    padding_5: {
        paddingLeft: 5
    },
    mainHeading: {
        color: '#404040',
        fontFamily: 'Quicksand-Bold',
        fontSize: 20
    },
    subHeadingView: {
        marginTop: 17,
        marginBottom: 15
    },
    listOuter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    listElement: {
        flexDirection: 'row',
        width: '50%'
    },
    imgOuter: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20
    },
    imgStyle: {
        width: 115,
        height: 125
    },
    btnStyle: {
        marginTop: 30
    }
});

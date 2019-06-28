import React from 'react'

import { View, Text, StyleSheet } from 'react-native'
import BaseComponent from '../BaseComponent';
import { Card } from 'react-native-paper';

class ChooseTimeDate extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }


    render() {
        return (
            <View style={{ padding: 16, flex: 1 }}>

                <View style={{ flex: 1 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                        <Text style={styles.text}>
                            Pick a Date
                         </Text>

                    </View>

                </View>

            </View>
        );

    }

}
const styles = {
    rounded_button: {
        width: '100%',
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
    text: {
        fontSize: 14, fontWeight: "400",
        color: '#404040',
        fontFamily: 'Quicksand-Bold'
    },
    text_bold: {
        width: "50%",
        fontSize: 14, fontWeight: "400",
        color: '#404040',
        fontFamily: 'Quicksand-Bold'
    },
    text_12: {
        fontSize: 12, fontWeight: "400",
        color: '#404040',
        fontFamily: 'Quicksand-Bold'
    },
    text_12_regular: {
        width: "50%",
        fontSize: 12,
        color: '#A3A5AE',
        fontFamily: 'Quicksand-Regular'
    },
    text_14_regular: {
        width: "50%",
        fontSize: 14,
        color: '#404040',
        fontFamily: 'Quicksand-Regular'
    },
    text_14_full: {
        fontSize: 14,
        color: '#404040',
        fontFamily: 'Quicksand-Regular'
    },
    small_text: {
        fontSize: 10,
        color: '#667DDB',
        fontFamily: 'Quicksand-Regular'
    }
}
export default ChooseTimeDate;
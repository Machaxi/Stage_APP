import React from 'react'

import { View, ScrollView, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native'
import { CustomeCard } from '../../components/Home/Card'
import { SwitchButton, CustomeButtonB } from '../../components/Home/SwitchButton'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { TextInput } from 'react-native-paper';

class ParentRewardComponent extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        }
    }

    componentDidMount() {

        console.warn('hjhc', this.props.jumpTo)
        this.setState({

        })
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {

        return (
            <ScrollView
                style={{ backgroundColor: '#F7F7F7' }}>
                <View>

                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={this.state.modalVisible}
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            //backgroundColor: '#0E0E0E',
                            //opacity: 0.56,
                            backgroundColor: 'rgba(52, 52, 52, 0.8)',
                            padding: 16
                        }}>
                            <View style={{
                                width: "100%",
                                margin: 16,
                                padding: 16,
                                borderRadius: 16,
                                backgroundColor: 'white',
                                height: 300,
                            }}>

                                <Text
                                    style={defaultStyle.bold_text_14}>Reward Points to Rahul</Text>

                                <View style={{ flexDirection: 'row', }}>

                                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                        <View>
                                            <Text style={styles.regular_text_10}>Month</Text>
                                            <Text style={[defaultStyle.bold_text_14, { marginTop: 6 }]}>Oct 19</Text>
                                        </View>
                                        <View style={{ marginLeft: 20 }}>
                                            <Text style={styles.regular_text_10}>Available</Text>
                                            <Text style={[defaultStyle.regular_text_14, { marginTop: 10 }]}>500  pts</Text>
                                        </View>
                                    </View>
                                </View>

                                <Text
                                    style={defaultStyle.bold_text_14}>Reward Rahul for :</Text>

                                <View style={{
                                    flexDirection: 'row',
                                }}>

                               

                                </View>

                                <Text style={[defaultStyle.rounded_button, { marginTop: 16, width: "90%" }]}
                                    onPress={() => {
                                        this.setModalVisible(false);
                                    }}>
                                    OK</Text>

                            </View>

                        </View>
                    </Modal>

                    <CustomeCard>
                        <View style={{ margin: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={defaultStyle.regular_text_12}>Reward Points</Text>
                                <View
                                    style={{ backgroundColor: '#FF7373', marginRight: 10, marginLeft: 10, borderRadius: 5 }}>
                                    <Text style={{
                                        fontSize: 10,
                                        padding: 4,
                                        fontFamily: 'Quicksand-Regular',
                                        color: 'white',
                                        marginRight: 6,
                                        marginLeft: 6,
                                    }}>Due</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#DFDFDF', margin: 8 }} />


                        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>

                            <View style={{ margin: 10, flexDirection: 'row' }}>
                                <View>
                                    <Text style={styles.regular_text_10}>Month</Text>
                                    <Text style={[defaultStyle.bold_text_14, { marginTop: 6 }]}>Oct 19</Text>
                                </View>
                                <View style={{ marginLeft: 20 }}>
                                    <Text style={styles.regular_text_10}>Available</Text>
                                    <Text style={[defaultStyle.regular_text_14, { marginTop: 10 }]}>500  pts</Text>
                                </View>
                            </View>

                            <View style={{
                                flex: 1,
                                marginLeft: 50,
                                marginRight: 20,
                                marginTop: 10,
                                alignSelf: 'center'
                            }}>
                                <CustomeButtonB onPress={() => {
                                    this.setModalVisible(true);

                                }}>
                                    Reward </CustomeButtonB>
                            </View>
                        </View>

                    </CustomeCard>
                </View>
            </ScrollView>
        )

    }
}

export default ParentRewardComponent;

const styles = StyleSheet.create({
    labelText: {
        marginBottom: 5,
        color: '#A3A5AE',
        fontSize: 10,

        // backgroundColor: 'blue',
    },
    regular_text_10: {
        fontSize: 10,
        color: '#A3A5AE',
        fontFamily: 'Quicksand-Regular'
    },
}
);
import React from 'react';
import { StyleSheet, View, TextInput, Text, Modal, Alert, Image, ScrollView } from 'react-native';
import { Card, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent from '../BaseComponent'

export default class WriteFeedback extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {

        return (

            <ScrollView>

                <View style={styles.chartContainer}>


                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
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
                                width: 300,
                                borderRadius: 16,
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 300,
                            }}>

                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: 'black',
                                        fontWeight: "400",
                                        fontFamily: 'Quicksand-Medium'
                                    }}
                                >Success</Text>

                                <Image
                                    style={{ marginTop: 16, height: 100, width: 100 }}
                                    source={require('../../images/success_icon.png')}
                                ></Image>

                                <Text
                                    style={{
                                        fontSize: 14,
                                        marginTop: 16,
                                        color: 'black',
                                        fontWeight: "400",
                                        textAlign: 'center',
                                        fontFamily: 'Quicksand-Regular'
                                    }}
                                >Thank you ! Your feedback has been succesfully submitted.</Text>

                                <Text style={[styles.rounded_button, { marginTop: 16, width: 70 }]}
                                    onPress={() => {
                                        this.setModalVisible(false);
                                    }}>
                                    OK</Text>

                            </View>

                        </View>
                    </Modal>
                    <Card
                        style={{
                            borderRadius: 16,
                            marginLeft: 16,
                            marginRight: 16,
                            marginTop: 12,
                            marginBottom: 12,
                            elevation: 2

                        }}>
                        <View style={{ padding: 16 }}>

                            <Text style={{
                                fontSize: 14,
                                color: '#404040',
                                fontWeight: "400",
                                fontFamily: 'Quicksand-Medium'
                            }}>
                                Academy Feedback
                            </Text>

                            <View style={{
                                width: "100%",
                                marginTop: 10, marginBottom: 10,
                                height: 1, backgroundColor: '#DFDFDF'
                            }}></View>

                            <Text style={{
                                fontSize: 14,
                                color: '#404040',
                                fontWeight: "400",
                                fontFamily: 'Quicksand-Medium'
                            }}>
                                Your Feedback
                            </Text>

                            <Rating
                                type='custom'
                                ratingColor='#F4FC9A'
                                ratingBackgroundColor='#D7D7D7'
                                ratingCount={5}
                                imageSize={20}
                                startingValue={0}
                                style={{ marginLeft: 10, height: 30, width: 80, paddingTop: 16, }}
                            />

                            <TextInput
                                style={{
                                    borderColor: "#CECECE",
                                    borderWidth: 1,
                                    height: 100,
                                    width: "100%",
                                    marginTop: 16,
                                    marginBottom: 16,
                                    fontSize: 14,
                                    padding: 4,
                                    textAlign: 'left',
                                    justifyContent: 'flex-start',
                                    borderRadius: 8,
                                    fontFamily: 'Quicksand-Regular',
                                    textAlignVertical: 'top'
                                }}
                                multiline={true}
                                placeholder={"What's your feedback?"}
                            >

                            </TextInput>




                        </View>

                    </Card>

                    <Card
                        style={{
                            borderRadius: 16,
                            marginLeft: 16,
                            marginRight: 16,
                            marginTop: 12,
                            marginBottom: 12,
                            elevation: 2

                        }}>
                        <View style={{ padding: 16 }}>

                            <Text style={{
                                fontSize: 14,
                                color: '#404040',
                                fontWeight: "400",
                                fontFamily: 'Quicksand-Medium'
                            }}>
                                Academy Feedback
                            </Text>

                            <View style={{
                                width: "100%",
                                marginTop: 10, marginBottom: 10,
                                height: 1, backgroundColor: '#DFDFDF'
                            }}></View>

                            <Text style={{
                                fontSize: 14,
                                color: '#404040',
                                fontWeight: "400",
                                fontFamily: 'Quicksand-Medium'
                            }}>
                                Your Feedback
                            </Text>

                            <Rating
                                type='custom'
                                ratingColor='#F4FC9A'
                                ratingBackgroundColor='#D7D7D7'
                                ratingCount={5}
                                imageSize={20}
                                startingValue={0}
                                style={{ marginLeft: 10, height: 30, width: 80, paddingTop: 16, }}
                            />

                            <TextInput
                                style={{
                                    borderColor: "#CECECE",
                                    borderWidth: 1,
                                    height: 100,
                                    width: "100%",
                                    marginTop: 16,
                                    marginBottom: 16,
                                    fontSize: 14,
                                    padding: 4,
                                    textAlign: 'left',
                                    justifyContent: 'flex-start',
                                    borderRadius: 8,
                                    fontFamily: 'Quicksand-Regular',
                                    textAlignVertical: 'top'
                                }}
                                multiline={true}
                                placeholder={"What's your feedback?"}
                            >

                            </TextInput>

                        </View>

                    </Card>

                    <View style={{
                        marginTop: 16, marginBottom: 16,
                        justifyContent: 'center', alignItems: 'center'
                    }}>

                        <Text style={styles.rounded_button}
                            onPress={() => {
                                this.setModalVisible(true);
                            }}>
                            Submit</Text>
                    </View>

                </View>
            </ScrollView >
        );
    }
}


const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    },
    rounded_button: {
        width: '48%',
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
});


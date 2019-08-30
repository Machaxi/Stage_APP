import React from "react";
import { View, Platform, Text, TouchableOpacity, Image, Modal,StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import BaseComponent from "../../containers/BaseComponent";

export default class CustomConfirmDialog extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            modalVisible: false
        };
    }

    render() {

        console.log('render => ',JSON.stringify(this.props))
        let status = this.props.visible
        // this.setState({
        //     modalVisible: status
        // })

        return (

            <View>

                <Modal
                    animationType="none"
                    transparent={true}
                    visible={status}
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
                            >Thank you ! Your rewards has been succesfully submitted.</Text>

                            <Text style={[styles.rounded_button, { marginTop: 16, width: 70 }]}
                                onPress={() => {
                                    //this.setModalVisible(false);
                                    this.props.onPress()
                                }}>
                                OK</Text>

                        </View>

                    </View>
                </Modal>
            </View>

        );
    }

}
const styles = StyleSheet.create({
  
    rounded_button: {
        width: '90%',
        padding: 8,
        borderRadius: 20,
        //borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium'
    }

   
});



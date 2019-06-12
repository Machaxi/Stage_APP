import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import { Card, Text, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';

export default class AcademyListing extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: ["test", "test", "test", "test", "test"]
        }
    }

    componentDidMount() {

    }

    listHeader() {
        return (
            <View
                style={{
                    marginLeft: 16,
                    marginRight: 16,
                    marginTop: 16,
                    marginBottom: 8,
                    borderRadius: 12
                }}>
                <Card style={{ borderRadius: 16, elevation: 1 }}>

                    <TextInput style={{
                        marginLeft: 8,
                        backgroundColor: 'white',
                        borderRadius: 16,
                        fontFamily:'Quicksand-Regular'
                    }} placeholder="Search"></TextInput>
                </Card>

                <Text style={{
                    marginTop: 8, marginBottom: 4,
                    textAlign: 'right',
                    color: '#404040', fontSize: 12
                }} >Filter</Text>

                <View style={{ width: '100%', height: 1, backgroundColor: '#d7d7d7' }}></View>
            </View>
        )
    }
    _renderItem = ({ item }) => (

        <TouchableOpacity activeOpacity={.8}
        onPress={()=>{
            this.props.navigation.navigate('AcademyProfile')
        }}>

            <Card
                style={{
                    borderRadius: 16,
                    marginLeft: 16,
                    marginRight: 16,
                    marginTop: 8,
                    marginBottom: 8,
                    elevation: 2

                }}>
                <View>
                    <Image style={{ height: 130, width: "100%", borderRadius: 16, }}
                        source={require('../../images/academy_img.png')}
                    >

                    </Image>

                    <Text style={{ paddingTop: 12, paddingLeft: 12, fontSize: 16, color: '#707070' }}> Feather Academy</Text>

                    <View style={{ paddingLeft: 12, paddingTop: 8, flexDirection: 'row', flex: 1 }}>

                        <Rating
                            type='custom'
                            ratingColor='#F4FC9A'
                            ratingBackgroundColor='#D7D7D7'
                            ratingCount={5}
                            imageSize={14}
                            style={{ height: 30, width: 80 }}
                        />

                        <Text style={{
                            backgroundColor: '#DFDFDF', height: 19, width: 30, textAlign: 'center',
                            fontSize: 12,
                            color: '#707070',
                            paddingTop:2,
                            borderRadius: 12,
                        }}>4.5</Text>

                    </View>

                </View>

            </Card>
        </TouchableOpacity>

    );

    render() {
        return (
            <View style={styles.chartContainer}>



                <FlatList
                    ListHeaderComponent={() => this.listHeader()}
                    data={this.state.data}
                    renderItem={this._renderItem}
                />


            </View>
        );
    }
}

const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },
});


import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import { Card, Text, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';

export default class CoachListing extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: ["test", "test", "test", "test", "test", "test", "test", "test", "test", "test", "test", "test",]
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
                    }} placeholder="Search"></TextInput>
                </Card>

                <Text style={{
                    marginTop: 8, marginBottom: 4,
                    textAlign: 'right',
                    color: '#d3d3d3', fontSize: 13
                }} >Filter</Text>

                <View style={{ width: '100%', height: 1, backgroundColor: '#d7d7d7' }}></View>
            </View>



        )
    }
    _renderItem = ({ item }) => (

        <TouchableOpacity
            onPress={() => {
                console.warn('test')
                this.props.navigation.navigate('CoachProfileDetail')
            }}
            activeOpacity={.8}
        >
            <View style={{}}>

                <View style={{ paddingLeft: 12, flexDirection: 'row', flex: 1 }}>

                    <Text style={{ width: '35%', color: '#707070' }}> Sudesh Kumar</Text>

                    <Text style={{
                        width: '20%', backgroundColor: '#667DDB',
                        color: 'white',
                        paddingTop:2,
                        borderRadius: 4,
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItem: 'center',
                        fontSize: 12
                    }}> My Coach</Text>

                    <Text style={{ width: '30%', textAlign: 'center', color: '#707070', }}> 2 yr 4 m</Text>


                    <Text style={{
                        backgroundColor: '#D8D8D8', height: 19, width: 30, textAlign: 'center',
                        fontSize: 12,
                        color: '#707070',
                        paddingTop:2,
                        borderRadius: 12,
                    }}>4.5</Text>

                </View>

                <View style={{ height: 1, width: '100%', backgroundColor: '#DFDFDF', marginTop: 10, marginBottom: 10 }}></View>

            </View>
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


import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import BaseComponent, { defaultStyle } from '../../containers/BaseComponent';

const width = 300
const numberOfCol = 4

export default class MonthYearDialog extends BaseComponent {


    constructor(props) {
        super(props)
        this.state = {
            months: [
                { key: 'JAN' },
                { key: 'FEB' },
                { key: 'MAR' },
                { key: 'APR' },
                { key: 'MAY' },
                { key: 'JUN' },
                { key: 'JUL' },
                { key: 'AUG' },
                { key: 'SEP' },
                { key: 'OCT' },
                { key: 'NOV' },
                { key: 'DEC' },
            ],
            year: 2019

        }
    }

    _renderItem = ({ item, index }) => {
        //console.log('item->', item)
        return (
            <TouchableOpacity
                onPress={() => {
                    const year = this.state.year
                    const month = (index + 1)
                    this.props.touchOutside(month,year);
                }}
                style={{
                    width: 70,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text style={[defaultStyle.bold_text_14, {
                    width: "100%",
                    padding: 8
                }]}>{item.key}</Text>
            </TouchableOpacity>
        )
    }

    render() {

        return (
            <Dialog
                width={width}
                height={200}
                visible={this.props.visible}
                dialogStyle={{ borderRadius: 12, }}
                onTouchOutside={() => {
                    this.props.touchOutside();
                }}
            >
                <DialogContent style={styles.contentContainer}>

                    <View style={{
                        flexDirection: 'row',
                        paddingTop: 16,
                        paddingBottom: 16,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>

                        <TouchableOpacity
                            onPress={() => {
                                let year = this.state.year
                                year = +year - 1
                                this.setState({
                                    year
                                })
                            }}
                        >

                            <Text style={[defaultStyle.heavy_bold_text_14, {
                                width: 100,
                                paddingLeft: 24,
                                textAlign: 'left'
                            }]}>Prev</Text>

                        </TouchableOpacity>

                        <Text style={[defaultStyle.bold_text_16, {
                            width: 100,
                            textAlign: 'center'
                        }]}>{this.state.year}</Text>

                        <TouchableOpacity
                            onPress={() => {
                                let year = this.state.year
                                year = +year + 1
                                this.setState({
                                    year
                                })
                            }}
                        >
                            <Text style={[defaultStyle.heavy_bold_text_14, {
                                width: 100,
                                paddingRight: 24,
                                textAlign: 'right'
                            }]}>Next</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.header}></View>
                    <FlatList
                        numColumns={4}
                        data={this.state.months}
                        renderItem={this._renderItem}
                    />


                    {/* <TouchableOpacity
                        onPress={() => {
                            this.props.touchOutside();
                        }}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View style={{ width: "100%" }}>
                            <Text style={[defaultStyle.bold_text_14, {
                                width: "100%",
                                marginTop: 20,
                            }]}>OK</Text>
                        </View>
                    </TouchableOpacity> */}

                </DialogContent>
            </Dialog>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'stretch',
        paddingTop: 10,
        paddingHorizontal: 0,
        margin: 0,
    },
    text: {
        color: '#404040',
        fontSize: 14,
        // marginVertical:7,
        padding: 8
    },
    text1: {
        color: '#000',
        fontSize: 15,
        // marginVertical:7,
        padding: 8
    },
    header: {
        width: '100%',
        height: 1,
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF',
    }
})


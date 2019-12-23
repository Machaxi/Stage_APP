import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { Card, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, { defaultStyle } from '../BaseComponent'
import { RateViewFill } from '../../components/Home/RateViewFill';
import { CheckBox } from 'react-native-elements'
import { SkyFilledButton } from '../../components/Home/SkyFilledButton'

export default class AcademyFilter extends BaseComponent {


    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: 'Filters',
            headerTitleStyle: defaultStyle.headerStyle,

            headerLeft: (
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    activeOpacity={.8}>
                    <Image
                        source={require('../../images/go_back_arrow.png')}
                        style={{ width: 20, height: 16, marginLeft: 12, paddingLeft: 3, paddingRight: 3 }}
                    />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity
                    onPress={() => {
                        navigation.state.params.onFilterSelected('');
                        navigation.goBack();
                    }}
                    activeOpacity={.8}
                >
                    <Text
                        style={{
                            marginRight: 12,
                            fontFamily: 'Quicksand-Regular',
                            fontSize: 14,
                            color: 'red'
                        }}
                    >Reset</Text>
                </TouchableOpacity>

            )
        };

    };

    constructor(props) {
        super(props)

        this.state = {
            refresh: false,
            filterData: [
                {
                    id: 1,
                    title: "Sports Categories",
                    expand: false,
                    data: [{ pid: 1, name: "Badminton", is_selected: true, rating: false }],
                },
                {
                    id: 2,
                    title: "Academy Rating",
                    expand: false,
                    data: [
                        { pid: 2, name: "5", is_selected: false, rating: true },
                        { pid: 2, name: "4", is_selected: false, rating: true },
                        { pid: 2, name: "3", is_selected: false, rating: true },
                        { pid: 2, name: "2", is_selected: false, rating: true },
                        { pid: 2, name: "1", is_selected: false, rating: true }
                    ],
                },
                {
                    id: 3,
                    title: "Coach Rating",
                    expand: false,
                    data: [
                        { pid: 3, name: "5", is_selected: false, rating: true },
                        { pid: 3, name: "4", is_selected: false, rating: true },
                        { pid: 3, name: "3", is_selected: false, rating: true },
                        { pid: 3, name: "2", is_selected: false, rating: true },
                        { pid: 3, name: "1", is_selected: false, rating: true }
                    ],
                }
            ]

        }

        let filterData = this.props.navigation.getParam('filterData', '')
        console.warn('filterData => ', filterData)
        if (filterData != '') {
            this.setState({
                filterData: filterData
            })
            this.state.filterData = filterData
        }
    }

    _renderItem = ({ item }) => (


        <View>

            <View style={{
                padding: 12
            }}>

                <TouchableOpacity
                    onPress={() => {

                        let filterData = [...this.state.filterData];
                        let index = filterData.findIndex(el => el.title === item.title);
                        filterData[index] = { ...filterData[index], expand: !item.expand };
                        this.setState({ filterData: filterData });

                    }}>

                    <View style={{
                        flexDirection: 'row',
                        paddingBottom: 4,
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={defaultStyle.bold_text_14}>
                            {item.title}
                        </Text>

                        <Image
                            resizeMode='contain'
                            style={{
                                marginLeft: 10,
                                height: 12, width: 12,
                            }}
                            source={require('../../images/bottom_arrow_icon.png')} >

                        </Image>
                    </View>

                </TouchableOpacity>

                {item.expand ?
                    <FlatList
                        data={item.data}
                        extraData={this.state.refresh}
                        renderItem={this._renderSubItem}
                    />
                    : null}


            </View>

            <View style={defaultStyle.line_style}></View>

        </View>

    );

    _renderSubItem = ({ item }) => {
        this.setState({
            refresh: false
        })

        return (


            <View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>

                    <CheckBox
                        checkedIcon={<Image
                            style={{
                                width: 18,
                                height: 18
                            }} resizeMode="contain" source={require('../../images/ic_checkbox_on.png')} />}
                        uncheckedIcon={<Image style={{
                            width: 18,
                            height: 18
                        }} resizeMode="contain" source={require('../../images/ic_checkbox_off.png')} />}
                        containerStyle={{
                            borderWidth: 0,
                            paddingTop: 6,
                            marginLeft: -4,
                            margin: 0,
                            marginTop: 0,

                        }}
                        checked={item.is_selected}
                        onPress={() => {

                            let filterData = [...this.state.filterData];
                            console.log('item.title => ', item.title)
                            let index = filterData.findIndex(el => el.id === item.pid);
                            let temp = filterData[index] = { ...filterData[index] };
                            console.log('index => ', index)
                            console.log('temp => ', temp)
                            let data = temp.data
                            console.log('data => ', data)
                            let Newindex = data.findIndex(el => el.name === item.name);
                            console.log('Newindex => ', Newindex)
                            data[Newindex] = { ...data[Newindex], is_selected: !item.is_selected };
                            console.log('update ', data)
                            filterData[index] = temp
                            console.log('filterData[index] ', filterData[index])
                            console.log('filterData => ', filterData)
                            this.setState({ filterData });
                            this.state.filterData = filterData
                            this.setState({
                                refresh: true
                            })
                        }
                        }

                    />

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: -6
                    }}>

                        <Text style={[defaultStyle.regular_text_14, {
                        }]}>{item.name}</Text>

                        {item.rating ?
                            <Image
                                style={{
                                    width: 14,
                                    height: 14,
                                    marginLeft: 6,
                                }} resizeMode="contain" source={require('../../images/ic_star.png')} />
                            : null
                        }

                    </View>

                </View>

            </View>

        )
    };

    apply() {

        let filterData = this.state.filterData
        this.props.navigation.state.params.onFilterSelected(filterData);
        this.props.navigation.goBack();

        //?sport=Badminton&coach_ratings=1&academy_ratings=4



    }

    render() {

        let filter = this.state.filterData

        return (
            <View style={styles.chartContainer}>


                <FlatList
                    data={filter}
                    extraData={this.state.refresh}
                    renderItem={this._renderItem}
                />

                <View style={{ margin: 12 }}>
                    <SkyFilledButton
                        onPress={() => {
                            this.apply()
                        }}
                    >Apply</SkyFilledButton>
                </View>

            </View>
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
        //borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium'
    },
});


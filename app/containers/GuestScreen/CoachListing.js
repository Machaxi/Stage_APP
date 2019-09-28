import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { connect } from 'react-redux';
import { coachListing } from '../../redux/reducers/CoachReducer'
import BaseComponent, { defaultStyle, formattedName } from '../BaseComponent';
import { getData } from '../../components/auth';

class CoachListing extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            coaches: [],
            filter: [],
            query: '',
            academy_id: ''
        }
        this.state.academy_id = this.props.navigation.getParam('academy_id', '');
        // if(this.state.academy_id==undefined){
        //     getData('userInfo', (value) => {
        //         let academy_id = userData['academy_id']
        //         this.state.academy_id = academy_id
        //     });
        // }
    }

    componentDidMount() {

        let academy_id = this.state.academy_id

        getData('header', (value) => {

            this.props.coachListing(academy_id, value).then(() => {
                console.warn('Res=> ' + JSON.stringify(this.props.data.res))
                let status = this.props.data.res.success
                if (status) {
                    let list = this.props.data.res.data.coaches

                    this.setState({
                        coaches: list,
                        filter: list
                    })
                }

            }).catch((response) => {
                console.log(response);
            })
        })



    }

    listHeader() {
        return (

            <View
                style={{
                    marginLeft: 16,
                    marginRight: 16,
                    marginTop: 16,
                    marginBottom: 8,
                    borderRadius: 12,
                }}>
                <Card style={{ borderRadius: 16, elevation: 1 }}>

                    <TextInput style={{
                        marginLeft: 8,
                        height: 45,
                        backgroundColor: 'white',
                        borderRadius: 16,
                        fontFamily: 'Quicksand-Regular'
                    }} placeholder="Search"
                        onChangeText={text => {
                            this.state.query = text
                            console.warn(text)
                            const data = this.find(this.state.query);
                            this.state.filter = data;
                            this.setState({
                                filter: data
                            })
                        }}
                    ></TextInput>
                </Card>

                {/* <Text style={{
                    marginTop: 8, marginBottom: 4,
                    textAlign: 'right',
                    color: '#d3d3d3', fontSize: 13
                }} >Filter</Text>

                <View style={{ width: '100%', height: 1, backgroundColor: '#d7d7d7' }}></View>
          */}
            </View>


        )
    }


    _renderItem = ({ item }) => (

        <TouchableOpacity
            onPress={() => {
                console.warn('test')
                this.props.navigation.navigate('CoachProfileDetail', {
                    academy_id: this.state.academy_id,
                    coach_id: item.id
                })
            }}
            activeOpacity={.8}
        >
            <View style={{}}>

                <View style={{
                    paddingBottom: 8, paddingTop: 8,
                    paddingLeft: 16, paddingRight: 16,
                    flexDirection: 'row', flex: 1,
                }}>

                    <Text
                        numberOfLines={1}
                        style={{
                            color: '#707070',
                            width: "30%"
                        }}>
                        {item.name}
                    </Text>

                    <View style={{
                        width: "55%",
                        flexDirection: 'row'
                    }}>

                        {item.is_head ?
                            <View style={{
                                width: 70,
                                borderRadius: 4,
                                alignItem: 'center',
                                justifyContent: 'center',
                                marginRight: 6,
                                backgroundColor: '#CDB473',
                            }}>

                                <Text style={[defaultStyle.regular_text_10, {
                                    color: 'white',
                                    textAlign: 'center',
                                }]}>Head Coach</Text>
                            </View> : null}

                        {item.isMyCoach ?
                            <View style={{
                                width: 70,
                                borderRadius: 4,
                                alignItem: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#667DDB',
                            }}>

                                <Text style={[defaultStyle.regular_text_10, {
                                    color: 'white',
                                    textAlign: 'center',
                                }]}>My Coach</Text>
                            </View> : null}
                    </View>

                    {/* :
                        <Text style={{
                            width: '20%', backgroundColor: '#000000',
                            color: 'white',
                            paddingTop: 2,
                            borderRadius: 4,
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItem: 'center',
                            fontSize: 12
                        }}> </Text>
                    }


                    <Text style={{ width: '30%', textAlign: 'center', color: '#707070', }}> {item.experience} yr</Text>
 */}
                    <View
                        style={{
                            borderColor: '#D8D8D8',
                            borderRadius: 12,
                            borderWidth: 1,
                            width: 50,
                            paddingTop: 2,
                            paddingBottom: 2,
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>


                        <Text style={{
                            textAlign: 'center',
                            fontSize: 12,
                            color: '#707070',
                        }}>{item.ratings == undefined ? 0 : item.ratings.toFixed(1)}</Text>

                        <Image
                            resizeMode="contain"
                            style={{ width: 13, height: 13, marginLeft: 2, marginTop: 2 }}
                            source={require('../../images/ic_star.png')}
                        >

                        </Image>
                    </View>

                </View>


            </View>
        </TouchableOpacity>

    );

    find(query) {
        const { coaches } = this.state;

        if (query === '') {
            return coaches;
        }
        const regex = new RegExp(`${query.trim()}`, 'i');
        console.log('regex ', regex)
        return coaches.filter(item => item.name.search(regex) >= 0);
    }

    render() {

        if (this.props.data.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }


        return (
            <View style={styles.chartContainer}>

                {this.listHeader()}
                <FlatList
                    //ListHeaderComponent={() => this.listHeader()}
                    data={this.state.filter}
                    extraData={this.state.filter}
                    renderItem={this._renderItem}
                />


            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.coachReducer,
    };
};
const mapDispatchToProps = {
    coachListing
};
export default connect(mapStateToProps, mapDispatchToProps)(CoachListing);


const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
});


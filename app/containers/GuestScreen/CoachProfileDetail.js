import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { coachDetail } from '../../redux/reducers/AcademyReducer'
import BaseComponent from '../BaseComponent';

class CoachProfileDetail extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            coachData: {}
        }
    }

    componentDidMount() {

        this.props.coachDetail().then(() => {
            //console.warn('Res=> ' + JSON.stringify(this.props.data.res.data.academies))
            let status = this.props.data.res.success
            if (status) {
                let coach = this.props.data.res.data.coach
                console.warn(coach)

                this.setState({
                    coachData: coach
                })
            }

        }).catch((response) => {
            console.log(response);
        })

    }

    render() {

        if (this.state.coachData != null) {

            return (
                <ScrollView style={styles.chartContainer}>

                    <View>

                        <View style={{ padding: 16 }}>

                            <View style={{ flexDirection: 'row' }}>

                                <Image style={{ height: 129, width: 129, borderRadius: 16 }}
                                    source={require('../../images/coach_photo.png')}
                                >

                                </Image>

                                <View style={{ paddingLeft: 10, paddingTop: 10, justifyContent: 'flex-end' }}>

                                    {/* <Text style={{
                                        //width: 70,
                                        padding: 4,
                                        backgroundColor: '#667DDB',
                                        color: 'white',
                                        borderRadius: 4,
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        alignItem: 'center',
                                        fontSize: 12
                                    }}> My Coach</Text> */}

                                    <Text style={{ paddingTop: 12, color: '#707070' }}>{this.state.coachData.name}</Text>

                                    <View style={{ paddingTop: 8, flex: 1, flexDirection: 'row' }}>

                                        <Rating
                                            type='custom'
                                            ratingColor='#F4FC9A'
                                            ratingBackgroundColor='#D7D7D7'
                                            backgroundColor="#F7F7F7"
                                            ratingCount={5}
                                            imageSize={14}
                                            style={{ height: 30, width: 80 }}
                                        />

                                        <Text style={{
                                            backgroundColor: '#ddd', height: 20, width: 36, textAlign: 'center',
                                            fontSize: 14,
                                            color: 'gray',
                                            borderRadius: 12,
                                        }}>{this.state.coachData.ratings}</Text>

                                    </View>

                                    <Text style={{ fontSize: 12, color: '#A3A5AE', marginTop: 10 }}>Experience</Text>
                                    <View style={{
                                        paddingTop: 8, flexDirection: 'row',
                                        flex: 1,
                                        justifyContent: 'space-between',
                                        alignItems: 'center',

                                    }}>


                                        <Text style={{
                                            color: '#404040',
                                            fontSize: 14,
                                        }}>{this.state.coachData.ratings} yr</Text>


                                        <Text style={{
                                            color: '#667DDB',
                                            fontSize: 10,
                                            textAlign: 'right',
                                            marginLeft: 24,
                                        }}>View Other Coaches</Text>

                                    </View>

                                </View>

                            </View>

                            <View style={{ paddingTop: 16 }}>

                                <Text style={{ fontSize: 12, color: '#A3A5AE', paddingTop: 8 }}>Certifications</Text>
                                <Text style={{ color: '#404040' }}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. </Text>
                            </View>


                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 16, justifyContent: 'center' }}>

                            <Text
                                style={styles.filled_button}
                            >
                                Give Feedback
                        </Text>

                        </View>

                    </View>
                </ScrollView>

            );
        }

        else {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

    }
}


const mapStateToProps = state => {
    return {
        data: state.AcademyReducer,
    };
};
const mapDispatchToProps = {
    coachDetail
};
export default connect(mapStateToProps, mapDispatchToProps)(CoachProfileDetail);


const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        paddingTop: 8
    },
    rounded_button: {
        width: '48%',
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        borderColor: '#67BAF5',
        color: '#67BAF5', textAlign: 'center'
    },
    filled_button: {
        width: '90%',
        padding: 12,
        borderRadius: 22,
        marginLeft: 4,
        marginRight: 4,
        marginTop: 8,
        backgroundColor: '#67BAF5',
        color: 'white',
        textAlign: 'center',
    },
    card_style: {
        elevation: 1,
        borderRadius: 10,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 6,
        marginBottom: 6
    }
});


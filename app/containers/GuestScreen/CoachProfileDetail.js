import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { coachDetail, getCoachFeedbackList } from '../../redux/reducers/AcademyReducer'
import BaseComponent from '../BaseComponent';
import { getData } from "../../components/auth";
import { RateViewFill } from '../../components/Home/RateViewFill';

class CoachProfileDetail extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            coachData: {},
            academy_id: '',
            coach_id: '',
            showFeedback: false,
            feedback: []
        }
        this.state.academy_id = this.props.navigation.getParam('academy_id', '');
        this.state.coach_id = this.props.navigation.getParam('coach_id', '')

        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            if (userData.user['user_type'] == 'PLAYER' || userData.user['user_type'] == 'FAMILY') {
                this.setState({
                    showFeedback: true
                })
            } else {
                this.setState({
                    showFeedback: false
                })
            }
        });
    }

    getCoachFeedbacks() {

        let coach_id = this.state.coach_id;
        let academy_id = this.state.academy_id
        let page = 0
        let size = 10
        let sort = ''

        this.props.getCoachFeedbackList('', academy_id, coach_id, page, size, sort).then(() => {
            console.log('getCoachFeedbackList=> ' + JSON.stringify(this.props.data.res))
            let status = this.props.data.res.success
            if (status) {
                let feedback = this.props.data.res.data.feedback
                console.warn('Feedback => ' + JSON.stringify(feedback))
                this.setState({
                    feedback: feedback
                })
            }

        }).catch((response) => {
            console.log(response);
        })
    }



    componentDidMount() {

        let coach_id = this.state.coach_id

        this.props.coachDetail(coach_id).then(() => {
            console.log('coachDetail=> ' + JSON.stringify(this.props.data.res))
            let status = this.props.data.res.success
            if (status) {
                let coach = this.props.data.res.data.coach
                this.setState({
                    coachData: coach
                })
                this.getCoachFeedbacks()

            }

        }).catch((response) => {
            console.log(response);
        })

    }

    _renderRatingItem = ({ item }) => (

        <View
            style={{ margin: 12 }}
        >

            <View style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',

            }}>

                <Text
                    style={{ color: '#707070', fontSize: 14, flex: 1, fontFamily: 'Quicksand-Medium', }}
                >
                    {item.source.name}
                </Text>


                <View style={{
                    flexDirection: 'row',

                }}>

                    <Rating
                        type='custom'
                        ratingColor='#F4FC9A'
                        ratingBackgroundColor='#D7D7D7'
                        ratingCount={5}
                        imageSize={14}
                        readonly={true}
                        startingValue={item.rating}
                        style={{ height: 30, width: 80 }}
                    />

                    {/* <Text style={{
                        backgroundColor: '#D6D6D6', height: 19,
                        width: 30,
                        textAlign: 'center',
                        fontSize: 12,
                        paddingTop: 2,
                        color: '#707070',
                        borderRadius: 12,
                    }}>{item.rating}</Text> */}
                    <RateViewFill>{item.rating}</RateViewFill>
                </View>

            </View>

            <Text style={{
                fontSize: 12,
                color: '#707070',
            }}>{item.review}</Text>

        </View>



    );

    render() {

        let showFeedback = this.state.showFeedback
        if (this.props.data.loading || this.state.coachData == null) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        let feedback = this.state.feedback
        let coachData = this.state.coachData
        let year = coachData.experience / 12
        year = Math.floor(year)
        let month = coachData.experience % 12
        let rating =coachData.ratings==undefined?0:coachData.ratings
        return (
            <ScrollView 
            contentContainerStyle={{
                flexGrow: 1
            }}
            style={styles.chartContainer}>

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

                                <View style={{
                                    paddingTop: 8, flex: 1,
                                    flexDirection: 'row', alignItems: 'center'
                                }}>

                                    <Rating
                                        type='custom'
                                        ratingColor='#F4FC9A'
                                        ratingBackgroundColor='#D7D7D7'
                                        ratingCount={5}
                                        onStartRating={5}
                                        readonly={true}
                                        imageSize={14}
                                        style={{ height: 30, width: 80, marginTop: 7 }}
                                    />

                                    {/* <Text style={{
                                        backgroundColor: '#ddd', height: 20, width: 36, textAlign: 'center',
                                        fontSize: 14,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'gray',
                                        borderRadius: 12,
                                    }}>5</Text> */}
                                    <RateViewFill>{rating}</RateViewFill>
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
                                    }}>{year} yr {month} m</Text>

                                    <TouchableOpacity
                                        style={{ marginLeft: 20, }}
                                        onPress={() => {
                                            this.props.navigation.goBack(null);
                                        }}>
                                        <Text style={{
                                            color: '#667DDB',
                                            fontSize: 10,
                                            textAlign: 'right',
                                        }}>View Other Coaches</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>

                        </View>

                        <View style={{ paddingTop: 16 }}>

                            <Text style={{ fontSize: 12, color: '#A3A5AE', paddingTop: 8 }}>Certifications</Text>
                            <Text style={{ color: '#404040' }}>{coachData.about}</Text>
                        </View>

                    </View>
                    {showFeedback ?
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => {
                                this.props.navigation.navigate('WriteAcademyFeedback',
                                    {
                                        academy_id: this.state.academy_id,
                                        target_id: this.state.coach_id,
                                        is_coach: true
                                    })
                            }}>


                            <View style={{ flexDirection: 'row', marginBottom: 16, justifyContent: 'center' }}>
                                <Text
                                    style={styles.filled_button}>
                                    Give Feedback
                                 </Text>
                            </View>

                        </TouchableOpacity> : null}

                    {feedback.length != 0 ?
                        <Card
                            style={{
                                elevation: 2,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                marginTop: 10,
                            }}
                        >
                            <View
                                style={{ marginLeft: 12, marginRight: 12, marginTop: 12 }}
                            >

                                <View style={{

                                    flexDirection: 'row',
                                    flex: 1,
                                    justifyContent: 'space-between',
                                }}>
                                    <Text
                                        style={{ fontSize: 14, color: '#707070' }}
                                    >
                                        Reviews ({this.state.feedback.length})
                            </Text>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Text
                                            style={{ color: '#707070', fontSize: 12, marginRight: 2 }}
                                        >Latest</Text>
                                        <Image
                                            style={{ width: 24, height: 15, }}
                                            source={require('../../images/filter_rating.png')}
                                        ></Image>

                                    </View>

                                </View>

                                <View
                                    style={{ width: '100%', height: 1, backgroundColor: '#DFDFDF', marginTop: 8, marginBottom: 8 }}
                                ></View>


                            </View>


                            <FlatList
                            
                                extraData={feedback}
                                data={feedback}
                                renderItem={this._renderRatingItem}
                            />

                        </Card>
                        : null}
                </View>
            </ScrollView>

        );

    }
}


const mapStateToProps = state => {
    return {
        data: state.AcademyReducer,
    };
};
const mapDispatchToProps = {
    coachDetail, getCoachFeedbackList
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


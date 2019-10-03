import React from 'react';
import { StyleSheet, View, ActivityIndicator, TextInput, Text, Modal, Alert, Image, ScrollView, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, { defaultStyle } from '../BaseComponent'
import { connect } from 'react-redux';
import { getData } from "../../components/auth";
import { getMyCoachFeedbackListing } from '../../redux/reducers/FeedbackReduer'
import { RateViewFill } from '../../components/Home/RateViewFill';
import StarRating from 'react-native-star-rating';


class CoachMyFeedbackListing extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            feedback: [],
            coach_id: '',
            academy_id: ''
        };

        this.state.coach_id = this.props.navigation.getParam('coach_id', '')
        this.state.academy_id = this.props.navigation.getParam('academy_id', '')
        //this.state.coach_id = '1'
        //this.state.academy_id = '1'

        getData('academy_id', (value) => {

            //console.warn('academy_id', value)
            this.state.academy_id = value

            getData('userInfo', (value) => {

                let user = JSON.parse(value)

                //console.warn('coach_id', user['coach_id'])
                this.state.coach_id = user['coach_id']
                this.state.academy_id = user['academy_id']
                this.fetchData()

            })


        })

    }

    fetchData() {

        const { coach_id, academy_id } = this.state

        getData('header', (value) => {

            this.props.getMyCoachFeedbackListing(value, academy_id, coach_id).then(() => {

                //console.warn('getMyCoachFeedbackListing=> ' + JSON.stringify(this.props.data))
                let data = this.props.data.data
                if (data.success) {
                    feedback = data.data.feedback
                    this.setState({
                        feedback: feedback
                    })

                } else {
                    alert("Something went wrong.")
                }

            }).catch((response) => {
                console.log(response);
            })

        })
    }


    _renderItem = ({ item }) => (

        <Card
            style={{ margin: 1, elevation: 2 }}
        >

            <View
                style={{ margin: 16, elevation: 2 }}
            >

                <View style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',

                }}>

                    <Text
                        style={[defaultStyle.bold_text_14, { flex: 1 }]}>
                        Anonymous
                    </Text>


                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>

                        {/* <Rating
                            type='custom'
                            ratingColor='#F4FC9A'
                            ratingBackgroundColor='#D7D7D7'
                            ratingCount={5}
                            imageSize={14}
                            readonly={true}
                            startingValue={item.rating}
                            style={{ width: 80 }}
                        /> */}
                        <StarRating
                            style={{
                                //height: 24, 
                                width: 70,
                                marginRight: 6,
                            }}
                            containerStyle={{
                                width: 70,
                                marginRight: 6
                            }}
                            starSize={14}
                            disabled={true}
                            emptyStar={require('../../images/ic_empty_star.png')}
                            fullStar={require('../../images/ic_star.png')}
                            halfStar={require('../../images/ic_half_star.png')}
                            iconSet={'Ionicons'}
                            maxStars={5}
                            rating={item.rating}
                            ratingBackgroundColor={"#ff2200"}
                            fullStarColor={'#F4FC9A'}
                        />

                        {/* <Text style={{
                            backgroundColor: '#D6D6D6',
                            height: 19,
                            width: 30,
                            textAlign: 'center',
                            fontSize: 12,
                            color: '#707070',
                            fontFamily: 'Quicksand-Medium',
                            borderRadius: 12,
                        }}>{item.rating}</Text> */}
                        <RateViewFill>{item.rating}</RateViewFill>

                    </View>

                </View>

                <Text style={defaultStyle.regular_text_12}>
                    {item.review}
                </Text>

            </View>

        </Card>

    );


    render() {


        if (this.props.data.loading && this.state.coaches == null) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        let data = this.state.feedback


        return (

            <View style={styles.chartContainer}>

                {data.length == 0 ?
                    <View
                        style={{

                            alignSelf: 'center',
                            marginTop: 150,
                            justifyContent: 'center', flex: 1, alignItems: 'center'
                        }}
                    >

                        <Text style={{
                            fontFamily: 'Quicksand-Regular',
                            justifyContent: 'center',
                            flex: 1, textAlign: 'center',
                        }}>No Feedback found</Text></View>
                    :
                    <FlatList
                        data={data}
                        renderItem={this._renderItem}
                    />}


            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.FeedbackReducer,
    };
};
const mapDispatchToProps = {
    getMyCoachFeedbackListing
};

export default connect(mapStateToProps, mapDispatchToProps)(CoachMyFeedbackListing);


const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#f7f7f7'
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
        fontFamily: 'Quicksand-Regular'
    },
});


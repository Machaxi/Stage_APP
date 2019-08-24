import React from 'react';
import { StyleSheet, View, TextInput, Text, Modal, Alert, Image, ScrollView } from 'react-native';
import { Card, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, { defaultStyle } from '../BaseComponent'
import { connect } from 'react-redux';
import { postFeedback } from '../../redux/reducers/FeedbackReduer'
import { getData } from "../../components/auth";
import Spinner from 'react-native-loading-spinner-overlay';
import { SkyFilledButton } from '../../components/Home/SkyFilledButton'
import SwipeableRating from 'react-native-swipeable-rating';
import StarRating from 'react-native-star-rating';

class WriteAcademyFeedback extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            academy_id: '',
            spinner: false,
            review: '',
            targetId: '',
            rating: 0,
            is_coach: false
        };
        this.state.academy_id = this.props.navigation.getParam('academy_id', '');
        this.state.is_coach = this.props.navigation.getParam('is_coach', false)
        this.state.targetId = this.props.navigation.getParam('target_id', '');

    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    sendFeedback() {

        let { rating, review } = this.state

        if (rating == 0) {
            alert('Please select rating')
        }
        else if (review == '') {
            alert('Please write review.')
        } else {

            this.setState({
                spinner: true
            })

            console.warn()

            var dict = {};
            dict['targetId'] = this.state.targetId
            dict['academyId'] = this.state.academy_id;
            dict['review'] = this.state.review;
            dict['rating'] = this.state.rating

            var data = {};
            data['data'] = dict


            getData('header', (value) => {

                this.props.postFeedback(value, data).then(() => {

                    this.setState({
                        spinner: false
                    })
                    //console.warn('Res=> ' + JSON.stringify(this.props.data))
                    let data = this.props.data.data
                    if (data.success) {
                        this.setState({
                            modalVisible: true
                        })
                    } else {
                        alert("Something went wrong.")
                    }


                }).catch((response) => {
                    console.log(response);
                    this.setState({
                        spinner: false
                    })
                })

            })

        }




    }

    render() {

        return (

            <ScrollView style={styles.chartContainer}>

                <View>

                    <Spinner
                        visible={this.state.spinner}
                        textStyle={defaultStyle.spinnerTextStyle}
                    />

                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={this.state.modalVisible}
                    >
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

                                {/* <Text style={[styles.rounded_button, { marginTop: 16, width: 70 }]}
                                    onPress={() => {
                                        this.setModalVisible(false);
                                        this.props.navigation.goBack(null);
                                    }}>
                                    OK</Text> */}

                                <View style={{
                                    margin: 16,
                                    alignSelf: 'center',
                                    width: 100,
                                }}>
                                    <SkyFilledButton
                                        onPress={() => {
                                            this.setModalVisible(false);
                                            this.props.navigation.goBack(null);
                                        }}
                                    >OK</SkyFilledButton>
                                </View>

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
                                {this.state.is_coach ? "Coach Feedback" : "Academy Feedback"}

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

                            {/* <Rating
                                type='custom'
                                ratingColor='#F4FC9A'
                                ratingBackgroundColor='#D7D7D7'
                                ratingCount={5}
                                imageSize={20}
                                onFinishRating={(score) => this.state.rating = score}
                                startingValue={0}
                                style={{
                                    marginLeft: 10,
                                    height: 30,
                                    width: 80,
                                    paddingTop: 16,
                                }}
                            />

                            <SwipeableRating
                                style={{
                                    marginLeft: -5,
                                    //height: 30,
                                    //width: 80,
                                    paddingTop: 16,
                                }}
                                emptyColor={"#A3A5AE"}
                                color={"#F8F29F"}
                                rating={this.state.rating}
                                size={30}
                                gap={0}
                                onPress={(rating) => {
                                    this.setState({ rating });
                                }}

                            /> */}


                            <StarRating
                                style={{
                                    paddingTop: 16,
                                }}
                                containerStyle={{
                                    width: 150,
                                }}
                                starSize={28}
                                disabled={false}
                                emptyStar={'ios-star-outline'}
                                fullStar={'ios-star'}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                maxStars={5}
                                rating={this.state.rating}
                                selectedStar={(rating) => this.setState({
                                    rating: rating
                                })}
                                fullStarColor={'#F8F29F'}
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
                                onChangeText={(review) => this.setState({ review })}
                                multiline={true}
                                placeholder={"What's your feedback?"}
                            >

                            </TextInput>




                        </View>

                    </Card>

                    {/* <View style={{
                        marginTop: 16, marginBottom: 16,
                        justifyContent: 'center', alignItems: 'center'
                    }}>

                        <Text style={styles.rounded_button}
                            onPress={() => {
                                this.sendFeedback()
                                //this.setModalVisible(true);
                            }}>
                            Submit</Text>
                    </View> */}

                    <View style={{
                        margin: 16,
                        alignSelf: 'center',
                        width: 100,
                    }}>
                        <SkyFilledButton
                            onPress={() => {
                                this.sendFeedback()
                            }}
                        >Submit</SkyFilledButton>
                    </View>

                </View>
            </ScrollView >
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.FeedbackReducer,
    };
};
const mapDispatchToProps = {
    postFeedback
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteAcademyFeedback);


const styles = StyleSheet.create({
    container: {
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


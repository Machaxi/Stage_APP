import React from 'react';
import { StyleSheet, View, ActivityIndicator, TextInput, Text, Modal, Alert, Image, ScrollView, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, { defaultStyle } from '../BaseComponent'
import { connect } from 'react-redux';
import { getData } from "../../components/auth";
import Spinner from 'react-native-loading-spinner-overlay';
import { getCoachListing, postFeedbackMultiple } from '../../redux/reducers/FeedbackReduer'
import { SkyFilledButton } from '../../components/Home/SkyFilledButton';
import StarRating from 'react-native-star-rating';


class WriteFeedbackListing extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            academy_id: '',
            spinner: false,
            coaches: []
        };
        this.state.academy_id = this.props.navigation.getParam('academy_id', '');
        this.state.player_id = this.props.navigation.getParam('player_id', '');
        //console.warn("Data " + this.state.academy_id + "" + this.state.player_id)
    }

    componentDidMount() {

        let academy_id = this.state.academy_id
        let player_id = this.state.player_id

        //adding academy cell manually


        // let newObj = { review: '', rating: 0, is_coach: false }
        // list[count++] = newObj
        // this.setState({
        //     coaches: list
        // })

        getData('header', (value) => {

            this.props.getCoachListing(value, academy_id, player_id).then(() => {

                let coaches = []
                console.warn('Res=> ' + JSON.stringify(this.props.data))
                let data = this.props.data.data
                if (data.success) {
                    coaches = data.data.coach_data.coaches

                } else {
                    alert("Something went wrong.")
                }

                let list = []
                let count = 0
                let newObj = { review: '', rating: 0, is_coach: false }
                list[count++] = newObj
                // this.setState({
                //     coaches: list
                // })


                for (let i = 0; i < coaches.length; i++) {

                    let obj = coaches[i]
                    let newObj1 = { ...obj, review: '', rating: 0, is_coach: true }
                    list[count++] = newObj1
                }

                this.setState({
                    coaches: list
                })


            }).catch((response) => {
                console.log(response);
            })

        })

    }


    submitFeedback() {

        console.warn("submitFeedback => ", this.state.coaches)
        let coaches = this.state.coaches
        var array = []

        for (let i = 0; i < coaches.length; i++) {

            let obj = coaches[i]

            var dict = {};
            if (obj.is_coach) {
                dict['targetId'] = obj.id
            } else {
                dict['targetId'] = this.state.academy_id
            }
            dict['academyId'] = this.state.academy_id;
            dict['review'] = obj.review
            dict['rating'] = obj.rating
            array.push(dict)

        }
        var data = {};
        data['data'] = array
        console.warn('data=>', data)
        this.setState({
            spinner: true
        })

        getData('header', (value) => {

            this.props.postFeedbackMultiple(value, data).then(() => {

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


    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    _renderItem = ({ item, index }) => (
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

                    {item.is_coach ? "Coach Feedback" : "Academy Feedback"}

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
                    {item.is_coach ? item.name : "Your Feedback"}
                </Text>

                {/* <Rating
                    type='custom'
                    ratingColor='#F4FC9A'
                    ratingBackgroundColor='#D7D7D7'
                    ratingCount={5}
                    imageSize={20}
                    startingValue={0}
                    onFinishRating={(score) => item.rating = score}
                    style={{ marginLeft: 10, height: 30, width: 80, paddingTop: 16, }}
                /> */}
                <StarRating
                    style={{ marginLeft: 10, height: 30, width: 80, paddingTop: 16, }}
                    containerStyle={{
                        width: 100,
                    }}
                    starSize={20}
                    disabled={false}
                    emptyStar={'ios-star-outline'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    iconSet={'Ionicons'}
                    maxStars={5}
                    rating={item.rating == undefined ? 0 : item.rating}
                    selectedStar={(rating) => {

                        let coaches = [...this.state.coaches]
                        coaches[+index].rating = rating
                        console.warn('coaches => ', JSON.stringify(coaches))
                        this.setState({
                            coaches: coaches
                        })
                        //console.warn(rating + '====' + index)
                        //item.rating = rating
                    }}
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
                    onChangeText={(review) => item.review = review}
                    multiline={true}
                    placeholder={"What's your feedback?"}
                >

                </TextInput>

            </View>

        </Card>
    );


    render() {

        let coaches = this.state.coaches

        if (this.props.data.loading && coaches.length <= 1) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }



        return (


            <ScrollView>

                <View style={styles.chartContainer}>

                    <Spinner
                        visible={this.state.spinner}
                        textStyle={defaultStyle.spinnerTextStyle}
                    />

                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={this.state.modalVisible}
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


                    <FlatList
                        data={coaches}
                        renderItem={this._renderItem}
                    />

                    {/* <View style={{
                        marginTop: 16, marginBottom: 16,
                        justifyContent: 'center', alignItems: 'center'
                    }}>

                        <Text style={styles.rounded_button}
                            onPress={() => {
                                this.submitFeedback()
                                //this.setModalVisible(true);
                            }}>
                            Submit</Text>
                    </View> */}

                    {coaches.length > 0 ?
                        < View style={{
                            margin: 16,
                            alignSelf: 'center',
                            width: 100,
                        }}>
                            <SkyFilledButton
                                onPress={() => {
                                    this.submitFeedback()
                                }}
                            >Submit</SkyFilledButton>
                        </View>
                        : null}

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
    getCoachListing, postFeedbackMultiple
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteFeedbackListing);


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


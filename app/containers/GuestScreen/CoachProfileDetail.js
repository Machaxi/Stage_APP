import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { coachDetail, getCoachFeedbackList } from '../../redux/reducers/AcademyReducer'
import BaseComponent, { defaultStyle, checkProfilePic } from '../BaseComponent';
import { getData } from "../../components/auth";
import { RateViewFill, } from '../../components/Home/RateViewFill';
import { RateViewBorder } from '../../components/Home/RateViewBorder'
import { SkyFilledButton } from '../../components/Home/SkyFilledButton'
import ReadMoreText from "rn-read-more-text";
import FilterDialog from './FilterDialog'
import StarRating from 'react-native-star-rating';

class CoachProfileDetail extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            coachData: null,
            academy_id: '',
            coach_id: '',
            showFeedback: false,
            feedback: [],
            filter_dialog: false,
            sortType: '',
            type: '',
            is_feedback_loading: false,
            user_id: ''
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

    getCoachFeedbacks(sortType, type, showLoading) {

        this.setState({
            sortType: sortType,
            type: type

        })
        let sort = sortType
        let coach_id = this.state.coach_id;
        let academy_id = this.state.academy_id
        let page = 0
        let size = 10


        this.props.getCoachFeedbackList('', academy_id, coach_id, page, size, sort, type).then(() => {
            console.log('getCoachFeedbackList=> ' + JSON.stringify(this.props.data.res))
            let status = this.props.data.res.success
            if (status) {
                let feedback = this.props.data.res.data.feedback
                console.warn('Feedback => ' + JSON.stringify(feedback))
                this.setState({
                    feedback: feedback
                })
            }
            this.setState({
                is_feedback_loading: false
            })

        }).catch((response) => {
            console.log(response);
            this.setState({
                is_feedback_loading: false
            })
        })
    }



    componentDidMount() {

        let coach_id = this.state.coach_id
        getData('header', (value) => {

            this.props.coachDetail(value, coach_id).then(() => {
                console.log('coachDetail=> ' + JSON.stringify(this.props.data.res))
                let status = this.props.data.res.success
                if (status) {
                    let coach = this.props.data.res.data.coach
                    this.setState({
                        coachData: coach
                    })

                    let sortType = this.state.sortType
                    let type = this.state.type
                    this.setState({
                        is_feedback_loading: true
                    })
                    this.getCoachFeedbacks(sortType, type, false)

                }

            }).catch((response) => {
                console.log(response);
            })
        })



    }

    sort(id, type) {

        this.state.filter_dialog = false
        this.setState({
            filter_dialog: false
        })


        if (id == undefined || type == undefined) {
            return
        }
        this.state.page = 0
        this.state.clear_feedback_array = true

        setTimeout(() => {
            this.getCoachFeedbacks(id, type)
        }, 100)

        // 
    }

    //{item.source.name}
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
                    style={{
                        color: '#707070',
                        fontSize: 14, flex: 1,
                        fontFamily: 'Quicksand-Medium',
                    }}>Anonymous</Text>


                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'

                }}>

                    <Rating
                        type='custom'
                        ratingColor='#F4FC9A'
                        ratingBackgroundColor='#D7D7D7'
                        ratingCount={5}
                        imageSize={12}
                        readonly={true}
                        startingValue={item.rating}
                        style={{ width: 80 }}
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

            <ReadMoreText
                limitLines={2}
                renderFooter={this.renderFooter}
            >
                <Text style={[defaultStyle.regular_text_12,
                {
                    color: '#707070',
                }]}>{item.review}</Text>
            </ReadMoreText>

            {/* <Text style={[defaultStyle.regular_text_12, {
                color: '#707070',
            }]}>{item.review}</Text> */}

        </View>



    );

    renderFooter = ({ isShowingAll, toggle }) => (
        <View style={{
            justifyContent: 'flex-end',
            flex: 1,
            alignItems: 'flex-end'
        }}>
            <Text
                style={[defaultStyle.regular_text_10, {
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    marginTop: 0, color: '#667DDB'
                }]}
                onPress={() => toggle()}
            >
                {isShowingAll ? "Show less" : "Show more"}
            </Text></View>
    );

    render() {

        let filter_dialog = this.state.filter_dialog

        let showFeedback = this.state.showFeedback
        if (this.state.coachData == null) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        let feedback = this.state.feedback
        let coachData = this.state.coachData
        let user_id = coachData.user_id
        let is_head = coachData.is_head

        let year = coachData.experience / 12
        year = Math.floor(year)
        let month = coachData.experience % 12
        let rating = coachData.ratings == undefined ? 0 : coachData.ratings

        let profile_pic = checkProfilePic(coachData.profile_pic)

        return (
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1
                }}
                style={styles.chartContainer}>

                <View>

                    <FilterDialog
                        touchOutside={(id, type) => {
                            this.sort(id, type, true)
                        }}
                        visible={filter_dialog} />

                    <View style={{ padding: 16 }}>

                        <View style={{ flexDirection: 'row' }}>

                            <Image style={{ height: 129, width: 129, borderRadius: 16 }}
                                source={profile_pic}
                            />

                            <View style={{ paddingLeft: 10, paddingTop: 10, justifyContent: 'flex-end' }}>

                                <View style={{
                                    flexDirection: 'row'
                                }}>

                                    {is_head ?
                                        <View style={{
                                            width: 90,
                                            borderRadius: 4,
                                            justifyContent: 'center',
                                            alignItem: 'center',
                                            backgroundColor: '#CDB473',
                                        }}>

                                            <Text style={[defaultStyle.bold_text_12, {
                                                paddingLeft: 4,
                                                paddingRight: 4,
                                                paddingTop: 1,
                                                paddingBottom: 1,
                                                color: 'white',
                                                textAlign: 'center',
                                            }]}>Head Coach</Text>
                                        </View> : null}
                                </View>

                                <Text style={[defaultStyle.bold_text_14, { paddingTop: 12, color: '#707070' }]}>
                                    {this.state.coachData.name}</Text>

                                <View style={{
                                    paddingTop: 8, flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>

                                    {/* <Rating
                                        tintColor="#F7F7F7"
                                        type='custom'
                                        ratingColor='#F4FC9A'
                                        ratingBackgroundColor='#D7D7D7'
                                        ratingCount={5}
                                        onStartRating={rating}
                                        readonly={true}
                                        imageSize={14}
                                        style={{ height: 24, width: 80, marginTop: 7 }}
                                    /> */}
                                    <StarRating
                                        style={{ height: 24, width: 70, marginTop: 7, marginRight: 12 }}
                                        containerStyle={{
                                            width: 70,
                                        }}
                                        starSize={14}
                                        disabled={true}
                                        emptyStar={'ios-star-outline'}
                                        fullStar={'ios-star'}
                                        halfStar={'ios-star-half'}
                                        iconSet={'Ionicons'}
                                        maxStars={5}
                                        rating={rating}
                                        ratingBackgroundColor={"#ff2200"}
                                        fullStarColor={'#F4FC9A'}
                                    />

                                    {/* <Text style={{
                                        backgroundColor: '#ddd', height: 20, width: 36, textAlign: 'center',
                                        fontSize: 14,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'gray',
                                        borderRadius: 12,
                                    }}>5</Text> */}
                                    <View
                                        style={{
                                            height: 19,
                                            width: 30,
                                            marginLeft: 8,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderColor: '#D8D8D8',
                                            borderWidth: 1,
                                            backgroundColor: '#F7f7f7',
                                            borderRadius: 10
                                        }}>
                                        <Text style={{
                                            color: '#707070',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontFamily: 'Quicksand-Medium',
                                            fontSize: 12,
                                        }}>{rating.toFixed(1)}
                                        </Text>
                                    </View>
                                    {/* <RateViewBorder>{rating}</RateViewBorder> */}
                                </View>

                                <Text style={
                                    [defaultStyle.bold_text_12, {
                                        color: '#A3A5AE',
                                        marginTop: 6
                                    }]}>Experience</Text>

                                <View style={{
                                    paddingTop: 8,
                                    flexDirection: 'row',
                                    width: "70%",
                                    flex: 1,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>


                                    <Text style={defaultStyle.regular_text_14}>{year} yr {month} m</Text>

                                    <TouchableOpacity
                                        style={{ marginLeft: 20, }}
                                        onPress={() => {
                                            this.props.navigation.navigate('CoachListing',
                                                { academy_id: this.state.academy_id })

                                            //this.props.navigation.goBack(null);
                                        }}>
                                        <Text style={[defaultStyle.regular_text_10, {
                                            color: '#667DDB',
                                            textAlign: 'right',
                                        }]}>View Other Coaches</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>

                        </View>

                        <View style={{ paddingTop: 16 }}>

                            <Text style={[defaultStyle.bold_text_10,
                            {
                                color: '#A3A5AE', paddingTop: 8,
                                paddingBottom: 6
                            }]}>Certifications</Text>

                            <ReadMoreText
                                limitLines={3}
                                renderFooter={this.renderFooter}
                            >
                                <Text style={defaultStyle.regular_text_14}>
                                    {coachData.about}</Text>

                            </ReadMoreText>

                        </View>

                    </View>
                    {showFeedback ?
                        // <TouchableOpacity
                        //     activeOpacity={.8}
                        //     onPress={() => {
                        //         this.props.navigation.navigate('WriteAcademyFeedback',
                        //             {
                        //                 academy_id: this.state.academy_id,
                        //                 target_id: this.state.coach_id,
                        //                 is_coach: true
                        //             })
                        //     }}>


                        //     <View style={{ flexDirection: 'row', marginBottom: 16, justifyContent: 'center' }}>
                        //         <Text
                        //             style={styles.filled_button}>
                        //             Give Feedback
                        //          </Text>
                        //     </View>

                        // </TouchableOpacity>
                        <View
                            style={{ margin: 12 }}
                        >

                            <SkyFilledButton
                                onPress={() => {
                                    this.props.navigation.navigate('WriteAcademyFeedback',
                                        {
                                            academy_id: this.state.academy_id,
                                            target_id: user_id,
                                            is_coach: true
                                        })
                                }}>

                                Give Feedback</SkyFilledButton></View>
                        : null}

                    {feedback != null && feedback.length > 0 || this.state.is_feedback_loading
                        ?
                        <Card
                            style={{
                                elevation: 2,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                marginTop: 10,
                            }}
                        >

                            {
                                this.state.is_feedback_loading == true ?
                                    <View style={{
                                        padding: 8
                                    }}>
                                        <ActivityIndicator size="small" color="#67BAF5" /></View>
                                    :

                                    <View>

                                        <View
                                            style={{ marginLeft: 12, marginRight: 12, marginTop: 12 }}
                                        >

                                            <View style={{

                                                flexDirection: 'row',
                                                flex: 1,
                                                justifyContent: 'space-between',
                                            }}>
                                                <Text
                                                    style={[defaultStyle.bold_text_14, {
                                                        color: '#707070'
                                                    }]}
                                                >
                                                    Reviews ({this.state.feedback.length})
                            </Text>

                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.setState({
                                                            filter_dialog: true
                                                        })
                                                    }}
                                                >


                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text
                                                            style={defaultStyle.regular_text_12}
                                                        >Sort </Text>
                                                        <Image
                                                            resizeMode="contain"
                                                            style={{ width: 24, height: 15, }}
                                                            source={require('../../images/filter_rating.png')}
                                                        ></Image>

                                                    </View>
                                                </TouchableOpacity>

                                            </View>

                                            <View
                                                style={{ width: '100%', height: 1, backgroundColor: '#DFDFDF', marginTop: 8, marginBottom: 8 }}
                                            ></View>


                                        </View>


                                        <FlatList
                                            onEndReachedThreshold={0.5}
                                            onEndReached={({ distanceFromEnd }) => {
                                                console.log('on end reached ', distanceFromEnd);
                                                let page = this.state.page
                                                page = page + 1
                                                this.state.page = page

                                                console.log('page => ', this.state.page)
                                                let sortType = this.state.sortType
                                                let type = this.state.type
                                                this.getCoachFeedbacks(sortType, type, false)
                                            }}
                                            extraData={feedback}
                                            data={feedback}
                                            renderItem={this._renderRatingItem}
                                        /></View>}


                        </Card> : null}

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
        //borderWidth: 1,
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


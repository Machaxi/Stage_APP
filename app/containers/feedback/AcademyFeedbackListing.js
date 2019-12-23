import React from 'react';
import {
    StyleSheet, View, ActivityIndicator, TouchableOpacity,
    Text, Image, FlatList,

} from 'react-native';
import { Card } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, { defaultStyle } from '../BaseComponent'
import { connect } from 'react-redux';
import { getData } from "../../components/auth";
import { getAcademyFeedbackList } from '../../redux/reducers/AcademyReducer'
import FilterDialog from './../GuestScreen/FilterDialog'
import ReadMoreText from "rn-read-more-text";
import { RateViewFill } from '../../components/Home/RateViewFill';
import StarRating from 'react-native-star-rating';


class AcademyFeedbackListing extends BaseComponent {

    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: 'Academy Feedback',
            headerTitleStyle: defaultStyle.headerStyle,

            headerLeft: (
                <TouchableOpacity
                    onPress={() => {
                        navigation.toggleDrawer();
                    }}
                    style={{padding: 7}}
                    activeOpacity={.8}>
                    <Image
                        source={require('../../images/hamburger.png')}
                        style={{ width: 20, height: 16, marginLeft: 12 }}
                    />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity
                    onPress={() => {
                        navigation.getParam('filter')();
                    }}
                    activeOpacity={.8}
                >
                    <Text
                        style={{
                            marginRight: 12,
                            fontFamily: 'Quicksand-Regular',
                            fontSize: 12,
                            color: '#667DDB'
                        }}
                    >Filter</Text>
                </TouchableOpacity>

            )
        };

    };

    filter = () => {
        this.setState({
            filter_dialog: true
        })
    }

    sort(id, type) {

        this.setState({
            hasMore: true,
            pagination: true
        })

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
            this.getAcademyFeedbacks(id, type)
        }, 100)

        // 
    }

    constructor(props) {
        super(props)
        this.state = {
            feedback: [],
            academy_id: '',
            page: 0,
            sortType: 'createdAt,desc',
            type: '',
            filter_dialog: false,
            clear_feedback_array: false,
            hasMore: true,
            pagination: false
        };

        getData('academy_id', (value) => {

            //console.warn('academy_id', value)
            this.state.academy_id = value

            getData('userInfo', (value) => {

                let user = JSON.parse(value)

                this.state.academy_id = user['academy_id']
                let sortType = this.state.sortType
                let type = this.state.type
                this.getAcademyFeedbacks(sortType, type, false)

            })
        })

        const { navigation } = this.props
        navigation.setParams({
            filter: this.filter,
        })

    }

    getAcademyFeedbacks(sortType, type, showLoading) {


        const { academy_id } = this.state

        console.log('getAcademyFeedbacks => sortType ', sortType + ' type ' + type)
        let page = this.state.page
        let size = 10
        let sort = sortType
        this.setState({
            sortType: sortType,
            type: type

        })

        this.props.getAcademyFeedbackList('', academy_id, page, size, sort, type).then(() => {
            //console.warn('Res=> ' + JSON.stringify(this.props.data.res))
            let status = this.props.data.res.success
            if (status) {
                let feedback = this.props.data.res.data.feedback
                if (feedback.length == 0) {
                    this.setState({
                        hasMore: false
                    })
                }
                console.log('Feedback load =>', feedback.length)
                console.log('Feedback => ' + JSON.stringify(feedback))
                let allfeeback = this.state.feedback

                if (this.state.clear_feedback_array) {
                    this.state.clear_feedback_array = false
                    allfeeback = []
                }

                for (let i = 0; i < feedback.length; i++) {
                    allfeeback.push(feedback[i])
                }

                this.setState({
                    feedback: allfeeback
                })
            }

        }).catch((response) => {
            console.log(response);
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
                        {item.source.name}
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

                {/* <Text style={defaultStyle.regular_text_12}>
                    {item.review}
                </Text> */}
                <ReadMoreText
                    limitLines={2}
                    renderFooter={this.renderFooter}
                >
                    <Text style={
                        [defaultStyle.regular_text_12,
                        {
                            color: '#707070',
                        }]}>{item.review}</Text>
                </ReadMoreText>

            </View>

        </Card>

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


        if (this.props.data.loading && this.state.pagination == false) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        let data = this.state.feedback
        const filter_dialog = this.state.filter_dialog

        return (

            <View style={styles.chartContainer}>

                <FilterDialog
                    touchOutside={(id, type) => {
                        this.sort(id, type, true)
                    }}
                    visible={filter_dialog} />

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
                        onEndReachedThreshold={0.1}
                        onEndReached={({ distanceFromEnd }) => {

                            const hasMore = this.state.hasMore
                            console.log('hasMore', hasMore)
                            if (hasMore) {
                                this.setState({
                                    pagination: true
                                })
                                console.log('on end reached ', distanceFromEnd);
                                let page = this.state.page
                                page = page + 1
                                this.state.page = page

                                console.log('page => ', this.state.page)
                                let sortType = this.state.sortType
                                let type = this.state.type
                                this.getAcademyFeedbacks(sortType, type, false)
                            }
                        }}
                        data={data}
                        renderItem={this._renderItem}
                    />}


            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.AcademyReducer,
    };
};
const mapDispatchToProps = {
    getAcademyFeedbackList
};

export default connect(mapStateToProps, mapDispatchToProps)(AcademyFeedbackListing);


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


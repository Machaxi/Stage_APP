import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput, ImageBackground } from 'react-native';
import { Card, Text, ActivityIndicator } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getData, storeData } from "../../components/auth";
import FilterDialog from './FilterDialog'
import { getAcademyDetail, getAcademyFeedbackList } from '../../redux/reducers/AcademyReducer'
import BaseComponent, { defaultStyle,formattedName } from '../BaseComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import ViewMoreText from 'react-native-view-more-text';
import ReadMore from 'react-native-read-more-text'
import { RateViewFill } from '../../components/Home/RateViewFill';

class AcademyProfile extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            academy: null,
            player_id: '',
            showFeedback: false,
            feedback: [],
            filter_dialog: false,
            spinner: false,
            page: 0,
            sortType: '',
            type: '',
            clear_feedback_array: false
        }
        this.state.id = this.props.navigation.getParam('id', '');
        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            this.state.player_id = userData.user['id']
            console.log(this.state.player_id)
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
    progress(status) {
        this.setState({
            spinner: status
        })
    }
    componentDidMount() {

        this.props.getAcademyDetail(this.state.id).then(() => {
            //console.warn('Res=> ' + JSON.stringify(this.props.data.res))
            let status = this.props.data.res.success
            if (status) {
                let academy = this.props.data.res.data.academy
                this.setState({
                    academy: academy
                })

                let sortType = this.state.sortType
                let type = this.state.type
                this.getAcademyFeedbacks(sortType, type, false)

            }


        }).catch((response) => {
            console.log(response);
        })
    }

    getAcademyFeedbacks(sortType, type, showLoading) {

        console.log('getAcademyFeedbacks => sortType ', sortType + ' type ' + type)
        let academy_id = this.state.id;
        let page = this.state.page
        let size = 10
        let sort = sortType
        this.setState({
            sortType: sortType,
            type: type

        })

        if (showLoading) {
            this.progress(true)
        }
        // getData('header', (value) => {

        // })

        this.props.getAcademyFeedbackList('', academy_id, page, size, sort, type).then(() => {
            //console.warn('Res=> ' + JSON.stringify(this.props.data.res))
            this.progress(false)
            let status = this.props.data.res.success
            if (status) {
                let feedback = this.props.data.res.data.feedback
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
            this.progress(false)
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
                        backgroundColor: '#D6D6D6',
                        height: 19,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 30,
                        textAlign: 'center',
                        fontSize: 12,
                        color: '#707070',
                        borderRadius: 12,
                    }}>{item.rating}</Text> */}
                    <RateViewFill>{item.rating}</RateViewFill>
                </View>

            </View>

            <ReadMore
                numberOfLines={2}
                renderTruncatedFooter={this._renderTruncatedFooter}
                renderRevealedFooter={this._renderRevealedFooter}
                onReady={this._handleTextReady}>
                <Text style={{
                    fontSize: 12,
                    color: '#707070',
                }}>{item.review}</Text>
            </ReadMore>
        </View>



    );
    _renderTruncatedFooter = (handlePress) => {
        return (
            <View style={{
                justifyContent: 'flex-end',
                flex: 1,
                alignItems: 'flex-end'
            }}>

                <Text style={[defaultStyle.regular_text_10, {
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    marginTop: 0, color: '#667DDB'
                }]}
                    onPress={handlePress}>
                    Show more
          </Text>
            </View>

        );
    }

    _renderRevealedFooter = (handlePress) => {
        return (
            <View style={{
                justifyContent: 'flex-end',
                flex: 1,
                alignItems: 'flex-end'
            }}>
                <Text style={[defaultStyle.regular_text_10, {
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    marginTop: 0,
                    color: '#667DDB'
                }]}
                    onPress={handlePress}>
                    Show less
          </Text>
            </View>
        );
    }

    _handleTextReady = () => {
        // ...
    }

    _renderPlayerItem(top_player) {

        console.log('top_player' + JSON.stringify(top_player), +" id " + top_player.id)
        return (

            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('OtherPlayerDeatils', {
                        academy_id: this.state.id,
                        player_id: top_player.id
                    })
                }}
                activeOpacity={.8}
            >

                <View style={{ overflow: 'hidden', height: 190, width: 120, paddingRight: 4 }}>

                    <ImageBackground style={{ height: 190, width: '100%' }}
                        source={require('../../images/batch_card.png')}
                    >
                        <Text style={{ justifyContent: 'center', textAlign: 'center', color: 'white', fontSize: 8, paddingTop: 6 }}>Score</Text>
                        <Text style={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 13 }}>{top_player.score}</Text>

                        <View style={{ flexDirection: 'row', paddingTop: 13, marginLeft: 2, marginRight: 2 }}>

                            <Text
                                style={{
                                    width: 26,
                                    height: 12,
                                    color: 'white',
                                    marginRight: 4,
                                    marginTop: 16,
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                    backgroundColor: 'red',
                                    borderRadius: 4,
                                    fontSize: 8,
                                    paddingTop: 1
                                }}
                            >{top_player.player_category}</Text>
                            <Image
                                style={{
                                    height: 80, width: 50,
                                    justifyContent: 'center', alignSelf: 'center'
                                }}
                                source={require('../../images/player_small.png')}></Image>

                            <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={{
                                    color: 'white',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                    fontSize: 8,
                                    marginLeft: 4,
                                    marginTop: 16,
                                }}
                            >{top_player.player_level.split(" ").join("\n")}</Text>
                        </View>

                        <View style={{
                            position: 'absolute',

                            marginTop: 116,
                            width: "100%", height: 20, backgroundColor: 'white'
                        }}>

                            <Text style={{
                                color: '#404040',
                                fontWeight: 16,
                                fontWeight: '500',
                                textAlign: 'center'
                            }}>{formattedName(top_player.name)}</Text>
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>

                            <ImageBackground
                                style={{
                                    height: 38, width: 25, justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                source={require('../../images/batch_pink.png')}>

                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: '#485FA0', height: 6, width: '120%'
                                }}>
                                    <Image style={{ height: 7, width: 12, marginLeft: -12 }}
                                        source={require('../../images/left_batch_arrow.png')}></Image>

                                    <Text style={{ fontSize: 5, color: 'white', textAlign: 'center' }}>{top_player.badge}</Text>
                                    <Image style={{ height: 7, width: 12, marginRight: -12 }}
                                        source={require('../../images/right_batch_arrow.png')}></Image>

                                </View>
                            </ImageBackground>



                        </View>

                    </ImageBackground>

                </View>
            </TouchableOpacity>

        )

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
            this.getAcademyFeedbacks(id, type)
        }, 100)

        // 
    }

    render() {

        let filter_dialog = this.state.filter_dialog
        let showFeedback = this.state.showFeedback

        if (this.state.academy == null) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        let feedback = this.state.feedback
        const academy = this.state.academy
        const academy_reviews = this.state.academy.academy_reviews
        return (

            <ScrollView style={styles.chartContainer}>

                <View>
                    <Spinner
                        visible={this.state.spinner}
                        textStyle={defaultStyle.spinnerTextStyle}
                    />

                    <FilterDialog
                        touchOutside={(id, type) => {
                            this.sort(id, type, true)
                        }}
                        visible={filter_dialog} />

                    <Card
                        style={{
                            elevation: 2,

                        }}>
                        <View style={{ marginLeft: 8, marginRight: 8, marginTop: 4 }}>

                            <Image style={{ height: 130, width: "100%", }}
                                source={{ uri: academy.cover_pic }}
                            >

                            </Image>

                            <Text style={{
                                fontFamily: 'Quicksand-Medium',
                                paddingTop: 12,
                                fontSize: 18, color: 'gray'
                            }}> {academy.name}</Text>

                            <View style={{ paddingTop: 8, flexDirection: 'row', flex: 1 }}>

                                <Rating
                                    type='custom'
                                    ratingColor='#F4FC9A'
                                    ratingBackgroundColor='#D7D7D7'
                                    ratingCount={5}
                                    imageSize={14}
                                    readonly={true}
                                    startingValue={academy.ratings}
                                    style={{ height: 30, width: 80 }}
                                />

                                {/* <Text style={{
                                    backgroundColor: '#D6D6D6', height: 19, width: 30, textAlign: 'center',
                                    fontSize: 12,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#707070',
                                    borderRadius: 12,
                                }}>{academy.ratings.toFixed(1)}</Text> */}
                                <RateViewFill>{academy.ratings}</RateViewFill>
                            </View>


                            <View style={{ flexDirection: 'row', marginBottom: 16 }}>

                                <Text
                                    style={styles.rounded_button}
                                >
                                    View Batches
                                </Text>
                                <Text
                                    style={styles.rounded_button}
                                >
                                    Book Court
                                </Text>

                            </View>
                        </View>
                    </Card>

                    <Card
                        style={styles.card_style}>


                        <View style={{ padding: 12 }}>

                            <Text style={defaultStyle.bold_text_10}>Founder Corner</Text>
                            <View style={{ marginTop: 8, marginBottom: 8, height: 1, width: '100%', backgroundColor: '#dfdfdf' }}></View>
                            <Text style={{ fontSize: 14, color: '#404040' }}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. </Text>
                        </View>

                    </Card>

                    <Card
                        style={styles.card_style}>


                        <View style={{ padding: 12 }}>

                            <Text style={defaultStyle.bold_text_10}>Offering</Text>
                            <View style={{ marginTop: 4, marginBottom: 4, height: 1, width: '100%', backgroundColor: '#dfdfdf' }}></View>
                            <Text style={{ fontSize: 14, color: '#404040' }}>{academy.offering} </Text>
                        </View>

                    </Card>

                    <Card
                        style={styles.card_style}>


                        <View style={{ padding: 12 }}>

                            <Text style={defaultStyle.bold_text_10}>Address</Text>
                            <View style={{ marginTop: 4, marginBottom: 4, height: 1, width: '100%', backgroundColor: '#dfdfdf' }}></View>
                            <Text style={{ fontSize: 14, color: '#404040' }}>{academy.locality} </Text>
                        </View>

                    </Card>

                    <Card
                        style={styles.card_style}>

                        <View style={{ padding: 12 }}>

                            <Text style={defaultStyle.bold_text_10}>Facilities</Text>
                            <View style={{ marginTop: 4, marginBottom: 4, height: 1, width: '100%', backgroundColor: '#dfdfdf' }}></View>
                            <Text style={{ fontSize: 14, color: '#404040' }}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. </Text>
                        </View>

                    </Card>

                    <Card
                        style={styles.card_style}>

                        <View style={{ padding: 12 }}>

                            <Text style={defaultStyle.bold_text_10}>Best Player (Badminton)</Text>
                            <View style={{ marginTop: 4, marginBottom: 4, height: 1, width: '100%', backgroundColor: '#dfdfdf' }}></View>

                            <View style={{
                                marginTop: 8,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>

                                {/* <Image style={{ height: 170, width: 130, alignContent: 'center', justifyContent: 'center', textAlign: 'center' }}
                                    source={require('../../images/best_player_temp.png')}
                                >
                                </Image> */}
                                {this._renderPlayerItem(academy.top_player)}


                            </View>
                        </View>

                    </Card>

                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={() => {
                            this.props.navigation.navigate('PlayersListing', { id: academy.id })
                        }}
                    >
                        <Card
                            style={styles.card_style}>

                            <View style={{ padding: 16, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, color: '#404040', width: '90%' }}>View Other Players</Text>
                                <Image
                                    style={{ width: 19, height: 13, }}
                                    source={require('../../images/path.png')}
                                ></Image>
                            </View>

                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={() => {
                            this.props.navigation.navigate('CoachListing', { academy_id: this.state.id })
                        }}
                    >

                        <Card
                            style={styles.card_style}>

                            <View style={{ padding: 16, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, color: '#404040', width: '90%' }}>View Coaches</Text>
                                <Image
                                    style={{ width: 19, height: 13, }}
                                    source={require('../../images/path.png')}
                                ></Image>
                            </View>

                        </Card>
                    </TouchableOpacity>


                    {showFeedback ?
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => {
                                this.props.navigation.navigate('WriteAcademyFeedback',

                                    { is_coach: false, academy_id: this.state.id, target_id: this.state.id })
                            }}>

                            <View

                                style={{ flexDirection: 'row', marginBottom: 16, justifyContent: 'center' }}>

                                <Text
                                    style={styles.filled_button}
                                >
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
                                        Reviews ({academy_reviews.length})
                            </Text>

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                filter_dialog: true
                                            })
                                        }} >

                                        <View style={{ flexDirection: 'row' }}>
                                            <Text
                                                style={{ color: '#707070', fontSize: 12, marginRight: 2 }}
                                            >Latest </Text>
                                            <Image
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
                                    this.getAcademyFeedbacks(sortType, type, false)
                                }}
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
    getAcademyDetail, getAcademyFeedbackList
};

export default connect(mapStateToProps, mapDispatchToProps)(AcademyProfile);


const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },
    rounded_button: {
        width: '48%',
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        fontFamily: 'Quicksand-Medium',
        marginLeft: 4,
        marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',
        color: 'white', textAlign: 'center'
    },
    filled_button: {
        width: '90%',
        padding: 12,
        borderRadius: 22,
        marginLeft: 4,
        marginRight: 4,
        marginTop: 16,
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


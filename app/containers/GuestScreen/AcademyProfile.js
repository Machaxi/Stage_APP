import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Platform, Image, FlatList, Text, TextInput, ImageBackground } from 'react-native';
import { Card, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getData, storeData } from "../../components/auth";
import FilterDialog from './FilterDialog'
import { getAcademyDetail, getAcademyFeedbackList } from '../../redux/reducers/AcademyReducer'
import BaseComponent, { defaultStyle, formattedName, getFormattedBadge } from '../BaseComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import Swiper from 'react-native-swiper'
import Events from '../../router/events'
import { RateViewFill } from '../../components/Home/RateViewFill';
import { SkyFilledButton } from '../../components/Home/SkyFilledButton'
import ReadMoreText from "rn-read-more-text";
import StarRating from 'react-native-star-rating';

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
            sortType: 'createdAt,desc',
            type: '',
            clear_feedback_array: false,
            feedback_count: 0
        }
        this.state.id = this.props.navigation.getParam('id', '');

        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            this.state.player_id = userData.user['id']
            console.log(this.state.player_id)
            // if (userData.user['user_type'] == 'PLAYER' || userData.user['user_type'] == 'FAMILY') {
            //     this.setState({
            //         showFeedback: true
            //     })
            // } else {
            //     this.setState({
            //         showFeedback: false
            //     })
            // }
            this.setState({
                showFeedback: true
            })
        });

        this.refreshEvent = Events.subscribe('RefreshFeedback', () => {
            this.state.page = 0
            this.state.feedback = []
            let sortType = this.state.sortType
            let type = this.state.type
            this.getAcademyFeedbacks(sortType, type, false)
        });


    }
    progress(status) {
        this.setState({
            spinner: status
        })
    }
    componentDidMount() {

        this.props.getAcademyDetail(this.state.id).then(() => {
            console.warn('getAcademyDetail=> ' + JSON.stringify(this.props.data.res))
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
                this.state.feedback_count = this.props.data.res.data.count
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
                    style={{
                        color: '#707070',
                        fontSize: 14, flex: 1,
                        alignItems: 'center',
                        fontFamily: 'Quicksand-Medium',
                    }}
                >
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
                        imageSize={12}
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

                    <ImageBackground
                        resizeMode="contain"
                        style={{ height: 190, width: '100%' }}
                        source={require('../../images/batch_card.png')}
                    >
                        <Text style={{
                            justifyContent: 'center',
                            textAlign: 'center',
                            fontFamily: 'Quicksand-Medium',
                            color: 'white',
                            fontSize: 8, paddingTop: 6
                        }}>Score</Text>
                        <Text style={{
                            justifyContent: 'center', textAlign: 'center',
                            fontFamily: 'Quicksand-Bold', color: 'white', fontSize: 13
                        }}>{top_player.score == 0 ? "-" : top_player.score}</Text>

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
                                    fontSize: 6,
                                    paddingTop: 1,
                                    fontFamily: 'Quicksand-Bold',

                                }}
                            >{top_player.player_category}</Text>
                            <Image
                                resizeMode="contain"
                                style={{
                                    height: 80, width: 50,
                                    justifyContent: 'center', alignSelf: 'center'
                                }}
                                source={{ uri: top_player.profile_pic }} />

                            <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={{
                                    color: 'white',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                    fontSize: 6,
                                    marginLeft: 4,
                                    marginTop: 16,
                                    fontFamily: 'Quicksand-Medium',
                                }}
                            >{top_player.player_level.split(" ").join("\n")}</Text>
                        </View>

                        <View style={{
                            position: 'absolute',
                            marginTop: 116,
                            width: "100%", height: 24, backgroundColor: 'white'
                        }}>

                            <Text style={{
                                color: '#404040',
                                fontSize: 16,
                                textAlign: 'center',
                                fontFamily: 'Quicksand-Medium',
                            }}>{formattedName(top_player.name)}</Text>
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>

                            <ImageBackground
                                style={{
                                    height: 38, width: 57, justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                source={require('../../images/single_shield.png')}>


                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }}>
                                    <Text style={[defaultStyle.bebas_text_blue_10, { fontSize: 5, color: 'white', }]}>
                                        {top_player.badge == undefined ? '' : getFormattedBadge(top_player.badge)}
                                    </Text>

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
        let gallery = this.state.academy.gallery
        let about = academy.about
        let user_id = academy.user_id
        let facilities = academy.facilities
        const book_and_play_enabled = academy.book_and_play_enabled
        const coaching_enabled = academy.coaching_enabled

        const feedback_count = this.state.feedback_count

        return (
          <ScrollView style={styles.chartContainer}>
            <View>
              <Spinner
                visible={this.state.spinner}
                textStyle={defaultStyle.spinnerTextStyle}
              />

              <FilterDialog
                touchOutside={(id, type) => {
                  this.sort(id, type, true);
                }}
                visible={filter_dialog}
              />

              <Card
                style={{
                  elevation: 2,
                }}
              >
                <View style={{}}>
                  {gallery.length == 0 ? (
                    <Image
                      style={{ height: 150, width: "100%" }}
                      source={{ uri: academy.cover_pic }}
                    />
                  ) : (
                    <View
                      style={{
                        position: "relative",
                      }}
                    >
                      <Swiper
                        containerStyle={
                          Platform.OS === "ios" ? styles.wrapper : null
                        }
                        style={
                          Platform.OS === "ios" ? null : styles.wrapper
                        }
                        ref={(ref) => (this.swiper = ref)}
                        showsPagination={true}
                        activeDotColor="white"
                        paginationStyle={{
                          bottom: 0,
                          left: 0,
                          top: 120,
                          right: 0,
                        }}
                        //onIndexChanged={this.updateState.bind(this)}
                        loop={false}
                      >
                        {gallery.map((item, index) => {
                          return (
                            <Image
                              key={index}
                              source={{ uri: item.image }}
                              style={styles.sliderImage}
                            />
                          );
                        })}
                      </Swiper>

                      {/* <View style={{

                                        alignItems: 'flex-end',
                                        justifyContent: 'flex-end',
                                        alignSelf: 'flex-end',
                                        position: 'absolute',

                                        flex: 1,
                                        marginTop: 110,
                                        marginBottom: 8,

                                    }}>
                                        <Text style={[defaultStyle.bold_text_12, {
                                            color: '#FFFFFF',
                                            flex: 1,
                                            backgroundColor: '#A6A6A6',
                                            borderRadius: 8,
                                            marginRight: 8,
                                            justifyContent: 'flex-end',
                                            alignItems: 'flex-end',
                                            alignSelf: 'flex-end',
                                            alignContent: 'flex-end',
                                            padding: 8
                                        }]}>+{gallery.length}</Text>
                                    </View> */}
                    </View>
                  )}

                  <View
                    style={{
                      marginLeft: 8,
                      marginRight: 8,
                      marginTop: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Quicksand-Medium",
                        paddingTop: 12,
                        fontSize: 18,
                        color: "gray",
                      }}
                    >
                      {" "}
                      {academy.name}
                    </Text>

                    <View
                      style={{
                        alignItems: "center",
                        paddingTop: 8,
                        paddingBottom: 12,
                        marginLeft: 6,
                        flexDirection: "row",
                        flex: 1,
                      }}
                    >
                      {/* <Rating
                                        type='custom'
                                        ratingColor='#F4FC9A'
                                        ratingBackgroundColor='#D7D7D7'
                                        ratingCount={5}
                                        imageSize={12}
                                        readonly={true}
                                        startingValue={academy.ratings}
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
                          marginRight: 6,
                        }}
                        starSize={14}
                        disabled={true}
                        emptyStar={require("../../images/ic_empty_star.png")}
                        fullStar={require("../../images/ic_star.png")}
                        halfStar={require("../../images/ic_half_star.png")}
                        iconSet={"Ionicons"}
                        maxStars={5}
                        rating={academy.ratings}
                        ratingBackgroundColor={"#ff2200"}
                        fullStarColor={"#F4FC9A"}
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

                    <View
                      style={{ flexDirection: "row", marginBottom: 16 }}
                    >
                      {coaching_enabled ? (
                        <View style={{flexDirection:"row", flex:1, }}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={[defaultStyle.rounded_button, {}]}
                          onPress={() => {
                            if (coaching_enabled) {
                              this.props.navigation.navigate(
                                "AcademyBatch",
                                { academy_id: this.state.id, academy: this.state.academy }
                              );
                            }
                          }}
                        >
                          <Text
                            style={[
                              defaultStyle.bold_text_14,
                              { color: "white" },
                            ]}
                          >
                            View Batches
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={[defaultStyle.rounded_button, {display:'none'}]}
                          onPress={() => {
                            if (coaching_enabled) {
                              this.props.navigation.navigate(
                                "AcademyBatch",
                                { academy_id: this.state.id, academy: this.state.academy }
                              );
                            }
                          }}
                        >
                          <Text
                            style={[
                              defaultStyle.bold_text_14,
                              { color: "white" },
                            ]}
                          >
                            Buy Membership
                          </Text>
                        </TouchableOpacity>
                        </View>
                      ) : null}

                      {book_and_play_enabled ? (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={[defaultStyle.rounded_button, {}]}
                          onPress={() => {
                            if (book_and_play_enabled) {
                              this.props.navigation.navigate(
                                "ChooseTimeDate",
                                {
                                  id: this.state.id,
                                  name: academy.name,
                                }
                              );
                            }
                          }}
                        >
                          <Text
                            style={[
                              defaultStyle.bold_text_14,
                              { color: "white" },
                            ]}
                          >
                            Book Court
                          </Text>
                        </TouchableOpacity>
                      ) : null}

                      {/* <Text
                                    style={styles.rounded_button}
                                >
                                    Book Court
                                </Text> */}
                    </View>
                  </View>
                </View>
              </Card>

              <Card style={styles.card_style}>
                <View style={{ padding: 12 }}>
                  <Text style={defaultStyle.bold_text_10}>
                    About Society
                  </Text>
                  <View
                    style={{
                      marginTop: 8,
                      marginBottom: 8,
                      height: 1,
                      width: "100%",
                      backgroundColor: "#dfdfdf",
                    }}
                  />

                  <ReadMoreText
                    limitLines={3}
                    renderFooter={this.renderFooter}
                  >
                    <Text style={defaultStyle.regular_text_14}>
                      {about}
                    </Text>
                  </ReadMoreText>
                </View>
              </Card>

              <Card style={styles.card_style}>
                <View style={{ padding: 12 }}>
                  <Text style={defaultStyle.bold_text_10}>
                    Offering
                  </Text>
                  <View
                    style={{
                      marginTop: 4,
                      marginBottom: 4,
                      height: 1,
                      width: "100%",
                      backgroundColor: "#dfdfdf",
                    }}
                  />
                  <Text style={defaultStyle.regular_text_14}>
                    {academy.offering}{" "}
                  </Text>
                </View>
              </Card>

              <Card style={styles.card_style}>
                <View style={{ padding: 12 }}>
                  <Text style={defaultStyle.bold_text_10}>Address</Text>
                  <View
                    style={{
                      marginTop: 4,
                      marginBottom: 4,
                      height: 1,
                      width: "100%",
                      backgroundColor: "#dfdfdf",
                    }}
                  />
                  <Text style={defaultStyle.regular_text_14}>
                    {academy.locality}{" "}
                  </Text>
                </View>
              </Card>

              {facilities != null ? (
                <Card style={styles.card_style}>
                  <View style={{ padding: 12 }}>
                    <Text style={defaultStyle.bold_text_10}>
                      Facilities
                    </Text>
                    <View
                      style={{
                        marginTop: 4,
                        marginBottom: 4,
                        height: 1,
                        width: "100%",
                        backgroundColor: "#dfdfdf",
                      }}
                    />
                    <Text style={defaultStyle.regular_text_14}>
                      {facilities}
                    </Text>
                  </View>
                </Card>
              ) : null}

              {academy.top_player != undefined ? (
                <Card style={styles.card_style}>
                  <View style={{ padding: 12 }}>
                    <Text style={defaultStyle.bold_text_10}>
                      Highest Ranked Athlete
                    </Text>
                    <View
                      style={{
                        marginTop: 6,
                        marginBottom: 6,
                        height: 1,
                        width: "100%",
                        backgroundColor: "#dfdfdf",
                      }}
                    />

                    <View
                      style={{
                        marginTop: 8,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {this._renderPlayerItem(academy.top_player)}
                    </View>
                  </View>
                </Card>
              ) : null}

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.props.navigation.navigate("ViewPlayersListing", {
                    id: academy.id,
                  });
                }}
              >
                <Card style={styles.card_style}>
                  <View style={{ padding: 16, flexDirection: "row" }}>
                    <Text
                      style={[
                        defaultStyle.regular_text_14,
                        { width: "90%" },
                      ]}
                    >
                      View Players
                    </Text>
                    <Image
                      resizeMode="contain"
                      style={{ width: 19, height: 13 }}
                      source={require("../../images/path.png")}
                    />
                  </View>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.props.navigation.navigate("CoachListing", {
                    academy_id: this.state.id,
                  });
                }}
              >
                <Card style={styles.card_style}>
                  <View style={{ padding: 16, flexDirection: "row" }}>
                    <Text
                      style={[
                        defaultStyle.regular_text_14,
                        { width: "90%" },
                      ]}
                    >
                      View Coaches
                    </Text>
                    <Image
                      resizeMode="contain"
                      style={{ width: 19, height: 13 }}
                      source={require("../../images/path.png")}
                    />
                  </View>
                </Card>
              </TouchableOpacity>

              {showFeedback ? (
                // <TouchableOpacity
                //     activeOpacity={.8}
                //     onPress={() => {
                //         this.props.navigation.navigate('WriteAcademyFeedback',

                //             { is_coach: false, academy_id: this.state.id, target_id: this.state.id })
                //     }}>

                //     <View

                //         style={{ flexDirection: 'row', marginBottom: 16, justifyContent: 'center' }}>

                //         <Text
                //             style={styles.filled_button}
                //         >
                //             Give Feedback
                //     </Text>

                //     </View>
                // </TouchableOpacity>
                <View style={{ margin: 12 }}>
                  <SkyFilledButton
                    onPress={() => {
                      this.props.navigation.navigate(
                        "WriteAcademyFeedback",

                        {
                          is_coach: false,
                          academy_id: this.state.id,
                          target_id: user_id,
                        }
                      );
                    }}
                  >
                    Give Feedback
                  </SkyFilledButton>
                </View>
              ) : null}

              {feedback.length != 0 ? (
                <Card
                  style={{
                    elevation: 2,
                    backgroundColor: "white",
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      marginLeft: 12,
                      marginRight: 12,
                      marginTop: 12,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={[
                          defaultStyle.bold_text_14,
                          {
                            color: "#707070",
                          },
                        ]}
                      >
                        Reviews ({feedback_count})
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            filter_dialog: true,
                          });
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={[
                              defaultStyle.bold_text_12,
                              {
                                color: "#707070",
                                fontSize: 12,
                                marginRight: 2,
                              },
                            ]}
                          >
                            Sort
                          </Text>
                          <Image
                            style={{ width: 24, height: 15 }}
                            source={require("../../images/filter_rating.png")}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        height: 1,
                        backgroundColor: "#DFDFDF",
                        marginTop: 8,
                        marginBottom: 8,
                      }}
                    />
                  </View>

                  <FlatList
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => {
                      console.log("on end reached ", distanceFromEnd);
                      let page = this.state.page;
                      page = page + 1;
                      this.state.page = page;

                      console.log("page => ", this.state.page);
                      let sortType = this.state.sortType;
                      let type = this.state.type;
                      this.getAcademyFeedbacks(sortType, type, false);
                    }}
                    extraData={feedback}
                    data={feedback}
                    renderItem={this._renderRatingItem}
                  />
                </Card>
              ) : null}
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
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 150,
        backgroundColor: 'white'
    },
    sliderImage: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        resizeMode: 'stretch',
        backgroundColor: 'white'
    },
    rounded_button: {
        width: '48%',
        padding: 10,
        borderRadius: 20,
        //borderWidth: 1,
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


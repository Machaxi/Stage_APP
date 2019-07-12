import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput, ImageBackground } from 'react-native';
import { Card, Text, ActivityIndicator } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getData, storeData } from "../../components/auth";

import { getAcademyDetail } from '../../redux/reducers/AcademyReducer'
import BaseComponent from '../BaseComponent';

class AcademyProfile extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            academy: null,
            player_id: '',
            showFeedback: false
        }
        this.state.id = this.props.navigation.getParam('id', '');
        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            this.state.player_id = userData.user['id']
            console.warn(this.state.player_id)
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

    componentDidMount() {

        this.props.getAcademyDetail(this.state.id).then(() => {
            //console.warn('Res=> ' + JSON.stringify(this.props.data.res))
            let status = this.props.data.res.success
            if (status) {
                let academy = this.props.data.res.data.academy
                this.setState({
                    academy: academy
                })
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
                    {item.name}
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
                        startingValue={item.ratings}
                        style={{ height: 30, width: 80 }}
                    />

                    <Text style={{
                        backgroundColor: '#D6D6D6', height: 19,
                        width: 30,
                        textAlign: 'center',
                        fontSize: 12,
                        paddingTop: 2,
                        color: '#707070',
                        borderRadius: 12,
                    }}>{item.ratings}</Text>

                </View>

            </View>

            <Text style={{
                fontSize: 12,
                color: '#707070',
            }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>

        </View>



    );


    _renderPlayerItem(top_player) {

        return (

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
                        }}>{top_player.name}</Text>
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

            </View>)

    }


    render() {

        let showFeedback = this.state.showFeedback

        if (this.props.data.loading || this.state.academy == null) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }


        const academy = this.state.academy
        const academy_reviews = this.state.academy.academy_reviews
        return (

            <ScrollView style={styles.chartContainer}>

                <View>

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

                                <Text style={{
                                    backgroundColor: '#D6D6D6', height: 19, width: 30, textAlign: 'center',
                                    fontSize: 12,
                                    paddingTop: 2,
                                    color: '#707070',
                                    borderRadius: 12,
                                }}>{academy.ratings}</Text>

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

                            <Text style={{ fontSize: 10, color: '#404040' }}>Founder Corner</Text>
                            <View style={{ marginTop: 8, marginBottom: 8, height: 1, width: '100%', backgroundColor: '#dfdfdf' }}></View>
                            <Text style={{ fontSize: 14, color: '#404040' }}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. </Text>
                        </View>

                    </Card>

                    <Card
                        style={styles.card_style}>


                        <View style={{ padding: 12 }}>

                            <Text style={{ fontSize: 10, color: '#404040' }}>Offering</Text>
                            <View style={{ marginTop: 4, marginBottom: 4, height: 1, width: '100%', backgroundColor: '#dfdfdf' }}></View>
                            <Text style={{ fontSize: 14, color: '#404040' }}>{academy.offering} </Text>
                        </View>

                    </Card>

                    <Card
                        style={styles.card_style}>


                        <View style={{ padding: 12 }}>

                            <Text style={{ fontSize: 10, color: '#404040' }}>Address</Text>
                            <View style={{ marginTop: 4, marginBottom: 4, height: 1, width: '100%', backgroundColor: '#dfdfdf' }}></View>
                            <Text style={{ fontSize: 14, color: '#404040' }}>{academy.locality} </Text>
                        </View>

                    </Card>

                    <Card
                        style={styles.card_style}>

                        <View style={{ padding: 12 }}>

                            <Text style={{ fontSize: 10, color: '#404040' }}>Facilities</Text>
                            <View style={{ marginTop: 4, marginBottom: 4, height: 1, width: '100%', backgroundColor: '#dfdfdf' }}></View>
                            <Text style={{ fontSize: 14, color: '#404040' }}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. </Text>
                        </View>

                    </Card>

                    <Card
                        style={styles.card_style}>

                        <View style={{ padding: 12 }}>

                            <Text style={{ fontSize: 10, color: '#404040' }}>Best Player (Badminton)</Text>
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
                            extraData={academy_reviews}
                            data={academy_reviews}
                            renderItem={this._renderRatingItem}
                        />

                    </Card>

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
    getAcademyDetail
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


import React from 'react';
import { StyleSheet, View, ActivityIndicator, Image, FlatList, TextInput, ImageBackground, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Card, Text, } from 'react-native-paper';
import { connect } from 'react-redux';

import { createChallenge, getOpponentList, getChallengeDashboard } from '../../redux/reducers/ChallengeReducer'
import { getData } from "../../components/auth";
import BaseComponent, { defaultStyle, EVENT_REFRESH_CHALLENGE, getFormattedBadge, getFormattedCategory, formattedName } from '../BaseComponent'
import Events from '../../router/events';

class OpponentList extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            opponentData: [],
            id: '',
            filter: [],
            query: '',
            modalVisible: false,
            academy_id: null,
            player_id: null,
            selectedOpponentData: null,
            playerData: null,
            originalOpponentData: null
        }
        this.state.id = this.props.navigation.getParam('id', '');
    }

    componentDidMount() {
        this.getPlayerData();
        getData('userInfo', (value) => {
            userData = JSON.parse(value);
            this.state.academy_id = userData['academy_id'];
            this.state.player_id = userData['player_id'];
            getData('header', (value) => {
                this.props.getOpponentList(value, userData['academy_id'], 0, 20).then(() => {
                    let data = this.props.data.data
                    console.log(' getOpponentList ' + JSON.stringify(data));

                    // console.log('data.data.dashboard', data.data.dashboard);
                    // console.log('data.data.challenges', data.data.dashboard.challenges)

                    let success = data.success
                    if (success) {

                        console.log(' getChallengeDashboardsds ' + JSON.stringify(data.data.dashboard));

                        this.setState({
                            opponentData: data.data.players,
                            originalOpponentData: data.data.players
                        })
                    }

                }).catch((response) => {
                    console.log(response);
                })
            })
        })

    }

    getPlayerData() {
        //console.log('heyyyyyyyyyyyyyyy,=======', global.opponentPlayerDetails);
        if (global.opponentPlayerDetails != undefined && global.opponentPlayerDetails != null) {
            //console.log('yipeeeeeeeeeeeeeeeeeee');
            //this.state.selectedOpponentData = global.opponentPlayerDetails;
            this.setState({
                selectedOpponentData: global.opponentPlayerDetails
            })
            global.opponentPlayerDetails = null;
            this.setModalVisible(true)
        }
        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            let player_id = global.SELECTED_PLAYER_ID
            let academy_id = userData['academy_id'];
            getData('header', (value) => {
                this.props.getChallengeDashboard(value, academy_id, player_id).then(() => {
                    let data = this.props.data.data
                    let success = data.success
                    if (success) {
                        this.setState({
                            playerData: data.data.dashboard.player,
                        })
                    }

                }).catch((response) => {
                    console.log(response);
                })
            })
        });
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    find(query) {
        const { opponentData } = this.state;
        console.warn('here =>', opponentData)

        if (query === '') {
            return this.state.originalOpponentData;
        }
        const regex = new RegExp(`${query.trim()}`, 'i');
        return opponentData.filter(item => item.name.search(regex) >= 0);
    }

    saveData() {
        let postData = {};
        console.log('this.state.academy_id11', this.state.academy_id);
        postData['academy_id'] = this.state.academy_id;
        postData['challenge_by_id'] = this.state.player_id;

        postData['opponent_id'] = this.state.selectedOpponentData.id;
        let data = {}
        data['data'] = postData

        console.log('postData=====', data);

        getData('header', (value) => {
            this.props.createChallenge(value, data).then(() => {
                let data = this.props.data.data
                console.log('createChallenge========= ' + JSON.stringify(data));

                let success = data.success
                if (success) {

                    this.setModalVisible(false);
                    Events.publish(EVENT_REFRESH_CHALLENGE);
                    this.props.navigation.navigate('ChallengeHome');
                }

            }).catch((response) => {
                console.log(response);
            })
        })
    }

    listHeader() {
        return (
            <View style={styles.searchOuter}>
                <Card style={styles.searchCard}>
                    <TextInput style={styles.searchBox} placeholder="Search" onChangeText={text => {
                        this.state.query = text
                        const data = this.find(this.state.query);
                        this.state.opponentData = data;
                        this.setState({
                            opponentData: data
                        })
                    }}></TextInput>
                </Card>
                {/* <Text style={styles.filterLabel} >Filter</Text> */}
            </View>
        )
    }

    createChallengeModal() {
        return (
            <ScrollView style={{ backgroundColor: '#F7F7F7' }}>
                <View>
                    <Modal animationType="none" transparent={true} visible={this.state.modalVisible}>
                        <View style={styles.modalOuter}>
                            <View style={styles.modalBox}>
                                <View style={styles.modalHeadingOuter}>
                                    <Text></Text>
                                    <Text style={[defaultStyle.bold_text_14, styles.modalHeadingText]}>Create Challenge </Text>

                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        onPress={() => { this.setModalVisible(false); }}>
                                        <Image style={styles.closeImg} source={require('../../images/ic_close.png')} />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.playerCardOuter}>
                                    <View style={styles.modalPlayerCard}>
                                        <TouchableOpacity>
                                            <ImageBackground resizeMode='contain' style={styles.playerBackImage}
                                                source={require('../../images/batch_card.png')}
                                            >
                                                <Text style={styles.playerScoreLabel}>Score</Text>
                                                <Text style={styles.playerScore}>{this.state.playerData.score}</Text>

                                                <View style={styles.middleBox}>
                                                    <Text style={styles.playerCategory}>{getFormattedCategory(this.state.playerData.player_category)}</Text>
                                                    <Image resizeMode="contain" style={styles.playerImage} source={{ uri: this.state.playerData.profile_pic }}></Image>
                                                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.playerLevel}>{this.state.playerData.player_level.split(" ").join("\n")}</Text>
                                                </View>

                                                <View style={styles.playerNameOuter}>
                                                    <Text style={styles.playerName}>{formattedName(this.state.playerData.name)}</Text>
                                                </View>

                                                <View style={styles.badgeOuter}>
                                                    <ImageBackground style={styles.badgeBackImage} source={require('../../images/single_shield.png')}>
                                                        <View style={styles.badgeInner}>
                                                            {/* <Image style={styles.badgeLeftArrow} source={require('../../images/left_batch_arrow.png')}></Image> */}
                                                            <Text style={[defaultStyle.bebas_text_blue_10, styles.badgeValue]}>{this.state.playerData.badge == undefined ? '' : getFormattedBadge(this.state.playerData.badge)}</Text>
                                                            {/* <Image style={styles.badgeRightArrow} source={require('../../images/right_batch_arrow.png')}></Image> */}
                                                        </View>
                                                    </ImageBackground>
                                                </View>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.versusOuter}>
                                        <Text style={styles.versusText}>VS</Text>
                                    </View>

                                    {
                                        this.state.selectedOpponentData != null ?
                                            <View style={styles.modalPlayerCard}>
                                                <TouchableOpacity>
                                                    <ImageBackground resizeMode='contain' style={styles.playerBackImage}
                                                        source={require('../../images/batch_card.png')}
                                                    >
                                                        <Text style={styles.playerScoreLabel}>Score</Text>
                                                        <Text style={styles.playerScore}>{this.state.selectedOpponentData.score}</Text>

                                                        <View style={styles.middleBox}>
                                                            <Text style={styles.playerCategory}>{getFormattedCategory(this.state.selectedOpponentData.player_category)}</Text>
                                                            <Image resizeMode="contain" style={styles.playerImage} source={{ uri: this.state.selectedOpponentData.profile_pic }}></Image>
                                                            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.playerLevel}>{this.state.selectedOpponentData.player_level.split(" ").join("\n")}</Text>
                                                        </View>

                                                        <View style={styles.playerNameOuter}>
                                                            <Text style={styles.playerName}>{formattedName(this.state.selectedOpponentData.name)}</Text>
                                                        </View>

                                                        <View style={styles.badgeOuter}>
                                                            <ImageBackground style={styles.badgeBackImage} source={require('../../images/single_shield.png')}>
                                                                <View style={styles.badgeInner}>
                                                                    {/* <Image style={styles.badgeLeftArrow} source={require('../../images/left_batch_arrow.png')}></Image> */}
                                                                    <Text style={[defaultStyle.bebas_text_blue_10, styles.badgeValue]}>{getFormattedBadge(this.state.selectedOpponentData.badge)}</Text>
                                                                    {/* <Image style={styles.badgeRightArrow} source={require('../../images/right_batch_arrow.png')}></Image> */}
                                                                </View>
                                                            </ImageBackground>
                                                        </View>
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            </View> : null
                                    }
                                </View>

                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={{ color: '#404040', fontSize: 14, fontFamily: 'Quicksand-Regular', width: "50%", textAlign: 'center' }}>You</Text>
                                    <Text style={{ color: '#404040', fontSize: 14, fontFamily: 'Quicksand-Regular', width: "50 %", textAlign: 'center' }}>Opponent</Text>
                                </View>

                                <View style={styles.confirmBtnOuter}>
                                    <Text style={[defaultStyle.rounded_button, styles.confirmBtn]} onPress={() => { this.saveData() }}>Confirm</Text>
                                </View>

                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView >
        )
    }

    _renderItem = ({ item }) => (
        <View style={styles.playerCard}>
            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => {
                    this.setModalVisible(true)
                    this.setState({
                        selectedOpponentData: item
                    })
                }}>
                <ImageBackground resizeMode='contain' style={{ height: 180, width: '100%' }}
                    source={require('../../images/batch_card.png')}
                >
                    <Text style={{ justifyContent: 'center', fontFamily: 'Quicksand-Medium', textAlign: 'center', color: '#F4F4F4', fontSize: 6, paddingTop: 6 }}>Score</Text>
                    <Text style={{ justifyContent: 'center', textAlign: 'center', color: 'white', fontFamily: 'Quicksand-Medium', fontSize: 14 }}>{item.score == '' || item.score == undefined ? "-" : item.score}</Text>

                    <View style={{
                        flexDirection: 'row',
                        paddingTop: 10,
                        marginLeft: 2, marginRight: 2
                    }}>

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
                        >{getFormattedCategory(item.player_category)}</Text>
                        <Image
                            resizeMode="contain"
                            style={{
                                height: 80, width: 50,
                                justifyContent: 'center', alignSelf: 'center'
                            }}
                            source={{ uri: item.profile_pic }}></Image>

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
                                fontFamily: 'Quicksand-Medium',
                                marginTop: 16,
                            }}
                        >{item.player_level.split(" ").join("\n")}</Text>
                    </View>

                    <View style={{
                        position: 'absolute',
                        marginTop: 103,
                        width: "100%", height: 23, backgroundColor: 'white'
                    }}>

                        <Text style={{
                            color: '#404040',
                            fontSize: 16,
                            textAlign: 'center',
                            fontFamily: 'Quicksand-Medium'
                        }}>{formattedName(item.name)}</Text>
                    </View>

                    <View style={{
                        justifyContent: 'center', alignItems: 'center',
                        marginTop: 8
                    }}>

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
                                    {item.badge == undefined ? '' : getFormattedBadge(item.badge)}
                                </Text>

                            </View>
                        </ImageBackground>




                    </View>

                </ImageBackground>
            </TouchableOpacity>
        </View>
    );

    render() {

        if (this.props.data.loading && !this.state.opponentData.length == 0) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        let data = this.state.opponentData
        return (
            <View style={styles.chartContainer}>

                {this.listHeader()}
                <FlatList
                    data={data}
                    style={{ padding: 8 }}
                    //ListHeaderComponent={() => this.listHeader()}
                    numColumns={3}
                    renderItem={this._renderItem}
                />
                {this.state.playerData != null && this.createChallengeModal()}

            </View>
        );
    }

}

const mapStateToProps = state => {
    return {
        data: state.ChallengeReducer,

    };
};

const mapDispatchToProps = {
    createChallenge, getOpponentList, getChallengeDashboard
};

export default connect(mapStateToProps, mapDispatchToProps)(OpponentList);


const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        fontFamily: 'Quicksand-Regular'
    },
    searchOuter: {
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16,
        marginBottom: 8,
        borderRadius: 12
    },
    searchCard: {
        borderRadius: 16,
        elevation: 1
    },
    searchBox: {
        marginLeft: 8,
        backgroundColor: 'white',
        borderRadius: 16,
        fontFamily: 'Quicksand-Regular'
    },
    filterLabel: {
        marginTop: 8,
        marginBottom: 4,
        textAlign: 'right',
        color: '#d3d3d3',
        fontSize: 13
    },
    playerCardOuter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        //paddingHorizontal: 5
        marginLeft: 18,
        marginTop: 15
    },
    playerCard: {
        overflow: 'hidden',
        height: 200,
        width: "33.33%",
        paddingRight: 4,
        marginBottom: 16
    },
    modalPlayerCard: {
        overflow: 'hidden',
        height: 200,
        width: "35%",
        marginBottom: 16
    },
    playerBackImage: {
        height: 182,
        width: '100%'
    },
    playerScoreLabel: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#F4F4F4',
        fontSize: 6,
        paddingTop: 6,
        fontFamily: 'Quicksand-Medium'
    },
    playerScore: {
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        fontFamily: 'Quicksand-Medium'
    },
    middleBox: {
        flexDirection: 'row',
        paddingTop: 10,
        marginLeft: 2,
        marginRight: 2,
    },
    playerCategory: {
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
        paddingTop: 1,
        fontFamily: 'Quicksand-Regular'
    },
    playerImage: {
        height: 80,
        width: 50,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    playerLevel: {
        color: 'white',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 7,
        marginLeft: 4,
        marginTop: 16,
        fontFamily: 'Quicksand-Regular'
    },
    playerNameOuter: {
        position: 'absolute',
        marginTop: 103,
        width: "100%",
        height: 23,
        backgroundColor: 'white'
    },
    playerName: {
        color: '#404040',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium'
    },
    badgeOuter: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8
    },
    badgeBackImage: {
        height: 38,
        width: 57,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeInner: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    badgeLeftArrow: {
        height: 7,
        width: 12,
        marginLeft: -12
    },
    badgeValue: {
        fontSize: 5,
        color: 'white',
    },
    badgeRightArrow: {
        height: 7,
        width: 12,
        marginRight: -12
    },
    versusOuter: {
        backgroundColor: '#6759B7',
        borderRadius: 50,
        width: 40,
        height: 40,
        marginLeft: 20,
        marginRight: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    versusText: {
        color: '#ffffff',
        fontFamily: 'Quicksand-Regular',
        fontSize: 17,
        fontFamily: 'Quicksand-Regular'
    },
    opponentCard: {
        overflow: 'hidden',
        height: 200,
        width: "35%",
        marginBottom: 16
    },
    opponentBackImage: {
        height: 200,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addOpponentLabel: {
        color: 'white',
        fontSize: 12,
        paddingTop: 6,
        color: '#A3A5AE',
        fontFamily: 'Quicksand-Regular'
    },
    confirmBtnOuter: {
        marginHorizontal: 16,
        marginTop: 20,
        marginBottom: 15
    },
    confirmBtn: {
        marginTop: 16,
        width: "100%",
        marginLeft: 0,
        marginRight: 0,
        fontFamily: 'Quicksand-Regular',
    },
    closeImg: {
        height: 30,
        width: 30,
    },
    modalOuter: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        paddingVertical: 16
    },
    modalBox: {
        width: "95%",
        //margin: 16,
        //padding: 16,
        borderRadius: 16,
        backgroundColor: 'white',
        height: 400,
    },
    modalHeadingOuter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    modalHeadingText: {
        color: '#707070',
        fontFamily: 'Quicksand-Regular'
    }
});


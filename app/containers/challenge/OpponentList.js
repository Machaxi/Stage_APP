import React from 'react';
import { StyleSheet, View, Image, FlatList, TextInput, ImageBackground, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Card, Text, ActivityIndicator, } from 'react-native-paper';
import { connect } from 'react-redux';

import { createChallenge, getOpponentList } from '../../redux/reducers/ChallengeReducer'
import { getData } from "../../components/auth";
import BaseComponent, { defaultStyle, EVENT_REFRESH_CHALLENGE } from '../BaseComponent'
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
            playerData: null
        }
        this.state.id = this.props.navigation.getParam('id', '');
        this.state.playerData = this.props.navigation.getParam('playerData');
        console.log('this.state.playerData', this.state.playerData);
    }

    componentDidMount() {
        getData('userInfo', (value) => {
            userData = JSON.parse(value);
            this.state.academy_id = userData['academy_id'];
            this.state.player_id = userData['player_id'];
            getData('header', (value) => {
                this.props.getOpponentList(value, userData['academy_id'], 0, 10).then(() => {
                    let data = this.props.data.data
                    console.log(' getOpponentList ' + JSON.stringify(data));

                    // console.log('data.data.dashboard', data.data.dashboard);
                    // console.log('data.data.challenges', data.data.dashboard.challenges)

                    let success = data.success
                    if (success) {

                        console.log(' getChallengeDashboardsds ' + JSON.stringify(data.data.dashboard));

                        this.setState({
                            opponentData: data.data.players,
                        })
                    }

                }).catch((response) => {
                    console.log(response);
                })
            })
        })

    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
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
                    <TextInput style={styles.searchBox} placeholder="Search" onChangeText={text => { this.state.query = text }}></TextInput>
                </Card>
                <Text style={styles.filterLabel} >Filter</Text>
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

                                    <TouchableOpacity onPress={() => { this.setModalVisible(false); }}>
                                        <Image style={styles.closeImg} source={require('../../images/ic_close.png')} />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.playerCardOuter}>
                                    <View style={styles.modalPlayerCard}>
                                        <TouchableOpacity>
                                            <ImageBackground style={styles.playerBackImage}
                                                source={require('../../images/batch_card.png')}
                                            >
                                                <Text style={styles.playerScoreLabel}>Score</Text>
                                                <Text style={styles.playerScore}>{this.state.playerData.score}</Text>

                                                <View style={styles.middleBox}>
                                                    <Text style={styles.playerCategory}>{this.state.playerData.player_category}</Text>
                                                    <Image style={styles.playerImage} source={{ uri: this.state.playerData.profile_pic }}></Image>
                                                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.playerLevel}>{this.state.playerData.player_level.split(" ").join("\n")}</Text>
                                                </View>

                                                <View style={styles.playerNameOuter}>
                                                    <Text style={styles.playerName}>{this.state.playerData.name}</Text>
                                                </View>

                                                <View style={styles.badgeOuter}>
                                                    <ImageBackground style={styles.badgeBackImage} source={require('../../images/batch_pink.png')}>
                                                        <View style={styles.badgeInner}>
                                                            <Image style={styles.badgeLeftArrow} source={require('../../images/left_batch_arrow.png')}></Image>
                                                            <Text style={styles.badgeValue}>{this.state.playerData.badge}</Text>
                                                            <Image style={styles.badgeRightArrow} source={require('../../images/right_batch_arrow.png')}></Image>
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
                                                    <ImageBackground style={styles.playerBackImage}
                                                        source={require('../../images/batch_card.png')}
                                                    >
                                                        <Text style={styles.playerScoreLabel}>Score</Text>
                                                        <Text style={styles.playerScore}>{this.state.selectedOpponentData.score}</Text>

                                                        <View style={styles.middleBox}>
                                                            <Text style={styles.playerCategory}>{this.state.selectedOpponentData.player_category}</Text>
                                                            <Image style={styles.playerImage} source={{ uri: this.state.selectedOpponentData.profile_pic }}></Image>
                                                            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.playerLevel}>{this.state.selectedOpponentData.player_level.split(" ").join("\n")}</Text>
                                                        </View>

                                                        <View style={styles.playerNameOuter}>
                                                            <Text style={styles.playerName}>{this.state.selectedOpponentData.name}</Text>
                                                        </View>

                                                        <View style={styles.badgeOuter}>
                                                            <ImageBackground style={styles.badgeBackImage} source={require('../../images/batch_pink.png')}>
                                                                <View style={styles.badgeInner}>
                                                                    <Image style={styles.badgeLeftArrow} source={require('../../images/left_batch_arrow.png')}></Image>
                                                                    <Text style={styles.badgeValue}>{this.state.selectedOpponentData.badge}</Text>
                                                                    <Image style={styles.badgeRightArrow} source={require('../../images/right_batch_arrow.png')}></Image>
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
            <TouchableOpacity onPress={() => {
                this.setModalVisible(true)
                this.setState({
                    selectedOpponentData: item
                })
            }}>
                <ImageBackground style={styles.playerBackImage} source={require('../../images/batch_card.png')}>
                    <Text style={styles.playerScoreLabel}>Score</Text>
                    <Text style={styles.playerScore}>{item.score}</Text>

                    <View style={styles.middleBox}>
                        <Text style={styles.playerCategory}>{item.player_category}</Text>
                        <Image style={styles.playerImage} source={{ uri: item.profile_pic }}></Image>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.playerLevel}>{item.player_level.split(" ").join("\n")}</Text>
                    </View>

                    <View style={styles.playerNameOuter}>
                        <Text style={styles.playerName}>{item.name}</Text>
                    </View>

                    <View style={styles.badgeOuter}>
                        <ImageBackground style={styles.badgeBackImage} source={require('../../images/batch_pink.png')}>
                            <View style={styles.badgeInner}>
                                <Image style={styles.badgeLeftArrow} source={require('../../images/left_batch_arrow.png')}></Image>
                                <Text style={styles.badgeValue}>{item.badge}</Text>
                                <Image style={styles.badgeRightArrow} source={require('../../images/right_batch_arrow.png')}></Image>
                            </View>
                        </ImageBackground>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );

    render() {
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
                {this.createChallengeModal()}

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
    createChallenge, getOpponentList
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
        height: 200,
        width: '100%'
    },
    playerScoreLabel: {
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        fontSize: 8,
        paddingTop: 6,
        fontFamily: 'Quicksand-Regular'
    },
    playerScore: {
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 13,
        fontFamily: 'Quicksand-Regular'
    },
    middleBox: {
        flexDirection: 'row',
        paddingTop: 13,
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
        fontSize: 8,
        marginLeft: 4,
        marginTop: 16,
        fontFamily: 'Quicksand-Regular'
    },
    playerNameOuter: {
        position: 'absolute',
        marginTop: 116,
        width: "100%",
        height: 20,
        backgroundColor: 'white'
    },
    playerName: {
        color: '#404040',
        fontWeight: 16,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
    badgeOuter: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    badgeBackImage: {
        height: 38,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeInner: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#485FA0',
        height: 6,
        width: '120%'
    },
    badgeLeftArrow: {
        height: 7,
        width: 12,
        marginLeft: -12
    },
    badgeValue: {
        fontSize: 5,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
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


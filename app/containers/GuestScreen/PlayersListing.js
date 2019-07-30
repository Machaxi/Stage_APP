import React from 'react';
import { StyleSheet, View, Image, FlatList, TextInput, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { Card, ActivityIndicator, } from 'react-native-paper';
import { connect } from 'react-redux';

import { getBatchPlayersList, getAcademyPlayersList } from '../../redux/reducers/AcademyReducer'
import BaseComponent, { defaultStyle, formattedName } from '../BaseComponent';
import { getData } from "../../components/auth";

class PlayersListing extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            players: null,
            id: '',
            filter: [],
            query: ''
        }
        this.state.id = this.props.navigation.getParam('id', '');
    }

    componentDidMount() {
        console.log(this.props.navigation.getParam('List_type'))

        if (this.props.navigation.getParam('List_type') == 'BATCH') {
            this.getBtachPlayer(this.props.navigation.getParam('batch_id'))
        } else {
            this.props.getAcademyPlayersList(this.state.id).then(() => {
                console.log('Res=> ' + JSON.stringify(this.props.data.res))
                let status = this.props.data.res.success
                if (status) {
                    let players = this.props.data.res.data.players
                    this.setState({
                        players: players,
                        filter: players
                    })
                }


            }).catch((response) => {
                console.log(response);
            })
        }
    }

    getBtachPlayer(batch_id) {
        getData('header', (value) => {
            console.log("header", value, batch_id);
            this.props.getBatchPlayersList(value, batch_id).then(() => {
                //console.warn('Res=> ' + JSON.stringify(this.props.data.res))
                let status = this.props.data.res.success
                if (status) {
                    let players = this.props.data.res.data.players
                    this.setState({
                        players: players
                    })
                }


            }).catch((response) => {
                console.log(response);
            })
        });
    }




    listHeader() {
        return (
            <View
                style={{
                    marginLeft: 16,
                    marginRight: 16,
                    marginTop: 16,
                    marginBottom: 8,
                    borderRadius: 12
                }}>
                <Card style={{ borderRadius: 16, elevation: 1 }}>

                    <TextInput style={{
                        marginLeft: 8,
                        backgroundColor: 'white',
                        borderRadius: 16,
                        fontFamily: 'Quicksand-Regular'
                    }} placeholder="Search"
                        onChangeText={text => {
                            this.state.query = text
                            this.setState({
                                query: text
                            })
                            // const data = this.find(this.state.query);
                            // this.state.filter = data;
                            // console.warn('search ',data)
                            // this.setState({
                            //     filter: data
                            // })
                        }}
                    ></TextInput>
                </Card>

                <Text style={{
                    marginTop: 8, marginBottom: 4,
                    textAlign: 'right',
                    color: '#d3d3d3', fontSize: 13
                }} >Filter</Text>

            </View>
        )
    }
    _renderItem = ({ item }) => (



        <View style={{ overflow: 'hidden', height: 200, width: "33.33%", paddingRight: 4, marginBottom: 16 }}>
            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => {
                    this.props.navigation.navigate('OtherPlayerDeatils', {
                        academy_id: this.state.id,
                        player_id: item.id
                    })
                }}>
                <ImageBackground style={{ height: 200, width: '100%' }}
                    source={require('../../images/batch_card.png')}
                >
                    <Text style={{ justifyContent: 'center', fontFamily: 'Quicksand-Medium', textAlign: 'center', color: '#F4F4F4', fontSize: 6, paddingTop: 6 }}>Score</Text>
                    <Text style={{ justifyContent: 'center', textAlign: 'center', color: 'white', fontFamily: 'Quicksand-Medium', fontSize: 14 }}>{item.score}</Text>

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
                        >{item.player_category}</Text>
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
                                fontSize: 6,
                                marginLeft: 4,
                                fontFamily: 'Quicksand-Medium',
                                marginTop: 16,
                            }}
                        >{item.player_level.split(" ").join("\n")}</Text>
                    </View>

                    <View style={{
                        position: 'absolute',
                        marginTop: 116,
                        width: "100%", height: 20, backgroundColor: 'white'
                    }}>

                        <Text style={{
                            color: '#404040',
                            fontSize: 16,
                            textAlign: 'center',
                            fontFamily: 'Quicksand-Medium'
                        }}>{formattedName(item.name)}</Text>
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

                                <Text style={[defaultStyle.bebas_text_blue_10, { fontSize: 5, color: 'white', }]}>{item.badge == undefined ? ' - ' : item.badge}</Text>
                                <Image style={{ height: 7, width: 12, marginRight: -12 }}
                                    source={require('../../images/right_batch_arrow.png')}></Image>

                            </View>
                        </ImageBackground>




                    </View>

                </ImageBackground>
            </TouchableOpacity>
        </View>


    );

    find(query) {
        const { players } = this.state;
        console.warn('here =>', players)

        if (query === '') {
            return players;
        }
        const regex = new RegExp(`${query.trim()}`, 'i');
        return players.filter(item => item.name.search(regex) >= 0);
    }


    render() {

        const data = this.find(this.state.query);


        if (this.props.data.loading || this.state.players == null) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }



        return (
            <View style={styles.chartContainer}>

                {this.listHeader()}
                <FlatList
                    style={{ padding: 8 }}
                    //ListHeaderComponent={() => this.listHeader()}
                    data={data}
                    extraData={data}
                    numColumns={3}
                    renderItem={this._renderItem}
                />


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
    getAcademyPlayersList, getBatchPlayersList
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersListing);


const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    }
});


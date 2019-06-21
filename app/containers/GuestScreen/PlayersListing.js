import React from 'react';
import { StyleSheet, View, Image, FlatList, TextInput, ImageBackground,TouchableOpacity } from 'react-native';
import { Card, Text, ActivityIndicator, } from 'react-native-paper';
import { connect } from 'react-redux';

import { getAcademyPlayersList } from '../../redux/reducers/AcademyReducer'
import BaseComponent from '../BaseComponent';

class PlayersListing extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            players: null,
            id: '',
        }
        this.state.id = this.props.navigation.getParam('id', '');
    }

    componentDidMount() {

        this.props.getAcademyPlayersList(this.state.id).then(() => {
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
                    }} placeholder="Search"></TextInput>
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
            <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate('OtherPlayerDeatils')
            }}>
            <ImageBackground style={{ height: 200, width: '100%' }}
                source={require('../../images/batch_card.png')}
            >
                <Text style={{ justifyContent: 'center', textAlign: 'center', color: 'white', fontSize: 8, paddingTop: 6 }}>Score</Text>
                <Text style={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 13 }}>{item.score}</Text>

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
                            fontSize: 8,
                            marginLeft: 4,
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
                        fontWeight: 16,
                        fontWeight: '500',
                        textAlign: 'center'
                    }}>{item.name}</Text>
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

                            <Text style={{ fontSize: 5, color: 'white', textAlign: 'center' }}>{item.badge}</Text>
                            <Image style={{ height: 7, width: 12, marginRight: -12 }}
                                source={require('../../images/right_batch_arrow.png')}></Image>

                        </View>
                    </ImageBackground>




                </View>

            </ImageBackground>
            </TouchableOpacity>
        </View>


    );

    render() {

        if (this.props.data.loading || this.state.players == null) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        return (
            <View style={styles.chartContainer}>

                <FlatList
                    style={{ padding: 8 }}
                    ListHeaderComponent={() => this.listHeader()}
                    data={this.state.players}
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
    getAcademyPlayersList
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersListing);


const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    }
});


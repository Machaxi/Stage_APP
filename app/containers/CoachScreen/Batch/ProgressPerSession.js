
import React from 'react'
import { View, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, Dimensions,
    ActivityIndicator, FlatList, ScrollView, TextInput
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { getData } from "../../../components/auth";
import BaseComponent, { defaultStyle } from '../../BaseComponent'
import { getBatchPlayersList, getAcademyPlayersList } from '../../../redux/reducers/PlayerReducer';

const acedemicList = [
    {
        label: 'India',
        value: 'IN',
    }

];

const placeholder = {
    label: 'Select Option',
    value: null,
    color: '#9EA0A4',
};
var deviceWidth = Dimensions.get('window').width - 20;

class ProgressPerSession extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            country: undefined,
            billingchecked: false,
            playerList: [],
            batchDetails: null,
            attendenceDate: '26-JUNE-2019',
            searchtxt: '',
            isSearching: false,
            searchArray: []
        }
        this.state.id = this.props.navigation.getParam('id', '');
        this.state.batchId = this.props.navigation.getParam('batch_id','')
    }

    componentDidMount() {
        console.log('in component did mount', this.props)
        this.setState({batchDetails: this.props.navigation.getParam('batch')})
        // console.log(this.props.navigation.getParam('List_type'))

        // if (this.props.navigation.getParam('List_type') == 'BATCH') {
        //     this.getBtachPlayer(this.props.navigation.getParam('batch_id'))
        // } else {
        console.log('in component did mount');
        getData('header', (value) => {

            this.props.getBatchPlayersList(value,this.state.batchId).then(() => {
                console.log('Players Res=> ' , JSON.stringify(this.props.data.res))
                let status = this.props.data.res.success
                if (status) {
                    let user1 = this.props.data.res
                    this.setState({
                        playerList: user1.data['players'],
                        searchArray: user1.data['players']
                    })
                }
            }).catch((response) => {
                console.log(response);
            })
        })
        // }
    }

    renderItem = ({ item }) => (
        <TouchableOpacity key={item} onPress={() => {

            console.warn("Touch Press")

            this.props.navigation.navigate('UpdatePlayerProgress', {
                batch_id: this.state.batchDetails.batch_id, player_id: item.id, 
                month: this.props.navigation.getParam('month'), 
                year: this.props.navigation.getParam('year'),
                data:JSON.stringify(item)
            })

        }}>

            <View style={{
                flex: 1,
                margin: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Text style={defaultStyle.regular_text_14}>
                    {item.name}
                </Text>

                <Image source={require('../../../images/forward.png')}
                    resizeMode="contain"
                    style={{
                        width: 5,
                        height: 11
                    }} />

            </View>
        </TouchableOpacity>

    );

    find(query) {
        const { playerList } = this.state;

        if (query === '') {
            return playerList;
        }
        try {
            const regex = new RegExp(`${query.trim()}`, 'i');
            console.log('regex ', regex)

            return playerList.filter(item => item.name.search(regex) >= 0);
        } catch (e) {
            // alert(e);
            return false;
        }

    }


    render() {
        // return(
        // <View>
        //     <Text>hello</Text>
        // </View>
        // )
        if (this.props.data.loading && !this.state.player_profile) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }
        if (this.state.batchDetails) {
            const { batch_name, batch_category, remaining_players, batch_id, session } = this.state.batchDetails
            var total_players = this.state.playerList.length

            return <View style={{ flex: 1, marginTop: 0, backgroundColor: 'white' }}>


                <View style={{ backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', margin: 12, }}>
                        <View style={{ width: 130 }}>
                            <Text style={[defaultStyle.bold_text_10, { marginBottom: 5, color: '#A3A5AE' }]}>Batch name</Text>
                            <Text style={defaultStyle.regular_text_14}>{batch_name} </Text>
                        </View>

                        {/* <View style={{ width: 130 }}>
                             <Text style={[defaultStyle.bold_text_10, { marginBottom: 5, color: '#A3A5AE' }]} >Category</Text>
                            <Text style={defaultStyle.regular_text_14}>{batch_category}</Text>
                         </View> */}

                    </View>

                    <View style={{ flexDirection: 'row', marginLeft: 12, }}>
                        <View style={{ width: 130 }}>
                            <Text style={[defaultStyle.bold_text_10, { marginBottom: 5, color: '#A3A5AE' }]} >Total players</Text>
                            <Text style={defaultStyle.regular_text_14}>{total_players} </Text>
                        </View>

                        {/* <View style={{ width: 130 }}>
                            <Text style={[defaultStyle.bold_text_10, { marginBottom: 5, color: '#A3A5AE' }]} >Update remaining</Text>
                            <Text style={defaultStyle.regular_text_14}>{remaining_players}</Text>
                        </View>
                        <View style={{ width: 130 }}>
                            <Text style={[defaultStyle.bold_text_10, { marginBottom: 5, color: '#A3A5AE' }]} >Month</Text>
                            <Text style={defaultStyle.regular_text_14}>{moment(this.props.navigation.getParam('month') + '-' + this.props.navigation.getParam('year'), "MM/YYYY").format("MMM'YY")}</Text>
                        </View> */}

                    </View>
                    <View>

                    </View>
                    <TextInput
                        // autoFocus
                        style={{
                            height: 40,
                            marginLeft: 12,
                            marginRight: 12,
                            marginTop: 24,
                            marginBottom: 16,
                            paddingLeft: 10,
                            fontFamily: '',
                            borderWidth: 0.5,
                            fontFamily: 'Quicksand-Regular',
                            fontSize: 14,
                            borderColor: '#CECECE', borderRadius: 15
                        }}
                        onChangeText={value => {

                            const data = this.find(value);
                            // this.state.searchArray = data;
                            this.setState({
                                searchtxt: value,
                                searchArray: data
                            })

                        }}
                        placeholder={'Search Students'}
                        value={this.state.searchtxt}
                    />
                </View>

                <View style={{
                    paddingTop: 16,
                    paddingBottom: 16,
                    paddingRight: 12,
                    paddingLeft: 12,
                    backgroundColor: '#F7F7F7',
                    flexDirection: 'row', justifyContent: 'space-between'
                }}>
                    <Text style={[defaultStyle.bold_text_10, { color: '#A3A5AE' }]}>Name </Text>

                </View>


                <FlatList
                    data={this.state.searchArray}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => item.id}
                />

            </View >;
        } else {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                </View>
            )
        }
    }


                    }
const mapStateToProps = state => {
    return {
                        data: state.PlayerReducer,
                };
            };
const mapDispatchToProps = {
                        getAcademyPlayersList,
                        getBatchPlayersList
                    };
                    export default connect(mapStateToProps, mapDispatchToProps)(ProgressPerSession);
                    
                    
const pickerSelectStyles = StyleSheet.create({
                        inputIOS: {
                        fontSize: 16,
                    // paddingVertical: 12,
                    //paddingHorizontal: 10,
                    borderWidth: 0,
                    borderColor: '#D3D3D3',
                    borderRadius: 4,
                    color: 'white',
                    // paddingLeft: 10,
            
                    // alignItems: 'stretch',
                    // // justifyContent: 'right',
                    alignSelf: 'center',
                    height: 40,
                    marginRight: 10,
                    marginTop: 5,
                    marginBottom: 5
                    // to ensure the text is never behind the icon
                },
    inputAndroid: {
                        fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 0.5,
                    borderColor: '#614051',
                    borderRadius: 8,
                    color: 'black',
                    paddingRight: 30, // to ensure the text is never behind the icon
                },
            });
            
const styles = StyleSheet.create({
                        navBar: {
                        height: 60,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // backgroundColor: 'blue',
                },
    leftContainer: {
                        flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    // backgroundColor: 'green'
                },
    rightContainer: {
                        flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    // backgroundColor: 'red',
                },
    rightIcon: {
                        height: 25,
                    width: 25,
                    resizeMode: 'contain',
                    marginRight: 20
                    //backgroundColor: 'white',
                },
            
    scoreBox: {
                        color: 'white',
                    marginRight: 20,
                    textAlign: 'right', fontSize: 24, fontWeight: 'bold'
                },
    buttomButton: {
                        flexDirection: 'row',
                    alignItems: 'center',
                    height: 45,
            
                    backgroundColor: 'white',
                    marginTop: 10,
                    marginBottom: -5,
                    marginLeft: -5,
                    marginRight: -5,
                    shadowColor: 'black',
                    shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 1 }, borderBottomRightRadius: 10, borderBottomLeftRadius: 10
            
                }
            
            
});
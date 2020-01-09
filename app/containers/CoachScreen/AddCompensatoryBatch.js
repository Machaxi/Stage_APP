
import React from 'react'
import { connect } from 'react-redux';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';
import { Card, } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import { getData } from "../../components/auth";
import Events from '../../router/events';
import { getCompensatoryPlayers } from '../../redux/reducers/CompensatoryBatchReducer'
import { getPlayerBatch } from "../../redux/reducers/PlayerBatchReducer";
import BaseComponent, { defaultStyle } from '../BaseComponent'

class AddCompensatoryBatch extends BaseComponent {

    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: 'Add Compensatory Class',
            headerTitleStyle: defaultStyle.headerStyle,
            headerLeft: (
                <TouchableOpacity
                    onPress={() => {
                        Events.publish('CompensatoryData', navigation.getParam('passCompensatoryBatch')());
                        navigation.goBack();
                    }}
                    style={{padding: 7}}
                    activeOpacity={.8}
                >
                    <Image
                        source={require('../../images/go_back_arrow.png')}
                        style={{ width: 20, height: 16, marginLeft: 12 }}
                    />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity
                    onPress={() => {
                        Events.publish('CompensatoryData', navigation.getParam('passCompensatoryBatch')());
                        navigation.goBack()
                    }}
                    activeOpacity={.8}
                >
                    <Text
                        style={{
                            marginRight: 12,
                            fontFamily: 'Quicksand-Regular',
                            fontSize: 14,
                            color: '#667DDB'
                        }}
                    >Done</Text>
                </TouchableOpacity>
            )
        };

    };


    constructor(props) {
        super(props)
        this.batch_id = this.props.navigation.getParam('batch_id')
        this.state = {
            showSuggestion: true,
            query: '',
            players: [],
            batches: [],
            selectedBatch: [],
            playerBatchIndex: ''
        }
        const {navigation} = this.props.navigation.setParams({ passCompensatoryBatch: this.passCompensatoryBatch })
    }
    componentDidMount() {
    }

    handleChange = (e)=> {
        this.setState({
            query: e,
            showSuggestion: true
        })
        if(e.length >= 3)
            this.getSuggestions(e)
    }

    getSuggestions(query) {
        // this.setState({ spinner: true })
        getData('header', (value) => {
            this.props.getCompensatoryPlayers(value, query, this.batch_id).then(()=> {
                console.log('players are', this.props.players.res)
                let success = this.props.players.res.success
                // this.setState({ spinner: false })
                if(success){
                    let data = this.props.players.res.data
                    this.setState({players: data.players})
                }
            }).catch(response => {
                // this.setState({ spinner: false })
                console.log('error in searching user', response)
            })
        })
    }

    handleKeyDown = (e) => {

        console.warn('handle key ', this.state.query)
    }

    addPlayerBatch(batchObj, index){
        console.log('playerBatchIndex', this.state.playerBatchIndex)
        let batch = batchObj.item
        let batches = [...this.state.batches]

        var selectedBatchChange = false
        var selectedArrayIndex = ''
        for(let i = 0; i < batches.length; i++){
            var batchArrayObj = batches[i]
                let noWarning = batchArrayObj.map(innerBatch => {
                    if(innerBatch === batch){
                        selectedBatchChange = (batch.player_name === this.state.query)
                    }
                    return batch.player_name === this.state.query
                })
            if(selectedBatchChange){
                selectedArrayIndex = i
                break
            }
        }
        var selectedBatch = [...this.state.selectedBatch]
        if(selectedBatchChange){
            let batchArray = batches[selectedArrayIndex]
            for (let i = 0; i < batchArray.length; i++) {
                let item = batchArray[i]
                if(item.compensatory_batch == null){
                    if(batchArray[i].batch_id == index)
                        batchArray[i].compensatory_batch = true
                    else
                        batchArray[i].compensatory_batch = false
                } else if(batchArray[i].batch_id == index ){
                    batchArray[i].compensatory_batch = true
                } else {
                    batchArray[i].compensatory_batch = false
                }
            }
            batches[selectedArrayIndex] = batchArray
            var selectedBatchObj = batchArray.filter(item => {
                return item.compensatory_batch
            })
            console.log('selectedBatchObj', selectedBatchObj)
            selectedBatch = selectedBatch.filter(item => {
                console.log("item is", item)
                console.log('query', this.state.query)
                return item.player_name !== this.state.query
            })
            console.log('selectedBatch', selectedBatch)
            selectedBatch.push(selectedBatchObj[0])
        } else
            alert('Player Selected is different')

        console.log('selectedBatch=>', selectedBatch)
        this.setState({batches, selectedBatch});
    }

    passCompensatoryBatch = () => {
        let compensatoryBatches = []
        let compensatory = this.props.navigation.getParam('compensatory')
        if(compensatory != null){
            compensatoryBatches = [...compensatory]
        }
        compensatoryBatches = compensatoryBatches.filter(item => {
            return item.player_name !== this.state.query
        })
        if(this.state.selectedBatch.length !== 0)
            compensatoryBatches = [...compensatoryBatches, ...this.state.selectedBatch]
            // compensatoryBatches.push(this.state.selectedBatch)
        return compensatoryBatches
    }
    
    playerSelected = (name, player_id) => {
        this.setState({query: name, showSuggestion: false, spinner: true})
        getData('header', value => {
            getData('userInfo', innerValue => {
                const userInfo = JSON.parse(innerValue)
                const academy_id = userInfo.academy_id
                this.props.getPlayerBatch(value, academy_id, player_id).then(() => {
                    let user = JSON.stringify(this.props.data.batchdata);
                    console.log(' getPlayerBatchData response payload ' + user);
                    let user1 = JSON.parse(user)
                    this.setState({ spinner: false })
                    if(user1.success){
                        let playerBatches = [...user1.data.batches]
                        let newBatches = playerBatches.map((item, index) => {
                            playerBatches[index].player_name = name
                            playerBatches[index].player_id = player_id
                            playerBatches[index].is_present = true
                            return playerBatches[index]
                        })
                        let batches = [...this.state.batches]
                        let userBatchExist = ''
                        for(let i = 0; i< batches.length; i++){
                            let batchArray = batches[i]
                            let userBatch = batchArray.map(batch => {
                                userBatchExist = (batch.player_name === name)
                                return batch.player_name === name
                            })
                            console.log('userBatchExist', userBatchExist)
                            if(userBatchExist){
                                this.setState({playerBatchIndex: i})
                                break
                            }
                        }
                        if(userBatchExist === '' || !userBatchExist)
                            this.setState({playerBatchIndex: 0})
                        console.log('userBatchExist', userBatchExist)
                        if(userBatchExist === '' || !userBatchExist)
                            batches.unshift(playerBatches)
                        this.setState({batches})
                    }
                }).catch(response => {
                    this.setState({ spinner: false })
                    console.log('error getting batches', response)
                })
            })
        })
    } 

    renderItem = (item, index) => {
        var innerItem = item.item 
        return(
            <View style={{
                marginLeft: 18,
                marginRight: 25,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 50
            }}>
                <Text style={[defaultStyle.regular_text_14, {
                    justifyContent: 'center',
                    alignItems: 'center'
                }]}>
                    {innerItem.batch_name}
                </Text>

                <View style={{ backgroundColor: 'white', marginTop: 0 }}>
                    <TouchableOpacity
                        onPress={() => this.addPlayerBatch(item, innerItem.batch_id)}
                    >
                        <Image
                            style={{
                                width: 20,
                                height: 20,
                                marginRight: 8
                            }}
                            source={
                                innerItem.compensatory_batch ? require('../../images/ic_radio_button_checked.png')
                                : require('../../images/ic_radio_button_unchecked.png')
                            }
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderBatches = (playerBatch) => {
        let batchItem = playerBatch.item

        return(<Card style={{margin: 16, borderRadius: 5}} >
                    {
                        batchItem[0] != null &&
                        <Text style={{marginLeft: 18, marginTop: 5}}>{batchItem[0].player_name}</Text>
                    }
                    <FlatList
                        // keyboardShouldPersistTaps={'handled'}
                        data={batchItem}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                    />
                </Card>
        )
    }

    render() {
        return(
            <View style={styles.chartContainer}>
                <Spinner
                    visible={this.state.spinner}
                    textStyle={defaultStyle.spinnerTextStyle}
                />
                    <View style={{
                        marginLeft: 16,
                        marginRight: 16,
                        marginTop: 16,
                        marginBottom: 8,
                    }}>
                        <Card style={{
                            borderRadius: 5,
                            elevation: 2,
                        }}>

                            <TextInput
                                onChangeText={this.handleChange}
                                returnKeyType="search"
                                //onKeyPress={this.handleKeyDown}
                                onSubmitEditing={this.handleKeyDown}
                                value={this.state.query}
                                style={{
                                    marginLeft: 8,
                                    backgroundColor: 'white',
                                    borderRadius: 16,
                                    height: 45,
                                    fontFamily: 'Quicksand-Regular',

                                }} placeholder="Search" />
                            {
                                this.state.showSuggestion &&
                                <FlatList
                                    keyboardShouldPersistTaps={'handled'}
                                    data={this.state.players}
                                    renderItem={({ item }) =>{ 
                                        return <TouchableOpacity onPress={() => {
                                                this.playerSelected(item.name, item.id)} }
                                                >
                                                <Text style={{
                                                    marginTop: 6,
                                                    marginLeft: 4,
                                                    marginBottom: 3,
                                                    fontSize: 14,
                                                    padding: 6,
                                                    color: '#000000',
                                                    fontFamily: 'Quicksand-Regular'
                                                }}>{item.name}</Text>
                                            </TouchableOpacity>
                                    }}
                                />
                            }
                        </Card>
                    </View>
                    { this.state.batches.length > 0 &&
                        <View>
                            <FlatList
                                keyboardShouldPersistTaps={'handled'}
                                data={this.state.batches}
                                renderItem={this.renderBatches}
                                keyExtractor={(item, index) => ''+index}
                            />
                        </View>
                    }
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        data: state.PlayerBatchReducer,
        players: state.CompensatoryBatchReducer,

    };
};
const mapDispatchToProps = {
    getCompensatoryPlayers, getPlayerBatch
};

// export default AddCompensatoryBatch;
export default connect(mapStateToProps, mapDispatchToProps)(AddCompensatoryBatch);


const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },


});
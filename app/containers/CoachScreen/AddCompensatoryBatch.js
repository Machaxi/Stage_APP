
import React from 'react'
import { connect } from 'react-redux';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    ScrollView,
    Image
} from 'react-native';
import { getCoachBatchAttendence, saveCoachBatchAttendence } from "../../redux/reducers/BatchReducer";
import { Card, } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import { getData } from "../../components/auth";
import Events from '../../router/events';
import { getCompensatoryPlayers } from '../../redux/reducers/CompensatoryBatchReducer'
import { getPlayerBatch } from "../../redux/reducers/PlayerBatchReducer";
import BaseComponent, { getFormatTimeDate, defaultStyle, EVENT_REFRESH_DASHBOARD } from '../BaseComponent'

class AddCompensatoryBatch extends BaseComponent {

    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: 'Add Compensatory Batch',
            headerTitleStyle: defaultStyle.headerStyle,
            headerLeft: (
                <TouchableOpacity
                    onPress={() => {
                        Events.publish('CompensatoryData', navigation.getParam('selectedBatch')());
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
                        Events.publish('CompensatoryData', navigation.getParam('selectedBatch')());
                        navigation.goBack()
                    }}
                    activeOpacity={.8}
                >
                    <Text
                        style={{
                            marginRight: 12,
                            fontFamily: 'Quicksand-Regular',
                            fontSize: 10,
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
            selectedBatch: {}
        }
        const {navigation} = this.props.navigation.setParams({ selectedBatch: this.selectedBatch })
    }
    componentDidMount() {
    }

    handleChange = (e)=> {
        console.log('_handleChange => ', e)
        this.setState({
            query: e,
            showSuggestion: true
        })
        if(e.length >= 3)
            this.getSuggestions(e)
    }

    getSuggestions(query) {
        this.setState({ spinner: true })
        getData('header', (value) => {
            this.props.getCompensatoryPlayers(value, query, this.batch_id).then(()=> {
                console.log('players are', this.props.players.res)
                let success = this.props.players.res.success
                this.setState({ spinner: false })
                if(success){
                    let data = this.props.players.res.data
                    this.setState({players: data.players}, ()=>console.log('players are', this.state.players))
                }
            }).catch(response => {
                this.setState({ spinner: false })
                console.log('error in searching user', response)
            })
        })
    }

    handleKeyDown = (e) => {

        console.warn('handle key ', this.state.query)
    }

    addPlayerBatch(index){
        console.log('indside add player')
        let batches = [...this.state.batches]
        for (let i = 0; i < batches.length; i++) {
            console.log('batch', batches[i])
            let item = batches[i]
            if(item.compensatory_batch == null){
                if(batches[i].batch_id == index)
                    batches[i].compensatory_batch = true
                else
                    batches[i].compensatory_batch = false
            } else if(batches[i].batch_id == index ){
                batches[i].compensatory_batch = true
            } else {
                batches[i].compensatory_batch = false
            }
        }
        console.log('batches are', batches);
        var selectedBatch = batches.filter(item => {
            return item.compensatory_batch
        })
        console.log('filtered data', selectedBatch)
        this.setState({batches, selectedBatch: selectedBatch[0]});
    }

    selectedBatch = () => {
        return this.state.selectedBatch
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
                        this.setState({batches: user1.data.batches})
                    }
                }).catch(response => {
                    this.setState({ spinner: false })
                    console.log('error getting batches', response)
                })
            })
        })
    } 

    renderItem = (item) => {
        return (
            <View style={{
                marginLeft: 18,
                marginRight: 25,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 50
            }} key={item.batch_id}>
                <Text style={[defaultStyle.regular_text_14, {
                    justifyContent: 'center',
                    alignItems: 'center'
                }]}>
                    {item.batch_name}
                </Text>

                <View style={{ backgroundColor: 'white', marginTop: 0 }}>
                    <TouchableOpacity
                        onPress={() => this.addPlayerBatch(item.batch_id)}
                    >
                        <Image
                            style={{
                                width: 20,
                                height: 20,
                                marginRight: 8
                            }}
                            source={
                                item.compensatory_batch ? require('../../images/ic_radio_button_checked.png')
                                : require('../../images/ic_radio_button_unchecked.png')
                            }
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        let batch_list = []
        if (this.state.batches.length > 0) {

            for (let i = 0; i < this.state.batches.length; i++) {
                let item = this.state.batches[i]
                console.log('obj=>', JSON.stringify(item))
                batch_list.push(this.renderItem(item))
            }
        }

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
                    { !this.state.showSuggestion &&
                        <Card style={{margin: 16, borderRadius: 5}}>
                            {/* <Text>
                                Batches
                            </Text> */}
                            { batch_list }
                        </Card>
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

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
    ScrollView
} from 'react-native';
import { getCoachBatchAttendence, saveCoachBatchAttendence } from "../../redux/reducers/BatchReducer";
import { Card, } from 'react-native-paper';
import { CheckBox } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay';
import { getData } from "../../components/auth";
import { getAcademyPlayersList } from '../../redux/reducers/PlayerReducer'
import BaseComponent, { getFormatTimeDate, defaultStyle, EVENT_REFRESH_DASHBOARD } from '../BaseComponent'

class AddCompensatoryBatch extends BaseComponent {

    constructor(props) {
        super(props)
        // this.inputRefs = {

        //     acedemic: null

        // };
        this.state = {
            query: ''
        }
    }
    componentDidMount() {
        getData('header', (value) => {
            getData('userInfo', innerValue => {
                const userInfo = JSON.parse(innerValue)
                this.props.getAcademyPlayersList(userInfo.academy_id, value).then(() => {
                    console.log('Res=> ' + JSON.stringify(this.props.players.res))
                    let status = this.props.players.res.success
                    if (status) {
                        let players = this.props.data.res.data.players
                        this.setState({
                            players: players,
                        }, ()=>console.log('players', players))
                    }
                }).catch((response) => {
                    console.log(response);
                })
            })
        });
    }

    handleChange = (e)=> {
        console.log('_handleChange => ', e)
        this.setState({
            query: e
        })
        if(e.length >= 3)
            this.getSuggestions(e)

        // if (e == '') {
        //     this.getAcademyList('')
        // }
    }

    getSuggestions(query) {
        const { players } = this.state
        let playerList = [...players]
        const regex = new RegExp(`${query.trim()}`, 'i');
        console.log('regex ', regex)
        let playerFilter = playerList.filter(item => {
            item.name.search(regex) >= 0
        })

        console.log('filter player list', playerFilter)
    }

    handleKeyDown = (e) => {

        console.warn('handle key ', this.state.query)
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
                        borderRadius: 12,

                    }}>
                        <Card style={{
                            borderRadius: 4,
                            elevation: 2,
                            flex: 1,
                            left: 0,
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            zIndex: 1
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
                        </Card>
                    </View>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        data: state.BatchReducer,
        players: state.PlayerReducer
    };
};
const mapDispatchToProps = {
    getAcademyPlayersList
};

// export default AddCompensatoryBatch;
export default connect(mapStateToProps, mapDispatchToProps)(AddCompensatoryBatch);


const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },


});
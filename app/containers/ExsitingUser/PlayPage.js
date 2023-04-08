import React, { Component } from "react";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { getBaseUrl } from '../BaseComponent';
import PlayerScreen from "../FirstTimeUser/PlayerScreen";
import PlayScreen from "../play/PlayScreen";

class PlayPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: '',
            playData: null,
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const header = await AsyncStorage.getItem("header");
        console.log(header);
        this.setState({ header: header });
        this.apiCall()
    }

    apiCall = () => {
        console.log(this.state.header)
        axios
            .get(
                getBaseUrl() + '/user/learn-play', {
                headers: {
                    'x-authorization': this.state.header
                },
            })
            .then((response) => {
                let data = JSON.stringify(response)
                let userResponce = JSON.parse(data)
                let batchData = userResponce["data"]["data"];
                this.setState({ learnData: batchData["learn"], playData: batchData["play"] })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <LinearGradient
                colors={["#332B70", "#24262A"]}
                locations={[0, 1]}
                style={{ flex: 1 }}
            >
                {/* {this.state.playData && (
                    <PlayerScreen
                        onPress={() => {
                            AsyncStorage.setItem("select_trial", "Playing Trial");
                            this.props.navigation.navigate("TrialBook");
                        }}
                        playData={this.state.playData}
                    />
                )} */}
                <PlayScreen/>
            </LinearGradient>
        );
    }
}

export default PlayPage;

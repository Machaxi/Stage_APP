import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, TextInput, Text, } from 'react-native';
import BaseComponent, { defaultStyle, EVENT_REFRESH_RESULTS } from '../BaseComponent'
import { getData } from "../../components/auth";
import {
  saveTrialSessionData
} from "../../redux/reducers/TrialSessionReducer";
import { connect } from 'react-redux';
import Events from '../../router/events';
import Spinner from 'react-native-loading-spinner-overlay';

class TrialSession extends BaseComponent {

  constructor(props) {
    super(props)

    this.state = {
      spinner: false,
      txtMobile: '',
      txtName: ''
    }
  }

  componentDidMount() {

  }

  progress(status) {
    this.setState({
      spinner: status
    })
  }

  /* check if form details are valid or not*/
  checkUserDetails() {
    let { txtName, txtMobile } = this.state;
    if (txtMobile == '' || txtMobile == null) {
      alert('Mobile number is empty.')
      return
    } else {
      txtMobile = '+91' + txtMobile;
      if (!this.isValidMobileNumber(txtMobile)) {
        alert('Invalid phone number.')
        return
      }
      else if (txtName == '') {
        alert("Name is empty")
      }
      else {
        this.saveUserDetails();
      }
    }
  }

  /* save user details to server*/
  saveUserDetails() {
    var data = {
      'name': this.state.txtName,
      'contact': this.state.txtMobile
    }
    let postData = {}
    postData['data'] = data;
    console.log('postData', JSON.stringify(postData));
    this.progress(true);
    this.props.saveTrialSessionData(postData).then(() => {
      let data = this.props.data.data
      this.progress(false);
      let success = data.success
      if (success) {
        alert(data.data.Success);
        this.props.navigation.navigate('GuestTrial');
      }

    }).catch((response) => {
      this.progress(false);
      console.log(response);
    })
  }


  render() {

    if (this.props.data.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#67BAF5" />
        </View>
      )
    }

    return (

      <View style={styles.mainContainer}>
        <Spinner
          visible={this.state.spinner}
          textStyle={defaultStyle.spinnerTextStyle}
        />

        <View style={styles.headerOuter}>
          <Text style={defaultStyle.heavy_bold_text_14}>Enter Details</Text>
        </View>

        <View style={styles.textBoxOuter}>
          <View style={styles.textBoxInner}>
            <Text style={styles.countryCodeStyle}>+91</Text>
            <TextInput
              autoFocus
              style={styles.textBoxStyle}
              keyboardType={"phone-pad"}
              onChangeText={value => {
                this.setState({ txtMobile: value })
              }}
              placeholder={'Mobile'}
              value={this.state.txtMobile}
            />
          </View>
          <View style={styles.textboxBottomBorder}></View>
        </View>

        <View style={styles.textBoxOuter}>
          <View style={styles.textBoxInner}>
            <TextInput
              autoFocus
              style={styles.textBoxStyle}
              onChangeText={value => {
                this.setState({ txtName: value })
              }}
              placeholder={'Name'}
              value={this.state.txtName}
            />
          </View>
          <View style={styles.textboxBottomBorder}></View>
        </View>

        <TouchableOpacity activeOpacity={.8}
          style={[defaultStyle.rounded_button, styles.btnStyle]}
          onPress={() => {
            this.checkUserDetails()
          }}>
          <Text style={styles.btnTextStyle}>Submit</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.TrialSessionReducer,
  };
};
const mapDispatchToProps = {
  saveTrialSessionData
};
export default connect(mapStateToProps, mapDispatchToProps)(TrialSession);

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerOuter: {
    marginTop: 70,
    marginLeft: -10,
    marginBottom: 20
  },
  textBoxOuter: {
    //marginTop: 10,
    marginBottom: 15,
  },
  countryCodeStyle: {
    fontFamily: 'Quicksand-Regular',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBoxInner: {
    flexDirection: 'row',
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBoxStyle: {
    width: 110,
    fontFamily: 'Quicksand-Regular',
    height: 40,
  },
  textboxBottomBorder: {
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: 1,
    width: 150,
    height: 1
  },
  btnStyle: {
    marginTop: 16,
    width: 150
  },
  btnTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium'
  }
});
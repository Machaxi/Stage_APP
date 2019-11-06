import React from 'react'

import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Alert } from 'react-native'
import BaseComponent, { defaultStyle, SESSION_DATE_FORMAT, DRIBBLE_LOGO, getPaymentKey, TEMP_USER_INFO } from '../BaseComponent';
import { createBooking } from '../../redux/reducers/CourtBookingReducer';
import { connect } from 'react-redux';
import { getData, isSignedIn } from "../../components/auth";
import Spinner from 'react-native-loading-spinner-overlay';
import RazorpayCheckout from 'react-native-razorpay';
import Events from '../../router/events';

class PaymentPage extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      paymentData: null,
      dribble_logo: null
    };
  }

  componentDidMount() {

    this.state.paymentData = this.props.navigation.getParam('paymentData', '');

    console.log('this.state.paymentData', this.state.paymentData);

    //this.bookCourtAndPay();

    getData(DRIBBLE_LOGO, (value) => {
      //alert(value)
      if (value != null)
        this.state.dribble_logo = value
      else
        this.state.dribble_logo = 'https://i.imgur.com/3g7nmJC.png'
    })

    this.gotoRazorpay();

  }

  gotoRazorpay() {


    isSignedIn()
      .then(res => {
        let getDataFrom;
        console.log('isSignedIn => ', res);
        let signedIn = res
        if (signedIn) {
          getDataFrom = 'userInfo';
        } else {
          getDataFrom = TEMP_USER_INFO;
        }


        getData(getDataFrom, (value) => {

          let total = this.state.paymentData.fees
          total = total + '00'

          let userData = JSON.parse(value);
          let user = userData['user']
          let name = user['name']
          let email = user['email']
          if (name == null || name == undefined)
            name = ''
          const logo = this.state.dribble_logo
          const desc = 'Payment for Booking Court'
          const mobile_number = userData['user'].mobile_number

          var options = {
            description: desc,
            image: logo,
            currency: 'INR',
            key: getPaymentKey(),
            amount: total,
            name: 'Machaxi',
            prefill: {
              email: this.getDefaultRazorPayEmail(),
              contact: mobile_number,
              name: name
            },
            theme: { color: '#67BAF5' }
          }


          RazorpayCheckout.open(options).then((data) => {
            // handle success
            console.log('Razor Rspo ', JSON.stringify(data))
            //alert(`Success: ${data.razorpay_payment_id}`);
            let payment_details = {
              razorpay_payment_id: data.razorpay_payment_id
            }
            this.bookCourtAndPay(payment_details)
          }).catch((error) => {
            // handle failure
            console.log('Razor Rspo ', JSON.stringify(error))
            //alert(`Error: ${error.code} | ${error.description}`);
            alert('Payment could not succeed. Please try again.');
            this.props.navigation.navigate('CurrentBooking');
          });


        });


      })
      .catch(err => alert("An error occurred"));
  }


  bookCourtAndPay(payment_details) {

    let postData = {};

    postData = this.state.paymentData;
    postData['payment_details'] = payment_details;

    let data = {}
    data['data'] = postData

    console.log('postData=====', data);

    this.progress(true)

    getData('header', (value) => {
      this.props.createBooking(value, data).then(() => {
        let data = this.props.data.res
        console.log('createChallenge========= ' + JSON.stringify(data));

        this.progress(false)

        let success = data.success
        if (success) {
          //Events.publish(EVENT_REFRESH_CHALLENGE);
          setTimeout(() => {
            Alert.alert(
              'Success',
              'Booking has been done successfully.',
              [
                {
                  text: 'OK', onPress: () => {
                    this.props.navigation.navigate('CurrentBooking');
                    setTimeout(() => {
                      Events.publish('REFRESH_BOOKING');
                    }, 100)
                  }
                },
              ],
              { cancelable: false },
            );
          }, 500)
        }

      }).catch((response) => {
        this.progress(false)
        console.log(response);
      })
    })

  }

  progress(status) {
    this.setState({
      spinner: status
    })
  }


  render() {
    return (
      <View style={{ padding: 16, flex: 1 }}>
        <Spinner visible={this.state.spinner} textStyle={defaultStyle.spinnerTextStyle}></Spinner>
      </View>
    );

  }

}

const mapStateToProps = state => {
  return {
    data: state.CourtBookingReducer,
  };
};
const mapDispatchToProps = {
  createBooking
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);

const styles = {
  rounded_button: {
    width: '100%',
    padding: 10,
    borderRadius: 20,
    //borderWidth: 1,
    marginLeft: 4,
    marginRight: 4,
    borderColor: '#67BAF5',
    backgroundColor: '#67BAF5',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Quicksand-Regular'
  }
}

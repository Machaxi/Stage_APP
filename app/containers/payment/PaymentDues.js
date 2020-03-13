import React from 'react'

import { View, Text, Image, Linking, Platform, TouchableOpacity, ActivityIndicator, ScrollView, Modal, TextInput, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import BaseComponent, { defaultStyle, getPaymentKey } from '../BaseComponent';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment'
import { connect } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from "react-native-firebase";
import { getData } from '../../components/auth';
import InfoDialog from '../../components/custom/InfoDialog'
import { CustomeCard } from '../../components/Home/Card'
import { DueView } from '../../components/Home/DueView';
import { getAcademyPaymentDues, settlePaymentDues } from "../../redux/reducers/PaymentReducer";
import { CustomeButtonB } from '../../components/Home/SwitchButton'
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';
import { getCoachBatch } from "../../redux/reducers/BatchReducer";
import { COACH, ACADEMY } from '../../components/Constants';

const placeholder = {
  label: 'Select',
  value: null,
  color: '#9EA0A4',
};

class PaymentDues extends BaseComponent {


  constructor(props) {
    super(props);
    this.userid = ''
    this.username = ''
    this.academy_id = ''
    this.state = {
      initialData: null,
      paymentDueData: null,
      userData: null,
      spinner: false,
      modalVisible: false,
      allBatches: [],
      paymentMethods: [
        { 'value': 'RAZORPAY', 'label': 'RAZORPAY' },
        { 'value': 'CASH', 'label': 'CASH ' },
        { 'value': 'ONLINE', 'label': 'ONLINE' },
      ],
      paymentMethodValue: 'RAZORPAY',
      remark: '',
      amount: '',
      query: '',
      selectedBatch: null,
      fromDate: '',
      toDate: '',
      academyId: '',
    };
    this.inputRefs = {
      paymentMethodValue: null,
    };


  }

  componentDidMount() {

    getData('userInfo', (value) => {
      console.log('value', value);
      userData = JSON.parse(value);
      this.state.academyId = userData['academy_id'];
      if (userData.user['user_type'] == COACH || userData.user['user_type'] == ACADEMY) {
        this.getAcademyBatches(userData['academy_id'], userData['coach_id'])
      }
      this.getDues();
    });


  }

  find(query) {

    //return challengeLeaderboardData.filter(item => item.player.name.search(regex) >= 0);

    const { initialData, paymentDueData } = this.state;
    if (query === '') {
      return initialData;
    }
    try {
      const regex = new RegExp(`${query.trim()}`, 'i');
      console.log('paymentDueData', paymentDueData);
      return paymentDueData.filter(item => item.playerName.search(regex) >= 0);
    } catch (e) {
      return false;
    }
  }

  listHeader() {
    return (
      <View style={styles.searchOuter}>
        <Card style={styles.searchCard}>
          <TextInput style={styles.searchBox} placeholder="Search" onChangeText={text => {
            this.state.query = text
            const data = this.find(this.state.query);
            this.state.paymentDueData = data;
            this.setState({
              paymentDueData: data
            })
          }}></TextInput>
        </Card>
      </View>
    )
  }

  getDues() {
    // getData('userInfo', (value) => {
    // console.warn(value)
    // userData = JSON.parse(value)
    // const player_id = userData['player_id']
    // this.academy_id = userData['academy_id']
    // this.userid = userData.user['id']
    // this.username = userData.user['name']
    // this.state.userData = userData


    let subData = {}
    subData.academyId = this.state.academyId;
    subData.playerId = '';
    subData.batchId = this.state.selectedBatch;
    subData.dueWithIn = '';
    subData.fromDate = this.state.fromDate;
    subData.toDate = this.state.toDate;
    let responseData = {}
    responseData['data'] = subData

    this.progress(true);

    getData('header', (header) => {

      this.props.getAcademyPaymentDues(header, responseData).then(() => {

        let data = this.props.data.data
        console.log('paymentDues payload ' + this.props.data.data);
        this.progress(false);
        if (data.success) {
          let dues = data.data.academy_payment_dues;
          if (dues == 'No Data Available') {
            dues = [];
          }
          this.setState({
            initialData: dues,
            paymentDueData: dues,
          })
        }
      }).catch((response) => {
        this.progress(false);
        console.log(response);
      })
    });
    //  });
  }

  getAcademyBatches(academy_id, player_id) {
    console.log('academy_id', academy_id)
    console.log('player_id', player_id)
    getData('header', (value) => {
      this.props.getCoachBatch(value, academy_id, player_id).then(() => {
        let response = this.props.batchData.batchdata;
        console.log('this.props=======================', this.response);
        if (response.success == true) {

          let batchdata = response.data.coach_batches;
          let new_array = []
          batchdata.map((item, index) => {
            let obj = {
              label: item.batch_name,
              value: item.batch_id,
            }
            new_array[index] = obj
          })

          this.setState({
            allBatches: new_array
          })

        }
      }).catch((response) => {
        console.log(response);
      })

    });


  }

  progress(status) {
    this.setState({
      spinner: status
    })
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  settleDue() {

    let subData = {}
    subData.dueId = this.state.dueData.dueId;
    subData.academyId = this.state.dueData.academyId;;
    subData.paidAmount = this.state.amount;
    subData.dueAmount = this.state.dueData.amount;
    subData.isSettled = false;
    subData.paymentMethod = this.state.paymentMethodValue;
    subData.remark = this.state.remark;
    let responseData = {}
    responseData['data'] = subData


    if (this.state.amount == '' || parseInt(this.state.amount) == 0) {
      alert('Please enter amount');
    } else if (parseInt(this.state.amount) > parseInt(this.state.dueData.amount)) {
      alert(`Amount should be less than ${this.state.dueData.amount}`);
    } else {

      this.progress(true);
      getData('header', (header) => {
        this.props.settlePaymentDues(header, responseData).then(() => {
          let data = this.props.data.data;
          this.progress(false);
          console.log('paymentDues payload ' + JSON.stringify(this.props.data.data));
          if (data.success) {
            this.setModalVisible(false);
            this.getDues();
          }
        }).catch((response) => {
          this.progress(false);
          console.log(response);
        })
      });
    }



  }

  settleDuesModal() {
    console.log('this.state.dueData', this.state.dueData)
    return (
      <View>
        <Modal animationType="none" transparent={true} visible={this.state.modalVisible}>
          <View style={styles.modalOuter}>
            <View style={styles.modalBox}>
              <View style={styles.modalHeadingOuter}>
                <Text></Text>
                <Text style={defaultStyle.bold_text_16}>Your Dues</Text>
                <TouchableOpacity activeOpacity={.8} onPress={() => { this.setModalVisible(false); }}>
                  <Image style={styles.closeImg} source={require('../../images/ic_close.png')} />
                </TouchableOpacity>
              </View>

              <View style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <View style={{ width: '50%' }}>
                  <Text style={defaultStyle.bold_text_14}>
                    Amount
                        </Text>
                </View>

                <View style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  flex: 1,
                  alignContent: 'center',
                  width: '45%',
                }}>

                  <TextInput
                    style={{
                      borderColor: '#CECECE',
                      borderWidth: 0.5, borderRadius: 12,
                      height: 36,
                      fontFamily: 'Quicksand-Regular',
                      width: 70,
                      textAlign: 'center',
                      padding: 10
                    }}
                    keyboardType={'number-pad'}
                    value={this.state.amount.toString()}
                    onChangeText={(text) => {
                      this.setState({
                        amount: text
                      })
                    }}
                  ></TextInput>
                </View>
              </View>



              <View style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 8,
                paddingBottom: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>

                <View style={{ width: '50%' }}>
                  <Text style={defaultStyle.bold_text_14}>
                    Payment Method
                    </Text>
                </View>


                <View style={{
                  width: '40.33%', alignItems: 'center',
                  alignSelf: 'center', alignContent: 'center'
                }}>

                  <RNPickerSelect
                    placeholder={{}}
                    items={this.state.paymentMethods}
                    onValueChange={(value) => {
                      console.log(value)
                      this.setState({
                        paymentMethodValue: value,
                      });
                    }}
                    style={paymentMethodPickerStyles}
                    value={this.state.paymentMethodValue}
                    useNativeAndroidPickerStyle={false}
                    ref={(el) => {
                      this.inputRefs.paymentMethodValue = el;
                    }}
                  />

                  <View style={{
                    width: 110,
                    backgroundColor: '#A3A5AE',
                    height: 1
                  }}></View>

                </View>

              </View>

              <View style={{
                paddingLeft: 20,
                paddingRight: 20,
              }}>
                <View>
                  <Text style={defaultStyle.bold_text_14}>Remark</Text>
                </View>
                <TextInput
                  style={styles.remarkTextArea}
                  onChangeText={
                    (remark) => {
                      this.state.remark = remark;
                    }
                  }
                  multiline={true}
                  placeholder={"Remark (optional)?"}
                >
                </TextInput>
              </View>

              <TouchableOpacity style={styles.confirmBtnOuter} activeOpacity={.8} onPress={() => {
                this.settleDue();
              }}>
                <Text style={[defaultStyle.rounded_button, styles.confirmBtn]} >Settle Payment</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      </View>
    )

  }


  _renderItem = ({ item }) => {
    return (
      <CustomeCard >
        <View
          style={styles.cardOuter} >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={defaultStyle.bold_text_14}>{item.academyName}</Text>
          </View>
          <View style={{ height: 1, backgroundColor: '#DFDFDF', marginTop: 8, marginBottom: 8 }} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '33%' }}>
              <Text style={[defaultStyle.bold_text_14, { marginRight: 16, }]}>{item.playerName}</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '66%' }}>
              <Text style={[defaultStyle.bold_text_10, { color: '#A3A5AE', marginTop: 1 }]}>Term: </Text>
              <Text style={defaultStyle.bold_text_14}>{moment.utc(item.dueDate, 'YYYY-MM-DD').local().format("DD/MM/YYYY")} - </Text>
              <Text style={defaultStyle.bold_text_14}>{moment.utc(item.nextDueDate, 'YYYY-MM-DD').subtract(1, 'days').local().format("DD/MM/YYYY")}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>

            <View style={{ flexDirection: 'row', flex: 1 }}>
              <View style={{ width: "33%" }}>
                <Text style={[defaultStyle.bold_text_10, { color: '#A3A5AE' }]}>Batch Name</Text>
                <Text style={[defaultStyle.bold_text_14, { marginTop: 8 }]}>
                  {item.batchName}
                </Text>
              </View>


              <View style={{ width: "33%", marginLeft: 8 }}>
                <Text style={[defaultStyle.bold_text_10, { color: '#A3A5AE' }]}>Due Date</Text>
                <Text style={[defaultStyle.bold_text_14, { marginTop: 8 }]}>
                  {moment.utc(item.dueDate, 'YYYY-MM-DD').local().format("DD MMM YYYY")}
                </Text>
              </View>

              <View style={{ width: "33%", marginLeft: 8 }}>
                <Text style={[defaultStyle.bold_text_10, { color: '#A3A5AE' }]}>Amount</Text>
                <Text style={[defaultStyle.bold_text_14, { marginTop: 8 }]}>Rs {item.amount}</Text>
                {
                  item.gstApplied &&
                  <Text style={[defaultStyle.bold_text_10, { color: '#A3A5AE' }]}>Gst Inclusive</Text>
                }
              </View>
            </View>

          </View>
          <View>
            <Text style={[defaultStyle.rounded_button, styles.confirmBtn]}
              onPress={() => {
                this.setState({
                  dueData: item,
                  amount: item.amount
                }, () => {
                  this.setModalVisible(true);
                })
              }}>
              Settle Payment
            </Text>
          </View>

        </View>

      </CustomeCard>
    )
  }

  render() {

    if (this.state.paymentDueData == null) {
      return (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#67BAF5" />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>

          <Spinner
            visible={this.state.spinner}
            textStyle={defaultStyle.spinnerTextStyle}
          />


          <View>
            {this.listHeader()}

            <View style={{
              paddingLeft: 14,
              paddingTop: 0,
              paddingBottom: 5,
              paddingRight: 12
            }}>

              <View style={{
                width: '47%',
              }}>

                <Text style={{
                  fontSize: 10,
                  color: '#A3A5AE',
                  fontFamily: 'Quicksand-Regular',
                  paddingLeft: 2,
                }}>
                  Select Batch
                                    </Text>

                <RNPickerSelect style={{
                }}
                  placeholder={placeholder}
                  items={this.state.allBatches}
                  onValueChange={(value) => {
                    this.setState({
                      selectedBatch: value,
                    }, () => {
                      this.getDues();
                    });
                  }}
                  style={pickerSelectStyles}
                  value={this.state.selectedBatch}
                  useNativeAndroidPickerStyle={false}
                  ref={(el) => {
                    this.inputRefs.players = el;
                  }}
                />

                <View style={{
                  width: "100%",
                  backgroundColor: '#C7C7CD',
                  height: 1,
                  marginTop: 2
                }}></View>
              </View>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                marginBottom: 5
              }}>

                <View>
                  <Text style={{
                    fontSize: 10,
                    color: '#A3A5AE',
                    fontFamily: 'Quicksand-Regular',
                    paddingLeft: 2,
                  }}>From Date</Text>
                  <DatePicker
                    style={{ borderWidth: 0, borderBottomWidth: 1, borderBottomColor: '#DFDFDF' }}
                    date={this.state.fromDate}
                    mode="date"
                    placeholder="Select date"
                    format="YYYY-MM-DD"
                    minDate={moment('1920-01-01')}
                    maxDate={moment(Date.now())}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateInput: {
                        marginLeft: -22,
                        borderWidth: 0,
                      },
                      dateText: {
                        fontSize: 14,
                        color: '#A3A5AE',
                        paddingLeft: 0,
                        fontFamily: 'Quicksand-Regular'
                      },
                      placeholderText: {
                        fontFamily: 'Quicksand-Regular',
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(fromDate) => {
                      this.setState({
                        fromDate: fromDate
                      }, () => {
                        this.getDues();
                      })
                    }}
                  />
                </View>

                <View>
                  <Text style={{
                    fontSize: 10,
                    color: '#A3A5AE',
                    fontFamily: 'Quicksand-Regular',
                    paddingLeft: 2
                  }}>To Date</Text>
                  <DatePicker
                    style={{ borderWidth: 0, borderBottomWidth: 1, borderBottomColor: '#DFDFDF' }}
                    date={this.state.toDate}
                    mode="date"
                    placeholder="Select date"
                    format="YYYY-MM-DD"
                    minDate={moment('1920-01-01')}
                    maxDate={moment(Date.now())}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{

                      dateInput: {
                        marginLeft: -22,
                        borderWidth: 0
                      },
                      dateText: {
                        fontSize: 14,
                        color: '#A3A5AE',
                        paddingLeft: 0,
                        fontFamily: 'Quicksand-Regular'
                      },
                      placeholderText: {
                        fontFamily: 'Quicksand-Regular',
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(toDate) => {
                      this.setState({
                        toDate: toDate
                      }, () => {
                        this.getDues();
                      })
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          {this.state.paymentDueData != null && this.state.paymentDueData.length > 0 ?
            <FlatList
              data={this.state.paymentDueData}
              extraData={this.state.paymentDueData}
              renderItem={this._renderItem}
            />
            :
            <View style={styles.noDataOuter}>
              <Text style={defaultStyle.regular_text_14}>No payment due.</Text>
            </View>
          }

          {this.settleDuesModal()}

        </View>
      );
    }

  }

}
const mapStateToProps = state => {
  return {
    data: state.PaymentReducer,
    batchData: state.BatchReducer
  };
};
const mapDispatchToProps = {
  getAcademyPaymentDues, settlePaymentDues, getCoachBatch
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentDues);

const styles = {
  loaderStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7'
  },
  searchOuter: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 16,
    marginBottom: 16,
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
  noDataOuter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardOuter: {
    marginLeft: 12,
    marginRight: 12,
    marginVertical: 16
  },
  rounded_button_half: {
    //width: '70%',
    padding: 10,
    borderRadius: 20,
    //borderWidth: 1,
    marginLeft: 4,
    //marginRight: 4,
    borderColor: '#67BAF5',
    backgroundColor: '#67BAF5',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium'
  },
  confirmBtn: {
    marginTop: 16,
    width: "100%",
    marginLeft: 0,
    marginRight: 0,
    fontFamily: 'Quicksand-Medium',
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
    paddingTop: 20,
    paddingBottom: 0
  },
  modalBox: {
    width: "95%",
    //margin: 16,
    //padding: 16,
    borderRadius: 16,
    backgroundColor: 'white',
    height: 345,
  },
  modalHeadingOuter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 16
  },
  confirmBtnOuter: {
    marginHorizontal: 20,
    marginBottom: 0,
    marginTop: 0
  },
  remarkTextArea: {
    borderColor: "#CECECE",
    borderWidth: 1,
    height: 70,
    width: "100%",
    marginTop: 15,
    marginBottom: 10,
    fontSize: 14,
    padding: 10,
    textAlign: 'left',
    justifyContent: 'flex-start',
    borderRadius: 8,
    fontFamily: 'Quicksand-Regular',
    textAlignVertical: 'top'
  },
  filterPlaceholder: {
    fontSize: 10,
    fontFamily: 'Quicksand-Medium',
    color: '#A3A5AE'
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 8,
    borderColor: '#614051',
    borderRadius: 8,
    color: '#404040',
    fontFamily: 'Quicksand-Regular',
  },
  inputAndroid: {
    fontSize: 14,
    fontFamily: 'Quicksand-Regular',
    borderColor: '#614051',
    borderRadius: 8,
    paddingVertical: 4,
    color: '#404040',
  },
});

const paymentMethodPickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    borderColor: '#D3D3D3',
    borderRadius: 4,
    color: 'black',
    width: 200,
    height: 40,
    marginBottom: 4,
    fontFamily: 'Quicksand-Regular',
    // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    fontFamily: 'Quicksand-Regular',
    borderColor: '#614051',
    borderRadius: 8,
    paddingVertical: 4,
    color: 'black',
    paddingHorizontal: 0,
    width: 115,
  },
});


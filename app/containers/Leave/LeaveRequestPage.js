import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, ActivityIndicator, ScrollView, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';
import SlotRelatedNotes from '../../components/molecules/slotRelatedNotes';
import UserSelectionForSlot from '../../components/molecules/userSelectionForSlot';
import axios from 'axios';
import { getData, storeData } from "../../components/auth";
import CustomAlert from './CustomAlert';
import Loader from '../../components/custom/Loader';
import { Nunito_Regular } from '../util/fonts';
const darkBlueVariant = "#141A2E";


export const LeaveRequestPage = ({navigation}) => {
  const [courtBookingNotes, setCourtBookingNotes] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserPlan, setSelectedUserPlan] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [textInput, setTextInput] = useState('');
  const [dynamicText, setDynamicText] = useState('');
  const [bookdata, setBookdata]= useState(["Coaching Plan", "Playing Membership Plan"]);
  const [bookdataTemp, setBookdataTemp]= useState(["Coaching Plan", "Playing Membership Plan"]);
  const [seluser, setSeluser] = useState(['user1','user 2']);
  const [seluserplan, setSeluserplan] = useState([]);
  const [proficiency, setProficiency] = useState(null);
  const [selectUserId, setSelectUserId] = useState(null);
  const [selectUserPlan, setSelectUserPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState(''); // Declare alertTitle state variable
  const [alertMessage, setAlertMessage] = useState('');
  const [navclose, setNavclose] = useState(() => () => {});

  const isDateRangeValid = () => {
    if (!startDate || !endDate) {
      return false; // Date range is not valid if either start or end date is missing
    }
  
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const timeDifference = endDateObj - startDateObj;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
  
    return daysDifference >= 13;
  };
  const hideAlert = () => {
    setAlertVisible(false);
  };

  function rednav(boolValue) {
    if (boolValue) {
      setSelectedUser(null);
      setSelectedUserPlan(null);
      setStartDate('');
      setEndDate('');
      setTextInput('');
      navigation.goBack(); 
    } else {
        return 0;
    }
}

  const handleSubmit = async () => {
    setLoading(true);
    if (!selectedUser || !selectedUserPlan) {
      setLoading(false);
      // Alert.alert('Missing Information', 'Please select User details.');
      setAlertTitle('Missing Information');
      setAlertMessage('Please select user details.');
      setAlertVisible(true);
      setNavclose(() => () => rednav(false));
      return;
    }
    if (!startDate) {
      setLoading(false);
      // Alert.alert('Missing Information', 'Please select Start date.');
      setAlertTitle('Missing Information');
      setAlertMessage('Please select start date.');
      setAlertVisible(true);
      setNavclose(() => () => rednav(false));
      return;
    }
    if (!endDate) {
      setLoading(false);
      // Alert.alert('Missing Information', 'Please select End date.');
      setAlertTitle('Missing Information');
      setAlertMessage('Please select end date.');
      setAlertVisible(true);
      setNavclose(() => () => rednav(false));
      return;
    }
    if (!isDateRangeValid()) {
      setLoading(false);
      // Alert.alert('Invalid Date Range', 'Please enter valid dates.');
      setAlertTitle('Invalid Date Range');
      setAlertMessage('Please enter valid dates.');
      setAlertVisible(true);
      setNavclose(() => () => rednav(false));
      return;
    }
    if (textInput.length > 250) {
      setLoading(false);
      // Alert.alert('Input Text Limit', 'Input text cannot exceed 250 characters.');
      setAlertTitle('Input Text Limit');
      setAlertMessage('Input text cannot exceed 250 characters.');
      setAlertVisible(true);
      setNavclose(() => () => rednav(false));
      return;
    }
    if (selectedUser && selectedUserPlan && startDate && endDate) {
      let resData;
      const additionalData = textInput;
      const dataToSend = {
        "id" : selectUserId,
        "start_date" : startDate,
        "end_date" : endDate,
        "planType" : selectUserPlan == "Coaching Plan" ? "PLAYSUBSCRIPTION" : "SUBSCRIPTION",
        "additionalDate": additionalData,
        // "name" : selectedUser,
        }
    
      // let response  = await axios.post('https://admin.stage.machaxi.com/node-api/leave-request-checker', (dataToSend));
      try {
        const response = await axios.post('https://admin.stage.machaxi.com/node-api/leave-request-checker', dataToSend);
        resData = (response.data.message);
        // response.data.message
        // console.log("HELLO MACHAXI",response);
        // Handle the response here
      } catch (error) {
        // Handle errors
      }
      // Alert.alert(selectedUser);
      setLoading(false);
      // Alert.alert(
      //   'Leave Request Submitted',
      //   `User: ${selectedUser}\nUser Plan: ${selectedUserPlan}\nStart Date: ${startDate}\nEnd Date: ${endDate}\nReason For Leave: ${additionalData}`,
      //   // [{ text: 'OK' }]
      //   [
      //     {
      //       text: 'OK',
      //       onPress: () => {
      //         // Reset state values to their initial state after the alert is dismissed
      //         setSelectedUser(null);
      //         setSelectedUserPlan(null);
      //         setStartDate('');
      //         setEndDate('');
      //         setTextInput('');
      //         navigation.goBack();
      //         // setLoading(false);

      //       },
      //     },
      //   ]
      // );
      setAlertTitle('Leave Request Submitted');
      setAlertMessage(`User: ${selectedUser}\nUser Plan: ${selectedUserPlan}\nStart Date: ${startDate}\nEnd Date: ${endDate}\nReason For Leave: ${additionalData}\n ${resData}`);
      setAlertVisible(true);
      setNavclose(() => () => rednav(true));
    } else {
      // Alert.alert('Error', 'Please select User and Plan before submitting.');
      setAlertTitle('Invalid Details');
      setAlertMessage('Please select User and Plan before submitting.');
      setAlertVisible(true);
      setNavclose(() => () => rednav(false));
    }
  };

  // Use useEffect to update dynamic text when the selected plan changes
  useEffect(() => {
    if (selectedUserPlan === 'Coaching Plan') {
      setDynamicText(
        'Leave will be considered valid only if it is filled before the break.\n' +
        'Leave can only be applied once in a quarter.\n' +
        'There will be no fee adjustment for leaves of less than 2 weeks. To make up for the missed sessions, we request players to attend extra classes in the same month.'
      );
      const notes = 'Leave will be considered valid only if it is filled before the break.\n' +
        'Leave can only be applied once in a quarter.\n' +
        'There will be no fee adjustment for leaves of less than 2 weeks. To make up for the missed sessions, we request players to attend extra classes in the same month.'

      const lines = notes.split("\n");
      const points = lines.map((line) => line.replace(/^#\s*/, ""));
      setCourtBookingNotes(points);
    } else if (selectedUserPlan === 'Playing Membership Plan') {
      setDynamicText('You will not be able to book any slots during your leave once you submit this leave form.');
      const notes = 'You will not be able to book any slots during your leave once you submit this leave form.'

      const lines = notes.split("\n");
      const points = lines.map((line) => line.replace(/^#\s*/, ""));
      setCourtBookingNotes(points);
    } else {
      setDynamicText('');
      const notes = ''

      const lines = notes.split("\n");
      const points = lines.map((line) => line.replace(/^#\s*/, ""));
      setCourtBookingNotes(points);
    }

  }, [selectedUserPlan]);


  useEffect(() => {
    const relations  = navigation.getParam('relations')
        getData('userInfo', value => {
      userData = (JSON.parse(value))
      const data = []
      if (!userData?.is_learn_enabled) {
        data.push("Coaching Plan")
      }
      if (!userData?.is_play_enabled) {
        data.push("Playing Membership Plan")
      }
  setBookdataTemp(data);
      let parentChild = relations.map(item => {
        return {value: item.user_id, label: item.name, child: true}
      })
      let parentChild2 = parentChild.map(item => {
        return item.label
      })
      // var parentChild = ['user1','user 2']
      parentChild2.push(userData.user['name'])
      parentChild.push({value: userData.user['id'], label: userData.user['name'], child: false})


      // parentChild.push({value: this.parent_user_id, label: userData.user['name']})
    console.log(parentChild)
    setSeluser(parentChild2)
    setSeluserplan(parentChild);
    // setSeluser(['user 1','user 3'])
  })
  }, []);

  return (
    <LinearGradient
      colors={[darkBlueVariant, darkBlueVariant]}
      locations={[0, 1]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, minHeight: '100%' , width: '100%'}}
      
        showsVerticalScrollIndicator={false}>
          {/* {Platform.OS == "android" && <Loader visible={loading} /> } */}
          <Loader visible={loading} />
        <View style={styles.content}>
          <Text style={styles.subtext}>Select User</Text>
          <UserSelectionForSlot
            user={selectedUser}
            data={seluser}
            label={"Select User"}
            reset={selectedUser != null}
            setUserVal={(val) => {
              // if (val == "Coaching Plan") {
              //   setSelectedUserPlan("planA");
              // } else {setSelectedUserPlan("planB");
              // }
              const index = seluser.indexOf(val);
              
              if(index !== -1){
                setSelectUserId(seluserplan[index].value)
                if(seluserplan[index].child){
                  setBookdata(["Coaching Plan" ]);
                }
                else{
                  setBookdata(bookdataTemp);                }
              }
              setSelectedUser(val);
              setSelectUserPlan(null);
            }}
          />
          <Text style={styles.subtext}>Select User Plan</Text>
          <UserSelectionForSlot
            user={selectUserPlan}
            data={bookdata}
            label={"Select User Plan"}
            reset={selectUserPlan != null}
            setUserVal={(val) => {
              setSelectUserPlan(val)
              if (val == "Coaching Plan") {
                setSelectedUserPlan("Coaching Plan");
              } else {setSelectedUserPlan("Playing Membership Plan");
              }
            }}
          />
          {dynamicText ? (
            <SlotRelatedNotes courtBookingNotes={courtBookingNotes} />
          ) : null}

          <Text style={styles.subtext}>Start Date</Text>
          <DatePicker
            style={styles.datePicker}
            date={startDate}
            mode="date"
            placeholder="Select Start Date"
            format="YYYY-MM-DD"
            minDate={new Date().toISOString().split('T')[0]}
            maxDate="2030-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
              dateInput: {
                borderWidth: 0,
                paddingTop: 5,
              },
              placeholderText: {
                color: 'white',
              },
              dateText: {
                color: 'white',
              },
            }}
            onDateChange={(date) => setStartDate(date)}
          />
          <Text style={styles.subtext}>End Date</Text>
          <DatePicker
            style={styles.datePicker}
            date={endDate}
            mode="date"
            placeholder="Select End Date"
            placeholderTextColor="white"
            format="YYYY-MM-DD"
            minDate={
              startDate
                ? new Date(
                  new Date(startDate).getTime() + 13 * 24 * 60 * 60 * 1000
                ).toISOString().split('T')[0]
                : new Date().toISOString().split('T')[0]
            }
            maxDate="2030-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
              dateInput: {
                borderWidth: 0,
              },
              placeholderText: {
                color: 'white',
              },
              dateText: {
                color: 'white',
              },
            }}
            onDateChange={(date) => setEndDate(date)}
          />
          <Text style={styles.subtext}>Reason for Leave</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Optional (Max 250 characters)"
            placeholderTextColor="white"
            multiline
            numberOfLines={5}
            value={textInput}
            onChangeText={(text) => setTextInput(text)}
            maxLength={250}
          />
          <SubmitButton onPress={handleSubmit} title="Submit" style={pickerSelectStyles.buttonContainer} />
          <CustomAlert
              visible={isAlertVisible}
              title={alertTitle}
              message={alertMessage}
              onClose={() => {
                // Execute your logic here before closing the alert
                navclose();// Navigate back after the alert is dismissed
                setAlertVisible(false); // Close the alert
                hideAlert();
              }}
          />

        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    alignItems: 'center',
    width: '85%',
  },
  datePicker: {
    width: 315,
    borderRadius: 25,
    borderColor: "#FCB550",
    color: '#FCB550',
    borderWidth: 1,
    height: 50,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
    padding: 5,
    margin: 10,
    width: 315,
    alignSelf: 'center',
    borderColor: "#FCB550",
    color: "white",
    height: 100,
    // textAlign: 'center',
    paddingTop: Platform.OS === 'android' ? 1 : 40,
  },
  subtext: {
    fontSize: 15,
    fontFamily: "Nunito-SemiBold",
    color: "#E8AC43",
    margin: 10,
  },
  dynamicTextContainer: {
    marginTop: 5,
    marginLeft: 20,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  bullet: {
    fontSize: 20,
    color: 'white',
    marginRight: 5,
  },
  dynamicText: {
    fontSize: 15,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
    marginLeft: 7,
    marginRight: 10,
  },
  boxContainer: {
    width: 250,
    alignSelf: 'center',
    height: 43,
    marginBottom: 20,
  },
  pickerContainer: {
    alignSelf: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: '100%',
    margin: 10,
    borderColor: "#FCB550",
    borderRadius: 26,
    borderWidth: 1,
    height: 43,
  },
  pickerWrapper: {
    borderRadius: 25,
    overflow: 'hidden',
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: "Nunito-SemiBold"
  },
};

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'White',
    borderRadius: 25,
    color: '#FCB550',
    width: '100%',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingLeft: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'White',
    borderRadius: 25,
    color: '#FCB550',
    width: '100%',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingLeft: 10,
  },
  pickerContainerCentered: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FCB550',
    marginLeft: 5,
  },
  buttonContainer: {
    backgroundColor: 'rgba(25, 74, 215, 1)',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 50,
    alignSelf: 'center',
    margin: 20,
  },
};

const SubmitButton = ({ onPress, title, style }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

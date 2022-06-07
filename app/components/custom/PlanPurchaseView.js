import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from "react-native";
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { getData } from "../auth";
import globalStyles from "../../mystyle"
import { getBaseUrl } from '../../containers/BaseComponent';
import SplashScreen from 'react-native-splash-screen';
import { defaultStyle } from '../../containers/BaseComponent';
import { startBatchPayment } from "../../redux/reducers/PaymentReducer"

const PlanPurchaseView = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState();
  const [terms, setTerms] = useState([{ label: "Monthly", value: 1 }, { label: "Quaterly", value: 2 }, { label: "Semi Annually", value: 3 }, { label: "Annually", value: 4 }]);
  const [plansForPicker, setPlansForPicker] = useState([]);
  const [planValidity, setPlanValidity] = useState();

  const [noData, setNoData] = useState();
  const [selectedPlan, setSelectedPlan] = useState();
  const [selectedTerm, setSelectedTerm] = useState();
  const [payableAmount, setPayableAmount] = useState("-");
  const [duration, setDuration] = useState(0);
  const [isTimerCompleted, setIsTimerCompleted] = useState(true);
  useEffect(() => {
    SplashScreen.hide();
    getPlanData()
  }, [])

  useEffect(() => {
    loadPlanData();
  }, [selectedPlan, selectedTerm])

  const startTimer = (timerDuration) => {
    setIsTimerCompleted(false);
    const id = setInterval(() => {
      timerDuration = timerDuration - 1
      setDuration(getTimeInFormat(timerDuration));
      if (timerDuration <= 0) {
        clearInterval(id);
        setIsTimerCompleted(true);
      }
    }, 1000)

  }
  const getTimeInFormat = (duration) => {
    const mins = parseInt(duration / 60)
    const secs = duration % 60
    return mins + ":" + secs;
  }
  
  const getTimeInFormatString = (duration) => {

    const mins = parseInt(duration / 60)
    const secs = duration % 60
    let str = "";
    if (mins > 0)
      str += mins + " Minutes "
    if (secs > 0)
      str += secs + " Seconds";
    return str;
  }

  const getPlanData = async () => {
    setIsLoading(true);
    let response = await fetch(
      getBaseUrl() + "global/batch/" + props.batchId, {
      method: 'GET'
    }
    )

    let json = await response.json();
    setIsLoading(false);

    if (json.plans.length == 0) {
      setNoData(true);
      return;
    }
    setNoData(false);

    setPlans(json.plans);
    let plansForPicker = json.plans.map((item) => {
      return { label: item.name, value: item.id }
    });
    setPlansForPicker(plansForPicker);
    setPlanValidity(json.price_validity);
    if (plansForPicker.length > 0)
      setSelectedPlan(plansForPicker[0].value)

    setSelectedTerm(terms[0].value)
    startTimer(json.price_validity)

  }

  const loadPlanData = () => {
    if (plans && plans.length > 0) {
      for (const item of plans) {
        if (item.id == selectedPlan) {
          let selectedPlanDetails = item;
          let payableData = getTermData(selectedPlanDetails.payable_amount);
          if (payableData)
            setPayableAmount(payableData.amount);
        }
      }
    }
  }

  const getTermData = (payableAmountData) => {
    for (const item of payableAmountData) {
      if (item.term_id == selectedTerm) {
        return item;
      }
    }
  }

  const startPayment = async () => {

    getData("userInfo", async (value) => {
      if (!value) {
        props.onLoginRequired();
      }
      userData = JSON.parse(value);
      const userId = userData.user.id;
      const userName = userData.user.name
      const mobileNumber = userData.user.mobile_number

      getData('header', async (value) => {
        setIsLoading(true);
        props.startBatchPayment(value, { data: { user_id: userId, plan_id: selectedPlan, plan_term: selectedTerm } }).then((myData) => {
          setIsLoading(false);

          if (myData.payload.data.success) {
            const data = myData.payload.data.data;
            props.onStartPayment(data.order_id, data.amount, userId, userName, mobileNumber);
          } else {
            alert(myData.payload.data.error_message)
          }

        })
      });
    });

  }

  return <View style={style.container}>
    
      <TouchableOpacity style={{ width:"100%",justifyContent:"flex-end",  flexDirection:"row"}}
        activeOpacity={.8}
        onPress={() => {
          props.onClosed()}
        }>
        <Image style={{ width: 30, height: 30 }} source={require('../../images/ic_close.png')} />
      </TouchableOpacity>
   
    {isLoading &&
      <View style={{
        flex: 1, width: "100%", justifyContent: "center",
        alignItems: "center"
      }}>
        <ActivityIndicator size="small" color="#EFEFEF" />
        <Text>Loading...</Text>
      </View>

    }
    {noData &&
      <View style={{
        flex: 1, width: "100%", justifyContent: "center",
        alignItems: "center"
      }}>
        <Text>No Plan exists for this Batch.</Text>
      </View>

    }

    {!isLoading && !noData &&
      <View style={{ width: "100%", padding: 10 }}>
        <View style={{ width: "100%" }}>
          <Text style={globalStyles.TextViewLabel}>Select Plan</Text>
          <RNPickerSelect
            placeholder={{}}
            items={plansForPicker}
            onValueChange={(value) => {
              setSelectedPlan(value);
            }}
            style={pickerSelectStyles}
            value={selectedPlan}
            useNativeAndroidPickerStyle={false}

          />
        </View>
        <View style={{ width: "100%" }}>
          <Text style={globalStyles.TextViewLabel}>Select Term</Text>
          <RNPickerSelect
            placeholder={{}}
            items={terms}
            onValueChange={(value) => {
              setSelectedTerm(value);
            }}
            style={pickerSelectStyles}
            value={selectedTerm}
            useNativeAndroidPickerStyle={false}

          />
        </View>
        <View>
          <Text style={style.bold_green_text}>Payable Amount: {payableAmount}</Text>
        </View>
        <View style={style.lineStyle} />
        <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, width: "100%", justifyContent: "space-between" }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>{duration}</Text>
            <Text>This price is valid for {getTimeInFormatString(planValidity)}</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {isTimerCompleted && <TouchableOpacity
              activeOpacity={.8}
              style={[defaultStyle.rounded_button, { width: 100, height: 30 }]}
              onPress={() => {
                getPlanData();
              }}
            >
              <Text style={{ color: "white" }}>Refresh</Text>
            </TouchableOpacity>
            }
            {!isTimerCompleted &&

              <TouchableOpacity
                activeOpacity={.8}
                style={[defaultStyle.rounded_button, { width: 100, height: 30 }]}
                onPress={() => {
                  startPayment();
                }}
              >
                <Text style={{ color: "white" }}>Pay</Text>
              </TouchableOpacity>

            }
          </View>
        </View>
      </View>
    }
  </View>
}
const style = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', width: "100%", padding: 10
  },
  bold_green_text: {
    marginTop: 10,
    color: "#16a83d",
    fontSize: 14,
    fontWeight: "bold",
  },
  lineStyle: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: '#EFEFEF',
    marginTop: 10,
    marginBottom: 10
  }
});
const pickerSelectStyles = StyleSheet.create({
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
    paddingHorizontal: 0,
    paddingVertical: 6,
    fontFamily: 'Quicksand-Regular',
    borderColor: '#614051',
    borderRadius: 8,
    color: 'black',
  },
});

const mapStateToProps = state => {
  return {
    data: state.PaymentReducer,
  };
};
const mapDispatchToProps = {
  startBatchPayment
};
export default connect(mapStateToProps, mapDispatchToProps)(PlanPurchaseView);

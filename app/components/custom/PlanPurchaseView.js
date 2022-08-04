import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  BackHandler, Alert
} from "react-native";
import { Card, } from 'react-native-paper';
import { connect } from 'react-redux';
import { getData } from "../auth";
import globalStyles from "../../mystyle"
import { getBaseUrl } from '../../containers/BaseComponent';
import moment from 'moment';
import { defaultStyle } from '../../containers/BaseComponent';
import { startBatchPayment } from "../../redux/reducers/PaymentReducer"
import ItemSelector from './ItemSelector';
import DatePicker from 'react-native-datepicker';
import LabelValueDisplay from './LabelValueDisplay';
import LabelValueDisplayItem from './LabelValueDisplayItem';
import { SafeAreaView, ScrollView } from 'react-navigation';
import TextDisplay from './TextDisplay';
import RadioSelector from './RadioSelector';
import AddNewPlayerSection from './AddNewPlayerSection';
import {submitPaymentConfirmation} from "../../redux/reducers/PaymentReducer"
import RazorpayCheckout from 'react-native-razorpay';
import  { getPaymentKey,getRazorPayEmail } from '../../containers/BaseComponent';
import Events from "../../router/events";
var timerId=""
var isCalendarOpen=false
const PlanPurchaseView = (props) => {

  const [selectedBatchId, setSelectedBatchId] = useState();
  const [termsAndConditions, setTermsAndConditions] = useState('-');
  const [userInfo, setUserInfo] = useState();
  const [childrenData, setChildrenData] = useState([]);
  const [academy, setAcademy] = useState();
  const [batch, setbatch] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isTCExpanded, setIsTCExpanded] = useState(false);
  const [dateOfJoining, setDateOfJoining] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [plans, setPlans] = useState();
  const [terms, setTerms] = useState([{ label: "Monthly", value: 1 }, { label: "Quarterly", value: 2 }, { label: "Semi Annually", value: 3 }, { label: "Annually", value: 4 }]);
  const [plansForPicker, setPlansForPicker] = useState([]);
  const [planValidity, setPlanValidity] = useState();

  const [noData, setNoData] = useState();
  const [selectedPlan, setSelectedPlan] = useState({label:'-', value:'-1'});
  const [selectedTerm, setSelectedTerm] = useState({label:'-', value:'-1'});
  const [payableAmount, setPayableAmount] = useState("-");
  const [duration, setDuration] = useState(0);
  const [isTimerCompleted, setIsTimerCompleted] = useState(true);
  const [priceBreakUp, setPriceBreakUp] = useState([]);
  const [applicablePlanId, setApplicablePlanId] = useState();
  const [selectedPlayer, setSelectedPlayer] = useState({ id:'-1'});
  const [isAddingNewPlayer, setIsAddingNewPlayer] = useState(false);

  const [dataForPurchaseApi, setDataForPurchaseApi] = useState({});

  const [playerForSubscription, setPlayerForSubscription] = useState({});

  
  const scrollViewRef = useRef();
  getPageTitle = () => {
    if (currentPage == 1)
      return 'Subscription Plan';

    if (currentPage == 2)
      return 'Player Details';

    if (currentPage == 3)
      return 'Subscription Confirmation';
  }

  useEffect(() => {
    setAcademy(props.navigation.getParam('academy'));
    setbatch(props.navigation.getParam('batchDetails'));
    setSelectedBatchId(props.navigation.getParam('selectedBatchId'));
    setDateOfJoining(moment(new Date()).format("DD-MMM-YYYY"));
    
    getUserInfo();
    const backAction = () => {
      onBackClicked();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();

  }, [])

  useEffect(() => {
    getPlanData()
  }, [selectedBatchId])

  useEffect(() => {
    if(!isAddingNewPlayer)
    {
      setPlayerForSubscription({player_user_id:selectedPlayer.user_id, name:selectedPlayer.name, gender:selectedPlayer.gender, parentName:getParentName() })
    }
    }, [selectedPlayer])

  useEffect(()=>{
    if(!isAddingNewPlayer){
      if(isParent(userInfo)){
        if(childrenData.length>0)
          setSelectedPlayer(childrenData[0])
      }
    }
  },[isAddingNewPlayer])

  useEffect(() => {
    getPlanData()
  },[dateOfJoining])

  useEffect(() => {
    loadPlanData();
  }, [selectedPlan, selectedTerm])

  useEffect(()=>{
    if(isTCExpanded){
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  },[isTCExpanded])

  useEffect(()=>{
  }, [playerForSubscription])

  getUserInfo=()=>{
    getData('userInfo', (value) => {
        let userData = JSON.parse(value);
        setUserInfo(userData);
        if(isParent(userData)){
          getData('childrenData', (value) => {
            let childrenData = JSON.parse(value);
            let uniqueChildrenData = getUniqueChildrenData(childrenData);
            setChildrenData(uniqueChildrenData);
    
            if(uniqueChildrenData.length>0)
              setSelectedPlayer(uniqueChildrenData[0]);
        });
        }else{
          //User is a Player
          setPlayerForSubscription({user_id: userData.user.id, name:userData.user.name, gender: userData.user.genderType })
          
        }
    });
    
}
  const isPlayerExists =(player, playerArray)=>{
    for(var i=0;i<playerArray.length;i++){
      if(playerArray[i].user_id == player.user_id)
        return true;
    }
    return false;
  }
  const getUniqueChildrenData =(data)=>{
    let items =[];
    for(var i=0;i<data.length;i++){
      if(!isPlayerExists(data[i], items))
        items.push(data[i]);
    }
    
    return items;
  }
  const isParent =(userData)=>{
    if(userData && userData.user.user_type=="FAMILY")
      return true;
  }
  const isPlayer =(userData)=>{
    if(userData && userData.user.user_type=="PLAYER")
      return true;
  }
  const isGuest =(userData)=>{
    if(userData && userData.user.user_type=="GUEST")
      return true;
  }
  const getParentName = ()=>{
    if(userInfo)
      if(isParent(userInfo))
        return userData.user.name;
      else
        return "-";
  }

  const startTimer = (timerDuration) => {
    setIsTimerCompleted(false);
    clearInterval(timerId);
    timerId = setInterval(() => {
      timerDuration = timerDuration - 1
      if(!isCalendarOpen){
        setDuration(getTimeInFormatString(timerDuration));
      }
      if (timerDuration <= 0) {
        clearInterval(timerId);
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
    const hrs = parseInt(duration / (3600))
    duration = duration % 3600;
    const mins = parseInt(duration / 60)
    const secs = duration % 60
    let str = "";
    if (hrs > 0)
      str += hrs + " Hrs : "
    str += mins + " mins : " + secs + " sec";
    return str;
  }

  const getPlanData = async () => {
    if (selectedBatchId && dateOfJoining) {
      const requiredDateFormatted = moment(dateOfJoining,"DD-MMM-YYYY").format("YYYY-MM-DD");
      setIsLoading(true);
      let response = await fetch(
        getBaseUrl() + "global/batch/" + selectedBatchId + "/?join_date=" + requiredDateFormatted, {
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
      setTermsAndConditions(json.termsAndCondition);
      setPlans(json.plans);
      let plansForPicker = json.plans.map((item) => {
        return { label: item.name, value: item.name }
      });
      setPlansForPicker(plansForPicker);
      setPlanValidity(json.price_validity);
      //setPriceBreakUp(json.)
      if (plansForPicker.length > 0)
        setSelectedPlan(plansForPicker[0])

      setSelectedTerm(terms[0])
      startTimer(json.price_validity)
    }

  }

  const loadPlanData = () => {
    if (plans && plans.length > 0) {
      for (const item of plans) {
        if (item.name == selectedPlan.value) {
          let selectedPlanDetails = item;
          let payableData = getPayableAmountDetails(selectedPlanDetails.payable_amount);
          if (payableData) {
            setApplicablePlanId(payableData.id);
            setPriceBreakUp(payableData.break_up);
            setPayableAmount(payableData.amount);
          }
        }
      }
    }
  }

  const getPayableAmountDetails = (payableAmountData) => {
    for (const item of payableAmountData) {
      if (item.term_id == selectedTerm.value) {
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

      const postData = {plan_id: applicablePlanId}
      const requiredDateFormatted = moment(dateOfJoining,"DD-MMM-YYYY").format("YYYY-MM-DD");
      postData["join_date"] = requiredDateFormatted;
      if(isParent(userData)){
        postData["user_id"] = userData.user.id
        if(playerForSubscription.player_user_id){
          postData["player_user_id"] = playerForSubscription["player_user_id"];
        }else{
          postData["parent_name"] = playerForSubscription.parentName;
          postData["player_name"] = playerForSubscription.name;
          postData["gender"] = playerForSubscription.gender.toUpperCase();
        }
      }
      else if(isPlayer(userInfo)){
        postData["user_id"] = userData.user.id
      }else{
        postData["user_id"] = userData.user.id
        postData["parent_name"] = playerForSubscription.parentName;
        postData["player_name"] = playerForSubscription.name;
        postData["gender"] = playerForSubscription.gender.toUpperCase();
      }

      getData('header', async (value) => {
        setIsLoading(true);
        props.startBatchPayment(value, { data: postData}).then((myData) => {
          setIsLoading(false);

          if (myData.payload.data.success) {
            const data = myData.payload.data.data;

            handleOnStartPayment(data.order_id, data.amount, userId, userName, mobileNumber);
          } else {
            alert(myData.payload.data.error_message)
          }

        })
      });
    });

  }
  const onPlayerSelected = (item)=>{
    setSelectedPlayer(item);
  }

  const onPlanSelected = (item) => {
    setSelectedPlan(item);
  }
  const onTermSelected = (item) => {
    setSelectedTerm(item);
  }
  const onBackClicked = () => {
    if (currentPage == 1)
      props.navigation.goBack();
    else
    {
      if(!isPlayer(userData))
        setCurrentPage(currentPage - 1);
      else
        setCurrentPage(1);
    }
      
  }

  const handleOnStartPayment=(orderId, amount, userId, userName, mobileNumber)=>{
   // this.RBSheet.close()
    var options = {
      description: "Payment for Subscription",
      currency: 'INR',
      key: getPaymentKey(),
      amount: amount*100,
      name: 'Machaxi',
      prefill: {
          email: getRazorPayEmail(),
          contact: mobileNumber,
          name: userName
      },
      theme: { color: '#67BAF5' }
    }

    RazorpayCheckout.open(options).then((data) => {
      // handle success
      let payment_details = {
          razorpay_payment_id: data.razorpay_payment_id
      }
      submitPaymentConfirmation(orderId, amount, payment_details)
  }).catch((error) => {
      console.log('Razor Rspo ', JSON.stringify(error))
      alert('Payment could not succeed. Please try again.')
  });
}

const submitPaymentConfirmation=(orderId, amount, paymentDetails)=>{
  getData('header', async (value) => {
    let postData = {data:{due_order_id:orderId, amount, payment_details:paymentDetails}}
    props.submitPaymentConfirmation(value,postData).then((result)=>{
      result = result.payload.data;
      if(result.success){
        Events.publish('PROFILE_REFRESH');
        alert(result.success_message);
      }else{
        alert(result.error_message);
      }
    });
  });
    
}
  const handleOnNewPlayerInfoChanged =(item)=>{
    if(isAddingNewPlayer){
      if(isParent(userInfo)){
        setPlayerForSubscription({...item, parentName:getParentName()}); 
      }
    }

    if(!isParent(userInfo))
    {
      setPlayerForSubscription(item);
    }
  }

  const renderHeader = () => {

    return <SafeAreaView style={{ width: '100%' }}>
      <Card style={{ flexDirection: 'row', width: '100%', alignItems: "baseline", alignContent: "flex-end", height: 40 }}>
        <Text style={{ ...globalStyles.LabelBig, position: 'absolute', left: 0, top: 13, width: '100%', textAlign: "center", }}>{getPageTitle()}</Text>
        <TouchableOpacity
          activeOpacity={.8}
          style={{ padding: 10, marginLeft: 12, marginTop: 2 }}
          onPress={onBackClicked}
        >

          <Image
            resizeMode="contain"
            source={require('../../images/go_back_arrow.png')}
            style={{ width: 20, height: 16 }}
          />
        </TouchableOpacity>

      </Card>
    </SafeAreaView>
  }

  const renderCurrentPage = () => {
    if (currentPage == 1)
      return renderPage1();

    if (currentPage == 2)
      return renderPage2();

    if (currentPage == 3)
      return renderPage3();

    return null;
  }

  const onTCTogglerPressed = ()=>{
    setIsTCExpanded(!isTCExpanded);
  }

  const renderPage1 = () => {
    return (<View>
      <View style={{ width: "100%", marginBottom: 20 }}>
        <Text style={globalStyles.TextViewLabel}>Select Plan</Text>
        <ItemSelector data={plansForPicker} selectedItem={selectedPlan.value} onItemSelected={onPlanSelected} />
      </View>
      <View style={{ width: "100%", marginBottom: 20 }}>
        <Text style={globalStyles.TextViewLabel}>Select Term</Text>
        <ItemSelector data={terms} selectedItem={selectedTerm.value} onItemSelected={onTermSelected} />
      </View>

      <View style={{ width: "100%", marginBottom: 20 }}>
        <Text style={globalStyles.TextViewLabel}>Date of Joining</Text>
      
        <DatePicker
          textStyle={defaultStyle.regular_text_14}
          style={[defaultStyle.regular_text_14, { width: 120, borderWidth: 0 }]}
          date={dateOfJoining}
          mode="date"
          placeholder="select date"
          format="DD-MMM-YYYY"
          // minDate={Date.now()}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          onOpenModal={()=>{isCalendarOpen=true;}}
          onCloseModal={()=>{isCalendarOpen=false;}}
          customStyles={{

            dateInput: {
              borderWidth: 0,
              fontSize: 14,
              color: '#404040',
              fontFamily: 'Quicksand-Regular',
              borderBottomWidth: 1,
              borderBottomColor: '#A3A5AE'
            }
          }}
          onDateChange={(selectedDate) => {
            setDateOfJoining(selectedDate);
          }}
        />
      </View>

      <View style={{ width: "100%" }}>
        <Text style={globalStyles.TextViewLabel}>Price</Text>
        <LabelValueDisplay data={priceBreakUp} />
      </View>
    </View>);
  }

  const renderPage2 = () => {
    if(isParent(userInfo)){
    return (
      <View>
        <TextDisplay label="Parent Name" value={getParentName()}/>
        <View style={globalStyles.lineStyle}/>
        <Text style={globalStyles.LabelBig} >Select Player</Text>
        <RadioSelector data={childrenData}  selectedItem={!isAddingNewPlayer?selectedPlayer.id:'-1'} onItemSelected={onPlayerSelected}/>
        <AddNewPlayerSection visible={isAddingNewPlayer} data={playerForSubscription} onAddNewPlayerClicked={handleOnAddNewPlayerClicked} onAddNewPlayerCancelledClicked={handleOnAddNewPlayerCancelledClicked} onChange={handleOnNewPlayerInfoChanged}/>
      </View>
      );
    }
    if(isGuest(userInfo)){
      return (
        <View>
          <AddNewPlayerSection visible={true} isParentFieldRequired={true} isForGuestUser={true} data={playerForSubscription} onChange={handleOnNewPlayerInfoChanged}/>
        </View>
        );;
    }
    return null
  }

  const renderPage3 = () => {
    return (
      <View>
      <Text style={globalStyles.LabelBig} >Player Details</Text>
      <TextDisplay label="Parent Name" value={playerForSubscription.parentName}/>
      <View style={{flexDirection:'row'}}>
        <TextDisplay label="Player Name" value={playerForSubscription.name}/>
        <TextDisplay label="Player Gender" value={playerForSubscription.gender}/>
      </View>
      <View style={globalStyles.lineStyle}/>

      <Text style={globalStyles.LabelBig} >Coaching Details</Text>
      
      <View style={{flexDirection:'row'}}>
        <TextDisplay label="Centre Name" value={academy.name}/>
        <TextDisplay label="Sport" value={getSelectedBatchSport()}/>
      </View>
      <View style={{flexDirection:'row'}}>
        <TextDisplay label="Batch Name" value={batch.batch_name}/>
      </View>
      <View style={{flexDirection:'row'}}>
        <TextDisplay width="100%" label="Batch Schedule" value={getBatchOperations()} isSmall={true}/>
      </View>
      <View style={{flexDirection:'row'}}>
        <TextDisplay label="Session Plan" value={selectedPlan.label}/>
        <TextDisplay label="Term" value={selectedTerm.label}/>
      </View>
      <View style={{flexDirection:'row'}}>
        <TextDisplay label="Date of Joining" value={dateOfJoining}/>
      </View>

      <View style={globalStyles.lineStyle}/>

      <Text style={globalStyles.LabelBig}>Payment Details</Text>
      <LabelValueDisplay data={priceBreakUp} />

      <View style={globalStyles.lineStyle}/>

      <View style={{flexDirection:'row', justifyContent:"space-between", marginBottom:10}}>
        <Text style={globalStyles.LabelBig}>Terms & Conditions</Text>
        <TouchableOpacity onPress={onTCTogglerPressed}>
          <Image
                resizeMode="contain"
                source={isTCExpanded?require('../../images/expanded_icon.png'):require('../../images/col_icon.png')}
                style={{ width: 20, height: 16, marginRight:15 }}
              />
        </TouchableOpacity>
      </View>
      { isTCExpanded?
        <Text style={globalStyles.LabelSmall}>{termsAndConditions}</Text>:null
      }

    </View>
    );
  }

  const handleOnAddNewPlayerClicked =()=>{
    setIsAddingNewPlayer(true);
  }

  const handleOnAddNewPlayerCancelledClicked =()=>{
    setIsAddingNewPlayer(false);
  }

  const getSelectedBatchSport =()=>{
      const sports = academy.sports;
      for(let i=0;i< sports.length;i++)
      {
        if (sports[i].sport_id = batch.sport_id)
          return sports[i].name;
      }
    
      return "";

  }

  const getBatchOperations =()=>{
    let str="";
    const operations = batch.operations;
    if(operations.weekend){
        str = str + operations.weekend.start_time + " - " + operations.weekend.end_time;
        str = str + " :- "+getDaysFromOperations(operations.weekend.days);
        if(operations.weekday)
          str=str+"\n";
    }
    if(operations.weekday){
      str = str + operations.weekday.start_time + " - " + operations.weekday.end_time;
      str = str + " :- "+getDaysFromOperations(operations.weekday.days);
  }
    return str;
  }

  const getDaysFromOperations = (data)=>{
    let str ="";
    for(let i=0;i<data.length;i++)
      str = str + data[i] + ", ";
    
    str = str.substring(0,str.length-2);
    return str;
  }

  const validatePlayerDetails =()=>{
    if(!playerForSubscription)
    {
      alert('Player details not found!!!')
      return false;
    }

    if(!playerForSubscription.name || playerForSubscription.name==""){
      alert('Name cannot be empty.')
      return false;
    }
    if(!playerForSubscription.gender || playerForSubscription.gender==""){
      alert('Gender cannot be empty.')
      return false;
    }

    if(isGuest(userInfo) && (!playerForSubscription.parentName || playerForSubscription.parentName=="")){
      alert('Parent Name cannot be empty.')
      return false;
    }
    
    return true;
  }
  return <View style={style.container}>
    {renderHeader()}

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

    {(!isLoading && !noData) ?
      <View style={{ width: "100%", flex: 1, justifyContent: "space-between" }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal:20, marginVertical:20}} ref={scrollViewRef}
      >
          {renderCurrentPage()}
        </ScrollView>

        <Card style={{
          borderRadius: 1,
          elevation: 2,
          shadowOpacity: 0.32,
          shadowOffset: { width: 0, height: 1, borderBottomRadius: 0 }, width: '100%', bottom: 0, padding: 10
        }}>
          <View>
            <LabelValueDisplayItem data={{ label: "Payable Amount:", value: payableAmount }} isBigDisplay={true} />

            <Text style={{ ...globalStyles.TextViewLabel, color: "#979797", textAlign: "center", marginTop: 20 }}>This price is valid for <Text style={{ justifyContent: "center", textAlign: "center", color: "#27AE60" }}>{duration}</Text> as per this date of joining.</Text>

            {isTimerCompleted && <TouchableOpacity
              activeOpacity={.8}
              style={[defaultStyle.rounded_button, { width: "100%", marginTop: 30, marginBottom: 10 }]}
              onPress={() => {
                getPlanData();
              }}
            >
              <Text style={{ color: "white" }}>Refresh</Text>
            </TouchableOpacity>
            }
            {(!isTimerCompleted && currentPage < 3) ?

              <TouchableOpacity
                activeOpacity={.8}
                style={[defaultStyle.rounded_button, { width: "100%", marginTop: 30, marginBottom: 10 }]}
                onPress={() => {
                  if(!isPlayer(userData))
                  {
                    if(currentPage==2 && !validatePlayerDetails())
                        return;
                    setCurrentPage(currentPage + 1)
                  }
                  else{
                      setCurrentPage(currentPage + 2)
                  }
                }}
              >
                <Text style={{ color: "white" }}>Next</Text>
              </TouchableOpacity>
              : null
            }
            {(!isTimerCompleted && currentPage == 3) ?

              <TouchableOpacity
                activeOpacity={.8}
                style={[defaultStyle.rounded_button, { width: "100%", marginTop: 30, marginBottom: 10 }]}
                onPress={() => {
                  startPayment();
                }}
              >
                <Text style={{ color: "white" }}>Pay</Text>
              </TouchableOpacity>
              : null
            }

          </View>
        </Card>
      </View>
      : null
    }
  </View>
}

const style = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', width: "100%",
  },
  bold_green_text: {
    marginTop: 10,
    color: "#16a83d",
    fontSize: 14,
    fontWeight: "bold",
  },
  lineStyle: {
    width: "100%",
    borderWidth: 0.8,
    borderColor: '#EFEFEF',
    marginTop: 10,
    marginBottom: 10
  }
});

const mapStateToProps = state => {
  return {
    data: state.PaymentReducer,
  };
};
const mapDispatchToProps = {
  startBatchPayment, submitPaymentConfirmation
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanPurchaseView);

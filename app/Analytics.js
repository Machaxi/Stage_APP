import analytics from '@react-native-firebase/analytics';

export const logEvent=(name, data)=>{
    analytics().logEvent(name, data);
}
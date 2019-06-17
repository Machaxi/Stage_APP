import AsyncStorage  from '@react-native-community/async-storage';//"react-native";

export const USER_KEY = "auth-login-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
export const getData = async (key, callback) => {
    try {

        const value = await AsyncStorage.getItem(key);
        //console.log("GetData", key + " : " + value)
        if (value !== null) {
            callback(value)
        }else{
            callback('')
        }
    } catch (error) {
        //console.log("GetData", key + " Error " + error)
        callback('')
    }
};
export const storeData = async (key, value) => {
    try {
        //console.log("AppStorage", key + " : " + value)
        await AsyncStorage.setItem(key, value + "");
    } catch (error) {
// Error saving data
    }
};
export const clearData = async () => {
    try {
        const value = await AsyncStorage.clear();
    } catch (error) {
        //console.log("GetData", key + " Error " + error)
    }
};

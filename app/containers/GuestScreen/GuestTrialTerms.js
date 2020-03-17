import React from 'react'

import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { SkyFilledButton } from '../../components/Home/SkyFilledButton';
import LinearGradient from 'react-native-linear-gradient';


class GuestTrialTerms extends BaseComponent {

  static navigationOptions = ({ navigation }) => {

    return {
      headerTitle: (
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          flex: 1,
        }}>
          <Text
            style={{
              fontFamily: 'Quicksand-Bold',
              fontSize: 16,
              color: '#030303', letterSpacing: 5,
            }}>{'MACHAXI'}</Text></View>
      ),
      headerStyle: {
        borderBottomWidth: 0, elevation: 0, backgroundColor: '#A1DFFF'
      },
    };

  };


  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <View style={styles.mainContainer}>
        {/* <View style={styles.mainContainer}> */}
        {/* <LinearGradient locations={[0.17, 0.97]} colors={['#A1DFFF', '#F4F4F4']}> */}
        <ScrollView>
          <LinearGradient locations={[0.17, 0.97]} colors={['#A1DFFF', '#F4F4F4']} style={{ padding: 40 }} useAngle angle={194}>
            <Image resizeMode='contain' style={{
              position: 'absolute',
              top: '30%',
              left: '67%',
              right: 0,
              bottom: 0,
            }}
              source={require('../../images/dots.png')}
            ></Image>
            <View>
              <Text style={{ fontFamily: 'Nunito-ExtraBold', fontSize: 18, color: '#000000' }}>The Fitminton Style!</Text>
              <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 18, color: '#3E3E3E' }}>membership benefits</Text>
            </View>
            <View style={{ width: '13%', height: 2, backgroundColor: '#67BAF5', marginTop: 10 }}>
            </View>

            <View style={{
              backgroundColor: '#F5F5F5', marginTop: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 5, shadowColor: 'black', elevation: 4, shadowRadius: 15,
              shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 10, alignItems: 'center' }}>
                <Text style={{ paddingLeft: 10, fontFamily: 'Nunito-SemiBold', fontSize: 15, color: '#3E3E3E' }}>
                  Fitminton sale is live.
                  </Text>
                <Text style={{ paddingRight: 10, fontFamily: 'Nunito-Bold', fontSize: 15, color: '#FF3A6A' }}>
                  {" Flat 50% off"}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', paddingBottom: 10, paddingTop: 2 }}>
                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 15, color: '#3E3E3E' }}>
                  {"(Starting from: "}
                </Text>
                <Text style={{ textDecorationLine: 'line-through', color: '#AAAAAA', fontFamily: 'Nunito-SemiBold', fontSize: 15, }}>
                  4000
                </Text>
                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 15, color: '#3E3E3E' }}>
                  {" 2000)"}
                </Text>
              </View>

            </View>

            <View>

              <View style={{ marginTop: 15, width: '80%' }}>
                <View style={{}}>
                  <Text style={{ color: 'white', fontFamily: 'Nunito-SemiBold', fontSize: 72, opacity: 0.33 }}>
                    01
                </Text>
                </View>
                <View style={{ paddingLeft: 28, marginTop: -33 }}>
                  <Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Nunito-Bold', color: '#000000' }}>
                      Machaxi is India's first fitminton programme:
                  </Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Nunito-Regular', color: '#3E3E3E' }}>
                      {" Master badminton and fitness like never before"}
                    </Text>
                  </Text>
                </View>
              </View>

              <View style={{ marginTop: 20, width: '85%', alignSelf: 'flex-end' }}>
                <View style={{}}>
                  <Text style={{ color: 'white', fontFamily: 'Nunito-SemiBold', fontSize: 72, opacity: 0.33 }}>
                    02
                </Text>
                </View>
                <View style={{ paddingLeft: 28, marginTop: -33 }}>
                  <Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Nunito-Bold', color: '#000000' }}>
                      Everybody needs a break:
                  </Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Nunito-Regular', color: '#3E3E3E' }}>
                      {" Attend sessions whenever you want and still not miss any fun"}
                    </Text>
                  </Text>
                </View>
              </View>

              <View style={{ marginTop: 10, width: '85%' }}>
                <View style={{}}>
                  <Text style={{ color: 'white', fontFamily: 'Nunito-SemiBold', fontSize: 72, opacity: 0.33 }}>
                    03
                </Text>
                </View>
                <View style={{ paddingLeft: 28, marginTop: -33 }}>
                  <Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Nunito-Bold', color: '#000000' }}>
                      Forget boring dumbbells:
                  </Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Nunito-Regular', color: '#3E3E3E' }}>
                      {" Master trainer led energy packed fitminton sessions"}
                    </Text>
                  </Text>
                </View>
              </View>

              <View style={{ marginTop: 10, width: '85%', alignSelf: 'flex-end' }}>
                <View style={{}}>
                  <Text style={{ color: 'white', fontFamily: 'Nunito-SemiBold', fontSize: 72, opacity: 0.33 }}>
                    04
                </Text>
                </View>
                <View style={{ paddingLeft: 28, marginTop: -33 }}>
                  <Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Nunito-Bold', color: '#000000' }}>
                      Smash your opponents:
                  </Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Nunito-Regular', color: '#3E3E3E' }}>
                      {" Enjoy the benefits of a referee guided daily matches"}
                    </Text>
                  </Text>
                </View>
              </View>

              <View style={{ marginTop: 10, width: '85%' }}>
                <View style={{}}>
                  <Text style={{ color: 'white', fontFamily: 'Nunito-SemiBold', fontSize: 72, opacity: 0.33 }}>
                    05
                </Text>
                </View>
                <View style={{ paddingLeft: 28, marginTop: -33 }}>
                  <Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Nunito-Bold', color: '#000000' }}>
                      Always come prepared:
                  </Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Nunito-Regular', color: '#3E3E3E' }}>
                      {" Know everything about today’s session even before attending it"}
                    </Text>
                  </Text>
                </View>
              </View>

              <View style={{ marginTop: 10, width: '85%', alignSelf: 'flex-end', marginBottom: 80 }}>
                <View style={{}}>
                  <Text style={{ color: 'white', fontFamily: 'Nunito-SemiBold', fontSize: 72, opacity: 0.33 }}>
                    06
                </Text>
                </View>
                <View style={{ paddingLeft: 28, marginTop: -33 }}>
                  <Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Nunito-Bold', color: '#000000' }}>
                      Monitor your progress:
                  </Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Nunito-Regular', color: '#3E3E3E' }}>
                      {" Track your on-court progress and compare your skills with your friends as you progress"}
                    </Text>
                  </Text>
                </View>
              </View>


            </View>
            {/* <View style={{ alignSelf: 'flex-end', flexDirection: 'row', margin: 12}}>
            <View style={{ width: "100%" }}>
            <Text style={{
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: 'Quicksand-Regular', fontSize: 14
                  }}>Book trial session</Text>
            </View>
          </View> */}
          </LinearGradient>
        </ScrollView>
        {/* <View style={{ alignSelf: 'flex-end', flexDirection: 'row', margin: 12}}>
              <View style={{ width: "100%" }}>
                  <TouchableOpacity style={{borderRadius: 24, backgroundColor: 'red'}}
                    onPress={() => {
                      this.props.navigation.navigate('SaveGuestTrial')
                    }}
                  > <Text
                  style={{
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: 'Quicksand-Regular', fontSize: 14
                  }}>
                  Book trial session</Text></TouchableOpacity>
              </View>
          </View> */}

        {/* <View style={{ alignSelf: 'flex-end', flexDirection: 'row', margin: 12}}> */}


        {/* <LinearGradient colors={['rgba(84,73,120,1)', 'rgba(28,20,56,1)']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} useAngle angle={180} style={{flex: 1}} > */}

        {/* <LinearGradient style={{
          flexDirection: 'column',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0, alignItems: 'center', paddingTop: 150, paddingBottom: 30, justifyContent: 'center', alignSelf: 'center'
        }} colors={['rgba(255, 255, 255, 0)', '#ffffff']} locations={[0.28, 0.78]}> */}

        <ImageBackground resizeMode='contain' style={{
          flexDirection: 'column',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: -14, alignItems: 'center',
          justifyContent: 'center', alignSelf: 'center',
          height: 130,
          width: '100%'
        }}
          source={require('../../images/Rectangle.png')}
        >

          <LinearGradient colors={['#FF3A99', '#FF3A6A']} locations={[0, 1]} useAngle angle={255} style={{
            borderRadius: 24, shadowColor: 'rgba(0, 0, 0, 0.2)', elevation: 4, shadowRadius: 9,
            shadowOpacity: 0.08, shadowOffset: { width: 0, height: 3 }
          }}>

            <TouchableOpacity style={{
              width: 172,
              padding: 10,
              height: 40
            }}
              onPress={() => {
                this.props.navigation.navigate('SaveGuestTrial')
              }}>
              <Text style={{
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Quicksand-Regular', fontSize: 14
              }}>Book trial session</Text>
            </TouchableOpacity>

          </LinearGradient>


          <View style={{ marginTop: 5, textAlign: 'center', }}>
            <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 14, color: '#3E3E3E' }}>For all age groups</Text>
          </View>
        </ImageBackground>
        {/* </LinearGradient> */}

        {/* <View style={{ width: '100%',   }}>

              <TouchableOpacity style={{borderRadius: 24,width: 172,  alignSelf: 'center', margin: 12,
             padding: 10,
             backgroundColor: '#67BAF5',
             height: 40,
             }}
                onPress={() => {
                  this.props.navigation.navigate('SaveGuestTrial')
                }}>
                  <Text style={{
                      color: 'black',
                      textAlign: 'center',
                      fontFamily: 'Quicksand-Regular', fontSize: 14
                  }}>Book trial session</Text>
              </TouchableOpacity>

            </View> */}
        {/* </View> */}

        {/* </LinearGradient> */}
        {/* </View> */}
        {/* <View
                    style={{
                        alignSelf: 'flex-end',
                        flexDirection: 'row',
                        margin: 12,
                    }}>
                    <View style={{
                        width: "100%"
                    }}>
                        <SkyFilledButton
                            onPress={() => {
                                this.props.navigation.navigate('AcademyListing', {
                                    book_court: true,
                                    title: 'Book and Play',
                                    show_back: true
                                })
                            }}
                        >Book and Play</SkyFilledButton>
                    </View>
                </View>  */}

      </View >
    );
  }
}
export default GuestTrialTerms;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    //padding: 40,
  },
  padding_5: {
    paddingLeft: 5
  },
  mainHeading: {
    color: '#404040',
    fontFamily: 'Quicksand-Bold',
    fontSize: 20
  },
  subHeadingView: {
    marginTop: 17,
    marginBottom: 15
  },
  listOuter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  listElement: {
    flexDirection: 'row',
    width: '50%'
  },
  imgOuter: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20
  },
  imgStyle: {
    width: 115,
    height: 125
  },
  btnStyle: {
    marginTop: 30
  }
});

import * as React from 'react';
import { Text, View, StyleSheet, Image, ReactNativeHapticFeedback, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import BaseComponent, { defaultStyle } from '../BaseComponent'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { data } from './TestData'

const FAKE_PERSON_OBJECT = (i) => ({
  id: Math.floor(Math.random() * 10000),
  name: 'Item ' + i
});

const NUMBER_TO_RENDER = 20;

const testData = [...new Array(NUMBER_TO_RENDER)].map((e, i) => FAKE_PERSON_OBJECT(i))

const RenderCount = {};

testData.forEach((item, index) => {
  RenderCount[`Item${index}`] = 0;
});

// class Item extends React.PureComponent {
//   render() {
//     console.log('pure render')
//     return <View style={styles.cardStyle}>
//       <Text>{this.props.name}</Text>
//     </View>
//   }
// }

export default class App extends BaseComponent {


  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      data: [],
      allowScroll: true
    }
    this.state.data = data
    console.log('Data->', JSON.stringify(data))
  }

  renderItem = ({ item, index }) => {
    //RenderCount[`Item${index}`] += 1;
    //console.warn(item, index);

    return (
      // <Item name={item.name} />

      <View>

        {item != null ?
          <View>


            <View style={{
              flexDirection: 'row'
            }}>
              {this.state.data[index - 1] != null ?
                <View style={{
                  height: 3,
                  width: 40,
                  backgroundColor: "#758272"
                }}></View>
                : <View style={{
                  height: 3,
                  width: 40,
                  //backgroundColor: "#758272"
                }}></View>
              }

              <View style={{
                width: 2,
                height: 12,
                backgroundColor: "#758272"
              }}></View>

              <View style={{
                height: 3,
                width: 40,
                backgroundColor: "#758272"
              }}></View>
            </View>

            <TouchableOpacity
              onPress={() => {
                // this.setState({
                //   selectedIndex: index - 2
                // })
              }}
            >

              <Text style={[
                defaultStyle.regular_text_10, {
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: 82
                }
              ]}>{item.title}</Text>
            </TouchableOpacity>

          </View> : <View style={{
            width: 82
          }}></View>}
      </View>

    );
  }

  handleScroll(event) {
    //alert('test'+this._carousel.WIDTH)
    // WIDTH originates from Dimensions.get('screen').width
    const endOfView = event.nativeEvent.contentSize.width - this.state.data.length * 50;
    const positionX = event.nativeEvent.contentOffset.x;
    const positionY = event.nativeEvent.contentOffset.y;

    // check if we are scrolling left, also detect if we are at the end of the scrollview 
    // MARKED: check other conditions here to allow scrolling again
    if (this.state.lastPositionX > positionX && endOfView > positionX) {
      // we are scrolling left, disable scroll, reset the current position
      this.setState({ lastPositionX: positionX, lastPositionY: positionY, allowScroll: false });
      // scroll back to last valid position. Important! Otherwise users may be able to scroll left
      ///this._scrollview.scrollTo({x: this.state.lastPositionX, y: this.state.lastPositionY});
      //call the timer to enable scroll again 
      alert('last')
    } else {
      // we are scrolling right, everthing is fine
      this.setState({ lastPositionX: positionX, lastPositionY: positionY });
    }
  }


  render() {

    const data = this.state.data
    const itemWidth = 70

    return (
      <View style={styles.container}>

        <View>

          <View style={{
            width: "100%"
          }}>

            <Text style={
              [defaultStyle.bold_text_14, {
                margin: 16,
                width: "100%",
                alignItems: 'center',
                textAlign: 'center'
              }]
            }>Timing : {data[this.state.selectedIndex + 2].title}</Text>
          </View>


          <Image
            resizeMode="contain"
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              width: 50,
              height: 50
            }}
            source={require('../../images/ic_navigation.png')} />
        </View>


        <Carousel
          ref={(c) => { this._carousel = c; }}
          //keyExtractor={(item, index) => `${item.id}--${item.index}`}
          data={data}
          loop={false}
          renderItem={this.renderItem}
          itemWidth={itemWidth}
          onSnapToItem={(index) => {
            console.log("Moved to=====> " + index)
            this.state.selectedIndex = index
            this.setState({
              selectedIndex: index
            })
          }}
          onScroll={(event) => {
            // 114 is the item width

            if (event.nativeEvent.contentOffset.x % itemWidth === 0) {
              if (this.state.selectedIndex + 2 == data.length - 1) {
                //alert('last')
                // this._carousel.scrollTo({x: event.nativeEvent.contentOffset.x, y: 
                //   event.nativeEvent.contentOffset.y});
              }
              //ReactNativeHapticFeedback.trigger('impactLight', true)
              //console.log('onScroll-> ', event.nativeEvent.contentOffset.x)
              let val = (data.length - 3) * itemWidth
              console.log('onScroll-> ', event.nativeEvent.contentOffset.x + "== " + val)
              if (event.nativeEvent.contentOffset.x >= val) {
                // this._carousel.scrollTo({x: event.nativeEvent.contentOffset.x, y: 
                //   event.nativeEvent.contentOffset.y});
                //alert('outside')
                console.log('outside')
                this._carousel.snapToItem(data.length - 3)
                setTimeout(() => {
                  this._carousel.snapToItem(data.length - 3)
                }, 100)
              }
            }
          }}
          //onScroll={(event) => this.handleScroll(event)}
          itemHeight={50}
          //lockScrollWhileSnapping={true}
          sliderWidth={Dimensions.get('window').width}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          activeSlideAlignment={'start'}
          //slideStyle={{ marginLeft: 14 }}
          loopClonesPerSide={10}
          useScrollView={false}
        />

      </View>
    );
  }
}
var { height, WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    paddingTop: 100,
  },
  cardStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    width: 50,
    height: 50
  }
});

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  Text,
} from 'react-native';

import ZoomableSvg from '../util/zoomable_svg';

import Svg, {
    Circle,
    Ellipse,
    G,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';

const { width, height } = Dimensions.get('window');

class SvgRoot extends Component {
  state = {
    paths: [],
    currentPath: null,
  };

  processTouch = (sx, sy) => {
    const { transform } = this.props;
    const { currentPath } = this.state;
    const { translateX, translateY, scaleX, scaleY } = transform;
    const x = (sx - translateX) / scaleX;
    const y = (sy - translateY) / scaleY;
    if (!currentPath) {
      this.setState({ currentPath: `M${x},${y}` });
    } else {
      this.setState({ currentPath: `${currentPath}L${x},${y}` });
    }
  };

  componentWillMount() {
    const noop = () => {};
    const yes = () => true;
    const shouldRespond = () => {
      return this.props.drawing;
    };
    this._panResponder = PanResponder.create({
      onPanResponderGrant: noop,
      onPanResponderTerminate: noop,
      onShouldBlockNativeResponder: yes,
      onMoveShouldSetPanResponder: shouldRespond,
      onStartShouldSetPanResponder: shouldRespond,
      onPanResponderTerminationRequest: shouldRespond,
      onMoveShouldSetPanResponderCapture: shouldRespond,
      onStartShouldSetPanResponderCapture: shouldRespond,
      onPanResponderMove: ({ nativeEvent: { touches } }) => {
        const { length } = touches;
        if (length === 1) {
          const [{ pageX, pageY }] = touches;
          this.processTouch(pageX, pageY);
        }
      },
      onPanResponderRelease: () => {
        this.setState(({ paths, currentPath }) => ({
          paths: [...paths, currentPath],
          currentPath: null,
        }));
      },
    });
  }

  render() {
    const { paths, currentPath } = this.state;
    const { transform } = this.props;
    return (
      <View {...this._panResponder.panHandlers}>
        <Svg width={width} height={height} style={styles.absfill}>
          <G transform={transform}>
            <Rect x="0" y="0" width="100" height="100" fill="white" />
            {paths.map(path => (
              <Path d={path} stroke="black" strokeWidth="1" fill="none" />
            ))}
          </G>
        </Svg>
        <Svg width={width} height={height} style={styles.absfill}>
          <G transform={transform}>
            {currentPath
              ? <Path
                  d={currentPath}
                  stroke="black"
                  strokeWidth="1"
                  fill="none"
                />

               
              : null}
               <Rect
                        onPress={() => {

                            alert('test')

                        }}
                        key={"id_1"}
                        x={50}
                        y={50}
                        width={50}
                        height={50}
                        //stroke={borderColor}
                        stroke="#DFDFDF"
                        strokeWidth=".5"
                        rx="4"
                        ry="4"
                        fill={'red'}>

                        />
                </Rect>
          </G>
        </Svg>
      </View>
    );
  }
}

const constraints = {
  combine: 'dynamic',
  scaleExtent: [width / height, 5],
  translateExtent: [[0, 0], [100, 100]],
};

export default class App extends Component {
  state = {
    drawing: false,
  };

  toggleDrawing = () => {
    this.setState(({ drawing }) => ({
      drawing: !drawing,
    }));
  };

  render() {
    const { drawing } = this.state;
    return (
      <View style={[styles.container, styles.absfill]}>
        <ZoomableSvg
          align="mid"
          vbWidth={100}
          vbHeight={100}
          width={width}
          height={height}
          initialTop={0}
          initialLeft={0}
          initialZoom={1}
          doubleTapThreshold={300}
          meetOrSlice="meet"
          svgRoot={SvgRoot}
          lock={drawing}
          childProps={this.state}
          constrain={constraints}
        />
        <TouchableOpacity onPress={this.toggleDrawing} style={styles.button}>
          <Text>{drawing ? 'Move' : 'Draw'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
  },
  absfill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
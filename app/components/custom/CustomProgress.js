import React, { Component } from 'react';

import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
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
import BaseComponent from '../../containers/BaseComponent';

export default class CustomProgres extends BaseComponent {

    constructor(props) {
        super(props)
    }

    render() {
        const height = this.props.height//14
        const width = this.props.width//"100%"
        const p = this.props.percent;
        const t_percent = p > 100 ? 100 : p
        const percent = this.props.percent + "%"//"100%"//children//"50%"
        const fillWidth = (width * +t_percent) / 100
        //console.log('fillWidth=>', fillWidth)
        //console.warn('percent' + this.props.percent)

        return (
            <Svg
                height={height} width={width}>
                <Defs>

                    <LinearGradient
                        rx="8"
                        ry="8"
                        id="grad" x1="0" y1="0" x2={fillWidth} >

                        <Stop offset="1" stopColor="#64A8DA" stopOpacity="1" />
                        <Stop offset="1" stopColor="#96C9EF" stopOpacity="0" />
                        <Stop offset="0" stopColor="#305F82" stopOpacity="1" />
                        {/* <Stop offset="1" stopColor="#E1E1E1" stopOpacity="1" /> */}

                        {/* <Stop offset="1" stopColor="#96C9EF" stopOpacity="0" /> */}
                    </LinearGradient>

                </Defs>

                <LinearGradient
                    id="grad1" x1="0" y1="0" x2={percent} y2="0">

                    {/* <Stop offset="1" stopColor="#64A8DA" stopOpacity="1" />
                       <Stop offset="1" stopColor="#96C9EF" stopOpacity="0" />
                       <Stop offset="0" stopColor="#305F82" stopOpacity="1" /> */}
                    <Stop offset="1" stopColor="#E1E1E1" stopOpacity="1" />

                    {/* <Stop offset="1" stopColor="#96C9EF" stopOpacity="0" /> */}
                </LinearGradient>

                <Rect
                    rx="8"
                    ry="8"
                    x="0" y="0" width={width} height={height} fill="url(#grad1)" />
                <Rect
                    rx="8"
                    ry="8"
                    x="0" y="0" width={fillWidth} height={height} fill="url(#grad)" />


            </Svg>
        );
    }


}

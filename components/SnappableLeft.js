import React, { Component } from 'react';
import { Animated } from 'react-native';

import {
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import { USE_NATIVE_DRIVER } from '../config';

export default class SnappableLeft extends Component {
  constructor(props) {
    super(props);
    this._dragX = new Animated.Value(0);
    this._transX = this._dragX.interpolate({
      inputRange: [-100, -50, 0, 50, 100],
      outputRange: [-30, -10, 0, 10, 30],
    });
    this._onGestureEvent = Animated.event(
      [{ nativeEvent: { translationX: this._dragX } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );
  }
  handleSubmit = (title) => {
    if (title == 'good'){
      this.props.navigation.navigate('Reason', {
        mood: require('../assets/images/emotions/good.png'),
        buttonColor: '#72BFE0',
        backgroundRoute: require('../assets/images/background/good-background.png'),
        textFieldColor: '#86A8CB',
        title:title,
        info:this.props.info,
        backgroundColor: '#1775D7',
        navigation: this.props.navigation
      });
    }
    else{
      this.props.navigation.navigate('Reason', {
        mood: require('../assets/images/emotions/sad.png'),
        buttonColor: '#F7AB3B',
        backgroundRoute: require('../assets/images/background/sad-background.png'),
        textFieldColor: '#D6983B',
        title:title,
        info:this.props.info,
        backgroundColor: '#B87714',
        navigation: this.props.navigation
      });
    }
    }
    
  _onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(this._dragX, {
        velocity: event.nativeEvent.velocityX,
        tension: 10,
        friction: 2,
        toValue: 0,
        useNativeDriver: USE_NATIVE_DRIVER,
      }).start();
      this.handleSubmit(this.props.title);
    }
  };
  render() {
    const { children } = this.props;
    return (
      <PanGestureHandler
        {...this.props}
        maxPointers={1}
        minOffsetX={-10}
        onGestureEvent={this._onGestureEvent}
        onHandlerStateChange={this._onHandlerStateChange}>
        <Animated.View style={{ transform: [{ translateX: this._transX }] }}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    );
  }

}
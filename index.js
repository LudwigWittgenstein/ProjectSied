import React from 'react';
import {
  AppRegistry,
  Animated,
  asset,
  Environment,
  Image,
  StyleSheet,
  Text,
  View,
  VrButton,
  VR
} from 'react-360';
import { Easing } from 'react-native';

export default class projectSied extends React.Component {

  state = {
    bootUp: new Animated.Value(0),
  };

  componentDidMount() {
    this.bootUpAnimation();
  }

  bootUpAnimation() {
    Animated.timing(
      this.state.bootUp,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
      }).start();
  };

  // This method increments our count, triggering a re-render
  _incrementCount = () => {
    //this.setState({count: this.state.count + 1});
  };

  _fadeOut = () => {
    //Environment.clearBackground();
    console.log(this.state.bootUp);
  };


  render() {

    //{`Count: ${this.state.count}`}

    return (
      <Animated.View  style={{
        width: 1000,
        height: 1000,
        justifyContent: 'flex-start',
        alignItems: 'center', 
        opacity: this.state.bootUp}}>
        <VrButton 
          onClick={this._fadeOut}>
        <Image source={asset('SiedLogo-360.png')} style={{height: 450, width: 450}} />
        </VrButton>
        <View style={styles.line} />
          <View
            style={styles.greetingBox}>
            <Text style={styles.greeting}>
              all worlds inside
            </Text>
          </View>
      </Animated.View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 1000,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    marginTop: -300,
  },
  greeting: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    width: 80,
  },
  line: {
    borderColor: 'black',
    borderTopWidth: 2,
    borderRadius: 300,
    width: 300,
    height: 300,
    margin: 10,
  },
});

AppRegistry.registerComponent('projectSied', () => projectSied);

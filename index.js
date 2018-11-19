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
import Entity from 'Entity';
import SiedView from './SiedView';

export default class projectSied extends React.Component {

  state = {
    bootUp: new Animated.Value(0), redAlert: 'transparent',
  };

  componentDidMount() {
    this.bootUpAnimation();
    //console.log();
   // this.hello();
  }

  bootUpAnimation() {
    Animated.timing(
      this.state.bootUp,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
      
      }).start();
  }

  bootDownAnimation() {
    Animated.timing(
      this.state.bootUp,
      {
        toValue: 0,
        duration: 1000,
        easing: Easing.ease,
      
      }).start();
  }

  // This method increments our count, triggering a re-render
  _incrementCount = () => {
    //this.setState({count: this.state.count + 1});
  };

  _fadeOut = () => {
    Environment.clearBackground();
    this.setState({redAlert: this.state.redAlert = 'transparent'});
    this.bootDownAnimation();
    //this.setState({scene: this.state.scene = true});
  };


  render() {

    //{`Count: ${this.state.count}`}

    return (
      <Animated.View  style={{
        width: 1000,
        height: 1000,
        backgroundColor: this.state.redAlert,
        justifyContent: 'center',
        alignItems: 'center',}}>
        
      </Animated.View>

    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
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



class Model extends React.Component {

  render() {


    return (
      <View>
        <Entity 
          source={{obj: asset('./models/sied/mario.obj'), mtl: asset('./models/sied/mario.mtl')}}
          style={{transform: [{translate: [-25, -10, -50]}]}} />
      </View>
    );
  }
}


AppRegistry.registerComponent('Model', () => Model);


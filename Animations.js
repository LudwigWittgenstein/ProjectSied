import React from 'react';
//import styles from './css.js';
import {
  AppRegistry,
  Animated,
  asset,
  Environment,
  Image,
  NativeModules,
  StyleSheet,
  Surface,
  Text,
  View,
  VrButton,
  VR
} from 'react-360';
import { Easing } from 'react-native';
import Entity from 'Entity';
import AmbientLight from 'AmbientLight';
import PointLight from 'PointLight';

const AnimatedEntity = Animated.createAnimatedComponent(Entity);

export default class projectSied extends React.Component {

  state = {
    anfangen: false,
    choice: false,
    contract: false,
    contractO: new Animated.Value(0),
    contact:false,
    counter: 0,
    portalC: '#ffbf00',
    portalV: new Animated.Value(1000),
    portalO: new Animated.Value(1), 
    textO: new Animated.Value(0),
    textViewO: new Animated.Value(0)
  };

  componentDidMount() {

    //TRIGGER INTRO ANIMATION
    //this.pulseAnimation();
  }

  anfangenAnimation() {
    Animated.timing(
      this.state.portalO,
      {
        toValue: 0,
        duration: 1000,
        easing: Easing.ease,
      
      }).start();

      setTimeout(()=> SiedModule.age(), 1500);
  }

  bootUpAnimation() {
    Animated.sequence([
      Animated.timing(
      this.state.portalO,
      {
        toValue: 0,
        duration: 1500,
        easing: Easing.ease,
      
      }),
      Animated.timing(
      this.state.portalO,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
      
      })
    ]).start();

      setTimeout(()=>{this.setState({portalC:'transparent'});},1600);
  }

  bootDownAnimation() {
      Animated.timing(
      this.state.textViewO,{
        toValue: 1,
        duration: 1500,
        easing: Easing.ease
      }).start();
    setTimeout(()=>{Environment.clearBackground();}, 500);
    //setTimeout(()=>{this.setState({portalC: 'transparent'});}, 500)
  }

    pulseAnimation() {

    if (this.state.contact === true){return;}

    Animated.sequence([
      Animated.timing(
        this.state.portalO,
        {
          toValue: 1,
          duration: 3000,
          easing: Easing.ease,
      }),
      Animated.timing(
        this.state.portalO,
        {
          toValue: 0.6,
          duration: 1500,
          easing: Easing.ease,
      })
      ]).start(() => this.pulseAnimation());
  }

  pulseAnimationB() {

      Animated.sequence([
        Animated.timing(
          this.state.textO,
          {
            toValue: 1,
            duration: 1500,
            easing: Easing.ease,
        }),
        Animated.timing(
          this.state.textO,
          {
            toValue: 0,
            duration: 1500,
            easing: Easing.ease,
        })
      ]).start(() => this.pulseAnimationB());
  }

}

  render() {

    return (
      <Animated.View

      onInput={e => {

          const inputEvent = e.nativeEvent.inputEvent;
          let eventType = inputEvent.action;
          let keyNumber = inputEvent.button;
          this.motion(keyNumber, eventType);
          if (this.state.counter < 1) {
            this.bootUpAnimation();
            this.setState({counter: 1});
            this.setState({contact: true});
          }
      }}

      style={{
        width: 4680,
        height: this.state.portalV,
        opacity: this.state.portalO,
        justifyContent: 'center',
        alignItems: 'center'}} >
          
          {this.state.anfangen === false? 
            
            <View/>:

            (
            <VrButton onClick={()=> this.anfangenAnimation()}>
              <Animated.View style={{opacity: this.state.textViewO, backgroundColor: '#fff', height: 475, width: 350, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', borderColor: 'transparent'}}>
                <Text style={{color: 'black', textAlign: 'center', fontSize: 50, marginBottom: 40, fontWeight: "100", width:200}}>initiate project sied</Text>
              </Animated.View>
              <Animated.View
            style={{opacity: this.state.textO, width:350, height: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderColor: "white", borderWidth:10, marginTop:50}}>
                <Text style={{backgroundColor: 'transparent', color: '#c52525', fontSize: 60, fontWeight: "800"}}>anfangen</Text>
              </Animated.View>
            </VrButton>
            ) }

      </Animated.View>
    );
  }
};


AppRegistry.registerComponent('Animations', () => Animations);
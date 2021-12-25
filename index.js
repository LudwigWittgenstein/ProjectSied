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
import Sied from './Sied';
import SkyRings from './SkyRings';
import Sprout from './Sprout';

const SiedModule = NativeModules.SiedModule;

const AnimatedEntity0 = Animated.createAnimatedComponent(Entity);
const AnimatedEntity1 = Animated.createAnimatedComponent(Entity);

export default class projectSied extends React.Component {
  constructor(props) {
    super();

    this.state = {
      anfangen: false,
      choice: false,
      contract: false,
      contractO: new Animated.Value(0),
      contact:false,
      counter: 0,
      portalC: '#ffbf00',
      portalV: new Animated.Value(1000),
      portalO: new Animated.Value(1), 
      leftRightInertia: 0,
      forwardInertia: 0,
      upwardInertia: 0,
      siedAge: 0,
      textO: new Animated.Value(0),
      textViewO: new Animated.Value(0)
    }

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

  motion(keyValue, eventType) {

    if (this.state.forwardInertia > 19) {
      this.bootDownAnimation();
      this.pulseAnimationB();
      let plus = this.state.forwardInertia + 1;
      this.setState({forwardInertia:  plus});
      this.setState({anfangen: true});
      //TRIGGER PLAY MUSIC;
      return;
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
            this.setState({counter: 1});
            this.setState({contact: true});
          }
      }}

      style={{
        width: 4680,
        justifyContent: 'center',
        alignItems: 'center'}} >

          {this.state.anfangen === false? 
            
            <View styel={{backgroundColor:'transparent'}}>
            <Text>{this.props.forward}</Text>
            </View>:

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


AppRegistry.registerComponent('projectSied', () => projectSied);

class infoPanel extends React.Component {
  constructor(props) {
      super();
      state = {};
  }

  componentDidMount() {
    //let info = SiedModule.userInfo();
    //console.log(info)
  }

  render() {

    const name = this.props.name;
    const secret = this.props.secret;
    const siedAge = this.props.siedAge;

    //VR BUTTON TRIGGER
    /*onClick={}()=> this.anfangenAnimation()*/

    //ALT TEXT STYLE
    //<Text style={{backgroundColor: 'transparent', color: '#c52525', fontSize: 60, fontWeight: "800"}}>anfangen</Text>

    return (
      <Animated.View

      onInput={e => {

          const inputEvent = e.nativeEvent.inputEvent;
          let eventType = inputEvent.action;
          let keyNumber = inputEvent.button;
      }}

      style={{
        width: 800,
        height: 800,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 90,
        transform: [ {translateY: 10}]}} >

        <View style={{width: 600,height: 600, borderRadius: 360, backgroundColor:'white', padding: 25, flexDirection: 'column', justifyContent: 'center',alignItems: 'center',alignContent: 'center'}}>
          <Text style={{color: '#a3f9fe', textAlign: 'left', fontSize: 40, marginBottom: 40, fontWeight: "200", width:350}}>Name: {name}</Text>
          <Text style={{color: '#a3f9fe', textAlign: 'left', fontSize: 40, marginBottom: 40, fontWeight: "200", width:350}}>Secret: {secret}</Text>
          <Text style={{color: '#a3f9fe', textAlign: 'left', fontSize: 40, fontWeight: "200", width:350}}>SiedAge: {siedAge}</Text>
        </View>
          <VrButton style={{backgroundColor:'black', borderColor:'#a3f9fe', borderRadius: 10, borderWidth:5, justifyContent: 'center', alignItems: 'center', marginTop:50}}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 50, marginBottom: 40, fontWeight: "100", width:400, height:50}}>Return Home</Text>
          </VrButton>

      </Animated.View>
    );
  }
};


AppRegistry.registerComponent('infoPanel', () => infoPanel);
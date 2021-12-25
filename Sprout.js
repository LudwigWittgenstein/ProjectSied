import * as React from 'react';
import {asset, Animated, AppRegistry, NativeModules, View} from 'react-360';
import Entity from 'Entity';
import { Easing } from 'react-native';

const SiedModule = NativeModules.SiedModule;

//const AnimatedEntity = Animated.createAnimatedComponent(Entity);

/**
 * Renders the actual model in 3D space, rotating it a full 360 degrees to show
 * it from all angles.
 */
class Sprout extends React.Component {

constructor(){
    super();
    this.state ={
    }
}

componentDidMount() {
}

  render() {

    return (
      <View>
        <Entity
          source={{obj: asset('models/sprout/sprout.obj'), mtl: asset('models/sprout/Sprout.mtl')}}
          style={{transform: [{rotateX:-90}, {scale:0.07}]}} />
      </View>
    );
  }
}


AppRegistry.registerComponent('Sprout', () => Sprout);

class SproutWorld extends React.Component {

constructor(){
    super();
    this.state ={
      contact:false,
      counter: 0,
      portalC: '#ffbf00',
      portalV: new Animated.Value(1000),
      portalO: new Animated.Value(1)
    }
}

componentDidMount() {
  this.pulseAnimation();
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

  render() {

    SiedModule.lobbyMusic();

    return (
      <Animated.View

      onInput={e => {

          const inputEvent = e.nativeEvent.inputEvent;

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
        backgroundColor: this.state.portalC,
        justifyContent: 'center',
        alignItems: 'center'}} >
      </Animated.View>
    );
  }
}


AppRegistry.registerComponent('SproutWorld', () => SproutWorld);

export default Sprout;
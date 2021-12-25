import * as React from 'react';
import {asset, Animated, AppRegistry, NativeModules, View} from 'react-360';
import Entity from 'Entity';
import { Easing } from 'react-native';

const AnimatedEntity = Animated.createAnimatedComponent(Entity);

/**
 * Renders the actual model in 3D space, rotating it a full 360 degrees to show
 * it from all angles.
 */
class SkyRings extends React.Component {

  constructor(){
  		super();
  		this.state ={opacity:1, rotate: new Animated.Value(0)}
  }

  componentDidMount() {
      this.rotateAnimation();
  }

  rotateAnimation() {

    Animated.sequence([
      Animated.timing(
        this.state.rotate,
        {
          toValue: 360,
          duration: 15000,
          easing: Easing.ease,
      }),
      Animated.timing(
        this.state.rotate,
        {
          toValue: 0,
          duration: 15000,
          easing: Easing.ease,
      })
      ]).start(() => this.rotateAnimation());
  }

  render() {


    return (
      <View>
        <AnimatedEntity
          source={{obj: asset('models/SkyRings/SkyRings.obj'), mtl: asset('./models/SkyRings/SkyRings.mtl')}}
          style={{transform: [{scale:2}, {translateY: 10}, {translateZ:10}, {rotateX:this.state.rotate}, {rotateY:90}]}}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('SkyRings', () => SkyRings);

export default SkyRings;
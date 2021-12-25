import * as React from 'react';
import {asset, Animated, AppRegistry, NativeModules, View} from 'react-360';
import Entity from 'Entity';
import { Easing } from 'react-native';
import Plane from 'Plane';

const AnimatedEntity = Animated.createAnimatedComponent(Entity);

/**
 * Renders the actual model in 3D space, rotating it a full 360 degrees to show
 * it from all angles.
 */
class Floor extends React.Component {

  constructor(){
  		super();
  		this.state ={opacity:1, contact: false, siedY: new Animated.Value(0)}
  }

  componentDidMount() {
      this.floatAnimation();
  }

  floatAnimation() {

    if (this.state.contact === true){return;}

    Animated.sequence([
      Animated.timing(
        this.state.siedY,
        {
          toValue: 5,
          duration: 1500,
          easing: Easing.ease,
      }),
      Animated.timing(
        this.state.siedY,
        {
          toValue: 0,
          duration: 1500,
          easing: Easing.ease,
      })
      ]).start(() => this.floatAnimation());
  }

  render() {

    /*
            <AnimatedEntity
          source={{obj: asset('models/floor/Floor.obj'), mtl: asset('./models/floor/Floor.mtl')}}
          style={{transform: [{scale:3.5}, {rotateX: 90}], color:'grey'}}/>
          */


    return (
      <View>
        
      </View>
    );
  }
}

AppRegistry.registerComponent('Floor', () => Floor);

export default Floor;
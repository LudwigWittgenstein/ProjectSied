import * as React from 'react';
import {asset, Animated, AppRegistry, View} from 'react-360';
import Entity from 'Entity';
import AmbientLight from 'AmbientLight';
import PointLight from 'PointLight';
//import {connect} from './Store';

const AnimatedEntity = Animated.createAnimatedComponent(Entity);

/**
 * Renders the actual model in 3D space, rotating it a full 360 degrees to show
 * it from all angles.
 */
export default class SiedView extends React.Component {

  rotation = new Animated.Value(0);

  fresh = false;

  constructor(){
    super();
    this.state = {scene: false,};
  }

  componentDidMount() {
      this.rotation.setValue(0);
      Animated.timing(this.rotation, {toValue: 360, duration: 20000}).start();
    }

  render() {

    const activated = this.state.scene;

    if (activated === true) {

    return (
        <View>
        <AmbientLight intensity={1.0} color={'#ffffff'} />
        <PointLight
          intensity={0.4}
          style={{transform: [{translate: [0, 4, -1]}]}}
        />
        <AnimatedEntity
          style={{transform: [{rotateY: this.rotation}]}}
          source={{obj: asset('./models/sied/sied.obj'), mtl: asset('./models/sied/sied.mtl')}}
        />
        </View>
      );
    }

    else {
      return (
        <View />
      );
    }
  }
}

AppRegistry.registerComponent('SiedView', () => SiedView);
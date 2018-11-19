// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Location, Surface} from 'react-360-web';
import SimpleRaycaster from "simple-raycaster";

const location = new Location([0, 0, 0]);

var upwardInertia = 0;
var leftRightInertia = 0;
var forwardInertia = 0;


const myFlatSurface = new Surface(
  200, /* width */
  200, /* height */
  Surface.SurfaceShape.Flat /* shape */
);

const hubSurface = new Surface(
  1000, /* width */
  1000, /* height */
  Surface.SurfaceShape.Cylinder /* shape */
);

myFlatSurface.setAngle(-0.6, 0)

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    cursorVis: 'visible',
    ...options,
  });

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot('projectSied', { scene: false }),
    hubSurface,
  );

  r360.renderToSurface(
    r360.createRoot('SiedView'),
    myFlatSurface,
  );


  //Render Model to Model component
  r360.renderToLocation(
    r360.createRoot('Model'),
    location,
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('360_world.png'));
}

function motion(keyValue) {
  
  if (keyValue === 'j') {
    leftRightInertia += 1;
    location.setWorldPosition(leftRightInertia, upwardInertia, forwardInertia);
  }

  else if (keyValue === 'l') {
    leftRightInertia -= 1;
    location.setWorldPosition(leftRightInertia, upwardInertia, forwardInertia);
  }

  else if (keyValue === 'i') {
    forwardInertia += 1;
    location.setWorldPosition(leftRightInertia, upwardInertia, forwardInertia);
  }
  else if (keyValue === 'k') {
    forwardInertia -= 1;
    location.setWorldPosition(leftRightInertia, upwardInertia, forwardInertia);
  }

  else if (keyValue === 'm') {

    let x, y = 0;
    let z = 10;

    for (x=0; x < 10; x++){
      setTimeout(() =>{
        y += 1;
        upwardInertia -= y;
        location.setWorldPosition(leftRightInertia, upwardInertia, forwardInertia);
      }, z);
      z += 20;
    }

    z = 10;

    setTimeout(() =>{for (x=0; x < 10; x++){
      setTimeout(() =>{
        upwardInertia += y;
        location.setWorldPosition(leftRightInertia, upwardInertia, forwardInertia);
        y--;
      }, z += 20);
    }}, 300);

    y=0;
  }
  else {
    return;
  }
}

document.getElementById("body").onkeydown = (event) => {
  let keyValue = event.key;
  motion(keyValue);
}

window.React360 = {init};

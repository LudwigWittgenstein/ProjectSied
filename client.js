// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Environment, Location, Module, Surface} from 'react-360-web';
import SimpleRaycaster from "simple-raycaster";

const location = new Location([0, -5, -25]);
const locationSied = new Location([0, -2, -25]);
const locationSkyRings = new Location([0, 10, -25]);

var upwardInertia = -2;
var leftRightInertia = 0;
var forwardInertia = -25;

var siedTrigger = 1;

getParamValue = function(name, w){
    w = w || window;
    var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
        val = w.location.search.match(rx);
    return !val ? '':val[1];
}

var forwardValue = 0;

const name    = getParamValue('param1');
const secret  = getParamValue('param2');
const siedAge = getParamValue('param3');
const siedHome = getParamValue('param4');

const hubSurface = new Surface(
  4680, /* width */
  1080, /* height */
  Surface.SurfaceShape.Cylinder /* shape */
);

//INFO PANNEL
const infoPanel = new Surface(
  800, /* width */
  800, /* height */
  Surface.SurfaceShape.Flat /* shape */
);

infoPanel.setAngle(
  -Math.PI / 2, /* yaw angle */
  0 /* pitch angle */
);

class SiedModule extends Module {
  constructor(ctx) {
    super('SiedModule');

    this.Age = siedAge;
    this._ctx = ctx;
  }

    age() {
      let birthDate = new Date().toLocaleString();

      const source =  {SiedHome: true,  SiedBirth: birthDate, SiedAge: 1, VrSied: true};

      window.parent.postMessage(source, 'https://butterflyscreen.com');
    }

}

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    cursorVis: 'visible',
    antialias: false, 
    nativeModules: [
      ctx => new SiedModule(ctx),
    ],
    ...options,
  });

  r360.renderToSurface(
      r360.createRoot('infoPanel', { 
          name: 'Amadeus', 
          secret: 'I am an angel of love. I am becometh creation, born from light.',
           siedAge: '????'
          }),
      infoPanel,
  );

  if (siedHome !== 'true') {

    r360.renderToSurface(
      r360.createRoot('projectSied', {
        forward: forwardValue
      }),
      hubSurface,
    );

    siedRoot = r360.renderToLocation(
      r360.createRoot('Sied'),
      locationSied,
    );

    skyRingsRoot = r360.renderToLocation(
      r360.createRoot('SkyRings'),
      locationSkyRings,
    );

  }

  else {

    r360.renderToSurface(
      r360.createRoot('SproutWorld'),
      hubSurface,
    ); 

    //Render Model to Model component
    r360.renderToLocation(
      r360.createRoot('Sprout'),
      location,
    );
  }

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('360_world.png'));

  document.getElementById("controler").addEventListener('click', function(ev) {
    r360._cameraPosition = [0, 0, 0];
  });



//CONTROLS FOR MOVEMENT

function motion(keyValue) {

  forwardValue = 1;

  if (forwardInertia > 25) {r360.compositor.setBackground(r360.getAssetURL(''));return;}

  else if (keyValue === 'j') {
    if (leftRightInertia>15){return;}
    leftRightInertia += 1;
    locationSied.setWorldPosition(leftRightInertia, upwardInertia, forwardInertia);
    location.setWorldPosition(leftRightInertia, -5, forwardInertia);
  }

  else if (keyValue === 'l') {
    if (leftRightInertia<-15){return;}
    leftRightInertia -= 1;
    locationSied.setWorldPosition(leftRightInertia, upwardInertia, forwardInertia);
    location.setWorldPosition(leftRightInertia, -5, forwardInertia);
  }

  else if (keyValue === 'i') {
    if (forwardInertia > 25 && siedAge !== '1'){locationSied.setWorldPosition(0, -1000, 50);forwardIntertia = 101;return;}
    forwardInertia += 1;
    locationSied.setWorldPosition(leftRightInertia, upwardInertia, forwardInertia);
    location.setWorldPosition(leftRightInertia, -5, forwardInertia);
  }
  else if (keyValue === 'k') {
    if (forwardInertia < -25 || forwardInertia > 20){return;}
    forwardInertia -= 1;
    locationSied.setWorldPosition(leftRightInertia, upwardInertia, forwardInertia);
    location.setWorldPosition(leftRightInertia, -5, forwardInertia);
  }

  else {
    return;
  }
}

document.getElementById("body").onkeydown = (event) => {
        let keyValue = event.key;
        motion(keyValue);
}


//LAST MOVE VALUES FOR COMPARISON
var lastX, lastY = 0;

//MOVE FORWARD
document.getElementById("kinetix").addEventListener('touchmove', function(ev) {
  // Iterate through the touch points that were activated
  // for this element and process each event 'target'

  ev.preventDefault();

  let keyValue;
  let x = ev.changedTouches[0].clientX;
  let y = ev.changedTouches[0].clientY;

    if (((x < lastX - 5 && !(y < lastY - 9 && y > lastY + 9)) && x < lastX - 20 ) || ((x > lastX + 5 && !(y < lastY - 9 && y > lastY + 9))) && x > lastX + 20) {
      for (var i=0; i < ev.targetTouches.length; i++) {

      if (x > lastX) {
        keyValue = "j"
        motion(keyValue);
      }
      else {
        keyValue = "l"
        motion(keyValue);
      }
        lastY = y;
        lastX = x
      }
    }

    else if ((y < lastY - 9 && !(x < lastX - 11 && x > lastX + 11) ) || (y > lastY + 9 && !(x < lastX - 11 && x > lastX + 11) )) {

      for (var i=0; i < ev.targetTouches.length; i++) {

      if (y < lastY) {
          keyValue = "k"
          motion(keyValue);
       }
       else {
         keyValue = "i"
         motion(keyValue);
       }

          lastY = y;
          lastX = x
        }

    }

}, false);

document.getElementById("kinetix").addEventListener('touchmove', function(ev) {
  this.style.opacity="1";
})

document.getElementById("kinetix").addEventListener('touchend', function(ev) {
  this.style.opacity="0";
});

}

window.React360 = {init};
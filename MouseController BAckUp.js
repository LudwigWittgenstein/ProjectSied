/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

import {type Quaternion, type Vec3} from '../Types';
import {type CameraController} from './Types';

const DEFAULT_FOV = Math.PI / 6;
const HALF_PI = Math.PI / 2;

var lookUp, lookDown;
var prevX, prevY, yawCounter = 0;

export default class MousePanCameraController implements CameraController {
  _deltaYaw: number;
  _deltaPitch: number;
  _draggingMouse: boolean;
  _draggingTouch: boolean;
  _enabled: boolean;
  _frame: HTMLElement;
  _lastMouseX: number;
  _lastMouseY: number;
  _lastTouchX: number;
  _lastTouchY: number;
  _verticalFov: number;

  constructor(frame: HTMLElement, fov: number = DEFAULT_FOV) {
    this._deltaYaw = 0;
    this._deltaPitch = 0;
    this._draggingMouse = false;
    this._draggingTouch = false;
    this._enabled = true;
    this._frame = frame;
    this._lastMouseX = 0;
    this._lastMouseY = 0;
    this._lastTouchX = 0;
    this._lastTouchY = 0;
    this._verticalFov = fov;

    (this: any)._onMouseDown = this._onMouseDown.bind(this);
    (this: any)._onDbClick = this._onDbClick.bind(this);
    (this: any)._onMouseMove = this._onMouseMove.bind(this);
    (this: any)._onMouseUp = this._onMouseUp.bind(this);
    (this: any)._onMouseLeave = this._onMouseLeave.bind(this);
    (this: any)._onTouchStart = this._onTouchStart.bind(this);
    (this: any)._onTouchMove = this._onTouchMove.bind(this);
    (this: any)._onTouchEnd = this._onTouchEnd.bind(this);
    document.addEventListener('dblclick', this._onDbClick);
    this._frame.addEventListener('mousedown', this._onMouseDown);
    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('mouseup', this._onMouseUp);
    document.addEventListener('mouseleave', this._onMouseLeave);
    this._frame.addEventListener('touchstart', this._onTouchStart);
    this._frame.addEventListener('touchmove', this._onTouchMove);
    this._frame.addEventListener('touchcancel', this._onTouchEnd);
    this._frame.addEventListener('touchend', this._onTouchEnd);
  }

  _onDbClick () {
    if (yawCounter > 0) {
      this._deltaYaw -= yawCounter;
      yawCounter -= yawCounter;
    }
    else {
      this._deltaYaw += (yawCounter * -1);
      yawCounter += (yawCounter * -1);
    }
    yawCounter = 0;
  }

  _lookUp () {
      this._deltaYaw -= 0.01;
      yawCounter -= 0.01;
      prevY = this._lastMouseY;
  }
  _onMouseLeave (e: MouseEvent) {

    let x = 0;

    if (yawCounter > 0) {
      for(x; x < 1000000; x++) {
        this._deltaYaw -= (yawCounter * 0.000001);
       }
       yawCounter = 0;
    }
    else {
      for(x; x < 1000000; x++) {
        this._deltaYaw += ((yawCounter * -1) * 0.000001);
      }
      yawCounter = 0;
    }
  }

  _onMouseDown(e: MouseEvent) {
    if (!this._enabled) {
      return;
    } 
    this._draggingMouse = true;
    this._lastMouseX = e.clientX;
    this._lastMouseY = e.clientY;
  }

  _onMouseMove(e: MouseEvent) {
    /*if (!this._draggingMouse) {
      return;
    } */
    const width = this._frame.clientWidth;
    const height = this._frame.clientHeight;
    const aspect = width / height;
    const deltaX = e.clientX - this._lastMouseX;
    const deltaY = e.clientY - this._lastMouseY;

    //QUADRANTS OF SCREEN
    const bottom = height * 0.15;
    const top = height * 0.85;
    const left = width * 0.07;
    const right = width * 0.93;

    this._lastMouseX = e.clientX;
    this._lastMouseY = e.clientY;
    //this._deltaPitch += deltaX / width * this._verticalFov * aspect;
    //this._deltaYaw += deltaY / height * this._verticalFov;
    //this._deltaYaw = Math.max(-HALF_PI, Math.min(HALF_PI, this._deltaYaw));

    if (this._lastMouseY <= bottom || this._lastMouseY >= top){
      if (this._lastMouseY >= top && contact === false) {
        if (this._lastMouseY <= top) {going = false;clearInterval(lookUp);return}
        if (going === true) {return}
        else {
          lookUp = setInterval(_lookUp, 1);
          going = true;
        }
      }
      
      else if (this._lastMouseY <= bottom) {
        if (prevY < this._lastMouseY) {return}
        this._deltaYaw += 0.2;
        yawCounter += 0.2;
        prevY = this._lastMouseY;
      }
    }

    if (this._lastMouseX <= left || this._lastMouseX >= right){
      if (this._lastMouseX >= right) {
        if (prevX > this._lastMouseX) {return}
        this._deltaPitch -= 0.1;
        prevX = this._lastMouseX;
      }

      else if (this._lastMouseX <= left) {
        if (prevX < this._lastMouseX) {return}
        this._deltaPitch += 0.1;
        prevX = this._lastMouseX;
      }
      
    }

  }

  _onMouseUp() {
    this._draggingMouse = false;
  }

  _onTouchStart(e: TouchEvent) {
    
    /*if (!this._enabled) {
      return;
    } */

    this._draggingTouch = true;
    this._lastTouchX = e.changedTouches[0].clientX;
    this._lastTouchY = e.changedTouches[0].clientY;
    
  }

  _onTouchMove(e: TouchEvent) {
    /*
    if (!this._draggingTouch) {
      return;
    } */

    const x = e.changedTouches[0].clientX;
    const y = e.changedTouches[0].clientY;
    const width = this._frame.clientWidth;
    const height = this._frame.clientHeight;
    const aspect = width / height;
    const deltaX = x - this._lastTouchX;
    const deltaY = y - this._lastTouchY;
    this._lastTouchX = x;
    this._lastTouchY = y;

    //QUADRANTS OF SCREEN
    const bottom = height * 0.07;
    const top = height * 0.93;
    const left = width * 0.07;
    const right = width * 0.93;
    
    /*
    this._deltaPitch += deltaX / width * this._verticalFov * aspect;
    this._deltaYaw += deltaY / height * this._verticalFov;
    this._deltaYaw = Math.max(-HALF_PI, Math.min(HALF_PI, this._deltaYaw));
    */

    if (this._lastTouchY <= bottom || this._lastTouchY >= top){
      if (this._lastTouchY >= top) {
        if (prevY > this._lastTouchY) {return}
        this._deltaYaw -= 0.1;
        prevY = this._lastTouchY;
      }
      
      else if (this._lastTouchY <= bottom) {
        if (prevY < this._lastTouchY) {return}
        this._deltaYaw += 0.1;
        prevY = this._lastTouchY;
      }
    }

    if (this._lastTouchX <= left || this._lastTouchX >= right){
      if (this._lastTouchX >= right) {
        if (prevX > this._lastTouchX) {return}
        this._deltaPitch -= 0.1;
        prevX = this._lastTouchX;
      }

      else if (this._lastTouchX <= left) {
        if (prevX < this._lastTouchX) {return}
        this._deltaPitch += 0.1;
        prevX = this._lastTouchX;
      }
      
    }

  }

  _onTouchEnd(e: TouchEvent) {
    this._draggingTouch = false; 
  }


  enable() {
    this._enabled = true;
    this._draggingMouse = false;
    this._draggingTouch = false;
  }

  disable() {
    this._enabled = false;
    this._draggingMouse = false;
    this._draggingTouch = false;
  }

  fillCameraProperties(position: Vec3, rotation: Quaternion): boolean {
    if (!this._enabled) {
      return false;
    }

    if (this._deltaPitch === 0 && this._deltaYaw === 0) {
      return false;
    }

    // premultiply the camera rotation by the horizontal (pitch) rotation,
    // then multiply by the vertical (yaw) rotation

    const cp = Math.cos(this._deltaPitch / 2);
    const sp = Math.sin(this._deltaPitch / 2);
    const cy = Math.cos(this._deltaYaw / 2);
    const sy = Math.sin(this._deltaYaw / 2);

    const x1 = rotation[0];
    const y1 = rotation[1];
    const z1 = rotation[2];
    const w1 = rotation[3];

    const x2 = cp * x1 + sp * z1;
    const y2 = cp * y1 + sp * w1;
    const z2 = cp * z1 - sp * x1;
    const w2 = cp * w1 - sp * y1;

    const x3 = w2 * sy + x2 * cy;
    const y3 = y2 * cy + z2 * sy;
    const z3 = -y2 * sy + z2 * cy;
    const w3 = w2 * cy - x2 * sy;

    rotation[0] = x3;
    rotation[1] = y3;
    rotation[2] = z3;
    rotation[3] = w3;

    this._deltaPitch = 0;
    this._deltaYaw = 0;
    return true;
  }
}

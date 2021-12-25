import React from 'react';
import {StyleSheet} from 'react-360';

export default {

    StyleSheet.create({
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
}
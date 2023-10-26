import React from 'react';
import { Text, Platform } from 'react-native';

export function MonoText(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: Platform.OS === 'ios' ? 'space-mono' : "monospace" }]} />
  );
}
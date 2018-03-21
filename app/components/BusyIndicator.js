import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

export default ({message}) => (
  <View style={styles.busyView}>
    <ActivityIndicator
      size="large"
      color="#000"
      animating={true}
    />
    <Text>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  busyView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

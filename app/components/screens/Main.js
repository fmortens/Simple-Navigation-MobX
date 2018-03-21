import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';

import {
  Provider,
  observer,
  inject,
  toJS
} from 'mobx-react';


@inject('authenticationStore')
@observer
export default class Main extends React.Component {
  render() {
    const {
      authenticationStore
    } = this.props;

    return (
      <View style={styles.container}>
        <Text>Main screen</Text>
        <Button title="Log out" onPress={authenticationStore.logout} />
      </View>
    );
  }
}

const colors = {
  white: '#fff',
  grayish: '#fafafa',
  red: '#f00',
  transparentBlack: 'rgba(0,0,0,0.3)'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

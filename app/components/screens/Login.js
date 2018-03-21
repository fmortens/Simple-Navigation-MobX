import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';

import {
  Provider,
  observer,
  inject,
  toJS
} from 'mobx-react';

import {
  BusyIndicator
} from '../../components';

@inject('authenticationStore')
@observer
export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null
    };

    this.authenticate = this.authenticate.bind(this);
  }

  componentDidMount() {
    const {
      navigation: { dispatch },
      authenticationStore,
    } = this.props;
  }

  authenticate() {
    const {
      authenticationStore
    } = this.props;

    const {
      email,
      password
    } = this.state;

    if (email && password) {
      authenticationStore.login({
        email,
        password
      });
    }
  }

  render() {
    const {
      authenticationStore
    } = this.props;

    const errorMessage = authenticationStore.status === 'error' ? 'Login failed' : '';

    let content = <BusyIndicator />;

    if (authenticationStore.status !== 'busy') {
      content = (
        <View>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput
          style={styles.inputField}
          value={this.state.email}
          autoCorrect={false}
          onChangeText={
            (text) => this.setState({email: text.toLocaleLowerCase()})
          } />
        <TextInput
          style={styles.inputField}
          value={this.state.password}
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={
            (text) => this.setState({password: text.toLocaleLowerCase()})
          } />
        <Button title="Log in" onPress={this.authenticate} />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.loginView}>{content}</SafeAreaView>
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
  loginView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.grayish,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    height: 50,
    width: 300,
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: colors.transparentBlack,
    backgroundColor: colors.white,
    borderRadius: 10
  },
  errorMessage: {
    color: colors.red
  }
});

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  SafeAreaView,
  Button
} from 'react-native';

import {
  getChildEventSubscriber,
  addNavigationHelpers,
  StackNavigator,
  NavigationActions
} from 'react-navigation';

import {
  Provider,
  observer,
  inject,
  toJS
} from 'mobx-react';

import {
  NavigationStore,
  AuthenticationStore
} from './app/stores';

import {
  BusyIndicator
} from './app/components';

@inject('authenticationStore')
@observer
class Main extends Component {
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


@inject('authenticationStore')
@observer
class Login extends Component {
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

const RootNavigator = StackNavigator(
  {
    Login: { screen: Login },
    Main: { screen: Main }
  },
  {
    headerMode: 'none'
  }
);

@observer
class App extends Component {
  constructor(props, context) {
    super(props, context);

    // Set up the stores,
    // navigation is hooked into nav
    this.navigationStore = new NavigationStore({navigator: RootNavigator});

    // Then the provided stores
    this.stores = {
      authenticationStore: new AuthenticationStore({
        navigationStore: this.navigationStore
      })
    }
  }

  render() {
    return (
      <Provider {...this.stores}>
        <RootNavigator
          navigation={addNavigationHelpers({
            dispatch: this.navigationStore.dispatch,
            state: this.navigationStore.navigationState,
            addListener: () => {
              /* left empty intentionally */
            }
          })}
        />
      </Provider>
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
  },
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

export default App;

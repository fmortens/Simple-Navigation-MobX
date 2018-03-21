import {
  Main,
  Login
} from '../screens';

import {
  getChildEventSubscriber,
  addNavigationHelpers,
  StackNavigator,
  NavigationActions
} from 'react-navigation';

export default StackNavigator(
  {
    Login: { screen: Login },
    Main: { screen: Main }
  },
  {
    headerMode: 'none'
  }
);

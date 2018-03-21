import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
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

import { RootNavigator } from './app/components/navigators';

@observer
class App extends React.Component {
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

export default App;

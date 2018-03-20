import {
  observable,
  action
} from 'mobx';

import { NavigationActions } from 'react-navigation';

export default class NavigationStore {
  constructor(props) {
    this.navigator = props.navigator;
  }

  @observable.ref
  navigationState = {
    index: 0,
    routes: [
      {
        key: 'Login',
        routeName: 'Login',
        params: { title: 'Login' }
      }
    ]
  };

  @action
  dispatch = (action, stackNavState = true) => {
    const previousNavState = stackNavState ? this.navigationState : null;
    const newState = (this.navigationState = this.navigator.router.getStateForAction(
      action,
      previousNavState
    ));
    return true;
  };

  @action
  redirectToLogin() {
    this.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Login',
          params: { title: 'Login' }
        })
      ]
    }));
  }

  @action
  redirectToMain() {
    this.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Main',
          params: { title: 'Main' }
        })
      ]
    }));
  }
}

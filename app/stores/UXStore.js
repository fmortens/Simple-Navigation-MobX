import {
  observable,
  action
} from 'mobx';

export default class UXStore {
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
}

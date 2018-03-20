import { observable, action, computed, toJS } from 'mobx';
import * as firebase from 'firebase';
import config from '../config';

export default class AuthenticationStore {
  @observable user;
  @observable loggedIn = false;
  @observable status = 'busy';

  constructor(props) {
    this.navigationStore = props.navigationStore;

    firebase.initializeApp(config.firebase);
    this.setup();


    this.handleLoginError = this.handleLoginError.bind(this);
  }

  @action
  login(credentials) {
    this.status = 'busy';

    const { email, password } = credentials;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(this.handleLoginError);
  }

  @action
  handleLoginError(error) {
    this.status = 'error';
    this.loggedIn = false;

    var errorCode = error.code;
    var errorMessage = error.message;
  }

  @action
  logout() {
    this.status = 'busy';

    firebase.auth()
      .signOut()
      .catch((error) => {
        this.status = JSON.stringify(error);
      });
  }

  setup() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.status = 'logged_in';
        this.loggedIn = true;
        this.navigationStore.redirectToMain();
      } else {
        this.status = 'not_logged_in';
        this.loggedIn = false;

        this.navigationStore.redirectToLogin();
      }
    });
  }
};



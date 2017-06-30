import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import LoginForm from './components/LoginForm';

class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyDx0iEB7_FXEne6TEXS4wbEP7zzz9K8mgc',
            authDomain: 'manager-76584.firebaseapp.com',
            databaseURL: 'https://manager-76584.firebaseio.com',
            projectId: 'manager-76584',
            storageBucket: 'manager-76584.appspot.com',
            messagingSenderId: '104501075518'
        };

        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <LoginForm />
            </Provider>
        );
    }
}

export default App;

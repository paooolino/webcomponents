import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import reducer from './reducers/reducers';
import thunkMiddleware from 'redux-thunk';
import * as storage from 'redux-storage';

import './css/main.css';

// Storage: We need to wrap the base reducer
const st_reducer = storage.reducer(reducer);
// Now it's time to decide which storage engine should be used
import createEngine from 'redux-storage-engine-localstorage';
const engine = createEngine('webcomponents');
// And with the engine we can create our middleware function.
const storageMiddleware = storage.createMiddleware(engine);

let createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware, 
    storageMiddleware
)(createStore);
let store = createStoreWithMiddleware(st_reducer);
let rootElement = document.getElementById('root');


// At this stage the whole system is in place and every action will trigger
// a save operation.
//
// BUT (!) an existing old state HAS NOT been restored yet! It's up to you to
// decide when this should happen. Most of the times you can/should do this
// right after the store object has been created.
const load = storage.createLoader(engine);
load(store);


store.subscribe(() =>
  console.log(store.getState())
);


// Provider: Makes the Redux store available to the connect() calls 
// in the component hierarchy below. 
// Normally, you can’t use connect() without wrapping the root component in <Provider>.

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

// per connettere un componente React a uno Store uso connect()
//  in pratica viene creato un Container Component.

// connect() deve essere invocata due volte. Una con gli argomenti descritti
//  e l'altra passando il componente React.

// Examples
// Inject just dispatch and don't listen to store
//  export default connect()(App); 
// Inject all action creators without subscribing to the store
//  export default connect(null, actionCreators)(TodoApp)
// Iniext props and action creators
// export default connect(mapStateToProps, actionCreators)(TodoApp)
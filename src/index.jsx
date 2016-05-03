import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import reducer from './reducers/reducers';
import thunkMiddleware from 'redux-thunk';

import './css/main.css';

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
let store = createStoreWithMiddleware(reducer);
let rootElement = document.getElementById('root');

/*
store.subscribe(() =>
  console.log(store.getState())
);
*/

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
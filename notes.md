## Write tests ##

    describe('Test', () => {
        
        describe('Subtest', () => {
        
            it('should render a wrapper div having #appContainer as id', () => {
                
            });
            
        });
        
    });

## Test assertions (expect.js) ##

    import expect from 'expect';
    
    ...
    
    expect(object).toBe(value, [message]); // strictly equal
    expect(object).toEqual(value, [message]); // conceptually equal
    expect(object).toBeA(constructor, [message]); // instance of
    expect([ 1, 2, 3 ]).toInclude(3); // Alias: toContain
    
## Test asyncronous code ##

You may return a Promise. This is useful if the APIs you are testing return promises instead of taking callbacks:
    
    it(...
        return store.dispatch(actions.getLanguages())
            .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
            })
    )

## Tests: mock ajax calls (nock js) ##

    import nock from 'nock';
    
    ...
    
    nock(ENDPOINT_HOST)
        .post(ENDPOINT_PATH)
        .reply(200, {
            status: 'ok',
            languages: [{ lang: 'it' },{ lang: 'en' }]
        });

## Tests: mock redux store ##

    import configureMockStore from 'redux-mock-store';
    import thunk from 'redux-thunk';
    
    const mockStore = configureMockStore([thunk]);
    
    it(...
    
        const store = mockStore({});
        store.dispatch(<action>);
        expect(store.getActions()).toEqual(expectedActions)
        
    )

## Testing in redux ##

Actions

    Async
    
        should create GET_LANGUAGES_SUCCESS when getLanguages has been dispatched
    
    Sync
    
        should create an action to change language

Reducers

    should handle getlanguagesRequest
    
Components

    Rendering
    
        should render a wrapper div having #appContainer as id
        should render the #appBar
    
    Behaviour

        should call handleGetLangInfos when the component is mounted
        should call handleLogout when the logout button is clicked
        
## React component ##

The index:

    import React from 'react';
    import {render} from 'react-dom';
    
    const rootElement = document.getElementById('root');
    
    render(
        <App />,
        rootElement
    );

A component:

    import React, { Component, PropTypes } from 'react';
    
    class App extends Component {
        constructor(props) {
            super(props);
        }
        
        componentDidMount() {
            this.props.handleGetLangInfos();
        }

        render() {
            // <div>{this.props.propname}</div>
            // <li onClick={ () => {this.props.propfunc();} }
            return (<jsx>);
        }
    }
        
    App.propTypes = {
        <prop_name>: PropTypes.bool.isRequired,
        <prop_name>: PropTypes.number.isRequired,
        <prop_name>: PropTypes.func.isRequired,
        <prop_name>: PropTypes.array.isRequired,
        <prop_name>: PropTypes.string.isRequired
    };
        
## Redux and Thunk connection ##

Index:

    import { createStore } from 'redux';
    import {createStore, applyMiddleware } from 'redux';
    import {Provider} from 'react-redux';
    import thunk from 'redux-thunk';
    
    const store = createStore(reducer, applyMiddleware(thunk));
    
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        rootElement
    );
    
Connecting a component:

    const mapDispatchToProps = (dispatch) => {
        return {
            propfunc: function(){ ... }
            ...
        }; 
    };
    
    const mapStateToProps = (state) => {
        return {
            propname: state.propvalue,
            ...
        }
    };
    
    export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(App);
    
    
    
    
    
    
    
    
        
http://alssndro.github.io/trianglify-background-generator/
http://demo.geekslabs.com/materialize/v3.1/index.html

state {
    ui: {
        windowHeight: 0
    },
    app: {
        isFetching: false,
        statusMessage: '',
        languages: [],
        selectedLanguage: ''
    },
    auth: {
        isAuthenticated: false,
        authcode: ''
    },
    items: {
        invalidated: true,
        loadedItems: [],
        selectedItemId: 0,
        ancestors: []
    }
}


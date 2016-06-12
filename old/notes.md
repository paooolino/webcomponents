## Write tests ##

    describe('Test', () => {
        
        describe('Subtest', () => {
        
            it('should render a wrapper div having #appContainer as id', () => {
                
            });
            
        });
        
    });

## assertions (expect.js) ##

    import expect from 'expect';
    
    ...
    
    expect(object).toBe(value, [message]); // strictly equal
    expect(object).toEqual(value, [message]); // conceptually equal
    expect(object).toBeA(constructor, [message]); // instance of
    expect([ 1, 2, 3 ]).toInclude(3); // Alias: toContain
    
## asyncronous code ##

You may return a Promise. This is useful if the APIs you are testing return promises instead of taking callbacks:
    
    it(...
        return store.dispatch(actions.getLanguages())
            .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
            })
    )

## mock ajax calls (nock js) ##

    import nock from 'nock';
    
    ...
    
    nock(ENDPOINT_HOST)
        .post(ENDPOINT_PATH)
        .reply(200, {
            status: 'ok',
            languages: [{ lang: 'it' },{ lang: 'en' }]
        });

## mock redux store ##

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


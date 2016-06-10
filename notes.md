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


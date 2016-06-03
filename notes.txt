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


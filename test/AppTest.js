describe('App component rendering', () => {
    
    describe('When the user is not authenticated', () => {
        
        it('should render the LoginForm component');
        it('should not render the logout button in the #appBar');
        
    });
    
    describe('When the user is authenticated', () => {
        
        it('should render the ItemsManager component');
        it('should render the logout button in the #appBar');
        
        it('should dispatch the logout action when the logout button is clicked');
        
    });
    
    describe('When the app is fetching', () => {
        
        it('should render the #fetching overlay');
        
    });
    
    it('should render the #appBar');
    it('should render the #languageSelector in the #appBar');
    it('should render the #statusBar');
    
    it('should dispatch the changeLanguage action when a new language is picked');
    it('should dispatch the getLangInfos actions when the component is mounted');
});
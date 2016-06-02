describe('ItemsManager component', () => {
    
    it('should render the #navigator div');
    it('should render the #singleItem div');
    
    describe('In the navigator div', () => {
        
        it('should render the #back to the parent link when at least one ancestor is defined');
        it('should render a list of loadedItems');
        it('should render the "add item" button');
    
        it('should dispatch an addItem action when the "add item" button is clicked');
        it('should dispatch a selectItem action when an element is clicked');
        
    });
    
    describe('In the breadcrumb div', () => {

        it('should always render the root link as the first item'); 
        it('should render the ancestors links'); 
        
        it('should dispatch a selectItem action when an ancestor link is clicked');
        
    });
    
    describe('In the singleItem div', () => {

        it('should render the name field'); 
        it('should render the slug field'); 
        it('should render the "delete item" button');
        
        it('should dispatch a deleteItem action when the "delete item" button is clicked');
        it('should dispatch a saveItemField action when an input field has changed');
        
    });
    
    it('should dispatch a fetchItems action as the component is mounted');
    
});
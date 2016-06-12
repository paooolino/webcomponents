import expect from 'expect';
import * as actions from '../../src/actions/UIActions';

describe('UI actions', () => {
    
    it('should create an action to update the window height', () => {
        const expectedAction = {
            type: actions.SET_WINDOW_HEIGHT,
            windowHeight: 300
        }
        expect(actions.setWindowHeight(300)).toEqual(expectedAction);  
    });
    
});
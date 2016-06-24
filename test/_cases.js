import expect from 'expect';

const third = function(a) {
    return 'third';
};

const second = function(a){
    return third;
};

const first = function(dispatch) {
    return {
        action: function(a) {
            dispatch(second(a));
        }
    }
}

describe('testcase', () => {
    
    const dispatchSpy = expect.createSpy();
    const handlers = first(dispatchSpy);
    handlers.action(1);
    console.log(dispatchSpy.calls[0].arguments[0].name);
    //console.log(dispatchSpy.calls[0].arguments);
    
});
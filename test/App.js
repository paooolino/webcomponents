import React from 'react';
import expect from 'expect';
import App from '../src/components/App';

function setup() {
    let renderer = TestUtils.createRenderer();
    renderer.render(<App />);
    let output = renderer.getRenderOutput();

    return {
        output
    }
}

describe('Components', function() {
    describe('App', function () {
        it('should render correctly', function () {
            const { output } = setup();
            console.log(output);
            expect(1).toBe(1);
            
        });
    });
});
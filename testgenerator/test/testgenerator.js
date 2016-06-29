import expect from 'expect';
import { generateActionTypeTest } from 'testGenerator';
import { generateActionCreatorTest } from 'testGenerator';
    
describe('[actionTypes]', () => {
    
    it('generates a test for a sync action', () => {
        const action = {
            name: "SYNC_ACTION"
        };
        const test = generateActionTypeTest(action);
        
        expect(test[0]).toEqual("it('defines SYNC_ACTION action type(s)', () => {");
        expect(test[1]).toEqual("    expect(types.SYNC_ACTION).toBe(SYNC_ACTION);");
        expect(test[2]).toEqual("});");
    });
    
    it('generates a test for an async action', () => {
        const action = {
            name: "ASYNC_ACTION",
            type: "async"
        };
        const test = generateActionTypeTest(action);
        
        expect(test[0]).toEqual("it('defines ASYNC_ACTION action type(s)', () => {");
        expect(test[1]).toEqual("    expect(types.ASYNC_ACTION_REQUEST).toBe(ASYNC_ACTION_REQUEST);");
        expect(test[2]).toEqual("    expect(types.ASYNC_ACTION_FAILURE).toBe(ASYNC_ACTION_FAILURE);");
        expect(test[3]).toEqual("    expect(types.ASYNC_ACTION_SUCCESS).toBe(ASYNC_ACTION_SUCCESS);");
        expect(test[4]).toEqual("});");        
    });

});

describe('[actionCreators]', () => {
    
    it('generates a test for a simple sync action', () => {
        const action = {
            name: "SYNC_ACTION",
            creator: "syncAction"
        };
        const test = generateActionCreatorTest(action);
        
        expect(test[0]).toEqual("it('creates the SYNC_ACTION action', () => {");
        expect(test[1]).toEqual("    const action = creators.syncAction();");
        expect(test[2]).toEqual("    expect(action).toEqual({");
        expect(test[3]).toEqual("        type: types.SYNC_ACTION");
        expect(test[4]).toEqual("    });");
        expect(test[5]).toEqual("});");
    });
    
    it('generates a test for a sync action with inputs/outputs', () => {
        const action = {
            name: "SYNC_ACTION",
            creator: "syncAction",
            inputs: {
                username: 'admin',
                password: 'admin123',
                serverData: {
                    statusMessage: 'Whatever status message',
                    requestStatus: 'ok'
                }
            },
            outputs: {
                authcode: 'whatever_auth_code',
                serverData: {
                    id: 1
                }
            }
        };
        const test = generateActionCreatorTest(action);
        
        expect(test[0]).toEqual("it('creates the SYNC_ACTION action', () => {");
        expect(test[1]).toEqual("    const username = 'admin';");
        expect(test[1]).toEqual("    const password = 'admin123';");
        expect(test[1]).toEqual("    const serverData = {");
        expect(test[1]).toEqual("        statusMessage: 'Whatever status message',");
        expect(test[1]).toEqual("        requestStatus: 'ok'");
        expect(test[1]).toEqual("    };");
        expect(test[1]).toEqual("    const action = creators.syncAction(username, password, serverData);");
        expect(test[2]).toEqual("    expect(action).toEqual({");
        expect(test[3]).toEqual("        type: types.SYNC_ACTION,");
        expect(test[3]).toEqual("        authcode: 'whatever_auth_code',");
        expect(test[3]).toEqual("        serverData: {");
        expect(test[3]).toEqual("            id: 1");
        expect(test[3]).toEqual("        }");
        expect(test[4]).toEqual("    });");
        expect(test[5]).toEqual("});");
    });
    
    it('generates a test for an async action', () => {});
    
});

describe('[reducer]', () => {});

describe('[components]', () => {});

describe('[containers]', () => {});

/*
    external imports
*/

import { connect } from 'react-redux';

/*
    internal imports
*/

import AppComponent from '../components/AppComponent';
import * as creators from '../actionCreators';

/*
    dispatch props
*/

export const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: function(){
            dispatch(creators.login('admin', 'admin'));
        },
        handleChangeUsername: function(){
            dispatch(creators.changeUsername());
        },
        handleShangePassword: function(){
            dispatch(creators.changePassword());
        }
    };
};

/*
    state props
*/

export const mapStateToProps = (state) => {
    return {
    };
};

/*
    Container/Component connection
*/

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppComponent);

export default AppContainer;

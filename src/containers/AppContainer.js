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
            dispatch(creators.login('admind','admin'));
        }
    };
};

/*
    state props
*/

export const mapStateToProps = (state) => {
    return {
        username: state.username,
        password: state.password
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

/*
    external imports
*/

import { connect } from 'react-redux';

/*
    internal imports
*/

import LoginFormComponent from '../components/LoginFormComponent';
import * as creators from '../actionCreators';

/*
    dispatch props
*/

export const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: function(username, password){
            dispatch(creators.login(username, password));
        },
        handleChangeUsername: function(event){
            dispatch(creators.changeUsername(event.target.value));
        },
        handleChangePassword: function(event){
            dispatch(creators.changePassword(event.target.value));
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

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginFormComponent);

export default LoginFormContainer;

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
    console.log(state);
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

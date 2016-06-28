/*
    external imports
*/

import { connect } from 'react-redux';

/*
    internal imports
*/

import AppComponent from '../components/AppComponent';

/*
    dispatch props
*/

export const mapDispatchToProps = (dispatch) => {
    return {

    };
};

/*
    state props
*/

export const mapStateToProps = (state) => {
    return {
        nFetching: state.nFetching,
        isAuthenticated: state.isAuthenticated
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

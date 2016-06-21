import { connect } from 'react-redux';
import App from './App';
import {changeLanguage, logout, getLanguages } from '../../src/App/AppActions';

export const mapDispatchToProps = (dispatch) => {
    return {
        handleChangeLanguage: (newLanguage) => {
            dispatch(changeLanguage(newLanguage));
        },
        handleLogout: () => {
            dispatch(logout());
        },
        handleGetLanguages: () => {
            dispatch(getLanguages());
        }
    };
};

export const mapStateToProps = (state) => {
    return {
        languages: state.languages,
        statusMessage: state.statusMessage,
        isAuthenticated: state.isAuthenticated,
        nFetching: state.nFetching
    };
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer;

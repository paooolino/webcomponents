// import libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import custom components
import AppSkeleton from './AppSkeleton';
import LoginFormContainer from './LoginFormContainer';

// import actions
import { setWindowHeight, getLangInfos } from '../actions/appActions';

// import css

/**
    This is the App front-controller.
    It displays the LoginForm if user is not authenticated. Otherwise renders the AppSkeleton.
    It attaches the handle to update the window height in the store.
    It dispatches an action to retrieve language informations.
*/
class App extends Component {
    
    componentDidMount() {
        this.props.dispatch(setWindowHeight(window.innerHeight));
        window.addEventListener('resize', this.handleResize);
        
        this.props.dispatch(getLangInfos());
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    
    render() {
        const content = this.props.isAuthenticated ? <AppSkeleton /> : <LoginFormContainer />;
        return (
            <div>{content}</div>
        );
    }
    
    handleResize = (e) => {
        this.props.dispatch(setWindowHeight(window.innerHeight));
    }
}

// connect this component to redux to gain access to the isAuthenticated and windowSize property.
const mapStateToProps = function(store) {
    return {
        isAuthenticated: store.auth.isAuthenticated
    };
};

export default connect(
    mapStateToProps
)(App);
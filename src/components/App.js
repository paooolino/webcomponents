import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppSkeleton from './AppSkeleton';
import LoginFormContainer from './LoginFormContainer';

class App extends Component {
    render() {
        const content = this.props.isAuthenticated ? <AppSkeleton /> : <LoginFormContainer />;
        return (
            <div>{content}</div>
        );
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
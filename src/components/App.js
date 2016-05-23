import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppContent from './AppContent';
import LoginFormContainer from './LoginFormContainer';

class App extends Component {
    render() {
        const content = this.props.isAuthenticated ? <AppContent /> : <LoginFormContainer />;
        return (
            <div className="allheight">{content}</div>
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
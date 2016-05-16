import React, { Component } from 'react';
import HeaderBar from './HeaderBar';
import AppBodyContainer from './AppBodyContainer';
import StatusBar from './StatusBar';
import LoginFormContainer from './LoginFormContainer';
import { connect } from 'react-redux';

import '../css/App.css';

class App extends Component {
    render() {
        return (
            <div>
                <HeaderBar />
                <div className="appbody">
                    { this.props.isAuthenticated && 
                        <AppBodyContainer />
                    }
                </div>
                <StatusBar />
                { !this.props.isAuthenticated && 
                    <LoginFormContainer />
                }
            </div>
        );
    }
}

// connect this component to redux to gain access to the isAuthenticated property.
const mapStateToProps = function(store) {
    return {
        isAuthenticated: store.auth.isAuthenticated
    };
};

export default connect(
    mapStateToProps
)(App);

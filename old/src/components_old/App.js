import React, { Component } from 'react';
import HeaderBar from './HeaderBar';
import AppBodyContainer from './AppBodyContainer';
import StatusBar from './StatusBar';
import LoginFormContainer from './LoginFormContainer';
import { connect } from 'react-redux';

import { getLangInfos } from '../actions/appActions';

import '../css/App.css';

class App extends Component {
    
    componentDidMount() {
        console.log('uhu?');
        this.props.dispatch(getLangInfos());
    }
    
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

import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

import '../css/HeaderBar.css';

class HeaderBar extends React.Component {
    render() {
        return (
            <div className="headerBar inner">
                Application title&nbsp;&nbsp; 
                { this.props.isAuthenticated &&
                    <button onClick={this.logoutHandler}>Logout</button>
                }
            </div>
        );
    }
    
    logoutHandler = () => {
        this.props.dispatch(logout());    
    }
}

const mapStateToProps = function(store) {
    return {
        isAuthenticated: store.auth.isAuthenticated
    };
};

export default connect(
    mapStateToProps
)(HeaderBar);

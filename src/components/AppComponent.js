/*
    external imports
*/

import React, { Component, PropTypes } from 'react';

/*
    internal imports
*/

/*
    setup
*/

/*
    component definition
*/

class AppComponent extends Component {
    
    componentDidMount() {
        
    }
    
    render() {
        return(
            <div>
                <div className="formRow">
                    <div className="formLabel">
                        username
                    </div>
                    <div className="formField">
                        <input className="username" />
                    </div>
                </div>
                <div className="formRow">
                    <div className="formLabel">
                        password
                    </div>
                    <div className="formField">
                        <input className="password" type="password" />
                    </div>
                </div>
                <div className="formRow">
                    <button onClick={this.props.handleLogin} className="login_button">Log in</button>
                </div>
            </div>
        )
    }
}

/*
    proptypes
*/

AppComponent.propTypes = {
    handleLogin: PropTypes.func.isRequired
};

/*
    export
*/

export default AppComponent;

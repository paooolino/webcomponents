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

class LoginFormComponent extends Component {

    //constructor(props) {
        //super(props);
    //}
  
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
                        <input className="username" 
                            value={this.props.username}
                            onChange={this.props.handleChangeUsername}
                        />
                    </div>
                </div>
                <div className="formRow">
                    <div className="formLabel">
                        password
                    </div>
                    <div className="formField">
                        <input className="password" type="password" 
                            value={this.props.password}
                            onChange={this.props.handleChangePassword}
                        />
                    </div>
                </div>
                <div className="formRow">
                    <button onClick={ () => {this.props.handleLogin(
                        this.props.username,
                        this.props.password
                    );} } className="login_button">Log in</button>
                </div>
            </div>
        )
    }
}

/*
    proptypes
*/

LoginFormComponent.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleChangeUsername: PropTypes.func.isRequired,
    handleChangePassword: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired
};

/*
    export
*/

export default LoginFormComponent;

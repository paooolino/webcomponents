import React, { Component } from 'react';

class LoginForm extends Component {
    render() {
        return (
            <div>
                <div class="formrow">
                    <input id="username" type="text" />
                </div>
                <div class="formrow">
                    <input id="password" type="text" />
                </div>
                <div class="formrow">
                    <button id="login_button">Login</button>
                </div>
            </div>
        );
    }
}

export default LoginForm;
export { LoginForm };
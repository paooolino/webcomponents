import React, { Component } from 'react';
import LoginForm from './LoginForm';
import ItemManager from './ItemManager';

class App extends Component {
    render() {
        const component = this.props.isAuthenticated ? <ItemManager /> : <LoginForm />;
        const logout_button = this.props.isAuthenticated ? <button id="logout_button"></button> : '';
        const fetching_overlay = this.props.isFetching ? <div id="fetching_overlay"></div> : '';
        return (
            <div>
                {component}
                <div id="appBar">
                    <div id="languageSelector">
                        {logout_button}
                    </div>
                </div>
                <div id="statusBar">
                </div>
                {fetching_overlay}
            </div>
        );
    }
}

export default App;
export { App };
import React, { Component } from 'react';
import LoginForm from './LoginForm';
import ItemManager from './ItemManager';

class App extends Component {
    render() {
        console.log(this.props);
        const component = this.props.isAuthenticated ? <ItemManager /> : <LoginForm />;
        return (
            <div>
                {component}
            </div>
        );
    }
}

export default App;
export { App };
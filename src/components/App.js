import React, { Component } from 'react';
import LoginForm from './LoginForm';
import ItemManager from './ItemManager';

class App extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.props.handleGetLangInfos();
    }
    
    render() {
        const component = this.props.isAuthenticated ? <ItemManager /> : <LoginForm />;
        const logout_button = this.props.isAuthenticated ? <button onClick={this.props.handleLogout} id="logout_button"></button> : '';
        const fetching_overlay = this.props.isFetching ? <div id="fetching_overlay"></div> : '';
        
        return (
            <div id="appContainer">
                {component}
                <div id="appBar">
                    <div id="languageSelector">
                        <ul>
                            {this.props.languages.map( (language) => (
                                <li onClick={ () => {this.props.handleChangeLanguage(language);} } key={language}>{language}</li>
                            ))}
                        </ul>
                    </div>
                    {logout_button}
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
import React, { Component, PropTypes } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import ItemManager from '../ItemManager/ItemManager';

class App extends Component {

    componentDidMount() {
        this.props.handleGetLanguages();
    }
    
    render() {
        return (
            <div>
                <div className="appBar">
                    <div className="languageSelector">
                        <ul>
                            {this.props.languages.map( (language) => (
                                <li 
                                    key={language}
                                    onClick={(language)=>{this.props.handleChangeLanguage(language);}}
                                >{language}</li>
                            ))}
                        </ul>
                    </div>
                    {(() => {
                        if(this.props.isAuthenticated) {
                            return <button 
                                    onClick={this.props.handleLogout} 
                                    className="logout_button"
                                >Logout</button>
                        }
                    })()}
                </div>
                <div className="statusBar">
                    {this.props.statusMessage}
                </div>
                {(() => {
                    if(!this.props.isAuthenticated) {
                        return <LoginForm />
                    } else {
                        return <ItemManager />
                    }
                })()}
                {(() => {
                    if(this.props.isFetching) {
                        return <div className="fetching_overlay"></div>
                    }
                })()}                
            </div>
        );
    }

}

App.propTypes = {
    languages: PropTypes.array.isRequired,
    statusMessage: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    handleGetLanguages: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
    handleChangeLanguage: PropTypes.func.isRequired
};

export default App;
export { App };
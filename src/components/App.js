import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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
        const fetching_overlay = this.props.nFetching > 0 ? <div id="fetching_overlay"></div> : '';
        
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

App.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    nFetching: PropTypes.number.isRequired,
    handleLogout: PropTypes.func.isRequired,
    handleGetLangInfos: PropTypes.func.isRequired,
    handleChangeLanguage: PropTypes.func.isRequired,
    languages: PropTypes.array.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogout: function(data) {},
        handleGetLangInfos: function(data) {},
        handleChangeLanguage: function(data) {}
    }; 
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        nFetching: state.app.nFetching,
        languages: state.app.languages
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export { App };
/*
    external imports
*/

import React, { Component, PropTypes } from 'react';

/*
    internal imports
*/

import LoginFormContainer from '../containers/LoginFormContainer';

/*
    setup
*/

/*
    component definition
*/

class AppComponent extends Component {

    //constructor(props) {
        //super(props);
    //}
  
    componentDidMount() {
        this.props.handleGetLanguages();
    }
    
    render() {
        return(
            <div>
                <div className="languagebar">
                    {this.props.languages.map((lang) => (
                        <div key={lang}>{lang}</div>
                    ))}
                </div>
                {(() => {
                    if(!this.props.isAuthenticated) {
                        return (
                            <div className="LoginFormContainer">
                                <LoginFormContainer />
                            </div>
                        );
                    }
                })()}
                {(() => {
                    if(this.props.nFetching > 0) {
                        return (
                            <div className="fetchinglayer">fetching...</div>
                        );
                    }
                })()}
                <div className="statusbar">
                    <div className="errorMessage">
                        {this.props.errorMessages[0]}
                    </div>
                </div>
            </div>
        )
    }
}

/*
    proptypes
*/

AppComponent.propTypes = {
    nFetching: PropTypes.number.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessages: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired,
    handleGetLanguages: PropTypes.func.isRequired
};

/*
    export
*/

export default AppComponent;

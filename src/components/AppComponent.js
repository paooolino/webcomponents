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
        
    }
    
    render() {
        return(
            <div>
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
            </div>
        )
    }
}

/*
    proptypes
*/

AppComponent.propTypes = {
    nFetching: PropTypes.number.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

/*
    export
*/

export default AppComponent;

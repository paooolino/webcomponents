import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import NavBar from './NavBar';
import AppBody from './AppBody';
import { logout } from '../actions/authActions';

import '../css/AppSkeleton.css';

class AppSkeleton extends Component {
    render() {
        return(
            <Grid fluid className="gridcontainer">
                <Row>
                    <Col xs={12}>
                        <AppBar
                            title="WebComponents"
                            iconElementRight={
                                <FlatButton 
                                    label="Logout" 
                                    onTouchTap={() => {this.props.dispatch(logout())}}
                                />
                            }
                        />
                    </Col>
                </Row>
                <Row>
                    <NavBar />
                    <Col xs={12}>
                        <AppBody />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default connect()(AppSkeleton);
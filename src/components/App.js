import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';

import '../css/App.css';

export default class App extends Component {
    render() {
        return (
            <Grid style={{width:100 +'%'}}>
                <Row>
                    <Col xs={12}>
                        <AppBar
                            title="WebComponents"
                            iconElementRight={<FlatButton label="Logout" />}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <Paper zDepth={1}>
                            <List>
                                <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
                                <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
                                <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
                                <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} />
                            </List>
                        </Paper>
                    </Col>
                    <Col xs={9}>
                        <Paper zDepth={1}>
                            Right
                        </Paper>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
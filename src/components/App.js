import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import { connect } from 'react-redux';

import { setWindowHeight } from '../actions/appActions'; 

import '../css/App.css';

class App extends Component {

    handleResize = (e) => {
        this.props.dispatch(setWindowHeight(window.innerHeight));
    }

    componentDidMount() {
        this.props.dispatch(setWindowHeight(window.innerHeight));
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    
    render() {
        return (
            <Grid fluid className="gridcontainer">
                <Row>
                    <Col xs={12}>
                        <AppBar
                            title="WebComponents"
                            iconElementRight={<FlatButton label="Logout" />}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs className="navbar">
                        <Paper zDepth={1} style={{height: (this.props.windowHeight - 64) + 'px'}}>
                            <List>
                                <ListItem primaryText="Back" />
                                <ListItem leftAvatar={<Avatar icon={<FileFolder />} />} primaryText="All mail" />
                                <ListItem leftAvatar={<Avatar icon={<FileFolder />} />} primaryText="Trash" />
                                <ListItem leftAvatar={<Avatar icon={<FileFolder />} />} primaryText="Spam" />
                                <ListItem leftAvatar={<Avatar icon={<FileFolder />} />} primaryText="Follow up" />
                            </List>
                        </Paper>
                    </Col>
                    <Col xs>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

// connect this component to redux to gain access to the isAuthenticated and windowSize property.
const mapStateToProps = function(store) {
    return {
        isAuthenticated: store.auth.isAuthenticated,
        windowHeight: store.app.windowHeight
    };
};

export default connect(
    mapStateToProps
)(App);
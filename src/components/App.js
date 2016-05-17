import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
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
                    <div className="navbar" style={{height: (this.props.windowHeight) + 'px'}}>
                        <Paper zDepth={1} style={{height:100 +'%'}}>
                            <Toolbar>
                                <ToolbarGroup firstChild={true}>
                                    <FlatButton label="< Back" primary={true} />
                                </ToolbarGroup>
                            </Toolbar>
                            <List>
                                <Subheader>Pages</Subheader>
                                <ListItem innerDivStyle={{padding: '17px 16px 15px 57px'}} style={{fontSize: 14 + 'px', lineHeight: 14 + 'px'}} leftAvatar={<Avatar size={30} icon={<FileFolder />} />} primaryText="All mail" />
                                <ListItem innerDivStyle={{padding: '17px 16px 15px 57px'}} style={{fontSize: 14 + 'px', lineHeight: 14 + 'px'}} leftAvatar={<Avatar size={30} icon={<FileFolder />} />} primaryText="Trash" />
                                <ListItem innerDivStyle={{padding: '17px 16px 15px 57px'}} style={{fontSize: 14 + 'px', lineHeight: 14 + 'px'}} leftAvatar={<Avatar size={30} icon={<FileFolder />} />} primaryText="Spam" />
                                <ListItem innerDivStyle={{padding: '17px 16px 15px 57px'}} style={{fontSize: 14 + 'px', lineHeight: 14 + 'px'}} leftAvatar={<Avatar size={30} icon={<FileFolder />} />} primaryText="Follow up" />
                            </List>
                            <FloatingActionButton zDepth={1} mini={true} secondary={true} style={{float:'right', marginRight:20 + 'px'}}>
                                <ContentAdd />
                            </FloatingActionButton>
                        </Paper>
                    </div>
                    <Col xs={12} className="appcontent">
                        <Grid fluid>
                            <Row>
                                <Col sx={12}>
                                    <h5 className="breadcrumbs-title">Forms</h5>
                                    <ol className="breadcrumbs">
                                        <li><a href="index.html">Dashboard</a></li>
                                        <li><a href="#">Forms</a></li>
                                        <li className="active">Forms Layouts</li>
                                    </ol>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <Paper zDepth={1}>
                                        <TextField
                                            hintText="Hint Text"
                                            floatingLabelText="Fixed Floating Label Text"
                                            floatingLabelFixed={true}
                                        />
                                    </Paper>
                                </Col>
                            </Row>
                        </Grid>
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
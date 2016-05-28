import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { setWindowHeight } from '../actions/appActions';

import '../css/NavBar.css';

class NavBar extends Component {
    
    componentDidMount() {
        this.props.dispatch(setWindowHeight(window.innerHeight));
        window.addEventListener('resize', this.handleResize);

        if( this.props.lang == '' ) {
            this.props.dispatch(setLanguage(
                this.props.main_language
            ));
        } else {
            /*
            this.props.dispatch(fetchItems(
                this.props.selected_id_parent,
                this.props.lang
            ));
            */
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = (e) => {
        this.props.dispatch(setWindowHeight(window.innerHeight));
    }
    
    render() {
        return(
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
        );
    }
}

const mapStateToProps = function(store) {
    return {
        windowHeight: store.app.windowHeight,
        main_language: store.app.langInfos.main_language,
        lang: store.items.lang
    };
};

export default connect(
    mapStateToProps
)(NavBar);
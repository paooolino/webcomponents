import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import TextField from 'material-ui/TextField';

import '../css/AppBody.css';

export default class AppBody extends Component {
    render() {
        return(
            <div className="appbody">
                <div className="contentheader">
                    <ol className="breadcrumbs">
                        <li><a href="index.html">Dashboard</a></li>
                        <li><a href="#">Forms</a></li>
                        <li className="active">Forms Layouts</li>
                    </ol>
                </div>

                <Grid fluid>
                    <Row>
                        <Col xs={6}>
                            <div className="contentbody">
                                <div className="contentTitle">Element name</div>
                                <TextField
                                    floatingLabelText="Name"
                                    fullWidth={true}
                                />
                                <TextField
                                    floatingLabelText="Slug"
                                    fullWidth={true}
                                />
                                <TextField
                                    floatingLabelText="Any other field"
                                    fullWidth={true}
                                />
                                <TextField
                                    floatingLabelText="Any other field"
                                    fullWidth={true}
                                />
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
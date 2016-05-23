import React, {PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import {createValidator, required, minLength} from '../utils/validation';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';

import '../css/LoginForm.css';

const LoginForm = ({fields:{username, password}, handleSubmit, resetForm, submitting, isFetching, errorMessage}) => (
    <div className="loginFormContainer">
        <Paper className="loginFormPaper" zDepth={3}>
            <Grid fluid>
                <Row>
                    <Col xs={12}>
                        <TextField
                            floatingLabelText="Username"
                            fullWidth={true}
                        />
                        <TextField
                            floatingLabelText="Password"
                            fullWidth={true}
                            type="password"
                        />
                    </Col>
                </Row>
            </Grid>
        </Paper>
    </div>
);

LoginForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired
};

// redux-form
// Simply give the provided field value as props with the spread operator: {...field}. 
// Each field object contains a value prop and onChange, onBlur, 
//  and onFocus functions that listen to the events from the inputs. 
// Notice that the component has no state (in fact it uses the functional stateless component syntax), 
//  and the inputs are just the vanilla <input> elements.

//
// before:
// export default LoginForm;
//
// with redux-form:

const fields = ['username', 'password'];

const validate = createValidator({
    username: [required, minLength(3)],
    password: [required, minLength(5)]
});

export default reduxForm({
    // a unique name for this form
    form: 'loginForm',
    // all the fields in the form
    fields,
    validate 
})(LoginForm);

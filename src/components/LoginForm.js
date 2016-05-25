import React, {PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import {createValidator, required, minLength} from '../utils/validation';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import ActionLockOutline from 'material-ui/svg-icons/action/lock-outline';
import SocialPersonOutline from 'material-ui/svg-icons/social/person-outline';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import { grey500 } from 'material-ui/styles/colors';

import '../css/LoginForm.css';

const iconstyle = {marginLeft: '10px', height: '30px', width: '30px', marginTop: '32px'};

const LoginForm = ({fields:{username, password}, handleSubmit, resetForm, submitting, isFetching, errorMessage}) => (
    <div className="loginFormContainer">
        <Paper className="loginFormPaper" zDepth={3}>
            <form onSubmit={handleSubmit}>
                <div className="loginLogo">
                </div>
                <div className="loginTitle marginedV">
                    WebComponents admin
                </div>
                <div className="errorMessage">{errorMessage}</div>
                <div className="loginRow">
                    <div className="loginSx">
                        <SocialPersonOutline color={grey500} style={iconstyle} />
                    </div>
                    <div className="loginDx">
                        <TextField
                            floatingLabelText="Username"
                            fullWidth={true}
                            {...username}
                            errorText={username.error}
                        />
                    </div>
                    <div className="close"></div>
                </div>
                <div className="loginRow">
                    <div className="loginSx">
                        <ActionLockOutline color={grey500} style={iconstyle} />
                    </div>
                    <div className="loginDx">
                        <TextField
                            floatingLabelText="Password"
                            fullWidth={true}
                            type="password"
                            {...password}
                            errorText={password.error}
                        />
                    </div>
                    <div className="close"></div>
                </div>  
                
                <div className="loginRow marginedV">
                    <Checkbox label="Remember me" labelStyle={{color:'#9e9e9e'}} />                
                </div> 

                <RaisedButton type="submit" label="login" style={{display: 'block'}} secondary={true} />

                <div className="loginRow marginedV">
                    <div className="sx">
                        Register
                    </div>
                    <div className="dx">
                        Forgot password?
                    </div>
                    <div className="close"></div>
                </div>  
            </form>
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

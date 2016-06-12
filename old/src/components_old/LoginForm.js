import React, {PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import {createValidator, required, minLength} from '../utils/validation';

//import '../css/LoginForm.css';

const LoginForm = ({fields:{username, password}, handleSubmit, resetForm, submitting, isFetching, errorMessage}) => (
    <div className="loginformpicture">
        <div className="loginformopacity">
            <div className="loginformcontainer">
                <div className="loginform inner">
                    <form className="inner" onSubmit={handleSubmit}>
                        <div className="formrow">
                            <div className="formlabel">
                                Username {username.touched && username.error && <div>{username.error}</div>}
                            </div>
                            <div className="formfield">
                                <input type="text" placeholder="Username" {...username} />
                            </div>
                        </div>
                        <div className="formrow">
                            <div className="formlabel">
                                Password {password.touched && password.error && <div>{password.error}</div>}
                            </div>
                            <div className="formfield">
                                <input type="password" placeholder="Password" {...password} />
                            </div>
                        </div>
                        { !isFetching && 
                        <div className="formrow">
                            <div className="formfield">
                                <button type="submit" disabled={submitting}>Login</button>
                            </div>
                        </div>
                        }
                        { isFetching && 
                            <span className="note">Logging in...</span>
                        }
                        {errorMessage}
                    </form>
                </div>
            </div>
        </div>
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

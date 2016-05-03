import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { login } from '../actions/authActions';

// this is a container component entirely generated with connect()

const mapDispatchToProps = function(dispatch) {
    return {
        onSubmit: function(data) {
            dispatch(login(
                data.username,
                data.password
            ));
        }
    };
};

const mapStateToProps = (state) => {
    return {
        isFetching: state.auth.isFetching,
        errorMessage: state.auth.errorMessage
    };
};

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

export default LoginFormContainer;



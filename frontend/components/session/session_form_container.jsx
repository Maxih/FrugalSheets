import {connect} from 'react-redux';
import SessionForm from './session_form';
import * as Action from '../../actions/session_actions';

const mapStateToProps = state => ({
  loggedIn: !!state.session.email,
  errors: state.errors

});

const mapDispatchToProps = (dispatch, ownProps) => {
  let action = () => {};
  let formType = "";

  if(location.hash === '#/login') {
    action = Action.login;
    formType = "Login";
  }

  if(location.hash === '#/signup') {
    action = Action.signup;
    formType = "Sign Up";
  }

  return ({
    processForm: (user) => dispatch(action(user)),
    formType: formType
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);

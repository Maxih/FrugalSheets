import React from 'react';
import { Link, withRouter } from 'react-router';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        firstname: "",
        lastname: "",
        password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.userChange = this.userChange.bind(this);
    this.passChange = this.passChange.bind(this);
    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.redirectIfLoggedIn = this.redirectIfLoggedIn.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() => this.props.router.push("/"));
  }
  componentDidUpdate() {
		this.redirectIfLoggedIn();
	}

  redirectIfLoggedIn() {
    if (this.props.loggedIn) {
      this.props.router.push("/");
    }
  }

  userChange(e) {
    this.setState({email: e.target.value});
  }

  firstNameChange(e) {
    this.setState({firstname: e.target.value});
  }

  lastNameChange(e) {
    this.setState({lastname: e.target.value});
  }

  passChange(e) {
    this.setState({password: e.target.value});
  }

  render() {
    const additionalProps = (
      <label>
      <input value={this.state.firstname} placeholder="First Name" type="text" onChange={this.firstNameChange}/>
      <input value={this.state.lastname} placeholder="Last Name" type="text" onChange={this.lastNameChange}/>
      </label>
    );

    const signupLink = (
      <Link href="/#/signup" className="create-account">Create account</Link>
    );

    const loginLink = (
      <Link href="/#/login" className="create-account">Already have an account? Sign in</Link>
    );

    return (
      <section className="login-page">
        <section className="login-form">
          <h1>{this.props.formType}</h1>
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.email} placeholder="Email" type="text" onChange={this.userChange}/>
            <input value={this.state.password} placeholder="Password" type="password" onChange={this.passChange}/>
            {this.props.formType === "Sign Up" ? additionalProps : ""}
            <button>{this.props.formType}</button>
          </form>
        </section>
        {this.props.formType === "Login" ? signupLink : loginLink}
      </section>
    );
  }
}

export default SessionForm;

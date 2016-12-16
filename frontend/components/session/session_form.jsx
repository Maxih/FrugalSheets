import React from 'react';
import { Link, withRouter } from 'react-router';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        errors: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.guestLogin = this.guestLogin.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() => this.props.router.push("/"), (errors) => {
      this.setState({errors: errors.errors});
    });
  }

  componentDidUpdate() {
		this.redirectIfLoggedIn();
	}

  redirectIfLoggedIn() {
    if (this.props.loggedIn) {
      this.props.router.push("/");
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  guestLogin() {
    const user = {
      email: "mackshempfling@gmail.com",
      password: "password"
    }
    this.props.processForm(user).then(() => this.props.router.push("/"));
  }

  render() {
    const additionalProps = (
      <label>
      <input value={this.state.firstname} placeholder="First Name" type="text" onChange={this.update("firstname")}/>
      <input value={this.state.lastname} placeholder="Last Name" type="text" onChange={this.update("lastname")}/>
      </label>
    );

    const signupLink = (
      <Link href="/#/signup" className="create-account">Create account</Link>
    );

    const loginLink = (
      <Link href="/#/login" className="create-account">{"Already have an account? Sign in"}</Link>
    );

    const guestLink = (
      <button className="guest-button" onClick={this.guestLogin}>Guest Login</button>
    )

    const errors = this.state.errors.map((error, idx) => {
      return (
        <li key={idx}>{error}</li>
      )
    });

    return (
      <section className="login-page">
        <section className="login-form">
          <h1>{this.props.formType}</h1>
          <ul className="error-list">{this.state.errors}</ul>
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.email} placeholder="Email" type="text" onChange={this.update("email")}/>
            <input value={this.state.password} placeholder="Password" type="password" onChange={this.update("password")}/>
            {this.props.formType === "signup" ? additionalProps : ""}
            <button>{this.props.formType === "login" ? "Login" : "Sign Up"}</button>
            {this.props.formType === "login" ? guestLink : ""}
          </form>

        </section>
        {this.props.formType === "login" ? signupLink : loginLink}
      </section>
    );
  }
}

export default SessionForm;

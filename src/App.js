import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      formErrors: {firstName: '', lastName: '', email: '', password: ''},
      firstNameValid: false,
      lastNameValid: false,
      emailValid: false,
      passwordValid: false,
      formValid: false
    }

  }

  handleConsole = () => {
    if (this.state.firstName !== '' &&
        this.state.lastName !== '' &&
        this.state.email !== '' &&
        this.state.password !== '') {
      console.log('First Name: ' + this.state.firstName);
      console.log('Last Name: ' + this.state.lastName);
      console.log('E-mail: ' + this.state.email);
      console.log('Password: ' + this.state.password);
      this.setState(
        {
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        })
    } else {
      alert('заповніть всі поля!')
    }
  }

  handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'firstName':
        firstNameValid = value.match(/^[aA-zZ0-9\-_]+$/);
        fieldValidationErrors.firstName = firstNameValid ? '': 'empty or has invalid symbols';
        break;
      case 'lastName':
        lastNameValid = value.match(/^[aA-zZ0-9\-_]+$/);
        fieldValidationErrors.lastName = lastNameValid ? '': 'empty or has invalid symbols';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'invalid email';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': 'short password';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
      firstNameValid: firstNameValid,
      lastNameValid: lastNameValid,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.firstNameValid && this.state.lastNameValid
      && this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }


  render() {
    return (
       <form className="App" target="myIFR">
         <h1></h1>
           <div className={`form-group ${this.errorClass(this.state.formErrors.firstName)}`}>
            <label htmlFor="firstName">First name</label>
            <input type="text" required className="form-control" name="firstName"
                   placeholder="First name"
                   value={this.state.firstName}
                   onChange={this.handleInput}  />
            <p className="err">{this.state.formErrors.firstName}</p>
            <span>*must not contain ,.?!&$#@%/</span>
          </div>

        <div className={`form-group ${this.errorClass(this.state.formErrors.lastName)}`}>
          <label htmlFor="lastName">Last name</label>
          <input type="text" required className="form-control" name="lastName"
                 placeholder="Last name"
                 value={this.state.lastName}
                 onChange={this.handleInput}  />
          <p className="err">{this.state.formErrors.lastName}</p>
          <span>*must not contain ,.?!&$#@%/</span>
        </div>

        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Email address</label>
          <input type="email" required className="form-control" name="email"
                 placeholder="Email@email.email"
                 value={this.state.email}
                 onChange={this.handleInput}  />
          <p className="err">{this.state.formErrors.email}</p>
        </div>

        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          <label htmlFor="password">Password</label>
          <input type="password" required className="form-control" name="password"
                 placeholder="Password"
                 value={this.state.password}
                 onChange={this.handleInput}  />
          <p className="err">{this.state.formErrors.password}</p>
          <span>*should be more than 6 symbols</span>
        </div>

        <button className="btn btn-primary" onClick={this.handleConsole} disabled={!this.state.formValid}>Submit</button>
      </form>
    );
  }
}

export default App;

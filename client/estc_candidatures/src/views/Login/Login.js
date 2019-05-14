import React, { Component } from 'react';
import classes from './Login.module.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input';
import * as actions from '../../store/actions/index';

class Login extends Component {
  componentDidMount() {
    this.setState({ style: { transform: 'translateY(0)' } });
  }

  state = {
    loginForm: {
      username: {
        elementConfig: {
          type: 'text',
          placeholder: 'Username'
        },
        icon: 'user',
        value: '',
        validation: {
          required: true
        },
        notValid: false,
        touched: false,
        error: null
      },
      password: {
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        icon: 'lock',
        validation: {
          required: true
        },
        notValid: false,
        touched: false,
        error: null
      }
    },
    formIsValid: false,
    style: {}
  }

  submitHundler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.loginForm.username.value, this.state.loginForm.password.value);
  }

  inputChangedHundler = (event, id) => {
    event.preventDefault();
    const { placeholder, value } = event.target;
    const updatedOrderFrom = {
      ...this.state.loginForm
    }
    const updatedFormElement = { ...updatedOrderFrom[id] };
    updatedFormElement.touched = true;
    updatedFormElement.value = value;

    switch (placeholder) {
      case "Username":
        if (value.length < 3) {
          updatedFormElement.error = "minimum 3 characaters required";
          updatedFormElement.notValid = true;
        } else {
          updatedFormElement.notValid = false;
        }
        break;
      case "Password":
        if (value.length < 5) {
          updatedFormElement.error = "minimum 5 characaters required";
          updatedFormElement.notValid = true;
        } else {
          updatedFormElement.notValid = false;
        }
        break;
      default:
        break;
    }
    updatedOrderFrom[id] = updatedFormElement;
    let formIsValid = false;
    if (updatedOrderFrom['username'].value === "abdelaziz" && updatedOrderFrom['password'].value === "123123") {
      formIsValid = true;
    }
    console.log(formIsValid);

    this.setState({ loginForm: updatedOrderFrom, formIsValid: formIsValid });
  }

  render() {
    let redirect = null
    if (this.props.auth) {
      redirect = <Redirect to="/statistics" />
    }
    const classesUi = [classes.ui, classes.form, classes.Size]
    const classesButton = [classes.ui, classes.blue, classes.button]
    const fromElementsArray = [];
    for (let key in this.state.loginForm) {
      fromElementsArray.push({
        id: key,
        config: this.state.loginForm[key]
      });
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p style={{ color: 'red' }}>{this.props.error}</p>;
    }
    return (
      < div >
        {redirect}
        <div className={classes.Login} style={this.state.style}>
          <div>
            <Form className={classesUi.join(' ')} onSubmit={this.submitHundler}>
              <h2>Login</h2>
              <p>Sign In to your account</p>
              {errorMessage}
              {fromElementsArray.map(formElement => (
                <Form.Field key={formElement.id}>
                  <Input
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    icon={formElement.config.icon}
                    iconPosition='left'
                    changed={(event) => this.inputChangedHundler(event, formElement.id)} />
                  {
                    formElement.config.notValid ? <Label basic color='red' pointing>
                      {formElement.config.error}
                    </Label> : null
                  }
                </Form.Field>
              ))}
              <Button className={classesButton.join(' ')} floated="left">Log In</Button>
              <Link to="#" color="link" className={classes.Link}>Forgot Password?</Link>
            </Form>
          </div>
        </div>
      </div >
    );
  }
}

const mapStateToPros = state => {
  return {
    error: state.error,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(actions.auth(username, password))
  };
};

export default connect(mapStateToPros, mapDispatchToProps)(Login);

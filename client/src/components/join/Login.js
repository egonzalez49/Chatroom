import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Alert, Button, Form } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import FormField from './FormField';
import validateEmails from '../../utils/validateEmails';
import { loginUser, clearError } from '../../actions';
import { loginNames as FIELDS } from './FormNames';

class Login extends React.Component {
  componentDidMount() {
    this.props.clearError();
  }

  renderFields = () => {
    return _.map(FIELDS, ({ label, name, type, row }) => {
      if (!row) {
        return (
          <Field
            key={name}
            component={FormField}
            type={type}
            label={label}
            name={name}
          />
        );
      }
    });
  };

  renderAlert = () => {
    if (this.props.error) {
      return (
        <Alert className="mt-3" color="danger">
          {this.props.error}
        </Alert>
      );
    }
  };

  onLoginSubmit = values => {
    this.props.loginUser(values, this.props.history);
  };

  render() {
    return (
      <div>
        <h3 className="text-center">Login</h3>
        <Form onSubmit={this.props.handleSubmit(this.onLoginSubmit)}>
          {this.renderFields()}
          <Button className="button" block>
            Login
          </Button>
          {this.renderAlert()}
        </Form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.email = validateEmails(values.email || '');

  FIELDS.forEach(({ name, label }) => {
    if (!values[name]) {
      errors[name] = `${label} is required.`;
    }
  });

  return errors;
}

const mapStateToProps = state => {
  return {
    error: state.auth.error.loginError
  };
};

const Wrapped = connect(
  mapStateToProps,
  { loginUser, clearError }
)(withRouter(Login));

export default reduxForm({
  validate,
  form: 'loginForm'
})(Wrapped);

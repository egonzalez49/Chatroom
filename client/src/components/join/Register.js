import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Alert, Button, Form } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import FormField from './FormField';
import validateEmails from '../../utils/validateEmails';
import { registerUser, clearError } from '../../actions';
import { registerNames as FIELDS } from './FormNames';

class Register extends React.Component {
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

  renderRowFields = () => {
    return _.map(FIELDS, ({ label, name, type, row }) => {
      if (row) {
        return (
          <Field
            key={name}
            component={FormField}
            type={type}
            label={label}
            name={name}
            row={row}
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

  onRegisterSubmit = values => {
    this.props.registerUser(values, this.props.history);
  };

  render() {
    return (
      <div>
        <h3 className="text-center">Register</h3>
        <Form onSubmit={this.props.handleSubmit(this.onRegisterSubmit)}>
          {this.renderFields()}
          <div className="row">{this.renderRowFields()}</div>
          <Button type="submit" className="button" block>
            Register
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
    error: state.auth.error.registerError
  };
};

const Wrapped = connect(
  mapStateToProps,
  { registerUser, clearError }
)(withRouter(Register));

export default reduxForm({
  validate,
  form: 'registerForm'
})(Wrapped);

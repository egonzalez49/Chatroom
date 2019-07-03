import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { Alert, Button, Form } from 'reactstrap';

import Spinner from '../SpinnerComponent';
import FormField from '../join/FormField';
import FieldFileInput from './FieldFileInput';
import { editNames as FIELDS } from '../join/FormNames';
import { editUser, clearError } from '../../actions';

class EditAccount extends React.Component {
  componentDidMount() {
    this.props.clearError();
    //this.props.initialize(this.props.initialValues);
  }

  formatDate = date => {
    return new Date(date).toDateString();
  };

  renderAlert = () => {
    if (this.props.submitError) {
      return (
        <Alert className="mt-3" color="danger">
          {this.props.submitError}
        </Alert>
      );
    }
  };

  renderFields = () => {
    return _.map(FIELDS, ({ label, name, type, row }) => {
      if (type !== 'file') {
        return (
          <Field
            key={name}
            component={FormField}
            type={type}
            label={label}
            name={name}
            nameProp={name}
            user={this.props.user}
          />
        );
      } else {
        return <Field key={name} name={name} component={FieldFileInput} />;
      }
    });
  };

  onEditSubmit = values => {
    const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('password', values.password);
    if (values.newPassword) {
      formData.append('newPassword', values.newPassword);
    }
    formData.append('avatar', values.avatar);
    this.props.editUser(formData, this.props.history);
  };

  render() {
    if (!this.props.user) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }

    return (
      <div className="mt-5 row justify-content-center">
        <div className="col-4 text-center">
          <div className="center-image">
            <img src={this.props.user.avatar} className="avatar" alt="avatar" />
          </div>
          <Form
            encType="multipart/form-data"
            className="mt-2"
            onSubmit={this.props.handleSubmit(this.onEditSubmit)}
          >
            {this.renderFields()}
            {this.renderAlert()}
            <Button type="submit" className="button" block>
              Save
            </Button>
          </Form>
          <Button tag={Link} to="/account" className="mt-3 button-2" block>
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  FIELDS.forEach(({ name, label }) => {
    if (!values[name] && name !== 'avatar' && name !== 'newPassword') {
      errors[name] = `${label} is required.`;
    }
  });

  return errors;
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    submitError: state.auth.error.editError,
    initialValues: {
      firstName: state.auth.user.firstName,
      lastName: state.auth.user.lastName
    }
  };
};

const Wrapped = reduxForm({
  validate,
  form: 'editForm',
  enableReinitialize: true
})(EditAccount);

export default connect(
  mapStateToProps,
  { editUser, clearError }
)(withRouter(Wrapped));

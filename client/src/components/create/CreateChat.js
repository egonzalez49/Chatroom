import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Label, Button, Form } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import FormField from '../join/FormField';
import { createChat } from '../../actions/chat';
import { createNames as FIELDS, tags as TAGS } from '../join/FormNames';

class CreateChat extends React.Component {
  renderFields = () => {
    return _.map(FIELDS, ({ label, name, type }) => {
      if (name !== 'tags') {
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

  renderTags = () => {
    return _.map(TAGS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={FormField}
          inputType="checkbox"
          label={label}
          name={name}
        />
      );
    });
  };

  onSubmit = values => {
    console.log(values);
    var tags = [];
    for (let index = 0; index < TAGS.length; index++) {
      var element = TAGS[index];
      if (values[element.name]) {
        tags.push(element.name);
      }
    }

    console.log(tags);
    this.props.createChat(values.name, tags, this.props.history);
  };

  render() {
    return (
      <div className="mt-3 chatroom-div">
        <h2>Create a Chatroom</h2>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          {this.renderFields()}
          <Label>Tags</Label>
          {this.renderTags()}
          <Button className="button">Create</Button>
        </Form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  FIELDS.forEach(({ name, label }) => {
    if (!values[name]) {
      errors[name] = `${label} is required.`;
    }
  });

  return errors;
}

const Wrapped = connect(
  null,
  { createChat }
)(withRouter(CreateChat));

export default reduxForm({
  validate,
  form: 'createForm'
})(Wrapped);

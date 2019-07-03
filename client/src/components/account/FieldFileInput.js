import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

export default class FieldFileInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const {
      input: { onChange }
    } = this.props;
    onChange(e.target.files[0]);
  }

  render() {
    return (
      <FormGroup>
        <Label>Avatar</Label>
        <Input
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={this.onChange}
        />
      </FormGroup>
    );
  }
}

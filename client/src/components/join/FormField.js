import React from 'react';
import { FormGroup, Label, Input, FormText } from 'reactstrap';

const FormField = ({ input, inputType, label, nameProp, row, meta }) => {
  if (inputType === 'checkbox') {
    return (
      <div className="chatroom-div">
        <FormGroup>
          <Label check>
            <Input {...input} type={inputType} autoComplete="off" />
            {label}
          </Label>
        </FormGroup>
      </div>
    );
  }

  return (
    <div className={row ? 'col' : ''}>
      <FormGroup>
        <Label htmlFor={nameProp}>{label}</Label>
        <Input {...input} autoComplete="off" />
        <FormText color="danger">
          {meta.touched && meta.error ? meta.error : null}
        </FormText>
      </FormGroup>
    </div>
  );
};

export default FormField;

import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Input
} from 'reactstrap';

class CommentForm extends React.Component {
  state = {
    content: ''
  };

  onChange = e => {
    this.setState({
      content: e.target.value
    });
  };

  submitComment = e => {
    e.preventDefault();
    var comment = {
      content: this.state.content
    };
    this.props.onSubmit(comment);
    this.setState({
      content: ''
    });
  };

  render() {
    return (
      <div className="comment-div">
        <Form onSubmit={this.submitComment}>
          <FormGroup>
            <InputGroup>
              <Input
                name="content"
                value={this.state.content}
                onChange={this.onChange}
                type="text"
                placeholder={this.props.placeholder}
              />
              <InputGroupAddon addonType="append">
                <Button type="submit" className="button">
                  {this.props.buttonText}
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default CommentForm;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Form
} from 'components/Form';

export class ContactForm extends Component {
  state = {
    name: '',
    number:'',
}

  handleChange = ({ target: { name, value } }) =>{
    this.setState({
      [name]: value,
    });
}

  handleSubmit = (e) => {
    e.preventDefault();
    const isContactAdded = this.props.onSubmit(this.state);

    if (isContactAdded  === true) {
      
        this.reset();
    }
    
  }


  reset() {
    this.setState({
      name: '',
      number:'',
  })
}


  render() {
    const { name, number } = this.state;
    const { operationType } = this.props;
    return (
      <Form
        name ={name}
        number ={number}
        operationType={operationType}
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
      />
    );

}
} 

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  operationType: PropTypes.string.isRequired,
}
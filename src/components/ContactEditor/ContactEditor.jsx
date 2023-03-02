import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form } from 'components/Form';
import { toast } from 'react-toastify';
import './ContactEditor.css';


export class ContactEditor extends Component {
  state = {
    name: '',
    number:'',
  }
  

  componentDidMount() {
    // console.log('fill the inputs');
    const { name, number } = this.props;
    this.setState({ number: number, name: name });
    // console.log(name);
    // console.log(number)
  }

  handleChange = ({ target: { name, value } }) =>{
    this.setState({
      [name]: value,
    });
}

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.props;
    // console.log(name);
    // console.log(number);
    // console.log('SUBMIT EDITOR');
    // console.log(this.state.name);
    // console.log(this.state.number);

    if (name !== this.state.name && number !== this.state.number) {
      // console.log('ALL CHANGES');
      return toast.error(`You cannot change both name and number. To make full change, delete this contact and create new with correct info.`);
     
    }

    this.props.onEditContact(this.state);

  }

  render() {
    const { name, number } = this.state;
    const { operationType} = this.props;
    return (
      <>
        <h3 className="editForm__title">Contact Editor</h3>
        <div className="editForm__info">
          <p>You try to edit contact with</p>
          <p className='contact__info' >
            <span className='contact__category'>Name:</span>
            <span><b>{this.props.name}</b></span>
          </p>
          <p className='contact__info' >
            <span className='contact__category'>Number:</span>
            <span><b>{this.props.number}</b></span>
          </p>

                    
        </div>
        <div className='editForm__instrc '>
        <p className="editForm__text">It is allowed change only <b> name</b> OR <b>number</b></p>
        <p className="editForm__text">If you want to change  <b> both name AND number</b>, please delete this contact and create new with correct info</p>
        </div>
        <Form
        name ={name}
        number ={number}
        operationType={operationType}
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
      />
      </>
      
    );

}
} 


ContactEditor.propTypes = {
    onEditContact: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,            
    number: PropTypes.string.isRequired,
    operationType: PropTypes.string.isRequired,
  };  
 
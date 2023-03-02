import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Contact.module.css';
import { renderIcons } from 'utils/renderIcons';
import { iconSize } from 'constants';
import { IconButton } from 'components/IconButton';
import { EditModal } from 'components/EditModal';
import { toast } from 'react-toastify';



export class Contact extends Component {

    static propTypes = {
      contact: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
            }).isRequired,
            onDeleteContact: PropTypes.func.isRequired,
  };  


  state = {
    isModalOpen: false,
    isContactEdited: false,
    name: '',
    number: '',
  }

  componentDidMount() {
    const { contact: {name, number } } = this.props;
    this.setState({ number: number, name: name });
    // console.log(name);
    // console.log(number);


  }

  componentDidUpdate(_, prevState) {
    // console.log(prevState.isContactEdited);
    // console.log(this.state.isContactEdited);
    if (prevState.isContactEdited !== this.state.isContactEdited) {

    if (prevState.name === this.state.name && prevState.number === this.state.number) {
      // console.log('same fields');
      return toast.error(`There are no changes. You didn't change neither contact name or phone number`);
     
    } 



    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    // console.log(parsedContacts);
    const newName = this.state.name;
    const newNumber = this.state.number;
    // console.log(newName);
    // console.log(newNumber);
      const newContacts = parsedContacts.reduce((acc, el) => {
        if (el.name === newName) {
          const newEl = {
            id: el.id,
            name: el.name,
            number: newNumber,
          }
          // console.log(newEl);
          acc.push(newEl)
          return acc;
        } else if (el.number === newNumber) {
          const newEl = {
            id: el.id,
            name: newName,
            number: el.number,
          }
          // console.log(newEl);
          acc.push(newEl);
          
          return acc;
        }


        acc.push(el)
        return acc;
      }, []);

    // console.log(newContacts);
    if (newContacts !== parsedContacts) {
    //  console.log('update localstorage');
      localStorage.setItem('contacts', JSON.stringify(newContacts));
    }
    }
    
  }

  toggleModal = () => {
    const { isModalOpen } = this.state;
    isModalOpen ? this.setState({ isModalOpen: false }) : this.setState({ isModalOpen: true })
  }

  editContact = ({name, number}) => {
    // console.log('we update contact');
    // console.log(name);
    // console.log(number);
    this.setState({ isModalOpen: false, isContactEdited: true, name:name, number:number});
    
  }
 
  render() {
    const { contact: {id}, onDeleteContact } = this.props;
    const { isModalOpen, name, number } = this.state;
    return (
      <>
        <EditModal
          isOpen={isModalOpen}
          onClose={this.toggleModal}
          onEditContact={this.editContact}
          name={name}
          number={number}
        />
          {renderIcons('contact', iconSize.md)}
          <span className={css.contact__name}>{name}: </span>
          <span className={css.contact__number}>{number}</span>
          <IconButton
            onClick={this.toggleModal}
            aria-label = "Edit Contact"
          >
            {renderIcons('edit', iconSize.sm)}
         </IconButton>
        
          <IconButton
            onClick={() => onDeleteContact(id)}
            aria-label = "Delete contact"
          >
            {renderIcons('delete', iconSize.sm)}
          </IconButton>
      </>
      
    )
    }
  }
  
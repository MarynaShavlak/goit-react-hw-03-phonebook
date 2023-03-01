import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Container } from "./App.styled";
import { Section } from "components/Section";
import { ContactForm } from 'components/ContactForm';
import { Contacts } from 'components/Contacts';
import { Filter } from 'components/Filter';
import { Notification } from 'components/Notification';
import { ToastContainer, toast } from 'react-toastify';
import { Layout } from 'components/Layout';


export class App extends Component {
  state = {
    contacts: [],
  filter: '',
  name: '',
  number: ''
  }
  
  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      return this.setState({ contacts: parsedContacts });
     }
  }



  componentDidUpdate(_, prevState) {
    const currentContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (currentContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(currentContacts));
    }
}




  addContact = (contact) => {
    let isExist =this.checkContactInBook(contact)
    if (isExist) {
      return;
    }

    const contactWithId = {
      id: nanoid(),
      ...contact,
    }
    
    this.setState(({ contacts }) => ({ contacts: [contactWithId, ...contacts] }))
    return isExist= true;

}

  checkContactInBook = (contact) => {
    let isContactExist = false;
    let isNumberExist = this.state.contacts.some(el => el.number === contact.number);
    let isNameExist = this.state.contacts.some(el => el.name === contact.name);
    if (isNameExist && isNumberExist) {
        toast.error(`Ooops, contact with name ${contact.name} and number ${contact.number} is already in your phonebook`, {
        position: toast.POSITION.TOP_RIGHT
    }
      );
      return isContactExist=true;
    }
    if (isNameExist) {
      toast.error(`Ooops, contact with name ${contact.name} is already in your phonebook`, {
        position: toast.POSITION.TOP_RIGHT
    }
      );
      return isContactExist = true;
      
    }
    if (isNumberExist) {
            toast.error(`Ooops, contact with number ${contact.number} is already in your phonebook`, {
        position: toast.POSITION.TOP_RIGHT
    }
      );

      return isContactExist=true;
    }
    
    return isContactExist;
  }
  
  
  
  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)}))
  }

  changeFilter = (e) => {
   this.setState({filter: e.currentTarget.value})
  }
  

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter));
  }

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = this.getFilteredContacts();
    const hasContactsInBook = contacts.length !== 0;
    return (
      <Layout>
      <Container>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          {hasContactsInBook
            ?
            (
              <>
              <Filter value={filter} onChange={this.changeFilter} />
              <Contacts contacts={filteredContacts} onDeleteContact={this.deleteContact}></Contacts>
              </>
            )
            :
            (<Notification message="There are no contacts in your phonebook yet" />)
          }
        </Section>
        <ToastContainer autoClose={3000 } />
      </Container>

      </Layout>
      
    );
  }
  
};

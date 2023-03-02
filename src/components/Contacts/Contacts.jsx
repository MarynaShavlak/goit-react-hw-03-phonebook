import PropTypes from 'prop-types';
import React from 'react';
import { ContactsList, ContactItem } from './Contacts.styled';
import { Contact } from 'components/Contact';


export function Contacts({ contacts, ...otherProps }) {
  return (
    <ContactsList>
      {contacts.map(contact => (
        <ContactItem
          key={contact.id}
        >
          <Contact contact={contact}  {...otherProps} />
        </ContactItem>
      ))}
    </ContactsList>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
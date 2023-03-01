import PropTypes from 'prop-types';
import { ContactsList, ContactItem} from './Contacts.styled';
import { renderIcons } from 'utils/renderIcons';
import { iconSize } from 'constants';
import { IconButton } from 'components/IconButton';

export function Contacts({contacts, onDeleteContact}) {
  return (
    <ContactsList>
      {contacts.map(({id, name, number}) => (
        <ContactItem
          key={id}
        >
          {renderIcons('contact', iconSize.md)}
          <span className='contact__name'>{name}: </span>
          <span className='contact__number'>{number}</span>
          <IconButton
            onClick={() => onDeleteContact(id)}
            aria-label = "Delete contact"
          >
            {renderIcons('delete', iconSize.sm)}
          </IconButton>
         
      </ContactItem>
      ))}
    </ContactsList>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
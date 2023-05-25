import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactsList.module.css'

export const ContactsList = ({ contacts, onDeleteContacts }) => {
  return (
    <ul className={css.item}>
      {contacts.map(contact => (
        <li key={contact.id}>
          <span>
            {contact.name} {contact.number}
          </span>
          <button
            className={css.item__btn}
            onClick={() => onDeleteContacts(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onDeleteContacts: PropTypes.func.isRequired,
};

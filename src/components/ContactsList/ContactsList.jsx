import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactsList.module.css'

export const ContactsList = ({ contacts, onDeleteContacts }) => (
  <ul className={css.item}>
    {contacts.map(contact => (
      <li key={contact.id}>
        <span>
          {contact.name} {contact.number}
        </span>
        <button className={css.item__btn} onClick={() => onDeleteContacts(contact.id)}>Delete</button>
      </li>
    ))}
  </ul>
);

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(Object).isRequired,
  onDeleteContacts: PropTypes.func.isRequired,
};

import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const nameId = nanoid();
const numberId = nanoid();

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = e => {
    setName(e.currentTarget.value)
  };

  const handleNumberChange = e => {
    setNumber(e.currentTarget.value)
  };
  

  const handleSubmit = e => {
    e.preventDefault();
    const contact = {name, number}
    
    onSubmit(contact);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };


    return (
      <form className={css.contact__form} onSubmit={handleSubmit}>
        <label className={css.contact__label} htmlFor={nameId}>
          Name
          <input
            className={css.contact__input}
            id={nameId}
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.contact__label} htmlFor={numberId}>
          Number
          <input
            className={css.contact__input}
            id={numberId}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleNumberChange}
          />
        </label>
        <button className={css.contact__btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import initialContacts from './data/contacts.json';
import { ContactsList } from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import css from './App.module.css';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? initialContacts
    );
  });
  const [filter, setFilter] = useState('');


  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContacts = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const addContact = data => {
    if (contacts.some(contact => contact.name === data.name)) {
      Notify.warning(`${data.name} is already in contacts`);
      return;
    }
    const id = nanoid();
    const contact = { id: id, name: data.name, number: data.number };
    setContacts(state => [contact, ...state]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div>
      <h1 className={css.text}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2 className={css.text}>Contacts</h2>
      <Filter filter={filter} onChange={changeFilter} />
      <ContactsList
        onDeleteContacts={deleteContacts}
        contacts={visibleContacts}
      />
    </div>
  );
}

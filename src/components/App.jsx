import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import initialContacts from './data/contacts.json';
import { ContactsList } from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  deleteContacts = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contactId !== contact.id),
    }));
  };

  formSubmitHandle = data => {
    if (
      this.state.contacts.filter(contact => contact.name === data.name).length >
      0
    ) {
      Notify.warning(`${data.name} is already in contacts`);
      return;
    }

    const id = nanoid();
    const contact = { id: id, name: data.name, number: data.number };
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <div>
        <h1 className={css.text}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandle} />

        <h2 className={css.text}>Contacts</h2>
        <Filter filter={this.state.filter} onChange={this.changeFilter} />
        <ContactsList
          onDeleteContacts={this.deleteContacts}
          contacts={visibleContacts}
        />
      </div>
    );
  }
}

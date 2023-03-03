import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import AddContacts from './AddContacts/AddContacts';
import ContactList from './ContactList/ContactList';
import ContactEll from './ContactEll/ContactEll';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
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
    const { contacts } = this.state;
    console.log(prevState);
    console.log(this.state);
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  nameVerification = name => {
    const { contacts } = this.state;
    for (let contact of contacts) {
      if (contact.name === name) {
        alert(`${name} is already in contacts!`);
        return true;
      }
    }
  };

  formSubmitHandler = data => {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    if (this.nameVerification(newContact.name)) return;

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contactId !== contact.id),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          // justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: 10,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <AddContacts onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.changeFilter} />
        <ContactList>
          <ContactEll
            contacts={visibleContacts}
            deleteContact={this.deleteContact}
          />
        </ContactList>
      </div>
    );
  }
}

export default App;

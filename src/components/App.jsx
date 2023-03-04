import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import AddContacts from './AddContacts/AddContacts';
import ContactList from './ContactList/ContactList';
import ContactEll from './ContactEll/ContactEll';
import Filter from './Filter/Filter';

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [toFilter, setToFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const nameVerification = name => {
    for (let contact of contacts) {
      if (contact.name === name) {
        alert(`${name} is already in contacts!`);
        return true;
      }
    }
  };

  const formSubmitHandler = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    if (nameVerification(newContact.name)) return;

    setContacts(prevState => [newContact, ...prevState]);
  };

  const changeFilter = e => {
    setToFilter(e.currentTarget.value);
  };

  const getVisibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(toFilter.toLowerCase())
  );

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contactId !== contact.id)
    );
  };

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
      <AddContacts onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter filter={toFilter} onChange={changeFilter} />
      <ContactList>
        <ContactEll
          contacts={getVisibleContacts}
          deleteContact={deleteContact}
        />
      </ContactList>
    </div>
  );
}

export default App;

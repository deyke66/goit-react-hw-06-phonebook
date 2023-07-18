import { Phonebook } from './Phonebook/Phonebook';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact } from 'redux/contactSlice';
import { setFilterValue } from 'redux/filterSlice';

export const App = () => {
  const dispatch = useDispatch();
  const contactsArray = useSelector(state => state.contacts);
  const filterTerm = useSelector(state => state.filter);

  const handleSubmitForm = e => {
    e.preventDefault();
    const contactName = e.target.elements.name.value;
    const contactNumber = e.target.elements.number.value;
    const newContact = {
      id: nanoid(),
      name: contactName,
      number: contactNumber,
    };

    if (contactsArray.contactsArray.some(i => i.name === contactName)) {
      alert(`You alraeady have a ${contactName} in contacts`);
      return;
    }
    dispatch(addContact(newContact));
  };

  const filterValue = e => {
    dispatch(setFilterValue(e.target.value));
  };

  const handleDeleteContact = e => {
    dispatch(deleteContact(e.target.value));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h2>Phonebook</h2>
      <Phonebook onSubmit={handleSubmitForm} />

      <h2>Contacts</h2>
      <Filter filter={filterTerm} onChange={filterValue} />
      <Contacts
        contacts={contactsArray.contactsArray}
        filterTerm={filterTerm}
        onClick={handleDeleteContact}
      />
    </div>
  );
};

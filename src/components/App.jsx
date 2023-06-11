import { nanoid } from 'nanoid'
import { useSelector, useDispatch } from 'react-redux'
import { addContact, removeContact, getContacts } from '../redux/contactSlice'
import { setFilter, getFilter } from 'redux/filterSlice'

import { Section } from './Section'
import { Form } from './Form'
import { Filter } from './Filter'
import { Contacts } from './Contacts'

export const App = () => {
  const contactsState = useSelector(getContacts)
  const filterState = useSelector(getFilter)
  const dispatch = useDispatch();


  const filterId = nanoid()

  // Send new contacts
  const formSubmit = ( name, number ) => {
     const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (name.length === 0 || number.length === 0) {
      return alert(`Field is empty`);
    }

    if (contactsState.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
       return alert(`${name} is already in contacts.`);
    }

    if (contactsState.find(contact => contact.number === number)) {
       return alert(`Number: ${number} is already in contacts.`);
    }

    dispatch(addContact(contact))  
  }
  

    // Send new filter for search contact 
  const searchContact = (e) => {
    dispatch(setFilter(e.currentTarget.value))
  }

  // Condition visible 
  const getVisibleContacts = () => {
    const normalizedFilter = filterState.toLowerCase();

    return contactsState.filter(contact =>
       contact.name.toLowerCase().includes(normalizedFilter),
    );
  }
    
  // delete contact
  const deleteContact = (id) => {
    dispatch(removeContact(id))
    dispatch(setFilter(''))
      };
  
    
  return <>
      <Section title="Phonebooks">
        <Form onSubmit={formSubmit} />
      </Section>

      
      <Section title="Contacts" >
        {contactsState.length > 1 && (
        <Filter filterId={filterId} value={filterState} onChange={searchContact} />
        
        )}
       
    
        {contactsState.length > 0 ?
          <Contacts contacts={getVisibleContacts()} deleteContact={deleteContact} /> :
          <p>The phonebook is empty 😔</p>
        }
             
      </Section>
    </>
  
}


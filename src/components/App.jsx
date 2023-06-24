 import React, {Component} from "react";
 import ContactForm from "./ContactForm/ContactForm";
 import Filter from "./Filter/Filter";
 import ContactList from "./ContactList/ContactList";
 import { Container } from "./App.styled";
 import { nanoid } from 'nanoid'

 class App extends Component {
  state = {
    contacts: [],
  filter: '',
    
  }

  onRemoveContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }))
  }

  onAddContact = (data) => {
const identicalName = this.state.contacts.find(contact => contact.name === data.name);

const finalContact = {
  ...data,
  id: nanoid(),
};

identicalName ? alert(`${data.name} is already in contacts`) : this.setState({
  contacts: [...this.state.contacts, finalContact]
})





  }

  onFilterContact = (filter) => {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
   this.setState(prevState => ({
    contacts: (filteredContacts.length === 0) ? prevState : filteredContacts,
   }))
  }

  handleFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();

    this.setState({
      filter: filterValue,
    })
 }

  render() {
    const filterContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter))
    return (
      <Container>
      <h2>Phonebook</h2>
      <ContactForm onAddContact={this.onAddContact}/>

      <h2>Contacts</h2>
      <Filter 
      handleFilterChange={this.handleFilterChange}
      filter={this.state.filter}/>
      <ContactList 
      filterContacts={filterContacts}
      onRemoveContact={this.onRemoveContact}
      />
      </Container>
     
    )
  }
 }
 

export default App;

import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personsService from "./services/persons";

const Notification = ({ message }) => {
  if (message === "") {
    return null;
  }

  return <div className="success">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);
    if (names.includes(newName)) {
      const person = persons.find((p) => p.name === newName);
      if (person.number !== newNumber) {
        if (
          window.confirm(
            `${person.name} is already added to the phonebook, replace the old number with a new one?`
          )
        ) {
          changeNumber(person.id);
          setNewMessage(`Number changed for ${person.name}`);
          setTimeout(() => {
            setNewMessage("");
          }, 5000);
        }
      } else {
        alert(`${newName} ${newNumber} is already added to phonebook`);
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      setNewMessage(`Added ${newName}`);
      setTimeout(() => {
        setNewMessage("");
      }, 5000);
      personsService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id) => {
    if (window.confirm("Do you want to delete this person?")) {
      personsService.deletePerson(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const changeNumber = (id) => {
    const person = persons.find((p) => p.id === id);
    const changedPerson = { ...person, number: newNumber };

    personsService
      .update(id, changedPerson)
      .then((returnedPerson) => {
        setPersons(persons.map((person) => (person.id === id ? returnedPerson : person)));
      })
      .catch(() => {
        setNewMessage(`Information of ${person.name} has already been removed from server`);
        setTimeout(() => {
          setNewMessage("");
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
